---
title: 'Network Whitelist | Meta-SDK'
description: 'A list of Meta Graph API domains and URLs that must be whitelisted for the SDK to function behind corporate firewalls.'
head:
  - - meta
    - name: keywords
      content: meta whitelist, facebook graph api domains, firewall rules, enterprise deployment
---

# Network Whitelist

If you are running the `@vitabletech/meta-sdk` behind a strict corporate firewall, VPN, or inside a highly secured VPC (Virtual Private Cloud), your infrastructure team will need to ensure that the following domains and URLs are whitelisted for outbound HTTPS traffic.

## Required Domains

The SDK communicates exclusively over `HTTPS` (Port 443).

| Domain                     | Purpose                                                                                     |
| -------------------------- | ------------------------------------------------------------------------------------------- |
| `graph.facebook.com`       | The primary Graph API endpoint for all REST requests (Posts, Comments, Media, Pages).       |
| `graph.instagram.com`      | The secondary Graph API endpoint used for certain legacy Instagram Basic Display API calls. |
| `graph-video.facebook.com` | Required if you plan on using the custom request client to upload heavy video files.        |

## IP Addresses

Meta **does not** provide static IP addresses for the Graph API, as they use a global CDN and dynamic load balancers.

You **must** configure your firewall to whitelist based on the FQDNs (Fully Qualified Domain Names) listed above, rather than static IP addresses. If your firewall does not support FQDN whitelisting, you will need to set up a forward proxy (like Squid) within your network.
