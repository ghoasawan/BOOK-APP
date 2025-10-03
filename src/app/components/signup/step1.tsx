"use client";

import React, { useRef, useState , useEffect} from "react";
import { BackgroundBeams } from "../ui/shadcn-io/background-beams";
import { FaLock } from "react-icons/fa";
import Button from "@mui/material/Button";
import Link from "next/link";
import Badge from "@mui/material/Badge";
import { useWizard } from "react-use-wizard";
import * as Yup from "yup";
import { useFormik } from "formik";
import Image from "next/image";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import { Span } from "next/dist/trace";

export default function Step1({ formData, setFormData }) {
  const fileRef = useRef(null);
  const [userPic, setUserPic] = useState("");

  function handleFile() {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }

  const {nextStep} = useWizard();

  const SignupSchema = Yup.object().shape({
    profilePic: Yup.mixed()
      .test("fileType", "Only image files are allowed", (value: any) => {
        return value && value.type.startsWith("image/");
      }),
  });

  const initialValues = {
    profilePic: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      console.log("values",values);
      setFormData((prev:object)=>({...prev,...values}))
      nextStep()
    },
  });

  useEffect(()=>{
    console.log("Formstep1",formData)
  },[formData])


  return (
    <div className="min-h-[100vh] flex justify-center items-center">
      <div className="w-[500px]  flex justify-center items-center flex-col z-10 gap-[20px] ">
        <FaLock className="text-[50px] text-gray-600" />
        <p className="text-[30px] font-semibold text-gray-600">Signup</p>
        <form
          onSubmit={formik.handleSubmit}
          className="p-8 rounded-2xl  w-full  space-y-4 flex flex-col justify-center items-center"
        >
          <Badge
            color="secondary"
            overlap="circular"
            badgeContent=" +"
            className="cursor-pointer"
            onClick={handleFile}
          >
            <div className="w-[150px] h-[150px] border-1 border-dashed rounded-full border-gray-500 overflow-hidden">
              { userPic && (<img src={userPic} alt="" srcset="" className=" h-[100%] w-[100%] object-cover " /> )}
            </div>
            <input
              type="file"
              name="profilePic"
              id="profilePic"
              className="hidden"
              ref={fileRef}
              onChange={(e) => {
                const file= e.target.files?.[0];
                console.log(file);
                console.log("valueinform",formik.initialValues)
                if(file)
                {
                  formik.setFieldValue("profilePic",file)
                  setUserPic(URL.createObjectURL(file))
                }

              }}
            />
          </Badge>
          { (formik.errors.profilePic && formik.touched )? <span className="text-[14px] text-red-600">{formik.errors.profilePic}</span>:"" }
          <Button
            type="submit"
            variant="contained"
            className="w-full !bg-purple-800 !mb-[10px]"
          >
            Next
          </Button>
          <Button
            variant="contained"
            className="w-full !bg-purple-800 !mb-[10px]"
            onClick={()=>{nextStep()}}
          >
            Skip
          </Button>
          <div className="flex justify-center">
            <span className="text-[13px] text-gray-600">
              Already have an Account?{" "}
              <Link
                href="/login"
                className="text-[14px] hover:underline text-purple-900"
              >
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
      <BackgroundBeams />
    </div>
  );
}
