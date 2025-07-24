import Link from "next/link";
import { blogPosts } from "@/data/blogPosts";

export default function BlogIndex() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-purple-700 mb-4">Our Blog</h1>
      <p className="text-lg text-gray-600 mb-10">
        Explore our digital gift card ideas, tips, and inspirations.
      </p>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-xl overflow-hidden border border-gray-200 shadow hover:shadow-xl transition"
          >
            <img
              src={post.coverImg}
              alt={post.altText}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-purple-700 group-hover:underline">
                {post.title}
              </h2>
              <p className="text-gray-500 mt-2 text-sm">{post.metaDesc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
