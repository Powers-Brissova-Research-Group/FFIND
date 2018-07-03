from subprocess import call
from openpyxl import load_workbook

import re

def generate_index():
    call(['find "$(pwd)" /mnt/drtc-aperio/Images? > files_Images.txt &'])

def generate_ids(sheet):
    ids = []
    for row in sheet.rows:
        if row[11].value == 'Aperio':
            ids.append(str(row[0].value))
    return ids

def create_regex(img_id):
    return '/' + img_id + '.*'

def search(idx_path, ids):
    exps = list(map(create_regex, ids))

    exp = '|'.join(exps)
    print(exp)
    paths = []
    with open(idx_path, 'r') as index:
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
        img_id = str(row[0].value)
        if(img_id == None or row[11].value != 'Aperio'):
            continue
        max_col = 'P'
        print(img_id)
        for path in spaths[img_id]:
            cname = max_col + str(row[0].row)
            sheet[cname] = path
            max_col = next_col(max_col)

def next_col(prev_col):
    next_col = prev_col
    if next_col[-1] == 'Z':
        for i in range(len(next_col) - 1, -1, -1):
            next_col = next_col[:i] + inc_char(next_col[i]) + next_col[i+1:]
        next_col += 'A'
    else:
        next_col = next_col[:-1] + inc_char(next_col[-1])

    return next_col

def inc_char(a):
    if (a == 'Z'):
        return 'A'
    else:
        return chr(ord(a) + 1)

def main():
    wb = load_workbook('./image_progress_list.xlsx')
    sheet = wb['PILOT']
    img_ids = generate_ids(sheet)
    paths = search('./files_Images.txt', img_ids)
    spaths = sort_paths(paths, img_ids)
    write_to_sheet(spaths, sheet)
    wb.save('./imge_progress_list_mod.xlsx')

if __name__=="__main__":
    main()