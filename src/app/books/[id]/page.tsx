"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { HiDotsVertical } from "react-icons/hi";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/Loader/loader";
import { useDispatch } from "react-redux";
import { showLoader, hideLoader } from "@/app/redux/reducers/loaderSlice";

export default function Page({ params }: { params: { id: string } }) {
  const [openDialogue, setOpenDialogue] = useState(false);
  const [book, setBook] = useState<any>({});
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      dispatch(showLoader());
      setLoading(true);
      try {
        const { id } = params;
        console.log("id", id);
        const response = await axios.get(
          `${process.env.NEXTAUTH_URL}/api/books/${id}`
        );
        if (response) {
          console.log("bookData", response);
          setBook(response?.data?.data);
        } else {
          throw new Error();
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        dispatch(hideLoader());
        setLoading(false);
      }
    }
    fetchData();
  }, [params]);

  function handleDialogue() {
    setOpenDialogue((prev) => !prev);
  }

  function handleCloseDialogue() {
    if (openDialogue) {
      setOpenDialogue((prev) => !prev);
    }
  }

  async function handleDelete() {
    try {
      const response = await axios.delete(`/api/books/${book.id}`);
      if (response.status === 200) {
        router.push("/books");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-black" onClick={handleCloseDialogue}>
      {(loading) ? (
        <Loader />
      ) : (
        <div className="min-h-[calc(100vh-180px)] mx-[100px]   flex justify-center items-center relative">
          <div className="w-[900px] h-[300px] bg-white flex justify-center items-center p-4 rounded-2xl">
            <div className="w-1/3 h-full ">
              <img
                src={book.coverPhoto}
                alt="image"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="w-2/3 px-8 h-full  flex flex-col flex-start">
              <p className=" flex justify-between items-center ">
                <span className="text-[30px] font-bold">{book.title}</span>
                <span>
                  <HiDotsVertical
                    onClick={handleDialogue}
                    className="cursor-pointer"
                  />
                </span>
              </p>
              <p className="flex gap-3">
                <span className="text-[16px] font-semibold text-blue-600">
                  by
                </span>{" "}
                <span className="text-[18px] text-gray-500 ">
                  {book.author}
                </span>
              </p>
              <p>
                <span className="text-20px font-semibold">Pages:</span>{" "}
                <span>{book.pages}</span>
              </p>
              <p>
                <span className="text-20px font-semibold">Genre:</span>{" "}
                <span>{book.genre}</span>
              </p>
              <p className="">
                {" "}
                <Rating
                  name="half-rating-read"
                  value={book.rating}
                  precision={0.5}
                  readOnly
                  size="small"
                />
              </p>

              <div className="">
                <p className="text-[14px] text-gray-700 ">
                  <span className="text-[20px] text-black font-semibold">
                    Description:
                  </span>{" "}
                  {book.description}
                </p>
              </div>
            </div>
          </div>
          {openDialogue && (
            <div className="shadow w-[100px] h-[60px] bg-gray-100 absolute right-[250px] top-[170px] flex flex-col justify-center items-center text-[14px]  divide-y divide-gray-400 cursor-pointer">
              <span
                className="w-full text-center py-1 hover:bg-gray-200"
                onClick={handleDelete}
              >
                Delete
              </span>
              <span className="w-full text-center py-1  hover:bg-gray-200">
                Update
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
