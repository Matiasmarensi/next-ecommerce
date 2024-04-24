"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};
const Form = () => {
  const { data: session } = useSession();
  const params = useSearchParams();
  let callback = params.get("callback") || "/";

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  useEffect(() => {
    if (session && session.user) router.push(callback);
  }, [session, callback, params, router]);

  const formSubmit: SubmitHandler<Inputs> = async (form) => {
    const { email, password } = form;
    signIn("credentials", { email, password, callbackUrl: callback });
  };
  return (
    <div className="max-w-sm mx-auto card bg-base-300 my-4">
      <div className="card-body">
        <h1 className="card-title ">Sign in</h1>
        {params.get("error") && (
          <div className="alert text-error">
            {params.get("error") === "CredentialsSign" ? "invalid email or password" : params.get("error")}
          </div>
        )}
        {params.get("success") && <div className="alert text-success">{params.get("success")}</div>}
        <form onSubmit={handleSubmit(formSubmit)}>
          <div className="my-2">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              className="input input-bordered"
              type="email"
              id="email"
              {...register("email", {
                required: true,
                pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "invalid email" },
              })}
            />
            {errors.email?.message && <span className="text-error">{errors.email.message}</span>}
          </div>
          <div className="my-4">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              className="input input-bordered"
              type="password"
              id="password"
              {...register("password", { required: true })}
            />
            {errors.password?.message && <span className="text-error">{errors.password.message}</span>}
          </div>
          <div className="my-4">
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting && <span className="loading loading-spinner"></span>}
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
