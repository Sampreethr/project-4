"use client";
import AuthForm from '@/components/forms/AuthForms'
import { SignInSchema } from '@/lib/validations'
import React from 'react'

const SignIn = () => {
  return (
    <AuthForm formType = "SIGN_IN"
     schema={SignInSchema}
     defaultValues = {{email : "",password : ""}}
    onSubmit={(data) => Promise.resolve({sucess:true,data})}
     />
  )
}

export default SignIn