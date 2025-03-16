"use client";
import AuthForm from "@/components/forms/AuthForms";
import { SignInSchema } from "@/lib/validations";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import ROUTES from "@/constants/routes";

const SignIn = () => {
  const router = useRouter();

  const handleSignIn = async (data: { email: string; password: string }) => {
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (response?.error) {
        return {
          sucess: false,
          error: "Invalid email or password",
        };
      }

      router.push(ROUTES.HOME);
      return { sucess: true, data: response };
    } catch (error) {
      console.error("Sign-in error:", error);
      return {
        sucess: false,
        error: "Something went wrong. Please try again.",
      };
    }
  };

  return (
    <AuthForm
      formType="SIGN_IN"
      schema={SignInSchema}
      defaultValues={{ email: "", password: "" }}
      onSubmit={handleSignIn}
    />
  );
};

export default SignIn;
