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


export default function Step1({ formData, setFormData }: any) {
  const fileRef = useRef<HTMLInputElement | null>(null);
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
    <div className="min-h-[calc(100vh-100px)] flex justify-center items-center px-4 py-6 sm:px-6 md:px-8">
      <div className="w-full max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-[500px] flex justify-center items-center flex-col z-10 gap-4 sm:gap-5 md:gap-[20px]">
        <FaLock className="text-[40px] sm:text-[45px] md:text-[50px] text-gray-600" />
        <p className="text-[24px] sm:text-[27px] md:text-[30px] font-semibold text-gray-600">Signup</p>
        <form
          onSubmit={formik.handleSubmit}
          className="p-6 sm:p-7 md:p-8 rounded-2xl w-full space-y-3 sm:space-y-4 flex flex-col justify-center items-center"
        >
          <Badge
            color="secondary"
            overlap="circular"
            badgeContent=" +"
            className="cursor-pointer"
            onClick={handleFile}
          >
            <div className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] md:w-[150px] md:h-[150px] border-1 border-dashed rounded-full border-gray-500 overflow-hidden">
              { userPic && (<img src={userPic} alt="" className="h-[100%] w-[100%] object-cover " /> )}
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
          { (formik.errors.profilePic && formik.touched )? <span className="text-[12px] sm:text-[13px] md:text-[14px] text-red-600">{formik.errors.profilePic}</span>:"" }
          <Button
            type="submit"
            variant="contained"
            className="w-full !bg-purple-800 !mb-[10px] text-sm sm:text-base"
          >
            Next
          </Button>
          <Button
            variant="contained"
            className="w-full !bg-purple-800 !mb-[10px] text-sm sm:text-base"
            onClick={()=>{nextStep()}}
          >
            Skip
          </Button>
          <div className="flex justify-center">
            <span className="text-[12px] sm:text-[13px] text-gray-600">
              Already have an Account?{" "}
              <Link
                href="/login"
                className="text-[13px] sm:text-[14px] hover:underline text-purple-900"
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