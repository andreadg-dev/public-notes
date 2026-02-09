# MY JAVASCRIPT NOTES #

- [MY JAVASCRIPT NOTES](#my-javascript-notes)
  - [**Loop methods: Example 1**](#loop-methods-example-1)
  - [**High Order Functions: caluclator()**](#high-order-functions-caluclator)
  - [**JavaScript and DOM CheatSheet**](#javascript-and-dom-cheatsheet)
  - [**addEventListener()**](#addeventlistener)
  - [**new Audio() \& .play() methods to play a sound**](#new-audio--play-methods-to-play-a-sound)
  - [**Pass a variable between quotes**](#pass-a-variable-between-quotes)
  - [**Quick tips**](#quick-tips)
  - [**The importance of Minifying your code**](#the-importance-of-minifying-your-code)
  - [**The Separation of Concerns**](#the-separation-of-concerns)
  - [**Destructuring in JavaScript**](#destructuring-in-javascript)




## **Loop methods: Example 1**

<span style="display:block;"> **For** </span>

```js
let numberOfDrums = document.querySelectorAll(".drum").length;
for (let i = 0; i < numberOfDrums; i++) {
  document.querySelectorAll(".drum")[i].addEventListener("click", handleClick);
}

function handleClick() {
  alert("I got clicked!");
}
```

<span style="display:block;"> **Foreach** </span>

```js
document.querySelectorAll(".drum").forEach((drum) => {
  drum.addEventListener("click", handleClick);
});

function handleClick() {
  alert("I got clicked!");
}
```

<span style="display:block;"> **Comments** </span> 

In the example above all the button elements with class .drum are queried and are passed into loop methods to add the alert "I got clicked" when clicked on. When adding a function to a method, like in this case, you can either pass a known delcared function without round brackets, for instance `selectedelement.addEventListener("click", handleClick);` or pass an anonimous function, for instance `selectedelement.addEventListener("click", function (){ //function_code_block});`






## **High Order Functions: caluclator()**

```js
function add(num1,num2){
    return num1 + num2
}

function multiply(num1,num2){
    return num1 * num2
}

function subtract(num1,num2){
    return num1 - num2
}

function divide(num1,num2){
    return num1 / num2
}

function calculator(num1,num2,operator){
    return operator(num1,num2)
}
```
<span style="display:block;"> **Comments** </span> 
In the example above, in the calculator function we are able to pass as input, the numbers needed for the calculations and then we can call the function we want that will take the place of `operator`, for instance:

```js
calculator(2,3,add); //output is 5
calculator(2,3,multiply); //output is 6
calculator(2,3,subtract); //output is -1
calculator(2,3,divide); //output is 0.6666666666666666
```



## **JavaScript and DOM CheatSheet**

<span style="display:block;"> **Getting properties/attributes** </span>

When using querySelector, we refer to the selectors as we do in css. Classes are preeced by a dot, ids are preeced by a hash symbol and html are written as they are:

<span style="display:block;"> **html** </span>

```html
<p class="class"><a href="https://www.google.com/">Google</a></p>
<p class="class"><a href="https://www.youtube.com/">Youtube</a></p>
<p id="id"><a href="https://www.wikipedia.org/">Wikipedia</a></p>
```
<br>

<span style="display:block;"> **javascript - querySelector()** </span>

```js
document.querySelector(".class"); 
//returns the first element found in the page with that corresponding class selector, in this case: <p class="class"><a href="https://www.google.com/">Google</a></p>

document.querySelector("#id");
//returns the only element in the page with that corresponding id (IDs are supposed to be unique in the same html page), in this case: <p id="id"><a href="https://www.wikipedia.org/">Wikipedia</a></p>

document.querySelector("p"); 
//returns the first element found in the page with that corresponding element selector, in this case: <p class="class"><a href="https://www.google.com/">Google</a></p>

document.querySelector(".class").innerHTML; 
//returns the inner html of the fist element found in the page with that corresponding element selector, in this case: <a href="https://www.google.com/">Google</a>

document.querySelector(".class").textContent;
//returns the text of the fist element found in the page with that corresponding element selector, in this case: Google


//How to get html element attribute values
document.querySelector("a").href;
//returns the href attribute value of the fist element found in the page with that corresponding element selector, in this case: 'https://www.google.com/'

document.querySelector("p").className;
//returns the class attribute value of the fist element found in the page with that corresponding element selector, in this case: 'class'

document.querySelector("p").classList;
//returns an array of class(es) of the fist element found in the page with that corresponding element selector, in this case: ['class', value: 'class'] - classList always returns an array, even for one item

document.querySelector("a").attributes;
//returns an array of all the attributes of the fist element found in the page with that corresponding element selector, in this case: {0: href, href: href, length: 1}

document.querySelector("a").getAttribute("href");
//returns the value of the attribute of the fist element found in the page with that corresponding element selector, in this case: 'https://www.google.com'
```
<br>


<span style="display:block;"> **javascript - getElement(s)By...** </span>

```js
//getElementsByTagName()
document.getElementsByTagName("a");
//returns an array of all the elements in the html page with tag name 'a', in this case [a, a, a]

document.getElementsByTagName("a")[0].innerHTML;
//returns 'Google'. We are accessing the first value of the array by its index '[0]' and then getting its innetHTML

document.getElementsByTagName("a")[1].innerHTML;
//returns 'Youtube'

document.getElementsByTagName("a")[2].innerHTML;
//reurns 'Wikipedia'


//getElementsByClassName()
document.getElementsByClassName("class");
//returns an array of all the elements in the html page with class name 'class', in this case [p.class, p.class]

document.getElementsByClassName("class")[0].textContent;
//returns the first item in the array mentioned above, in this case: 'Google'

document.getElementsByClassName("class")[1].textContent;
//returns the second item in the array mentioned above, in this case: 'Youtube'

//getElementById()
document.getElementById("id").innerHTML;
//returns the only item in the page with that corresponding id, in this case: '<a href="https://www.wikipedia.org/">Wikipedia</a>'. Note that this method does not return an array

```
All `getElementsBy..` retrieve an array of values. In order to get or set values for one of the item in the array, you have specify which one by declaring its index number between square brackets. The exception is `getElementById`, since there is always only one ID in a web page.

<br>

<span style="display:block;"> **javascript - querySelectorAll()** </span>

```js
document.querySelectorAll("p");
//returns an array of all the elements in the html page with that corresponding element selector, in this case: [p.class, p.class, p#id]

document.querySelectorAll("p")[0];
//returns the first item of the array mentioned above, in this case: <p class="class"><a href="https://www.google.com/">Google</a></p>
```


```js
document.querySelectorAll("a").forEach((aTagElements) =>{console.log(aTagElements)});
//returns 
//<a href=​"https:​/​/​www.google.com/​">​Google​</a>​
//<a href=​"https:​/​/​www.youtube.com/​">​Youtube​</a>​
//<a href=​"https:​/​/​www.wikipedia.org/​">​Wikipedia​</a>​
```
In the example above, the `forEach()` method allows us to call a function on every singly item in the array.


<br>

<span style="display:block;"> **javascript - first/lastElementChild** </span>

```js
document.firstElementChild;
// returns the root <html> element, the only child of the document

document.lastElementChild;
// returns the root <html> element, the only child of the document

document.firstElementChild.firstElementChild;
// returns the <head> element, the first child of <html>

document.firstElementChild.lastElementChild;
// returns the <body> element, the last child of <html>
```

You can keep adding `.firstElementChild` and `.lastElementChild` to target a specific element following the logic of the DOM tree. Obviously, a much better, faster and more efficient way is to target the element directly by using the `.querySelector()` or the `.getElementBy...` methods

<br>

<span style="display:block;"> **Setting/Updating properties/attributes and calling methods** </span>

```js
//Setting/updating a property/attribute or calling methods when using methods that retrieve single items
document.querySelector(".class a").style.color = "yellow";
//sets/updates the color of the text of the first instance of an element 'a' that is a child of an element with class '.class' to yellow

document.querySelector(".class a").click();
//calls the method click() on the first instance of an element 'a' that is a child of an element with class '.class'. It basically clicks on the link in this case

document.querySelector("p").className = "kulassu";
//sets/updates the value of the class attribute of the first instance of 'p' element 'kulassu'

document.querySelector("a").href = "https://www.toogle.com/";
//sets/updates the value of the href attribute of the first instance of 'a' element to 'https://www.toogle.com/'

document.querySelector("a").setAttribute("href","https://www.foogle.com");
//sets/updates the value of the href attribute of the first instance of 'a' element to 'https://www.toogle.com/'

document.querySelector("a").download = "testDownload.txt"
//sets/updates the value of the href attribute of the first instance of 'a' element to 'https://www.toogle.com/'

document.querySelector("p").classList.add("yetAnotherClass")
//adds 'yetAnotherClass' to the array of class(es) of the fist element found in the page with that corresponding element selector

document.querySelector("p").classList.remove("yetAnotherClass")
//removes 'yetAnotherClass' to the array of class(es) of the fist element found in the page with that corresponding element selector

document.querySelector("p").classList.toggle("yetAnotherClass")
//adds or removes 'yetAnotherClass' to the array of class(es) of the fist element found in the page with that corresponding element selector dpeending if the class is already applied or not - it returns a boolean value in the console

document.getElementById("id").innerHTML = "Bing";
//sets/updates the innerHTML of the only id element in the page to 'Bing'


////Setting a property or calling methods when using methods that retrieve arrays
document.querySelectorAll("a")[0].style.textDecoration = "underline wavy"
//sets the text decoration of the first item of the page 'a' elements array to underlined with a squiggly line

document.getElementsByTagName("a")[0].style.fontSize = "4rem";
//sets the size of the first item of the page 'a' elements array to 4rem

document.getElementsByTagName("a")[0].style.backgroundColor = "white";
//sets the background color of the first item of the page 'a' elements array to white

document.getElementsByClassName("class")[0].style.margin = "4rem";
//sets the margin of the first item the elements array with the class 'class' to 4rem
```
As a rule of thumb (look for <strong>Separation of Concerns</strong>), it is considered bad practice to add styling using javascript since styling is actually a css concern - a better practice would be instead to create a class in css with the required styling and then use javascript to add/remove/toggle the class to the element using the corresponding methods of the clssList property.





## **addEventListener()**

With this method, we can pass and then query the event information of the event that was triggered, for instance, when pressing a key on a keyboard, when clicking or double clicking an element on the page:

```js
document.addEventListener("keydown", function(event){console.log(event)});
//returns an arrary containing all the properties of the event, in this case: KeyboardEvent {isTrusted: true, key: 'a', code: 'KeyA', location: 0, ctrlKey: false, …}

document.addEventListener("dblclick", function(event){console.log(event)});
//returns an arrary containing all the properties of the event, in this case: MouseEvent {isTrusted: true, screenX: 573, screenY: 215, clientX: 573, clientY: 112, …}

document.addEventListener("click", function(event){console.log(event)});
//returns an arrary containing all the properties of the event, in this case: PointerEvent {isTrusted: true, pointerId: 1, width: 1, height: 1, pressure: 0, …}

```

## **new Audio() & .play() methods to play a sound**

In the example below, we use a keydown together with the function `makeSound()` to play a sound when pressing any of the following letters: w, a, s, d, j, k, l. In this case the EventListener is added to the whole document but it can also be added to a sigle element on the page, for instance a button:

```js
document.addEventListener("keydown", function (event) {
  makeSound(event.key);
});

function makeSound(key) {
  switch (key) {
    case "w":
      let crash = new Audio("sounds/crash.mp3");
      crash.play();
      break;

    case "a":
      let kick = new Audio("sounds/kick-bass.mp3");
      kick.play();
      break;

    case "s":
      let snare = new Audio("sounds/snare.mp3");
      snare.play();
      break;

    case "d":
      let tom1 = new Audio("sounds/tom-1.mp3");
      tom1.play();
      break;

    case "j":
      let tom2 = new Audio("sounds/tom-2.mp3");
      tom2.play();
      break;

    case "k":
      let tom3 = new Audio("sounds/tom-3.mp3");
      tom3.play();
      break;

    case "l":
      let tom4 = new Audio("sounds/tom-4.mp3");
      tom4.play();
      break;

    default:
      console.log(key);
      break;
  }}

```







## **Pass a variable between quotes**

```js
  let buttonSound = new Audio(`sounds/${chosenColour}.mp3`);
  buttonSound.play();

  //instead of 

    let buttonSound = new Audio("sounds/blue.mp3");
  buttonSound.play();
```
Let's imagine that you have coloured buttons on a page and everytime that you click on a specific button, you want the corresponding sound to be played, then you can declare a variable (in this case `chosenColour`) to store the button id using the `addEventListener` function and getting the value of `event.target.id`. If the mp3 files name matches with the id value, you pass the variable in the audio source using the back ticks instead of the quotes, and typing the variable inside `${}`. 






## **Quick tips**

- To access the debugger in Google Chrome, type `debugger;` in the console, hold `shift` and hit `enter`, call the function you need to debug and hit `enter` again.
- Javascript is case-sensitive and uses camel-casing!!
- How to add jquery to your html: `<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>`
- `CTRL` + `/` or `Edit` > `Toggle Line Comment`: comments out all selected lines of code







## **The importance of Minifying your code**

Minify your js and css files on `https://www.minifier.org/`. Minifier removes whitespace, strips comments, combines files, and optimizes/shortens a few common programming patterns. Minification is the process of minimizing code and markup in your web pages and script files. It’s one of the main methods used to reduce load times and bandwidth usage on websites. Minification dramatically improves site speed and accessibility, directly translating into a better user experience. It’s also beneficial to users accessing your website through a limited data plan and who would like to save on their bandwidth usage while surfing the web. When creating HTML, CSS and JavaScript (JS) files, developers tend to use spacing, comments and well-named variables to make code and markup readable for themselves. It also helps others who might later work on the assets. While this is a plus in the development phase, it becomes a negative when it comes to serving your pages. Web servers and browsers can parse file content without comments and well-structured code, both of which create additional network traffic without providing any functional benefit.





## **The Separation of Concerns**
Even if you can include styling in your JavaScript code, it's bad practice. Instead of doing that, create a class in css with your styling and then use JavaScript to add that class to the corresponding element when performing a certain action.






## **Destructuring in JavaScript**
Even if you can include styling in your JavaScript code, it's bad practice. Instead of doing that, create a class in css with your styling and then use JavaScript to add that class to the corresponding element when performing a certain action.

```js
//We declare a const containing an array of objects
const cars = [
  {
    model: "Honda Civic",
    coloursByPopularity: ["black", "silver"],
    speedStats: {
      topSpeed: 140,
      zeroToSixty: 8.5,
    },
  },
  {
    model: "Tesla Model 3",
    coloursByPopularity: ["red", "white"],
    speedStats: {
      topSpeed: 150,
      zeroToSixty: 3.2,
    },
  },
];


//We destructure first each of the items in the array
const [honda, tesla] = cars

//Then we destructure each item object into other constants containing its properties' values
const {coloursByPopularity:[hondaTopColour, hondaSecondColour], speedStats:{topSpeed: hondaTopSpeed, zeroToSixty: hondaZeroToSixty}} = honda;
const {coloursByPopularity:[teslaTopColour, teslaSecondColour], speedStats:{topSpeed: teslaTopSpeed, zeroToSixty: teslaZeroToSixty}} = tesla;

console.log(`Our const cars is an ${typeof(cars)} contaning ${cars.length} ${typeof(cars[0])}s. We first destructure this object array assigning random var names chosen by us 'honda' and 'tesla' using square brackets that will contain the first and the second items of the array respectively ${JSON.stringify(honda)} and ${JSON.stringify(tesla)}. Then we access the object property by using the same property name found in the object and not a random one, in this case 'coloursByPopularity' and since this property contains an array, we can choose random var names to assign the items inside, 'hondaTopColour' will be assigned to ${hondaTopColour} and 'hondaSecondColour' to ${hondaSecondColour} and at the same time 'teslaTopColour' will be assigned to ${teslaTopColour} and  'teslaSecondColour' to ${teslaSecondColour}. Eventually we access the object 'speedStats' inside of each 'cars' object, we call the first and the second properties respectively and change their name using the colon sign and therefore assigning ${hondaTopSpeed} to 'hondaTopSpeed', ${hondaZeroToSixty} to 'hondaZeroToSixty' and ${teslaTopSpeed} to 'teslaTopSpeed', ${teslaZeroToSixty} to 'teslaZeroToSixty' `);

```

**Console Output**
```
Our const cars is an object contaning 2 objects. We first destructure this object array assigning random var names chosen by us 'honda' and 'tesla' using square brackets that will contain the first and the second items of the array respectively {"model":"Honda Civic","coloursByPopularity":["black","silver"],"speedStats":{"topSpeed":140,"zeroToSixty":8.5}} and {"model":"Tesla Model 3","coloursByPopularity":["red","white"],"speedStats":{"topSpeed":150,"zeroToSixty":3.2}}. Then we access the object property by using the same property name found in the object and not a random one, in this case 'coloursByPopularity' and since this property contains an array, we can choose random var names to assign the items inside, 'hondaTopColour' will be assigned to black and 'hondaSecondColour' to silver and at the same time 'teslaTopColour' will be assigned to red and  'teslaSecondColour' to white. Eventually we access the object 'speedStats' inside of each 'cars' object, we call the first and the second properties respectively and change their name using the colon sign and therefore assigning 140 to 'hondaTopSpeed', 8.5 to 'hondaZeroToSixty' and 150 to 'teslaTopSpeed', 3.2 to 'teslaZeroToSixty' 
```

