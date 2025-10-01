"use client"

import React from "react";
import Step1 from "../components/signup/step1"
import Step2 from "../components/signup/step2";
import { Wizard } from "react-use-wizard";

export default function Signup() {

  return (
    <Wizard>
      <Step1 />
      <Step2 />
    </Wizard>
  );
}
