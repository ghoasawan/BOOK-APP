"use client";

import React, { useEffect, useState } from "react";
import Card from "../components/card/card";
import Pagination from "@mui/material/Pagination";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { usePathname } from "next/navigation";
import {  useDispatch} from "react-redux";
import { showLoader, hideLoader } from "../redux/reducers/loaderSlice";
import Loader from "../components/Loader/loader";

export default function Books() {
  const dispatch = useDispatch()
  const [pages, setPages] = useState(1);
  const [totalPage, setTotalPages] = useState(0);
  const [books, setBooks] = useState([]);
  const { data: session, status } = useSession<any>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const path=usePathname();

  console.log("path",path)


  useEffect(() => {
    async function getData() {
      dispatch(showLoader());
        setLoading(true);
      try {
        const response = await axios.get("http://localhost:3000/api/books", {
        params: { page: pages, limit: 9 },
      });
      console.log("response", response);
      setTotalPages(response.data.totalPages);
      setBooks(response.data.data);
      } catch (error) {
        console.log(error)
      }finally{
        dispatch(hideLoader())
        setLoading(false);
      }
    }

    getData();
  }, [pages, totalPage]);


  useEffect(() => {
  window.scrollTo(0, 0);
},[]);
  useEffect(()=>{
    if(!(session))
    {
      router.push('/')
    }
  },[])

  function handleBook(id: number)
  {
    router.push(`/books/${id}`)
    
  }
  return (
    <>
    {(loading)? (<Loader/>):(<div className="min-h-[100vh] bg-black flex flex-col justify-center items-end">
      <div className="w-full  flex justify-center items-center gap-[50px] flex-wrap  py-[100px] px-[100px] ">
        {books.map((data : any, index) => {
          return (
            <div key={index} onClick={()=>{handleBook(data.id)}}>
              <Card
                title={data.title}
                rating={data.rating}
                author={data.author}
                bookCover={data.coverPhoto}
                
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-end items-center px-[100px] mb-[20px]">
        <Pagination
          count={totalPage}
          page={pages}
          onChange={(event, value) => setPages(value)}
          variant="outlined"
          shape="rounded"
          sx={{
            "& .MuiPaginationItem-root": {
              color: "white", // default text color
              borderColor: "gray",
              backgroundColor:"gray" // border for outlined
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "white", // active page background
              color: "black", // active page text
            },
            "& .MuiPaginationItem-root:hover": {
              backgroundColor: "lightgray", // hover effect
            },
          }}
        />
      </div>
    </div>)}
    </>
  );
}
