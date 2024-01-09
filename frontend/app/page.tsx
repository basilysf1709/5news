"use client";
import { Card } from "@/components/Card";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Tabbar } from "@/components/Tabbar";
import { Keywords } from "@/components/Keywords";
import Typewriter from "typewriter-effect";

export default function Home() {
  return (
    <>
      <Navbar />
      <Tabbar />
      <div className="mx-20 mb-12 text-3xl font-semibold leading-relaxed text-gray-700 dark:text-white md:text-4xl">
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString("Keywords popular on the left today:")
              .pauseFor(2500)
              .callFunction(() => {
                typewriter.stop();
              })
              .start();
          }}
          options={{
            autoStart: true,
            loop: false,
          }}
        />
      </div>
      <Keywords />
      <div className="mx-20 mt-16 text-3xl font-semibold leading-relaxed text-gray-700 dark:text-white md:text-4xl">
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString("Reported Headlines on the left today:")
              .pauseFor(2500)
              .callFunction(() => {
                typewriter.stop();
              })
              .start();
          }}
          options={{
            autoStart: true,
            loop: false,
          }}
        />
      </div>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Footer />
    </>
  );
}
