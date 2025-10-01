import React from "react";
import Step1 from "../../components/signup/step1";
import Step2 from "../../components/signup/step2";
import StepWizard from "react-step-wizard";

export default function Signup() {
  return (
    <StepWizard>
      <Step1 />
      <Step2 />
    </StepWizard>
  );
}
