import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-3xl mx-auto">
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
          Next.js 14 Parallel & Intercepting Routes Demo
        </h1>
        <div className="p-6 mb-8 bg-white rounded-lg shadow">
          <h2 className="mb-2 text-xl font-semibold">Routing Structure</h2>
          <pre className="p-4 overflow-x-auto text-sm text-gray-800 bg-gray-100 rounded">
            {`app/
└── parallel-dashboard/
    ├── layout.js
    ├── page.js
    ├── @assignments/
    │   └── page.js
    ├── @notifications/
    │   └── page.js
    ├── @quiz/
    │   └── page.js
    ├── (..)contact/
    │   └── page.js   # Intercepting route for /contact
    └── (.)folder2/
        └── page.js   # Intercepting route for /folder2
`}
          </pre>
        </div>
        <div className="p-6 mb-8 bg-white rounded-lg shadow">
          <h2 className="mb-2 text-xl font-semibold">
            How Unmatched & Intercepting Routes Work
          </h2>
          <ul className="pl-6 space-y-2 text-gray-800 list-disc">
            <li>
              <b>Unmatched Route:</b> যদি কোনো রুট মিলে না যায়, Next.js
              fallback হিসেবে <code>not-found.js</code> রেন্ডার করে。
            </li>
            <li>
              <b>Intercepting Route:</b> <code>(.)</code> বা <code>(..)</code>
              ফোল্ডার ব্যবহার করলে, আপনি অন্য রুটের জন্য কাস্টম পেজ দেখাতে
              পারেন。 যেমন, <code>app/folder1/(.)folder2/page.js</code> হলে,
              <code>/folder1/folder2</code> রিকোয়েস্টে এই পেজ রেন্ডার হবে,
              কিন্তু URL পরিবর্তন হবে না。
            </li>
          </ul>
        </div>
        <div className="p-6 mb-8 bg-white rounded-lg shadow">
          <h2 className="mb-2 text-xl font-semibold">Demo Links</h2>
          <div className="flex flex-col gap-3">
            <a
              href="/parallel-dashboard"
              className="px-6 py-3 text-white bg-blue-600 rounded shadow hover:bg-blue-700"
            >
              Dashboard (Parallel Routes)
            </a>
            <a
              href="/folder1/folder2"
              className="px-6 py-3 text-white bg-green-600 rounded shadow hover:bg-green-700"
            >
              Intercepting Route: /folder1/(.)folder2
            </a>
            <a
              href="/parallel-dashboard/contact"
              className="px-6 py-3 text-white bg-purple-600 rounded shadow hover:bg-purple-700"
            >
              Intercepting Route: /parallel-dashboard/(..)contact
            </a>
            <a
              href="/unmatched-url"
              className="px-6 py-3 text-white bg-red-600 rounded shadow hover:bg-red-700"
            >
              Unmatched Route (404)
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
