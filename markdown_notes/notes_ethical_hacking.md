# ETHICAL HACKING NOTES #

- [ETHICAL HACKING NOTES](#ethical-hacking-notes)
  - [**How to change a MAC address**](#how-to-change-a-mac-address)
  - [**Wireless Modes (MANAGED \& MONITOR)**](#wireless-modes-managed--monitor)
  - [**USEFUL LINKS**](#useful-links)




## **How to change a MAC address** ##
**Required**: OS Kali Linux + Wireless Adapter that supports Monitor mode

```bash
ifconfig [network_adapter_name] down # disable network adapter
ifconfig [network_adapter_name] hw ether [new_mac_address] # change a network device adapter mac address. The new MAC address has to start with 00
ifconfig [network_adapter_name] up # enable the network adapter interface
ifconfig # displays all network adapter interfaces
```

The device's MAC address will revert to its original value when rebooting the device. In case the MAC address reverts to its original value even without rebooting, please see: https://www.youtube.com/watch?v=7AUGQNBCddo&ab_channel=zSecurity




## **Wireless Modes (MANAGED & MONITOR)** ##
```bash
iwconfig # displays all wifi network adapter interfaces
ifconfig [network_adapter_name] down # disable network adapter
airmon-ng check kill # kills the network manager. We do not need internet connection when intercepting packages
iwconfig [network_adapter_name] mode monitor # changes from currect mode, for instance managed, to monitor mode. Managed mode is the default mode and this mode allows your wireless adapter to accept only packages for which it is the recipient. Monitor mode allows us to intercept any packages in the wireless adapter range
iwconfig [network_adapter_name] up
```










## **USEFUL LINKS** ##
- Learn Ethical Hacking From Scratch 2024 Course: https://www.udemy.com/course/learn-ethical-hacking-from-scratch/
- Best USB Wireless (WiFi) Adapters For Hacking 2025 - https://www.youtube.com/watch?v=0lqRZ3MWPXY&ab_channel=zSecurity
- Custom Kali/VMWare Workstation download page: https://zsecurity.org/download-custom-kali/
- ZSecurity shop: https://zsecurity.org/shop/