function toggleNextElement(togglerElement) {
  //$(".aws-section-toggle").next().toggle()
  $(document).on("click", togglerElement, function () {
    $(this).next().toggle();
  });
}

function copyAllCommands(parentElement, elementToCopy) {
  let arrayToCopyClipboard = [];
  $("#copyAllBtn").on("click", function () {
    $(parentElement).each(function () {
      if ($(this).is(":visible")) {
        let elementText = $(this).children(elementToCopy).text();
        arrayToCopyClipboard.push(elementText);
      }
    });

    // Remove empty values from the array
    arrayToCopyClipboard = arrayToCopyClipboard.filter(function (text) {
      return text.trim() !== "";
    });

    navigator.clipboard
      .writeText(arrayToCopyClipboard.join("\n"))
      .then(() => {
        console.log("Copied to clipboard:", arrayToCopyClipboard);
        // Optionally, display a notification or provide visual feedback to the user
      })
      .then(() => {
        arrayToCopyClipboard = [];
      })
      .catch((error) => {
        console.error("Error copying to clipboard:", error);
      });

    //Displays temporarily the alert div when copying a card-body to the clipboard
    $(".alert").addClass("show"); // Add class to show the alert
    // Set timeout to remove the class after 2 seconds
    setTimeout(function () {
      $(".alert").removeClass("show"); // Remove class to hide the alert
    }, 2000);
  });
}

function updateCounts(elementsToCount) {
  $("#filteredItemsCount").text($(`${elementsToCount}:visible`).length);
}

function filterItems(elementsToFilter) {
  // Filter function
  $("#filter").on("keyup", function () {
    let searchInput = $(this).val().toLowerCase();
    $(elementsToFilter).filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(searchInput) > -1);
    });
    updateCounts(elementsToFilter);
  });
}

//Function to parse google bookmarks into JSON
function parseGoogleBookmarks() {
  // Select all dt elements
  const dtElements = document.querySelectorAll("dt");

  // Initialize an array to store the extracted data
  const extractedData = [];

  // Loop through each dt element
  dtElements.forEach((dt) => {
    // Select the anchor element inside the dt
    const anchor = dt.querySelector("a");

    // Extract the href and title attributes
    const href = anchor.getAttribute("href");
    const title = anchor.textContent;

    // Create an object with the extracted data
    const data = {
      title: title,
      href: href,
      category: "",
    };

    // Add the object to the array
    extractedData.push(data);
  });

  // Convert the array to a JSON string
  const jsonString = JSON.stringify(extractedData, null, 2);

  // Output the JSON string
  console.log(jsonString);
}

