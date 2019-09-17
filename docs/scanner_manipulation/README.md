# Scanner manipulation

## Problem

So, the problem is that commonly used security scanners still see CVEs even if they patched by KC. It turns out that all their decisions about CVE are based on currently installed (or not) kernel packages.
How it works

So, to calm them down we have to manipulate with that kernel packages. Since scanners rely on `rpm -q` output we can override some functions there via LD_PRELOAD and force the script output versions that we need.

To deal with it we reload showQueryPackage to patch version information on the fly. It would change the information showing in rpm query results like this.

    [centos@ip-172-31-6-166 ~]$ rpm -q kernel-headers
    kernel-headers-3.10.0-693.17.1.el7.x86_64
    [centos@ip-172-31-6-166 ~]$ LD_PRELOAD=/usr/libexec/kcare/kpatch_package.so rpm -q
    kernel-headers-3.10.0-957.21.3.el7.x86_64

The reloaded function relies on `kcarectl --uname` and replace actual kernel version with our “effective version”.
That behaviour is enabled only for one user and will not interfere with other. That user should be used to run credentialed scan over SSH.

## Installation

All you need to do on target systems is to instal/lupdate the kernelcare agent with the provided package.

    KCARE_SCANNER_USER=username yum -y localinstall ./kernelcare-package.rpm

Where `username` is the user which will be used to run scanners on the server.
After applying KC patches (kcarectl --update) you will see rpm query result accordingly to kernel that the patches are provided.
NOTE: To see results you have to relogin to the server with KCARE_SCANNER_USER defined above.

## How to use

It’s rather simple. New scan result after installing a package and applying a patchset should not show any kernel CVEs that handled by KC.
For example, Nessus for an old kernel shows a bunch of detected CVEs

![](/images/scanner-manipulation-before.png)

After patches applying there are no kernel-related CVEs

![](/images/scanner-manipulation-after.png)
