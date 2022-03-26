import { GetServerSideProps } from "next";
import React, { useState } from "react";
import mongoose from "mongoose";
import { useRouter } from "next/router";

type formtype = {
  username: string;
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
  });
  const [loading, setLoading] = useState<boolean>(false);
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
      type: "password",
      name: "password",
      placeholder: "Enter the password",
      value: formValue.password,
    },
  ];

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    if (!formValue.password || !formValue.username) {
      alert("Fill all the fields");
      return;
    }

    setLoading(true);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(formValue),
    } as {}).then((res) => res.json());
    setLoading(false);

    router.push("/");

    if (response.error) {
      alert(response.error);
    } else {
      window.localStorage.setItem("token", response.token);
    }
  }

  return (
    <section className="w-screen h-screen grid place-items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col shadow-0 us:px-10 p-5 justify-center h-screen w-screen us:w-auto us:h-auto"
      >
        <h1 className="text-3xl pb-8 font-roboto-slab text-center">Register</h1>
        <main className="flex flex-col space-y-8 items-center justify-center">
          {inputObj.map((item) => {
            return (
              <input
                {...item}
                onChange={handleChange}
                autoComplete="off"
                className="border px-6 py-3 w-full focus:border-blue-500 outline-none"
              />
            );
          })}
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white w-full cursor-pointer hover:ring-2 ring-offset-2"
          >
            {loading ? "Loading..." : "Submit"}
          </button>
        </main>
        <footer>
          <a href="/auth/login" className="pt-4 block hover:underline">
            Already have an account?
          </a>
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
