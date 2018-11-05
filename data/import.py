# -*- coding: utf-8 -*-
"""
-----------------------------------------------------------------------------
  Copyright (C) 2018 Glencoe Software, Inc. All rights reserved.
  This program is free software; you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation; either version 2 of the License, or
  (at your option) any later version.
  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.
  You should have received a copy of the GNU General Public License along
  with this program; if not, write to the Free Software Foundation, Inc.,
  51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
------------------------------------------------------------------------------
"""

import argparse
import csv
from getpass import getpass
import logging
import math
import pprint
import os
import sys
import ntpath
from subprocess import Popen, PIPE

LOGGING_FORMAT = "%(asctime)s %(levelname)-7s [%(name)16s] %(message)s"
LOGGER = logging.getLogger('gs_scipts.metadata.csv_image_importer')

# WHERE IS OMERO?
OMERO_BINARY = "/opt/omero/OMERO.current/bin/omero"

OMERO_IMPORTED = False
try:
    import omero
    from omero.gateway import BlitzGateway
    from omero.rtypes import rstring, rlist, rlong
    import omero.scripts as scripts
    from omero.util.temp_files import manager
    OMERO_IMPORTED = True
except:
    OMERO_IMPORTED = False
    LOGGER.warn("OMERO lib not on the path.")


def set_logging(debug):
    if debug:
        logging.basicConfig(
            level=logging.DEBUG, format=LOGGING_FORMAT, stream=sys.stdout)
    else:
        logging.basicConfig(
            level=logging.INFO, format=LOGGING_FORMAT, stream=sys.stdout)


class CsvParser(object):

    # Column name with the image file path
    IMAGE_FILE_PATH_COLUMN_NAME = "Image Location"
    # Internal use. Marks the index of the file path column.
    IMAGE_FILE_PATH_COLUMN_INDEX = None

    # Column name with the External Id
    # Aperio Id, Lif image name, Zeiss image name - used to associate
    # metadata with the correct OMERO.image id.
    EXTERNAL_FILE_ID_COLUMN_NAME = "Image ID (Aperio) or File Name"
    # Internal use. Marks the index of the external id column.
    EXTERNAL_FILE_ID_COLUMN_INDEX = None

    FILE_PATH_KEY = "File path"
    EXTERNAL_ID_KEY = "External id"

    HEADER_KEY = "Header"

    def __init__(self):
        self.file_path = None
        self.header = None
        self.rows = None
        self.image_dictionary = {}
        self.valid = False

    def load(self, file_path=None):
        '''
        Load the csv file.
        '''
        if file_path is not None:
            self.file_path = file_path
        with open(self.file_path, 'U') as csv_file:
            data = list(csv.reader(csv_file))
            self.header = data[0]
            self.rows = data[1:]
        self.validate(self.header, self.rows)

    def check_data_consistency(self, header, rows):
        '''
        Checks if number of header cell == number of cells in each row.

        returns True if all ok, False if finds a difference
        '''
        LOGGER.debug("Checking data consitency")
        bad_rows = []
        header_len = len(header)
        for index, row in enumerate(rows):
            if len(row) != header_len:
                LOGGER.warn("Row %s length != header length %s" %
                         (len(row), len(header)))
                bad_rows.append(index)
        if len(bad_rows) > 0:
            LOGGER.warn("For %i rows number of cell != number of header cells."
                     "Row indices: %s" % (len(bad_rows), bad_rows))
            LOGGER.warn("Header: %s" % header)
            LOGGER.warn("Rows: %s" % rows)
            return False
        return True

    def check_header(self, header):
        '''
        Check header.
        '''
        if self.IMAGE_FILE_PATH_COLUMN_NAME in header:
            self.IMAGE_FILE_PATH_COLUMN_INDEX = header.index(
                self.IMAGE_FILE_PATH_COLUMN_NAME)
        else:
            LOGGER.warn("Image path column: '%s' not found in the header" % 
                        self.IMAGE_FILE_PATH_COLUMN_NAME)
            return False
        if self.EXTERNAL_FILE_ID_COLUMN_NAME in header:
            self.EXTERNAL_FILE_ID_COLUMN_INDEX = header.index(
                self.EXTERNAL_FILE_ID_COLUMN_NAME)
        else:
            LOGGER.warn("Image path column: '%s' not found in the header" % 
                        self.EXTERNAL_FILE_ID_COLUMN_NAME)
            return False
        return True

    def validate(self, header, rows):
        '''
        Validate the csv file.
        '''
        if len(header) == 0:
            LOGGER.error("Zero length header")
            self.image_dictionary = None
            self.valid = False
            return self.valid
        if len(rows) == 0:
            LOGGER.error("Zero length data")
            self.image_dictionary = None
            self.valid = False
            return self.valid
        self.valid = self.check_data_consistency(header, rows)
        if not self.valid:
            return self.valid
        self.valid = self.check_header(header)
        return self.valid

    def get_image_dictionary(self):
        '''
        Parse loaded CSV file.
        '''
        response = {}
        file_path_parser = ImageDictionaryParser()
        for index, row in enumerate(self.rows):
            # Parse the file path
            file_path = file_path_parser.convert_to_unix_path(
                row[self.IMAGE_FILE_PATH_COLUMN_INDEX])
            if file_path is None or file_path == "":
                LOGGER.warn("No file path in row %i. Skipping." % (index + 1))
                continue
            # Get external id ("Image Id (Aperio)" column value)
            external_id = row[self.EXTERNAL_FILE_ID_COLUMN_INDEX]
            if external_id is None or external_id == "":
                LOGGER.warn("No external id in row %s. Skipping." % (index + 1))
                continue
            LOGGER.info("Populating %s" % file_path)
            if file_path not in response:
                response[file_path] = {}
            image_dict = response[file_path]
            image_dict[external_id] = {}
            metadata_dict = image_dict[external_id]
            # Use generic names for the columns
            # (defined on the to of the class)
            metadata_dict[self.FILE_PATH_KEY] = file_path
            metadata_dict[self.EXTERNAL_ID_KEY] = external_id
            # Parse all the columns to key: value pairs for use
            # with key-value pair and tag annotaiton stores
            for index, cell in enumerate(row):
                if index in [
                        self.IMAGE_FILE_PATH_COLUMN_INDEX,
                        self.EXTERNAL_FILE_ID_COLUMN_INDEX]:
                    continue
                metadata_dict[self.header[index]] = cell
        # Create ordered list for key-value pair population
        ordered_header_list = []
        for index, cell in enumerate(self.header):
            if index in [
                    self.IMAGE_FILE_PATH_COLUMN_INDEX,
                    self.EXTERNAL_FILE_ID_COLUMN_INDEX]:
                continue
            ordered_header_list.append(cell)
        ordered_header_list.append(self.EXTERNAL_ID_KEY)
        ordered_header_list.append(self.FILE_PATH_KEY)
        response[self.HEADER_KEY] = ordered_header_list
        self.image_dictionary = response
        return response


