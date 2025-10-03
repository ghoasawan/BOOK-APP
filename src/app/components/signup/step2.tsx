"use client";

import React, { useEffect } from "react";
import { BackgroundBeams } from "../ui/shadcn-io/background-beams";
import { FaLock } from "react-icons/fa";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useWizard } from "react-use-wizard";
import { useRouter } from "next/navigation";
import axios from "axios";

interface formValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface step2Props {
  formData: formValues;
  setFormData: React.Dispatch<React.SetStateAction<formValues>>;
}

export default function Step2({ formData, setFormData }: step2Props) {
  const { previousStep } = useWizard();
  const router = useRouter();
  const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First name is required")
      .min(2, "First name must be at least 2 characters"),

    lastName: Yup.string()
      .required("Last name is required")
      .min(2, "Last name must be at least 2 characters"),

    email: Yup.string()
      .required("Email is required")
      .email("Invalid email format"),

    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const initialValues: formValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const formik = useFormik<formValues>({
    initialValues,
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      setFormData((prev: object) => ({ ...prev, ...values }));
      const newFormData = { ...formData, ...values };

      try {
        const response = await axios.post(
          "http://localhost:3000/api/signup",
          newFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response) {
          console.log(response);
        }
      } catch (error) {
        console.error("Cnot Post the request", error);
      }

      router.push("/login");
    },
  });

  useEffect(() => {
    console.log("Formstep2", formData);
  }, [formData]);

  return (
    <div className="flex justify-center items-center min-h-[100vh] ">
      <div className="w-[500px]  flex justify-center items-center flex-col z-10 gap-[20px] ">
        <FaLock className="text-[50px] text-gray-600" />
        <p className="text-[30px] font-semibold text-gray-600">Signup</p>
        <form
          className="p-8 rounded-2xl  w-full  "
          onSubmit={formik.handleSubmit}
        >
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-600 hover:border-purple-600 outline-none "
            value={formik.values.firstName}
            onChange={formik.handleChange}
          />
          {formik.errors.firstName && formik.touched.firstName ? (
            <span className="text-[12px] text-red-500 ">
              {formik.errors.firstName}
            </span>
          ) : (
            ""
          )}

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-600 hover:border-purple-600 outline-none mt-[15px]"
            value={formik.values.lastName}
            onChange={formik.handleChange}
          />
          {formik.errors.lastName && formik.touched.lastName ? (
            <span className="text-[12px] text-red-500 ">
              {formik.errors.lastName}
            </span>
          ) : (
            ""
          )}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-600 hover:border-purple-600 outline-none mt-[15px]"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email ? (
            <span className="text-[12px] text-red-500 ">
              {formik.errors.email}
            </span>
          ) : (
            ""
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-600 hover:border-purple-600 outline-none mt-[15px]"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && formik.touched.password ? (
            <span className="text-[12px] text-red-500 ">
              {formik.errors.password}
            </span>
          ) : (
            ""
          )}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:border-purple-600 hover:border-purple-600 outline-none mt-[15px]"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
          />
          {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
            <span className="text-[12px] text-red-500 ">
              {formik.errors.confirmPassword}
            </span>
          ) : (
            ""
          )}
          <Button
            type="submit"
            variant="contained"
            disabled={!(formik.isValid && formik.dirty) || formik.isSubmitting}
            className={`w-full !bg-purple-800 !mb-[10px] !mt-[15px] 
              disabled:!bg-gray-300  disabled:!cursor-not-allowed `}
          >
            SignUp
          </Button>
          <Button
            variant="contained"
            className="w-full !bg-purple-800 !mb-[10px]"
            onClick={() => {
              previousStep();
            }}
          >
            Back
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
