# Using WSL/CURL/WGET with Zscaler #


## **CURL: (60) SSL certificate problem**
**ERROR**

- Open your WSL terminal
- Type `curl https://google.com` > Output error:

```
curl: (60) SSL certificate problem: unable to get local issuer certificate
More details here: https://curl.se/docs/sslcerts.html
curl failed to verify the legitimacy of the server and therefore could not
establish a secure connection to it. To learn more about this situation and
how to fix it, please visit the web page mentioned above.
```



**SOLUTION**
1. Download the attached `Zscaler_Root_CA.txt` file locally. Open it in Notepad++ and copy its content
2. Open your WSL terminal, type and execute: `sudo cp /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/ca-certificates.bak` to make a back-up copy of your current a `.crt` file. This file holds/lists all concatenated CA certificates that you activated in `/etc/ca-certificates.conf`
3. Open the file with either `nano` or `vi`: `sudo nano /etc/ssl/certs/ca-certificates.crt`
4. Reach the very end of the `ca-certificates.crt` file in the text editor (for instance by pressing `CTRL+End`) and paste the content found in `Zscaler_Root_CA.txt` that you copied in the 1st step
5. Save and close the file


## **WGET/GITHUB: cannot verify github.com's certificate - Unable to locally verify the issuer's authority**
**ERROR**
- Open your WSL terminal
- Type a wget command to download any package, for instance `wget https://github.com/mattermost/mattermost-helm/releases/download/mattermost-team-edition-6.6.52/mattermost-team-edition-6.6.52.tgz` > Output error:

```
--2024-04-23 12:51:39--  https://github.com/mattermost/mattermost-helm/releases/download/mattermost-team-edition-6.6.52/mattermost-team-edition-6.6.52.tgz
Resolving github.com (github.com)... 140.82.121.4
Connecting to github.com (github.com)|140.82.121.4|:443... connected.
ERROR: cannot verify github.com's certificate, issued by ‘CN=Zscaler Intermediate Root CA (zscalerthree.net) (t)\\ ,OU=Zscaler Inc.,O=Zscaler Inc.,ST=California,C=US’:
  Unable to locally verify the issuer's authority.
To connect to github.com insecurely, use '--no-check-certificate'.
```


**SOLUTION**
1. Download the attached `Zscaler_Root_CA.pem` file locally. Open it in Notepad++ and copy its content
2. Open your WSL terminal, type and execute: `sudo touch /etc/ssl/certs/ZscalerRootCA.pem`
3. Open the file with either `nano` or `vi`: `sudo nano /etc/ssl/certs/ZscalerRootCA.pem`. The file should be empty
4. Paste the content found in `Zscaler_Root_CA.pem` that you copied in the 1st step
5. Save and close the file
6. Type and execute: `echo "ca_certificate=/etc/ssl/certs/ZscalerRootCA.pem" >> $HOME/.wgetrc`
7. Go to `$HOME` and make sure that the `.wgetrc` file is there > `cd $HOME` > `ls -a`. The wgetrc file is an initialization file that stores default settings and options for Wget


Source: https://help.zscaler.com/zia/adding-custom-certificate-application-specific-trust-store