class ImageDictionaryParser(object):

    # User mount to OMERO server mount mappings
    FILE_PATH_MAPPERS = {
        "/drtc-aperio2": "/mnt/drtc-aperio",
        "/i10filecifs.vumc.org/powers-imaging": "/mnt/powers-omero",
        "/test/Images": "/mnt/d"}

    IMPORT_PATH_KEY = "Import file path"

    def convert_to_unix_path(self, path_to_convert):
        '''
        Convert path to a unix path and replaces "User" mounts with
        OMERO server mounts.
        '''
        LOGGER.info("Converting path: %s", path_to_convert)
        if path_to_convert is None or path_to_convert == "":
            return ""
        dirs = []
        file_path = path_to_convert.replace("\\", "/").strip()
        file_path = file_path.replace("//", "/")
        for key in self.FILE_PATH_MAPPERS:
            if key in file_path:
                file_path = file_path.replace(key, self.FILE_PATH_MAPPERS[key])
        while True:
            file_path, directory = ntpath.split(file_path)
            if directory != "":
                dirs.append(directory)
            else:
                if file_path != "":
                    dirs.append(file_path)
                break
        converted_file_path = ""
        dirs.reverse()
        for el in dirs:
            converted_file_path = os.path.join(converted_file_path, el)
        # Special case 1:
        if ".mdb" in converted_file_path:
            converted_file_path, image_name = os.path.split(
                converted_file_path)
            LOGGER.warn(
                "MDB file found, removing image name %s from the path" %
                image_name)
        return converted_file_path

    def get_files_to_import(self, image_dictionary):
        '''
        Returs list of file paths to import
        '''
        file_path_list = set()
        for key in image_dictionary:
            if key in [CsvParser.HEADER_KEY]:
                continue
            file_path_list.add(key)
        return file_path_list


