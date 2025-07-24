import Link from 'next/link';

interface BlogCardProps {
  post: {
    slug: string;
    title: string;
    metaDesc: string;
    coverImg: string;
    altText: string;
  };
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <Link 
      href={`/blog/${post.slug}`}
      passHref
      legacyBehavior
    >
      <a className="block h-full">
        <div className="group bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
          <div className="relative h-48 overflow-hidden">
            <img 
              src={post.coverImg} 
              alt={post.altText}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/images/blog/default.jpg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent"></div>
          </div>
          <div className="p-6 flex-grow">
            <h2 className="text-xl font-bold text-purple-900 mb-2 group-hover:text-purple-700 transition-colors">
              {post.title}
            </h2>
            <p className="text-gray-600 line-clamp-3">
              {post.metaDesc}
            </p>
          </div>
          <div className="px-6 pb-4">
            <span className="inline-flex items-center text-purple-600 font-medium group-hover:text-purple-800 transition-colors">
              Read more
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default BlogCard;