// Function to copy element to clipboard
function copySingleItemToClipBoard(elementToCopy) {
  $(elementToCopy).on("click", function () {
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
    ? $("#root h1").css("font-size", "1.5rem")
    : $("#root h1").css("font-size", "2.5rem");

  $("#root h1,#root h2").each(function () {
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

//Children function that appends const type 'sections' to 'root' element
function appendSectionsToRoot(objArray, index) {
  const snippetTitleRegex = /^\s*(?:\/\/## |### |::## |REM## )(.+?) ##/gm;
  const endCodeSnippetRegex = /^\s*(?:\/\/|#|::|REM)={3,}/gm;
  let pageBody = [];

  pageSnippets = objArray[index].snippets.map((snippet) => {
    let processedSnippet = escapeHTML(snippet.code)
      .replace(
        snippetTitleRegex,
        `<div class="snippet"><h2 class="snippet-title">🟡 $1</h2><pre><div class="abbreviation">${objArray[index].abbreviation}</div><code class="language-${objArray[index].language}">` //
      )
      .replace(endCodeSnippetRegex, "</code></pre></div>");
    return `${spaceDiv}<div><h1>🔴 ${snippet.title} 🔴</h1>${processedSnippet}`;
  });

  pageBody.push(pageSnippets.join(""));
  $("#root").append(pageBody);
}

//Children function that appends const type 'list' to 'root' element
function appendListToRoot(objArray, index) {
  objArray[index].snippets.sort((a, b) =>
    a.item.localeCompare(b.item, undefined, { sensitivity: "base" })
  );

  let table = [`<table class="table">`];
  let headers = ["<thead><tr>"];
  let objectKeys = Object.keys(objArray[index].snippets[0]);
  objectKeys.map((header) => {
    headers.push(`<th>${header}</th>`);
  });
  headers.push("</tr></thead>");
  let tbody = ["<tbody>"];

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
  } 🔴</h1>${copiedToClipboardAlert}${searchCard(
    objArray[index].snippets.length,
    true
  )}${table.join("")}`;
  $("#root").append(finalTable);

  updateCounts("tbody tr");
  filterItems("tbody tr");
  copyAllCommands("tr", "td:nth-child(1)");
  copySingleItemToClipBoard("td");
  highlightElement();
}

//Children function that appends const type 'list-items' to 'root' element
function appendListItemsToRoot(objArray, index) {
  let table = [`<table class="table">`];
  let headers = ["<thead><tr>"];
  let objectKeys = Object.keys(objArray[index].items[0]);
  objectKeys.map((header) => {
    if (header !== "logo") {
      headers.push(`<th>${header}</th>`);
    }
  });
  headers.push("</tr></thead>");
  let tbody = ["<tbody>"];

  pageItems = objArray[index].items.map((item) => {
    return `<tr>
              <td>
                <div style="display:flex;gap:1rem;">
                  <span>
                    <img class="logo" 
                         src="./images/${item.logo}.png" 
                         alt="${item.logo}-logo" 
                         height="25px" 
                         width="25px"/>
                  </span>
                  <span>${item[objectKeys[0]]}</span>
                </div>
              </td>
              <td style="white-space:normal">${
                item[objectKeys[1]]
              }</td><td style="white-space:normal;"><a target='_blank' href='${
      item[objectKeys[2]]
    }' target="_blank">${item[objectKeys[2]]}</a></td></tr>`;
  });
  tbody.push(pageItems.join(""));
  tbody.push("</tbody>");

  table.push(headers.join(""));
  table.push(tbody.join(""));
  table.push("</table>");
  let finalTable = `${spaceDiv}<h1>🔴 ${
    objArray[index].title
  } 🔴</h1>${copiedToClipboardAlert}${searchCard(
    objArray[index].items.length,
    false
  )}${table.join("")}`;

  console.log(finalTable);
  $("#root").append(finalTable);

  updateCounts("tbody tr");
  filterItems("tbody tr");
  copyAllCommands("tr", "td:nth-child(1)");
  copySingleItemToClipBoard("td");
  highlightElement();
}

//Children function that appends const type 'cards' to 'root' element
function appendCardsToRoot(objArray, index) {
  let cards = [];

  const linksGroupedByCat = objArray[index].links.reduce((acc, link) => {
    const category =
      link.category.trim() === "" ? "no_defined_category" : link.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(link);
    return acc;
  }, {});

  // Sort items in each category by title
  Object.keys(linksGroupedByCat).forEach((category) => {
    linksGroupedByCat[category].sort((a, b) =>
      a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
    );
  });

  // Sort categories alphabetically
  Object.keys(linksGroupedByCat)
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
    .forEach((category) => {
      cards.push(
        `<h2 class="link-cat-title" style="margin-top:2rem;">🟡 ${category} 🟡</h2><div class="linksGrid" id="links${category}">`
      );
      linksGroupedByCat[category].forEach((item) => {
        //console.log(item);
        cards.push(
          card
            .replace("{{title}}", `${item.title}`)
            .replace("{{link}}", `${item.href}`)
        );
      });
      cards.push(`</div>`);
    });

  let finalCards = `${spaceDiv}<h1>🔴 ${
    objArray[index].title
  } 🔴</h1>${searchCard(objArray[index].links.length)}<div>${cards.join(
    ""
  )}</div>`;

  $("#root").append(finalCards);
  updateCounts(".col");
  filterItems(".col");
}

//Children function that appends const type 'cards' to 'root' element
function appendToolsToRoot(objArray, index) {
  const finalTools = objArray[index].tools.map((item) => {
    return `<div class="tools" id="${item.title}-tool"><h2>🟡 ${item.title}</h2>${item.component}</div>`;
  });

  $("#root").append(`${spaceDiv}<h1>🔴 tools 🔴</h1>${finalTools}`);
}

function appendSectionListToRoot(object) {
  let awssections = [];
  Object.keys(object).map((awscert) => {
    if (["title", "type", "navcategory"].includes(awscert)) return;

    let finalSection = [`<div class="aws-section">`];
    if (object[awscert].title) {
      const awscerttitle = `<h2>🟡 ${object[awscert].title} 🟡</h2>`;
      finalSection.push(awscerttitle);
    }

    const awssection = object[awscert];

    Object.keys(awssection).map((awssectionkey) => {
      const awssectiontitle =
        awssectionkey !== "title"
          ? `<div style="margin-left: 1.5rem;"><h5 class="aws-section-toggle">${awssection[awssectionkey].title}</h5><ul>`
          : null;
      if (awssectiontitle) {
        finalSection.push(awssectiontitle);
      }
      const awssectioncontent = awssection[awssectionkey];

      if (typeof awssectioncontent !== "object") return;

      Object.keys(awssectioncontent).map((key) => {
        key !== "title" &&
          finalSection.push(`<li>${awssectioncontent[key]}</li>`);
      });

      finalSection.push(`</ul></div>`);
    });

    finalSection.push(`</div>`);

    awssections.push(finalSection.join(""));
  });

  $("#root").append(`${spaceDiv}<h1>🔴 aws 🔴</h1>${awssections.join("")}`);
}

//Parent function to append item to 'root' element depending on the type
function appendToRoot(objArray, index) {
  objArray[index].type === "sections" && appendSectionsToRoot(objArray, index);

  objArray[index].type === "list" && appendListToRoot(objArray, index);

  objArray[index].type === "cards" && appendCardsToRoot(objArray, index);

  objArray[index].type === "list-items" &&
    appendListItemsToRoot(objArray, index);

  objArray[index].type === "tools" && appendToolsToRoot(objArray, index);

  objArray[index].type === "section-list" &&
    appendSectionListToRoot(objArray[index]);
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

function htmlEncode(input) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/'/g, "&#39;")
    .replace(/"/g, "&quot;");
}

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

function decodeJWT(token) {
  try {
    if (
      !token ||
      typeof token !== "string" ||
      !token.startsWith("eyJ") ||
      !token.includes(".")
    ) {
      return "The token you provided is not a valid JWT token.";
    }

    if (token.split(".").length !== 3) {
      return "The token you provided is not a valid JWT token.";
    }

    let parsedBase64Url = [];
    for (let i = 0; i < token.split(".").length; i++) {
      let element = token.split(".")[i].replace("-", "+").replace("_", "/");
      switch (element.length % 4) {
        case 0:
          break;
        case 2:
          element += "==";
          break;
        case 3:
          element += "=";
          break;
      }

      parsedBase64Url.push(element);
    }

    let decodedJWT = parsedBase64Url.map((part, index) => {
      if (index !== 2) {
        return JSON.parse(atob(part));
      } //only decode header and payload
      if (index === 2) {
        return { sig: part };
      } //do not decode signature
    });

    const fullDecodedJWT = Object.assign({}, ...decodedJWT);
    console.log(fullDecodedJWT);

    return JSON.stringify(fullDecodedJWT, null, 2);
  } catch (error) {
    return "Error encountered while decoding the JWT token: " + error.message;
  }
}

const spaceDiv = `<div class="mt-6"></div>`;

const searchCard = (totalItemsCount, copyAllCommands = false) => {
  let borderRoundSolidWhite = `border:1px solid white;border-radius: 1rem;`;
  let searchCard = `<div class="card text-white bg-dark mb-3" id="filterCard" style="${borderRoundSolidWhite}">
      <div class="card-body">
        <p style="justify-content:space-between;display:flex"><span>Search:</span><span style="font-weight:bold;">results: <span id="filteredItemsCount">{{filteredItemsCount}}</span>/<span id="totalItemsCount">${totalItemsCount}</span></span></p>
        <input type="text" id="filter" class="form-control" placeholder="Type a keyword..."/>
      </div>
    </div>

    ${
      copyAllCommands
        ? `<div class="buttonDiv">
        <button class="btn btn-dark btn-lg" id="copyAllBtn" style="${borderRoundSolidWhite}">
          Copy all commands!
        </button>
    </div>`
        : ``
    }`;

  //console.log(searchCard);
  return searchCard;
};

const copiedToClipboardAlert = `<div class="alert">
      <span
        ><i class="bi bi-info-circle"></i
        ><span> Copied to clipboard!</span></span
      >
    </div>`;

const card = `<div class="col" style="display:flex;justify-content:center;">
    <div class="card text-white bg-dark mb-3" style="width: 18rem; min-height:12rem; border: solid 1px white;border-radius:1rem;">
      <div class="card-body">
        <h5 class="card-title" style="min-height:6rem;">{{title}}</h5>
        <a target='_blank' href="{{link}}" class="btn btn-info">Take me there</a>
      </div>
    </div>
</div>`;

const navBarWithDropDowns = `<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
  <div id="navbarBrand">
    <a class="navbar-brand" href="#"><img src="favicon.png" alt="brand-image" style="height:50px"></a>
    <div id="navbarAppName">myNotes</div>
  </div>
  <div id="navbarNav">
    <div class="dropdown">
	  <div class="dropdown-toggle" type="button" id="dropdownMenuButtonDev" data-bs-toggle="dropdown" aria-expanded="false">
		dev
	  </div>
	  <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButtonDev">
		{{navDevItems}}
	  </ul>
	</div>
	<div class="dropdown dropstart">
	  <div class="dropdown-toggle" type="button" id="dropdownMenuButtonOther" data-bs-toggle="dropdown" aria-expanded="false">
		other
	  </div>
	  <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButtonOther" id="dropdownmenuOther">
		{{navOtherItems}}
	  </ul>
	</div>
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
  abbreviation: "cmd",
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
  abbreviation: "ts",
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



//## Type literals ##

    //A type literal is when you tell TypeScript that a value must be exactly equal to a specific value, not just any value of that type.
        //Normally, string means any string ("hello", "world", "123", etc.).
        //A string literal type like "hello" means the value must be exactly "hello".
        //The same applies to numbers (42), booleans (true), or even combinations.
    //When you combine multiple type literals with a union (|), you restrict a value to a small set of allowed options.
    type Direction = "up" | "down" | "left" | "right"; // String literal union
    type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6; // Numeric literal union
    type TrafficLight = "red" | "yellow" | "green" | 0 | 1 | 2; // Mixed string + number union
    type SwitchState = "on" | "off"; // Boolean-like union
    type Button = {label: string; color: "primary" | "secondary" | "danger";}; // Union inside object property

    // Real-world examples  
    type HttpMethod = "GET" | "POST" | "PUT" | "DELETE"; // HTTP methods
    type UserRole = "admin" | "editor" | "viewer"; // User roles
    type StatusCode = 200 | 400 | 401 | 404 | 500; // HTTP status codes
    type Currency = "USD" | "EUR" | "GBP" | "JPY"; // Currency codes
    type ShippingMethod = "standard" | "express" | "overnight"; // Shipping methods

//==========================================


//## Type Guards ##

    //In TypeScript, a type guard is a way to check the type of a value at runtime so that TypeScript can narrow the type inside a code block.
    //One way to do that is to use the built-in typeof JS operator that retrieves the type of a variable/value

    function combine(value1: string | number, value2: string | number):void {
    if (typeof value1 === "string" && typeof value2 === "string") {console.log(\`\${value1} \${value2}\`);} 
    if (typeof value1 === "number" && typeof value2 === "number"){console.log(value1 + value2);}
    }

    combine("hello","world"); // hello world
    combine(4,6);       // 10

    //Important: You can NOT check if a value meets the definition of a custom type (type alias) or interface type. These are TypeScript-specific features for which no JavaScript equivalent exists. Therefore, since those if checks need to run at runtime, you can't write any code that would be able to check for those types at runtime.
    //For example, the below code won't work because the NormalUser type does not exist once the code is compiled to JavaScript:
    type NormalUser = {
        name: string;
        age: number;
    };
    
    type AdminUser = {
        name: string;
        age: number;
        permissions: string[];
    };
    
    let newUser: NormalUser = {name: "Jonny",age: 43}
    console.log(typeof newUser) //'object' instead of 'NormalUser'. As mentioned above typeof does not understand/know custom types but only built-in ones

    function loginApp(u: NormalUser | AdminUser) {
        if (typeof u === NormalUser) { //❌ Error: typeof does not work with custom type aliases/interfaces
            // do something
        }
    }

    //But you could check for the existence of the permissions property since only the AdminUser object will have one:
    function loginApp2(u: NormalUser | AdminUser) {
        if ('permissions' in u) {
            // do something
        }
    }   
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
      item: "https://{sp_instance}.sharepoint.com/sites/{sp_site_name}/_api/web/lists/getbytitle('{sp_list_name}')/items?$filter=substringof('valuecontained', Column1Name) and Column2Name eq 'NO' and substringof('2025-08', Column3Name)",
      description:
        "Provided that the user is logged in their Micrsoft tenant, they will get an XML response with the items of the corresponding list that match the filter criteria. Substringof refers to a value that is contained in Column1, Colum2 has to equal to 'NO' and Colum3 has to contain the string '2025-08'",
      tags: ["microsoft", "support_url", "browser", "api", "sharepoint"],
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

const usefulLinks = {
  title: "useful_links",
  type: "cards",
  navcategory: "other",
  links: [
    {
      title: "@react-oauth/google",
      href: "https://react-oauth.vercel.app/",
      category: "",
    },
    {
      title:
        "About Power Apps per app plans - Power Platform | Microsoft Learn",
      href: "https://learn.microsoft.com/en-us/power-platform/admin/about-powerapps-perapp",
      category: "",
    },
    {
      title: "andreadg-dev · GitHub",
      href: "https://github.com/andreadg-dev",
      category: "",
    },
    {
      title: "API - ResponsiveVoice.JS AI Text to Speech",
      href: "https://responsivevoice.org/api/",
      category: "API Services",
    },
    {
      title: "API-JokeAPIDocumentation",
      href: "https://sv443.net/jokeapi/v2/",
      category: "API Services",
    },
    {
      title: "API-KanyeRest",
      href: "https://kanye.rest/",
      category: "API Services",
    },
    {
      title: "API-OpenWeatherMap",
      href: "https://home.openweathermap.org/",
      category: "API Services",
    },
    {
      title: "Azure - adgdev-DevOps",
      href: "https://dev.azure.com/adgdev-DevOps",
      category: "",
    },
    {
      title: "Bash scripting cheatsheet",
      href: "https://devhints.io/bash",
      category: "",
    },
    {
      title: "boot.dev",
      href: "https://www.boot.dev/tracks/backend",
      category: "",
    },
    {
      title: "Bootstrap Docs Local",
      href: "file:///C:/Users/adelgiud/OneDrive%20-%20NTT%20DATA%20EMEAL/CONFIDENTIAL/MyProfile/_Docs_Local/bootstrap/bootstrap-getting-started-introduction.html",
      category: "",
    },
    {
      title: "Bootstrap Docs Online",
      href: "https://getbootstrap.com/docs/5.2/getting-started/introduction/",
      category: "",
    },
    {
      title: "Bootstrap Icons Local",
      href: "file:///C:/Users/adelgiud/OneDrive%20-%20NTT%20DATA%20EMEAL/CONFIDENTIAL/MyProfile/_Docs_Local/bootstrap/bootstrap-icons/0aaa-bootstrap-icons.html",
      category: "",
    },
    {
      title: "Bootstrap Icons Online",
      href: "https://icons.getbootstrap.com/",
      category: "",
    },
    {
      title: "Canva - Free design tool",
      href: "https://www.canva.com/en_gb/",
      category: "",
    },
    {
      title: "ChromeDriver - WebDriver for Chrome - Python/Selenium",
      href: "https://chromedriver.chromium.org/downloads",
      category: "",
    },
    {
      title: "CodePen: Online Code Editor",
      href: "https://codepen.io/",
      category: "",
    },
    {
      title: "Codeply: Online Code Editor",
      href: "https://www.codeply.com/p",
      category: "",
    },
    {
      title: "CodeSandbox: Instant Cloud Development Environments",
      href: "https://codesandbox.io/",
      category: "",
    },
    {
      title: "Colorhunt - Color Palettes",
      href: "https://colorhunt.co/",
      category: "",
    },
    {
      title: "Coolors Palettes",
      href: "https://coolors.co/palettes/trending",
      category: "",
    },
    {
      title: "Crowdstrike API",
      href: "https://api.eu-1.crowdstrike.com/",
      category: "",
    },
    {
      title: "Crowdstrike API Doc",
      href: "https://developer.crowdstrike.com/docs/openapi/",
      category: "",
    },
    {
      title: "Crowdstrike API for Python",
      href: "https://falconpy.io/",
      category: "",
    },
    {
      title: "CrowdStrike API Hosts Endpoints",
      href: "https://falconpy.io/Service-Collections/Hosts.html?highlight=devices-scroll#querydevicesbyfilterscroll",
      category: "",
    },
    {
      title: "CrowdStrike/psfalcon Wiki · GitHub",
      href: "https://github.com/CrowdStrike/psfalcon/wiki/",
      category: "",
    },
    {
      title: "CSS Font Stack",
      href: "https://www.cssfontstack.com/",
      category: "",
    },
    {
      title: "CSS Web Safe Fonts",
      href: "https://www.w3schools.com/cssref/css_websafe_fonts.php",
      category: "",
    },
    {
      title:
        "Cyclic.sh - Fullstack Javascript Apps - Deploy and Host in Seconds",
      href: "https://app.cyclic.sh/#/deploy?intro=true",
      category: "",
    },
    {
      title: "DevDocs",
      href: "https://devdocs.io/offline",
      category: "",
    },
    {
      title: "DevDocs - desktop app",
      href: "https://github.com/egoist/devdocs-desktop",
      category: "",
    },
    {
      title: "Discord - Web Developing",
      href: "https://discord.com/channels/445233163044782091/650379557588697088",
      category: "",
    },
    {
      title: "Download Custom Kali - zSecurity",
      href: "https://zsecurity.org/download-custom-kali/",
      category: "",
    },
    {
      title: "Emmet Cheat Sheet",
      href: "https://docs.emmet.io/cheat-sheet/",
      category: "",
    },
    {
      title: "Enterprise Skills Initiative: GetCertification",
      href: "https://esi.microsoft.com/getcertification",
      category: "",
    },
    {
      title: "Exercism",
      href: "https://exercism.org/",
      category: "",
    },
    {
      title:
        "explainshell.com - match command-line arguments to their help text",
      href: "https://explainshell.com/",
      category: "",
    },
    {
      title: "favicon.ico Generator",
      href: "https://www.favicon.cc/",
      category: "",
    },
    {
      title: "favicon.io: favicon generator",
      href: "https://favicon.io/",
      category: "",
    },
    {
      title: "Frontend Mentor: WebDev Challenges",
      href: "https://www.frontendmentor.io/challenges",
      category: "",
    },
    {
      title:
        "GDevelop: Free, Fast, Easy Game Engine - No-code, Lightweight, Super Powerful | GDevelop",
      href: "https://gdevelop.io/",
      category: "",
    },
    {
      title: "Gemini AI",
      href: "https://gemini.google.com/app",
      category: "",
    },
    {
      title: "Getting Started with Microsoft PowerShell",
      href: "https://learn.microsoft.com/en-gb/shows/getting-started-with-microsoft-powershell/",
      category: "",
    },
    {
      title: "Git - Learn Git Branching",
      href: "https://learngitbranching.js.org/",
      category: "",
    },
    {
      title: "GitHub - Authorized OAuth apps",
      href: "https://github.com/settings/applications",
      category: "",
    },
    {
      title: "Go Packages - Standard library",
      href: "https://pkg.go.dev/std",
      category: "",
    },
    {
      title: "Go Playground - The Go Programming Language",
      href: "https://go.dev/play/",
      category: "",
    },
    {
      title: "GoDaddy UK",
      href: "https://uk.godaddy.com/offers/domains/cctld/com-or-be/cheap-domain?currencyType=eur&isc=bedomEUR1&countryview=1&gclid=EAIaIQobChMIpYzS-d238wIVuG1vBB0WLgmJEAAYASAAEgKMBfD_BwE",
      category: "",
    },
    {
      title: "Google Fonts",
      href: "https://fonts.google.com/",
      category: "",
    },
    {
      title: "GPT - OpenAI API",
      href: "https://platform.openai.com/docs/guides/gpt",
      category: "",
    },
    {
      title: "Gradient Backgrounds",
      href: "https://cssgradient.io/gradient-backgrounds/",
      category: "",
    },
    {
      title: "Graph Explorer | Try Microsoft Graph APIs - Microsoft Graph",
      href: "https://developer.microsoft.com/en-us/graph/graph-explorer",
      category: "",
    },
    {
      title: "HackerRank - Online Coding Tests and Technical Interviews",
      href: "https://www.hackerrank.com/",
      category: "",
    },
    {
      title:
        "How to create an open file/folder dialog box with PowerShell – 4sysops",
      href: "https://4sysops.com/archives/how-to-create-an-open-file-folder-dialog-box-with-powershell/",
      category: "",
    },
    {
      title:
        "How to Embed an Image to Get a Self-Contained Web Page (thesitewizard.com)",
      href: "https://www.thesitewizard.com/html-tutorial/embed-images-with-data-urls.shtml",
      category: "",
    },
    {
      title:
        "How To Organize Constants in a Dedicated Layer in JavaScript - Semaphore",
      href: "https://semaphoreci.com/blog/constants-layer-javascript",
      category: "",
    },
    {
      title: "How to Upload Your Website To The Internet - YouTube",
      href: "https://www.youtube.com/watch?v=kvyWeTXCSKk&ab_channel=WebsiteLearners",
      category: "",
    },
    {
      title: "HTML Entities",
      href: "https://www.w3schools.com/html/html_entities.asp",
      category: "",
    },
    {
      title: "HTML Standard",
      href: "https://html.spec.whatwg.org/",
      category: "",
    },
    {
      title: "httpstat.us",
      href: "https://httpstat.us/",
      category: "",
    },
    {
      title: "Intune Graph API - Reports and properties",
      href: "https://learn.microsoft.com/en-us/mem/intune/fundamentals/reports-export-graph-available-reports",
      category: "",
    },
    {
      title: "Invoke-WebRequest",
      href: "https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/invoke-webrequest?view=powershell-7.2",
      category: "",
    },
    {
      title: "Jamf Pro API Overview",
      href: "https://developer.jamf.com/jamf-pro/docs/jamf-pro-api-overview",
      category: "",
    },
    {
      title: "JAMF Pro API Swagger UI",
      href: "https://nttdataemeal.jamfcloud.com/api/doc/#/",
      category: "",
    },
    {
      title: "Javascript - Ternary Operator",
      href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator",
      category: "",
    },
    {
      title: "JavaScript Playground",
      href: "https://playcode.io/javascript",
      category: "",
    },
    {
      title: "JS Puppeteer",
      href: "https://pptr.dev/guides/what-is-puppeteer",
      category: "",
    },
    {
      title: "JSON Beautifier",
      href: "https://codebeautify.org/jsonviewer",
      category: "",
    },
    {
      title: "JSON Online Validator and Formatter",
      href: "https://jsonlint.com/",
      category: "",
    },
    {
      title: "JSON Web Tokens",
      href: "https://jwt.io/",
      category: "",
    },
    {
      title: "JSONPlaceholder - Free Fake REST API",
      href: "https://jsonplaceholder.typicode.com/",
      category: "",
    },
    {
      title: "Le Chat - Mistral AI",
      href: "https://chat.mistral.ai/chat",
      category: "",
    },
    {
      title: "Learn ASP.NET",
      href: "https://dotnet.microsoft.com/en-us/learn/aspnet",
      category: "",
    },
    {
      title: "localhost",
      href: "http://localhost:3000/",
      category: "",
    },
    {
      title: "Lorem Picsum",
      href: "https://picsum.photos/",
      category: "",
    },
    {
      title: "Markdown Cheat Sheet | Markdown Guide",
      href: "https://www.markdownguide.org/cheat-sheet/",
      category: "",
    },
    {
      title: "Markdown Guide",
      href: "https://www.markdownguide.org/",
      category: "",
    },
    {
      title: "Material UI - Docs",
      href: "https://mui.com/material-ui/getting-started/",
      category: "",
    },
    {
      title: "Material UI: React components that implement Material Design",
      href: "https://mui.com/material-ui/",
      category: "",
    },
    {
      title: "MDN Web Docs",
      href: "https://developer.mozilla.org/en-US/",
      category: "",
    },
    {
      title:
        "Microsoft Graph REST API v1.0 endpoint reference - Microsoft Graph v1.0 | Microsoft Learn",
      href: "https://learn.microsoft.com/en-us/graph/api/overview?view=graph-rest-1.0&preserve-view=true",
      category: "",
    },
    {
      title:
        "Microsoft Graph REST API v1.0 endpoint reference - Microsoft Graph v1.0 | Microsoft Learn",
      href: "https://learn.microsoft.com/en-us/graph/api/overview?view=graph-rest-1.0",
      category: "",
    },
    {
      title: "Minify - JavaScript and CSS minifier",
      href: "https://www.minifier.org/",
      category: "",
    },
    {
      title: "My Personal Power Apps Env",
      href: "https://make.powerapps.com/environments/d59a2aba-bd70-ed78-a60c-ba3850fe0251/home",
      category: "",
    },
    {
      title: "MyServiceNow - REST API Explorer",
      href: "https://dev319408.service-now.com/now/nav/ui/classic/params/target/%24restapi.do",
      category: "",
    },
    {
      title: "OKTA API Documentation",
      href: "https://developer.okta.com/docs/api/openapi/okta-management/management/tag/User/",
      category: "",
    },
    {
      title: "PCF Gallery",
      href: "https://pcf.gallery/",
      category: "",
    },
    {
      title: "Playwright",
      href: "https://playwright.dev/docs/intro",
      category: "",
    },
    {
      title: "Poly Lens API Help",
      href: "https://api.lens.poly.com/",
      category: "",
    },
    {
      title: "Power Apps Developer Plan | Microsoft Power Platform",
      href: "https://www.microsoft.com/en-us/power-platform/products/power-apps/free",
      category: "",
    },
    {
      title: "Power Platform - Custom Connectors",
      href: "https://learn.microsoft.com/en-us/connectors/custom-connectors/connection-parameters",
      category: "",
    },
    {
      title: "PowerShell - Approved Verbs",
      href: "https://docs.microsoft.com/powershell/utility-modules/psscriptanalyzer/rules/UseApprovedVerbs",
      category: "",
    },
    {
      title: "PowerShell_ISE_Themes",
      href: "https://github.com/marzme/PowerShell_ISE_Themes",
      category: "",
    },
    {
      title: "Qualys API Documentation",
      href: "https://docs.qualys.com/en/vm/api/index.htm",
      category: "",
    },
    {
      title: "React Developer Tools – React",
      href: "https://react.dev/learn/react-developer-tools",
      category: "",
    },
    {
      title: "React style guide",
      href: "https://github.com/airbnb/javascript/tree/master/react",
      category: "",
    },
    {
      title: "ServiceNow - Catalog Items",
      href: "https://nttdemealonedesk.service-now.com/sc_cat_item_list.do",
      category: "",
    },
    {
      title: "ServiceNow - Learning paths",
      href: "https://www.servicenow.com/standard/infographic/learning-paths.html?state=seamless",
      category: "",
    },
    {
      title: "ServiceNow - REST API Explorer",
      href: "https://www.servicenow.com/docs/bundle/yokohama-api-reference/page/integrate/inbound-rest/concept/use-REST-API-Explorer.html",
      category: "",
    },
    {
      title: "ServiceNow Developers",
      href: "https://developer.servicenow.com/dev.do",
      category: "",
    },
    {
      title: "ServiceNow University | ServiceNow",
      href: "https://learning.servicenow.com/now/lxp/home",
      category: "",
    },
    {
      title: "SharePoint - Examples of common formulas in lists",
      href: "https://support.office.com/client/results?authdataboundary=US&authtype=unknown&lcid=1033&locale=en-us&microsoftapplicationstelemetrydeviceid=ba910abd-18a0-4f99-b103-cebce256f560&ns=SPOSTANDARD&omkt=en-us&version=16&helpid=WSSEndUser_FormulaSyntaxError",
      category: "",
    },
    {
      title: "Specificity Calculator",
      href: "https://specificity.keegan.st/",
      category: "",
    },
    {
      title: "SQL OnLine IDE",
      href: "https://sqliteonline.com/",
      category: "",
    },
    {
      title: "Superset - data visualization",
      href: "https://superset.apache.org/",
      category: "",
    },
    {
      title: "TeamViewer API Documentation",
      href: "https://webapi.teamviewer.com/api/v1/docs/index",
      category: "",
    },
    {
      title: "Timestamp Converter",
      href: "https://www.epochconverter.com/ldap",
      category: "",
    },
    {
      title: "toHtml",
      href: "https://tohtml.com/",
      category: "",
    },
    {
      title: "Transparent Textures",
      href: "https://www.transparenttextures.com/",
      category: "",
    },
    {
      title: "Vercel",
      href: "https://vercel.com/drekedg-devs-projects",
      category: "",
    },
    {
      title: "W3C Markup Validation Service",
      href: "https://validator.w3.org/",
      category: "",
    },
  ],
};

const nextjs = {
  title: "nextjs",
  type: "list-items",
  navcategory: "dev",
  items: [
    {
      title: `npm install -g pnpm`,
      description: `pnpm as your package manager, as it's faster and more efficient than npm or yarn`,
      link: "https://nextjs.org/learn/dashboard-app/getting-started",
      logo: "nextjs",
    },
    {
      title: `npx create-next-app@latest --ts`,
      description: `It is used to automatically initialize a new NextJS project with the default configuration and in this case
      with typescript. You can choose the following options during the set up: <img width="600px" src=".\\images\\newnextapp-settings.jpg">`,
      link: "https://nextjs.org/learn/dashboard-app/getting-started",
      logo: "nextjs",
    },
    {
      title: `npm run dev<br/>pnpm dev`,
      description: `These are two ways to start your Next.js development server on port 3000`,
      link: "https://nextjs.org/learn/dashboard-app/getting-started",
      logo: "nextjs",
    },
    {
      title: `npm run build<br/>npm run start`,
      description: `<code>npm run build</code> prepares your Next.js application for deployment to a production environment 
      compiling, minifying, and bundling your HTML, CSS, and JavaScript files to achieve the best possible performance.
      The command generates a <code>.next</code> folder in your project's root directory, and you run this command when you are ready to 
      deploy your application to a live server.<br/><br/>
      <code>npm run start</code> runs your pre-compiled, production-ready Next.js application by serving the optimized code from the 
      <code>.next</code> folder.`,
      link: "",
      logo: "nextjs",
    },
    {
      title: `@tailwind base;<br/>
              @tailwind components;<br/>
              @tailwind utilities;`,
      description: `@tailwind directives, Tailwind is a CSS framework that speeds up the development process by allowing 
      you to quickly write utility classes directly in your React code.`,
      link: "https://tailwindcss.com/docs/styling-with-utility-classes",
      logo: "nextjs",
    },
    {
      title: `CSS Modules`,
      description: `You can create a file with with all css classes, then import it in the target file for instance 
      <code>import styles from '@/app/ui/home.module.css';</code> and then add it to classes using the className attribute 
      <code>&lt;div className={styles.shape} /&gt;</code>. The class shape is for instance <code>.shape {
      border-bottom: 30px solid black;border-left: 20px solid transparent;}</code>`,
      link: "https://nextjs.org/learn/dashboard-app/css-styling",
      logo: "nextjs",
    },
    {
      title: `clsx`,
      description: `clsx is a library that lets you toggle class names easily. You can import it like this
      <code>import clsx from 'clsx';</code>. For example 
      <pre><code class="language-html">
      &lt;span
        className={clsx(
          &apos;inline-flex items-center rounded-full px-2 py-1 text-sm&apos;,
          {
            &apos;bg-gray-100 text-gray-500&apos;: status === &apos;pending&apos;,
            &apos;bg-green-500 text-white&apos;: status === &apos;paid&apos;,
          },
        )}
      &gt;</code></pre>`,
      link: "https://www.npmjs.com/package/clsx",
      logo: "nextjs",
    },
    {
      title: `next/font/google`,
      description: `You can import a google font from the google module. For instance, <code>import { Inter } from 
      'next/font/google'; export const inter = Inter({ subsets: ['latin'] });</code> and add it as a class in the className property,
      for instance <code>&lt;body className={&grave;\${inter.className} antialiased&grave;}&gt;{children}&lt;/body&gt;</code>`,
      link: "https://nextjs.org/learn/dashboard-app/optimizing-fonts-images",
      logo: "nextjs",
    },
    {
      title: `&lt;Image&gt;`,
      description: `You can import this component with <code>import Image from 'next/image';</code>.
      Next.js can serve static assets, like images, under the top-level <code>/public</code> folder. This component
      comes with automatic image optimization: preventing layout shift automatically when images are loading, resizing images to avoid 
      shipping large images to devices with a smaller viewport and lazy loading images by default (images load as they enter 
      the viewport). It's good practice to set the width and height of your images to avoid layout shift, these should be an 
      aspect ratio identical to the source image. These values are not the size the image is rendered, but instead the size 
      of the actual image file used to understand the aspect ratio, for instance:
      <pre><code>
        &lt;Image
          src="/hero-desktop.png"
          width={1000}
          height={760}
          className="hidden md:block"
          alt="Screenshots of the dashboard project showing desktop version"
        /&gt;
      </code></pre>
      `,
      link: "https://nextjs.org/learn/dashboard-app/optimizing-fonts-images",
      logo: "nextjs",
    },
    {
      title: `&lt;Link /&gt;<br/>usePathname()`,
      description: `You can import this component with <code>import Link from 'next/link';</code>. Next.js improves navigation 
      by automatically splitting your app's code by route segments instead of loading everything at once like a traditional 
      React SPA. This makes pages faster, isolates errors to individual pages, and reduces the amount of code the browser needs 
      to process. Additionally, Next.js prefetches linked pages in the background when their <Link> components appear on screen,
      enabling near-instant page transitions. This component can be used together with <code>usePathname()</code> to signal the user the 
      page their currently in, for instance:
      <pre><code>
      import Link from &#39;next/link&#39;;
      import { usePathname } from &#39;next/navigation&#39;;
      import clsx from &#39;clsx&#39;;
      
      // ...
      
      export default function NavLinks() {
        const pathname = usePathname();
      
        return (
          &lt;&gt;
            {links.map((link) =&gt; {
              const LinkIcon = link.icon;
              return (
                &lt;Link
                  key={link.name}
                  href={link.href}
                  className={clsx(
                    &#39;flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3&#39;,
                    {
                      &#39;bg-sky-100 text-blue-600&#39;: pathname === link.href,
                    },
                  )}
                &gt;
                  &lt;LinkIcon className=&quot;w-6&quot; /&gt;
                  &lt;p className=&quot;hidden md:block&quot;&gt;{link.name}&lt;/p&gt;
                &lt;/Link&gt;
              );
            })}
          &lt;/&gt;
        );
      }
      </code></pre>`,
      link: "https://nextjs.org/learn/dashboard-app/navigating-between-pages",
      logo: "nextjs",
    },
    {
      title: `page.tsx (ts,js,jsx)`,
      description: `<code>page.tsx</code> is a special Next.js file that exports a React component, and it's required for the 
      route to be accessible. The <code>/app/page.tsx</code> - this is the home page associated with the route /. For instance,
      the file <code>/app/dashboard/page.tsx</code> is associated with the <code>/dashboard</code> path. In the app directory, 
      nested folders define route structure. Each folder represents a route segment that is mapped to a corresponding segment 
      in a URL path. However, even though route structure is defined through folders, a route is not publicly accessible until 
      a <code>page.tsx</code> or <code>route.tsx</code> file is added to a route segment. And, even when a route is made publicly 
      accessible, only the content returned by <code>page.tsx</code> or <code>route.tsx</code> is sent to the client. This means that project 
      files can be safely colocated inside route segments in the app directory without accidentally being routable.`,
      link: "https://nextjs.org/learn/dashboard-app/creating-layouts-and-pages",
      logo: "nextjs",
    },
    {
      title: `layout.tsx (ts,js,jsx)`,
      description: `<code>layout.tsx</code> is a special Next.js file to create UI that is shared between multiple pages. The 
      layout will apply to the sibling <code>page.tsx</code> file and all the children <code>page.tsx</code> files found in the 
      subfolders/subroutes. One benefit of using layouts in Next.js is that on navigation, only the page components update while 
      the layout won't re-render. This is called partial rendering which preserves client-side React state in the layout when 
      transitioning between pages.
      For example:
      <pre><code>
      import { inter } from '@/app/ui/fonts';
 
      export default function RootLayout({
        children,
      }: {
        children: React.ReactNode;
      }) {
        return (
          &lt;html lang=&quot;en&quot;&gt;
            &lt;body className={\`\${inter.className} antialiased\`}&gt;{children}&lt;/body&gt;
          &lt;/html&gt;
        );
      }
      </code></pre>`,
      link: "https://nextjs.org/learn/dashboard-app/creating-layouts-and-pages",
      logo: "nextjs",
    },
    {
      title: `notFound()<br/>not-found.tsx`,
      description: `The <code>notFound()</code> function imported from next navigation, allows you to specify when to display
      a NOT FOUND page. You can even customize the page for each route by creating a <code>not-found.tsx</code> page in the 
      corresponding segment and add your own html. If none is created, Next.js will use the default bult-in one. In the example
      below, the server component shows the NOT FOUND page when a user is not in the users list:
      <pre><code>
      import { notFound } from 'next/navigation'
 
      async function fetchUser(id) {
        const res = await fetch('https://...')
        if (!res.ok) return undefined
        return res.json()
      }
      
      export default async function Profile({ params }) {
        const { id } = await params
        const user = await fetchUser(id)
      
        if (!user) {
          notFound()
        }
      
        // ...
      }
      </code></pre>
      `,
      link: "https://nextjs.org/docs/app/api-reference/functions/not-found",
      logo: "nextjs",
    },
    {
      title: `loading.tsx (ts,js,jsx)`,
      description: `<code>loading.tsx</code> is a special Next.js file that will display in loading state for the corresponding
      route and subroutes. For instance, if you have a page that fetches data and it takes some time, the content of the loading page will
      be displayed in the meantime, for instance:
      <pre><code>
      export default function Loading() {
        // Or a custom loading skeleton component
        return <p>Loading...</p>
      }
      </code></pre>
      `,
      link: "https://nextjs.org/docs/app/api-reference/file-conventions/loading",
      logo: "nextjs",
    },
    {
      title: `Route groups`,
      description: `Route groups allow you to organize files into logical groups without affecting the URL path structure. 
      When you create a new folder using parentheses (), the name won't be included in the URL path. So, for instance
      if you have a dashboard folder and you want to group together the loading or not found pages so that they are not
      used for the subroutes, you can group them like this: (overview). This segment won't appear in the URL:
      /dashboard/(overview)/page.tsx becomes /dashboard.`,
      link: "https://nextjs.org/learn/dashboard-app/streaming",
      logo: "nextjs",
    },
    {
      title: "'use client'",
      description: `In Next.js (App Router), components can be either Server Components or Client Components. By default, 
      all components in the app/ directory are Server Components, which are rendered on the server and sent as HTML to the 
      browser. These components are ideal for tasks like secure data fetching (e.g., from a database), server-side rendering 
      for SEO, and reducing client-side JavaScript. However, Server Components cannot use React hooks like useState or useEffect, 
      and they do not have access to browser APIs such as window or localStorage. They are not interactive on their own but can 
      include Client Components inside them. 
      <br/><br/>
      In contrast, Client Components are rendered in the browser and must be 
      explicitly marked with the <code>'use client'</code> directive at the top of the file. These components support interactivity, such as 
      button clicks or dynamic state updates, and can use all React hooks as well as browser APIs. They are essential when 
      building UI elements that require user interaction. However, Client Components cannot perform secure server-side operations
      directly and rely on API routes or Server Components for that. Also, Client Components cannot render Server Components 
      within them — the flow of rendering must always start from the server.`,
      link: "https://nextjs.org/learn/dashboard-app/adding-search-and-pagination",
      logo: "nextjs",
    },
    {
      title: "useSearchParams<br/>usePathname<br/>useRouter",
      description: `<code>import { useSearchParams, usePathname, useRouter } from 'next/navigation';</code> are used 
      to update a nextjs app page URL with the search parameters. They can be used in client components only.  
      In case you need to access the search parameters from a server component, you can pass them as props to the page
      itself, for instance <code>export default async function Page(props: {searchParams?: Promise<{query?: string;page?: string;}>;}...</code>
      Therefore the URL '.../dashboard/invoices' will include the search parameters and become '.../dashboard/invoices?query=lee'`,
      link: "https://nextjs.org/learn/dashboard-app/adding-search-and-pagination",
      logo: "nextjs",
    },
    {
      title: `pnpm i use-debounce`,
      description: `Install the library called use-debounce. Debouncing is a programming practice that limits the rate at which 
      a function can fire. For instance, if you need to call a search query function to fetch data from the database and 
      you only want to query the database when the user has stopped typing, you would use debouncing. If no debouncing is 
      implemented, the function will be executed at every key stroke. You just have to import the debounce function and wrap
      it around the function that needs to be delayed <code>import { useDebouncedCallback } from 'use-debounce';</code>`,
      link: "https://nextjs.org/learn/dashboard-app/adding-search-and-pagination#best-practice-debouncing",
      logo: "nextjs",
    },
    {
      title: ``,
      description: ``,
      link: "",
      logo: "nextjs",
    },
    {
      title: ``,
      description: ``,
      link: "",
      logo: "nextjs",
    },
    {
      title: ``,
      description: ``,
      link: "",
      logo: "nextjs",
    },
  ],
};

const aws_administratoraccess = {
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Action: "*",
      Resource: "*",
    },
  ],
};

