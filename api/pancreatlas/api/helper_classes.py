from omeropy.omero.gateway import TagAnnotationWrapper, MapAnnotationWrapper, DatasetWrapper
import re
import collections
import logging
import sys

class Image:
    def __init__(self, img_wrapper):
        self.img_wrapper = img_wrapper
        self.id = img_wrapper.getId()
        self.tags = []
        self.key_values = {}
        self.channel_info = {}
        self.fetch_annotations()
        self.get_channel_info()
        self.name = self.img_wrapper.getName()
        self.file_name = self.gen_file_name()
        self.size_x = img_wrapper.getSizeX()
        self.size_y = img_wrapper.getSizeY()

    def __eq__(self, other):
        if isinstance(other, Image):
            return self.id == other.id
        return Falseconnect('api.user', )

    def __hash__(self):
        return hash(self.id)

    def __str__(self):
        return "Image " + str(self.id)
    
    def __repr__(self):
        return self.__str__()

#    def get_channel_info(self):
#        print >> sys.stderror, 'NEW IMAGE'
#        channel_wrappers = self.img_wrapper.getChannels()
#        self.channel_info.append("WAH")
#        for channel in channel_wrappers:
#            print "Getting channel %s: %s" % (channel.getLabel(), channel.getColor.getHtml())
#            self.channel_info.append(channel.getLabel())

    def fetch_annotations(self):
        anns = list(self.img_wrapper.listAnnotations())
        for ann in anns:
            if isinstance(ann, TagAnnotationWrapper):
                tmp = Tag(ann, ann.getId())
                self.tags.append(tmp)
            elif isinstance(ann, MapAnnotationWrapper):
                for pair in ann.getValue():
                    self.key_values[pair[0]] = {'val': pair[1], 'desc': 'default val'}
        channels = list(self.img_wrapper.getChannels())
        for channel in channels:
            self.channel_info[channel.getLabel()] =  channel.getColor().getHtml()
    def get_tags(self):
        return self.tags

    def get_tag_names(self):
        return [tag.tname for tag in self.tags]

    def has_tag(self, tag):
        return tag in self.tags

    def get_key_values(self):
        return self.key_values

    def get_channel_info(self):
        return self.channel_info

    def save_thumbnail(self, file_loc, max_len):
        f = open(file_loc + self.file_name, 'w')
        jpg = self.img_wrapper.getThumbnail((max_len))
        # print jpg
        f.write(jpg)
        f.close()

    def gen_file_name(self):
        fname = self.name[self.name.find('[') + 1 : self.name.find(']')]
        if fname == '0':
            fname = self.name[0:self.name.find('.')]
        return fname + '.jpg'

class Tag:
    def __init__(self, tag_wrapper, tid):
        self.tag_wrapper = tag_wrapper
        self.tid = tid
        self.tname = tag_wrapper.getValue()

    def __eq__(self, other):
        if isinstance(other, Tag):
            return other.tid == self.tid
        return False

    def __hash__(self):
        return hash(self.tid)

    def __str__(self):
        return self.get_tag_name()

    def __repr__(self):
        return self.__str__()

    def get_tag_name(self):
        return self.tag_wrapper.getValue()

class TagSetI:
    def __init__(self, set_name, tags):
        self.name = str(set_name)
        self.tags = [str(t) for t in tags]

    def sort(self):
        if self.name.upper() == "AGE":
            # self.tags.sort(self.compare_ages)
            ret = sorted(self.tags, cmp=self.compare_ages)
            return ret
        else:
            return sorted(self.tags, key=str.lower)

    def compare_ages(self, age1, age2):
        age1_groups = list(re.search(r"(G)?(\d+\.?\d*)(d|w|mo|y)(\+\d+(d|w|mo|y))?$", age1).groups())
        if age1_groups[2] == 'd':
            age1_groups[2] = 0
        elif age1_groups[2] == 'w':
            age1_groups[2] = 1
        elif age1_groups[2] == 'mo':
            age1_groups[2] = 2
        else:
            age1_groups[2] = 3

        age2_groups = list(re.search(r"(G)?(\d+\.?\d*)(d|w|mo|y)(\+\d+(d|w|mo|y))?$", age2).groups())
        if age2_groups[2] == 'd':
            age2_groups[2] = 0
        elif age2_groups[2] == 'w':
            age2_groups[2] = 1
        elif age2_groups[2] == 'mo':
            age2_groups[2] = 2
        else:
            age2_groups[2] = 3

        if age1_groups[0] == None and age2_groups[0] == 'G':
            return 1
        elif age1_groups[2] != age2_groups[2]:
            return -1 if age1_groups[2] < age2_groups[2] else 1
        elif age1_groups[1] != age2_groups[1]:
            return -1 if age1_groups[1] < age2_groups[1] else 1
        else:
            return 0


    def serialize(self):
        tag_dict = collections.OrderedDict()
        sorted_tags = self.sort()
        for tag in sorted_tags:
            tag_dict[tag] = 0

        obj = {'set_name': self.name, 'tags': tag_dict}
        return obj

class Dataset():
    def __init__(self, ds_wrapper):
        self.wrapper = ds_wrapper
        self.did = ds_wrapper.getId()
        self.name = ds_wrapper.getName()
        self.imgs = []
