// Function to copy element to clipboard
function copySingleItemToClipBoard() {
  $("td").on("click", function () {
    let ptrContent = $(this).text();
    navigator.clipboard
      .writeText(ptrContent)
      .then(() => {
        console.log("Copied to clipboard:", ptrContent);
        // Optionally, display a notification or provide visual feedback to the user
      })
      .catch((error) => {
        console.error("Error copying to clipboard:", error);
      });
  });
}

// Add event listeners to highlight/unhighlight the table rows
function highlightElement() {
  $("td").on("click", function () {
    $(this).addClass("highlight"); // Add class to show the alert
    // Set timeout to remove the class after 2 seconds
    setTimeout(() => {
      $(this).removeClass("highlight"); // Remove class to hide the alert
    }, 700);
  });
}

function updateHeadingBasedOnDevice() {
  const isMobile = window.innerWidth <= 768;

  isMobile
    ? $("h1").css("font-size", "1.8rem")
    : $("h1").css("font-size", "2.5rem");

  $("h1, h2").each(function () {
    const currentText = $(this).text();
    isMobile
      ? $(this).text(currentText.replace(/_/g, " "))
      : $(this).text(currentText.replace(/ /g, "_"));
    // Replace underscores with spaces on a table/laptop screen and the opposite on a mobile
  });
}

function setCopyright() {
  $("#copyright").html(
    `Copyright ©${new Date().getFullYear()} ${$("#copyright").html()}`
  );
}

