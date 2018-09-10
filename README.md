# pancreasatlas

##  Development Branch Overview:

The `/api` directory contains the django files. Here's how to get that set up:
1. `cd` into the `api` directory'
2. Run `source bin/activate` to activate the virtual environment
3. Run `pip install -r requirements.txt`
4. If necessary, also run `pip install zeroc-ice==3.6.4`
5. `cd` into the `pancreatlas` directory
6. Restart `httpd`: `sudo systemctl restart httpd`

The `/react` directory contains the react site. To get that running:
1. `cd` into the `/react` directory
2. Run `npm install`
3. Run `npm run build`

## Potential Problems:

### Installing zeroc-ice:
I've had a bunch of trouble installing this module. Typically it fails because there is some unmet dependency at the OS layer; here are some packages I've had to install to get this working:

**On Fedora:**
1. `redhat-rpm-config`
2. `gcc-c++`
3. `python-devel`
4. `openssl-devel`
5. `bzip2-devel`

**On Ubuntu:**
1. `libssl-dev`
2. `libbz2-dev

Otherwise, it might require some searching to find the necessary packages to get Ice working

### Not finding Python modules
It is possible that you forgot to activate the virtual environment (see step 2 above)

**NB:** For all of this to work, you must be connected to the VUMC VPN.
