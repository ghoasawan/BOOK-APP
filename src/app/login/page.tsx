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
        .email("Invalid email format"),
  
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
    <div className="min-h-[100vh] flex justify-center items-center">
      <div className="w-[500px]  flex justify-center items-center flex-col z-10 gap-[20px] ">
        <FaLock className="text-[50px] text-gray-600" />
        <p className="text-[30px] font-semibold text-gray-600">Login</p>
        <form onSubmit={formik.handleSubmit} className="p-8 rounded-2xl  w-full  space-y-4 flex flex-col justify-center items-center">
         
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-600 hover:border-purple-600 outline-none"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          { (formik.errors.email && formik.touched.email) ? (<span>{formik.errors.email}</span>):""}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-600 hover:border-purple-600 outline-none"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          { (formik.errors.password && formik.touched.password) ? (<span>{formik.errors.password}</span>):""}

        
          <Button
            type="submit"
            variant="contained"
            className="w-full !bg-purple-800 !mb-[10px] "
          >
            Login
          </Button>
          <div className="flex justify-center">
            <span className="text-[13px] text-gray-600">
              Already have an Account?{" "}
              <Link
                href="/login"
                className="text-[14px] hover:underline text-purple-900 "
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
