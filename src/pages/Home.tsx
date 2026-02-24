import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components/index";
import dbService from "../appwrite/Db";
import type { PostDocument } from "../appwrite/Db";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<PostDocument[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await dbService.getPosts();
        setPosts(response.documents);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

 
if (loading) {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">

      
        <div className="
          w-10 h-10
          border-4
          border-gray-200 dark:border-slate-700
          border-t-blue-600 dark:border-t-blue-500
          rounded-full
          animate-spin
        " />

        <p className="text-gray-500 dark:text-slate-400 text-sm">
          Loading posts...
        </p>

      </div>
    </div>
  );
}

  
  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
        <p className="text-gray-500 dark:text-slate-400 text-lg">
          No posts available
        </p>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 py-12">

      <Container>

   
        <div className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-200">
            Latest Posts
          </h1>
          <p className="mt-2 text-gray-500 dark:text-slate-400 text-sm">
            Discover fresh content from our community.
          </p>
        </div>

 
        <div
          className="
          bg-gray-50 dark:bg-slate-950
          border border-gray-200 dark:border-slate-800
          rounded-2xl
          p-6
          shadow-sm
          "
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        </div>

      </Container>
    </div>
  );
}