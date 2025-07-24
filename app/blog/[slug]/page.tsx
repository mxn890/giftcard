import { blogPosts } from "@/data/blogPosts";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface BlogPageProps {
  params: { slug: string };
}

// ✅ For SEO metadata
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.metaDesc,
  };
}

// ✅ For static generation
export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default function BlogPostPage({ params }: BlogPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-purple-700 mb-6">{post.title}</h1>
      <img
        src={post.coverImg}
        alt={post.altText}
        className="rounded-xl shadow mb-8"
      />
      <article
        className="prose prose-lg max-w-none prose-headings:text-purple-700 prose-a:text-purple-600 prose-a:underline"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}
