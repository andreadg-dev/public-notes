# JQUERY NOTES #

- [JQUERY NOTES](#jquery-notes)
  - [**JavaScript vs jQuery**](#javascript-vs-jquery)
    - [**Getting properties/attributes**](#getting-propertiesattributes)
    - [**Setting/Updating properties/attributes and calling methods**](#settingupdating-propertiesattributes-and-calling-methods)
    - [**Adding EventListeners**](#adding-eventlisteners)
  - [**jQuery Specific Code**](#jquery-specific-code)
  - [**Quick tips**](#quick-tips)




## **JavaScript vs jQuery** ##
### **Getting properties/attributes** ###
<span style="display:block;"> **js without jQuery** </span>

```js
document.querySelector("p").innerHTML; 
//gets the HTML content of the first element in the set of matched elements, in this case the html content of the first 'p' element

document.querySelector("p").textContent;
//gets the text content of the first element in the set of matched elements, in this case the text content of the first 'p' element

document.querySelector("p").className;
//gets the class attribute value(s) of the first element in the set of matched elements, in this case the text content of the first 'p' element

document.querySelector("a").href;
//gets the href attribute value of the first element in the set of matched elements, in this case the text content of the first 'a' element
```
<br>

<span style="display:block;"> **js with jQuery** </span>

```js
$("p").html();
//gets the HTML content of the first element in the set of matched elements, in this case the html content of the first 'p' element

$("p").text();
//gets the combined text contents of each element in the set of matched elements, including their descendants

$("p").attr("class");
//gets the value of an attribute for the first element in the set of matched elements, in this case the value for the 'class' attribute

$("a").attr("href");
//gets the value of an attribute for the first element in the set of matched elements, in this case the value for the 'href' attribute

```






### **Setting/Updating properties/attributes and calling methods** ###
Settings properties/attributes in jQuery works a bit differently than in JavaScript, therefore the comparison below perform the same action to an extent. jQuery usually sets properties to all matched elements by default, whereas JavaScript might need a loop function to iterate and sets the properties/attributes to all matched elements.

<br>

<span style="display:block;"> **js without jQuery** </span>

```js
//Example #1
document.querySelector("h1").style.color = "red";
// changes the color of the first h1 element of the page to red

//Example #2
document.querySelectorAll("p")[0].style.color = "red";
document.querySelectorAll("p")[1].style.color = "red";
document.querySelectorAll("p")[...].style.color = "red";

//Example #3
document.querySelector("p").classList.add("yetAnotherClass");
//adds 'yetAnotherClass' to the array of class(es) of the fist element found in the page with that corresponding element selector

//Example #4
document.querySelector("p").classList.remove("yetAnotherClass")
//removes 'yetAnotherClass' to the array of class(es) of the fist element found in the page with that corresponding element selector

document.querySelector("p").innerHTML = "<strong>New Paragraph</strong>";
//sets the HTML content of the first element in the set of matched elements to '<strong>New Paragraph</strong>'

document.querySelector("p").textContent = "Again a new paragraph";
//sets the content of the first element in the set of matched elements to 'Again a new paragraph'

document.querySelector("p").className = "newParagraph";
//sets the 'class' attribute of the first element in the set of matched elements to 'newParagraph'

document.querySelector("a").href = "https://www.wikipedia.com/";
//sets the 'href' attribute of the first element in the set of matched elements to 'https://www.wikipedia.com/'

```
<br>

<span style="display:block;"> **js with jQuery** </span>

```js
//Example #1
$("h1").css("color","red");
//sets the color of each element in the set of matched elements to red, in this case all 'h1' elements

//Example #2
$("p").css("color","red");
//sets the color of each element in the set of matched elements to red, in this case all 'p' elements

//Example #3
$("p").addClass("yetAnotherClass");
//adds 'yetAnotherClass' to the array of class(es) of each element in the set of matched elements

//Example #4
$("p").removeClass("yetAnotherClass");
//removes 'yetAnotherClass' to the array of class(es) of each element in the set of matched elements

//Example #5
$("p").html("<strong>New Paragraph</strong>");
//sets the HTML content of each element in the set of matched elements to '<strong>New Paragraph</strong>'

//Example #6
$("p").text("Again a new paragraph");
//sets the content of each element in the set of matched elements to 'Again a new paragraph'

//Example #7
$("p").attr("class","newParagraph");
//sets the 'class' attribute of each element in the set of matched elements to 'newParagraph'

//Example #8
$("a").attr("href","https://www.wikipedia.com/");
//sets the 'href' attribute of each element in the set of matched elements to 'https://www.wikipedia.com/'
```

<span style="display:block;"> **Comments** </span> 
- In jQuery, you can either use `jQuery` or `$` to define the query. In the examples above, I will always be using `$` since the purpose of jQuery is to shorten the code to the essential.
- The `$` replaces both `.querySelector()` and `.querySelectorAll()`. Also, when changing something in an element with jQuery, for instance its style, we do not need to specify which element in the array we want to change or use a foreach function to apply the change to all elements in the array, jQuery will take care of that and apply our change to all elements satisfying our query, in this case all 'p' elements in our page.
- Make sure to include the jQuery js in your html page, at the bottom of the body together with the rest of the scripts and before your own js file. Html is read from top to bottom, therefore the browsers needs to first load the jQuery library before it is able to understand what `$` and `jQuery` and the rest of its syntax stand for.
- As you can see in the example below, we can use the `css("css_property","value")` method, in jQuery, to change the styling of the page. To only query the value of a selected element, we can use `css("css_property")`.
- You can wrap your jQuery code around with a ready function which waits until the page is fully loaded before starting applying the code, for instance:

```js
$(document).ready(function () {
  $("h1").css("color","red");
});
//In thise case our code waits until the page is loaded before coloring the h1 red. Including the script element at the end of the body instead of the head of the page does exactly the same thing: it loads the page first before executing any script.

```

Example of a `foreach` loop with JavaScript and JQuery

```js
//JavaScript
document.querySelectorAll(".card-body").forEach(function(element) {
    console.log(element.innerHTML);
});

//JQuery
$(".card-body").each(function() {
    console.log($(this).html());
});

```




### **Adding EventListeners** ###
<span style="display:block;"> **js without jQuery** </span>

```js
document.querySelector("h1").addEventListener("click", function () {
  this.style.color = "blue";
});
//sets the color of the first element in the set of matched elements to blue, in this case the first 'h1' element

document.addEventListener("keypress", function (event) {
  document.querySelector("h1").textContent = event.key;
});
//sets the text content of the first element in the set of matched elements to the key pressed anywhere in the document, in this case the text content of the first 'h1' element

document.querySelector("input").addEventListener("keypress", function (event) {
  console.log(event.key);
});
//logs to the console the key pressed in the first element in the set of matched elements, in this case the first 'input' element 

```
<br>

<span style="display:block;"> **js with jQuery** </span>

```js
$(document).keypress(function (event) {
  $("h1").text(event.key);
});
//sets the text content of each element in the set of matched elements to the key pressed anywhere in the document, in this case the text content all 'h1' elements

$("h1").click(function () {
  $("h1").css("color", "blue");
});
//sets the color of each element in the set of matched elements to blue, in this case all 'h1' elements

$("input").keypress(function (event) {
 console.log(event.key);
});
//logs to the console the key pressed in each element in the set of matched elements, in this case all 'input' elements


//Alternatives using the on() method:
$(document).on("keypress", function (event) {
  $("h1").text(event.key);
});

$("h1").on("click", function () {
  $("h1").css("color", "blue");
});

$("input").on("click", function (event) {
 console.log(event.key);
});

//the on() method attaches an event handler function for one or more events to the selected elements

```
<span style="display:block;"> **Comments** </span> 

- When referring to `document` in `jQuery`, you do not need quotation marks, as you instead do need for element selectors: 
  - `$(document)`
  - `$("h1")`
  - `$(".class")`
  - `$("#id")`







## **jQuery Specific Code**

```js
$("p").css("color");
//queries the color of the selected elements and returns an RGB value in this case. 

$("p").hasClass("yetAnotherClass");
//queries if the selected elements have the corresponding class and returns a boolean value

$("h1").before("<button>New button</button>");
//inserts content, specified by the parameter, before each element in the set of matched elements, for instance: <button>New button</button><h1>Header</h1>

$("h1").after("<button>New button</button>");
//inserts content, specified by the parameter, after each element in the set of matched elements, for instance: <h1>Header</h1><button>New button</button>

$("h1").prepend("<button>New Button</button>");
//inserts content, specified by the parameter, to the beginning of each element in the set of matched elements, for instance: <h1><button>New button</button>Header</h1>

$("h1").append("<button>New Button</button>");
//inserts content, specified by the parameter, to the end of each element in the set of matched elements, for instance: <h1>Header<button>New button</button></h1>

$("button").remove();
//removes the set of matched elements from the DOM, in this case, all the buttons on the page

$("h1").hide();
//hides the matched elements, in this case, all 'h1' elements

$("h1").show();
//displays the matched elements, in this case, all 'h1' elements

$("h1").toggle();
//displays or hides the matched elements, in this case, all 'h1' elements

$("h1").fadeOut();
//hides the matched elements by fading them to transparent, in this case, all 'h1' elements

$("h1").fadeIn();
//displays the matched elements by fading them to opaque, in this case, all 'h1' elements

$("h1").fadeToggle();
//displays or hides the matched elements by animating their opacity, in this case, all 'h1' elements

$("h1").slideUp();
//hides the matched elements with a sliding motion, in this case, all 'h1' elements

$("h1").slideDown();
//displayes the matched elements with a sliding motion, in this case, all 'h1' elements

$("h1").slideToggle();
//hides and displayes the matched elements with a sliding motion, in this case, all 'h1' elements


//Animate() method
$("h1").animate({opacity: 0.5});
//performs a custom animation of a set of CSS properties, in this case it makes transition the opacity of all matched elements to 0.5

$("h1").animate({margin: "20px"});
$("h1").animate({margin: "4rem"});
$("h1").animate({margin: "20%"});
//performs a custom animation of a set of CSS properties, in this case it makes transition the margin of all matched elemnts to 20px/4rem/20% 

$("h1").animate({fontSize: "4rem"});
//performs a custom animation of a set of CSS properties, in this case it makes transition the font size of all matched elemnts to 4rem


//Chain methods (will be performed in succession)
$("h1").slideUp().slideDown().animate({fontSize: "4rem"});
//all matched elements will firstly be hidden in a sliding motion, then dispalayed with a same kind of motion and then their font size will transition to 4rem

$("h1").slideUp().slideDown().animate({opacity: 0.5});
//all matched elements will firstly be hidden in a sliding motion, then dispalayed with a same kind of motion and then their opacity will transition to 0.5

$("h1").fadeIn(100).fadeOut(100).fadeIn(100);
//all matched elements will quickly flash
```

<span style="display:block;"> **Comments** </span> 
- You can only use the `animate()` method with CSS properties that take a number as value. In case you have to add the unit values (%, rem, px), type the whole thing between quotation marks: `"4rem"`, `"20px"`, `"20%"`






## **Quick tips**
- How to add jQuery to your html: `<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"></script>`. Add jQuery at the end of the body, right before your own js script line. If you use jQuery syntax in your own script, you have to make sure that the browser has loaded the library first.

