import csv

import api.omero_api as api
from api.omeropy.omero.gateway import BlitzGateway


def connect(func):
    def function_wrapper(*args):
        conn = BlitzGateway('import.user', '+0rLA6KdhQM=', host='10.152.140.10', port=4064)
        try:
            conn.connect()
            func(*args, conn=conn)
        finally:
            try:
                conn.close()
            except:
                print("Failed to close omero connection")
    return function_wrapper
class OmeroRunner:
    def __init__(self, file_path):
        self.file_path = file_path
        self.conn = None

    def parse_file(self):
        with open(self.file_path) as commands:
            csv_reader = csv.reader(commands, delimiter=',')
            for command in csv_reader:
                print row
                self.execute_command(command)

    @connect
    def execute_command(self, command, conn=None):
        cmd = command[0]
        img_id = command[1]
        key = command[2]
        val = command[3]

        img = api.get_image_by_id(conn, 16912)
        img.modify_map_annotation('Image info - Modality', 'test_value2')
#        print obj.getName()


if __name__ == '__main__':
    tmp = OmeroRunner('blargh')
    tmp.execute_command(['add', 18034, 'key', 'val'])