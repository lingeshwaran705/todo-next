import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { useAppDispatch } from "./DisplayTodo";
import { setTodo, setMultipleTodos } from "../src/features/todoSlice";
import { useRouter } from "next/router";
import axios from "axios";

export default function Form() {
  const [value, setValue] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [token, setToken] = useState<string>();

  useEffect(() => {
    setToken(`${window.localStorage.getItem("token")}`);
    window.localStorage.getItem("token") ? null : router.push("/auth/register");
  }, []);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const id = value.length + Math.floor(Math.random() * 1000000);
    dispatch(setTodo({ todo: value, _id: id }));
    setValue("");

    const response = await axios.post("/api/createtodo", {
      todo: value,
      token: token,
    });

    console.log(response);
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className="flex items-center flex-col us:flex-row ">
        <Input
          value={value}
          handleChange={(event) => {
            setValue(event.target.value);
          }}
        />
        <button
          className="bg-amber-500 py-2 px-6 mt-2 us:mt-0 us:ml-2 text-white block w-full  us:w-auto shadow-md"
          type="submit"
        >
          Submit
        </button>
      </section>
    </form>
  );
}
