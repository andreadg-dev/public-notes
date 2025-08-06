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
  const snippetTitleRegex = /^\s*(?:\/\/## |### )(.+?) ##/gm;
  const endCodeSnippetRegex = /^\s*(?:\/\/|#)={3,}/gm;
  let pageBody = [];
  //pageTitle = objArray[index].title && `<h1 class="main"><u>${objArray[index].title}</u></h1>`;
  pageSnippets = objArray[index].snippets.map((snippet) => {
    let processedSnippet = escapeHTML(snippet.code)
      .replace(
        snippetTitleRegex,
        `<div class="snippet"><h2 class="snippet-title">🟡 $1</h2><pre><code class="language-${objArray[index].language}">`
      )
      .replace(endCodeSnippetRegex, "</code></pre></div>");
    //console.log(processedSnippet);
    return `<div><h1 class="main">🔴 ${snippet.title} 🔴</h1>${processedSnippet}`;
    //<div><pre><code>${snippet.code}</code></pre></div></div>;
  });
  //pageBody.push(pageTitle);
  pageBody.push(pageSnippets.join(""));
  $("#root").append(pageBody);
}

function appendSectionToNavbar(objArray) {
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
}

function displaySectionOnClick(objArray) {
  $(document).on("click", ".nav-item", function () {
    $(".nav-item").each(function (index, element) {
      $(element).removeClass("active");
    });
    $(this).addClass("active");
    $("#root").empty();
    appendToRoot(objArray, Number($(this).attr("id").replace("navitem", "")));

    hljs.highlightAll();
  });
}

const navBar = `
                    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                    <a class="navbar-brand" href="#">{a}</a>
                    <div id="navbarNav">
                        <ul class="navbar-nav">{{navItems}}</ul>
                    </div>
                    </nav>
                    `;

const samplescript = {
  title: "samplescript",
  language: "powershell",
  snippets: [
    {
      title: "my_samplescript_notes",
      code: `Get-Content "file.txt"`,
    },
  ],
};

const typescript = {
  title: "typescript",
  language: "typescript",
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
