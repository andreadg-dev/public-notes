# HOW TO REMOTE DESKTOP INTO UBUNTU #

## Remoting to Ubuntu: Setup ##
```sh
sudo apt install xrdp
sudo systemctl enable xrdp
sudo systemctl start xrdp
sudo adduser xrdp ssl-cert
```
- Find the device local IP with `ip a` (for instance 192.168.0.50)
-  To make sure it's home-network only, run this (make sure that the subnet `192.168.0` match your home subnet, if not use your home subnet instead):
```sh
sudo ufw allow from 192.168.0.0/24 to any port 3389 #allow XRDP port
sudo ufw allow from 192.168.0.0/24 to any port 22 #allow SSH port
sudo ufw enable
```
*If you added an incorrect rule, your can remove it with this command `sudo ufw allow from [ip_range] to any port [port]`. If you make changes to your fw rules, always reload it and check the status:
```sh
sudo ufw reload
sudo ufw status verbose

#sample output
# To      Action      From
# --      ------      ----
# 3389    ALLOW IN    192.168.[range]            
# 22      ALLOW IN    192.168.[range] 
```
*3389 is the port used for XRDP protocol/connections. 22 is the port used for SSH protocol/connections*

- Add your user to the following groups:
```sh
sudo adduser yourusername ssl-cert
sudo adduser yourusername xrdp
```
*You can check if the user has those group by executing `groups yourusername`*

- To avoid GNOME/Wayland conflicts, install the following and tell XRDP to use it:
```sh
sudo apt install xfce4 xfce4-goodies
echo "xfce4-session" > ~/.xsession
chmod 644 ~/.xsession
sudo systemctl restart xrdp
```
- Disable Wayland (critical on new Ubuntu)
```sh
sudo nano /etc/gdm3/custom.conf

#Uncomment or add:
WaylandEnable=false

#Save → reboot:
sudo reboot
```
You can check if XRDP is running by executing `systemctl status xrdp`.

### Tips ###
- When in the remote session, you can change the styling and position of both top and bottom panels, by right-clicking on it > `Panel Preferences`. For instance,
for set the taskbar vertically anchored on the left: `Display` tab > Mode: Vertical > Lock panel: ❌ (temporarily uncheck) > drag the panel to the left edge of the screen > Length: 100% > check Lock panel ✅ > Automatically hide the panel: ❌ OFF > Reserve space on screen edges: ✅ ON
- To add extra app to the 'taskbar', right-click on it > `+ Add new items...` > `Launcher` > right-click on the pinned `Launcher` > `Properties` > `+` > look for and select the app you need.

### Tips: Github ###
- In order to easily clone Github repositories inside VS Code in your Linux machine, do this: `sudo apt install gh` > `gh auth login` > then choose `GitHub.com`, `HTTPS` and `Login via browser` > then follow the on-screen instructions and you will be able to easily clone your repos with `git clone https://github.com/[username]/[repo_name].git`
- Make sure to set your Github account's default identity on the new machine by running this:
```sh
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
```
- How to start a web server in localhost on port 8000 using python: in the project folder run: 
  - `python3 -m http.server 8000`: In case you see 304 in the terminal, and your changes are not being applied, do a `Ctrl+Alt+R` to force a cache refresh in the browser
  - `http-server -p 8080 -c-1`: The `-c-1` flag sets the cache-control `max-age` to `-1`, forcing the browser to fetch fresh content every time. You must install `npm` and `node-http-server` before being able to use this command.

## Remoting from Windows ##
- Check if you can reach the device with `ping [local_ip]` or `Test-NetConnection [local_ip] -Port 3389`.
*You should see `TcpTestSuccedeed: True` and get a reply to the `ping`.*

- Open Remote Desktop connection, type the Ubuntu machine local IP address and connect using its credentials. **Both username and password are case-sensitive**.

### Tips ###
- If the virtual screen does not fit your physical monitor, you can adjust the screen size directly in the `Remote Desktop connection` > Display tab before starting a remote session.