const aws_iamreadonlyaccess = {
  Version: "2012-10-17",
  Statement: [
    {
      Effect: "Allow",
      Action: [
        "iam:GenerateCredentialReport",
        "iam:GenerateServiceLastAccessedDetails",
        "iam:Get*",
        "iam:List*",
        "iam:SimulateCustomPolicy",
        "iam:SimulatePrincipalPolicy",
      ],
      Resource: "*",
    },
  ],
};

const aws = {
  title: "aws",
  type: "section-list",
  navcategory: "dev",
  dvac02: {
    title: "AWS Certified Developer - Associate (DVA-C02)",
    intro: {
      title: "Introduction",
      0: "Create a free AWS account: <a target='_blank' href='https://signin.aws.amazon.com/signup?request_type=register'>Register</a>",
      1: "Choose region depending on the use case: <a target='_blank' href='https://aws.amazon.com/about-aws/global-infrastructure/regions_az/'>AWS Regions</a> ",
      2: "Services are region-scoped",
      3: "Some services might be offered only some regions. Check service availability by region here: <a target='_blank' href='https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/'>Service availability by region</a>",
      4: "There are also global services regardless of the region.",
      5: "How to choose a region: legal data compliancy, proximity (reduced latency), availability of services, pricing",
      6: "Regions are made up of availability zones (AZ): min 3, max 6",
      7: "Each AZ is made up by one or more data centers and separate from each other",
    },
    iam: {
      title: "Identity and Access Management (IAM - Global Serice)",
      0: "Root account is created by default. It should not be used or shared (only has an Account ID)",
      1: "Users can be grouped together",
      2: "Groups can only contain users and not other groups",
      3: "Users do not have to belong to a group",
      4: "Users can belong to multiple groups",
      5: "Users and groups are assigned access/permissions policies (JSON format)",
      6: "Least privilige principle: assign no more than required permissions",
      7: "Create an admin IAM user, create a group with AdministratorAccess policy and add the user to the group",
      8: "Create an alias for the IAM user to customise the sign-in URL",
      9: "Go to the sign-in page (for instance <a target='_blank' href='https://eu-north-1.signin.aws.amazon.com/'>Sign-in Page</a>), type the Account ID or Alias and then the IAM user credentials",
      10: "IAM user has Account ID and IAM User on top right info",
      11: "Turn on multi-sessions support > Add session. Allows to log in AWS with different accounts in the same browser",
      12: "There are IAM Group and Inline policies (inline apply to single users)",
      13: "IAM Policy is a json consisting of <ul><li>Version</li><li>Id (optional)</li><li>Statement (one or more)</li></ul>",
      14: `A IAM Policy statement consists of: <ul><li>Sid (optional)</li> <li>Effect (Allow/Deny)</li> <li>Principal (account/user/role to which the 
      policy is applied to)</li> <li>Action (actions that are allowed or denied)</li> <li>Resource (list of resources to which the actions apply 
      to)</li> <li>Condtion (optional)</li></ul> See <a target='_blank' href="https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_elements.html">aws policies elements</a>`,
      15: `Policies examples: <a target='_blank' href="https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AdministratorAccess.html">AdministratorAccess</a> and <a target='_blank' href="https://docs.aws.amazon.com/aws-managed-policy/latest/reference/IAMReadOnlyAccess.html">IAMReadOnlyAccess</a>`,
      16: "MFA options: Authenticator App, Security Key, Hardware TOTP Token",
      17: `You can define a password policy in Account Settings > Password policy`,
      18: `Enable MFA for the root user: Account > Security credentials. You can add up to 8 MFA devices.`,
      19: `Access AWS: <ul><li>AWS Management Console</li><li>AWS Command Line Interface/AWS CloudShell</li><li>AWS Software Developer Kit</li></ul>`,
      20: `Install the AWS CLI as explained <a target='_blank' href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html">here</a>`,
      21: `Account > Security Credentials > Access keys: Create access key (needed when using AWS CLI and SDK)`,
      22: `<code>aws --version</code>: to check if the CLI is installed`,
      23: `<code>aws configure</code> then provide access key ID and secret`,
      24: `<code>aws iam list-users</code>: lists all users in your aws`,
      25: `When using the AWS CloudShell, you can upload and download files (it uses the logged in account and region by default)`,
      26: `IAM Roles: allows to assign permissions to AWS services to perform actions in AWS (for instance EC2, Lambda etc). You first create a role and then assign a permission policy to it`,
      27: `IAM Security Tools: <ul><li>IAM Credential Report: lists all users and the status of their credentials (download a csv file)</li><li>IAM Last Access: shows the service permissions granted to a user and when the services where last accessed (UI via User view)</li></ul>`,
      28: `Shared Responsibility Model for IAM: <ul><li>AWS: Infrastructure, Config and Vulnerability analysis, Compliance validation</li><li>You: Users, Groups, Roles, Policies management, Enable MFA, analyze access patters  and review permissions</li></ul>`,
      29: `Root account > Account > IAM user and role access to Billing information: Edit > Activate IAM Access > Update. Allows access to billing for admin users`,
      30: `Admin account > Billing and Cost Management > Budgets > Use a template <ul><li>Zero spend budget: get an alert when reaching 1 cent</li><li>Monthly cost budget: get an alert when exceeding or forecast to exceeding set amount</li></ul>`,
    },
    ec2: {
      title: `Amazon EC2 - Elastic Compute Cloud`,
      0: `EC2 Service - <ul><li>EC2 Instances: virtual machines</li><li>EBS: virtual drives</li><li>ELB: load balancing machines</li><li>ASG: auto-scaling group to scale services</li></ul>`,
      1: `EC2 OS - Linux, Windows or MacOS`,
      2: `EC2 User Data - lets you pass a script to an instance at the time of its first launch  and only the first one and it is run as root user. It's commonly used to: <ul><li>Install software packages.</li><li>Configure the system.</li><li>Deploy applications.</li><li>Set up services (e.g., web servers, databases)</li></ul>`,
      3: `EC2 Console > Instances > Launch an instance > add name > choose the OS > choose instance type > create a key pair`,
    },
  },
};

const tools = {
  title: "tools",
  type: "tools",
  navcategory: "other",
  tools: [
    {
      title: "EncoderDecoder Tool",
      component: `<div id="encoderDecoder">
      <div style="display: flex; flex-wrap: wrap; gap: 20px; margin: 1rem 2rem 0.5rem; justify-content: center;">
        <button id="encodeHTMLButton" class="btn btn-warning btn-tools">
            <span>Encode HTML</span>
        </button>
        <button id="decodeJWTButton" class="btn btn-info btn-tools">
            <span>Decode JWT</span>
        </button>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center;">
        <textarea
          id="inputBox"
          rows="20"
          cols="70"
          placeholder="Paste your code here..."
          required=""
        ></textarea>
        <textarea id="outputBox" rows="20" cols="70"></textarea>
      </div>
    </div>`,
    },
  ],
};
