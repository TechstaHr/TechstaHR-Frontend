"use client";

import React from "react";
import AuthForm from "@/components/AuthForm";
import loginImg from "@/public/images/password-reset.jpg";
import Cookies from "js-cookie";

export default function ResetPassword() {
  const userMail = Cookies.get("user_mail");

  return (
    <AuthForm
      type="reset-password"
      picture={loginImg}
      title="Password Reset."
      text={`Input the code we sent to your e-mail ${userMail}.`}
    />
  );
}
