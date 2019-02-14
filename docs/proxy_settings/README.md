# Firewall and Proxy Settings


## Patching servers through firewall


 
As long as your servers have access to the Internet, even behind NAT —  you will be able to use KernelCare patch server without any problems.

Generally, KernelCare requires connection to only two servers for a proper work:

**cln.cloudlinux.com**
**patches.kernelcare.com**

An additional address is used for KernelCare agent installation/update:

**repo.cloudlinux.com**

![](/images/patchingthroughfirewall.png)

## Patching servers through proxy


 
If your servers don't have direct Internet access but can gain access to the Internet using proxy, the configuration is not that different. KernelCare can pick up standard environment variables for a proxy.

Make sure you have environment settings for proxy setup, and everything else will be the same as if servers were directly connected to the Internet:

`# export http_proxy=http://proxy.domain.com:port`
`# export https_proxy=http://proxy.domain.com:port`

![](/images/patchingthroughproxy.png)