class OmeroResolver(object):

    # Internal keys
    IMAGE_ID_KEY = "image_ids"
    KEY_VALUE_KEY = "key_value_pairs"
    IMAGES_WITH_METADATA_KEY = "image_ids_with_metadata"
    IMAGES_WITH_NO_METADATA_KEY = "image_ids_with_no_metadata"
    DATASET_WITH_METADATA_NAME = "Images with metadata"
    DATASET_WITH_METADATA_KEY = "dataset_with_metadata_id"
    DATASET_WITH_NO_METADATA_NAME = "Images with no metadata"
    DATASET_WITH_NO_METADATA_KEY = "dataset_with_no_metadata_id"
    MAP_ANNOTAION_NS = "com.glencoesoftware.metadata_import.map_annotation"

    # Define tagset, tag creation from the metadata
    # Key -> Tagset name; Value: CSV column name
    TAGSETS= {
        "UNOS ID": ["Donor info - UNOS ID"],
        "LIMS ID": ["Donor info - LIMS ID"],
        "Age": ["Donor info - Age"],
        "Sex": ["Donor info - Sex"],
        "File Type": ["Image info - File Type"],
	"Section Plane": ["Image info - Section Plane"],
        "Pancreas Region": ["Image info - Pancreas Region"],
        "Marker": ["Stain info - cy2", "Stain info - cy3", "Stain info - cy5", "Stain info - DAPI"],
	"Disease Status": ["Donor info - Disease Status"],
	"Disease Duration": ["Donor info - Disease Duration"]
    }

    # Define types so the tagset and tags created by this script can
    # be easily distinguished from the user created ones.
    TAGSET_ENTITY_TYPE = "com.glencoesoftware.metadata_import.tagset"
    TAG_ENTITY_TYPE = "com.glencoesoftware.metadata_import.tag"
    TAGSET_NS = omero.constants.metadata.NSINSIGHTTAGSET

    def __init__(self, gateway):
        '''
        gateway - BlitzGateway
        '''
        self.gateway = gateway
        self.external_info_tag_query = \
            "SELECT tag FROM TagAnnotation AS tag" \
            " LEFT OUTER JOIN tag.details.externalInfo as einfo" \
            " WHERE tag.textValue in (:textValues)" \
            " AND einfo.entityType = :entityType"
        self.external_info_tag_ns_query = \
            "SELECT tag FROM TagAnnotation AS tag" \
            " LEFT OUTER JOIN tag.details.externalInfo AS einfo" \
            " WHERE tag.textValue = :text AND tag.ns = :ns" \
            " AND einfo.entityType = :entityType"
        self.image_name_query = \
            "SELECT image.id, image.name FROM " \
            "Image as image " \
            "WHERE image.id in (:ids)"

    def get_batch(self, list_to_batch, batch_size, batch_index):
        low_index = batch_index * batch_size
        high_index = (batch_index + 1) * batch_size
        if high_index > len(list_to_batch):
            high_index = len(list_to_batch)
        return list_to_batch[low_index:high_index]

    def get_names(self, image_ids):
        '''
        Get image names from the server.
        '''
        batch_size = 50
        batch_number = int(math.ceil(len(image_ids) / float(batch_size)))
        results = []
        ctx = {'omero.group': '-1'}
        for batch_index in range(batch_number):
            params = omero.sys.ParametersI()
            image_id_batch = self.get_batch(image_ids, batch_size, batch_index)
            params.addIds(image_id_batch)
            results.extend(self.gateway.getQueryService().projection(
                self.image_name_query, params, ctx
            ))
        results = [(a.val, b.val) for a, b in [result for result in results]]
        response = {}
        for result in results:
            response[result[0]] = result[1]
        LOGGER.info(response)
        return response

    def get_image_names(self, image_dictionary):
        '''
        Retrives image names from the server based on their ID.
        OMERO import returns image ids. Image names are needed to resolve
        the metadata based on the "Image Id (Aperio)" column.
        '''
        image_ids = []
        for key in image_dictionary:
            image_ids.extend(image_dictionary[key])
        image_id_dictionary = self.get_names(image_ids)
        response = {}
        for key, id_list in image_dictionary.items():
            response[key] = {}
            for image_id in id_list:
                image_name = image_id_dictionary[long(image_id)]
                if image_name in response[key]:
                    response[key][image_name].append(image_id)
                else:
                    response[key][image_name] = [image_id]
        LOGGER.info(response)
        return response

    def get_key_values(self, metadata, ordered_key_list):
        '''
        Create key-value pairs using CSV header order.
        '''
        named_value_list = []
        for key in ordered_key_list:
            if key in metadata:
                named_value_list.append(
                    omero.model.NamedValue(
                        name=key.encode('utf_8'),
                        value=metadata[key].encode('utf_8'))
                )
        return named_value_list

    def create_dataset(self, project_id, dataset_name):
        '''
        Create Dataset with dataset_name and link it to the Project:Id.
        '''
        dataset = omero.model.DatasetI()
        dataset.setName(
            omero.rtypes.rstring(dataset_name))
        link = omero.model.ProjectDatasetLinkI()
        link.setParent(omero.model.ProjectI(project_id, False))
        dataset = self.gateway.getUpdateService().saveAndReturnObject(dataset)
        link.setChild(dataset)
        self.gateway.getUpdateService().saveObject(link)
        return dataset.id

    def create_datasets(self, project_id):
        '''
        Create datasets for images with metadata and images with no metadata.
        '''
        project = self.gateway.getObject("Project", project_id)
        response = {}
        for dataset in project.listChildren():
            if dataset.name == self.DATASET_WITH_METADATA_NAME:
                response[self.DATASET_WITH_METADATA_KEY] = dataset.id
                break
        for dataset in project.listChildren():
            if dataset.name == self.DATASET_WITH_NO_METADATA_NAME:
                response[self.DATASET_WITH_NO_METADATA_KEY] = dataset.id
                break
        if self.DATASET_WITH_METADATA_KEY not in response:
            response[self.DATASET_WITH_METADATA_KEY] = self.create_dataset(
                project_id, self.DATASET_WITH_METADATA_NAME
            )
        if self.DATASET_WITH_NO_METADATA_KEY not in response:
            response[self.DATASET_WITH_NO_METADATA_KEY] = self.create_dataset(
                project_id, self.DATASET_WITH_NO_METADATA_NAME
            )
        return response

    def get_all_images_ids(self, image_name_dictionary):
        '''
        Get all imported image ids.
        '''
        image_ids = []
        for file_path in image_name_dictionary:
            for image_name in image_name_dictionary[file_path]:
                image_ids.extend(
                    image_name_dictionary[file_path][image_name]
                )
        return image_ids

    def get_images_with_metadata(self, image_dictionary, image_name_dictionary):
        '''
        Returns dictionary containing lists of images with and without metadata
        '''
        no_metadata_image_ids = self.get_all_images_ids(image_name_dictionary)
        with_metadata_image_ids = []
        for file_path, external_id_dict in image_dictionary.items():
            if file_path in [CsvParser.HEADER_KEY]:
                continue
            if file_path not in image_name_dictionary:
                LOGGER.warn(
                    "File path %s not on the image name list" % file_path)
                continue
            for external_id, metadata in external_id_dict.items():
                for image_name in image_name_dictionary[file_path]:
                    if external_id in image_name:
                        image_ids = image_name_dictionary[file_path][image_name]
                        with_metadata_image_ids.extend(image_ids)
                        for image_id in image_ids:
                            no_metadata_image_ids.remove(image_id)
        response = {}
        response[self.IMAGES_WITH_METADATA_KEY] = with_metadata_image_ids
        response[self.IMAGES_WITH_NO_METADATA_KEY] = no_metadata_image_ids
        return response

    def link_images_to_dataset(self, dataset_id, image_ids):
        '''
        Create and return links between Dataset:Id and Image:Ids.
        '''
        dataset = omero.model.DatasetI(dataset_id, False)
        links = []
        for image_id in image_ids:
            link = omero.model.DatasetImageLinkI()
            link.setParent(dataset)
            link.setChild(omero.model.ImageI(image_id, False))
            links.append(link)
        return links

    def link_images_to_datasets(self, dataset_dictionary, image_id_dictionary):
        '''
        Create and save links between Datasets and Images
        '''
        links = []
        links.extend(
            self.link_images_to_dataset(
                dataset_dictionary[self.DATASET_WITH_METADATA_KEY],
                image_id_dictionary[self.IMAGES_WITH_METADATA_KEY]
            )
        )
        links.extend(
            self.link_images_to_dataset(
                dataset_dictionary[self.DATASET_WITH_NO_METADATA_KEY],
                image_id_dictionary[self.IMAGES_WITH_NO_METADATA_KEY]
            )
        )
        self.save_annotations(links)

    def get_image_annotations(self, image_dictionary, image_name_dictionary):
        '''
        Combine CSV metadata and the OMERO import metadata
        to create key value pairs.
        '''
        LOGGER.debug(image_dictionary)
        LOGGER.debug(image_name_dictionary)
        response = {}
        ordered_key_list = image_dictionary[CsvParser.HEADER_KEY]
        for file_path, external_id_dict in image_dictionary.items():
            if file_path in [CsvParser.HEADER_KEY]:
                continue
            if file_path not in image_name_dictionary:
                LOGGER.warn(
                    "File path %s not on the image name list" % file_path)
                continue
            for external_id, metadata in external_id_dict.items():
                response[external_id] = {}
                image_ids = []
                for image_name in image_name_dictionary[file_path]:
                    if external_id in image_name:
                        image_ids.extend(
                            image_name_dictionary[file_path][image_name])
                response[external_id][self.IMAGE_ID_KEY] = image_ids
                response[external_id][self.KEY_VALUE_KEY] = self.get_key_values(
                    metadata, ordered_key_list
                )
        return response

    def save_annotations(self, annotation_list):
        '''
        Save objects.
        '''
        LOGGER.info("Annotations: %s" % annotation_list)
	self.gateway.getUpdateService().saveArray(annotation_list)

    def create_map_annotations(self, image_annotation_dictionary):
        '''
        Create map annotations on the server.
        '''
        links = []
        for external_id, metadata in image_annotation_dictionary.items():
            LOGGER.info("Adding map annotation to %s" % external_id)
            map_ann = omero.model.MapAnnotationI()
            map_ann.setMapValue(metadata[self.KEY_VALUE_KEY])
            map_ann.setNs(omero.rtypes.rstring(self.MAP_ANNOTAION_NS))
            for image_id in metadata[self.IMAGE_ID_KEY]:
                link = omero.model.ImageAnnotationLinkI()
                link.setParent(omero.model.ImageI(image_id, False))
                link.setChild(map_ann)
                links.append(link)
            if len(links) > 20:
                self.save_annotations(links)
                links = []
        if len(links) > 0:
            self.save_annotations(links)

    def get_image_tags(self, image_dictionary, image_name_dictionary):
        '''
        Combine CSV metadata and the OMERO import metadata to
        create tag annotations.
        '''
        response = {}
        for tagset_key in self.TAGSETS:
            response[tagset_key] = {}
        for file_path, external_id_dict in image_dictionary.items():
            if file_path in [CsvParser.HEADER_KEY]:
                continue
            if file_path not in image_name_dictionary:
                LOGGER.warn(
                    "File path %s not on the image name list" % file_path)
                continue
            for external_id, metadata in external_id_dict.items():
                for tagset_key, tagset_values in self.TAGSETS.items():
                    for tagset_value in tagset_values:
                        if tagset_value not in metadata:
                            continue
                        # Get image ids
                        tag_value = metadata[tagset_value].strip()
                        if tag_value == "n/a" or tag_value == "":
                            continue
                        tag_values = [tag.strip() for tag in tag_value.split(',')]
			LOGGER.info("Tag value: %s" % tagset_value)
                        image_ids = []
                        for image_name in image_name_dictionary[file_path]:
                            if external_id in image_name:
                                if "[label image]" in image_name or \
                                        "[macro image]" in image_name:
                                    continue
                                image_ids.extend(
                                    image_name_dictionary[file_path][image_name])
                        # Assign image ids to tag value                
                        for tag in tag_values:
			    if tag.strip() not in response[tagset_key]:
				LOGGER.info("Adding %s to existing list for tag %s" % (image_ids, tag))
                                response[tagset_key][tag.strip()] = image_ids
                            else:
				LOGGER.info("Adding %s to existing list for tag %s: %s" % (image_ids, tag, response[tagset_key][tag.strip()]))
                                response[tagset_key][tag.strip()].extend(image_ids)
				response[tagset_key][tag.strip()] = list(set(response[tagset_key][tag.strip()]))
        return response

    def check_tagset(self, tagset_name):
        '''
        Checks if tagset exists. If not creates a new one.
        '''
        LOGGER.debug("Checking tagset.")
        params = omero.sys.ParametersI()
        params.addString("text", tagset_name)
        params.addString("ns", self.TAGSET_NS)
        params.addString("entityType", self.TAGSET_ENTITY_TYPE)
        try:
            tagset = self.gateway.getQueryService().findByQuery(
                self.external_info_tag_ns_query, params)
        except omero.ApiUsageException:
            message = "Multiple tagsets with the name '%s' exists." % \
                tagset_name
            LOGGER.error(message, exc_info=True)
            raise
        except:
            message = "Failed to query for tagset %s" % tagset_name
            LOGGER.error(message, exc_info=True)
        if tagset is None:
            LOGGER.info("Tagset %s not found, creating new one." % tagset_name)
            tag = omero.model.TagAnnotationI()
            tag.setTextValue(rstring(tagset_name))
            tag.setNs(rstring(self.TAGSET_NS))
            external_info = omero.model.ExternalInfoI()
            external_info._entityType = rstring(self.TAGSET_ENTITY_TYPE)
            external_info._entityId = rlong(0)
            tag._details.setExternalInfo(external_info)
            tag = self.gateway.getUpdateService().saveAndReturnObject(tag)
            tagset = omero.model.TagAnnotationI(tag.id.val, False)
        else:
            LOGGER.info("Tagset %s found (id: %s)"
                     % (tagset_name, tagset.id.val))
            tagset = omero.model.TagAnnotationI(tagset.id.val, False)
        return tagset

    def get_exisiting_tags(self, tag_text_values):
        '''
        Retrieves a list of existing tags.
        '''
        LOGGER.debug("Retrieving tags %s." % pprint.pformat(tag_text_values))
        params = omero.sys.ParametersI()
        tag_names_rstring = [rstring(tag_name) for tag_name in tag_text_values]
        params.add("textValues", rlist(tag_names_rstring))
        params.add("entityType", rstring(self.TAG_ENTITY_TYPE))
        results = None
        try:
            results = self.gateway.getQueryService().projection(
                self.external_info_tag_query, params)
        except:
            message = "Couldn't retrieve tags"
            LOGGER.error(message, exc_info=True)
            raise
        if not results or not results[0]:
            LOGGER.debug("No tags found %s" % results)
            return []
        tags = [result[0].val for result in results]
        LOGGER.debug("Found %i tags." % len(tags))
        return tags

    def prepare_tags(self, tag_text_values, tagset_id):
        '''
        returns list of omero tags
        creates a new tag if it does not find one on the server.
        '''
        omero_tags = self.get_exisiting_tags(tag_text_values)
        existing_tag_names = set([tag.textValue.val for tag in omero_tags])
        to_create = list(set(tag_text_values) - existing_tag_names)
        existing_tags = {}
        for tag in omero_tags:
            existing_tags[tag.textValue.val] = tag.id.val
        return {"tags_to_create": to_create, "existing_tags": existing_tags}

    def link_tag_to_tagset(self, tag_id, tagset_id):
        '''
        Create a link between OMERO tagset and OMERO tag.
        '''
        LOGGER.debug("Creating tag %s to tagset %s link"
                     % (tag_id, tagset_id))
        link = omero.model.AnnotationAnnotationLinkI()
        link.setChild(omero.model.TagAnnotationI(tag_id, False))
        link.setParent(omero.model.TagAnnotationI(tagset_id, False))
        return link

    def link_tag_to_image(self, tag_id, image_id):
        '''
        Create a link between OMERO image and OMERO tag.
        '''
        LOGGER.debug("Creating image %s to tag %s link"
                      % (image_id, tag_id))
        link = omero.model.ImageAnnotationLinkI()
        link.setChild(omero.model.TagAnnotationI(tag_id, False))
        link.setParent(omero.model.ImageI(image_id, False))
        return link

    def create_tag(self, text_value):
        '''
        Create OMERO tag.
        '''
        tag = omero.model.TagAnnotationI()
        tag.setTextValue(rstring(text_value.strip()))
        external_info = omero.model.ExternalInfoI()
        external_info._entityId = rlong(-1)
        external_info._entityType = rstring(self.TAG_ENTITY_TYPE)
        tag._details.setExternalInfo(external_info)
        tag = self.gateway.getUpdateService().saveAndReturnObject(tag)
        return tag

    def create_tag_annotations(self, tag_annotation_dictionary):
        '''
        Create tag annotaitons from the dictionary:
        {key: tagset name; value: {key: tag_name; value: list of image ids}}
        '''
        links = []
        LOGGER.info("Tags:\n%s" % pprint.pformat(tag_annotation_dictionary))
        for tagset_name in tag_annotation_dictionary:
            if len(tag_annotation_dictionary[tagset_name]) == 0:
                continue
            tagset_object = self.check_tagset(tagset_name)
            tag_names = tag_annotation_dictionary[tagset_name].keys()
            # Get a list of already existing tags and the tags that have to 
            # be created.
            omero_tags = self.prepare_tags(tag_names, tagset_object.id.val)
            for tag_name in omero_tags["tags_to_create"]:
                image_ids = tag_annotation_dictionary[tagset_name][tag_name.strip()]
                tag = self.create_tag(tag_name.strip())
                links.append(
                    self.link_tag_to_tagset(tag.id.val, tagset_object.id.val))
                for image_id in image_ids:
                    links.append(
                        self.link_tag_to_image(tag.id.val, image_id))
            for tag_name in omero_tags["existing_tags"]:
                image_ids = tag_annotation_dictionary[tagset_name][tag_name.strip()]
                for image_id in image_ids:
                    links.append(self.link_tag_to_image(
                        omero_tags["existing_tags"][tag_name.strip()], image_id))
            if len(links) > 20:
		LOGGER.info("*******************Links********************\n%s" % links)
                self.save_annotations(links)
                links = []
        if len(links) > 1:
	    LOGGER.info("*******************Links********************\n%s" % links)
            self.save_annotations(links)

    def set_all_channels_to_active(self, image_name_dictionary):
        image_ids = self.get_all_images_ids(image_name_dictionary)
        for image_id in image_ids:
            LOGGER.debug("Saving rendering settings for image:%s" % image_id)
            try:
                image = self.gateway.getObject("Image", image_id)
                image.setActiveChannels(range(1, image.getSizeC() + 1))
                image.saveDefaults()
            except Exception:
                LOGGER.error(
                    "Could not save rendering settings for %s:%s" %
                    (image.name, image.id))


