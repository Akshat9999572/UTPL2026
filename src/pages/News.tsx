import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Home } from 'lucide-react';
import { Link } from 'wouter';
import { client, urlFor } from '../sanity/client';

import SEO from '../components/SEO';

export default function News() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        publishedAt,
        excerpt,
        author,
        mainImage,
        "categories": categories[]->title
      }
    `).then((data) => {
      setPosts(data);
      setLoading(false);
    }).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-secondary text-white pt-24 pb-16">
      <SEO 
        title="Latest News"
        description="Official press releases, match reports, and announcements from the UTPL organization."
        url="/news"
      />
      {/* Hero Section */}
      <div className="bg-primary/5 py-16 border-b border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="uppercase tracking-[0.3em] text-primary text-sm font-bold mb-2 flex items-center gap-2">
                <span className="w-8 h-1 bg-primary"></span>
                Media Center
              </p>
              <h1 className="text-4xl md:text-6xl font-display text-white mb-4">LATEST NEWS</h1>
              <p className="text-white/70 max-w-xl text-lg">Official press releases, match reports, and announcements from the UTPL organization.</p>
            </div>
            <Link href="/">
              <a className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-3 text-primary hover:bg-primary hover:text-secondary transition-colors text-sm uppercase tracking-widest font-bold">
                <Home size={18} /> Home
              </a>
            </Link>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="container mx-auto px-4 md:px-6 mt-16">
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="animate-pulse bg-white/5 rounded-2xl h-[450px]"></div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <motion.div 
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-primary/50 transition-all duration-300 flex flex-col h-full"
              >
                <div className="aspect-[16/10] overflow-hidden relative bg-black/40">
                  {post.mainImage ? (
                    <img 
                      src={urlFor(post.mainImage).width(600).height(400).url()} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/20">No Image</div>
                  )}
                  {post.categories && post.categories.length > 0 && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="bg-primary text-secondary text-xs font-bold px-3 py-1 uppercase tracking-wider shadow-md inline-block">
                        {post.categories[0]}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 text-white/50 text-sm font-medium mb-4">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      {post.author && (
                        <div className="flex items-center gap-1.5">
                          <User size={14} />
                          {post.author}
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-white/70 line-clamp-3 mb-6">
                      {post.excerpt}
                    </p>
                  </div>
                  
                  <Link href={`/news/${post.slug.current}`}>
                    <a className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm hover:gap-3 transition-all mt-auto pt-4 border-t border-white/10">
                      Read Article <ArrowRight size={16} />
                    </a>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {!loading && posts.length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
            <h3 className="text-2xl font-display mb-2">No news articles found</h3>
            <p className="text-white/60">Check back later for updates and press releases.</p>
          </div>
        )}
      </div>
    </div>
  );
}
