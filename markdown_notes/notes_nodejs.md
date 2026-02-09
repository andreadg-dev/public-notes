# MY NODE.JS NOTES #

- [MY NODE.JS NOTES](#my-nodejs-notes)
  - [**Bash Basics**](#bash-basics)
  - [Node.js](#nodejs)
  - [**Node Package Manager**](#node-package-manager)
  - [**Express.js: Creating our first server**](#expressjs-creating-our-first-server)
  - [**Handling requests: GET request**](#handling-requests-get-request)
  - [**Handling requests: POST request**](#handling-requests-post-request)
  - [**API Basics**](#api-basics)
    - [**JSON Serialization**](#json-serialization)
    - [**Example: making GET requests**](#example-making-get-requests)
    - [**Example: making GET/POST requests**](#example-making-getpost-requests)
  - [**How to serve static files on a server**](#how-to-serve-static-files-on-a-server)
  - [**Git**](#git)
  - [**CommonJS VS ES6 syntax: `require()`, `import from`, `function(){}`, `() =>`**](#commonjs-vs-es6-syntax-require-import-from-function--)
  - [**EJS: Embedded Javascript Templating**](#ejs-embedded-javascript-templating)
    - [**EJS Tags**](#ejs-tags)
    - [**EJS Tags: Practical example**](#ejs-tags-practical-example)
  - [**Useful Chrome add-ons**](#useful-chrome-add-ons)
  - [**Useful Libraries**](#useful-libraries)




## **Bash Basics**

<span style="display:block;"> **Commands** </span>

- `echo $SHELL`
- `pwd` = print working directory
- `ls -a` = list all sub folders/files
- `cd` = change directory
- `cd ~` = change directory to root directory (for instance /disk/users/username)
- `cd testFolder` = change directory to subfolder named testFolder
- `cd /c/Users/username/Desktop` = change directory to Desktop using the full path
- `cd ..` = change directory to parent directory
- `clear` = clear current comman line session
- `start testFolder` = invokes/opens the directory testFolder if found in current location
- `mkdir` = make directory
- `mkdir testFolder` = create the directory testFolder in the current location
- `rm` = remove
- `rmdir testFolder` = deletes the directory only if they are empty
- `rm -r testFolder` = deletes the directory testFolder if found in current location with all its content
- `touch testFile.txt` = creates the file testFile.txt in the current location
- `rm testFile.txt` = deletes the file testFile.txt in the current location
- `rm *` = deletes all the files in the current location
- `start testFile.txt` = invokes/opens the file testFile.txt if found in current location
- `start notepad++ testFile.txt` = invokes/opens the file testFile.txt if found in current location with the notepad++ app
- `code .` = opens current directory into Visual Studio Code
- `atom .` = opens current directory into Atom 
- `explorer .` = opens current directory in File Explorer (Windows)

<br>

<span style="display:block;"> **Keyboard shortcuts** </span>
- CTRL + A = goes to the beginning of the typed string
- CTRL + E = goes to the end of the typed string
- CTRL + U = clears current typed string
- TAB = autocompletes
- Up & Down Arrow = cycles through all executed commands in the current session





## Node.js ##

Node.js is an open source server environment that allows to use JavaScript outside of a web browser and therefore it is able to perform backend operations and interact with and manipulate your database or local files on your server. Node.js is portable since it can run on various platforms and uses JavaScript as language. It runs single threaded, non-blocking, asynchronous programming, which is very memory efficient. 

<span style="display:block;"> **Bash commands** </span>

- `node testFile.js` = runs the `testFile.js` file in the terminal
- `nodemon testFile.js` = runs the `testFile.js` file in the terminal using nodemon (see below)
- `node` = accesses the REPL where you can execute code right away (Read Evaluate Print Loops)
- `.exit` = exits the REPL
- CTRL + C = exits the REPL

<br>

<span style="display:block;"> **The FileSystem module** </span>

The FileSystem module is a built-in node.js module that allows JavaScript to interact with local file on the server.

```js
//Require the FileSystem module so you can use its bult-in functions
const fs = require("fs"); 

//Creates a copy of file1.txt's content to file2.txt in the current path
fs.copyFileSync("file1.txt", "file2.txt");
```


## **Node Package Manager**
The Node Package Manager (npm) It's a library and registry for JavaScript software packages. npm also has command-line tools to help you install the different packages and manage their dependencies. npm is installed together with node.js. In the example below, you can see how to initialize the npm inside your project folder and create a package.json file that will contain all project details and its dependencies:

```sh
cd /project/folder #go to the corresponding project folder
npm init #initialize npm. To speed things up, you could also use 'npm init -y'. The '-y' says yes to all the initialization questions
package name: (introtonodejs) #type a package name or hit Enter to accept the sugguestion between brackets
version: (1.0.0) #type a version name or hit Enter to accept the sugguestion between brackets
description: This is an introduction to node.js #type a description
entry point: (index.js) #type the main js project file or hit Enter to accept the sugguestion between brackets
test command:
git repository:
keywords:
author: #type your name
license: (ISC)
About to write to C:\WebDev\introToNodeJs\package.json:

{
  "name": "introtonodejs",
  "version": "1.0.0",
  "description": "This is an introduction to node.js",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this OK? (yes) #hit enter if the aforementioned summary is connect. This will create the project package.json file
```
To look for and install a package/library that does not come preinstalled by default with node.js, visit https://www.npmjs.com/, look for the corresponding item, and then type `npm install package_name`. When installing new packages, these will be included automatically in the `dependencies` section of the project package.json file and the necessary package files (code files, their dependencies etc) will be downloaded and saved in your project `node_modules` subfolder (automatically created). Once installed, the module has to be required (like in the FileSystem example above) and only then we can tap into the module built-in functions/methods and properties, for instance:

```sh
#Bash
npm install superheroes #installs the module called "superheroes" via the git bash terminal
```

```js
//Javascript
const superheroes = require("superheroes");
superheroes.random();
```
This module has only the `.random()` functions and it generates random superheroes names when the function is called. For every module, the npm website has a documentation page with all the module details.





## **Express.js: Creating our first server**
Express.js is a small framework that works on top of Node.js web server functionality to simplify its APIs and add helpful new features. 

When creating a brand new project, we create a new folder, a js start point file and the corresponding `package.json` file by going through the steps mentioned above after typing `npm init` in the CLI.

Then, we need to install `Express` by typing `npm install express` (see https://expressjs.com/en/starter/installing.html). As usual, `Express` will be added to the `package.json` dependencies list and its code files will be added to the automatically created `node_modules` subfolder.

Then in our js file we write:
```js
const express = require("express");
//require the express module

const app = express();
//initialise it so that you can use its properties and methods

app.listen(3000, function () {
  console.log("Server has started on port 3000.");
});
//use the listen() method and specify the corresponding port (in this case 3000) the server should expect HTTP requests from. You can also add a call back function, like in this case, to log into the console that the server started listening on port 3000 and waiting for input. After starting our server, we can communicate with it via the browsers through 'http://localhost:3000/'

```
We then run the js file from the terminal (cmd, powershell, bash etc) by typing `node fileName.js`. 





## **Handling requests: GET request**

Install the nodemon library, like so: `npm install -g nodemon`. You might have to do that via an elevated terminal. nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file/source code changes in the directory are detected. nodemon does not require any additional changes to your code or method of development. nodemon is a replacement wrapper for node. To use `nodemon`, replace the word `node` on the command line when executing your script.

```js
app.get("/", function (request, response) {
    console.log(request);
    response.send("<h1>Hello, world!</h1>");
  });
//use the get() method to instruct the server on what to do when it receives a get request from a browser or webrequest. The first parameter specifies the route where the request that should be handled is made to, in this case is "/", the home page/root. We can then add a call back function that has two parameters, request and response. Here we are logging to the console the request received from the browser, for instance, and sending "Hello, world!" as a response. You can access this by going to: http://localhost:3000/

app.get("/contact", function (req, res) {
  console.log(req);
  res.send("<h1>Contact me at: test@gmail.com</h1>");
});
//use the get() method to instruct the server on what to do when it receives a get request from a browser or webrequest. The first parameter specifies the route where the request that should be handled is made to, in this case is "/contact". You can access this by going to: http://localhost:3000/contact

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
//use the sendFile() method to send an html page as response. Paths in express cannot be relative, they must be absolute. Therefore, either you give the full path or you use __dirname to refer to the current project folder + the html file

```
We can check if we get the right response by visiting the corresponding location via a browser, in this case http://localhost:3000/ (when running locally, it is http://localhost: + the port you chose to run the server on + the route, in this case "/")
We then run the js file from the terminal (cmd, powershell, bash etc) by typing `nodemon fileName.js`. The difference of running server with node and nodemon is that when changing anything in the project file, nodemon will automatically restart the server without us having to stop the server and then running it again. 





## **Handling requests: POST request**

We install the `body-parser` library to be able to process `post` form requests using the following command: `npm install body-parser`. Once installed, `body-parser` has to be required, as usual, and then enabled using the express' `use()` method. See example below:

<span style="display:block;"> **HTML** </span>

```html
<!--For this example, we only need an extract the body of the page-->
  <body>
    <h1>Calculator</h1>
    <form method="post" action="/">
      <input type="text" name="num1" placeholder="First Number" />
      <input type="text" name="num2" placeholder="Second Number" />
      <button id="submit" type="submit" name="submit">Calculate</button>
    </form>
    </body>
    ...
```

<span style="display:block;"> **JavaScript** </span>

```js
const express = require("express"); //we require the express library
const app = express(); //we declare the app variable to access all express' methods and properties
const bodyParser = require("body-parser"); //we require the body-paraser library

app.use(bodyParser.urlencoded({ extended: true })); //in order to tap into body-parser library's methods, we have to specify the method inside the express use() method. Since Express 4.16+, express has middleware body parsing features without the need to install external libraries. So this line could be writte as `app.use(express.urlencoded({ extended: true}))`

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html"); //when a request send to our root route is detected by the server, we send our index.html file as response using the express' sendFile() method
});

app.post("/", function (req, res) {
  console.log(req.body); //we use the body property now available through body-parser's library
  let num1 = Number(req.body.num1); //we can access the form posted values using the corresponding name attribute we declared in the html page using the '.' notation
  let num2 = Number(req.body.num2); //same thing here

  //when using body-parser, everything is parsed as text. Since our objective is to sum two numbers, we have to convert the values to numbers using Number().

  let result = num1 + num2;
  res.send("The result of the addition is: " + result); //we send back a page with the corresponding results tapping into the response send() method
});

//we enable for the server to 'listen' for requests coming from http://localhost on port 3000
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
```
<span style="display:block;"> **Comments** </span> 
- The html form `action` attribute defines where the data gets sent. Its value must be a valid relative or absolute URL. If this attribute isn't provided, the data will be sent to the URL of the page containing the form — the current page.
- There can only be one `res.send()` per `app.get()`/`app.post()` in the same javascript file. On the other hand, we can send as many `res.write()` as we want and then add `res.send()` at the end.







## **API Basics**

Two simple examples of APIs:
- https://kanye.rest/
- https://sv443.net/jokeapi/v2/
- https://bored-api.appbrewery.com/

<br>

Basic concepts:
- **Base URL**
- **Endpoints**
- **Path Parameters**: identify a specific resource in a resource collection
- **Query Parameters**: sort/filter an Endpoint's resources
- **Authentication**
- **Methods**

For instance: https://baseURL/Endpoint/resourceID or https://baseURL/Endpoint?queryPar1=value&queryPar2=value

In the example above, path parameters refers to a specific resource ('resourceID') and it is separated from the rest of the URL by a forward slsh (/). Query parameters used for sorting/filtering resources are separated from the Endpoint with a question mark (?) and in case of more than one, they are chained together with ampersand symbol (&).

In the example of https://sv443.net/jokeapi/v2/, for instance, the following URL, https://v2.jokeapi.dev/joke/Dark,Christmas?blacklistFlags=political,racist&amount=6:
- https://v2.jokeapi.dev/joke/ is the API Endpoint
- `Dark` and `Christmas` are the path parameters that would inlcude a specific collection resource
- `blacklistFlags=political,racist` and `amount=6` are the query parameters that filters the data of each category. They come always after a question mark (?) in the URL and in case of several parameters they are chained together with an ampersand symbol (&). They are key-value pairs using an equal sign (=). In case more values are allowed, they can be chained together by a comma (,)

Depending on the operation we want to perform with the data we can retrieve from an API, we can use different methods: **GET**, **POST**, **PUT**, **PATCH**, and **DELETE** are the five most common HTTP methods for retrieving from and sending data to a server:
- The **GET** method is used to retrieve data from the server;
- The **POST** method sends data to the server and creates a new resource;
- The **PUT** method is most often used to update an existing resource;
- The **PATCH** method is very similar to the PUT method because it also modifies an existing resource. The difference is that for the PUT method, the request body contains the complete new version, whereas for the PATCH method, the request body only needs to contain the specific changes to the resource;
- The **DELETE** method is used to delete a resource;

In order to test more easily API requests, you can use Postman: https://www.postman.com/downloads/. 

When sending a request, either via console, script, postman or browser, we get back data in either **JSON**, **XML** or **YAML** format. The most used nowaways is **JSON** via what is called a **RESTful API**. A REST API is an API that conforms to the design principles of the **REST**, or **representational state transfer architectural style**. For this reason, REST APIs are sometimes referred to RESTful APIs.

In Google Chrome, there is an extension available that allows you to "prettify" the JSON response: https://chrome.google.com/webstore/detail/json-viewer-pro/eifflpmocdbdmepbjaopkkhbfmdgijcc/related (JSON Viewer PRO). This is an example of a JSON formatted response, we receive when using OpenWeatherMap api, which provides weather information based on the queries location:

<strong>Request</strong>
https://api.openweathermap.org/data/2.5/weather?q=brussels&appid=[your_appid]&units=metric

<strong>Response in JSON</strong>
```json
{
    "coord": {
        "lon": 4.3488,
        "lat": 50.8504
    },
    "weather": [
        {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 25.8,
        "feels_like": 25.69,
        "temp_min": 24.88,
        "temp_max": 27.19,
        "pressure": 1014,
        "humidity": 48
    },
    "visibility": 10000,
    "wind": {
        "speed": 4.63,
        "deg": 50
    },
    "clouds": {
        "all": 0
    },
    "dt": 1686241518,
    "sys": {
        "type": 1,
        "id": 1227,
        "country": "BE",
        "sunrise": 1686195032,
        "sunset": 1686253974
    },
    "timezone": 7200,
    "id": 2800866,
    "name": "Brussels",
    "cod": 200
}
```

### **JSON Serialization** ###
JSON stands for JavaScript Object Notation and it is called like that because it is based on how objects are structured in JavaScript. JSON serialization is the process of converting a JavaScript object into a JSON string by using the `JSON.stringify()` method. It serializes JavaScript objects so that they can be easily transmitted over a network or stored in a file. When instead we want to convert a JSON string into a JS Object, we can use the `JSON.parse()` method instead:

**JS Object => JSON string**
```js
let newObject = {
  firstName: "John",
  lastName: "Doe",
  city: "Brussels",
  age: 25,
  education: [
    {
      degree: "BA in Modern Languages",
      university: "University of Glasgow",
    },
    {
      degree: "MSc in Chinese Studies",
      university: "University of Manchester",
    },
  ],
};

let serialisedObject = JSON.stringify(newObject);

console.log(serialisedObject);
```
<br>

The output will be:
```json 
{"firstName":"John","lastName":"Doe","city":"Brussels","age":25,"education":[{"degree":"BA in Modern Languages","university":"University of Glasgow"},{"degree":"MSc in Chinese Studies","university":"University of Manchester"}]}
```
<br>

**JSON string => JS Object**
```js
let JSONstring =
  '{"firstName":"John","lastName":"Doe","city":"Brussels","age":25,"education":[{"degree":"BA in Modern Languages","university":"University of Glasgow"},{"degree":"MSc in Chinese Studies","university":"University of Manchester"}]}';
let JSObject = JSON.parse(JSONstring);
console.log(JSObject);
```
<br>

The output will be:
```js
{
  firstName: 'John',
  lastName: 'Doe',
  city: 'Brussels',
  age: 25,
  education: [
    {
      degree: 'BA in Modern Languages',
      university: 'University of Glasgow'
    },
    {
      degree: 'MSc in Chinese Studies',
      university: 'University of Manchester'
    }
  ]
}
```
The `JSON.parse()` method is also used to parse hexadecimal code into a JS Object.


### **Example: making GET requests**
In the example below, we are using the built-in `https` library to make a get request to `api.openweathermap.org` to retrieve weather hexadecimal data about Brussels, parse them into JSON, JSON string, and YAML:

<span style="display:block;"> **JavaScript** </span>

```js
//npm install json-to-pretty-yaml
//npm install express
//npm install colors
//https is nodejs native library

import express from "express";
import YAML from "json-to-pretty-yaml";
import https from "https";
import colors from "colors";

const app = express();

app.listen(3000, function () {
  console.log("Server running on port 3000");
});

const options = { rejectUnauthorized: false };
const url =
  "https://api.openweathermap.org/data/2.5/weather?q=brussels&appid=[appid]&units=metric";

app.get("/", function (req, res) {
  https.get(url, options, function (response) {
    console.log("##This is the response status code:##".green);
    console.log(response.statusCode);
    response.on("data", function (data) {
      console.log(
        "\n##This is data parsed into a JS Object thanks to JSON.parse(). It is originally hexadecimal code:##"
          .green
      );

      let JSObject = JSON.parse(data);
      console.log(JSObject);

      console.log(
        "\n##This is a JS Object serialised into a JSON string thanks to JSON.stringify():##"
          .green
      );
      console.log(JSON.stringify(JSObject));

      console.log("\n##This is a JS Object parsed into a YAML object:##".green);
      console.log(YAML.stringify(JSObject));
    });
  });
  res.send("Server is up and running");
});

```

<span style="display:block;"> **Output** </span>

```bash
##This is the response status code:##
200

##This is data parsed to JSON thanks to JSON.parse(). It is originally hexadecimal code:##
{
  coord: { lon: 4.3488, lat: 50.8504 },
  weather: [ { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' } ],
  base: 'stations',
  main: {
    temp: 14.6,
    feels_like: 14.26,
    temp_min: 13.78,
    temp_max: 15.46,
    pressure: 1011,
    humidity: 82
  },
  visibility: 10000,
  wind: { speed: 5.66, deg: 240 },
  clouds: { all: 0 },
  dt: 1688362200,
  sys: {
    type: 1,
    id: 1227,
    country: 'BE',
    sunrise: 1688355254,
    sunset: 1688414337
  },
  timezone: 7200,
  id: 2800866,
  name: 'Brussels',
  cod: 200
}

##This is JSON parsed into a single string thanks to JSON.stringify():##
{"coord":{"lon":4.3488,"lat":50.8504},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"base":"stations","main":{"temp":14.6,"feels_like":14.26,"temp_min":13.78,"temp_max":15.46,"pressure":1011,"humidity":82},"visibility":10000,"wind":{"speed":5.66,"deg":240},"clouds":{"all":0},"dt":1688362200,"sys":{"type":1,"id":1227,"country":"BE","sunrise":1688355254,"sunset":1688414337},"timezone":7200,"id":2800866,"name":"Brussels","cod":200}

##This is JSON parsed into a YAML:##
coord:
  lon: 4.3488
  lat: 50.8504
weather:
  - id: 800
    main: "Clear"
    description: "clear sky"
    icon: "01d"
base: "stations"
main:
  temp: 14.6
  feels_like: 14.26
  temp_min: 13.78
  temp_max: 15.46
  pressure: 1011
  humidity: 82
visibility: 10000
wind:
  speed: 5.66
  deg: 240
clouds:
  all: 0
dt: 1688362200
sys:
  type: 1
  id: 1227
  country: "BE"
  sunrise: 1688355254
  sunset: 1688414337
timezone: 7200
id: 2800866
name: "Brussels"
cod: 200
```


### **Example: making GET/POST requests**

```js
//npm install json-to-pretty-yaml
//npm install express
//npm install colors
//https is nodejs native library
//npm install body-parser

const express = require("express");
const app = express();
const YAML = require("json-to-pretty-yaml");
const https = require("node:https");
const colours = require("colors");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function () {
  console.log("Server running on port 3000");
});

const options = { rejectUnauthorized: false };

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=[appid]&units=metric";

  https.get(url, options, function (response) {
    console.log("##This is the response status code:##".green);
    console.log(response.statusCode);
    response.on("data", function (data) {
      console.log(
        "\n##This is data parsed to JSON thanks to JSON.parse(). It is originally hexadecimal code:##"
          .green
      );
      console.log(JSON.parse(data));

      console.log(
        "\n##This is JSON parsed into a single string thanks to JSON.stringify():##"
          .green
      );
      console.log(JSON.stringify(JSON.parse(data)));

      console.log("\n##This is JSON parsed into a YAML:##".green);
      console.log(YAML.stringify(JSON.parse(data)));

      console.log("\n##Weather description##".green);
      const weatherData = JSON.parse(data);
      console.log(weatherData.weather[0].description);
      const icon = weatherData.weather[0].icon;
      const iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write(
        "<h1>The temperature in " +
          query +
          " is: " +
          weatherData.main.temp +
          " degrees Celsius</h1>"
      );
      res.write(
        "<p>The weather is currently " +
          weatherData.weather[0].description +
          "</p>"
      );

      res.write("<img src='" + iconUrl + "' alt='weather_icon'>");

      res.send();
    });
  });
});

```


<span style="display:block;"> **Comments** </span>
- To better understand status code we get back when making API requests, please see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status






## **How to serve static files on a server**

We can achieve this by using the express `static()` method, for instance:
```js
const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.static("views"));

app.use(function (req, res, next) {
  if (req.url.endsWith(".css")) {res.type("text/css");}
  next();
});

```
The "public" and "views" directories are commonly used in Node.js web applications to organize static files and views respectively.

- Public directory: The "public" directory is typically used to store static assets such as CSS files, JavaScript files, images, and other client-side resources. When you serve files from the "public" directory using express.static, Express automatically handles the routing for those files. You don't need to include "public" in the URL path when referencing files from the "public" directory. Express treats the "public" directory as the root for serving static files. So, if you have a CSS file named "signin.css" in the "public" directory, you can reference it in your HTML file as `<link rel="stylesheet" type="text/css" href="/signin.css">`. The leading forward slash ("/") represents the root directory of your server, and Express automatically serves the file from the "public" directory.

- Views directory: The "views" directory is often used to store view templates or HTML files that are rendered on the server side and sent as responses to client requests. This directory is commonly used with templating engines such as EJS or Pug (formerly Jade). The "views" directory is typically specified when configuring the view engine in your Node.js application. However, it is not involved in serving static files like CSS files. Therefore, you don't need to include "views" in the URL path when referencing static files like CSS.

In summary, the "public" directory is specifically designed for serving static files, while the "views" directory is used for storing server-rendered view templates. When referencing static files in your HTML, you only need to specify the relative path from the root of the server, without including "public" or "views" directories in the URL path.

More info: https://expressjs.com/en/starter/static-files.html





## **Git**

<span style="display:block;"> **Commands** </span>

- `git init` = creates a git local repository and start file changes
- `git status` = checks what is inside the working directory or staging area
- `git add app.js` = adds app.js to the staging area
- `git add .` = adds all the files in the current working direcotory to the staging area
- `git rm --cached -r .` = remove all the files that are currently in the staging area
- `git rm --cached app.js` = remove app.js from the staging area
- `git commit -m "Commit app.js for the first time"` = commit all the files in the current staging area to the git repository. The message is important to summarize what changed from one commit/version to another
- `git log` = checks log of all commits with creation author, date, time and hash ID
- `git diff app.js` = check the difference between the last modifications and the last commited version of the file app.js in the local repository
- `git checkout app.js` = discards the last modifications and rolls back to the last commited version of the file app.js from the local repository
- `git remote add origin https://github.com/your_account/your_repository` = adds the remote repository
- `git push -u origin main` = pushes the local repository to the remote repository
- `git restore --staged app.js...` = moves app.js back from the stagint area to the working directory
- `git config --global user.name "John Doe"` = changes your commiter name globally to John Doe. In case you only want to change it for the current repository, remove the `--global` flag
- `git config --global user.email "john@doe.org"` = changes your commiter email globally to john@doe.org. In case you only want to change it for the current repository, remove the `--global` flag
- `git commit --amend --author="John Doe <john@doe.org>"` = changes the author info of the very last commit. Type the new commit message, or keep the old one, press ESC to exit Insert mode and type `:wq` to confirm the changes and quit
- `git config user.name` = shows currently configured author name
- `git config user.email` = shows currently configured author email
- `git config --list` = show current configuration
- `git config core.autocrlf` = displays current CRLF warning settings
- `git config --local core.autocrlf false` = sets CRLF warning settings to false
- `git remote set-url origin https://github.com/andreadg-dev/web-development-bootcamp` = changes origin URL pointer to https://github.com/andreadg-dev/web-development-bootcamp. Used when cloning a remote repository locally and then pushing this local repository to one's own remote repository

The git remote repository is https://github.com/andreadg-dev/notes.git and it is private.

In case of the error `fatal: unable to access 'https://github.com/andreadg-dev/notes.git/': SSL certificate problem: unable to get local issuer certificate` execute `git config --global http.sslbackend schannel`



<span style="display:block; padding-top: 1rem"> **.gitignore** </span>
The purpose of gitignore files is to ensure that certain files not tracked by Git remain untracked. To stop tracking a file that is currently tracked, use git rm --cached to remove the file from the index. The filename can then be added to the .gitignore file to stop the file from being reintroduced in later commits. For instance, files you would want to ignore are files containing API keys or passwords or node_modules since hosting site usually automatically install and load libraries as instructed in the package.json file.
Useful gitignore templates can be found here: https://github.com/github/gitignore (for instance Node.gitignore).

Some examples: https://git-scm.com/docs/gitignore#_examples

Learn git branching: https://learngitbranching.js.org/




## **CommonJS VS ES6 syntax: `require()`, `import from`, `function(){}`, `() =>`**

**CommonJS syntax (Node.js pre-ES6):**
```javascript
const express = require("express");
const app = express();
const port = 3000;

app.get("/", function (req, res) {
  res.send(`Server starting on port ${port}`);
});

app.listen(port, function() {
  console.log(`Server starting on port ${port}`);
});

```
In this syntax, you use `require` to import modules, which is the traditional way of importing in Node.js before ES6 modules were supported. It is still widely used in Node.js applications, especially in those with older codebases. 

<br>

**ES6 syntax (using ECMAScript modules):**
```javascript
import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send(`Server starting on port ${port}`));
app.listen(port, () => console.log(`Server starting on port ${port}`));

```
With ES6 modules, you use the import and export statements to work with modules. This syntax was introduced to JavaScript with ES6 (ECMAScript 2015) and is supported in modern Node.js versions. You can enable ES modules in a Node.js package by changing the file extensions from `.js` to `.mjs` (as opposed to `.cjs` file that refers to CommonJS instead), or, even better by adding the following line to your `package.json` file:
```json 
"type":"module"
```
With that inclusion, Node.js treats all files inside that package as ES modules, and you won’t have to change the file to `.mjs` extension. 
Which one to use depends on the version of Node.js you are running and your personal preference. If you are using a version of Node.js that supports ES6 modules (typically v12 and above), you can use the ES6 syntax. However, if you are working on an older project or using an older version of Node.js, you might need to stick with the CommonJS syntax which is currently the default in Node.js.

Moreover, as you can see from the examples above, ES6 introduced arrow functions `() =>`. As long as your version of Node.js supports arrow functions (usually starting from Node.js v6 and above), you can use them in your CommonJS modules without any issues. You can use regular functions side by side with arrow functions. They are not mutually exclusive and they don't always have the same behaviour, especially when it comes to the `this` keyword. See: https://www.freecodecamp.org/news/when-and-why-you-should-use-es6-arrow-functions-and-when-you-shouldnt-3d851d7f0b26/ 






## **EJS: Embedded Javascript Templating**

EJS or Embedded Javascript Templating is a templating engine used by Node.js. Template engine that helps to render dynamic HTML content pages by combining static HTML files with data or dynamically generated content from the backend/server side.

Download the **EJS language support** plugin in Visual Studio Code: https://marketplace.visualstudio.com/items?itemName=DigitalBrainstem.javascript-ejs-support

Simple usage example:

**JavaScript**
```js
//npm install ejs - execute this line within a CLI
//https://www.npmjs.com/package/ejs
import express from "express";
import ejs from "ejs";
const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname); //to use only in case we want the current folder to store the other ejs files and not the views folder
app.use(express.static("public"));

let port = 3000;

app.get("/", (req, res) => {
  let rn1 = Math.random();
  let dynamicContent = Math.floor(rn1 * 100) + 1;
  res.render("dynamicHTMLpage.ejs", { dynamicContent });
});

app.listen(port, console.log(`Server running on port ${port}`));

```
<br>

**HTML/EJS** (file title and extension: `dynamicHTMLpage.ejs`)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EJS example</title>
</head>
<body>
  <h1>The random percentage is: <%= dynamicContent %> %</h1> <!--here is where the dynamicContent generated in the .js file is inserted when rendering the final html page-->
</body>
</html>

```
The .js file, beside importing ejs and setting as the view engine, has to contain a render function in the `app.get/post` code block, for instance: `res.render("dynamicHTMLpage.ejs", { dynamicContent })`. You should first mention the name of the page the content should be rendered to and then the content. When using ejs, our HTML dynamic page must have a `.ejs` extension instead of `.html` so that the EJS syntax can be correctly interpreted, as in this case: `<%= dynamicContent %>`. The name of page and the content variable or value should match the target `.ejs` file. Moreover, by default, EJS expect the `.ejs` to be stored in a `views` project subfolder. It is possible to change the default folder that is supposed to contains these template pages, for instance: `app.set("views", __dirname);`. This line of code would set the default views directory to the current directory.


### **EJS Tags**

- `<%= variable %>` = this tag will interpret the content as JavaScript and will display an output (variable's output)
- `<% console.log("Hello World!") %>` = this tag will interpret the content as executable JavaScript and execute it
- `<%- <h1>html content</h1> %>` = this tag will intepret and render the content as HTML
- `<%% %%>` = this tag allows to escape the `<%` or `%>` so that they are actually displayed in the page as plain text
- `<%# This is a comment %>` = this tag will interpret its content as only a comment and not code
- `<%- include("header.ejs")%>` = insert other ejs files in the current one using the ejs function `include()`. Really useful tag to reuse parts in several pages that do not change, like headers, footers, copyright, contact info etc... 

### **EJS Tags: Practical example**

**JavaScript**
```js
import express from "express";
import ejs from "ejs";
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const data = {
    title: "EJS Tags",
    seconds: new Date().getSeconds(),
    items: ["apple", "banana", "cherry"],
    htmlContent: "<strong>This is some strong text</strong>",
  };
  res.render("index.ejs", data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

```
<br>

**HTML/EJS**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>EJS Tags</title>
  </head>

  <body>
    <h1><%= title %></h1><!--displays a variable's output-->
    <p>Current second: <%= seconds %></p><!--displays a variable's output-->
    <% if (locals.items) { if (seconds % 2===0) { %><!--execute javascript code-->
    <ul>
      <% items.forEach(fruit => { %>
      <li><%= fruit %></li>
      <% }); %>
    </ul>

    <% } else { %>
    <p>No items to display</p>
    <% }} %>
    <p><%- htmlContent %></p><!--interpret html content-->
    <%- include("footer.ejs")%><!--includes a file-->
  </body>
</html>

```
<span style="display:block;"> **Comments** </span>
- When using the EJS tags to include JavaScript code (`<% %>`), these pair of tags must be used on each line of the javascript code block.
- When using `<%- include("file.ejs") %>`, the file we want to include must also be in the VIEWS folder, unless you set the default folder as another one.
- When passing the whole object `res.render("index.ejs", data);` to the ejs file, you can then directly refer to its properties, for instance `title`, `seconds`, etc. If you instead write the line with curly braces `res.render("index.ejs",{ data });`, you will have to access the object properties using the dot syntax, `data.title`, `data.seconds`, etc
- **IMPORTANT** - When we want to check if a variable exists and it's defined before execute code that use that variable, we can use an if statement, for instance `if(items){//do something}`. If we use the same syntax within a ejs file, this is not going to work. To be able to use this functionality, you will have to use the `locals` keyword, for instance `if(locals.items)`





## **Useful Chrome add-ons**
- **JSON Viewer Pro**: prettifies JSON formatted data and allows to copy path to keys and values - https://chrome.google.com/webstore/detail/json-viewer-pro/eifflpmocdbdmepbjaopkkhbfmdgijcc


## **Useful Libraries**
- `npm install express`: web server framework for node.js - https://www.npmjs.com/package/express
- `npm install nodemon`: automatically restarts the node application when file changes in the directory are detected - https://www.npmjs.com/package/nodemon
- `npm install axios`: makes http requests from node.js - https://www.npmjs.com/package/axios 
- `npm install pg`: library used to work with PostgresSQL databases
- `npm install body-parser`: pre-processing middleware. Parses incoming request bodies, for instance from a post form - https://www.npmjs.com/package/body-parser. Since Express 4.16+, express has middleware body parsing features without the need to install external libraries 
- `npm install morgan`: HTTP request logger middleware for node.js - https://www.npmjs.com/package/morgan
- `npm install json-to-pretty-yaml`: converts JSON to pretty YAML - https://www.npmjs.com/package/json-to-pretty-yaml?activeTab=code 
- `npm install colors`: adds colors and style to the console - https://www.npmjs.com/package/colors
- `npm install marked`: parses markdown files into html files
- `https`: native node.js library to make http requests - https://nodejs.org/api/https.html#httpsgetoptions-callback
- `fs`: native node.js library that enables interacting with the device file system - https://nodejs.org/api/fs.html