class OmeroImporter(object):
    '''
    Run OMERO imports using subprocess
    '''

    def __init__(self, gateway):
        '''
        gateway - BlitzGateway
        '''
        self.gateway = gateway

    def import_files(self, file_list, omero_arguments):
        '''
        file_list - list of file paths to import
        omero_arguments - list of OMERO import arguments
        return - response with a list of succeeded and failed imports
        '''
        response = {
            "success": {},
            "fail": {}
        }
        binary = OMERO_BINARY
        args = [binary] + omero_arguments
        for import_file in file_list:
            import_args = args + [import_file]
            LOGGER.info("Importing %s" % import_file)
            data = Popen(import_args, stdout=PIPE, stderr=PIPE).communicate()
            if len(data[0]) == 0:
                LOGGER.error("Failed to import %s" % import_file)
                LOGGER.error("Issue:\n%s" % data[1])
                response["fail"][import_file] = data[1]
            else:
                id_list = data[0].strip().split(":")[1].split(",")
                image_ids = []
                for image_id in id_list:
                    try:
                        image_ids.append(long(image_id))
                    except ValueError:
                        # invalid literal for long() with base 10:
                        # '823\nPrevious session expired for test on localhost'
                        image_ids.append(long(image_id.split("\n")[0]))
                LOGGER.info("Imported image ids: %s" % image_ids)
                response["success"][import_file] = image_ids
        LOGGER.info("Sucessfully imported: %s" % response["success"])
        LOGGER.info("Failed to import: %s" % response["fail"].keys())
        return response


