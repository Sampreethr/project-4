"use client";
import AuthForm from "@/components/forms/AuthForms";
import React from "react";
import { SignUpSchema } from "@/lib/validations";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import ROUTES from "@/constants/routes";

const SignUp = () => {
  const router = useRouter();

  const handleSignUp = async (data: {
    email: string;
    password: string;
    name: string;
    username: string;
  }) => {
    try {
      // In a real app, you would call your API to create the user account first
      // const response = await fetch('/api/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // });

      // Then sign in the user
      const signInResponse = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (signInResponse?.error) {
        return {
          sucess: false,
          error:
            "Account created but couldn't sign in automatically. Please sign in manually.",
        };
      }

      router.push(ROUTES.HOME);
      return { sucess: true };
    } catch (error) {
      console.error("Sign-up error:", error);
      return {
        sucess: false,
        error: "Something went wrong. Please try again.",
      };
    }
  };

  return (
    <AuthForm
      formType="SIGN_UP"
      schema={SignUpSchema}
      defaultValues={{ email: "", password: "", name: "", username: "" }}
      onSubmit={handleSignUp}
    />
  );
};

export default SignUp;
