# JAVASCRIPT & POWERSHELL #

- [JAVASCRIPT \& POWERSHELL](#javascript--powershell)
  - [**Declare and modify a variable/array**](#declare-and-modify-a-variablearray)
  - [**Write output with first letter capitalised**](#write-output-with-first-letter-capitalised)
  - [**Examples of function with a single parameter: getMilk**](#examples-of-function-with-a-single-parameter-getmilk)
  - [**Examples of function with a single parameter: getTimeLeft**](#examples-of-function-with-a-single-parameter-gettimeleft)
  - [**Example of function with multiple parameters: getBmi**](#example-of-function-with-multiple-parameters-getbmi)
  - [**Math Functions: Math.Round()**](#math-functions-mathround)
  - [**Math Functions: Math.Floor()**](#math-functions-mathfloor)
  - [**Math Functions: Math.random()**](#math-functions-mathrandom)
  - [**Equal Operators**](#equal-operators)
  - [**Example of function with parameter: getLeapYear**](#example-of-function-with-parameter-getleapyear)
  - [**Objects \& Constructor Functions: HelpdeskAgent**](#objects--constructor-functions-helpdeskagent)
  - [**NewSec**](#newsec)
  - [**Tips**](#tips)
    - [**PowerShell: Difference between `Write-Output` and `Write-Host`**](#powershell-difference-between-write-output-and-write-host)





## **Declare and modify a variable/array**

<span style="display:block;"> **PowerShell** </span>

```ps1
#String variable
$name = "Andrea"
$name = "Giovanni" 

#String array
$buttonColors = ("green", "red", "yellow", "blue")
$buttonColors = ("green", "red", "yellow", "purple")
```

<span style="display:block;"> **JavaScript** </span>

```js
//String variable
let myName = "Andrea";
myName = "Giovanni";

//String array
let buttonColors = ["green", "red", "yellow", "blue"];
buttonColors = ["green", "red", "yellow", "purple"];
```

<span style="display:block;"> **Comments** </span> 

- Every line in **JavaScript** ends with <strong>;</strong> 
- Variables can be declared with either `var`, `let` or `const`. I will use `let` in all my notes.






## **Write output with first letter capitalised** 

<span style="display:block;"> **PowerShell** </span>

```ps1
$name = Read-Host "Type your name here"
$len = $name.Length - 1
$firstCharacter = ($name.Substring(0, 1)).ToUpper()
$restofCharacters = ($name.Substring(1, $len)).ToLower()
Write-Output "Your name is $firstCharacter$restofCharacters" 
```

<span style="display:block;"> **JavaScript** </span>

```js
let yourName = window.prompt("Type your name here:");
let firstCharacter = (yourName.slice(0,1)).toUpperCase();
let restOfCharacters = (yourName.slice(1,yourName.length).toLowerCase());
alert("Your name is " + firstCharacter + restOfCharacters);
```

<span style="display:block;"> **Comments** </span> 
`Read-Host` prompts user for input directly in the Shell, whereas the **JavaScript** `prompt()` or `window.prompt()` methods prompt the user to type an input in a browser prompt window





## **Examples of function with a single parameter: getMilk**

<span style="display:block;"> **PowerShell** </span>

```ps1

function Get-Milk {
    #cost of a bottle of milk is 1.5$
    [CmdletBinding()]
    param (
        [Parameter(Mandatory = $true)]
        [string]
        $Money
    )
    $bottles = [math]::Floor($money / 1.5);
    Write-Output "With $money dollars, you can buy $bottles bottles of milk"
}

Get-Milk -Money 11

###OR###

function Get-Milk($money) {
    #cost of a bottle of milk is 1.5$
    
    $bottles = [math]::Floor($money / 1.5);
    Write-Output "With $money dollars, you can buy $bottles bottles of milk"
}

Get-Milk(11)
```

<span style="display:block;"> **JavaScript** </span>

```js
function getMilk(money) {
    //cost of a bottle of milk is 1.5$
    let bottles = Math.floor(money / 1.5);
    return console.log("With " + money + " dollars, you can buy " + bottles + " bottles of milk");
  }
  
  getMilk(11);
```
<span style="display:block;"> **Comments** </span> 
Output: `With 11 dollars, you can buy 7 bottles of milk` 
In both PowerShell and JavaScript, we have to use the `[math]::Floor()` and `Math.floor()` functions to round up the result to an integer, a whole number and not a float (for instance 7,33333).








## **Examples of function with a single parameter: getTimeLeft**

<span style="display:block;"> **PowerShell** </span>

```ps1
function Get-TimeLeft {
    #how many days, weeks and months left until getting 90 years old
    #output: You have x days, y weeks and z months left
    [CmdletBinding()]
    param (
        [Parameter(Mandatory = $true)]
        [string]
        $Age
    )

    $remainingYears = 90 - $Age
    $days = $remainingYears * 365
    $weeks = $remainingYears * 52
    $months = $remainingYears * 12

    Write-Output "You have $days days, $weeks weeks and $months months left"
}

Get-TimeLeft -Age 34

###OR###

function Get-TimeLeft($Age) {
    #how many days, weeks and months left until getting 90 years old
    #output: You have x days, y weeks and z months left

    $remainingYears = 90 - $Age
    $days = $remainingYears * 365
    $weeks = $remainingYears * 52
    $months = $remainingYears * 12

    Write-Output "You have $days days, $weeks weeks and $months months left"
}

Get-TimeLeft(34)

```

<span style="display:block;"> **JavaScript** </span>

```js
function getTimeLeft(age){
//how many days, weeks and months left until getting 90 years old
//output: You have x days, y weeks and z months left

let remainingYears = 90 - age;
let days = remainingYears * 365;
let weeks = remainingYears * 52;
let months = remainingYears * 12;

console.log("You have " + days + " days, " + weeks + " weeks and " + months + " months left")

}

getTimeLeft(34);

```

<span style="display:block;"> **Comments** </span> 

Output: `You have 20440 days, 2912 weeks and 672 months left`






## **Example of function with multiple parameters: getBmi**

<span style="display:block;"> **PowerShell** </span>

```ps1
function Get-Bmi {
    [CmdletBinding()]
    param (
        [Parameter(Mandatory = $true)]$Weight,
        [Parameter(Mandatory = $true)]$Height
    )
    
    $bmi = $weight / [Math]::Pow($height, 2)
    $bmi = [Math]::Round($bmi)
    Write-Output "Your BMI is $bmi"
}

Get-Bmi -Weight 78 -Height 1.74

###OR###

function Get-Bmi([float]$Weight, [float]$Height){
    $bmi = $weight / [math]::Pow($height, 2)
    $bmi = [math]::Round($bmi)
    Write-Output "Your BMI is $bmi"
}

Get-Bmi -Weight 78 -Height 1.74
```

<span style="display:block;"> **JavaScript** </span>

```js
function getBmi(weight, height) {
  let bmi = weight / Math.pow(height, 2);
  bmi = Math.round(bmi);
  let interpretation;

  if (bmi < 18.5) {
    interpretation = "Your BMI is " + bmi + ", so you are underweight.";
  } else if (bmi > 18.5 && bmi < 24.9) {
    interpretation = "Your BMI is " + bmi + ", so you have a normal weight.";
  } else {
    interpretation = "Your BMI is " + bmi + ", so you are overweight.";
  }

  return console.log(interpretation);
}

getBmi(78, 1.74);
```

<span style="display:block;"> **Comments** </span> 

Output: `Your BMI is 26`

- Both in PowerShell and JavaScript, we use the `function` keyword to define a function followed by a function name.
- In PowerShell, we use the `Write-Output` cmdlet to print a message to the console, while in JavaScript, we use the `console.log` method.
- In PowerShell, we use the `[float]` type specifier to indicate that the `$weight` and `$height` parameters should be treated as floating-point numbers, while in JavaScript, the `weight` and `height` parameters are treated as floating-point numbers by default.
- In PowerShell, we use the `[math]::Pow` static method to perform the exponentiation operation, while in JavaScript, we use the `Math.pow` method.
- In PowerShell, we use the `[math]::Round` static method to round a number to the nearest whole number, while in JavaScript, we use the `Math.round` method.
- In PowerShell, we use named parameter syntax to specify the values of the function arguments, while in JavaScript, we use positional argument syntax.






## **Math Functions: Math.Round()**

<span style="display:block;"> **PowerShell** </span>

```ps1
$float76 = 7.6
$float76 = [math]::Round($float76)

$float74 = 7.4
$float74 = [math]::Round($float74)

Write-Output "Float 7.6 becomes $float76"
Write-Output "Float 7.4 becomes $float74"
```

<span style="display:block;"> **JavaScript** </span>

```js
let float76 = 7.6;
float76 = Math.round(float76);

let float74 = 7.4;
float74 = Math.round(float74);

console.log("Float 7.6 becomes " + float76);
console.log("Float 7.4 becomes " + float74);
```

<span style="display:block;"> **Comments** </span> 

Output: `Float 7.6 becomes 8` and `Float 7.4 becomes 7`






## **Math Functions: Math.Floor()**

<span style="display:block;"> **PowerShell** </span>

```ps1
$float76 = 7.6
$float76 = [math]::Floor($float76)

$float74 = 7.4
$float74 = [math]::Floor($float74)

Write-Output "Float 7.6 becomes $float76"
Write-Output "Float 7.4 becomes $float74"
```

<span style="display:block;"> **JavaScript** </span>

```js
let float76 = 7.6;
float76 = Math.floor(float76);

let float74 = 7.4;
float74 = Math.floor(float74);

console.log("Float 7.6 becomes " + float76);
console.log("Float 7.4 becomes " + float74);
```

<span style="display:block;"> **Comments** </span> 

Output: `Float 7.6 becomes 7` and `Float 7.4 becomes 7`










## **Math Functions: Math.random()**

<span style="display:block;"> **PowerShell** </span>

```ps1
function Get-RandomDiceNumber{
$randomDiceNumber = Get-Random -Minimum 1 -Maximum 12
Write-Output "The random dice number is $randomDiceNumber"
}

function Get-RandomPercentage{
$randomPercentage = Get-Random -Minimum 1 -Maximum 100
Write-Output "The random percentage is $randomPercentage%"
}

Get-RandomDiceNumber
Get-RandomPercentage
```

<span style="display:block;"> **JavaScript** </span>

```js
function getRandomPercentage(){
  let rn1 = Math.random();
  //the math.random() function generate a random float number between 0 and 1 (not included)
  let randomPercentage = Math.floor(rn1 * 100) + 1; 
  //the math.floor() rounds up the float number to a whole one. In order to get the range that we want (1 to 100), we multiply by that range and then we add one, if not we would have a range of 0 to 99
  return console.log("The random percentage is " + randomPercentage + "%");
  }
  
getRandomPercentage();
  
  
function getRandomDiceNumber(){
  let rn2 = Math.random();
  //the math.random() function generate a random float number between 0 and 1 (not included)
  let randomDiceNumber = Math.floor(rn2 * 12) + 1; 
  //the math.floor() rounds up the float number to a whole one. In order to get the range that we want (1 to 12, we multiply by that range and then we add one, if not we would have a range of 0 to 11
  return console.log("The random dice number is " + randomDiceNumber);
  }
  
getRandomDiceNumber();
```

<span style="display:block;"> **Comments** </span> 
PowerShell already has a set up CmdLet for this therefore we do not have to write the function from scratch as we did with JavaScript






## **Equal Operators**

<span style="display:block;"> **PowerShell** </span>

```ps1
```

<span style="display:block;"> **JavaScript** </span>

```js
let a = 1;
let b = "1";

console.log("Variable 'a' is a " + typeof(a));
console.log("Variable 'b' is a " + typeof(b));

//EQUAL OPERATOR
//The triple equal sign operator verify that both sides of the statement are equal for both value and data type
if(a === b){
    console.log("Triple equal sign - 'a' is equal to 'b' for both its value and data type")
} else {
    console.log("Triple equal sign - 'a' is not equal to 'b' for either its value or data type")
}

//The double equal sign operator verify that both sides of the statement have the same value. It does not care about the data type
if(a == b){
    console.log("Double equal sign - 'a' is equal to 'b' for its value")
} else {
    console.log("Double equal sign - 'a' is not equal to 'b' for its value")
}


//NOT EQUAL OPERATOR
//The NOT plus double equal sign verifies that both sides of the statement are NOT equal for both value and data type
if(a !== b){
    console.log("NOT plus double equal sign - 'a' is not equal to 'b' for both its value and data type")
} else {
    console.log("NOT plus double equal sign - 'a' is equal to 'b' for either its value or data type")
}

//The NOT plus double equal sign verifies that both sides of the statement are NOT equal for their value. It does not care about the data type
if(a != b){
    console.log("NOT plus equal sign - 'a' is not equal to 'b' for its value")
} else {
    console.log("NOT plus equal sign - 'a' is equal to 'b' for its value")
}

```

<span style="display:block;"> **Comments** </span> 






## **Example of function with parameter: getLeapYear**

<span style="display:block;"> **PowerShell** </span>

```ps1
```

<span style="display:block;"> **JavaScript** </span>

```js
function getLeapYear(year) {
  if (year % 4 === 0) {
    if (year % 100 === 0) {
      if (year % 400 === 0) {
        return console.log("Leap year.");
      } else {
        return console.log("Not leap year.");
      }
    } else {
      return console.log("Leap year.");
    }
  } else {
    return console.log("Not leap year.");
  }
}

getLeapYear(240);
```

<span style="display:block;"> **Comments** </span> 
Output: `Leap year.`







## **Objects & Constructor Functions: HelpdeskAgent**

<span style="display:block;"> **PowerShell** </span>

```ps1
Class HelpdeskAgent {
    [string]$fullName
    [string[]]$languages
    [bool]$hasWorkPermit
    [int]$age
    [int]$yearsOfExperience
    
    HelpdeskAgent([string]$fullName, [string[]]$languages, [bool]$hasWorkPermit, [int]$age, [int]$yearsOfExperience) {
        $this.fullName = $fullName
        $this.languages = $languages
        $this.hasWorkPermit = $hasWorkPermit
        $this.age = $age
        $this.yearsOfExperience = $yearsOfExperience
    }
    
    [void]alertCaller() {
        Write-Host "Good morning, this is $($this.fullName) from Helpdesk Agents Inc. I can help you in $($this.languages -join ', '). How can I help you?"
    }
}

# We can create instances of the HelpdeskAgent class by calling its constructor function
$helpdeskAgent1 = [HelpdeskAgent]::new("Jon Doe", @("English","French","Spanish"), $true, 25, 3)

$helpdeskAgent1
#returns all the properties of the corresponding object, in a hash table

$helpdeskAgent1.fullName
#returns 'Jon Doe'

$helpdeskAgent1.languages
#returns 'English', 'French', 'Spanish'

$helpdeskAgent1.hasWorkPermit
#returns true

$helpdeskAgent1.age
#returns 25

$helpdeskAgent1.yearsOfExperience
#returns 3

$helpdeskAgent1.alertCaller()
#returns an alert with the following text: Good morning, this is Jon Doe from Helpdesk Agents Inc. I can help you in French,English,Spanish. How can I help you?

# In PowerShell, we can use the GetType() method to get the type of an object or a value
$helpdeskAgent1.fullName.GetType().Name
# returns 'String'

$helpdeskAgent1.languages.GetType().Name
# returns 'String[]' - array

$helpdeskAgent1.hasWorkPermit.GetType().Name
# returns 'Boolean'

$helpdeskAgent1.age.GetType().Name
# returns 'Int32'

$helpdeskAgent1.yearsOfExperience.GetType().Name
# returns 'Int32'

$helpdeskAgent1.alertCaller.GetType().Name
# returns 'PSMethod' -function
```
<br>

<span style="display:block;"> **JavaScript** </span>

```js
function HelpdeskAgent (fullName, languages, hasWorkPermit, age, yearsOfExperience){
    this.fullName = fullName;
    this.languages = languages;
    this.hasWorkPermit = hasWorkPermit;
    this.age = age;
    this.yearsOfExperience = yearsOfExperience;
    this.alertCaller = function(){
        alert("Good morning, this is " + fullName + " from Helpdesk Agents Inc. I can help you in " + languages + ". How can I help you?")
    }
}

//we can add properties and methods as you can see in the constructor function above. Methods are nothing but function assigned to objects

let helpdeskAgent1 = new HelpdeskAgent("Jon Doe",["English","French","Spanish"],true,25,3);

//We can than query the object and the single properties using the dot notation, .property:
helpdeskAgent1
//returns all the properties of the corresponding object, in this case: HelpdeskAgent {fullName: 'Jon Doe', languages: Array(3), hasWorkPermit: true, age: 25, yearsOfExperience: 3}

helpdeskAgent1.fullName
//returns 'Jon Doe'

helpdeskAgent1.languages
//returns (3) ['English', 'French', 'Spanish']

helpdeskAgent1.hasWorkPermit
//returns true

helpdeskAgent1.age
//returns 25

helpdeskAgent1.yearsOfExperience
//returns 3

helpdeskAgent1.alertCaller();
//returns an alert with the following text: Good morning, this is Jon Doe from Helpdesk Agents Inc. I can help you in French,English,Spanish. How can I help you?


//We can also query the value type with the typeof() function - the value type depends on our input
typeof(helpdeskAgent1.fullName)
//returns 'string'

typeof(helpdeskAgent1.languages)
//returns 'object'

typeof(helpdeskAgent1.hasWorkPermit)
//returns 'boolean'

typeof(helpdeskAgent1.age)
//returns 'number'

typeof(helpdeskAgent1.yearsOfExperience)
//returns 'number'

typeof(helpdeskAgent1.alertCaller)
//returns 'function'

```

<span style="display:block;"> **Comments** </span> 
- A constructor function in JavaScript always starts with an uppercase letter to distinguish them from normal functions.





## **NewSec**

<span style="display:block;"> **PowerShell** </span>

```ps1
```

<span style="display:block;"> **JavaScript** </span>
```js
```

<span style="display:block;"> **Comments** </span> 



## **Tips**

### **PowerShell: Difference between `Write-Output` and `Write-Host`**

In PowerShell, `Write-Output` and `Write-Host` are two cmdlets that are used to print messages to the console. The main difference between the two cmdlets is that `Write-Output` returns the output as an object, while `Write-Host` directly writes the output to the console without returning any objects.

This means that when you use `Write-Output`, you can use the output of the cmdlet as input for another cmdlet or command. For example, you could pipe the output of `Write-Output` to another cmdlet to perform further processing on the output. In contrast, when you use `Write-Host`, the output cannot be used as input for another cmdlet or command.

Another difference between the two cmdlets is that `Write-Host` allows you to specify the foreground and background colors of the output text, using the `-ForegroundColor` and `-BackgroundColor` parameters. `Write-Output` does not have these parameters, so you cannot change the colors of the output text.

In general, it is recommended to use `Write-Output` instead of `Write-Host` unless you have a specific need for the additional features provided by `Write-Host`. Using `Write-Output` makes your scripts more flexible and easier to work with, since you can use the output of the cmdlet in other parts of your script.


