import React from "react";

type inputProps = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

export default function Input({ handleChange, value }: inputProps) {
  return (
    <input
      type="text"
      className="w-full px-6 py-2 shadow-md focus:ring-1 ring-orange-500 outline-none placeholder:text-orange-500 block"
      placeholder="Enter the text"
      onChange={(event) => handleChange(event)}
      value={value}
    />
  );
}
