import React, { useState } from "react";
import Input from "../components/Input";

export default function Form() {
  const [value, setValue] = useState("");

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <section className="flex items-center">
        <Input
          value={value}
          handleChange={(event) => {
            setValue(event.target.value);
          }}
        />
        <button className="bg-amber-500 py-2 px-6 ml-2" type="submit">
          Submit
        </button>
      </section>
    </form>
  );
}
