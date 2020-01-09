import sys, csv

import api.omero_api as api
from api.omeropy.omero.gateway import BlitzGateway


def connect(isProduction):
    def real_connect(func):
        def function_wrapper(*args, **kwargs):
            conn = BlitzGateway('import.user', '+0rLA6KdhQM=', host='10.152.140.10', port=4064)
            if (isProduction):
                conn.SERVICE_OPTS.setOmeroGroup(153)
            try:
                conn.connect()
                func(*args, conn=conn, **kwargs)
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

    def parse_file(self, is_production):
        with open(self.file_path) as commands:
            csv_reader = csv.reader(commands, delimiter=',')
            for command in csv_reader:
                self.execute_command(command, is_production=is_production)

    @connect
    def execute_command(self, command, conn=None, is_production=False):
        if is_production:
            conn.SERVICE_OPTS.setOmeroGroup(153)
        cmd = command[0]
        img_id = command[1]
        key = command[2]
        val = command[3]
        try:
            img = api.get_image_by_id(conn, img_id)
            if cmd == 'add':
                img.add_map_annotation(key, val)
            elif cmd == 'modify':
                img.modify_map_annotation(key, val)
            else:
                print "Unrecognized command: %s" % (cmd, )
        except Exception as e:
            print "Error executing command: %s" % (str(command), )
            print type(Exception)
            print e.args
            print e


if __name__ == '__main__':
    if len(sys.argv) <= 1:
        sys.exit("Too few arguments provided")
    file_path = sys.argv[1]
    is_production = False
    if len(sys.argv) > 2 and sys.argv[2] == 'prod':
        print "!!!SWITCHED TO PRODUCTION MODE!!!"
        is_production = True
    runner = OmeroRunner(file_path)
    runner.parse_file(is_production)
