import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import mongoose from "mongoose";
import { useRouter } from "next/router";
import axios from "axios";
import { IconButton } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Error from "../components/Error";
import Link from "next/link";

type formtype = {
  username: string;
  email: string;
  password: string;
};

type inputObjType = {
  key: number;
  type: string;
  name: string;
  placeholder: string;
  value: string;
}[];

export default function Register() {
  const [formValue, setFormValue] = useState<formtype>({
    username: "",
    password: "",
    email: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [msg, setMsg] = useState<string>("");
  const router = useRouter();
  const inputObj: inputObjType = [
    {
      key: 0,
      type: "text",
      name: "username",
      placeholder: "Enter your name",
      value: formValue.username,
    },
    {
      key: 1,
      type: "text",
      name: "email",
      placeholder: "Enter your mail",
      value: formValue.email,
    },
    {
      key: 2,
      type: "password",
      name: "password",
      placeholder: "Enter the password",
      value: formValue.password,
    },
  ];

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);

  function validateEmail(mail: string) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      setError("");
      return true;
    }
    setError("invalid email");
    return false;
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    if (!formValue.password || !formValue.username || !formValue.email) {
      setError("Fill all the fields");
      return;
    }

    if (validateEmail(formValue.email)) {
      setLoading(true);
      const response: any = await axios.post("/api/auth/register", formValue);

      setLoading(false);

      if (response.data.error) {
        setError(response.data.error);
      } else {
        setMsg("Redirecting...");
        router.push("/");
        window.localStorage.setItem("token", response.data.token);
      }
    }
  }

  return (
    <section className="w-screen h-screen grid place-items-center">
      <Error error={error} />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col shadow-0 us:px-10 p-5 justify-center h-screen w-screen us:w-auto us:h-auto"
      >
        <h1 className="text-3xl pb-8 font-roboto-slab text-center">Register</h1>
        <main className="flex flex-col space-y-8 items-center justify-center">
          {inputObj.map((item) => {
            return (
              <div key={item.key} className=" relative w-full">
                <input
                  {...item}
                  type={
                    item.type === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : "text"
                  }
                  onChange={handleChange}
                  autoComplete="off"
                  className={`border block px-4 py-3 w-full focus:border-blue-500 outline-none ${
                    item.type === "password" ? "relative" : null
                  }`}
                />
                {item.type === "password" ? (
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    sx={{ position: "absolute", top: "5px", right: "8px" }}
                  >
                    {showPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <RemoveRedEyeIcon />
                    )}
                  </IconButton>
                ) : null}
              </div>
            );
          })}
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white w-full cursor-pointer hover:ring-2 ring-offset-2"
          >
            {loading ? "Loading..." : msg ? msg : "Submit"}
          </button>
        </main>
        <footer>
          <Link href="/login">
            <a className="pt-4 block hover:underline">
              {"Already have an account?"}
            </a>
          </Link>
        </footer>
      </form>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  mongoose.connect(`${process.env.MONGO_URI}`, () => {
    console.log("connected to mongodb");
  });
  return {
    props: {},
  };
};
