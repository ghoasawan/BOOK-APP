"use client";

import React from "react";
import { BookmarkAddOutlined } from "@mui/icons-material";
import Rating from "@mui/material/Rating";
import { motion } from "framer-motion";

interface bookInterface {
  title: string;
  rating: number;
  author: string;
  bookCover: string;
}

export default function BasicCard({
  title,
  rating,
  author,
  bookCover,
}: bookInterface) {
  return (
    <motion.div className="relative w-[320px] bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 px-[20px] cursor-pointer"
    whileHover={{
    scale: 1.05, // Slightly enlarges
    y: -5,       // Moves upward
    boxShadow: "0px 8px 25px rgba(0,0,0,0.15)", // Adds stronger shadow
  }}
  transition={{
    type: "spring",
    stiffness: 300,
    damping: 15,
  }}>
      {/* Header */}
      <div className="p-4 flex justify-between items-start">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <button className="absolute top-3 right-3 text-gray-500 hover:text-purple-600">
          <BookmarkAddOutlined />
        </button>
      </div>

      {/* Image */}
      <div className="w-full h-[200px] flex justify-center items-center bg-gray-100">
        <img
          src={bookCover}
          alt={title}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Footer */}
      <div className="p-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">Author: {author}</p>
          <Rating
            name="half-rating-read"
            value={rating}
            precision={0.5}
            readOnly
          />
        </div>
        <button className="ml-auto px-4 py-2 bg-purple-700 text-white text-sm font-semibold rounded-lg hover:bg-purple-800 transition cursor-pointer">
          View
        </button>
      </div>
    </motion.div>
  );
}
