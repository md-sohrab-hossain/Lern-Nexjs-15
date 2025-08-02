import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-3xl mx-auto">
        <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">
          Next.js 14 API Route Handlers Demo
        </h1>
        <div className="p-6 mb-8 bg-white rounded-lg shadow">
          <h2 className="mb-2 text-xl font-semibold text-gray-800">
            API Route Structure
          </h2>
          <pre className="p-4 overflow-x-auto text-sm text-gray-800 bg-gray-100 rounded">
            {`app/
└── api/
    ├── comments/
    │   └── route.js        # Handles GET, POST for /api/comments
    ├── comments/[id]/
    │   └── route.js        # Handles GET, PUT, DELETE for /api/comments/:id
    ├── profile/
    │   └── route.js        # Handles GET, POST for /api/profile
    └── time/
        └── route.js        # Handles GET for /api/time
`}
          </pre>
        </div>
        <div className="p-6 mb-8 bg-white rounded-lg shadow">
          <h2 className="mb-2 text-xl font-semibold">
            How Route Handlers Work
          </h2>
          <ul className="pl-6 space-y-2 text-gray-800 list-disc">
            <li>
              <b>GET:</b> ডেটা রিড করার জন্য ব্যবহার হয়। উদাহরণ:{" "}
              <code>
                export async function GET(req) {"{"} ... {"}"}
              </code>
            </li>
            <li>
              <b>POST:</b> নতুন ডেটা যোগ করার জন্য। উদাহরণ:{" "}
              <code>
                export async function POST(req) {"{"} ... {"}"}
              </code>
            </li>
            <li>
              <b>PUT:</b> বিদ্যমান ডেটা আপডেট করার জন্য। উদাহরণ:{" "}
              <code>
                export async function PUT(req) {"{"} ... {"}"}
              </code>
            </li>
            <li>
              <b>DELETE:</b> ডেটা ডিলিট করার জন্য। উদাহরণ:{" "}
              <code>
                export async function DELETE(req) {"{"} ... {"}"}
              </code>
            </li>
            <li>
              <b>Dynamic Route:</b> <code>[id]</code> ফোল্ডার ব্যবহার করলে{" "}
              <code>/api/comments/123</code> এর মতো ডাইনামিক রাউট হ্যান্ডল করা
              যায়।
            </li>
          </ul>
        </div>
        <div className="p-6 mb-8 bg-white rounded-lg shadow">
          <h2 className="mb-2 text-xl font-semibold">API Demo Links</h2>
          <div className="flex flex-col gap-3">
            <a
              href="/api/comments"
              className="px-6 py-3 text-white bg-blue-600 rounded shadow hover:bg-blue-700"
            >
              GET /api/comments
            </a>
            <a
              href="/api/comments/1"
              className="px-6 py-3 text-white bg-green-600 rounded shadow hover:bg-green-700"
            >
              GET /api/comments/1
            </a>
            <a
              href="/api/profile"
              className="px-6 py-3 text-white bg-purple-600 rounded shadow hover:bg-purple-700"
            >
              GET /api/profile
            </a>
            <a
              href="/api/time"
              className="px-6 py-3 text-white bg-yellow-600 rounded shadow hover:bg-yellow-700"
            >
              GET /api/time
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
