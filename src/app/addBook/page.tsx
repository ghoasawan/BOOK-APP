"use client";

import React, { useState } from "react";
import { FaBook } from "react-icons/fa";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { BackgroundBeams } from "../components/ui/shadcn-io/background-beams";
import { useRouter } from "next/navigation";
import { IoCloseSharp } from "react-icons/io5";

interface BookFormValues {
  title: string;
  coverPhoto: File | null;
  author: string;
  rating: string;
  genre: string;
  description: string;
  pages: string;
}

export default function AddBookForm() {
  const router = useRouter();
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const BookSchema = Yup.object().shape({
    title: Yup.string()
      .required("Title is required")
      .min(2, "Title must be at least 2 characters"),

    author: Yup.string()
      .required("Author is required")
      .min(2, "Author must be at least 2 characters"),

    rating: Yup.number()
      .min(0, "Rating must be between 0 and 5")
      .max(5, "Rating must be between 0 and 5")
      .nullable(),

    genre: Yup.string().required("Genre is required"),

    description: Yup.string().max(
      1000,
      "Description must be less than 1000 characters"
    ),

    pages: Yup.number()
      .positive("Pages must be a positive number")
      .integer("Pages must be a whole number")
      .nullable(),
  });

  const initialValues: BookFormValues = {
    title: "",
    coverPhoto: null,
    author: "",
    rating: "",
    genre: "",
    description: "",
    pages: "",
  };

  const formik = useFormik<BookFormValues>({
    initialValues,
    validationSchema: BookSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("author", values.author);
      formData.append("genre", values.genre);

      if (values.coverPhoto) {
        formData.append("coverPhoto", values.coverPhoto);
      }
      if (values.rating) {
        formData.append("rating", values.rating);
      }
      if (values.description) {
        formData.append("description", values.description);
      }
      if (values.pages) {
        formData.append("pages", values.pages);
      }

      try {
        const response = await axios.post(
          `${process.env.NEXTAUTH_URL}/api/books`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response) {
          console.log("Book added successfully:", response.data);
          formik.resetForm();
          setPreviewUrl("");
          router.push("/books");
        }
      } catch (error) {
        console.error("Cannot post the request", error);
      }
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      formik.setFieldValue("coverPhoto", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  function handleCloseForm() {
    router.push('/books')
  }
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-8">
      <BackgroundBeams className="absolute inset-0 " />
      <div className="flex justify-end items-center mx-[50px]">
        <div className="w-[50px] h-[50px] cursor-pointer hover:bg-gray-200 hover:shadow-2xl z-10 flex justify-center items-center">
          <IoCloseSharp className="text-[40px] " onClick={handleCloseForm} />
        </div>
      </div>
      <div className="relative z-10 flex justify-center items-center px-4">
        <div className="w-full max-w-[600px] flex justify-center items-center flex-col gap-5">
          <FaBook className="text-5xl text-purple-700" />
          <p className="text-3xl font-semibold text-gray-700">Add New Book</p>

          <form
            className="p-8 rounded-2xl w-full bg-white shadow-lg"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4">
              <input
                type="text"
                name="title"
                placeholder="Book Title"
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-600 hover:border-purple-600 outline-none"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.title && formik.touched.title && (
                <span className="text-xs text-red-500 mt-1 block">
                  {formik.errors.title}
                </span>
              )}
            </div>

            <div className="mb-4">
              <input
                type="text"
                name="author"
                placeholder="Author Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-600 hover:border-purple-600 outline-none"
                value={formik.values.author}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.author && formik.touched.author && (
                <span className="text-xs text-red-500 mt-1 block">
                  {formik.errors.author}
                </span>
              )}
            </div>

            <div className="mb-4">
              <input
                type="text"
                name="genre"
                placeholder="Genre (e.g., Fiction, Non-fiction, Mystery)"
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-600 hover:border-purple-600 outline-none"
                value={formik.values.genre}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.genre && formik.touched.genre && (
                <span className="text-xs text-red-500 mt-1 block">
                  {formik.errors.genre}
                </span>
              )}
            </div>

            <div className="mb-4">
              <input
                type="number"
                name="rating"
                placeholder="Rating (0-5)"
                step="0.1"
                min="0"
                max="5"
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-600 hover:border-purple-600 outline-none"
                value={formik.values.rating}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.rating && formik.touched.rating && (
                <span className="text-xs text-red-500 mt-1 block">
                  {formik.errors.rating}
                </span>
              )}
            </div>

            <div className="mb-4">
              <input
                type="number"
                name="pages"
                placeholder="Number of Pages"
                min="1"
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-600 hover:border-purple-600 outline-none"
                value={formik.values.pages}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.pages && formik.touched.pages && (
                <span className="text-xs text-red-500 mt-1 block">
                  {formik.errors.pages}
                </span>
              )}
            </div>

            <div className="mb-4">
              <textarea
                name="description"
                placeholder="Book Description (Optional)"
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-600 hover:border-purple-600 outline-none resize-none"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.description && formik.touched.description && (
                <span className="text-xs text-red-500 mt-1 block">
                  {formik.errors.description}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Photo (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-600 hover:border-purple-600 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
              />
              {previewUrl && (
                <div className="mt-3">
                  <img
                    src={previewUrl}
                    alt="Cover preview"
                    className="w-32 h-48 object-cover rounded-lg border-2 border-gray-300"
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              disabled={!formik.isValid || formik.isSubmitting}
              className={`w-full !bg-purple-800 !mb-3 !mt-4 !py-3 !text-base
            disabled:!bg-gray-300 disabled:!cursor-not-allowed`}
            >
              {formik.isSubmitting ? "Adding Book..." : "Add Book"}
            </Button>

            <Button
              type="button"
              variant="outlined"
              className="w-full !border-purple-800 !text-purple-800 !py-3"
              onClick={() => {
                formik.resetForm();
                setPreviewUrl("");
              }}
            >
              Reset Form
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
