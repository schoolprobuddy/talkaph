import Link from "next/link";

export const metadata = {
  title: "Blog | talkaPH - Learn Filipino Languages Free",
  description:
    "Tips, culture, and guides for learning Tagalog, Cebuano, and Ilonggo — written by a native Filipino speaker.",
};

const posts = [
  {
    slug: "tagalog-phrases-for-tourists",
    category: "Travel",
    categoryColor: "bg-blue-100 text-blue-800",
    title: "20 Tagalog Phrases Every Tourist Needs",
    excerpt:
      "The essential phrases for your first trip to the Philippines — greetings, ordering food, getting around, and the one little word that makes every Filipino smile.",
    date: "July 2026",
    readTime: "7 min read",
  },
];

export default function BlogIndexPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900">talkaPH Blog</h1>
      <p className="mt-2 text-slate-600">
        Tips, culture, and guides for learning Filipino languages — written by
        a native speaker.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <span
              className={`self-start rounded-full px-3 py-1 text-xs font-medium ${post.categoryColor}`}
            >
              {post.category}
            </span>
            <h2 className="mt-3 text-lg font-semibold text-slate-900 group-hover:text-blue-600">
              {post.title}
            </h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
              {post.excerpt}
            </p>
            <p className="mt-4 text-xs text-slate-400">
              {post.date} · {post.readTime}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
