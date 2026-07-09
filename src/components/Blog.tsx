/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { BookOpen, Search, Clock, User, Calendar, ArrowRight, ArrowLeft, Heart, Sparkles } from "lucide-react";
import { BlogPost } from "../types";

interface BlogProps {
  blogs: BlogPost[];
  onAddBlog?: (blog: BlogPost) => void;
}

export default function Blog({ blogs }: BlogProps) {
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Care", "Feeding", "Grooming", "Training", "Health"];

  // Filter blogs
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            blog.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            blog.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [blogs, searchQuery, selectedCategory]);

  const handleReadBlog = (blog: BlogPost) => {
    setSelectedBlog(blog);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToGrid = () => {
    setSelectedBlog(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-[#FDFBF7] py-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* IF A SPECIFIC BLOG IS SELECTED FOR READING */}
        {selectedBlog ? (
          <div className="max-w-4xl mx-auto space-y-10 animate-fade-in" id="blog-reader">
            {/* Back to Blog Grid */}
            <button
              onClick={handleBackToGrid}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 bg-white text-xs font-semibold text-neutral-600 hover:text-[#C5A880] hover:border-[#C5A880] transition-colors cursor-pointer"
              id="back-to-blogs-btn"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Care Blog</span>
            </button>

            {/* Header Block */}
            <div className="space-y-6">
              <span className="inline-block px-3 py-1 bg-[#C5A880]/15 text-[#C5A880] rounded-md text-[10px] font-bold uppercase tracking-wider">
                {selectedBlog.category} Article
              </span>
              
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-800 leading-tight">
                {selectedBlog.title}
              </h1>

              {/* Author and Date Meta */}
              <div className="flex flex-wrap items-center gap-5 text-xs text-neutral-500 border-y border-neutral-100 py-4 font-medium">
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-neutral-400" />
                  <span>By {selectedBlog.author}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-neutral-400" />
                  <span>Published: {selectedBlog.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-neutral-400" />
                  <span>Reading duration: {selectedBlog.readTime}</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-neutral-100 border border-[#C5A880]/10 shadow-sm">
              <img
                src={selectedBlog.image}
                alt={selectedBlog.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Article Content - Handparsed styling to render beautiful markdown formatting safely */}
            <div className="prose max-w-none text-neutral-700 text-xs sm:text-sm leading-relaxed space-y-6 bg-white border border-[#C5A880]/10 rounded-3xl p-6 sm:p-10 shadow-xs">
              {selectedBlog.content.split("\n\n").map((para, pIdx) => {
                if (para.startsWith("###")) {
                  // Render Sub-heading
                  return (
                    <h3 key={pIdx} className="font-serif text-lg sm:text-xl font-bold text-neutral-800 mt-6 pt-4 border-t border-neutral-100 first:border-0 first:mt-0 first:pt-0">
                      {para.replace("###", "").trim()}
                    </h3>
                  );
                } else if (para.startsWith("-") || para.startsWith("*")) {
                  // Render Bullets list
                  return (
                    <ul key={pIdx} className="list-disc pl-5 space-y-2.5 my-4">
                      {para.split("\n").map((bullet, bIdx) => (
                        <li key={bIdx} className="text-neutral-600">
                          {bullet.replace(/^[-*]\s*/, "").trim()}
                        </li>
                      ))}
                    </ul>
                  );
                } else if (/^\d+\./.test(para)) {
                  // Render Numbered list
                  return (
                    <ol key={pIdx} className="list-decimal pl-5 space-y-2.5 my-4">
                      {para.split("\n").map((numLine, nIdx) => (
                        <li key={nIdx} className="text-neutral-600">
                          {numLine.replace(/^\d+\.\s*/, "").trim()}
                        </li>
                      ))}
                    </ol>
                  );
                } else {
                  // Render Standard Paragraph
                  return (
                    <p key={pIdx} className="leading-relaxed">
                      {para}
                    </p>
                  );
                }
              })}
            </div>

            {/* Interactive Footer */}
            <div className="bg-[#C5A880]/5 border border-[#C5A880]/10 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-center sm:text-left">
                <h4 className="font-serif text-sm font-bold text-neutral-800">Was this guide helpful?</h4>
                <p className="text-[10px] text-neutral-500">We write our blogs alongside pediatric veterinarians.</p>
              </div>
              <button
                onClick={handleBackToGrid}
                className="px-6 py-2 bg-[#C5A880] text-white rounded-full text-xs font-bold hover:bg-[#b0936b] transition shadow-xs cursor-pointer"
              >
                Return to Care Center
              </button>
            </div>
          </div>
        ) : (
          /* STANDARD BLOG GRID VIEW */
          <div className="space-y-12">
            
            {/* Page Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#C5A880]">Knowledge Hub</span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-800">
                Yorkshire Terrier <span className="text-[#C5A880]">Care & Feeding Center</span>
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                Expert breeder guidelines, dietary blueprints, grooming steps, and common Yorkie wellness advice to guarantee your companion's longevity.
              </p>
              <div className="w-16 h-1 bg-[#C5A880] mx-auto rounded-full"></div>
            </div>

            {/* Filter and Search Bar */}
            <div className="bg-white rounded-2xl border border-[#C5A880]/15 p-4 sm:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Category buttons */}
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
                      selectedCategory === cat
                        ? "bg-[#C5A880] text-white"
                        : "text-neutral-600 hover:bg-neutral-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-3.5 h-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search care guides..."
                  className="w-full pl-9 pr-4 py-2 border border-neutral-200 rounded-lg text-xs focus:ring-1 focus:ring-[#C5A880] focus:border-[#C5A880] outline-none"
                />
              </div>
            </div>

            {/* Empty State */}
            {filteredBlogs.length === 0 && (
              <div className="text-center py-16 bg-white border border-[#C5A880]/10 rounded-2xl max-w-md mx-auto p-6">
                <BookOpen className="w-10 h-10 text-[#C5A880]/40 mx-auto mb-3" />
                <h3 className="font-serif text-base font-bold text-neutral-800">No Articles Found</h3>
                <p className="text-xs text-neutral-400 mt-1">Try resetting your filters or modifying your keyword search.</p>
              </div>
            )}

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <div
                  key={blog.id}
                  id={`blog-card-${blog.id}`}
                  onClick={() => handleReadBlog(blog)}
                  className="group bg-white border border-[#C5A880]/15 rounded-3xl overflow-hidden hover:shadow-xl hover:border-[#C5A880]/30 transition-all duration-300 flex flex-col justify-between cursor-pointer"
                >
                  <div className="space-y-4">
                    {/* Thumbnail Image */}
                    <div className="relative aspect-video overflow-hidden bg-neutral-100">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/95 backdrop-blur-md text-neutral-800 border border-white/40 shadow-xs px-2.5 py-1 rounded text-[10px] font-extrabold uppercase tracking-wider">
                          {blog.category}
                        </span>
                      </div>
                    </div>

                    {/* Metadata Content */}
                    <div className="px-6 space-y-2">
                      <div className="flex gap-4 text-[10px] text-neutral-400 font-semibold uppercase tracking-wider">
                        <span>{blog.date}</span>
                        <span>•</span>
                        <span>{blog.readTime}</span>
                      </div>

                      <h3 className="font-serif text-lg font-bold text-neutral-800 group-hover:text-[#C5A880] transition-colors leading-snug line-clamp-2">
                        {blog.title}
                      </h3>

                      <p className="text-xs text-neutral-500 leading-relaxed line-clamp-3">
                        {blog.summary}
                      </p>
                    </div>
                  </div>

                  {/* Read More button */}
                  <div className="px-6 pb-6 pt-4 border-t border-neutral-100 mt-5 flex items-center justify-between text-xs font-bold text-[#C5A880]">
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Read Expert Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[10px] text-neutral-400 font-normal">By {blog.author.split(" ")[0]}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
