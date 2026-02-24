import React from "react";
import { Link } from "react-router-dom";
import { CommonBtn, Container } from "../components";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center px-4">
      <Container>
        <div className="max-w-2xl mx-auto text-center">

          <h1 className="text-7xl sm:text-8xl font-extrabold 
                         text-blue-600 dark:text-blue-500 tracking-tight">
            404
          </h1>


          <h2 className="mt-6 text-2xl sm:text-3xl font-semibold 
                         text-gray-900 dark:text-gray-200">
            Page Not Found
          </h2>

    
          <p className="mt-4 text-gray-500 dark:text-slate-400">
            The page you're looking for doesn’t exist or may have been moved.
          </p>

        
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">

            <Link to="/">
              <CommonBtn size="lg" variant="primary">
                Go Back Home
              </CommonBtn>
            </Link>

            <Link to="/all-posts">
              <CommonBtn size="lg" variant="ghost">
                Browse Posts
              </CommonBtn>
            </Link>

          </div>

        </div>
      </Container>
    </div>
  );
}