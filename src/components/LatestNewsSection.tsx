import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { client, urlFor } from '../sanity/client';

export default function LatestNewsSection() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.fetch(`
      *[_type == "post"] | order(publishedAt desc)[0...3] {
        _id,
        title,
        slug,
        publishedAt,
        excerpt,
        mainImage,
        "categories": categories[]->title
      }
    `).then((data) => {
      setPosts(data);
      setLoading(false);
    }).catch(console.error);
  }, []);

  return (
    <section id="news" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-muted transform -skew-x-12 translate-x-20 -z-10"></div>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="flex flex-col items-start">
            <span className="text-primary font-bold tracking-widest uppercase mb-2">Media Center</span>
            <h2 className="text-5xl md:text-6xl font-display text-secondary">LATEST NEWS</h2>
            <div className="w-24 h-1 bg-primary mt-6"></div>
          </div>
          <Link href="/news">
            <a className="inline-flex items-center gap-2 text-primary font-bold tracking-wider hover:gap-3 transition-all">
              VIEW ALL NEWS <ArrowRight size={20} />
            </a>
          </Link>
        </div>
        
        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse bg-secondary/10 rounded-xl h-[400px]"></div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {posts.map((post, idx) => (
              <motion.div 
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group flex flex-col bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors shadow-sm hover:shadow-xl"
              >
                <div className="aspect-[16/10] overflow-hidden relative bg-muted">
                  {post.mainImage ? (
                    <img 
                      src={urlFor(post.mainImage).width(600).height(400).url()} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">No Image</div>
                  )}
                  {post.categories && post.categories.length > 0 && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-secondary text-xs font-bold px-3 py-1 uppercase tracking-wider shadow-md">
                        {post.categories[0]}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold uppercase tracking-wider mb-3">
                    <Calendar size={14} className="text-primary" />
                    {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground line-clamp-2 mb-6 text-sm flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <Link href={`/news/${post.slug.current}`}>
                    <a className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-xs hover:gap-3 transition-all mt-auto pt-4 border-t border-border">
                      Read Full Article <ArrowRight size={14} />
                    </a>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