def import_images(
        gateway, metadata_file_path, import_params,
        project_id=None, add_key_value_pairs=False, add_tags=False):
    '''
    Parser CSV file, import images, add key-value pairs and tag annotations
    '''
    # Parse CSV file
    parser = CsvParser()
    parser.load(metadata_file_path)
    image_dictionary = parser.get_image_dictionary()
    # Get file_paths to import
    files_to_import = ImageDictionaryParser().get_files_to_import(
        image_dictionary)
    LOGGER.info("Importing files:\n%s" % pprint.pformat(files_to_import))
    # Run OMERO import
    importer = OmeroImporter(gateway)
    response = importer.import_files(files_to_import, import_params)
    # Prepare key-value pair and tag annotation import
    omero_resolver = OmeroResolver(gateway)
    # key = file_path -> keys = (image_ids, image_names)
    image_name_dictionary = omero_resolver.get_image_names(response["success"])
    if project_id is not None:
        dataset_dictionary = omero_resolver.create_datasets(project_id)
        image_ids_by_metadata = omero_resolver.get_images_with_metadata(
            image_dictionary, image_name_dictionary)
        omero_resolver.link_images_to_datasets(
            dataset_dictionary, image_ids_by_metadata)
    LOGGER.info(
        "Import summary:\n"
        "\tSuccessfully imported %s images.\n"
        "\tFailed to import %s images." %
        (len(response["success"]), len(response["fail"]))
    )
    if add_key_value_pairs:
        # Get key-value metadata
        image_annotation_dictionary = omero_resolver.get_image_annotations(
            image_dictionary, image_name_dictionary
        )
        LOGGER.debug(pprint.pformat(image_annotation_dictionary))
        # Create key-value pairs
        omero_resolver.create_map_annotations(image_annotation_dictionary)
    if add_tags:
        # Get tag annotation metadata
        tag_annotation_dictionary = omero_resolver.get_image_tags(
            image_dictionary, image_name_dictionary
        )
        LOGGER.debug(tag_annotation_dictionary)
        # Create tag annotations
        omero_resolver.create_tag_annotations(tag_annotation_dictionary)
        omero_resolver.set_all_channels_to_active(image_name_dictionary)
    message = "Success: %s images; Failed: %s images" % \
        (len(response["success"]), len(response["fail"]))
    return message


