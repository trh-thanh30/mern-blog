/* eslint-disable react/no-unescaped-entities */
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function SignInPage() {
  const [formData, setFormData] = useState({});
  const [errorMessages, setErrorMEssages] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handlChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return setErrorMEssages("Please fill out all fields.");
    }
    try {
      setLoading(true);
      setErrorMEssages(null);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMEssages(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/");
      }
    } catch (err) {
      setErrorMEssages(err.message);
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen mt-20">
      <div className="flex flex-col max-w-3xl gap-5 p-3 mx-auto md:flex-row md:items-center">
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
          <p className="mt-5 text-sm">
            Hi, welcome to my blog page. You can sign in with your email and
            password or with Google.
          </p>
        </div>
        {/* right */}

        <div className="flex-1">
          <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
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
                onChange={handlChange}
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
                placeholder="**********"
                id="password"
                onChange={handlChange}
              ></TextInput>
            </div>
            <Button
              gradientDuoTone={"purpleToPink"}
              outline
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Spinner size={"sm"}></Spinner>
                  <span className="text-sm">Loading...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm">
            <span>
              Don't have an account?{" "}
              <Link to={"/sign-up"} className="text-blue-500">
                Sign Up
              </Link>
            </span>
          </div>
          {errorMessages && (
            <Alert className="mt-5" color={"failure"}>
              {errorMessages}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
