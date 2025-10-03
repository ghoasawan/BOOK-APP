"use client"

import React,{useEffect, useState} from "react";
import Step1 from "../components/signup/step1"
import Step2 from "../components/signup/step2";
import { Wizard } from "react-use-wizard";



export default function Signup() {

  const [formData, setFormData]=useState({})

  
  return (
    <Wizard>
      <Step1 formData={formData}  setFormData={setFormData} />
      <Step2  formData={formData} setFormData={setFormData}  />
    </Wizard>
  );
}
