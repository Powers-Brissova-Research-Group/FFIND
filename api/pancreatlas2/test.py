import api.omero_api as api
import pprint
import logging

logging.basicConfig()
logger = logging.getLogger('omero.gateway')
ds = api.get_dataset(384)
pprint.pprint(ds.kvals)
