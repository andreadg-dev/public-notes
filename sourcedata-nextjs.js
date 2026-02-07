const nextjs = {
  title: "nextjs",
  type: "list-items",
  navcategory: "menu",
  items: [
    {
      title: `npm install -g pnpm`,
      description: `pnpm as your package manager, as it's faster and more efficient than npm or yarn`,
      link: "https://nextjs.org/learn/dashboard-app/getting-started",
      logo: "nextjs",
    },
    {
      title: `npx create-next-app@latest ./  --ts`,
      description: `It is used to automatically initialize a new NextJS project with the default configuration and in this case
      with typescript in the current folder. You can choose the following options during the set up: <img width="600px" src=".\\images\\newnextapp-settings.jpg">`,
      link: "https://nextjs.org/learn/dashboard-app/getting-started",
      logo: "nextjs",
    },
    {
      title: `npm install @mui/material @emotion/react @emotion/styled @mui/material-nextjs @mui/icons-material`,
      description: `It is used to install several Material UI (MUI) libraries. After installing these libraries
      see <a href="https://mui.com/material-ui/integrations/nextjs/#configuration">https://mui.com/material-ui/integrations/nextjs/#configuration</a> for the full configuration`,
      link: "https://mui.com/material-ui/integrations/nextjs/",
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
      title: `api<br />route.ts`,
      description: `If you need to create api endpoints in your app, you must create the <code>api</code> folder inside 
      the <code>app</code> folder, then you can create a subfolder for each specific endpoint and a <code>route.ts</code>
      page that contains the API logic for each endpoint. When writing the API calls, you name the function like the method
      the API call is using, for instance:
      <pre><code>
      import { NextResponse } from "next/server";

      export async function GET() {
        return NextResponse.json({ message: "Hello from the API" })
      }
      </code></pre>
      `,
      link: "https://nextjs.org/blog/building-apis-with-nextjs",
      logo: "nextjs",
    },
    {
      title: `Metadata`,
      description: `Metadata is really important when it comes to SEO. You can add metadata globally by adding them in a
      declarative way in the main layout.tsx page or add it to each page.tsx individually in case specific metadata is 
      required. This is how you delcare it: <pre><code>
      import type { Metadata } from 'next'

      export const metadata: Metadata = {
        title: "The best Next app out there",
        description: "Next app generated to be the best",
        keywords: "next, app, best, notes"	
      };
      </code></pre>`,
      link: "https://nextjs.org/docs/app/getting-started/metadata-and-og-images",
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

const adaptedNextJs = nextjs.items.map((item) => {
  return {
    item: item.title,
    description: `${item.description} <br/> <a href="${item.link}" target="_blank">${item.link}</a>`,
    category: "dev-nextjs",
    tags: ["dev", "nextjs"],
  };
});
