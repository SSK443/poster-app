import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useNavigate, useParams } from "react-router-dom";
import dbService from "../appwrite/Db";
import parse from "html-react-parser";
import { CommonBtn, Container } from "../components";
import { Link } from "react-router-dom";
import type { PostDocument } from "../appwrite/Db";



export default function PostPage() {
  const [post, setPost] = useState<PostDocument | null>(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state: RootState) => state.auth.userDetails);
  const isAuthor =
    post?.userId && userData ? post.userId === userData.$id : false;


  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (slug) {
          const response = await dbService.getPost(slug);
          if (response) {
            setPost(response);
          } else {
            navigate("/");
          }
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        navigate("/");
      }
    };

    fetchPost();
  }, [slug, navigate]);


  const handleDeletePost = async () => {
    if (!post) return;

    try {
      await dbService.deletePost(post.$id);
      await dbService.deleteFile(post.featuredImage);
      navigate("/");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  const imgUrl=`https://sgp.cloud.appwrite.io/v1/storage/buckets/695b6e9d003cc8cc8ac6/files/${post?.featuredImage??""}/view?project=695b665d00283bcbf8d9`


  return post ? (
    <div className="min-h-screen bg-white dark:bg-slate-900 py-12">
      <Container>
        <div className="max-w-4xl mx-auto">
 
          <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-800 shadow-sm">
            <img
              src={imgUrl}
              alt={post.title}
              className="w-full h-[400px] object-cover"
            />
          </div>

     
          <div
            className="mt-8 bg-gray-50 dark:bg-slate-950 
                        border border-gray-200 dark:border-slate-800 
                        rounded-2xl p-8 shadow-sm"
          >
        
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200">
              {post.title}
            </h1>

  
            {isAuthor && (
              <div className="flex gap-4 mt-6">
                <Link to={`/edit-post/${post.$id}`}>
                  <CommonBtn size="md" variant="primary">
                    Edit Post
                  </CommonBtn>
                </Link>

                <CommonBtn
                  size="md"
                  variant="secondary"
                  onClick={handleDeletePost}
                >
                  Delete Post
                </CommonBtn>
              </div>
            )}

            <div className="my-8 border-t border-gray-200 dark:border-slate-800" />


            <div className="prose prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
              {parse(post.content)}
            </div>
          </div>
        </div>
      </Container>
    </div>
  ) : (
    <div className="min-h-screen bg-white dark:bg-slate-900 py-12">
      <Container>
        <div className="max-w-4xl mx-auto space-y-8 animate-pulse">
        
          <div
            className="h-[400px] rounded-2xl 
                          bg-gray-200 dark:bg-slate-800 
                          border border-gray-200 dark:border-slate-800"
          />

          <div
            className="bg-gray-50 dark:bg-slate-950 
                          border border-gray-200 dark:border-slate-800 
                          rounded-2xl p-8 space-y-6"
          >
        
            <div className="h-8 w-3/4 bg-gray-200 dark:bg-slate-800 rounded" />

            <div className="flex gap-4">
              <div className="h-10 w-28 bg-gray-200 dark:bg-slate-800 rounded-lg" />
              <div className="h-10 w-28 bg-gray-200 dark:bg-slate-800 rounded-lg" />
            </div>

     
            <div className="space-y-4 mt-6">
              <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-full" />
              <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-5/6" />
              <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-4/6" />
              <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-3/6" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
