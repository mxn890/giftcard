import { blogPosts } from "@/data/blogPosts";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find(p => p.slug === params.slug);
  if (!post) return { title: "Post Not Found" };
  
  return {
    title: `${post.title} | ZakGift Digital Cards`,
    description: post.metaDesc,
    keywords: ["digital gift cards", "e-gift ideas", "online vouchers", ...post.title.toLowerCase().split(" ")],
    openGraph: {
      images: [post.coverImg],
    },
  };
}

export async function generateStaticParams() {
  return blogPosts.map(post => ({ slug: post.slug }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts.find(p => p.slug === params.slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-purple-900 via-indigo-800 to-fuchsia-900 text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/gradient-mesh.svg')] bg-cover opacity-20 mix-blend-overlay"></div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full mb-6 shadow-sm">
              <span className="text-yellow-300 mr-2">✨</span>
              <span className="text-sm font-medium">Premium Gift Guide</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-300 to-pink-300 text-transparent bg-clip-text">
                {post.title}
              </span>
            </h1>
            
            <div className="max-w-2xl mx-auto">
              <p className="text-xl text-purple-200 mb-8">{post.metaDesc}</p>
              
              <div className="flex flex-wrap justify-center gap-3">
                <div className="flex items-center bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full shadow-sm">
                  <span className="mr-2">⏱️</span>
                  <span>5 min read</span>
                </div>
                <div className="flex items-center bg-white/20 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full shadow-sm">
                  <span className="mr-2">📅</span>
                  <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Share Buttons */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-20 hidden md:block">
        <div className="flex flex-col space-y-3">
          <button className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition hover:bg-blue-600">
            <span className="sr-only">Share on Twitter</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </button>
          <button className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition hover:bg-indigo-700">
            <span className="sr-only">Share on Facebook</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
            </svg>
          </button>
          <button className="w-12 h-12 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition hover:bg-pink-600">
            <span className="sr-only">Share via Email</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <article className="relative max-w-3xl mx-auto px-4 py-12 md:py-16">
        {/* Featured Image */}
        <div className="relative mb-16 group">
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-75 blur-lg group-hover:opacity-100 transition duration-500"></div>
          <img
            src={post.coverImg}
            alt={post.altText}
            className="relative w-full h-auto rounded-xl shadow-2xl z-10 transform group-hover:scale-[1.01] transition duration-500"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none 
          prose-headings:font-bold prose-headings:text-gray-900
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
          prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-5
          prose-p:text-gray-700 prose-p:leading-relaxed
          prose-a:text-purple-600 prose-a:font-medium hover:prose-a:text-purple-800
          prose-strong:text-gray-900
          prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:bg-purple-50 prose-blockquote:px-6 prose-blockquote:py-3 prose-blockquote:text-gray-700
          prose-ul:list-disc prose-ul:pl-6
          prose-ol:list-decimal prose-ol:pl-6
          prose-img:rounded-lg prose-img:shadow-md prose-img:mx-auto
        ">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

       

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl p-8 md:p-10 text-center shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Send Digital Gifts?
          </h2>
          <p className="text-purple-200 max-w-2xl mx-auto mb-8">
            Instant delivery, top brands, and perfect for any occasion.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/gift-cards" 
              className="bg-white text-purple-900 px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-purple-50 transition-all duration-300 flex-1 sm:flex-none text-center"
            >
              Browse Gift Cards
            </Link>
            <Link 
              href="/how-it-works" 
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-white/10 transition-all duration-300 flex-1 sm:flex-none text-center"
            >
              How It Works
            </Link>
          </div>
        </div>

        {/* Related Posts */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              More Gift Guides
            </h2>
            <Link href="/blog" className="text-purple-600 hover:text-purple-800 font-medium flex items-center transition-colors">
              View All
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.filter(p => p.slug !== post.slug).slice(0, 3).map(relatedPost => (
              <Link
                key={relatedPost.slug}
                href={`/blog/${relatedPost.slug}`}
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={relatedPost.coverImg}
                    alt={relatedPost.altText}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full font-medium">
                      {relatedPost.category || 'Gift Cards'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{relatedPost.metaDesc}</p>
                  <div className="flex items-center text-purple-600 font-medium group-hover:text-purple-800 transition-colors">
                    Read Guide
                    <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}