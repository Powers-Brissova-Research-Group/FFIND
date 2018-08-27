# Installing VPN on Linux
#### Installation guide for Pulse Connect Secure
**My Specs:** Fedora 27 x86_64, installing `ps-pulse-linux-5.2r7.0-b1025-centos-rhel-installer.rpm`
**Important:** There's still a good chance that this doesn't end up working
1. Download the Pulse Client RPM from VU IT, found [here](https://it.vanderbilt.edu/security/secure-communications/remote-access/linux-download.php)
2. Install the RPM you've just downloaded: `rpm -ivh ps-pulse-linux-5.2r7.0-b1025-centos-rhel-installer.rpm`
3. Create a temporary directory like so: `mkdir -p /some/temp/directory/`
4. `cd` into that directory
5. Download `gnucash` package but do not install: `wget http://dl.fedoraproject.org/pub/fedora-secondary/releases/27/Everything/i386/os/Packages/g/gnucash-2.6.18-1.fc27.i686.rpm`
6. Extract the downloaded package `rpm2cpio gnucash-2.6.18-1.fc27.i686 | cpio -idmv`
7. Copy relevant files to Pulse directory
a. `sudo cp usr/lib/gnucash/libjavascriptcoregtk-1.0.so.0.16.19 /usr/local/pulse/`
b. `sudo cp usr/lib/gnucash/libwebkitgtk-1.0.so.0.22.17 /usr/local/pulse/`
8. `cd` into `/usr/local/pulse`
9. Create the symlinks that Pulse expects:
a. `sudo ln -s libjavascriptcoregtk-1.0.so.0.16.19 libjavascriptcoregtk-1.0.so`
b. `sudo ln -s libjavascriptcoregtk-1.0.so.0.16.19 libjavascriptcoregtk-1.0.so.0`
c. `sudo ln -s libwebkitgtk-1.0.so.0.22.17 libwebkitgtk-1.0.so`
d. `sudo ln -s libwebkitgtk-1.0.so.0.22.17 libwebkitgtk-1.0.so.0`
10. Export the following variable that Pulse needs: `export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/pulse`
11. Install the following packages: `sudo dnf install <package>`
a. `gtk2.i686`
b. `libsoup.i686`
c. `enchant.i686`
d. `harfbuzz-icu.i686`
e. `libsecret.i686`
f. `libglvnd-glx.i686`
g. `libXt.i686`
12. Hope that the stars have aligned
13. Run `./pulseUI` from `/usr/local/pulse/`

## If things fail
Don't panic. You probably are missing some package or other that Pulse needs. If you see an error like this: `./pulseUi: error while loading shared libraries: libgtk-x11-2.0.so.0: cannot open shared object file: No such file or directory` then you just need to make sure to get the proper version of whatever library contains `libgtk-x11-2.0.so.0`. To resolve this, I searched online for the containing package and installed it. This part you may have to rinse and repeat until Pulse finally starts working.