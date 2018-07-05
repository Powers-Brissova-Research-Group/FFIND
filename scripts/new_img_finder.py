from __future__ import with_statement
from __future__ import absolute_import
from subprocess import call
from openpyxl import load_workbook

import re
import time
from itertools import imap
from io import open
import os
from os import listdir
from os.path import isfile, join

def generate_index():
	fnames = []
	outfile = open('index.txt', 'w')
	img_paths = ['/mnt/drtc-aperio/Images', '/mnt/drtc-aperio/Images2', '/mnt/drtc-aperio/Images3', '/mnt/powers-imaging']
	i = 0
	start = time.time()
	for img_path in img_paths:
		for dirpath, dirnames, filenames in os.walk(img_path):
			for filename in [f for f in filenames]:
				fnames.append(os.path.join(dirpath, filename))
				i += 1
				if i == 999:
					mark = time.time()
					print 'Time to read chunk: ' + str(mark - start)
					print 'Files found: ' + str(len(fnames))
					time.sleep(5)
					i = 0
					start = time.time()
	
	for f in fnames:
		ustr = f.decode('utf8')
		outfile.write(u'%s\n' % ustr)

def generate_ids(sheet):
    ids = []
    for row in sheet.rows:
        if row[11].value == u'Aperio':
            ids.append(unicode(row[0].value))
    return ids

def create_regex(img_id):
    return u'/' + img_id + u'.*'

def search(idx_path, ids):
    exps = list(imap(create_regex, ids))

    exp = u'|'.join(exps)
    print exp
    paths = []
    with open(idx_path, u'r') as index:
        for line in index:
            if(re.search(exp, line)):
                paths.append(line)
    return paths

def sort_paths(paths, ids):
    sortedPaths = {}
    for i in ids:
        sortedPaths[i] = []
        for path in paths:
            if i in path:
                sortedPaths[i].append(path)
    return sortedPaths

def write_to_sheet(spaths, sheet):
    for row in sheet.rows:
        img_id = unicode(row[0].value)
        if(img_id == None or row[11].value != u'Aperio'):
            continue
        max_col = u'P'
        print img_id
        for path in spaths[img_id]:
            cname = max_col + unicode(row[0].row)
            sheet[cname] = path
            max_col = next_col(max_col)

def next_col(prev_col):
    next_col = prev_col
    if next_col[-1] == u'Z':
        for i in xrange(len(next_col) - 1, -1, -1):
            next_col = next_col[:i] + inc_char(next_col[i]) + next_col[i+1:]
        next_col += u'A'
    else:
        next_col = next_col[:-1] + inc_char(next_col[-1])

    return next_col

def inc_char(a):
    if (a == u'Z'):
        return u'A'
    else:
        return unichr(ord(a) + 1)

def main():
    # wb = load_workbook('./image_progress_list.xlsx')
    # sheet = wb['PILOT']
    # img_ids = generate_ids(sheet)
    # paths = search('./files_Images.txt', img_ids)
    # spaths = sort_paths(paths, img_ids)
    # write_to_sheet(spaths, sheet)
    # wb.save('./imge_progress_list_mod.xlsx')
    start = time.time()
    generate_index()
    end = time.time()
    print u'Time to create index: ' + unicode(end - start)

if __name__==u"__main__":
    main()