def import_images_from_csv(args):
    '''
    Command line import.
    Get parameters, prepare the connection, pass it all to the import method.
    '''
    LOGGER.info("Importing files from %s file" % args['input'])
    # Get params
    file_path = args['input']
    add_tags = args['add_tag_annotations']
    add_key_value_paris = args["add_key_values"]
    project_id = args["project"]
    # Prepare connection to the server
    gateway = setup_connection(args)
    admin = gateway.getAdminService()
    session_id = admin.getEventContext().sessionUuid
    # Prepare OMERO import parameters
    import_params = get_import_params(args, session_id)
    try:
        # Parase CSV and run the import
        message = import_images(
            gateway, file_path, import_params,
            project_id=project_id,
            add_key_value_pairs=add_key_value_paris,
            add_tags=add_tags)
        return message
    finally:
        if gateway is not None:
            gateway._closeSession()


def define_import_params(
        host, port, key, group=None, in_place_import=False):
    '''
    Convert OMERO import parameters to subprocess ready list.
    '''
    params = [
        'import',
        '-q',
        '-s', host,
        '-p', str(port),
        '-k', key
    ]
    if group is not None:
        params.extend(['-g', group])
    if in_place_import:
        params.extend(['--', '--transfer=ln_s'])
    return params


def get_import_params(params, session_key):
    '''
    Prepare OMERO import command line arguments:
    More info at:
      * https://docs.openmicroscopy.org/omero/5.4.6/users/cli/import.html
    '''
    LOGGER.info(params)
    server = params["server"]
    port = params["port"]
    group = params['group']
    in_place_import = params["in_place_import"]
    return define_import_params(
        server, port, session_key, group, in_place_import)


