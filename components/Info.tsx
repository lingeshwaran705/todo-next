import React from "react";

type infoProps = {
  info: string;
};

export default function Info({ info }: infoProps) {
  return <section>{info}</section>;
}
