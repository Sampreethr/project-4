"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import ROUTES from "@/constants/routes";
import { Loader2 } from "lucide-react";

const SocialAuthForm = () => {
  const [isLoadingProvider, setIsLoadingProvider] = useState<
    "github" | "google" | null
  >(null);

  const buttonClass =
    "background-light100_dark800 text-dark400_light900 hover:background-light200_dark700 relative flex min-h-12 flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-3 transition-colors";

  const handleSignIn = async (provider: "github" | "google") => {
    try {
      setIsLoadingProvider(provider);
      await signIn(provider, {
        callbackUrl: ROUTES.HOME,
        redirect: false,
      });
      toast.success(
        `${provider === "github" ? "GitHub" : "Google"} sign-in successful`
      );
    } catch (error) {
      console.error(`Sign-in error with ${provider}:`, error);
      toast.error(
        `${
          provider.charAt(0).toUpperCase() + provider.slice(1)
        } sign-in failed: ${
          error instanceof Error
            ? error.message
            : `An error occurred during ${provider} sign-in`
        }`
      );
    } finally {
      setIsLoadingProvider(null);
    }
  };

  return (
    <div className="mt-8 space-y-4">
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
        </div>
        <div className="relative bg-white dark:bg-gray-900 px-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Or continue with
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2.5">
        <Button
          className={buttonClass}
          onClick={() => handleSignIn("github")}
          disabled={isLoadingProvider !== null}
        >
          {isLoadingProvider === "github" ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Image
              src="/icons/github.svg"
              alt="Github Logo"
              width={20}
              height={20}
              className="invert-colors object-contain"
            />
          )}
          <span>
            {isLoadingProvider === "github"
              ? "Signing in..."
              : "Sign in with GitHub"}
          </span>
        </Button>

        <Button
          className={buttonClass}
          onClick={() => handleSignIn("google")}
          disabled={isLoadingProvider !== null}
        >
          {isLoadingProvider === "google" ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Image
              src="/icons/google.svg"
              alt="Google Logo"
              width={20}
              height={20}
              className="object-contain"
            />
          )}
          <span>
            {isLoadingProvider === "google"
              ? "Signing in..."
              : "Sign in with Google"}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default SocialAuthForm;
