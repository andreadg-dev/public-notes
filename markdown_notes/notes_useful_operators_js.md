# MY NOTES ABOUT USEFUL OPERATORS IN JS #

## `&&` - logical AND ##
What it does: evaluates the left side; if it’s falsy, returns it immediately; otherwise returns the right side.

Falsy in JS: `false, 0, -0, 0n, "", null, undefined, NaN`.

When used:

- Conditional execution / conditional value selection (often in older code and in JSX)
- “Only use this value if condition is truthy”

```js
const condition = true;
const value = condition && "enabled";   // "enabled"

const condition2 = 0;
const value2 = condition2 && "enabled"; // 0 (not "enabled")
```

Common pattern (guard):
```js
user && user.logout(); // calls logout only if user is truthy
```

## ` ? : ` - ternary / conditional operator ##
What it does: evaluates condition. If truthy, returns iftrue, else returns iffalse. Always picks one of two expressions.

When used:
- Inline if/else where you need a value
- Rendering choices (React, templates), simple branching

```js
const age = 17;
const label = age >= 18 ? "adult" : "minor"; // "minor"
```

Nested ternaries are possible but can hurt readability:

```js
const score = 82;
const grade = score >= 90 ? "A" : score >= 80 ? "B" : "C"; // "B"
```

## `??` - nullish coalescing ##
What it does: returns the left side unless it is `null` or `undefined`. So it only falls back on the right side for missing values, not for other falsy values like `0` or `""`.

When used:
- Default values where 0, false, or empty string are valid and should be kept
- Config defaults, parsing optional fields, etc.

```js
const input1 = 0;
const a = input1 ?? 42; // 0 (keeps 0)

const input2 = null;
const b = input2 ?? 42; // 42
```

Contrast with `||`:
```js
0 || 42;   // 42  (because 0 is falsy)
0 ?? 42;   // 0   (because 0 is not null/undefined)
```


## `?.` - optional chaining ##
What it does: safely accesses a property. If object is `null` or `undefined`, the whole expression becomes `undefined` instead of throwing an error.

When used:
- Accessing nested data from APIs, optional fields, DOM lookups, etc.
- Avoiding `Cannot read properties of undefined`

```js
const user = null;
const city = user?.address?.city; // undefined (no crash)
```

Also works with function calls and array indexing:

```js
obj?.doWork?.();     // calls only if obj and doWork exist
arr?.[0];            // first element or undefined
```

## Quick “which one should I use?” summary ##
- Use `&&` when you want: “only evaluate/use the right side if left is truthy”.
- Use ternary `?:` when you need: “choose between two explicit alternatives”.
- Use `??` when you want a default only for: “null/undefined (missing), but keep 0/""/false”.
- Use `?.` when you want: “safe access/call when something might be null/undefined”.