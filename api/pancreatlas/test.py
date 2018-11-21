import api.omero_api as api
import pprint

ds = api.get_dataset(384)
pprint.pprint(ds.kvals)
