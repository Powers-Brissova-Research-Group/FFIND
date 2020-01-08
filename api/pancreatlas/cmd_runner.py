import csv

import api.omero_api as api
from api.omeropy.omero.gateway import BlitzGateway


class OmeroRunner:
    def __init__(self, file_path):
        self.file_path = file_path
        self.conn = None

    def connect(self, func):
        def function_wrapper(*args):
            conn = BlitzGateway('api.user', 'ts6t6r1537k=', host='10.152.140.10', port=4064)
            try:
                conn.connect()
                self.conn = conn
                func(*args)
            finally:
                try:
                    conn.close()
                except:
                    print("Failed to close omero connection")

    def parse_file(self):
        with open(self.file_path) as commands:
            csv_reader = csv.reader(commands, delimiter=',')
            for command in csv_reader:
                print row
                self.execute_command(command)

    @connect
    def execute_command(self, command):
        cmd = command[0]
        img_id = command[1]
        key = command[2]
        val = command[3]

        obj = self.conn.getObject("Image", oid=img_id)

        print obj.getName()
        