function escapeHTML(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function appendToRoot(objArray, index) {
  const spaceDiv = `<div class="mt-6"></div>`;

  if (objArray[index].type === "sections") {
    const snippetTitleRegex = /^\s*(?:\/\/## |### |::## |REM## )(.+?) ##/gm;
    const endCodeSnippetRegex = /^\s*(?:\/\/|#|::|REM)={3,}/gm;
    let pageBody = [];
    //pageTitle = objArray[index].title && `<h1 class="main"><u>${objArray[index].title}</u></h1>`;
    pageSnippets = objArray[index].snippets.map((snippet) => {
      let processedSnippet = escapeHTML(snippet.code)
        .replace(
          snippetTitleRegex,
          `<div class="snippet"><h2 class="snippet-title">🟡 $1</h2><pre><code class="language-${objArray[index].language}">` //
        )
        .replace(endCodeSnippetRegex, "</code></pre></div>");
      //console.log(processedSnippet);
      return `${spaceDiv}<div><h1>🔴 ${snippet.title} 🔴</h1>${processedSnippet}`;
      //<div><pre><code>${snippet.code}</code></pre></div></div>;
    });
    //pageBody.push(pageTitle);
    pageBody.push(pageSnippets.join(""));
    $("#root").append(pageBody);
  }

  if (objArray[index].type === "list") {
    let table = [`<table class="table">`];
    let headers = ["<thead><tr>"];
    let objectKeys = Object.keys(objArray[index].snippets[0]);
    objectKeys.map((header) => {
      headers.push(`<th>${header}</th>`);
    });
    headers.push("</tr></thead>");
    let tbody = ["<tbody>"];
    //pageTitle = objArray[index].title && `<h1 class="main"><u>${objArray[index].title}</u></h1>`;
    pageSnippets = objArray[index].snippets.map((snippet) => {
      return `<tr><td>${snippet[objectKeys[0]]}</td><td>${
        snippet[objectKeys[1]]
      }</td><td>${snippet[objectKeys[2]]}</td></tr>`;
    });
    tbody.push(pageSnippets.join(""));
    tbody.push("</tbody>");

    table.push(headers.join(""));
    table.push(tbody.join(""));
    table.push("</table>");
    let finalTable = `${spaceDiv}<h1>🔴 ${
      objArray[index].title
    } 🔴</h1>${table.join("")}`;
    $("#root").append(finalTable);
    copySingleItemToClipBoard();
    highlightElement();
  }
}

/* function appendSectionToNavbar(objArray) {
  let navItems = [];
  objArray.forEach((element, index) => {
    let navItem = `<li class="nav-item ${
      index === 0 ? "active" : ""
    }" id="navitem${index}"><a class="nav-link" href="#">${
      element.title
    }</a></li>`;
    navItems.push(navItem);
  });
  $("#navbar").append(navBar.replace("{{navItems}}", navItems.join("")));
  appendToRoot(objArray, 0);
} */

function appendSectionToNavbar(objArray) {
  let navDevItems = [];
  let navOtherItems = [];
  objArray.forEach((element, index) => {
    let navItem = `<a class="dropdown-item ${
      index === 0 ? "active" : ""
    }" href="#" id="navitem${index}">${element.title}</a>`;

    element.navcategory === "dev" && navDevItems.push(navItem);
    element.navcategory === "other" && navOtherItems.push(navItem);
  });

  let navbarComponent = navBarWithDropDowns
    .replace("{{navDevItems}}", navDevItems.join(""))
    .replace("{{navOtherItems}}", navOtherItems.join(""));

  console.log(navbarComponent);
  $("#navbar").append(navbarComponent);
  appendToRoot(objArray, 0);
}

function displaySectionOnClick(objArray) {
  $(document).on("click", ".dropdown-item", function () {
    $(".dropdown-item").each(function (index, element) {
      $(element).removeClass("active");
    });
    $(this).addClass("active");
    $("#root").empty();
    appendToRoot(objArray, Number($(this).attr("id").replace("navitem", "")));

    hljs.highlightAll();
  });
}

const navBarWithDropDowns = `<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
  <a class="navbar-brand" href="#">{a}</a>
  <div id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item dropdown dropend" id="devDropDown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          dev
        </a>
        <div class="dropdown-menu" data-bs-popper="static" aria-labelledby="navbarDropdownMenuLink">
          {{navDevItems}}
        </div>
      </li>
      <li class="nav-item dropdown dropend" id="otherDropDown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          other
        </a>
        <div class="dropdown-menu" data-bs-popper="static" aria-labelledby="navbarDropdownMenuLink">
          {{navOtherItems}}
        </div>
      </li>
    </ul>
  </div>
</nav>
`;

/* const navBar = `
                    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                    <a class="navbar-brand" href="#">{a}</a>
                    <div id="navbarNav">
                        <ul class="navbar-nav">{{navItems}}</ul>
                    </div>
                    </nav>
                    `; */

const cmd = {
  title: "cmd",
  type: "sections",
  language: "plaintext",
  navcategory: "dev",
  snippets: [
    {
      title: "my_cmd_notes",
      code: `
::## Basics ##
    :: Turn off command echoing. You can use :: or REM for comments
        @echo off

    :: Suspend execution
        pause
::==========================================

::## VARIABLES ##
    :: Set a variable — no spaces around '='
        set variablename=variablevalue

    :: Retrieve a variable
        echo %variablename%
::==========================================

::## OUTPUT TO FILE ##
    :: Overwrite file with output of a command
        ipconfig /all > C:\\temp\\ipconfig.log
        ipconfig /all > C:\\temp\\ipconfig.txt
        ipconfig /all > "C:\\directory with space\\ipconfig.txt"

    :: Overwrite a file with a blank line
        ECHO. > "C:\\directory with space\\Myfile.log"

    :: Append a blank line to a file
        ECHO. >> "C:\\My folder\\Myfile.log"

    :: Append text to a file
        ECHO Some text >> "C:\\My folder\\Myfile.log"

    :: Append a variable to a file
        ECHO %MY_VARIABLE% >> "C:\\My folder\\Myfile.log"

    :: Overwrite a file with the output of multiple commands
        > C:\\temp\\output.log (
            ipconfig /all
            ipconfig
        )
::==========================================      
      `,
    },
  ],
};

const typescript = {
  title: "typescript",
  type: "sections",
  language: "typescript",
  navcategory: "dev",
  snippets: [
    {
      title: "my_typescript_notes",
      code: `
//## Basic Primite Types ##
    let myName: string = "Andy"
    let myAge: number = 33 //could also be float or negative numbers, e.g. -2 or 1.5
    let isAdmin: boolean = true //either true or false
//==========================================


//## Objects ##
    let user: {
        name: string; 
        age: number; 
        hasAccess: boolean; 
        id: string | number
    }; //object type annotation

    user = {
        name: "Andy", 
        age: 33, 
        hasAccess: false, 
        id: "abc123"
    }; //object declaration
//==========================================


//## Arrays ##
    let colors: string[] //or you can write 'Array<string>': array of strings
    colors = ["blue","red","yellow"]

    let ages: number[] //or you can write 'Array<number>': array of numbers
    ages = [22,42,32,54]

    let users: {firstName: string; lastName: string}[] //you could also write 'Array<object>' or 'object[]' but better use describe the object in detail
    users = [{firstName: "Andy", lastName: "Candy"}, {firstName: "Jane", lastName: "Doe"}] //array of objects
//==========================================


//## Type inference and Type annotation ##
    let userName = "Jon" //TypeScript infers type to be string

    let userName2: string //TypeScript cannot infer the type here since there is no declaration so it infers type 'any'. We must use Type Annotation
    userName2 = "Jane"
        //TypeScript inference: if the variable is initiated and declared on the same line, TypeScript is able to infer the type
        //TypeScript annotation: the developer specifies the type at initiation with the syntax ': type'
//==========================================


//## Union Types ##
    let userId: string | number = "myUserId";
    userId = 123;
        //If a variable has to be able to accept more than type, it is possible to do so by using the pipe symbol ('or'). In this case userId can be either a string or a number
//==========================================


//## Functions ##
    function add(a: number, b: number):void{
        const sum = a + b;
        console.log(sum);
    } //'void' is used when a function does not return anything = no return statement

    const addArrow = (a: number, b: number):void=>{
        const sum = a + b;
        console.log(sum);
    } //same function as above but using 'arrow function' syntax

    function addWithOutput(a: number, b: number):number{
        const sum = a + b;
        console.log(sum);
        return sum;
    }

    const addWithOutputArrow = (a: number, b: number):number=>{
        const sum = a + b;
        console.log(sum);
        return sum;
    } //same function as above but using 'arrow function' syntax

    function calculate(a: number, b: number, calcFunc:(num1: number, num2: number)=>number){
        calcFunc(a,b)
    } //in this case we are passing a function as a the parameter of a main function and there as well, we need to use the TypeScript function annotation syntax (which is very similar to an arrow function)

    calculate(2,5, addWithOutput);
//==========================================


//## Type Aliases and Interfaces ##
    //type and interface in TypeScript are both used to define custom types, especially for objects, but they have slightly different use cases and capabilities.
    //in both cases, it's good practice to capitalize your type aliases/interfaces

    //Interface
        //Object and declaration merging
        interface UserInterface {
        name: string;
        age: number;
        }

        interface UserInterface{
            country: string;
        } //in this way you can easily extend an existing interface and add properties to it > declaration merging

        let user1: UserInterface = {name: "Jon Doe", age: 33, country: "Spain"}

        //Function type
        interface AddFunc {(num1: number, num2:number): number;} //can also be used for function types

        //Extension
        interface Animal { legs: number }
        interface Dog extends Animal { breed: string }
        let cat: Animal = {legs: 4}
        let lucky: Dog = {breed: "Dalmatian", legs: 4}

        interface Admin {permissions: string[]}
        interface AppUser {username: string}
        interface AppAdmin extends Admin, AppUser{}
        let mainAppAdmin: AppAdmin = {username: "jon123", permissions:["create","delete"]}

        //Classes implementation
        interface Credentials {
            email: string,
            password: string
        }

        class AuthCredentials implements Credentials{
            email: string;
            password: string;
            username: string
        } //when implementing an interface in a class, you must at least use the properties declared in the interface

        //Ideal for modeling objects and classes. Cannot be used for other types except for function types
        //Supports extension, class implementation, declaration merging


    //Type aliases
        //Union types
        type StringOrNum = string | number
        let userId2: StringOrNum = "helloWorld" //could also be a number 

        //Objects
        type UserType = {
        name: string;
        age: number;
        }
        let user2: UserType = {name: "Jane Doe", age: 32}

        //Functions
        type AddFn =  (num1: number, num2:number) => number;

        //Extension
        type AnimalType = { legs: number }
        type DogType = AnimalType & { breed: string }
        let cat2: AnimalType = {legs: 4}
        let bluey: DogType = {breed: "Doge", legs: 4}

        type AdminType = {permissions: string[]}
        type AppUserType = {username: string}
        type AppAdminType = Admin & AppUser
        let mainAppAdmin2: AppAdminType = {username: "jane123", permissions:["create","delete"]}

        //Can define any kind of type: unions, intersections, primitives, tuples, functions
        //Can be extended


//==========================================


//## Tips ##
    //• Avoid type 'any' at all costs
    //• Use 'void' for function that does not return anything and not 'undefined'
    //• In order to use TypeScript, install: npm install ts-node tsx typescript
//==========================================
    `,
    },
  ],
};

const troubleshooting = {
  title: "troubleshooting",
  type: "list",
  navcategory: "other",
  snippets: [
    {
      item: "notepad.exe",
      description: "Opens Notepad",
      tags: ["windows", "apps"],
    },
    {
      item: "snippingtool.exe",
      description: "Opens Snipping tool",
      tags: ["windows", "apps"],
    },
    {
      item: "netsh winsock reset catalog",
      description: "description",
      tags: ["windows", "network", "cmd"],
    },
    {
      item: "netsh int ip reset resetlog.txt",
      description: "description",
      tags: ["windows", "network", "cmd"],
    },
    {
      item: "netsh advfirewall reset",
      description: "description",
      tags: ["windows", "network", "cmd"],
    },
    {
      item: "ipconfig /release",
      description:
        "ipconfig /release is a command used in Windows operating systems to release the current IP address assigned to a network interface. When you release the IP address, the interface effectively disconnects from the network, making it available for reassignment by a DHCP (Dynamic Host Configuration Protocol) server. This command is often used when troubleshooting network connectivity issues or when you want to obtain a new IP address from the DHCP server.",
      tags: ["windows", "network", "cmd"],
    },
    {
      item: "ipconfig /renew",
      description: "description",
      tags: ["windows", "network", "cmd"],
    },
    {
      item: "ipconfig /flushdns",
      description: "description",
      tags: ["windows", "network", "cmd"],
    },
    {
      item: "net use T: \\\\network\\drive\\path",
      description:
        "Maps/assigns \\\\network\\drive\\path network drive to the letter T:",
      tags: ["windows", "network", "cmd"],
    },
    {
      item: "net use T: /delete",
      description: "Disconnects the network drive with the letter T:",
      tags: ["windows", "network", "cmd"],
    },
    {
      item: "[Net.ServicePointManager]::SecurityProtocol",
      description: "Displays the current security protocol(s) in use",
      tags: ["windows", "network", "cmd"],
    },
    {
      item: "[enum]::GetNames([Net.SecurityProtocolType])",
      description:
        "Lists all possible security protocols that can be configured",
      tags: ["windows", "network", "cmd"],
    },
    {
      item: "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12",
      description:
        "Sets the security protocol to TLS 1.2 for all new connections",
      tags: ["windows", "network", "cmd"],
    },
    {
      item: "net user",
      description:
        "Displays a list of all user accounts for the local computer",
      tags: ["windows", "lusrmgr", "cmd"],
    },
    {
      item: "net user 'sampleaccount'",
      description: "Displays information about the user account sampleaccount",
      tags: ["windows", "lusrmgr", "cmd"],
    },
    {
      item: "net localgroup 'docker-users' /add",
      description: "Creates a local group called docker-users",
      tags: ["windows", "lusrmgr", "cmd"],
    },
    {
      item: "net localgroup 'docker-users' /delete",
      description: "Deletes the local group called docker-users",
      tags: ["windows", "lusrmgr", "cmd"],
    },
    {
      item: "net localgroup 'administrators' 'domain\\username' /add",
      description: "Adds domain/username to the administrators group",
      tags: ["windows", "lusrmgr", "cmd"],
    },
    {
      item: "net localgroup 'administrators' 'domain\\username' /delete",
      description: "Removes domain/username from the administrator group",
      tags: ["windows", "lusrmgr", "cmd"],
    },
    {
      item: "net localgroup 'docker-users' 'domain\\username' /add",
      description:
        "Adds domain/username to the docker-users group in case the user wants to use the Docker app",
      tags: ["windows", "lusrmgr", "cmd"],
    },
    {
      item: "whoami /user",
      description:
        "Displays the current domain and user name and the security identifier (SID)",
      tags: ["windows", "lusrmgr", "cmd"],
    },
    {
      item: "whoami /all",
      description:
        "Displays user, group and privileges information for the user who is currently logged on to the local system. If used without parameters, whoami displays the current domain and user name",
      tags: ["windows", "lusrmgr", "cmd"],
    },
    {
      item: "Get-LocalGroup",
      description: "Retrieves all local groups on a device",
      tags: ["windows", "lusrmgr", "ps"],
    },
    {
      item: "New-LocalGroup -Name 'docker-users' -Description 'Docker users group'",
      description: "Creates a new local group called docker-users",
      tags: ["windows", "lusrmgr", "ps"],
    },
    {
      item: "Add-LocalGroupMember -Group 'docker-users' -Member '$((Get-WMIObject -class Win32_ComputerSystem | select username).username)'",
      description: "Adds current logged-on user to the docker-users group",
      tags: ["windows", "lusrmgr", "ps"],
    },
    {
      item: "Remove-LocalGroup -Name 'docker-users'",
      description: "Deletes the local group called docker-users",
      tags: ["windows", "lusrmgr", "ps"],
    },
    {
      item: "(Get-WMIObject -class Win32_ComputerSystem | Select-Object -Property username).username",
      description: "Retrieves current logged-on user",
      tags: ["windows", "lusrmgr", "ps"],
    },
    {
      item: "Ctrl+C",
      description: "Copies selected text",
      tags: ["windows", "keyboard"],
    },
    {
      item: "Ctrl+X",
      description: "Cuts selected text",
      tags: ["windows", "keyboard"],
    },
    {
      item: "Ctrl+V",
      description: "Pastes copied text",
      tags: ["windows", "keyboard"],
    },
    {
      item: "Windows key+V",
      description: "Opens CLIPBOARD HISTORY",
      tags: ["windows", "keyboard"],
    },
    {
      item: "Ctrl+Shift+ESC",
      description: "Opens TASK MANAGER",
      tags: ["windows", "keyboard"],
    },
    {
      item: "ncpa.cpl",
      description: "Opens NETWORK CONNECTIONS",
      tags: ["windows", "control_panel", "cmd"],
    },
    {
      item: "appwiz.cpl",
      description: "Opens PROGRAMS AND FEATURES",
      tags: ["windows", "control_panel", "cmd"],
    },
    {
      item: "timedate.cpl",
      description: "Opens DATE AND TIME",
      tags: ["windows", "control_panel", "cmd"],
    },
    {
      item: "inetcpl.cpl",
      description: "Opens INTERNET OPTIONS",
      tags: ["windows", "control_panel", "cmd"],
    },
    {
      item: "powercfg.cpl",
      description: "Opens POWER OPTIONS",
      tags: ["windows", "control_panel", "cmd"],
    },
    {
      item: "intl.cpl",
      description: "Opens LANGUAGE AND REGION control",
      tags: ["windows", "control_panel", "cmd"],
    },
    {
      item: "control.exe srchadmin.dll",
      description: "Opens INDEXING OPTIONS",
      tags: ["windows", "control_panel", "cmd"],
    },
    {
      item: "shell:::{A8A91A66-3A7D-4424-8D24-04E180695C7A}",
      description:
        "Opens CONTROL PANEL\\HARDWARE AND SOUND\\DEVICES AND PRINTERS",
      tags: ["windows", "control_panel", "run"],
    },
    {
      item: "lusrmgr.msc",
      description: "Opens LOCAL USERS AND GROUPS wizard",
      tags: ["windows", "msc_command", "cmd"],
    },
    {
      item: "devmgmt.msc",
      description: "Opens DEVICE MANAGER",
      tags: ["windows", "msc_command", "cmd"],
    },
    {
      item: "diskmgmt.msc",
      description: "Opens DISK MANAGEMENT",
      tags: ["windows", "msc_command", "cmd"],
    },
    {
      item: "eventvwr.msc",
      description: "Opens EVENT VIEWER",
      tags: ["windows", "msc_command", "cmd"],
    },
    {
      item: "gpedit.msc",
      description: "Opens LOCAL GROUP POLICY EDITOR",
      tags: ["windows", "msc_command", "cmd"],
    },
    {
      item: "msinfo32",
      description: "Opens SISTEM INFORMATION",
      tags: ["windows", "msc_command", "cmd"],
    },
    {
      item: "regedit",
      description: "Opens REGISTRY EDITOR",
      tags: ["windows", "msc_command", "cmd"],
    },
    {
      item: "taskmgr",
      description: "Opens TASK MANAGER",
      tags: ["windows", "msc_command", "cmd"],
    },
    {
      item: "services.msc",
      description: "Opens SERVICES",
      tags: ["windows", "msc_command", "cmd"],
    },
    {
      item: "winver",
      description: "Opens WINDOWS VERSION wizard",
      tags: ["windows", "msc_command", "cmd"],
    },
    {
      item: "printmanagement.msc",
      description: "Opens PRINT MANAGEMENT wizard",
      tags: ["windows", "msc_command", "cmd"],
    },
    {
      item: "sfc /scannow",
      description: "description",
      tags: ["windows", "system", "cmd"],
    },
    {
      item: "dism /online /cleanup-image /checkhealth",
      description: "description",
      tags: ["windows", "system", "cmd"],
    },
    {
      item: "dism /online /cleanup-image /scanhealth",
      description: "description",
      tags: ["windows", "system", "cmd"],
    },
    {
      item: "dism /online /cleanup-image /restorehealth",
      description: "description",
      tags: ["windows", "system", "cmd"],
    },
    {
      item: "Get-ComputerInfo | Select-Object -ExpandProperty OSUptime",
      description:
        "Retrieves the duration the operating system has been running since the last boot",
      tags: ["windows", "system", "ps"],
    },
    {
      item: "(Get-CimInstance Win32_OperatingSystem).LastBootUpTime",
      description: "Retrieves the date when the device was last booted",
      tags: ["windows", "system", "ps"],
    },
    {
      item: "wmic path win32_operatingsystem get lastbootuptime",
      description: "Retrieves the date when the device was last booted",
      tags: ["windows", "system", "cmd"],
    },
    {
      item: "start ms-settings:",
      description: "Opens SYSTEM SETTINGS",
      tags: ["windows", "system"],
    },
    {
      item: "start ms-settings:workplace",
      description: "Opens SYSTEM SETTINGS > ACCOUNTS > ACCESS WORK OR SCHOOL",
      tags: ["windows", "system"],
    },
    {
      item: "start ms-settings:emailandaccounts",
      description: "Opens SYSTEM SETTINGS > ACCOUNTS > EMAIL & ACCOUNTS",
      tags: ["windows", "system"],
    },
    {
      item: "start ms-settings:signinoptions",
      description: "Opens SYSTEM SETTINGS > ACCOUNTS > SING-IN OPTIONS",
      tags: ["windows", "system"],
    },
    {
      item: "start ms-settings:appsfeatures-app",
      description: "Opens SYSTEM SETTINGS > APPS > INSTALLED APPS",
      tags: ["windows", "system"],
    },
    {
      item: "start ms-settings:defaultapps",
      description: "Opens SYSTEM SETTINGS > APPS > DEFAULT APPS",
      tags: ["windows", "system"],
    },
    {
      item: "start ms-settings:startupapps",
      description: "Opens SYSTEM SETTINGS > APPS > STARTUP",
      tags: ["windows", "system"],
    },
    {
      item: "start ms-settings:network-advancedsettings",
      description:
        "Opens SYSTEM SETTINGS > NETWORK & INTERNET > ADVANCED NETWORK SETTINGS",
      tags: ["windows", "system"],
    },
    {
      item: "start ms-settings:sound-devices",
      description: "Opens SYSTEM SETTINGS > SYSTEM > SOUND > ALL SOUND DEVICES",
      tags: ["windows", "system"],
    },
    {
      item: "start ms-settings:sound",
      description: "Opens SYSTEM SETTINGS > SYSTEM > SOUND",
      tags: ["windows", "system"],
    },
    {
      item: "dir env:",
      description:
        "Displays the environment variables specific to the current session",
      tags: ["windows", "system", "cmd"],
    },
    {
      item: "Get-ChildItem env:",
      description:
        "Displays the environment variables specific to the current session",
      tags: ["windows", "system", "ps"],
    },
    {
      item: "$env:ALLUSERSPROFILE",
      description: "Retrieves env variable, for instance 'C:\\ProgramData'",
      tags: ["windows", "system", "ps"],
    },
    {
      item: "$env:APPDATA",
      description:
        "Retrieves env variable, for instance 'C:\\Users\\username\\AppData\\Roaming'",
      tags: ["windows", "system", "ps"],
    },
    {
      item: "$env:COMPUTERNAME",
      description: "Retrieves env variable, for instance 'NTTD-J92HGL3'",
      tags: ["windows", "system", "ps"],
    },
    {
      item: "$env:HOMEDRIVE",
      description: "Retrieves env variable, for instance 'C:'",
      tags: ["windows", "system", "ps"],
    },
    {
      item: "$env:HOMEPATH",
      description: "Retrieves env variable, for instance '\\Users\\username'",
      tags: ["windows", "system", "ps"],
    },
    {
      item: "$env:LOCALAPPDATA",
      description:
        "Retrieves env variable, for instance 'C:\\Users\\username\\AppData\\Local'",
      tags: ["windows", "system", "ps"],
    },
    {
      item: "$env:Model",
      description:
        "Retrieves the device model env variable, for instance '5520'",
      tags: ["windows", "system", "ps"],
    },
    {
      item: "$env:OneDrive",
      description:
        "Retrieves env variable, for instance 'C:\\Users\\username\\OneDrive'",
      tags: ["windows", "system", "ps"],
    },
    {
      item: "$env:OneDriveCommercial",
      description:
        "Retrieves env variable, for instance 'C:\\Users\\username\\OneDrive-Company'",
      tags: ["windows", "system", "ps"],
    },
    {
      item: "$env:OS",
      description: "Retrieves env variable, for instance 'Windows_NT'",
      tags: ["windows", "system", "ps"],
    },
    {
      item: "$env:Path",
      description: "Retrieves current path variable",
      tags: ["windows", "system", "ps"],
    },
    {
      item: "$env:POWERSHELL_DISTRIBUTION_CHANNEL",
      description:
        "Retrieves env variable, for instance 'MSI:Windows 10 Enterprise'",
      tags: ["windows", "system", "ps"],
    },
    {
      item: "$env:PROCESSOR_ARCHITECTURE",
      description: "Retrieves env variable, for instance 'AMD64'",
      tags: ["windows", "system", "ps"],
    },
    {
      item: "$env:ProgramData",
      description: "Retrieves env variable, for instance 'C:\\ProgramData'",
      tags: ["windows", "system", "ps"],
    },
    {
      item: "$env:ProgramFiles",
      description: "Retrieves env variable, for instance 'C:\\Program Files'",
      tags: ["windows", "system", "ps"],
    },
    {
      item: "$env:ProgramFiles(x86)",
      description:
        "Retrieves env variable, for instance 'C:\\Program Files (x86)'",
      tags: ["windows", "system", "ps"],
    },
    {
      item: "$env:Serial",
      description: "Retrieves env variable, for instance 'J92HGL3'",
      tags: ["windows", "system", "ps"],
    },
    {
      item: "$env:Type",
      description:
        "Retrieves device type env variable, for instance 'Latitude'",
      tags: ["windows", "system", "ps"],
    },
    {
      item: "$env:USERDNSDOMAIN",
      description: "Retrieves the user dns domain env variable'",
      tags: ["windows", "system", "ps"],
    },
    {
      item: "$env:USERDOMAIN",
      description: "Retrieves the user domain env variable",
      tags: ["windows", "system", "ps"],
    },
    {
      item: "$env:USERNAME",
      description: "Retrieves the username env variable",
      tags: ["windows", "system", "ps"],
    },
    {
      item: "$env:USERPROFILE",
      description: "Retrieves env variable, for instance 'C:\\Users\\username'",
      tags: ["windows", "system", "ps"],
    },
    {
      item: "%localappdata%\\Microsoft\\OneDrive\\onedrive.exe /reset",
      description: "Resets OneDrive if installed in that location",
      tags: ["windows", "system", "cmd"],
    },
    {
      item: "%programfiles%\\Microsoft OneDrive\\onedrive.exe /reset",
      description: "Resets OneDrive if installed in that location",
      tags: ["windows", "system", "cmd"],
    },
    {
      item: "%programfiles(x86)%\\Microsoft OneDrive\\onedrive.exe /reset",
      description: "Resets OneDrive if installed in that location",
      tags: ["windows", "system", "cmd"],
    },
    {
      item: "Get-Service -Name Windefend, Sense | Select-Object -Property Name, DisplayName, Status | Format-Table",
      description:
        "Retrieves Windows Defender Advanced Threat Protection Service and Microsoft Defender Antivirus Service service info",
      tags: ["windows", "system", "ps"],
    },
    {
      item: 'cmd /k "[command]"',
      description:
        'Opens a new Command Prompt window and runs the specified command between double-quotes ("[command]"). The /k switch keeps the Command Prompt window open after the command has executed, allowing you to see the output',
      tags: ["windows", "system", "run"],
    },
    {
      item: 'powershell -NoExit -Command "write \\"Hostname: ${env:COMPUTERNAME}\\"; gsv Windefend, Sense | select Name, DisplayName, Status | fl"',
      description:
        "Retrieves hostname, Windows Defender Advanced Threat Protection Service and Microsoft Defender Antivirus Service service info and it can be run from RUN",
      tags: ["windows", "system", "run"],
    },
    {
      item: 'powershell -NoExit -Command "[command]"',
      description:
        'Starts a new PowerShell process and keeps the window open after executing the command between double-quotes ("[command]") and it can be run from RUN',
      tags: ["windows", "system", "run"],
    },
    {
      item: 'cmd /k "sc query Windefend && sc query Sense"',
      description:
        "Retrieves Windows Defender Advanced Threat Protection Service and Microsoft Defender Antivirus Service service info and it can be run from RUN",
      tags: ["windows", "system", "run"],
    },
    {
      item: 'taskkill /IM "winword.exe" /F',
      description: "Kills all MS Words processes",
      tags: ["windows", "system"],
    },
    {
      item: 'taskkill /IM "teams.exe" /F',
      description: "Kills all MS Teams Classic processes",
      tags: ["windows", "system"],
    },
    {
      item: 'taskkill /IM "ms-teams.exe" /F',
      description: "Kills all MS New Teams processes",
      tags: ["windows", "system"],
    },
    {
      item: 'taskkill /IM "outlook.exe" /F',
      description: "Kills all MS Outlook processes",
      tags: ["windows", "system"],
    },
    {
      item: 'taskkill /IM "powerpnt.exe" /F',
      description: "Kills all MS PowerPoint processes",
      tags: ["windows", "system"],
    },
    {
      item: 'taskkill /IM "excel.exe" /F',
      description: "Kills all MS Excel processes",
      tags: ["windows", "system"],
    },
    {
      item: "New-ItemProperty -Path 'HKLM:\\SYSTEM\\CurrentControlSet\\Control\\FileSystem' -Name 'LongPathsEnabled' -Value 1 -PropertyType DWORD -Force",
      description:
        "Enables paths longer than 256 characters. Source: https://learn.microsoft.com/en-us/windows/win32/fileio/maximum-file-path-limitation?tabs=powershell",
      tags: ["windows", "regedit", "ps"],
    },
    {
      item: "reg add 'HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Windows NT\\Printers\\PointAndPrint' /v RestrictDriverInstallationToAdministrators /t REG_DWORD /d 0 /f",
      description:
        "Disable the restriction to allow printer driver installation only to device's administrators. See: https://support.microsoft.com/en-gb/topic/kb5005652-manage-new-point-and-print-default-driver-installation-behavior-cve-2021-34481-873642bf-2634-49c5-a23b-6d8e9a302872",
      tags: ["windows", "regedit", "cmd"],
    },
    {
      item: "reg add HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System /v EnableLUA /t REG_DWORD /d 0 /f",
      description:
        "Disables the User Account Control (UAC) that prompts user to confirm something that got executed and for administrator's credentials if the logged in account does not have the required rights",
      tags: ["windows", "regedit", "cmd"],
    },
    {
      item: "reg add HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System /v EnableLUA /t REG_DWORD /d 1 /f",
      description:
        "Enables the User Account Control (UAC) that prompts user to confirm something that got executed and for administrator's credentials if the logged in account does not have the required rights",
      tags: ["windows", "regedit", "cmd"],
    },
    {
      item: "Computer\\HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall",
      description:
        "Navigates to the regkey containing the info for the uninstaller exe/msi for each app installed on the device",
      tags: ["windows", "regedit"],
    },
    {
      item: "Computer\\HKEY_CLASSES_ROOT\\Installer\\Products",
      description:
        "Navigates to the regkey containing the info of all the software installed on a device",
      tags: ["windows", "regedit"],
    },
    {
      item: "Computer\\HKEY_CURRENT_USER\\Control Panel\\Desktop",
      description:
        "Navigates to the regkey containing the Wallpaper info, transcoded image and wallpaper path",
      tags: ["windows", "regedit"],
    },
    {
      item: "/_layouts/15/people.aspx?MembershipGroupId=0",
      description:
        "Navigates to the corresponding MS Cloud collection's access right page when added to the base OneDrive/Teams/SharePoint url, for instance: https://domain-my.sharepoint.com/personal/user_domain or https://domain.sharepoint.com/sites/sitename",
      tags: ["microsoft", "support_url", "browser"],
    },
    {
      item: "/_layouts/15/people.aspx?MembershipGroupId=3",
      description:
        "Navigates to the corresponding MS Cloud collection's owners page when added to the base OneDrive/Teams/SharePoint url, for instance: https://domain-my.sharepoint.com/personal/user_domain or https://domain.sharepoint.com/sites/sitename",
      tags: ["microsoft", "support_url", "browser"],
    },
    {
      item: "/_layouts/15/people.aspx?MembershipGroupId=4",
      description:
        "Navigates to the corresponding MS Cloud collection's visitors page when added to the base OneDrive/Teams/SharePoint url, for instance: https://domain-my.sharepoint.com/personal/user_domain or https://domain.sharepoint.com/sites/sitename",
      tags: ["microsoft", "support_url", "browser"],
    },
    {
      item: "/_layouts/15/people.aspx?MembershipGroupId=5",
      description:
        "Navigates to the corresponding MS Cloud collection's members page when added to the base OneDrive/Teams/SharePoint url, for instance: https://domain-my.sharepoint.com/personal/user_domain or https://domain.sharepoint.com/sites/sitename",
      tags: ["microsoft", "support_url", "browser"],
    },
    {
      item: "/_layouts/15/user.aspx",
      description:
        "Navigates to the corresponding MS Cloud collection's permissions page when added to the base OneDrive/Teams/SharePoint url, for instance: https://domain-my.sharepoint.com/personal/user_domain or https://domain.sharepoint.com/sites/sitename",
      tags: ["microsoft", "support_url", "browser"],
    },
    {
      item: "/_layouts/15/RecycleBin.aspx?view=5",
      description:
        "Navigates to corresponding MS Cloud collection recycle bin page when added to the base OneDrive/Teams/SharePoint url, for instance: https://domain-my.sharepoint.com/personal/user_domain or https://domain.sharepoint.com/sites/sitename",
      tags: ["microsoft", "support_url", "browser"],
    },
    {
      item: "/_layouts/15/RecycleBin.aspx?view=13",
      description:
        "Navigates to corresponding MS Cloud collection second stage recycle bin page when added to the base OneDrive/Teams/SharePoint url, for instance: https://domain-my.sharepoint.com/personal/user_domain or https://domain.sharepoint.com/sites/sitename",
      tags: ["microsoft", "support_url", "browser"],
    },
    {
      item: "/_layouts/15/storman.aspx",
      description:
        "Navigates to corresponding MS Cloud collection storage metrics page when added to the base OneDrive/Teams/SharePoint url, for instance: https://domain-my.sharepoint.com/personal/user_domain or https://domain.sharepoint.com/sites/sitename",
      tags: ["microsoft", "support_url", "browser"],
    },
    {
      item: "/_layouts/15/AppPrincipals.aspx",
      description:
        "Navigates to corresponding MS Cloud collection app permissions page when added to the base OneDrive/Teams/SharePoint url, for instance: https://domain-my.sharepoint.com/personal/user_domain or https://domain.sharepoint.com/sites/sitename",
      tags: ["microsoft", "support_url", "browser"],
    },
    {
      item: "/_layouts/15/appinv.aspx",
      description:
        "Navigates to corresponding MS Cloud collection storage app permission creation when added to the base OneDrive/Teams/SharePoint url, for instance: https://domain-my.sharepoint.com/personal/user_domain or https://domain.sharepoint.com/sites/sitename",
      tags: ["microsoft", "support_url", "browser"],
    },
    {
      item: "/options/general/storage",
      description:
        "Navigates to corresponding Outlook mailbox storage metrics page when added to the base mailbox url, for instance: https://outlook.office.com/mail/mailbox@domain/options/general/storage",
      tags: ["microsoft", "support_url", "browser"],
    },
    {
      item: "https://myaccount.microsoft.com/device-list",
      description:
        "Navigates to corresponding user device list page where they can retrieve their BitLocker Recovery Key(s)",
      tags: ["microsoft", "support_url", "browser"],
    },
    {
      item: "%programdata%\\Cisco\\Cisco AnyConnect Secure Mobility Client\\Profile",
      description: "Opens Cisco AnyConnect's profile path - VPN",
      tags: ["windows", "path"],
    },
    {
      item: "%localappdata%\\Cisco\\Cisco AnyConnect Secure Mobility Client",
      description: "Opens Cisco AnyConnect's local appdata path - VPN",
      tags: ["windows", "path"],
    },
    {
      item: "%programdata%\\Cisco\\Cisco Secure Client\\VPN\\Profile",
      description: "Opens Cisco Secure Client's profile path - VPN",
      tags: ["windows", "path"],
    },
    {
      item: "%localappdata%\\Cisco\\Cisco Secure Client\\VPN",
      description: "Opens Cisco Secure Client's local appdata path - VPN",
      tags: ["windows", "path"],
    },
    {
      item: "%localappdata%",
      description: "Opens C:\\Users\\{loggedInUser}\\AppData\\Local",
      tags: ["windows", "path"],
    },
    {
      item: "%appdata%",
      description: "Opens C:\\Users\\{loggedInUser}\\AppData\\Roaming",
      tags: ["windows", "path"],
    },
    {
      item: "%localappdata%\\Packages\\MSTeams_8wekyb3d8bbwe",
      description: "Opens the New Teams app's cache folder",
      tags: ["windows", "path"],
    },
    {
      item: "%localappdata%\\Packages\\MSTeams_8wekyb3d8bbwe\\LocalCache\\Microsoft\\MSTeams\\Backgrounds",
      description: "Opens the New Teams app's backgrounds folder",
      tags: ["windows", "path"],
    },
    {
      item: "%localappdata%\\Microsoft\\TeamsMeetingAdd-in",
      description:
        "Opens path to the Outlook's New Teams meeting add-in. The dll can be found for instance: '...\\TeamsMeetingAdd-in\\1.24.09301\\x64\\Microsoft.Teams.AddinLoader.dll'",
      tags: ["windows", "path"],
    },
    {
      item: "%localappdata%\\Microsoft\\Teams",
      description:
        "Opens the Teams Classic's cache folder stored in Local Appdata",
      tags: ["windows", "path"],
    },
    {
      item: "%appdata%\\Microsoft\\Teams",
      description:
        "Opens the Teams Classic's cache folder stored in Roaming Appdata",
      tags: ["windows", "path"],
    },
    {
      item: "%localappdata%\\Microsoft\\Outlook",
      description:
        "Opens the folder where Outlook client app keeps .ost, .nst and .pst files",
      tags: ["windows", "path"],
    },
    {
      item: "C:\\Windows\\System32\\drivers\\etc",
      description:
        "Opens the folder where the hosts file is kept. This file is an operating system file that maps hostnames to IP addresses and it is used to override the DNS system for testing purposes so that a Web browser or other application can be redirected to a specific IP address",
      tags: ["windows", "path"],
    },
    {
      item: "C:\\Program Files\\nodejs",
      description:
        "Path to add to Path environment variable in order to use the corresponding CLI",
      tags: ["windows", "path"],
    },
    {
      item: "%USERPROFILE%\\AppData\\Roaming\\npm",
      description:
        "Path to add to Path environment variable in order to use the corresponding CLI",
      tags: ["windows", "path"],
    },
    {
      item: "%USERPROFILE%\\go\\bin",
      description:
        "Path to add to Path environment variable in order to use the corresponding CLI",
      tags: ["windows", "path"],
    },
    {
      item: "%localappdata%\\Programs\\Python\\Launcher\\",
      description:
        "Path to add to Path environment variable in order to use the corresponding CLI",
      tags: ["windows", "path"],
    },
    {
      item: "%localappdata%\\Programs\\Python\\Python312",
      description:
        "Path to add to Path environment variable in order to use the corresponding CLI",
      tags: ["windows", "path"],
    },
    {
      item: "shell:appsfolder",
      description:
        "Command to quickly open the Applications folder. This folder contains all the installed applications on your system, including both traditional desktop programs and universal Windows apps",
      tags: ["windows", "path"],
    },
    {
      item: "/opt/cisco/anyconnect/profile",
      description: "Opens Cisco AnyConnect's profile path - VPN",
      tags: ["MacOS", "path"],
    },
    {
      item: "/opt/cisco/secureclient/vpn/profile",
      description: "Opens Cisco Secure Client's profile path - VPN",
      tags: ["MacOS", "path"],
    },
    {
      item: "sudo jamf removeMDMProfile",
      description: "Removes the MDM profile from a MacBook",
      tags: ["MacOS", "jamf", "bash"],
    },
    {
      item: "sudo jamf removeFramework",
      description: "Removes the JAMF agent from a MacBook",
      tags: ["MacOS", "jamf", "bash"],
    },
    {
      item: "sudo jamf policy",
      description: "Forces an MDM profile policy check in from the client",
      tags: ["MacOS", "jamf", "bash"],
    },
    {
      item: "sudo jamf recon",
      description: "Forces a full inventory check from the client",
      tags: ["MacOS", "jamf", "bash"],
    },
    {
      item: "jamf about",
      description: "Checks for enrollment and Jamf version on local Mac",
      tags: ["MacOS", "jamf", "bash"],
    },
    {
      item: "jamf help",
      description: "Retrieves useful Jamf related commands",
      tags: ["MacOS", "jamf", "bash"],
    },
    {
      item: "sudo purge",
      description: "Clears RAM on a MacBook",
      tags: ["MacOS", "jamf", "bash"],
    },
  ],
};

const languageHljs = [
  "bash",
  "c",
  "cpp",
  "csharp",
  "css",
  "diff",
  "go",
  "graphql",
  "ini",
  "java",
  "json",
  "kotlin",
  "less",
  "lua",
  "makefile",
  "markdown",
  "objectivec",
  "perl",
  "php",
  "php_template",
  "plaintext",
  "python",
  "python_repl",
  "r",
  "ruby",
  "rust",
  "scss",
  "shell",
  "sql",
  "swift",
  "typescript",
  "vbnet",
  "wasm",
  "xml",
  "yaml",
];
