"use client";
import AuthForm from '@/components/forms/AuthForms'
import React from 'react'
import { SignUpSchema } from '@/lib/validations';

const SignUp = () => {
  return (
    <AuthForm formType = "SIGN_UP"
    schema={SignUpSchema}
    defaultValues = {{email : "",password : "",name : "",username : ""}}
   onSubmit={(data) => Promise.resolve({sucess:true,data})}
    />  )
}

export default SignUp