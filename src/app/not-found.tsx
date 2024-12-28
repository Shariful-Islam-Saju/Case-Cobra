import React from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";

const NotFound = () => {
  return (
    <MaxWidthWrapper>
      <div className="flex flex-col justify-center items-center h-[80vh] bg-gray-100 text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Go Back Home
        </Link>
      </div>
    </MaxWidthWrapper>
  );
};

export default NotFound;
