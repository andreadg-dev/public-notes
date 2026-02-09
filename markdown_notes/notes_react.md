# MY REACT NOTES #

## Local Config ##

**Step 1**. Make sure you have the latest version of Node installed. If not head over to https://nodejs.org/en/download to download the LTS (Long Term Support) version of Node.

**Step 2**. Make sure you have the latest version of VSCode installed. If not, head over to https://code.visualstudio.com/download to download the version for your platform.

**Step 3**. Open a Terminal or command prompt and navigate to the directory where you want to create your React project. (We covered how to do this in previous parts of the course, if this is confusing, I recommend skipping this lesson and continuing with the videos and using CodeSandbox).

**Step 4**. Create a Vite app by running the following command in your Terminal or Command Prompt:

`npm create vite@latest my-react-app --template react`

**Step 5**. The first time, you won't have Vite installed. Type `y` to proceed. Then you'll be asked to select a framework. Use your down arrow to select `React`.

```
Need to install the following packages:
create-vite@5.3.0
Ok to proceed? (y) y


> npx
> create-vite my-react-app react

? Select a framework: » - Use arrow-keys. Return to submit.
    Vanilla
    Vue
>   React
    Preact
    Lit
    Svelte
    Solid
    Qwik
    Others

```


**Step 6**. You'll be asked to select a variant, select `Javascript`.

```
? Select a variant: » - Use arrow-keys. Return to submit.
    TypeScript
    TypeScript + SWC
>   JavaScript
    JavaScript + SWC
    Remix ↗
```

Then wait for the installation to finish, this will take a few minutes.

```
Scaffolding project in C:\temp\web-dev\my-react-app...

Done. Now run:

  cd my-react-app
  npm install
  npm run dev
```
