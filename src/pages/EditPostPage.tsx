import React, { useState, useEffect } from "react";
import { Container, PostForm } from "../components";
import dbService from "../appwrite/Db";
import { useNavigate, useParams } from "react-router-dom";
import type { PostDocument } from "../appwrite/Db";

export default function EditPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostDocument | null>(null);

  useEffect(() => {
    if (!slug) {
      navigate("/");
      return;
    }

    const fetchPost = async () => {
      try {
        const response = await dbService.getPost(slug);
        setPost(response);
      } catch (error) {
        console.error("Error fetching post:", error);
        navigate("/");
      }
    };

    fetchPost();
  }, [slug, navigate]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 py-12 px-4">

      <Container>

      
        <div className="mb-10 text-center">
          <h1 className="
            text-3xl font-semibold
            text-gray-900 dark:text-gray-200
          ">
            Edit Your Post
          </h1>

          <p className="
            mt-2 text-sm
            text-gray-500 dark:text-slate-400
          ">
            Update your content and keep your audience engaged.
          </p>
        </div>

        <div className="
          bg-gray-50 dark:bg-slate-950
          border border-gray-200 dark:border-slate-800
          rounded-2xl
          shadow-sm
          p-6
        ">

          {post ? (
            <PostForm post={post} />
          ) : (
            <div className="flex justify-center items-center py-20">
              <p className="text-gray-500 dark:text-slate-400">
                Loading post...
              </p>
            </div>
          )}

        </div>

      </Container>
    </div>
  );
}