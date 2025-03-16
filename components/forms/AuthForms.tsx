"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  FieldValues,
  SubmitHandler,
  DefaultValues,
  Path,
} from "react-hook-form";
import { ZodType } from "zod";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Eye, EyeOff } from "lucide-react";

interface AuthFormProps<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (
    data: T
  ) => Promise<{ sucess: boolean; data?: unknown; error?: string }>;
  formType: "SIGN_UP" | "SIGN_IN";
}

function AuthForm<T extends FieldValues>({
  schema,
  defaultValues,
  formType,
  onSubmit,
}: AuthFormProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    try {
      const result = await onSubmit(data);

      if (!result.sucess) {
        toast.error(result.error || "An error occurred");
        return;
      }

      toast.success(
        formType === "SIGN_IN"
          ? "Successfully signed in!"
          : "Account created successfully!"
      );
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const buttonText = formType === "SIGN_IN" ? "Sign in" : "Sign up";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mt-10 space-y-6"
      >
        {Object.keys(defaultValues).map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field as Path<T>}
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2.5">
                <FormLabel className="paragraph-medium text-dark400_light700">
                  {field.name === "email"
                    ? "Email Address"
                    : field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      required
                      type={
                        field.name === "password" && !showPassword
                          ? "password"
                          : "text"
                      }
                      {...field}
                      className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 no-focus min-h-12 rounded-lg border pr-10"
                    />
                    {field.name === "password" && (
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-dark400_light700"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    )}
                  </div>
                </FormControl>
                <FormMessage className="text-rose-500" />
              </FormItem>
            )}
          />
        ))}
        <Button
          disabled={form.formState.isSubmitting}
          className="primary-gradient paragraph-medium min-h-12 w-full rounded-lg px-4 py-3 font-inter !text-light-900 transition-all hover:opacity-90"
        >
          {form.formState.isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 size={20} className="animate-spin" />
              {formType === "SIGN_IN" ? "Signing In..." : "Signing Up..."}
            </div>
          ) : (
            buttonText
          )}
        </Button>
        <div className="text-center text-dark400_light700">
          {formType === "SIGN_IN" ? (
            <p>
              Don&apos;t have an account?{" "}
              <Link
                href={ROUTES.SIGN_UP}
                className="paragraph-semibold primary-text-gradient hover:underline"
              >
                Sign up
              </Link>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <Link
                href={ROUTES.SIGN_IN}
                className="paragraph-semibold primary-text-gradient hover:underline"
              >
                Sign in
              </Link>
            </p>
          )}
        </div>
      </form>
    </Form>
  );
}

export default AuthForm;
