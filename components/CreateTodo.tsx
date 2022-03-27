import React, { useEffect, useState } from "react";
import Input from "./Input";
import { useAppDispatch } from "./DisplayTodo";
import { setTodo } from "../src/features/todoSlice";
import { useRouter } from "next/router";
import axios from "axios";
import Error from "./Error";

export default function Form() {
  const [value, setValue] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [token, setToken] = useState<string>();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setToken(`${window.localStorage.getItem("token")}`);
    window.localStorage.getItem("token") ? null : router.push("/register");
  }, []);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (value === "") {
      setError("Enter The Todo");
      return;
    }

    setError("");

    setValue("");

    setLoading(true);

    const response = await axios.post("/api/create-todo", {
      todo: value,
      token: token,
    });

    setLoading(false);

    if (response.data.error) {
      setError(response.data.error);
    } else {
      setError("");

      console.log(response.data);

      dispatch(setTodo({ todo: value, _id: response.data._id }));
    }

    console.log(response);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Error error={error} />
      <section className="flex items-center flex-col us:flex-row ">
        <Input
          value={value}
          handleChange={(event) => {
            setValue(event.target.value);
            setError("");
          }}
        />
        <button
          className="bg-amber-500 py-2 px-6 mt-2 us:mt-0 us:ml-2 text-white block w-full  us:w-auto shadow-md"
          type="submit"
        >
          {loading ? "Loading..." : "submit"}
        </button>
      </section>
    </form>
  );
}
