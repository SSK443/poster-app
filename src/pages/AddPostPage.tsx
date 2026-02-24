import React from "react";
import { Container, PostForm } from "../components";

export default function AddPostPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 py-12">
      <Container>

        <div className="max-w-6xl mx-auto">

       
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-200">
              Create New Post
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">
              Share your thoughts with the community.
            </p>
          </div>

     
          <div className="
            bg-gray-50 dark:bg-slate-950
            border border-gray-200 dark:border-slate-800
            rounded-2xl
            shadow-sm
            p-6 md:p-8
          ">
            <PostForm />
          </div>

        </div>

      </Container>
    </div>
  );
}