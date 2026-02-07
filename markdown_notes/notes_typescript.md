# MY TYPESCRIPT NOTES #

- [MY TYPESCRIPT NOTES](#my-typescript-notes)
  - [Basic Primite Types](#basic-primite-types)
  - [Objects](#objects)
  - [Arrays](#arrays)
  - [Type inference and Type annotation](#type-inference-and-type-annotation)
  - [Union Types](#union-types)
  - [Functions](#functions)
  - [Type Aliases and Interfaces](#type-aliases-and-interfaces)
    - [Interface](#interface)
    - [Type aliases](#type-aliases)
  - [Type literals](#type-literals)
  - [Type Guards](#type-guards)
  - [Tips](#tips)


## Basic Primite Types ##
```ts
let myName: string = "Andy"
let myAge: number = 33 //could also be float or negative numbers, e.g. -2 or 1.5
let isAdmin: boolean = true //either true or false
```


## Objects ##
Below you can find an example of both object type annotation and declaration. In the annotation, we declare each object's property type:
```ts
//object type annotation
let user: {
    name: string; 
    age: number; 
    hasAccess: boolean; 
    id: string | number
};

//object declaration
user = {
    name: "Andy", 
    age: 33, 
    hasAccess: false, 
    id: "abc123"
}; 
```

## Arrays ##
Below you can find examples of both array type annotation and declaration
```ts
let colors: string[] //or you can write 'Array<string>': array of strings
colors = ["blue","red","yellow"]

let ages: number[] //or you can write 'Array<number>': array of numbers
ages = [22,42,32,54]

let users: {firstName: string; lastName: string}[] //you could also write'Array<object>' or 'object[]' but better use describe the object in detail
users = [{firstName: "Andy", lastName: "Candy"}, {firstName: "Jane", lastName: "Doe"}] //array of objects
```

## Type inference and Type annotation ##
TypeScript inference: if the variable is initiated and declared on the same line, TypeScript is able to infer the type

TypeScript annotation: the developer specifies the type at initiation with the syntax ': type'
```ts
let userName = "Jon" //TypeScript infers type to be string

let userName2: string //TypeScript cannot infer the type here since there is no declaration so it infers type 'any'. We must use Type Annotation
userName2 = "Jane"
```


## Union Types ##
If a variable has to be able to accept more than type, it is possible to do so by using the pipe symbol ('or'). In this case userId can be either a string or a number
```ts
let userId: string | number = "myUserId";
userId = 123;

```

## Functions ##
```ts
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
```

## Type Aliases and Interfaces ##
Type and interface in TypeScript are both used to define custom types, especially for objects, but they have slightly different use cases and capabilities.

In both cases, it's good practice to capitalize your type aliases/interfaces

###  Interface ###
- Ideal for modeling objects and classes. Cannot be used for other types except for function types
- Supports extension, class implementation, declaration merging
```ts
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

```

### Type aliases ###
- Can define any kind of type: unions, intersections, primitives, tuples, functions
- Can be extended
```ts
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

```

## Type literals ##
A type literal is when you tell TypeScript that a value must be exactly equal to a specific value, not just any value of that type.

- Normally, string means any string ("hello", "world", "123", etc.).
- A string literal type like "hello" means the value must be exactly "hello".
- The same applies to numbers (42), booleans (true), or even combinations.

When you combine multiple type literals with a union `|` symbol, you restrict a value to a small set of allowed options.
```ts
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
```

## Type Guards ##
In TypeScript, a type guard is a way to check the type of a value at runtime so that TypeScript can narrow the type inside a code block.
One way to do that is to use the built-in typeof JS operator that retrieves the type of a variable/value
```ts
function combine(value1: string | number, value2: string | number):void {
if (typeof value1 === "string" && typeof value2 === "string") {console.log(`${value1} ${value2}`);} 
if (typeof value1 === "number" && typeof value2 === "number"){console.log(value1 + value2);}
}

combine("hello","world"); // hello world
combine(4,6);       // 10
```
Important: You can NOT check if a value meets the definition of a custom type (type alias) or interface type. These are TypeScript-specific features for which no JavaScript equivalent exists. Therefore, since those if checks need to run at runtime, you can't write any code that would be able to check for those types at runtime.

For example, the below code won't work because the NormalUser type does not exist once the code is compiled to JavaScript:
```ts
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
```
But you could check for the existence of the permissions property since only the AdminUser object will have one:
```ts
function loginApp2(u: NormalUser | AdminUser) {
    if ('permissions' in u) {
        // do something
    }
}   
```


## Tips ##
- Avoid type 'any' at all costs
- Use 'void' for function that does not return anything and not 'undefined'
- In order to use TypeScript, install: npm install ts-node tsx typescript
