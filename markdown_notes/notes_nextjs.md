# MY NEXT.JS NOTES #

## INDEX ##
- [MY NEXT.JS NOTES](#my-nextjs-notes)
  - [INDEX](#index)
  - [PROJECT OVERVIEW](#project-overview)
- [INITIALIZE A NEXTJS PROJECT WITH TYPESCRIPT](#initialize-a-nextjs-project-with-typescript)
  - [INSTALL MATERIAL UI (OPTIONAL)](#install-material-ui-optional)
  - [ADD GOOGLE FONTS](#add-google-fonts)
  - [IMPORT REPO TO GITHUB ONLINE AND VERCEL](#import-repo-to-github-online-and-vercel)
  - [CONNECT TO A FREE TIER SUPABASE DB](#connect-to-a-free-tier-supabase-db)
  - [SET UP PRISMA WITH SUPABASE POSTGRES SQL DB FREE TIER](#set-up-prisma-with-supabase-postgres-sql-db-free-tier)
- [SET UP AUTHENTICATION VIA GITHUB/GOOGLE](#set-up-authentication-via-githubgoogle)
    - [GITHUB](#github)
    - [GOOGLE](#google)
    - [ADD CLIENT CREDENTIALS TO .ENV LOCALLY](#add-client-credentials-to-env-locally)
  - [ADD CLIENT CREDENTIALS INTO YOUR VERCEL PROJECT](#add-client-credentials-into-your-vercel-project)
  - [SET UP PRISMA SCHEMA WITH NEXT-AUTH MODELS](#set-up-prisma-schema-with-next-auth-models)
  - [AUTH CONFIGURATION FILE \& AUTH ACTIONS](#auth-configuration-file--auth-actions)
  - [CHECK IF USER AUTHENTICATED BEFORE ACCESSING APP](#check-if-user-authenticated-before-accessing-app)
  - [LAST STEPS](#last-steps)
- [GOOD PRACTICE \& TIPS](#good-practice--tips)
  - [IMPLEMENT PATH HELPERS](#implement-path-helpers)
  - [TIPS](#tips)


## PROJECT OVERVIEW ##
- Next.js with AppRouter (I personally use the `app` folder only for routing and the rest of folders, like `actions`,`components`,`ui` etc, are on the level of the `app` folder)
- TypeScript
- Tailwind CSS (provides low-level utility classes (like flex, pt-4, text-center) to build custom designs directly in your HTML)
- Material UI (pre-built, customizable components)
- Prisma (database actions adapter)
- Supabase (free tier postgres sql)
- Auth: Next-Auth with Google and Github OAuth functionality
- Favorite font families: Roboto, Dosis, Lato, Montserrat, Rubik, Ubuntu


# INITIALIZE A NEXTJS PROJECT WITH TYPESCRIPT #
- Run `npx create-next-app@latest ./  --ts` and a new empty folder
- I have selected the following config when prompted:

```plaintext
    - √ Which linter would you like to use? » ESLint
    - √ Would you like to use React Compiler? ... No
    - √ Would you like to use Tailwind CSS? ... Yes
    - √ Would you like your code inside a `src/`    directory? ... - Yes
    - √ Would you like to use App Router? (recommended) ... -   Yes
    - √ Would you like to customize the import alias (`@*` by - default)? ... No
```
This command will initialize a new Next.js project, install all the dependencies and initialize a local git repository.


## INSTALL MATERIAL UI (OPTIONAL) ##
- Run `npm install @mui/material @emotion/react @emotion/styled @mui/material-nextjs @mui/icons-material`
- Inside `app/layout.tsx`, import the `AppRouterCacheProvider` and wrap all elements under the `<body>` with it:
```tsx
+import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
 // or `v1X-appRouter` if you are using Next.js v1X

 export default function RootLayout(props) {
   return (
     <html lang="en">
       <body>
+        <AppRouterCacheProvider>
           {props.children}
+        </AppRouterCacheProvider>
       </body>
     </html>
   );
 }
```
- To integrate Next.js font optimization with Material UI, create a new file with the `'use client';` directive. Then create a theme using `var(--font-roboto)` as a value for the `typography.fontFamily` field:
```ts
//.../src/theme.ts
'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
});

export default theme;
```
- Finally, in `src/app/layout.tsx`, pass the theme to the `ThemeProvider`:
```tsx
 import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
+import { Roboto } from 'next/font/google';
+import { ThemeProvider } from '@mui/material/styles';
+import theme from '../theme';

+const roboto = Roboto({
+  weight: ['300', '400', '500', '700'],
+  subsets: ['latin'],
+  display: 'swap',
+  variable: '--font-roboto',
+});

 export default function RootLayout(props) {
   const { children } = props;
   return (
+    <html lang="en" className={roboto.variable}>
       <body>
          <AppRouterCacheProvider>
+           <ThemeProvider theme={theme}>
              {children}
+           </ThemeProvider>
          </AppRouterCacheProvider>
       </body>
     </html>
   );
 }
```
- Remove all unwanted css rules from `src/app/globals.css` (except for the top tailwind import line/s) and all unwanted tsx code from the home page `src/app/page.tsx`
- Run `npm run dev` and check that the app is loading correctly at `http://localhost:3000`

Source: https://mui.com/material-ui/integrations/nextjs/#configuration

## ADD GOOGLE FONTS ##
Fonts are scoped to the component they're used in. To apply a font to your entire application, add it to the Root Layout file.

You can automatically self-host any Google Font. Fonts are included stored as static assets and served from the same domain as your deployment, meaning no requests are sent to Google by the browser when the user visits your site.

- You can create a `.\src\ui\fonts.ts` file and store declare there all your favourite fonts, for instance:
```ts
import { Roboto, Dosis, Lato, Montserrat, Rubik, Ubuntu, Geist, Geist_Mono } from 'next/font/google'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

const dosis = Dosis({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dosis',
});

const lato = Lato({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
});

const montserrat = Montserrat({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

const rubik = Rubik({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rubik',
});

const ubuntu = Ubuntu({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ubuntu',
});

const geistSans = Geist({
  weight: ['300', '400', '500', '700'],
  subsets: ["latin"],
  display: 'swap',
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  weight: ['300', '400', '500', '700'],
  subsets: ["latin"],
  display: 'swap',
  variable: "--font-geist-mono",
});

const inconsolata = Inconsolata({
  weight: ['300', '400', '500', '700'],
  subsets: ["latin"],
  display: 'swap',
  variable: "--font-inconsolata",
});

const courierPrime = Courier_Prime({
  weight: [ '400', '700'],
  subsets: ["latin"],
  display: 'swap',
  variable: "--font-courier-prime",
});

const cousine = Cousine({
  weight: [ '400', '700'],
  subsets: ["latin"],
  display: 'swap',
  variable: "--font-cousine",
});

export { roboto, dosis, lato, montserrat, rubik, ubuntu, geistSans, geistMono , inconsolata, courierPrime, cousine };
```
- Then, add your font variable to the `global.css` file, for instance:
```css
@theme {
  /* Sans-serif fonts */
  --font-roboto: var(--font-roboto), ui-sans-serif, system-ui;
  --font-dosis: var(--font-dosis), ui-sans-serif, system-ui;
  --font-lato: var(--font-lato), ui-sans-serif, system-ui;
  --font-montserrat: var(--font-montserrat), ui-sans-serif, system-ui;
  --font-rubik: var(--font-rubik), ui-sans-serif, system-ui;
  --font-ubuntu: var(--font-ubuntu), ui-sans-serif, system-ui;
  --font-geist: var(--font-geist-sans), ui-sans-serif, system-ui;
  --font-geist-mono: var(--font-geist-mono), ui-monospace, SFMono-Regular;
  --font-inconsolata: var(--font-inconsolata), ui-monospace, SFMono-Regular;
  --font-courier-prime: var(--font-courier-prime), ui-monospace, SFMono-Regular;
  --font-cousine: var(--font-cousine), ui-monospace, SFMono-Regular;

  /* Monospace fonts */
  --font-mono: var(--font-geist-mono), ui-monospace, SFMono-Regular;
  
  /* If you want one of these to be the default 'font-sans' */
  --font-sans: var(--font-geist-sans), ui-sans-serif, system-ui;
}
```
- Finally, You must include all the variables in your `layout.tsx` file (usually on the `<html>` or `<body>` tag) so they are available throughout your app. **If you forget this step, the fonts will not be applied**. for instance:
```js
+ import { roboto, dosis, lato, montserrat, rubik, ubuntu, geistSans, geistMono, inconsolata, courierPrime, cousine } from "@/app/ui/fonts";

//your code


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
+    <html lang="en" className={`${roboto.variable} ${dosis.variable} ${lato.variable} ${montserrat.variable} ${rubik.variable} ${ubuntu.variable} ${geistSans.variable} ${geistMono.variable} ${inconsolata.variable} ${courierPrime.variable} ${cousine.variable}`}>
        {/* rest of your code */}
    </html>
  );
}
```
- Now you can use them as any other Tailwind CSS class, for instance `<div className="font-roboto">Roboto</div>`. In order to set a default font across the app, you can just apply a CSS rule in the `global.css` file to the `<html>` or `<body>` element.

In Next.js, `display: 'swap'` is a font-loading strategy that ensures your text is immediately visible to users by using a fallback system font while your custom font is still downloading. 

For a list of Google variable fonts, see: https://fonts.google.com/variablefonts


## IMPORT REPO TO GITHUB ONLINE AND VERCEL ##
- Log in your Github account
- Create a new private repo
- Push the following project into it:
```sh
git remote add origin https://github.com/[username]/[repo_name].git
git branch -M main
git push -u origin main
```
- Log in your Vercel account (at vercel.com)
- Add New > Project
- If you do not see this new project in the `Import Github Repository` list:
  - Click on `Adjust GitHub App Permissions →` and add the corresponding repo
  - Scroll down to `Repository access`
  - Select repositories > select the corresponding project
  - Save
- When back in Vercel, click on `Import` beside the repo
- Check all the details and click on `Deploy` when done
- Click on `Continue to dashboard`

## CONNECT TO A FREE TIER SUPABASE DB ##
- Navigate to your Vercel project dashboard (for instance https://vercel.com/[username]-devs-projects/[project_name])
- Click on the `Storage` tab > `Create a database` button > `Create New` > select `Supabase` > `Continue` button > select the closest region to you that also offers a `Supabase Free Plan` (check under `Installation Plan`) > `Continue` button
- Choose a database name and click on `Create` > `Done`
- Navigate to the `.env.local` tab, click `Show secret` and `Copy Snippet`
- Create an `.env` file in your project root folder and paste there the copied content from Vercel

Source: https://nextjs.org/learn/dashboard-app/setting-up-your-database

## SET UP PRISMA WITH SUPABASE POSTGRES SQL DB FREE TIER ##
- Run  `npm install prisma`
- Run `npm install @prisma/client`
- Run `npx prisma init --datasource-provider postgresql`. At the end, you should see this:
```plaintext
Fetching latest updates for this subcommand...

Initialized Prisma in your project

  prisma/
    schema.prisma
  prisma.config.ts
  .env

warn You already have a .gitignore file. Don't forget to add .env in it to not commit any private information.

Next, choose how you want to set up your database:
CONNECT EXISTING DATABASE:
  1. Configure your DATABASE_URL in prisma.config.ts
  2. Run prisma db pull to introspect your database.
CREATE NEW DATABASE:
  Local: npx prisma dev (runs Postgres locally in your terminal)
  Cloud: npx create-db (creates a free Prisma Postgres database)

Then, define your models in prisma/schema.prisma and run prisma migrate dev to apply your schema.
Learn more: https://pris.ly/getting-started
```
- Depending on your prisma version (you can check with `npx prisma version`), you need to perform differnt steps here:
```prisma
//If you are using a Prisma version lower than 7, update your `prisma/schema.prisma` file like so*:
datasource db {
  provider = "postgresql"
  url      = env("POSTGRES_URL_NON_POOLING")
}
```
```ts
//If you Prisma version 7 and higher, the db url info should be added to the prisma.config.ts file instead. In case you do not need the latter to load the db config, delete it or rename it.
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
+    url: env("POSTGRES_URL_NON_POOLING"),
  },
});
```
- Make sure to adapt the `generator` statement in your `prisma.schema` file like this:
```prisma
generator client {
  provider = "prisma-client-js"
}
```

- Configure your supabase database as explained in the link in the description
 - Create or locate the `.env` file in the root directory of your root directory
- Copy all the secrets from the supabase vercel connection in the `.env.local` tab to your `.env` file
- Add a `DATABASE_URL` var in the `.env` file like so: `DATABASE_URL="${POSTGRES_URL_NON_POOLING}`
- Run `npx prisma generate`. Make sure that the prisma client is created in the the corresponding `node_modules` folder: `✔ Generated Prisma Client (v6.19.2) to .\node_modules\@prisma\client`
- Run `npx prisma migrate dev --name init`
- Create a `db/index.ts` file in your project root and copy/paste the following code:
```ts
import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient(); 
```


# SET UP AUTHENTICATION VIA GITHUB/GOOGLE #
- Run `npm install next-auth@beta @auth/prisma-adapter` to install next-auth and auth prisma adapter

### GITHUB ###
- Navigate to https://github.com/settings/applications/new
- Fill in the form like this:
  - Application name: DEV [choose a name]
  - Homepage URL: http://localhost:3000
  - Authorization callback URL: http://localhost:3000/api/auth/callback/github
  - Register application
- Navigate to https://github.com/settings/developers and click on the newly created OAuth app and generate a client secret

### GOOGLE ###
- Navigate to https://console.cloud.google.com/ and create a project
- Navigate to https://console.cloud.google.com/auth/clients/create (or https://cloud.google.com/cloud-console > Console > API and services > Credentials > Create credentials > OAuth client ID)
- Fill in the form like this:
  - Application type: Web application
  - Authorized JavaScript origins > ADD URI: (leave this empty)
  - Authorized redirect URIs > ADD URI: http://localhost:3000/api/auth/callback/google
- Click on Create and copy the Client ID and Client Secret from the `OAuth client created` pop-up. Starting in June 2025, you will no longer be able to view or download the client secret once you close this dialogue. Make sure that you have copied or downloaded the information below and stored it securely.

### ADD CLIENT CREDENTIALS TO .ENV LOCALLY ###
- From both your Github and Google dev app pages, copy your client Ids and client Secrets and paste this info in your `.env` file, for instance:
```plaintext
NEXTAUTH_SECRET=[random string of your choice]
NEXTAUTH_URL=http://localhost:3000 #this is my dev url, when deployed, use the corresponding app URL

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```
- With regards to the NEXTAUTH_SECRET, you can generate a random one by running `openssl rand -base64 32` in your terminal or `[Convert]::ToBase64String((1..32 | ForEach-Object { [byte](Get-Random -Maximum 256) }))` in your Powershell
- With regards to the `NEXTAUTH_URL` value, I am using this during development in my `.env` file that is gitignored. When deploying the app to Vercel, for instance, make sure to add a `NEXTAUTH_URL` Environment Variable in the settings (https://vercel.com/[username]/[app_name]/settings/environment-variables). The URL is supposed to be the base URL of your Vercel app, for instance: https://[app_name].vercel.app. This value is then used by Next.js automatically during authentication. 


##  ADD CLIENT CREDENTIALS INTO YOUR VERCEL PROJECT  ##
- Copy/paste the same credentials that you added to your `.env` file, into your Vercel environment variables page (for instance https://vercel.com/[username]-devs-projects/[project_name]/settings/environment-variables or Project > Settings > Environment Variables). You can either add them one by one or add them by uploading your `.env` file.


## SET UP PRISMA SCHEMA WITH NEXT-AUTH MODELS ##
- Update `prisma/schema.prisma` to include Next-Auth required tables (User, Account, Session, VerificationToken):
```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

```
## AUTH CONFIGURATION FILE & AUTH ACTIONS ##
- Create a `auth_config.ts` file in your app root and copy/paste the code below:
```ts
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/db";


const ALLOWED_EMAILS =process.env.ALLOWED_EMAILS?.split(",").map(e => e.trim().toLowerCase()) ?? [];
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  throw new Error("GitHub OAuth credentials missing!");
}

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  throw new Error("Google OAuth credentials missing!");
}

export const { handlers: {GET,POST}, auth, signOut, signIn } = NextAuth({
  adapter: PrismaAdapter(db),
  pages: {
    error: "/access_denied",
  },
  providers: [
    GitHub({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      const email = user.email.toLowerCase();
      const emailAllowed = ALLOWED_EMAILS.includes(email);
      return emailAllowed;
    },
    async session({ session, user }) {
      if (session?.user && user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
});

```
*Please note that I have also added a line for `ALLOWED_EMAILS` that are a list of emails having access to the app during testing so that nobody else can access it if deployed on Vercel. The allowed emails list is the local `.env` file (email,email,email,etc). Please remember to upload this list also in your Vercel project environment variables section. Moreover, you will have to create a `app/access_denied/page.tsx` file to display an error saying that the user whose email is not in the allowed emails list cannot access the app. The page is mentioned in the `pages` parameter.*

- Crate the following folders and file in the project root folder `src\app\api\auth\[...nextauth]\route.ts`
- Copy/paste `export {GET, POST} from '@/auth'` in the new `route.ts` file. This code exports the GET and POST handlers configured in the `auth_config.ts` file
- Create the following file in the root folder of your project `src\actions\auth.ts`* and copy/paste the following code (this step is optional, only good practice):
```ts
"use server";

import { signIn, signOut, auth } from "@/auth_config";

export async function handleSignIn(formData: FormData) {
  const provider = formData.get("provider") as "github" | "google";
  return signIn(provider, { redirectTo: "/" });
}

export async function handleSignOut() {
  return signOut({ redirectTo: "/" });
}

export async function getSession() {
  return auth();
}
```
**We are declaring all actions in one file at the moment, but for the future, it might be a good idea to create a `[action].ts` file for each action, and then import and export all actions from the `actions/index.ts` file, so that you can import everything from this file instead having to import actions one by one, for instance:*
```ts
export { handleSignIn } from "./sign-in";
export { handleSignOut} from "./sign-out";
export { getSession } from "./get-session";
```

I have then personally created some button components in the `src/components` folder like so (this is just an example):
```tsx
import { handleSignIn, handleSignOut } from "@/app/actions/auth";

export function SignInButtonGithub(){
    return (
        <form action={handleSignIn}>
            <input type="hidden" name="provider" value="github" />
            <button type="submit">Sign in with GitHub</button>
        </form>
    )
}

export function SignInButtonGoogle(){
    return (
        <form action={handleSignIn}>
            <input type="hidden" name="provider" value="google" />
            <button type="submit">Sign in with Google</button>
        </form>
    )
}

export function SignOutButton(){
    return (
        <form action={handleSignOut}>
            <button type="submit">Sign Out</button>
        </form>
    )
}
```
This is an example on how you can check the session using a server component:
```tsx
import { getSession } from "@/app/actions/auth";
import { SignInButtonGithub, SignInButtonGoogle, SignOutButton } from "./AuthButtons";

export default async function CheckSession() {
  const session = await getSession();

  return session?.user ?
      (
        <>
          <p>Welcome, {session.user?.name}! You are signed in!</p>
          <div>Profile: {JSON.stringify(session.user)}</div>
          <SignOutButton />
        </>
      ) : (
        <>
          <p>You are not signed in!</p>
          <SignInButtonGithub />
          <SignInButtonGoogle />
        </>
      )
  }
```

This is an example on how you can check the session using a client component (using `useSession` from the `next-auth/react` library)

With regards to the equivalent but with a client component, you have to first add this code inside your `src\app\providers.tsx` page (create it if you do not have it):
```tsx
'use client'

import { SessionProvider} from "next-auth/react";

interface ProvidersProps {
    children: React.ReactNode
}

export default function Providers({children}: ProvidersProps){
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
```
Then import this `Providers` component inside your main `layout.tsx` file and wrap the `{children}` with it:
```tsx
//your code
import Providers from "./providers";

//your RootLayout function
+            <Providers>
              {children}
+            </Providers>
//closing RootLayout function

```
Now, you can create, export and use a client component that checks the user session:
```tsx
'use client'

import { useSession } from "next-auth/react";
import { SignInButtonGithub, SignInButtonGoogle, SignOutButton } from "./AuthButtons";

export default function CheckSessionClient() {
  const session = useSession();

  return session.data?.user ?
      (
        <>
          <p>Welcome, {session.data.user.name}! You are signed in!</p>
          <div>Profile: {JSON.stringify(session.data.user)}</div>
          <SignOutButton />
        </>
      ) : (
        <>
          <p>You are not signed in!</p>
          <SignInButtonGithub />
          <SignInButtonGoogle />
        </>
      )
  }
```
*Note the difference between the Server and Client component. The session object returned in the Server component is `session.user` whereas the Client one is `session.data.user`.

## CHECK IF USER AUTHENTICATED BEFORE ACCESSING APP ##
if you want to make sure the user is signed in before accessing any route in the app, create a `src/proxy.ts` file and copy/paste the code below (you can modify things if you want to):
```ts
// src/proxy.ts
import { auth } from "@/auth_config";

export default auth((req) => {
  const pathname = req.nextUrl.pathname;

  // Skip auth for login page and NextAuth API. If you have different pathnames, replace the ones below with the ones you have
  if (
    pathname.startsWith("/api/auth") ||
    pathname === "/login" ||
    pathname === "/access_denied"
  ) {
    return; // allow access without redirect
  }

  // Redirect if not authenticated. In this case I am specifying my own custom login page but you can use the default '/api/auth/signin' page as well.*
  if (!req.auth) {
    const loginUrl = new URL("/login", req.url);
    return Response.redirect(loginUrl);
  }
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};//**

```
**If you have your own `login` page, make sure to update the `pages` parameter in your `auth_config.ts` file, for instance:*
```ts
pages: {
    signIn: "/login",
    // the rest of your config
    }
```
***You can allow pages to be accessible even without login by adding the folder names to the `matcher` reg expression*

## LAST STEPS ##
- Run  `npx prisma generate`. You should get this:
```text
Loaded Prisma config from prisma.config.ts.

Prisma config detected, skipping environment variable loading.
Prisma schema loaded from prisma\schema.prisma

✔ Generated Prisma Client (6.19.2) to .\src\generated\prisma in 119ms
```
- Run `npx prisma migrate dev --name init`. You should get something like this:
```text

Loaded Prisma config from prisma.config.ts.

Prisma config detected, skipping environment variable loading.
Prisma schema loaded from prisma\schema.prisma
Datasource "db": PostgreSQL database "postgres", schema "public" at "aws-1-eu-central-2.pooler.supabase.com:5432"

Applying migration `20260122220940_init`

The following migration(s) have been created and applied from new schema changes:

prisma\migrations/
  └─ 20260122220940_init/
    └─ migration.sql

Your database is now in sync with your schema.

✔ Generated Prisma Client (6.19.2) to .\src\generated\prisma in 180ms
```

- Update your `db\index.ts` file and replace `import { PrismaClient } from '@/prisma/client';` with `import { PrismaClient } from '@/generated/prisma/client';`. Make sure that the `generated` folder has been created correctly first.
  
See: https://www.youtube.com/watch?v=O8Ae6MC5bf4

# GOOD PRACTICE & TIPS #
## IMPLEMENT PATH HELPERS ##
Make a list of all the paths you need in your app by specifying the path name, path and data shown. Once you have a clear overview, create the `src/paths.ts` file, declare all your app paths and export it so that you can use them in your app, for instance:

```ts
const paths = {
    home(){
        return `/`;
    },
    ingredients(ingredientSlug: string){
        return `/ingredients/${ingredientSlug}`
    }
    // add the rest of them
}

export default paths;
```
Path helpers in a Next.js project are important for several reasons:

- Maintainability: They centralize URL construction in one file (e.g., paths.ts), so if a route changes (e.g., from /ingredients to /recipes), you update it once instead of hunting through the codebase for hardcoded strings.
- Consistency: Ensures all links and redirects use the same path format, reducing bugs from typos or mismatches.
- Type Safety: With TypeScript, you can enforce parameter types (e.g., ingredientSlug: string), catching errors at compile time.
Readability: Code like paths.ingredients(slug) is clearer than inline string concatenation.
- Scalability: As your app grows, this prevents "magic strings" and makes refactoring easier.

## TIPS ##
- Make a list of all the paths you need in your app by specifying the path name, path and data shown and server action used in each path in order to have a clearer app structure in your head. You can add all server actions in your `actions` folder.