def setup_connection(params):
    '''
    Connect to OMERO.server using command line arguments.
    '''
    if params["server"] is None:
        LOGGER.error("OMERO.server host not specified.")
        raise Exception("OMERO.serber host not specified.")
    conn = omero.client(host=params["server"], port=params["port"])
    session = None
    if params["key"] is not None:
        conn.joinSession(params["key"])
    else:
        user = params["user"]
        if user is None:
            user = raw_input("User name: ")
        password = params["password"]
        if password is None:
            password = getpass("OMERO Password: ")
        session = conn.createSession(
            username=user,
            password=password
        )
        conn.enableKeepAlive(60)
        session.detachOnDestroy()
    gateway = BlitzGateway(client_obj=conn)
    user = gateway.getUser()
    group = gateway.getGroupFromContext()
    LOGGER.info(
        "OMERO user id: %s, username: %s, full name: %s, group: %s" %
        (user.getId(), user.getName(), user.getFullName(), group.getName())
    )
    return gateway


def download_file_annotation(gateway, file_annotation_id, directory):
    '''
    Download file annotation from the OMERO.server 
    '''
    file_annotation = gateway.getObject('FileAnnotation', file_annotation_id)
    file_path = os.path.join(directory, 'metadata.csv')
    with open(str(file_path), 'wb') as f:
        try:
            for chunk in file_annotation.getFileInChunks():
                f.write(chunk)
        except:
            LOGGER.error(
                'Could not download the file annotations', exc_info=True)
            raise
    return file_path


