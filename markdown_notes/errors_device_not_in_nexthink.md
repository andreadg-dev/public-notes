# Nexthink Collector Troubleshooting Guide

`Tag: [ERROR_WINDOWS_NEXTHINK]`

This guide outlines the steps to troubleshoot a device that is not reporting to Nexthink.

## Troubleshooting Steps

### 1. Check Programs and Features

- Verify if the **Nexthink Collector** is installed in **Programs and Features** (`appwiz.cpl`).

### 2. Verify Service Status via PowerShell

Open PowerShell and run the following command to check if any Nexthink services are present and running:

```powershell
Get-Service -Name "Nexthink*"
```

### 3. Start the Collector

Open PowerShell with **Administrator rights** and run:

```powershell
nxtcfg /start
```

> [!WARNING]
> If you encounter the following error:
> `ERROR: StartService failed for Nexthink Service, error 1058. Failed to start the collector`
>
> **Resolution:**
>
> 1. Open the Services MMC console (`services.msc`).
> 2. Locate all **Nexthink Services**:
>    - **Nexthink Coordinator**
>    - **Nexthink CSSU Service**
>    - **Nexthink Service**
> 3. Right-click each service, select **Properties**, and change the **Startup type** to **Automatic**.
> 4. Click **Apply**, and then start the services.

---

## Nexthink Commands Reference

The `nxtcfg.exe` utility is used to manage and configure the Nexthink Collector.

| Command           | Description                                               |
| :---------------- | :-------------------------------------------------------- |
| `nxtcfg /l`       | Lists all Nexthink collector properties and their values. |
| `nxtcfg /stop`    | Stops the Nexthink collector service.                     |
| `nxtcfg /start`   | Starts the Nexthink collector service.                    |
| `nxtcfg /restart` | Restarts the Nexthink collector service.                  |

> [!NOTE]
> You can verify the health and connection status of the collector by inspecting the `clt_state` and `tcp_status` properties returned by `nxtcfg /l`.

### `nxtcfg /l` Output Example

```text
+ Copyright (C) 2004 - 2019 Nexthink S.A. All rights reserved.
+ nxtcfg.exe - Changes the configuration of the Nexthink Collector.
+ version 26.5.2.16

ip=[instance].data.eu.nexthink.cloud (ip address)
tcp_port=443
tag=0
string_tag=not set
cgpi=240
logmode=0
logsize=32
dwef=0
mss=1224
wme=1
wm_domains=not set
dsps=1
iops=1
prefer_ipv6=0
pkg_interval=1
custom_shells=0
customer_key=-----BEGIN CUSTOMER KEY-----[truncated]-----END CUSTOMER KEY-----
root_ca=not set
clt_state=functioning_properly
tcp_status=[dd.MM.yyyy HH:mm:ss.000] [INFO] Connected
execution_policy=signed_trusted_or_nexthink
printing=disable
assignment_status=assigned
engage=enable_except_on_server_os
use_assignment=enable
data_over_tcp=enable
proxy_address=not set
proxy_port=not set
proxy_pac_address=not set
mtls_fingerprint=not set
mtls_issuer_common_name=not set
mtls_subject_common_name=not set
install_browser_extension=not set
nxtcfg.exe completed successfully.
```
