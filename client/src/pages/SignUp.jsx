/* eslint-disable react/no-unescaped-entities */
import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
export default function SignUpPage() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className={`text-4xl font-bold dark:text-white `}>
            <span
              className={` px-2 rounded-xl text-white py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 `}
            >
              HuuThanh's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Hi, welcome to my blog page. You can sign up with your email and
            password or with Google.
          </p>
        </div>
        {/* right */}

        <div className="flex-1">
          <form className="flex flex-col gap-4 ">
            <div className="">
              <Label
                className="cursor-pointer"
                htmlFor="username"
                value="Your username"
              ></Label>
              <TextInput
                type="text"
                placeholder="Enter your username"
                id="username"
              ></TextInput>
            </div>
            <div className="">
              <Label
                className="cursor-pointer"
                htmlFor="email"
                value="Your email"
              ></Label>
              <TextInput
                type="email"
                placeholder="name@domain.com"
                id="email"
              ></TextInput>
            </div>
            <div className="">
              <Label
                className="cursor-pointer"
                htmlFor="password"
                value="Your password"
              ></Label>
              <TextInput
                type="password"
                placeholder="Enter your password"
                id="password"
              ></TextInput>
            </div>
            <Button gradientDuoTone={"purpleToPink"} outline type="submit">
              Sign Up
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-4 items-center justify-center">
            <span>
              Have an account?{" "}
              <Link to={"/sign-in"} className="text-blue-500">
                Sign In
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