def run_as_omero_script():
    '''
    OMERO.script setup.
    More info at:
      * https://docs.openmicroscopy.org/omero/5.4.6/developers/scripts/user-guide.html
      * https://docs.openmicroscopy.org/omero/5.4.6/developers/scripts/
      * https://github.com/openmicroscopy/omero-example-scripts
    '''
    object_types = [omero.rtypes.rstring("Project")]
    client = scripts.client(
        'Import_Images_From_CSV.py',
        """
        This script parses a CSV file. Imports files into two Datasets.
        Images with no metadata will be linked to NoMetadata Dataset and
        images with metadata will be linked to WithMetadata Dataset.
        """,
        scripts.String(
            "Data_Type", optional=False, grouping="1",
            description="Choose image source.",
            values=object_types, default="Project"),
        scripts.List(
            "IDs", optional=False, grouping="2",
            description="List of image contrainer IDs").ofType(
                omero.rtypes.rlong(0)),
        scripts.Long(
            "File_Annotation", optional=False, grouping="3",
            description="CSV file."),
        scripts.Bool(
            "In_Place_Import", optional=False, grouping="4",
            description="Do not copy images?"),
        scripts.Bool(
            "Add_Tag_Annotations", optional=False, grouping="5",
            description="Tag Annotations?"),
        scripts.Bool(
            "Add_Key_Value_Pairs", optional=False, grouping="6",
            description="Key Value Pairs?"),
        scripts.Bool(
            "Debug", optional=False, grouping="7",
            description="Debug?"),
        version="0.1",
        authors=["Emil Rozbicki"],
        institutions=["Glencoe Software Inc."],
        contact="emil@glencoesoftware.com",
    )

    try:
        # process the list of args above.
        directory = manager.gettempdir().encode("UTF-8")
        script_params = {}
        for key in client.getInputKeys():
            if client.getInput(key):
                script_params[key.lower()] = client.getInput(key, unwrap=True)
        # wrap client to use the Blitz Gateway
        client.enableKeepAlive(60)
        gateway = BlitzGateway(client_obj=client)
        if script_params["debug"]:
            LOGGER.setLevel(logging.DEBUG)
        metadata_file = download_file_annotation(
            gateway, script_params["file_annotation"], directory)
        object_ids = script_params["ids"]
        in_place_import = script_params["in_place_import"]
        add_tags = script_params['add_tag_annotations']
        add_key_value_paris = script_params["add_key_value_pairs"]
        admin = gateway.getAdminService()
        session_id = admin.getEventContext().sessionUuid
        import_params = define_import_params(
            "localhost", 4064, session_id, None, in_place_import)
        LOGGER.debug("Session id %s" % session_id)
        message = import_images(
            gateway, metadata_file, import_params,
            project_id = object_ids[0],
            add_key_value_pairs=add_key_value_paris,
            add_tags=add_tags
        )
        client.setOutput("Message", rstring(message))
    finally:
        client.closeSession()


def parse_arguments():
    '''
    Command line arguments.
    '''
    description = "Import images and metadata based on thes csv file. " \
        "This script parses a CSV file. Imports files into two Datasets. " \
        "Images with no metadata will be linked to NoMetadata Dataset and " \
        "images with metadata will be linked to WithMetadata Dataset."
    width = 225
    column_width = 45
    parser = argparse.ArgumentParser(
        prog='python excel_importer.py',
        description=description,
        formatter_class=lambda
        prog: argparse.HelpFormatter(
            prog, max_help_position=column_width, width=width
        )
    )
    parser.add_argument(
        '-s', '--server', required=True,
        help='OMERO server.'
    )
    parser.add_argument(
        '-p', '--port', type=int, default=4064,
        help='OMERO port.'
    )
    parser.add_argument(
        '-u', '--user',
        help='OMERO user.'
    )
    parser.add_argument(
        '-w', '--password',
        help='OMERO password.'
    )
    parser.add_argument(
        '-k', '--key',
        help='OMERO session UUID.'
    )
    parser.add_argument(
        '--input', '-i', required=True,
        help='Input (csv) file name.'
    )
    parser.add_argument(
        '--debug', '-d', required=False, action='store_true',
        help='Set the logging level to debug.'
    )
    parser.add_argument(
        '--in-place-import', required=False, action='store_true',
        help='Run in place import?'
    )
    parser.add_argument(
        '--project', required=True, type=int,
        help='Project ID to import the images to.'
    )
    parser.add_argument(
        '--group', required=False,
        help='Group name to import the images to.'
    )
    parser.add_argument(
        '--add_tag_annotations', required=False, action='store_true',
        help='Attach tag annotations.'
    )
    parser.add_argument(
        '--add_key_values', required=False, action='store_true',
        help='Attach key value pairs.'
    )
    args = parser.parse_args()
    set_logging(vars(args)["debug"])
    LOGGER.debug("Logging set to debug.")
    import_images_from_csv(vars(args))


def main():
    '''

    OMERO.scripts are executed as ./script so will take advatage of that to
    make the code usable as OMERO.script and standalone.

    '''
    level = logging.INFO
    logging.basicConfig(level=level, format=LOGGING_FORMAT, stream=sys.stdout)
    # Check if OMERO is on the path
    if not OMERO_IMPORTED:
        LOGGER.warn("OMERO not on the path.")
        return
    # Check if the execution was initiated by OMERO.script service
    if sys.argv[0] == './script':
        run_as_omero_script()
    else:
        parse_arguments()


if __name__ == "__main__":
    main()
