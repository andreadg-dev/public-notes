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
      tags: ["bash"],
    },
    {
      title: `npx create-next-app@latest ./  --ts`,
      description: `It is used to automatically initialize a new NextJS project with the default configuration and in this case
      with typescript in the current folder. You can choose the following options during the set up: <img width="600px" src=".\\images\\newnextapp-settings.jpg">`,
      link: "https://nextjs.org/learn/dashboard-app/getting-started",
      logo: "nextjs",
      tags: ["bash"],
    },
    {
      title: `npm install @mui/material @emotion/react @emotion/styled @mui/material-nextjs @mui/icons-material`,
      description: `It is used to install several Material UI (MUI) libraries. After installing these libraries
      see https://mui.com/material-ui/integrations/nextjs/#configuration for the full configuration`,
      link: "https://mui.com/material-ui/integrations/nextjs/",
      logo: "nextjs",
      tags: ["bash"],
    },
    {
      title: `npm run dev\npnpm dev`,
      description: `These are two ways to start your Next.js development server on port 3000`,
      link: "https://nextjs.org/learn/dashboard-app/getting-started",
      logo: "nextjs",
      tags: ["bash"],
    },
    {
      title: `npm run build\nnpm run start`,
      description: `\`npm run build\` prepares your Next.js application for deployment to a production environment 
      compiling, minifying, and bundling your HTML, CSS, and JavaScript files to achieve the best possible performance.
      The command generates a \`.next\` folder in your project's root directory, and you run this command when you are ready to 
      deploy your application to a live server.\n\n \`npm run start\` runs your pre-compiled, production-ready Next.js application 
      by serving the optimized code from the \`.next\` folder.`,
      link: "",
      logo: "nextjs",
      tags: ["bash"],
    },
    {
      title: `@tailwind base;\n@tailwind components;\n@tailwind utilities;`,
      description: `@tailwind directives, Tailwind is a CSS framework that speeds up the development process by allowing 
      you to quickly write utility classes directly in your React code.`,
      link: "https://tailwindcss.com/docs/styling-with-utility-classes",
      logo: "nextjs",
      tags: ["css"],
    },
    {
      title: `CSS Modules`,
      description: `You can create a file with with all css classes, then import it in the target file for instance 
      \`import styles from '@/app/ui/home.module.css';\` and then add it to classes using the className attribute 
      \`<div className={styles.shape} />\`. The class shape is for instance \`.shape {
      border-bottom: 30px solid black;border-left: 20px solid transparent;}\``,
      link: "https://nextjs.org/learn/dashboard-app/css-styling",
      logo: "nextjs",
      tags: ["text"],
    },
    {
      title: `clsx`,
      description: `clsx is a library that lets you toggle class names easily. You can import it like this \`import clsx from 'clsx';\`. For example 
        
\`\`\`tsx
<span
  className={clsx(
    &apos;inline-flex items-center rounded-full px-2 py-1 text-sm&apos;,
    {
      &apos;bg-gray-100 text-gray-500&apos;: status === &apos;pending&apos;,
      &apos;bg-green-500 text-white&apos;: status === &apos;paid&apos;,
    },
  )}
>\`\`\``,
      link: "https://www.npmjs.com/package/clsx",
      logo: "nextjs",
      tags: ["text"],
    },
    {
      title: `next/font/google`,
      description: `You can import a google font from the google module. For instance, \`import { Inter } from 
      'next/font/google'; export const inter = Inter({ subsets: ['latin'] });\` and add it as a class in the className property,
      for instance \`<body className={&grave;\${inter.className} antialiased&grave;}>{children}</body>\``,
      link: "https://nextjs.org/learn/dashboard-app/optimizing-fonts-images",
      logo: "nextjs",
      tags: ["text"],
    },
    {
      title: `<Image
  src="/hero-desktop.png"
  width={1000}
  height={760}
  className="hidden md:block"
  alt="Screenshots of the dashboard project showing desktop version"
/>
  
//or, for a remote image

<Image 
  src={session.data?.user?.image || ''}
  alt="avatar picture" 
  width={60} 
  height={60}
/>
`,
      description: `You can import this component with \`import Image from 'next/image';\`.
      Next.js can serve static assets, like images, under the top-level \`/public\` folder. This component
      comes with automatic image optimization: preventing layout shift automatically when images are loading, resizing images to avoid 
      shipping large images to devices with a smaller viewport and lazy loading images by default (images load as they enter 
      the viewport). It's good practice to set the width and height of your images to avoid layout shift, these should be an 
      aspect ratio identical to the source image. These values are not the size the image is rendered, but instead the size 
      of the actual image file used to understand the aspect ratio. In case you want to use remote images, you need to add the allowed domains in your \`next.config.ts\`, for instance when adding google account avatar images:

\`\`\`tsx
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
\`\`\``,
      link: "https://nextjs.org/learn/dashboard-app/optimizing-fonts-images",
      logo: "nextjs",
      tags: ["tsx"],
    },
    {
      title: `<Link />\nusePathname()`,
      description: `You can import this component with \`import Link from 'next/link';\`. Next.js improves navigation 
      by automatically splitting your app's code by route segments instead of loading everything at once like a traditional 
      React SPA. This makes pages faster, isolates errors to individual pages, and reduces the amount of code the browser needs 
      to process. Additionally, Next.js prefetches linked pages in the background when their \`<Link>\` components appear on screen,
      enabling near-instant page transitions. This component can be used together with \`usePathname()\` to signal the user the 
      page their currently in, for instance:

\`\`\`ts
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// ...

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx('flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',{'bg-sky-100 text-blue-600': pathname === link.href,},)}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
\`\`\``,
      link: "https://nextjs.org/learn/dashboard-app/navigating-between-pages",
      logo: "nextjs",
      tags: ["tsx"],
    },
    {
      title: `page.tsx (ts,js,jsx)`,
      description: `\`page.tsx\` is a special Next.js file that exports a React component, and it's required for the 
      route to be accessible. The \`/app/page.tsx\` - this is the home page associated with the route /. For instance,
      the file \`/app/dashboard/page.tsx\` is associated with the \`/dashboard\` path. In the app directory, 
      nested folders define route structure. Each folder represents a route segment that is mapped to a corresponding segment 
      in a URL path. However, even though route structure is defined through folders, a route is not publicly accessible until 
      a \`page.tsx\` or \`route.tsx\` file is added to a route segment. And, even when a route is made publicly 
      accessible, only the content returned by \`page.tsx\` or \`route.tsx\` is sent to the client. This means that project 
      files can be safely colocated inside route segments in the app directory without accidentally being routable.`,
      link: "https://nextjs.org/learn/dashboard-app/creating-layouts-and-pages",
      logo: "nextjs",
      tags: ["text"],
    },
    {
      title: `layout.tsx (ts,js,jsx)`,
      description: `\`layout.tsx\` is a special Next.js file to create UI that is shared between multiple pages. The 
      layout will apply to the sibling \`page.tsx\` file and all the children \`page.tsx\` files found in the 
      subfolders/subroutes. One benefit of using layouts in Next.js is that on navigation, only the page components update while 
      the layout won't re-render. This is called partial rendering which preserves client-side React state in the layout when 
      transitioning between pages.
      For example:
\`\`\`tsx
      import { inter } from '@/app/ui/fonts';
 
      export default function RootLayout({
        children,
      }: {
        children: React.ReactNode;
      }) {
        return (
          <html lang="en">
            <body className={\`\${inter.className} antialiased\`}>{children}</body>
          </html>
        );
      }
\`\`\``,
      link: "https://nextjs.org/learn/dashboard-app/creating-layouts-and-pages",
      logo: "nextjs",
      tags: [],
    },
    {
      title: `notFound()\nnot-found.tsx`,
      description: `The \`notFound()\` function imported from next navigation, allows you to specify when to display
      a NOT FOUND page. You can even customize the page for each route by creating a \`not-found.tsx\` page in the 
      corresponding segment and add your own html. If none is created, Next.js will use the default bult-in one. In the example
      below, the server component shows the NOT FOUND page when a user is not in the users list:
\`\`\`tsx
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
\`\`\``,
      link: "https://nextjs.org/docs/app/api-reference/functions/not-found",
      logo: "nextjs",
      tags: ["text"],
    },
    {
      title: `loading.tsx (ts,js,jsx)`,
      description: `\`loading.tsx\` is a special Next.js file that will display in loading state for the corresponding
      route and subroutes. For instance, if you have a page that fetches data and it takes some time, the content of the loading page will
      be displayed in the meantime, for instance:
\`\`\`tsx
export default function Loading() {
  // Or a custom loading skeleton component
  return <p>Loading...</p>
}
\`\`\``,
      link: "https://nextjs.org/docs/app/api-reference/file-conventions/loading",
      logo: "nextjs",
      tags: ["text"],
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
      tags: ["text"],
    },
    {
      title: "'use client'",
      description: `In Next.js (App Router), components can be either Server Components or Client Components. By default, 
      all components in the app/ directory are Server Components, which are rendered on the server and sent as HTML to the 
      browser. These components are ideal for tasks like secure data fetching (e.g., from a database), server-side rendering 
      for SEO, and reducing client-side JavaScript. However, Server Components cannot use React hooks like useState or useEffect, 
      and they do not have access to browser APIs such as window or localStorage. They are not interactive on their own but can 
      include Client Components inside them. 
      \n\n
      In contrast, Client Components are rendered in the browser and must be 
      explicitly marked with the \`'use client'\` directive at the top of the file. These components support interactivity, such as 
      button clicks or dynamic state updates, and can use all React hooks as well as browser APIs. They are essential when 
      building UI elements that require user interaction. However, Client Components cannot perform secure server-side operations
      directly and rely on API routes or Server Components for that. Also, Client Components cannot render Server Components 
      within them — the flow of rendering must always start from the server.`,
      link: "https://nextjs.org/learn/dashboard-app/adding-search-and-pagination",
      logo: "nextjs",
      tags: ["tsx"],
    },
    {
      title: "useSearchParams\nusePathname\nuseRouter",
      description: `\`import { useSearchParams, usePathname, useRouter } from 'next/navigation';\` are used 
      to update a nextjs app page URL with the search parameters. They can be used in client components only.  
      In case you need to access the search parameters from a server component, you can pass them as props to the page
      itself, for instance \`export default async function Page(props: {searchParams?: Promise<{query?: string;page?: string;}>;}...\`
      Therefore the URL '.../dashboard/invoices' will include the search parameters and become '.../dashboard/invoices?query=lee'`,
      link: "https://nextjs.org/learn/dashboard-app/adding-search-and-pagination",
      logo: "nextjs",
      tags: ["tsx"],
    },
    {
      title: `pnpm i use-debounce`,
      description: `Install the library called use-debounce. Debouncing is a programming practice that limits the rate at which 
      a function can fire. For instance, if you need to call a search query function to fetch data from the database and 
      you only want to query the database when the user has stopped typing, you would use debouncing. If no debouncing is 
      implemented, the function will be executed at every key stroke. You just have to import the debounce function and wrap
      it around the function that needs to be delayed \`import { useDebouncedCallback } from 'use-debounce';\``,
      link: "https://nextjs.org/learn/dashboard-app/adding-search-and-pagination#best-practice-debouncing",
      logo: "nextjs",
      tags: ["bash"],
    },
    {
      title: `api\n\nroute.ts`,
      description: `If you need to create api endpoints in your app, you must create the \`api\` folder inside 
      the \`app\` folder, then you can create a subfolder for each specific endpoint and a \`route.ts\`
      page that contains the API logic for each endpoint. When writing the API calls, you name the function like the method
      the API call is using, for instance:
\`\`\`tsx
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Hello from the API" })
}
\`\`\``,
      link: "https://nextjs.org/blog/building-apis-with-nextjs",
      logo: "nextjs",
      tags: ["text"],
    },
    {
      title: `Metadata`,
      description: `Metadata is really important when it comes to SEO. You can add metadata globally by adding them in a
      declarative way in the main layout.tsx page or add it to each page.tsx individually in case specific metadata is 
      required. This is how you delcare it: 
\`\`\`tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "The best Next app out there",
  description: "Next app generated to be the best",
  keywords: "next, app, best, notes"	
};
\`\`\``,
      link: "https://nextjs.org/docs/app/getting-started/metadata-and-og-images",
      logo: "nextjs",
      tags: ["tsx"],
    },
    {
      title: ``,
      description: ``,
      link: "",
      logo: "nextjs",
      tags: [],
    },
  ],
};

