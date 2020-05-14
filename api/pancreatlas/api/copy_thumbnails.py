import csv
import os
from shutil import copyfile

if len(sys.argv) <= 1:
    sys.exit('Not enough arguments provided')

map_loc = sys.argv[1]

os.mkdir('/app001/www/assets/pancreatlas/thumbs/copied_thumbnails')

with open(map_loc) as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    for row in csv_reader:
        print("%s->%s" % (row[0], row[-1]))
        try:
            copyfile('/app001/www/assets/pancreatlas/thumbs/%s.jpg' % (row[0], ), '/app001/www/assets/pancreatlas/thumbs/copied_thumbnails/%s.jpg' % (row[1], ))