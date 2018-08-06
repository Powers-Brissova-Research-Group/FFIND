from omeropy.omero.gateway import TagAnnotationWrapper, MapAnnotationWrapper, DatasetWrapper

class Image:
    def __init__(self, img_wrapper):
        self.img_wrapper = img_wrapper
        self.id = img_wrapper.getId()
        self.tags = []
        self.key_values = {}
        self.fetch_annotations()
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

    def fetch_annotations(self):
        anns = list(self.img_wrapper.listAnnotations())
        for ann in anns:
            if isinstance(ann, TagAnnotationWrapper):
                tmp = Tag(ann, ann.getId())
                self.tags.append(tmp)
            elif isinstance(ann, MapAnnotationWrapper):
                for pair in ann.getValue():
                    self.key_values[pair[0]] = pair[1]

    def get_tags(self):
        return self.tags

    def get_tag_names(self):
        return [tag.tname for tag in self.tags]

    def has_tag(self, tag):
        return tag in self.tags

    def get_key_values(self):
        return self.key_values

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

class Dataset():
    def __init__(self, ds_wrapper):
        self.wrapper = ds_wrapper
        self.did = ds_wrapper.getId()
        self.name = ds_wrapper.getName()
        self.imgs = []