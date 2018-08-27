# Apache Setup
## Notes
- I'm running Apache on Fedora 27, so I'll try to be as general as possible, but there may be some instructions specific to this distribution

## Requirements
- Apache 2.4.x
- Local copy of Pancreatlas code, cloned from GitHub

## Setting up `mod_wsgi`
1. Download `mod_wsgi` from [here](https://github.com/GrahamDumpleton/mod_wsgi/releases)
2. Install dev packages for Apache:
a. `httpd-devel` for Fedora & CentOS
b. `apache2-devel` for openSUSE
c. `apache2-dev` for Ubuntu based (I think)
3. Run the following command to unpack: `tar xvfz mod_wsgi-X.Y.tar.gz`
4. `cd` into the newly created directory
5. Run `./configure`
6. Run `make`
7. Run `make install`
8. Add this line to the Apache conf file: `LoadModule wsgi_module modules/mod_wsgi.so`
9. Restart Apache
10. Check Apache logs for something like this: `Apache/2.4.6 (Unix) mod_wsgi/4.4.21 Python/2.7 configured`

## Setting up virtual hosts
1. Add the following to your `httpd.conf` or virtualhosts file:
```
<VirtualHost *:80>
    ServerAdmin pancreapi # Could also just be api.pancreatlas
    ServerName pancreapi
    
    DocumentRoot /path/to/pancreatlas/api
    WSGIScriptAlias / /path/to/pancreatlas/api/wsgi.py
    
    WSGIDaemonProcess pancreapi processes=2 threads=15 display-name=%{GROUP} python-path=/path/to/pancreatlas/api:/path/to/pancreatlas/api/python2.7/site-packages
    WSGIProcessGroup pancreapi
    
    <Directory /path/to/pancreatlas/backend>
        Require all granted
    </Directory
</VirtualHost>

<VirtualHost *:80>
    ServerAdmin pancreatlas
    ServerName pancreatlas
    ServerAlias pancreatlas
    DocumentRoot /path/to/pancreatlas-site/build
    
    <Directory /path/to/pancreatlas-site/build>
        Require local
        
        # Fix for routing issues--https://gkedge.gitbooks.io/react-router-in-the-real/content/apache.html
        RewriteCond%{REQUEST_FILENAME} -f [OR]
        RewriteCond%{REQUEST_FILENAME} -d
        RewriteRule ^ - [L]
        RewriteRule ^ index.html [L]
    </Directory>
</VirtualHost>
```
2. Also add `pancreatlas` and `pancreapi` to `/etc/hosts`

## Test the Installation
1. Restart the apache service (`service restart apache`)
2. Try navigating to http://pancreatlas -- you should reach the home page

## Troubleshooting
- Will update as we find more issues
