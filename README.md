# pancreatlas

test for jira/fisheye integration


###  Development Branch Overview:

The `/pancreatlas` directory contains the django files. Here's how to get that set up:
1. `cd` into the `pancreatlas/pancreatlas` directory
2. Run `source bin/activate` to activate the virtual environment
3. `cd` into the `pancreatlas` directory
4. Run `python manage.py runserver`

The `/pancreatlas-site` directory contains the react site. To get that running:
1. `cd` into the `/pancreatlas` directory
2. Run `npm start`

Now you should be able to navigate to 127.0.0.1:3000/ to access the root of this site.

**NB:** For all of this to work, you must be connected to the VUMC VPN.
