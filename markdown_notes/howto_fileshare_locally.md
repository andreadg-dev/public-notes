# HOW TO SHARE FILES FROM YOUR WINDOWS TO YOUR UBUNTU ON YOUR LOCAL NETWORK #

`Tag: [HOWTO_LINUX_FILESHARING]`

## Set Up Sharing on Ubuntu ##
- Install Samba on your Ubuntu with `sudo apt update && sudo apt install samba`
- Create a Samba user and password with `sudo smbpasswd -a your_username`. You will be prompted to type a password:
```text
New SMB password:
Retype new SMB password:
Added user your_username.
```
- Create the folder you want to share (or `mkdir ~/MySharedFolder`)
- Open the Samba config file with `sudo nano /etc/samba/smb.conf`
- Add your share folder info at the very bottom of the file, for instance:
```plaintext
[MyShareName]
   path = /home/your_username/MySharedFolder
   browsable = yes
   writable = yes
   read only = no
   guest ok = no
```
- Restart Samba with `sudo systemctl restart smbd` to apply changes
- Allow through Firewall to ensure network traffic is permitted with `sudo ufw allow samba`:
```plaintext
Rule added
Rule added (v6)
```
- Retrieve your Ubuntu local IP address with `ip a` (under `enp2s0`)


## Connect from Windows ##
- Open File Explorer
- In the top address bar, type `\\` followed by your Ubuntu's IP address, for instance `\\192.168.1.50`
- Type your Samba account credentials (created in the **Set Up Sharing on Ubuntu** step above) when prompted
- You should now see the folder name you chose (e.g., `MyShareName`) 
