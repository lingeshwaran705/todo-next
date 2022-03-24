import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Display from "../components/DisplayTodo";
import Form from "../components/Form";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className="w-screen h-screen bg-orange-100 font-roboto">
      <section className="w-4/5 m-auto">
        <h1 className="text-center text-3xl sm:text-6xl font-roboto-slab py-6">
          Todo
        </h1>
        <Form />
        <Display />
      </section>
    </div>
  );
};

export default Home;
