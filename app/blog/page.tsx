import Link from "next/link";
import { blogPosts } from "@/data/blogPosts";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Digital Gift Cards Blog | ZakGift - Best E-Gift Ideas 2025",
  description: "Discover premium digital gift cards for gaming, shopping, food & more. 100% secure payments, instant delivery & best value.",
  keywords: "digital gift cards, e-gifts, gaming vouchers, shopping vouchers, food delivery gifts"
};

export default function BlogHome() {
  return (
    <div className="bg-gradient-to-b from-purple-50 to-white min-h-screen">
      {/* Animated Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-900 via-indigo-800 to-fuchsia-900 text-white py-24 md:py-32 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/3 -right-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block mb-6 bg-white/10 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full text-sm font-medium animate-fade-in">
            🎁 The Gift of Choice • Since 2023
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-down">
            ZakGift <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">Blog</span>
          </h1>
          <p className="text-xl md:text-2xl text-purple-200 max-w-3xl mx-auto animate-fade-in-up">
            Discover the ultimate digital gifting guides for every occasion
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 animate-fade-in-up delay-300">
            <span className="inline-flex items-center bg-purple-600/30 backdrop-blur-sm border border-purple-400/30 px-6 py-3 rounded-full text-purple-100 shadow-lg">
              ⚡ Instant Delivery
            </span>
            <span className="inline-flex items-center bg-indigo-600/30 backdrop-blur-sm border border-indigo-400/30 px-6 py-3 rounded-full text-indigo-100 shadow-lg">
              🔒 100% Secure
            </span>
            <span className="inline-flex items-center bg-pink-600/30 backdrop-blur-sm border border-pink-400/30 px-6 py-3 rounded-full text-pink-100 shadow-lg">
              🏆 Premium Brands
            </span>
          </div>
        </div>
      </div>

      {/* Featured Posts Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">Latest</span> Gift Guides
            </h2>
            <p className="text-lg text-gray-600">Expert-curated digital gift ideas for every recipient</p>
          </div>
          <div className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all hover:scale-105">
            <span>✨</span>
            <span>{blogPosts.length} Premium Guides</span>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link 
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={post.coverImg}
                  alt={post.altText}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent" />
                {post.category && (
                  <div className="absolute top-4 right-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
                    <span>🏷️</span>
                    <span>{post.category}</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  
                   
                  <span className="text-gray-500 text-sm flex items-center gap-1">
                    <span>⏱️</span>
                    <span>5 min read</span>
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{post.metaDesc}</p>
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

        {/* Value Proposition Section */}
        <div className="mt-24">
          <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-fuchsia-900 rounded-3xl p-0.5 shadow-2xl">
            <div className="bg-white rounded-[17px] p-8 md:p-12 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-72 h-72 bg-purple-100 rounded-full opacity-10"></div>
              <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-indigo-100 rounded-full opacity-10"></div>
              <div className="absolute top-1/2 right-1/2 w-48 h-48 bg-pink-100 rounded-full opacity-10"></div>
              
              <div className="relative z-10">
                <div className="text-center mb-2">
                  <span className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
                    Why ZakGift?
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
                  Revolutionizing <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Digital Gifting</span>
                </h3>
                <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12 text-lg">
                  We combine cutting-edge technology with premium gift experiences
                </p>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    {
                      icon: '🔐',
                      title: "Military-Grade Security",
                      desc: "Bank-level encryption and fraud protection for all transactions",
                      color: "from-purple-600 to-indigo-600"
                    },
                    {
                      icon: '⚡',
                      title: "Instant Delivery",
                      desc: "Digital codes delivered within seconds, 24/7 availability",
                      color: "from-blue-600 to-teal-600"
                    },
                    {
                      icon: '🏆',
                      title: "Premium Selection",
                      desc: "Curated collection of top gaming, shopping and dining brands",
                      color: "from-pink-600 to-rose-600"
                    }
                  ].map((item) => (
                    <div key={item.title} className="text-center">
                      <div className={`w-16 h-16 bg-gradient-to-r ${item.color} text-white text-2xl rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                        {item.icon}
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-12 text-center">
                  <Link 
                    href="/" 
                    className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                  >
                    Explore All Gift Cards
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="mt-24 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 md:p-12 border border-gray-100">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Get Weekly <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Gift Ideas</span>
            </h3>
            <p className="text-gray-600 mb-8">
              Join 10,000+ subscribers receiving curated gift guides and exclusive offers
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-medium shadow hover:shadow-md transition-all hover:scale-105">
                Subscribe
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}