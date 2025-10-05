"use client"

import React from "react";

import { BackgroundBeams } from "../components/ui/shadcn-io/background-beams/index";
import { FaLock } from "react-icons/fa";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


interface initialValuesInterface{
  email:string,
  password:string
}

export default function Login() {


  const router= useRouter()
  const initialValues:initialValuesInterface={

    email:"",
    password:""
  }

  const LoginSchemaValidation = Yup.object().shape({
  
      email: Yup.string()
        .required("Email is required")
        .email("Invalid email format must be forexample@gmail.com"),
  
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    });
  

  const formik=useFormik({
    initialValues,
    validationSchema:LoginSchemaValidation,
    onSubmit: async (values)=>{
      const response = await signIn('credentials',{
        redirect: false,
        email:values.email,
        password:values.password
      })

      if(response?.error)
      {
        console.log("Invalid Email or Password")
      }
      else
      {
        router.push('/')
      }
    }

  })
  return (
    <div className="min-h-[calc(100vh-100px)] flex justify-center items-center px-4 py-6 sm:px-6 md:px-8">
      <div className="w-full max-w-[90%] sm:max-w-md md:max-w-lg lg:max-w-[500px] flex justify-center items-center flex-col z-10 gap-4 sm:gap-5 md:gap-[20px]">
        <FaLock className="text-[40px] sm:text-[45px] md:text-[50px] text-gray-600" />
        <p className="text-[24px] sm:text-[27px] md:text-[30px] font-semibold text-gray-600">Login</p>
        <form onSubmit={formik.handleSubmit} className="p-6 sm:p-7 md:p-8 rounded-2xl w-full space-y-3 sm:space-y-4 flex flex-col justify-center items-center">
         
          <div className="w-full">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full p-2.5 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:border-purple-600 hover:border-purple-600 outline-none"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            { (formik.errors.email && formik.touched.email) ? (<span className="text-red-500 text-xs sm:text-sm block mt-1">{formik.errors.email}</span>):""}
          </div>
          
          <div className="w-full">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-2.5 sm:p-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:border-purple-600 hover:border-purple-600 outline-none"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            { (formik.errors.password && formik.touched.password) ? (<span className="text-red-500 text-xs sm:text-sm block mt-1">{formik.errors.password}</span>):""}
          </div>

        
          <Button
            loading={formik.isSubmitting}
            type="submit"
            variant="contained"
            className="w-full !bg-purple-800 !mb-[10px] text-sm sm:text-base"
          >
            Login
          </Button>
          <div className="flex justify-center">
            <span className="text-[12px] sm:text-[13px] text-gray-600">
              Not a member?{" "}
              <Link
                href="/signup"
                className="text-[13px] sm:text-[14px] hover:underline text-purple-900 "
              >
                Signup
              </Link>
            </span>
          </div>
        </form>
      </div>
      <BackgroundBeams />
    </div>
  );
}