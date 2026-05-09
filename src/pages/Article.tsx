import React, { useEffect, useState } from 'react';
import { useRoute, Link } from 'wouter';
import { PortableText } from '@portabletext/react';
import { Calendar, User, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { client, urlFor } from '../sanity/client';

const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <img
          alt={value.alt || ' '}
          loading="lazy"
          src={urlFor(value).width(800).fit('max').auto('format').url()}
          className="w-full rounded-xl my-8 shadow-xl border border-white/10"
        />
      );
    },
  },
  block: {
    h1: ({children}: any) => <h1 className="text-4xl font-bold mt-12 mb-6 text-white">{children}</h1>,
    h2: ({children}: any) => <h2 className="text-3xl font-bold mt-10 mb-5 text-white">{children}</h2>,
    h3: ({children}: any) => <h3 className="text-2xl font-bold mt-8 mb-4 text-white">{children}</h3>,
    normal: ({children}: any) => <p className="text-lg leading-relaxed text-white/80 mb-6 font-serif">{children}</p>,
    blockquote: ({children}: any) => <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-xl text-white/90 bg-white/5 rounded-r-lg">{children}</blockquote>,
  },
  list: {
    bullet: ({children}: any) => <ul className="list-disc pl-8 mb-6 space-y-2 text-white/80 text-lg">{children}</ul>,
    number: ({children}: any) => <ol className="list-decimal pl-8 mb-6 space-y-2 text-white/80 text-lg">{children}</ol>,
  },
};

import SEO from '../components/SEO';

export default function Article() {
  const [, params] = useRoute("/news/:slug");
  const slug = params?.slug;
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      client.fetch(`
        *[_type == "post" && slug.current == $slug][0] {
          title,
          publishedAt,
          author,
          mainImage,
          secondImage,
          excerpt,
          bodyEnglish,
          bodyHindi,
          "categories": categories[]->title
        }
      `, { slug }).then((data) => {
        setPost(data);
        setLoading(false);
      }).catch(console.error);
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-secondary flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-secondary flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-display mb-4">Article Not Found</h1>
        <Link href="/news">
          <a className="text-primary hover:underline flex items-center gap-2"><ArrowLeft size={20} /> Back to News</a>
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-secondary text-white pb-24">
      <SEO 
        title={post.title}
        description={post.excerpt || "Read the latest news from the Rotary Club of Unnao Royal Teachers' Championship."}
        image={post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : undefined}
        url={`/news/${slug}`}
        type="article"
      />
      {/* Article Header & Images */}
      <div className="pt-24 md:pt-32 pb-12">
        <div className="container mx-auto px-4 md:px-6">
          <Link href="/news">
            <a className="inline-flex items-center gap-2 text-white/70 hover:text-primary transition-colors mb-8 text-sm uppercase tracking-widest font-bold">
              <ArrowLeft size={16} /> Back to News
            </a>
          </Link>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {post.mainImage && (
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src={urlFor(post.mainImage).url()} 
                  alt={post.title}
                  className="w-full h-auto object-contain bg-black/20"
                />
              </div>
            )}
            {post.secondImage && (
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src={urlFor(post.secondImage).url()} 
                  alt={`${post.title} - Second Image`}
                  className="w-full h-auto object-contain bg-black/20"
                />
              </div>
            )}
            {!post.secondImage && post.mainImage && (
              <div className="hidden md:block"></div>
            )}
          </div>

          <div className="max-w-5xl">
            {post.categories && post.categories.length > 0 && (
              <div className="mb-6 flex gap-3 flex-wrap">
                {post.categories.map((cat: string) => (
                  <span key={cat} className="bg-primary text-secondary text-xs font-bold px-3 py-1 uppercase tracking-wider">
                    {cat}
                  </span>
                ))}
              </div>
            )}
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-8 text-white">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/70 text-sm md:text-base font-medium border-t border-white/10 pt-6">
              <div className="flex items-center gap-2">
                <Calendar className="text-primary" size={18} />
                {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-primary" size={18} />
                {new Date(post.publishedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </div>
              {post.author && (
                <div className="flex items-center gap-2">
                  <User className="text-primary" size={18} />
                  {post.author}
                </div>
              )}
              <div className="flex-grow"></div>
              <button 
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: post.title,
                      text: post.excerpt,
                      url: window.location.href,
                    }).catch(console.error);
                  } else {
                    // Fallback: Copy to clipboard
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied to clipboard!");
                  }
                }}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Share2 size={18} /> Share
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 mt-12 md:mt-20">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 lg:col-start-3">
            
            {/* English Content */}
            {post.bodyEnglish && post.bodyEnglish.length > 0 && (
              <div className="prose prose-invert prose-lg max-w-none">
                <PortableText value={post.bodyEnglish} components={ptComponents} />
              </div>
            )}
            
            {post.bodyEnglish && post.bodyHindi && (
              <div className="my-16 border-t border-white/10 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-secondary px-4 text-white/30 font-serif italic text-xl">
                  ~ ॐ ~
                </div>
              </div>
            )}

            {/* Hindi Content */}
            {post.bodyHindi && post.bodyHindi.length > 0 && (
              <div className="prose prose-invert prose-lg md:prose-xl max-w-none font-serif leading-loose text-white/90">
                <PortableText value={post.bodyHindi} components={ptComponents} />
              </div>
            )}
            
          </div>
        </div>
      </div>
    </article>
  );
}