function getLanguageTag(item) {
  if (typeof item === "string") {
    text = item.toLowerCase();
  }

  if ((typeof item === "object") & (item.length > 0)) {
    text = item.map((item) => {
      return item.toLowerCase();
    });
  }

  if (text.includes("text") || text.includes("plaintext")) return "plaintext";
  if (text.includes("js") || text.includes("javascript")) return "javascript";
  if (text.includes("sh") || text.includes("bash")) return "bash";
  if (text.includes("cmd") || text.includes("dos")) return "cmd";
  if (text.includes("sql")) return "sql";
  if (text.includes("html")) return "html";
  if (text.includes("xml")) return "xml";
  if (text.includes("ps1") || text.includes("powershell")) return "powershell";
  if (text.includes("json")) return "json";
  if (text.includes("ejs")) return "ejs";
  if (text.includes("nql") || text.includes("nexthink")) return "nql";
  if (text.includes("css")) return "css";
  if (
    text.includes("ts") ||
    text.includes("typescript") ||
    text.includes("tsx")
  )
    return "typescript";

  return "unidentified";
}

const adaptedNextJs = nextjs.items
  .filter((item) => item.title.trim().length > 0)
  .map((item) => {
    return {
      item:
        getLanguageTag(item.tags).includes("unidentified") ||
        getLanguageTag(item.tags).includes("plaintext")
          ? item.title
          : `\`\`\`${getLanguageTag(item.tags)}\n${item.title}\n\`\`\``,
      description: `${item.description} \n <a href="${item.link}" target="_blank">${item.link}</a>`,
      category: "dev_nextjs",
      tags: ["dev", "nextjs", ...item.tags],
    };
  });

const devSnippets = [
  {
    item: `python3 -m http.server 8000\nhttp-server -p 8000 -c-1`,
    description: `How to start a web server in localhost on port 8000 using either python or node-http-server. When running your server, 
      if you see 304 in the terminal, and your changes are not being applied, do a Ctrl+Alt+R to force a cache refresh in the browser.
      When using \`http-server -p 8080 -c-1\` the -c-1 flag sets the cache-control max-age to -1, forcing the browser to fetch 
      fresh content every time. You must install npm and node-http-server before being able to use this command.`,
    category: `dev_web`,
    tags: ["webdev", "bash"],
  },
];

const devSnippetsAdapted = devSnippets
  .filter((item) => item.item.trim().length > 0)
  .map((item) => {
    return {
      item:
        getLanguageTag(item.tags).includes("unidentified") ||
        getLanguageTag(item.tags).includes("plaintext")
          ? item.item
          : `\`\`\`${getLanguageTag(item.tags)}\n${item.item}\n\`\`\``,
      description: item.description,
      category: item.category,
      tags: item.tags,
    };
  });
