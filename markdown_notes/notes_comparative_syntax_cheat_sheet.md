# 🧠 Comparative Syntax Cheat Sheet

### Python · JavaScript · TypeScript · PowerShell

> Based on the _100 Days of Code – Complete Professional Python Bootcamp_ cheat sheet from The App Brewery. Original pdf can be found here at this public repo: https://github.com/pathilink/TheAppBrewery/blob/main/Python%2BSyntax%2BCheat%2BSheet%2BBooklet.pdf  
> Each concept shows equivalent syntax across all four languages.

---

**📑 Table of Contents**

- [1. Basics](#1-basics)
- [2. Data Types](#2-data-types)
- [3. Type Conversion \& Checking](#3-type-conversion--checking)
- [4. Maths \& Operators](#4-maths--operators)
- [5. Errors](#5-errors)
- [6. Functions](#6-functions)
- [7. Conditionals](#7-conditionals)
- [8. Loops](#8-loops)
- [9. Lists / Arrays](#9-lists--arrays)
- [10. Built-in Functions](#10-built-in-functions)
- [11. Modules / Imports](#11-modules--imports)
- [12. Classes \& Objects](#12-classes--objects)

---

## 1. Basics

### Print to Console

> Outputs a value to the console/terminal.

| Language  | Snippet                      |
| --------- | ---------------------------- |
| 🐍 Python | `print("Hello World")`       |
| 🌐 JS     | `console.log("Hello World")` |
| 🔷 TS     | `console.log("Hello World")` |
| 💠 PS     | `Write-Host "Hello World"`   |

```python
# Python
print("Hello World")
```

```javascript
// JavaScript
console.log("Hello World");
```

```typescript
// TypeScript
console.log("Hello World");
```

```powershell
# PowerShell
Write-Host "Hello World"
```

---

### User Input

> Prompts the user for input.

```python
# Python
name = input("What's your name? ")
```

```javascript
// JavaScript (Node.js with readline)
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question("What's your name? ", (name) => {
  rl.close();
});
```

```typescript
// TypeScript (Node.js with readline)
import * as readline from "readline";
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
rl.question("What's your name? ", (name: string) => {
  rl.close();
});
```

```powershell
# PowerShell
$name = Read-Host "What's your name?"
```

---

### Comments

> Lines ignored by the interpreter/compiler — for human readers only.

```python
# Python — single line comment
# This is a comment
print("This is code")

"""
This is a
multi-line comment
"""
```

```javascript
// JavaScript — single & multi-line
// This is a comment
console.log("This is code");

/*
  This is a
  multi-line comment
*/
```

```typescript
// TypeScript — same as JavaScript
// This is a comment
console.log("This is code");

/*
  This is a
  multi-line comment
*/
```

```powershell
# PowerShell — single & multi-line
# This is a comment
Write-Host "This is code"

<#
  This is a
  multi-line comment
#>
```

---

### Variables

> Named containers for storing data values.

```python
# Python — no declaration keyword needed
my_name = "Andrea"
my_age = 12
```

```javascript
// JavaScript — use let or const
let myName = "Andrea";
let myAge = 12;
const PI = 3.14; // immutable
```

```typescript
// TypeScript — typed variables
let myName: string = "Andrea";
let myAge: number = 12;
const PI: number = 3.14;
```

```powershell
# PowerShell — prefix with $
$myName = "Andrea"
$myAge = 12
```

---

### The += Operator

> Adds a value to the existing variable and stores the result back.

```python
# Python
my_age = 12
my_age += 4
# my_age is now 16
```

```javascript
// JavaScript
let myAge = 12;
myAge += 4;
// myAge is now 16
```

```typescript
// TypeScript
let myAge: number = 12;
myAge += 4;
// myAge is now 16
```

```powershell
# PowerShell
$myAge = 12
$myAge += 4
# $myAge is now 16
```

---

## 2. Data Types

### Integers

> Whole numbers with no decimal point.

```python
# Python
my_number = 354
type(my_number)  # <class 'int'>
```

```javascript
// JavaScript — no separate int type, all numbers are float64
let myNumber = 354;
typeof myNumber; // "number"
```

```typescript
// TypeScript
let myNumber: number = 354;
```

```powershell
# PowerShell
[int]$myNumber = 354
$myNumber.GetType().Name  # Int32
```

---

### Floating Point Numbers

> Numbers with decimal places.

```python
# Python
my_float = 3.14159
type(my_float)  # <class 'float'>
```

```javascript
// JavaScript
let myFloat = 3.14159;
typeof myFloat; // "number"
```

```typescript
// TypeScript
let myFloat: number = 3.14159;
```

```powershell
# PowerShell
[double]$myFloat = 3.14159
$myFloat.GetType().Name  # Double
```

---

### Strings

> A sequence of characters surrounded by quotes.

```python
# Python — single or double quotes
my_string = "Hello"
my_string2 = 'World'
```

```javascript
// JavaScript — single, double, or template literals
let myString = "Hello";
let myString2 = "World";
let myString3 = `Hello World`; // template literal
```

```typescript
// TypeScript
let myString: string = "Hello";
let myString3: string = `Hello World`;
```

```powershell
# PowerShell — double quotes allow variable expansion
$myString = "Hello"
$myString2 = 'World'  # literal, no expansion
```

---

### String Concatenation

> Joining two or more strings together.

```python
# Python
result = "Hello" + "Andrea"
# becomes "HelloAngela"
```

```javascript
// JavaScript
let result = "Hello" + "Andrea";
// or with template literals:
let name = "Andrea";
let result2 = `Hello${name}`;
```

```typescript
// TypeScript
let result: string = "Hello" + "Andrea";
let name: string = "Andrea";
let result2: string = `Hello${name}`;
```

```powershell
# PowerShell
$result = "Hello" + "Andrea"
# or with variable expansion in double quotes:
$name = "Andrea"
$result2 = "Hello$name"
```

---

### Escaping a String

> Using a backslash to include special characters inside a string.

```python
# Python
speech = "She said: \"Hi\""
print(speech)
# prints: She said: "Hi"
```

```javascript
// JavaScript
let speech = 'She said: "Hi"';
console.log(speech);
// or use single quotes to avoid escaping:
let speech2 = 'She said: "Hi"';
```

```typescript
// TypeScript
let speech: string = 'She said: "Hi"';
let speech2: string = 'She said: "Hi"';
```

```powershell
# PowerShell — use backtick ` to escape, or single-quote the whole string
$speech = "She said: `"Hi`""
Write-Host $speech
# or:
$speech2 = 'She said: "Hi"'
```

---

## 3. Type Conversion & Checking

### Converting Data Types

> Casting a value from one type to another.

```python
# Python
n = 354
new_n = float(n)   # 354.0
s = str(n)         # "354"
i = int("42")      # 42
```

```javascript
// JavaScript
let n = 354;
let newN = parseFloat(n); // 354
let s = String(n); // "354"  or n.toString()
let i = parseInt("42"); // 42
let f = parseFloat("3.14"); // 3.14
Number("42"); // 42 — generic conversion
```

```typescript
// TypeScript (same as JS, but with type safety)
let n: number = 354;
let s: string = String(n); // "354"
let i: number = parseInt("42"); // 42
let f: number = parseFloat("3.14");
```

```powershell
# PowerShell
$n = 354
$newN = [double]$n      # 354.0
$s = [string]$n         # "354"
$i = [int]"42"          # 42
# or:
$i2 = [System.Convert]::ToInt32("42")
```

---

### Checking Data Types

> Inspecting the type of a variable at runtime.

```python
# Python
n = 3.14159
type(n)          # <class 'float'>
isinstance(n, float)  # True
```

```javascript
// JavaScript
let n = 3.14159;
typeof n; // "number"
n instanceof Number; // false (primitive vs object)
Array.isArray([]); // true
```

```typescript
// TypeScript — type narrowing
function check(val: string | number) {
  if (typeof val === "string") {
    console.log("It's a string");
  }
}
```

```powershell
# PowerShell
$n = 3.14159
$n.GetType()          # Double
$n -is [double]       # True
$n -is [int]          # False
```

---

### F-Strings / Template Literals / String Interpolation

> Embedding variable values directly inside a string.

```python
# Python (f-strings, Python 3.6+)
days = 365
print(f"There are {days} days in a year")
```

```javascript
// JavaScript (template literals)
const days = 365;
console.log(`There are ${days} days in a year`);
```

```typescript
// TypeScript (template literals)
const days: number = 365;
console.log(`There are ${days} days in a year`);
```

```powershell
# PowerShell (double-quoted strings with $ expansion)
$days = 365
Write-Host "There are $days days in a year"
# or with expressions:
Write-Host "Result: $(2 + 2)"
```

---

## 4. Maths & Operators

### Arithmetic Operators

> Standard mathematical operations.

| Operation | Python   | JS / TS             | PowerShell             |
| --------- | -------- | ------------------- | ---------------------- |
| Add       | `3 + 2`  | `3 + 2`             | `3 + 2`                |
| Subtract  | `4 - 1`  | `4 - 1`             | `4 - 1`                |
| Multiply  | `2 * 3`  | `2 * 3`             | `2 * 3`                |
| Divide    | `5 / 2`  | `5 / 2`             | `5 / 2`                |
| Exponent  | `5 ** 2` | `5 ** 2`            | `[Math]::Pow(5, 2)`    |
| Floor div | `5 // 2` | `Math.floor(5 / 2)` | `[Math]::Floor(5 / 2)` |

```python
# Python
3 + 2   # 5  — Add
4 - 1   # 3  — Subtract
2 * 3   # 6  — Multiply
5 / 2   # 2.5 — Divide
5 ** 2  # 25 — Exponent
5 // 2  # 2  — Floor division
```

```javascript
// JavaScript / TypeScript
3 + 2; // 5
4 - 1; // 3
2 * 3; // 6
5 / 2; // 2.5
5 ** 2; // 25
Math.floor(5 / 2); // 2
```

```powershell
# PowerShell
3 + 2                    # 5
4 - 1                    # 3
2 * 3                    # 6
5 / 2                    # 2.5
[Math]::Pow(5, 2)        # 25
[Math]::Floor(5 / 2)     # 2
```

---

### The Modulo Operator

> Returns the remainder after division. Useful for even/odd checks.

```python
# Python
5 % 2   # result is 1
4 % 2   # result is 0 (even)
```

```javascript
// JavaScript / TypeScript
5 % 2; // 1
4 % 2; // 0
```

```powershell
# PowerShell
5 % 2   # 1
4 % 2   # 0
```

---

## 5. Errors

### Common Error Types

> Runtime and syntax errors you'll encounter.

| Error              | Python              | JS / TS            | PowerShell                    |
| ------------------ | ------------------- | ------------------ | ----------------------------- |
| Undefined variable | `NameError`         | `ReferenceError`   | `Cannot bind argument`        |
| Divide by zero     | `ZeroDivisionError` | Returns `Infinity` | `Attempted to divide by zero` |
| Wrong syntax       | `SyntaxError`       | `SyntaxError`      | `ParseException`              |

```python
# Python — NameError
my_number = 4
my_Number + 2
# NameError: name 'my_Number' is not defined
```

```javascript
// JavaScript — ReferenceError
let myNumber = 4;
myNumBer + 2;
// ReferenceError: myNumBer is not defined
```

```typescript
// TypeScript — caught at compile time!
let myNumber: number = 4;
// myNumBer + 2; // TS Error: Cannot find name 'myNumBer'
```

```powershell
# PowerShell — undefined variable returns $null (no error by default)
$myNumber = 4
$myNumBer + 2   # returns 2 (null treated as 0)
# Enable strict mode to catch this:
Set-StrictMode -Version Latest
```

---

### Zero Division Error

```python
# Python
5 % 0
# ZeroDivisionError: integer division or modulo by zero
```

```javascript
// JavaScript — does NOT throw! Returns Infinity or NaN
5 / 0; // Infinity
0 / 0; // NaN
```

```typescript
// TypeScript — same runtime behaviour as JavaScript
5 / 0; // Infinity
```

```powershell
# PowerShell — throws a terminating error
5 / 0
# Attempted to divide by zero.
```

---

### Syntax Error

```python
# Python
print(12 + 4))
# SyntaxError: unmatched ')'
```

```javascript
// JavaScript
console.log(12 + 4))
// SyntaxError: Unexpected token ')'
```

```typescript
// TypeScript — caught by compiler before runtime
```

```powershell
# PowerShell
Write-Host (12 + 4))
# ParserError: Unexpected token ')'
```

---

## 6. Functions

### Creating a Function

> Defining a reusable block of code.

```python
# Python — def keyword, indentation matters
def my_function():
    print("Hello")
```

```javascript
// JavaScript — function keyword or arrow function
function myFunction() {
  console.log("Hello");
}
// Arrow function:
const myFunction2 = () => console.log("Hello");
```

```typescript
// TypeScript — same as JS with optional return type annotation
function myFunction(): void {
  console.log("Hello");
}
const myFunction2 = (): void => console.log("Hello");
```

```powershell
# PowerShell — function keyword
function My-Function {
    Write-Host "Hello"
}
```

---

### Calling a Function

> Triggering the function to execute.

```python
# Python
my_function()
my_function()   # runs twice
```

```javascript
// JavaScript
myFunction();
myFunction(); // runs twice
```

```typescript
// TypeScript
myFunction();
myFunction();
```

```powershell
# PowerShell
My-Function
My-Function   # runs twice
```

---

### Functions with Inputs (Parameters)

> Passing values into a function so it can act on them.

```python
# Python
def add(n1, n2):
    print(n1 + n2)

add(2, 3)   # prints 5
```

```javascript
// JavaScript
function add(n1, n2) {
  console.log(n1 + n2);
}
add(2, 3); // 5
```

```typescript
// TypeScript — typed parameters
function add(n1: number, n2: number): void {
  console.log(n1 + n2);
}
add(2, 3);
```

```powershell
# PowerShell
function Add-Numbers {
    param([int]$n1, [int]$n2)
    Write-Host ($n1 + $n2)
}
Add-Numbers -n1 2 -n2 3
```

---

### Functions with Outputs (Return)

> Returning a computed value from a function.

```python
# Python
def add(n1, n2):
    return n1 + n2

result = add(2, 3)   # result = 5
```

```javascript
// JavaScript
function add(n1, n2) {
  return n1 + n2;
}
const result = add(2, 3); // 5
```

```typescript
// TypeScript
function add(n1: number, n2: number): number {
  return n1 + n2;
}
const result: number = add(2, 3);
```

```powershell
# PowerShell — functions return the last expression or use return
function Add-Numbers {
    param([int]$n1, [int]$n2)
    return $n1 + $n2
}
$result = Add-Numbers -n1 2 -n2 3
```

---

### Keyword Arguments / Named Parameters

> Calling a function by specifying parameter names explicitly.

```python
# Python
def divide(n1, n2):
    return n1 / n2

divide(10, 5)           # positional
divide(n2=5, n1=10)     # keyword (order doesn't matter)
```

```javascript
// JavaScript — no native keyword args; use an options object
function divide({ n1, n2 }) {
  return n1 / n2;
}
divide({ n2: 5, n1: 10 });
```

```typescript
// TypeScript
interface DivideArgs {
  n1: number;
  n2: number;
}
function divide({ n1, n2 }: DivideArgs): number {
  return n1 / n2;
}
divide({ n2: 5, n1: 10 });
```

```powershell
# PowerShell — parameters are named by default
function Divide-Numbers {
    param([double]$n1, [double]$n2)
    return $n1 / $n2
}
Divide-Numbers -n2 5 -n1 10   # order doesn't matter
```

---

### Variable Scope

> Variables defined inside a function don't exist outside it.

```python
# Python
n = 2
def my_function():
    n = 3
    print(n)  # 3

print(n)        # 2
my_function()   # 3
```

```javascript
// JavaScript
let n = 2;
function myFunction() {
  let n = 3; // local scope
  console.log(n); // 3
}
console.log(n); // 2
myFunction(); // 3
```

```typescript
// TypeScript
let n: number = 2;
function myFunction(): void {
  let n: number = 3;
  console.log(n); // 3
}
console.log(n); // 2
myFunction(); // 3
```

```powershell
# PowerShell — function scope is separate from global
$n = 2
function My-Function {
    $n = 3
    Write-Host $n  # 3
}
Write-Host $n    # 2
My-Function      # 3
```

---

## 7. Conditionals

### If Statement

> Executes a block of code only if the condition is true.

```python
# Python — indentation defines the block
n = 5
if n > 2:
    print("Larger than 2")
```

```javascript
// JavaScript — curly braces define the block
let n = 5;
if (n > 2) {
  console.log("Larger than 2");
}
```

```typescript
// TypeScript
let n: number = 5;
if (n > 2) {
  console.log("Larger than 2");
}
```

```powershell
# PowerShell
$n = 5
if ($n -gt 2) {
    Write-Host "Larger than 2"
}
```

---

### Else

> Runs when the `if` condition is false.

```python
# Python
age = 18
if age > 16:
    print("Can drive")
else:
    print("Don't drive")
```

```javascript
// JavaScript
let age = 18;
if (age > 16) {
  console.log("Can drive");
} else {
  console.log("Don't drive");
}
```

```typescript
// TypeScript
let age: number = 18;
if (age > 16) {
  console.log("Can drive");
} else {
  console.log("Don't drive");
}
```

```powershell
# PowerShell
$age = 18
if ($age -gt 16) {
    Write-Host "Can drive"
} else {
    Write-Host "Don't drive"
}
```

---

### Elif / Else If

> Adds additional conditional branches.

```python
# Python
weather = "sunny"
if weather == "rain":
    print("bring umbrella")
elif weather == "sunny":
    print("bring sunglasses")
elif weather == "snow":
    print("bring gloves")
```

```javascript
// JavaScript
let weather = "sunny";
if (weather === "rain") {
  console.log("bring umbrella");
} else if (weather === "sunny") {
  console.log("bring sunglasses");
} else if (weather === "snow") {
  console.log("bring gloves");
}
```

```typescript
// TypeScript
let weather: string = "sunny";
if (weather === "rain") {
  console.log("bring umbrella");
} else if (weather === "sunny") {
  console.log("bring sunglasses");
} else if (weather === "snow") {
  console.log("bring gloves");
}
```

```powershell
# PowerShell
$weather = "sunny"
if ($weather -eq "rain") {
    Write-Host "bring umbrella"
} elseif ($weather -eq "sunny") {
    Write-Host "bring sunglasses"
} elseif ($weather -eq "snow") {
    Write-Host "bring gloves"
}
```

---

### Logical Operators (and / or / not)

> Combining or inverting conditions.

| Operator | Python | JS / TS | PowerShell    |
| -------- | ------ | ------- | ------------- |
| And      | `and`  | `&&`    | `-and`        |
| Or       | `or`   | `\|\|`  | `-or`         |
| Not      | `not`  | `!`     | `-not` or `!` |

```python
# Python
s = 58
if s < 60 and s > 50:
    print("Your grade is C")

age = 12
if age < 16 or age > 200:
    print("Can't drive")

if not 3 > 1:
    print("something")  # won't print
```

```javascript
// JavaScript
let s = 58;
if (s < 60 && s > 50) console.log("Your grade is C");

let age = 12;
if (age < 16 || age > 200) console.log("Can't drive");

if (!(3 > 1)) console.log("something");
```

```typescript
// TypeScript
let s: number = 58;
if (s < 60 && s > 50) console.log("Your grade is C");

let age: number = 12;
if (age < 16 || age > 200) console.log("Can't drive");
```

```powershell
# PowerShell
$s = 58
if ($s -lt 60 -and $s -gt 50) { Write-Host "Your grade is C" }

$age = 12
if ($age -lt 16 -or $age -gt 200) { Write-Host "Can't drive" }

if (-not (3 -gt 1)) { Write-Host "something" }
```

---

### Comparison Operators

| Operation        | Python | JS / TS        | PowerShell |
| ---------------- | ------ | -------------- | ---------- |
| Greater than     | `>`    | `>`            | `-gt`      |
| Less than        | `<`    | `<`            | `-lt`      |
| Greater or equal | `>=`   | `>=`           | `-ge`      |
| Less or equal    | `<=`   | `<=`           | `-le`      |
| Equal to         | `==`   | `===` (strict) | `-eq`      |
| Not equal        | `!=`   | `!==` (strict) | `-ne`      |

> **JS/TS note**: Use `===` (strict equality) instead of `==` to avoid type coercion bugs.  
> **PS note**: String comparisons with `-eq` are case-insensitive by default; use `-ceq` for case-sensitive.

---

## 8. Loops

### While Loop

> Repeats as long as the condition remains true.

```python
# Python
n = 1
while n < 100:
    n += 1
```

```javascript
// JavaScript
let n = 1;
while (n < 100) {
  n += 1;
}
```

```typescript
// TypeScript
let n: number = 1;
while (n < 100) {
  n += 1;
}
```

```powershell
# PowerShell
$n = 1
while ($n -lt 100) {
    $n += 1
}
```

---

### For Loop

> Iterates over a sequence or range.

```python
# Python
all_fruits = ["apple", "banana", "orange"]
for fruit in all_fruits:
    print(fruit)
```

```javascript
// JavaScript
const allFruits = ["apple", "banana", "orange"];
for (const fruit of allFruits) {
  console.log(fruit);
}
// Classic index-based:
for (let i = 0; i < allFruits.length; i++) {
  console.log(allFruits[i]);
}
```

```typescript
// TypeScript
const allFruits: string[] = ["apple", "banana", "orange"];
for (const fruit of allFruits) {
  console.log(fruit);
}
```

```powershell
# PowerShell
$allFruits = @("apple", "banana", "orange")
foreach ($fruit in $allFruits) {
    Write-Host $fruit
}
# or pipeline style:
$allFruits | ForEach-Object { Write-Host $_ }
```

---

### For Loop with Range

> Loop a specific number of times.

```python
# Python
# range(start, end, step) — end is excluded
for i in range(6, 0, -2):
    print(i)
# result: 6, 4, 2
```

```javascript
// JavaScript — no built-in range; use a classic for loop
for (let i = 6; i > 0; i -= 2) {
  console.log(i);
}
// Or Array.from for a range:
Array.from({ length: 3 }, (_, k) => 6 - k * 2).forEach((v) => console.log(v));
```

```typescript
// TypeScript
for (let i: number = 6; i > 0; i -= 2) {
  console.log(i);
}
```

```powershell
# PowerShell
for ($i = 6; $i -gt 0; $i -= 2) {
    Write-Host $i
}
# or using range operator (ascending only):
6..1 | Where-Object { $_ % 2 -eq 0 } | ForEach-Object { Write-Host $_ }
```

---

### Ignoring the Loop Variable (`_`)

> When you only need to repeat N times and don't need the index.

```python
# Python
for _ in range(100):
    pass  # do something 100 times
```

```javascript
// JavaScript
for (let i = 0; i < 100; i++) {
  // do something 100 times — JS has no _ convention for loops
}
// Or using Array.from:
Array.from({ length: 100 }).forEach(() => {
  /* do something */
});
```

```typescript
// TypeScript
Array.from({ length: 100 }).forEach(() => {
  /* do something */
});
```

```powershell
# PowerShell
1..100 | ForEach-Object {
    # do something 100 times
}
```

---

### Break

> Exit the loop immediately.

```python
# Python
scores = [34, 67, 99, 105]
for s in scores:
    if s > 100:
        print("Invalid")
        break
    print(s)
```

```javascript
// JavaScript
const scores = [34, 67, 99, 105];
for (const s of scores) {
  if (s > 100) {
    console.log("Invalid");
    break;
  }
  console.log(s);
}
```

```typescript
// TypeScript
const scores: number[] = [34, 67, 99, 105];
for (const s of scores) {
  if (s > 100) {
    console.log("Invalid");
    break;
  }
  console.log(s);
}
```

```powershell
# PowerShell
$scores = @(34, 67, 99, 105)
foreach ($s in $scores) {
    if ($s -gt 100) {
        Write-Host "Invalid"
        break
    }
    Write-Host $s
}
```

---

### Continue

> Skip the rest of the current iteration and move to the next.

```python
# Python — print only odd numbers
n = 0
while n < 100:
    n += 1
    if n % 2 == 0:
        continue
    print(n)
```

```javascript
// JavaScript
let n = 0;
while (n < 100) {
  n += 1;
  if (n % 2 === 0) continue;
  console.log(n);
}
```

```typescript
// TypeScript
let n: number = 0;
while (n < 100) {
  n += 1;
  if (n % 2 === 0) continue;
  console.log(n);
}
```

```powershell
# PowerShell
$n = 0
while ($n -lt 100) {
    $n += 1
    if ($n % 2 -eq 0) { continue }
    Write-Host $n
}
```

---

### Infinite Loop

> A loop that runs forever until manually stopped.

```python
# Python — ⚠️ will run forever
while True:
    print("I'm a survivor")
```

```javascript
// JavaScript — ⚠️
while (true) {
  console.log("I'm a survivor");
}
```

```typescript
// TypeScript — ⚠️
while (true) {
  console.log("I'm a survivor");
}
```

```powershell
# PowerShell — ⚠️
while ($true) {
    Write-Host "I'm a survivor"
}
```

---

## 9. Lists / Arrays

### Creating a List / Array

```python
# Python
letters = ["a", "b", "c"]
```

```javascript
// JavaScript
const letters = ["a", "b", "c"];
```

```typescript
// TypeScript
const letters: string[] = ["a", "b", "c"];
// or:
const letters2: Array<string> = ["a", "b", "c"];
```

```powershell
# PowerShell
$letters = @("a", "b", "c")
```

---

### Accessing by Index

> Use an index (0-based) to retrieve an element. Negative indexes count from the end.

```python
# Python
letters = ["a", "b", "c"]
letters[0]   # "a"
letters[-1]  # "c" (last element)
```

```javascript
// JavaScript
const letters = ["a", "b", "c"];
letters[0]; // "a"
letters[letters.length - 1]; // "c"
letters.at(-1); // "c" (modern JS)
```

```typescript
// TypeScript
const letters: string[] = ["a", "b", "c"];
letters[0];
letters.at(-1); // "c"
```

```powershell
# PowerShell
$letters = @("a", "b", "c")
$letters[0]   # "a"
$letters[-1]  # "c"
```

---

### Adding Items

> Appending a single item to the end of a list/array.

```python
# Python
all_fruits = ["apple", "banana", "orange"]
all_fruits.append("pear")
```

```javascript
// JavaScript
const allFruits = ["apple", "banana", "orange"];
allFruits.push("pear");
```

```typescript
// TypeScript
const allFruits: string[] = ["apple", "banana", "orange"];
allFruits.push("pear");
```

```powershell
# PowerShell — arrays are fixed size; use += to create a new one
$allFruits = @("apple", "banana", "orange")
$allFruits += "pear"
# or use an ArrayList for true mutability:
$list = [System.Collections.ArrayList]@("apple", "banana", "orange")
$list.Add("pear")
```

---

### Combining Lists / Arrays

> Merging two lists/arrays into one.

```python
# Python
list1 = [1, 2, 3]
list2 = [9, 8, 7]
new_list = list1 + list2
list1 += list2
```

```javascript
// JavaScript
const list1 = [1, 2, 3];
const list2 = [9, 8, 7];
const newList = list1.concat(list2);
// or spread operator:
const newList2 = [...list1, ...list2];
```

```typescript
// TypeScript
const list1: number[] = [1, 2, 3];
const list2: number[] = [9, 8, 7];
const newList: number[] = [...list1, ...list2];
```

```powershell
# PowerShell
$list1 = @(1, 2, 3)
$list2 = @(9, 8, 7)
$newList = $list1 + $list2
```

---

### List Slicing

> Extracting a portion of a list/array.

```python
# Python — list[start:end] (end is excluded)
letters = ["a", "b", "c", "d"]
letters[1:3]   # ["b", "c"]
letters[:2]    # ["a", "b"]
letters[2:]    # ["c", "d"]
```

```javascript
// JavaScript — slice(start, end) (end is excluded)
const letters = ["a", "b", "c", "d"];
letters.slice(1, 3); // ["b", "c"]
letters.slice(0, 2); // ["a", "b"]
letters.slice(2); // ["c", "d"]
```

```typescript
// TypeScript
const letters: string[] = ["a", "b", "c", "d"];
letters.slice(1, 3);
```

```powershell
# PowerShell
$letters = @("a", "b", "c", "d")
$letters[1..2]         # ["b", "c"]
$letters[0..1]         # ["a", "b"]
$letters[2..($letters.Length - 1)]  # ["c", "d"]
```

---

## 10. Built-in Functions

### Round

> Round a number to the nearest integer (or decimal places).

```python
# Python
round(4.6)      # 5
round(4.5)      # 4 (banker's rounding!)
round(3.14159, 2)  # 3.14
```

```javascript
// JavaScript
Math.round(4.6); // 5
Math.round(4.5); // 5
parseFloat((3.14159).toFixed(2)); // 3.14
```

```typescript
// TypeScript
Math.round(4.6);
Number((3.14159).toFixed(2));
```

```powershell
# PowerShell
[Math]::Round(4.6)           # 5
[Math]::Round(3.14159, 2)    # 3.14
```

---

### Absolute Value

> Removes the negative sign from a number.

```python
# Python
abs(-4.6)   # 4.6
```

```javascript
// JavaScript
Math.abs(-4.6); // 4.6
```

```typescript
// TypeScript
Math.abs(-4.6);
```

```powershell
# PowerShell
[Math]::Abs(-4.6)  # 4.6
```

---

### Randomisation

> Generate a random number within a range.

```python
# Python — randint includes both start and end
import random
n = random.randint(2, 5)  # n can be 2, 3, 4, or 5
random.random()            # float between 0.0 and 1.0
```

```javascript
// JavaScript — Math.random() returns [0, 1)
const n = Math.floor(Math.random() * 4) + 2; // 2 to 5 inclusive
Math.random(); // 0.0 to 0.999...
```

```typescript
// TypeScript
const n: number = Math.floor(Math.random() * 4) + 2;
```

```powershell
# PowerShell
$n = Get-Random -Minimum 2 -Maximum 6  # 2 to 5 inclusive (Maximum is exclusive)
# or:
$n = [System.Random]::new().Next(2, 6)
```

---

### Range / Sequence Generation

> Generate a sequence of numbers.

```python
# Python — range(start, end, step), end excluded
for i in range(6, 0, -2):
    print(i)
# 6, 4, 2

list(range(5))  # [0, 1, 2, 3, 4]
```

```javascript
// JavaScript — no built-in range, use Array.from
Array.from({ length: 5 }, (_, i) => i); // [0, 1, 2, 3, 4]
Array.from({ length: 3 }, (_, i) => 6 - i * 2); // [6, 4, 2]
```

```typescript
// TypeScript
const range = Array.from({ length: 5 }, (_, i): number => i);
```

```powershell
# PowerShell — range operator (..) for simple ranges
0..4         # 0, 1, 2, 3, 4
6..0 | Where-Object { $_ % 2 -eq 0 }  # 6, 4, 2, 0
```

---

## 11. Modules / Imports

### Importing a Module

> Bringing external code into your file.

```python
# Python
import random
n = random.randint(3, 10)
```

```javascript
// JavaScript (CommonJS — Node.js)
const random = require("some-module");
// ES Modules:
import something from "some-module";
```

```typescript
// TypeScript (ES Modules)
import * as fs from "fs";
import { readFileSync } from "fs";
```

```powershell
# PowerShell — modules are imported with Import-Module
Import-Module -Name ActiveDirectory
# or dot-sourcing a script file:
. .\MyScript.ps1
```

---

### Aliasing an Import

> Giving an imported module or function a shorter name.

```python
# Python
import random as r
n = r.randint(1, 5)
```

```javascript
// JavaScript (ES Modules)
import * as r from "some-module";
```

```typescript
// TypeScript
import * as r from "some-module";
import { randInt as ri } from "some-module";
```

```powershell
# PowerShell — no direct alias for modules, but you can alias cmdlets
New-Alias -Name ri -Value Get-Random
ri -Minimum 1 -Maximum 6
```

---

### Importing Specific Items

> Import only what you need from a module.

```python
# Python
from random import randint
n = randint(1, 5)
```

```javascript
// JavaScript (ES Modules)
import { randomInt } from "crypto";
const n = randomInt(1, 6); // 1 to 5 inclusive
```

```typescript
// TypeScript
import { randomInt } from "crypto";
const n: number = randomInt(1, 6);
```

```powershell
# PowerShell — import specific commands from a module
Import-Module PSReadLine -Function Set-PSReadLineOption
```

---

### Importing Everything (Wildcard)

> Import all exported members (use sparingly — reduces readability).

```python
# Python
from random import *
my_list = [1, 2, 3]
choice(my_list)   # works without random. prefix
```

```javascript
// JavaScript — import * as namespace
import * as utils from "./utils";
```

```typescript
// TypeScript
import * as utils from "./utils";
```

```powershell
# PowerShell — Import-Module already imports all exported cmdlets
Import-Module -Name SomeModule
```

---

## 12. Classes & Objects

### Creating a Class

> A blueprint for creating objects.

```python
# Python — class keyword, PascalCase name
class MyClass:
    pass  # empty class
```

```javascript
// JavaScript — class keyword (ES6+)
class MyClass {
  // empty class
}
```

```typescript
// TypeScript
class MyClass {
  // empty class
}
```

```powershell
# PowerShell — classes introduced in PS v5
class MyClass {
    # empty class
}
```

---

### Creating an Object (Instance)

> Instantiating a class to create an object.

```python
# Python
class Car:
    pass

my_toyota = Car()
```

```javascript
// JavaScript
class Car {}
const myToyota = new Car();
```

```typescript
// TypeScript
class Car {}
const myToyota: Car = new Car();
```

```powershell
# PowerShell
class Car {}
$myToyota = [Car]::new()
```

---

### Class Variables (Properties)

> Variables defined on the class, shared by all instances.

```python
# Python
class Car:
    colour = "black"

car1 = Car()
print(car1.colour)  # black
```

```javascript
// JavaScript — use static for class-level; instance props in constructor
class Car {
  constructor() {
    this.colour = "black";
  }
}
const car1 = new Car();
console.log(car1.colour); // black
```

```typescript
// TypeScript
class Car {
  colour: string = "black";
}
const car1: Car = new Car();
console.log(car1.colour);
```

```powershell
# PowerShell
class Car {
    [string]$colour = "black"
}
$car1 = [Car]::new()
Write-Host $car1.colour  # black
```

---

### Class Methods

> Functions that belong to a class.

```python
# Python — self is the first param of any instance method
class Car:
    def drive(self):
        print("move")

my_honda = Car()
my_honda.drive()
```

```javascript
// JavaScript
class Car {
  drive() {
    console.log("move");
  }
}
const myHonda = new Car();
myHonda.drive();
```

```typescript
// TypeScript
class Car {
  drive(): void {
    console.log("move");
  }
}
const myHonda: Car = new Car();
myHonda.drive();
```

```powershell
# PowerShell
class Car {
    [void] Drive() {
        Write-Host "move"
    }
}
$myHonda = [Car]::new()
$myHonda.Drive()
```

---

### Constructor (`__init__` / `constructor`)

> Code that runs automatically when an object is created.

```python
# Python
class Car:
    def __init__(self, name):
        self.name = name
        print("Building car")

my_toyota = Car("Toyota")
# prints: Building car
```

```javascript
// JavaScript
class Car {
  constructor(name) {
    this.name = name;
    console.log("Building car");
  }
}
const myToyota = new Car("Toyota");
```

```typescript
// TypeScript
class Car {
  name: string;
  constructor(name: string) {
    this.name = name;
    console.log("Building car");
  }
}
const myToyota: Car = new Car("Toyota");
```

```powershell
# PowerShell — constructor method has the same name as the class
class Car {
    [string]$Name
    Car([string]$name) {
        $this.Name = $name
        Write-Host "Building car"
    }
}
$myToyota = [Car]::new("Toyota")
```

---

### Class Inheritance

> A child class inherits properties and methods from a parent class.

```python
# Python
class Animal:
    def breathe(self):
        print("breathing")

class Fish(Animal):
    def breathe(self):
        super().breathe()
        print("underwater")

nemo = Fish()
nemo.breathe()
# breathing
# underwater
```

```javascript
// JavaScript
class Animal {
  breathe() {
    console.log("breathing");
  }
}
class Fish extends Animal {
  breathe() {
    super.breathe();
    console.log("underwater");
  }
}
const nemo = new Fish();
nemo.breathe();
```

```typescript
// TypeScript
class Animal {
  breathe(): void {
    console.log("breathing");
  }
}
class Fish extends Animal {
  breathe(): void {
    super.breathe();
    console.log("underwater");
  }
}
const nemo: Fish = new Fish();
nemo.breathe();
```

```powershell
# PowerShell
class Animal {
    [void] Breathe() { Write-Host "breathing" }
}
class Fish : Animal {
    [void] Breathe() {
        ([Animal]$this).Breathe()
        Write-Host "underwater"
    }
}
$nemo = [Fish]::new()
$nemo.Breathe()
```

---

_Generated from the **100 Days of Code – Python Bootcamp** cheat sheet, extended with JavaScript, TypeScript, and PowerShell equivalents. You can find the original pdf here:_ https://github.com/pathilink/TheAppBrewery/blob/main/Python%2BSyntax%2BCheat%2BSheet%2BBooklet.pdf
