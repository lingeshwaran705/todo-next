import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import Display from "../components/DisplayTodo";
import Form from "../components/Form";
import mongoose from "mongoose";
import axios from "axios";

const Home: NextPage = () => {
  return (
    <div className="w-screen h-screen bg-orange-50 overflow-y-auto font-roboto">
      <section className="w-11/12 us:w-4/5 m-auto ">
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

export const getStaticProps: GetStaticProps = async () => {
  mongoose.connect(`${process.env.MONGO_URI}`, () =>
    console.log("connected to mongo db")
  );

  return {
    props: {},
  };
};
