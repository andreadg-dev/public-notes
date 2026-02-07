# KNOWN ERRORS #

- [KNOWN ERRORS](#known-errors)
  - [**How do you change the default start location in git bash to the current folder?**](#how-do-you-change-the-default-start-location-in-git-bash-to-the-current-folder)
  - [**All connections to the npm registry - including for package installation - must use TLS 1.2 or higher**](#all-connections-to-the-npm-registry---including-for-package-installation---must-use-tls-12-or-higher)
  - [**Unable to get local issuer certificate**](#unable-to-get-local-issuer-certificate)
  - [**Visual Studio Code: Problems loading reference/Unable to load schema**](#visual-studio-code-problems-loading-referenceunable-to-load-schema)
  - [**Refused to apply style because its MIME type ('text/html') is not a supported stylesheet MIME type**](#refused-to-apply-style-because-its-mime-type-texthtml-is-not-a-supported-stylesheet-mime-type)
  - [**fatal: Authentication failed for \[GIT\_REPO\]**](#fatal-authentication-failed-for-git_repo)




## **How do you change the default start location in git bash to the current folder?** ##
To change the default start location in Git Bash to the current folder, you can modify the Git Bash configuration file. Follow these steps:
- Open Git Bash on your Windows system.
- In the Git Bash terminal, navigate to your home directory by typing `cd ~` and pressing Enter.
- Use a text editor, such as Vim or Notepad, to open the `.bashrc` file. If the file doesn't exist, you can create it.
- Within the .bashrc file, add the following line at the end: `cd "$(pwd)"`. This command sets the default start location in Git Bash to the current folder ($(pwd) represents the current working directory).
- Save the changes and exit the text editor.
- Restart Git Bash for the changes to take effect.

After following these steps, when you launch Git Bash, it should automatically navigate to the current folder as the default start location.







## **All connections to the npm registry - including for package installation - must use TLS 1.2 or higher** ##
If you get the following error message when installing something with npm: 

`npm notice Beginning October 4, 2021, all connections to the npm registry - including for package installation - must use TLS 1.2 or higher. You are currently using plaintext http to connect. Please visit the GitHub blog for more information: https://github.blog/2021-08-23-npm-registry-deprecating1-0-t-tls-1-0-tls-1-1/`, or `unable to get local issuer certificate UNABLE_TO_GET_ISSUER_CERT_LOCALLY`

run this: `npm config set registry https://registry.npmjs.org/`







## **Unable to get local issuer certificate** ##
In case you run into the error below:
```bash
Error: unable to get local issuer certificate
    at TLSSocket.onConnectSecure (node:_tls_wrap:1535:34)
    at TLSSocket.emit (node:events:513:28)
    at TLSSocket._finishInit (node:_tls_wrap:949:8)
    at ssl.onhandshakedone (node:_tls_wrap:733:12)
Emitted 'error' event on ClientRequest instance at:
    at TLSSocket.socketErrorListener (node:_http_client:490:9)
    at TLSSocket.emit (node:events:513:28)
    at emitErrorNT (node:internal/streams/destroy:151:8)
    at emitErrorCloseNT (node:internal/streams/destroy:116:3)
    at process.processTicksAndRejections (node:internal/process/task_queues:82:21) {
  code: 'UNABLE_TO_GET_ISSUER_CERT_LOCALLY'
```
Try executing `git config --global http.sslBackend schannel` on a Windows device and `git config --global http.sslBackend openssl` on a MacBook or check if your company uses some cloud proxy service and check if there is a way to create an exception or configure the corresponding certificates to fix the issue. 

In case you have a corporate device, your company might use a corporate tool for SSL inspection, for instance Zscaler. In that case, you can do this:

- Obtain the Zscaler root certificate: Your company's IT department should provide you with the Zscaler root certificate file (often in .pem or .crt format).
- Store the Zscaler root certificate file: Save the Zscaler root certificate file to a location on your macOS system.
- Configure Git to use the Zscaler root certificate: You would then configure Git to use the Zscaler root certificate as the trusted certificate authority (CA) for SSL/TLS connections. You can achieve this by setting the http.sslCAInfo configuration option to the path of the Zscaler root certificate file. Here's how you can do it: `git config --global http.sslCAInfo /path/to/zscaler_root_certificate.crt`. Replace `/path/to/zscaler_root_certificate.crt` with the actual path to the Zscaler root certificate file on your system.
- By setting `http.sslCAInfo`, Git will use the specified certificate file as the trusted CA for SSL/TLS connections, allowing Git to trust certificates issued by Zscaler for HTTPS connections.

See these suggestions from ChatGPT:

The error message you're encountering indicates that there's an issue with the SSL certificate verification on your system. This error commonly occurs when you're trying to make an HTTPS request, and the server's certificate cannot be verified by your local machine.

To resolve this issue, you have a few options:
- Disable SSL certificate verification (not recommended for production):
You can disable SSL certificate verification in your Node.js code by setting the `rejectUnauthorized` option to false when making the HTTPS request. However, keep in mind that this approach is not recommended for production environments as it poses security risks.

Here's an example of how you can disable SSL certificate verification for your https.get request:
```js
const https = require("https");
const options = {
  rejectUnauthorized: false,
};

https.get(url, options, function (response) {
  console.log(response);
});
```

- Install the required SSL certificates:
In some cases, the error may be due to missing or outdated SSL certificates on your system. You can try updating or reinstalling the SSL certificates on your machine.

- Use a different library for making HTTPS requests:
Instead of using the built-in https module, you can try using an alternative library like axios or node-fetch. These libraries handle SSL certificate verification automatically and may not encounter the same issue. Install either of them using npm and modify your code accordingly. For example, using the axios library:
```js
const axios = require("axios");

axios.get(url)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });

//Remember to install axios by running npm install axios before using it.
```







## **Visual Studio Code: Problems loading reference/Unable to load schema** ##

**Error**:
Problems loading reference 'https://json.schemastore.org/package': Unable to load schema from 'https://json.schemastore.org/package': getaddrinfo ENOTFOUND json.schemastore.org.(768)

**Solution**:
Vistual Studio > User settings > Http proxy support > off

**Source**: https://stackoverflow.com/questions/49056000/all-of-my-json-files-have-problems-loading-reference-schema-from-schemastore-az 




## **Refused to apply style because its MIME type ('text/html') is not a supported stylesheet MIME type** ##
**Context**: I am using express to serve an html page that has a css style page called `signin.css` page which is not loading.


**Error:**
Refused to apply style from 'http://localhost:3000/signin.css' because its MIME type ('text/html') is not a supported stylesheet MIME type, and strict MIME checking is enabled.

**Solution**
The error message you're seeing indicates that the browser is refusing to apply the CSS style because the server is serving it with an incorrect MIME type. The MIME type being reported in the error message is 'text/html', which suggests that the server is treating the CSS file as an HTML file.

To resolve this issue, you can try the following steps:
- Double-check the file extension: Make sure that the file you're serving as a CSS file has the correct file extension. In this case, ensure that the file extension is .css. For example, signin.css should be named with a .css extension.
- Verify the file path: Check that the file path specified in the HTML file or the Node.js code is correct. Ensure that it points to the correct location of the CSS file.
- Set the correct MIME type: In your Node.js application, you need to set the MIME type for CSS files to text/css. You can achieve this using the appropriate middleware. If you're using Express.js, you can add the following code:

```js
app.use(express.static('public'));
app.use(express.static('views'));

// Add the following middleware to set the correct MIME type
app.use(function(req, res, next) {
  if (req.url.endsWith('.css')) {
    res.type('text/css');
  }
  next();
});

```
The "public" and "views" directories are commonly used in Node.js web applications to organize static files and views respectively.

- Public directory: The "public" directory is typically used to store static assets such as CSS files, JavaScript files, images, and other client-side resources. When you serve files from the "public" directory using express.static, Express automatically handles the routing for those files. You don't need to include "public" in the URL path when referencing files from the "public" directory. Express treats the "public" directory as the root for serving static files. So, if you have a CSS file named "signin.css" in the "public" directory, you can reference it in your HTML file as `<link rel="stylesheet" type="text/css" href="/signin.css">`. The leading forward slash ("/") represents the root directory of your server, and Express automatically serves the file from the "public" directory.

- Views directory: The "views" directory is often used to store view templates or HTML files that are rendered on the server side and sent as responses to client requests. This directory is commonly used with templating engines such as EJS or Pug (formerly Jade). The "views" directory is typically specified when configuring the view engine in your Node.js application. However, it is not involved in serving static files like CSS files. Therefore, you don't need to include "views" in the URL path when referencing static files like CSS.

In summary, the "public" directory is specifically designed for serving static files, while the "views" directory is used for storing server-rendered view templates. When referencing static files in your HTML, you only need to specify the relative path from the root of the server, without including "public" or "views" directories in the URL path.







## **fatal: Authentication failed for [GIT_REPO]** ##

**Solution**

- Install GitHub CLI
- Execute in a terminal: `gh auth login`
- What happens next, for instance:
```
  - ? What account do you want to log into? GitHub.com
  - ? What is your preferred protocol for Git operations? HTTPS
  - ? Authenticate Git with your GitHub credentials? Yes
  - ? How would you like to authenticate GitHub CLI? Login with a web browser

  - ! First copy your one-time code: [CODE]
  - Press Enter to open github.com in your browser...
  - ✓ Authentication complete.
  - gh config set -h github.com git_protocol https
  - ✓ Configured git protocol
  - ✓ Logged in as [GITHUB_USERNAME]
```















