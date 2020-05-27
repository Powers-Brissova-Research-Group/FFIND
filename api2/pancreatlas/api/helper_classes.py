from omero.gateway import TagAnnotationWrapper, MapAnnotationWrapper, DatasetWrapper
import re
import collections
import logging
import sys
import json

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

#   findAgeGroup (age) {
#     let ageRe = /^(G)?(\d+\.?\d*)(d|w|mo|y)(\+\d+d|w|mo|y)?$/
#     let tmp = ageRe.exec(age)
#     if (tmp[1] !== undefined) {
#       if (Number(tmp[2]) < 33 && tmp[3] === 'w') {
#         return this.AgeGroups.GESTATIONAL
#       } else {
#         return this.AgeGroups.NEONATAL
#       }
#     } else if (tmp[3] === 'd' || tmp[3] === 'w') {
#       return this.AgeGroups.NEONATAL
#     } else if (tmp[3] === 'mo') {
#       if (Number(tmp[2]) <= 2) {
#         return this.AgeGroups.NEONATAL
#       } else if (Number(tmp[2]) <= 24) {
#         return this.AgeGroups.INFANCY
#       } else {
#         return this.AgeGroups.CHILDHOOD
#       }
#     } else {
#       if (Number(tmp[2]) <= 2) {
#         return this.AgeGroups.INFANCY
#       } else if (Number(tmp[2]) <= 10) {
#         return this.AgeGroups.CHILDHOOD
#       } else {
#         return this.AgeGroups.ADULT
#       }
#     }
#   }
        
    def get_age_group(self, age):
        age_re = re.compile(r"^(G)?(\d+\.?\d*)(d|w|mo|y)(\+\d+d|w|mo|y)?$")
        tmp = age_re.search(age)
        match_groups = tmp.groups()
        if (match_groups[0] != None):
            if int(match_groups[1]) < 33 and match_groups[2] == 'w':
                return 'GESTATIONAL'
            else:
                return 'NEONATAL'
        elif match_groups[2] == 'd' or match_groups[2] == 'w':
            return 'NEONATAL'
        elif match_groups[2] == 'mo':
            if int(match_groups[1]) <= 1:
                return 'NEONATAL'
            elif int(match_groups[1]) <= 24:
                return 'INFANCY'
            else:
                return 'CHILDHOOD'
        else:
            if int(match_groups[1]) <= 2:
                return 'INFANCY'
            elif int(match_groups[1]) <= 10:
                return 'CHILDHOOD'
            else:
                return 'ADULT'

    def fetch_annotations(self):
        tag_re = re.compile("(Donor info|Image info|Sample info)( - )(.+)")
        marker_re = re.compile("(Stain info)( - )(.+)(?<!-Ab)$")
        hex_re = re.compile("(Hex code)( - )(.+)$")
        tags = ['Disease Status', 'Sex', 'Disease Duration', 'Age', 'Pancreas Region', 'Modality', 'Program ID']
        anns = list(self.img_wrapper.listAnnotations())
        channel_map = {}
        found_hex = False
        for ann in anns:
            if isinstance(ann, MapAnnotationWrapper):
                for pair in ann.getValue():
                    tag_match = tag_re.match(pair[0])
                    marker_match = marker_re.match(pair[0])
                    hex_match = hex_re.match(pair[0])
                    if tag_match != None:
                        tagset = tag_match.group(3)
                        if (tagset == 'Age'):
                            age_group = self.get_age_group(pair[1])
                            self.tags.append({'tagset': "%s-%s" % ('Age', age_group), 'tag': pair[1]})
                        elif tagset in tags and pair[1] != "":
                            self.tags.append({'tagset': tagset, 'tag': pair[1]})
                    if marker_match != None:
                        if pair[1] != "":
                            channel_map[marker_match.group(3).upper()] = pair[1]
                            self.tags.append({'tagset': 'Marker', 'tag': pair[1]})
                    if hex_match != None:
                        channel = hex_match.group(3)
                        self.channel_info[channel] = pair[1]
                        found_hex = True
                    self.key_values[pair[0]] = {'val': pair[1], 'desc': 'default val'}

        if not found_hex:
            channels = list(self.img_wrapper.getChannels())
            for channel in channels:
                channel_name = channel.getLabel().upper()
                if channel_name in channel_map:
                    self.channel_info[channel_map[channel_name]] = channel.getColor().getHtml()
                else:
                    self.channel_info[channel_name] =  channel.getColor().getHtml()

    def add_map_annotation(self, key, value):
        anns = list(self.img_wrapper.listAnnotations())
        for ann in anns:
            if isinstance(ann, MapAnnotationWrapper):
                annotations = ann.getValue()
                annotations.append((key, value))
                ann.setValue(annotations)
        self.img_wrapper.save()

    def modify_map_annotation(self, key, new_value):
        anns = list(self.img_wrapper.listAnnotations())
        for ann in anns:
            if isinstance(ann, MapAnnotationWrapper):
                annotations = ann.getValue()
                for i in range(0, len(annotations)):
                    if annotations[i][0] == key:
                        annotations[i] = (key, new_value)
                        ann.setValue(annotations)
                        break
        self.img_wrapper.save()


    def get_tags(self):
        return self.tags

    def get_tag_names(self):
        return [{'tagset': tag['tagset'], 'tag': tag['tag']} for tag in self.tags]

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
        self.tagsets = [parent.getValue() for parent in tag_wrapper.listParents()]        

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
        if self.name.upper() == "AGE" or self.name.upper() == "DISEASE DURATION":
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
        self.desc = ds_wrapper.getDescription()
        self.kvals = {}
        self.imgs = []
        self.fetch_annotations()

    def fetch_annotations(self):
        act = False
        anns = list(self.wrapper.listAnnotations())
        status_code = 4
        for ann in anns:
            if isinstance(ann, MapAnnotationWrapper):
                for kval in ann.getValue():
                    if kval[0] == 'status':
                        status_code = int(kval[1])
                    if kval[0] == 'active':
                        act = kval[1] == 'true'
                    self.kvals[kval[0]] = kval[1]
        self.active = act
        self.status = status_code