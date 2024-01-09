"use client";
import { Card } from "@/components/Card";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Tabbar } from "@/components/Tabbar";
import { Keywords } from "@/components/Keywords";
import { MovingWords } from "@/components/MovingWords";

export default function Home() {
  return (
    <>
      <Navbar />
      <Tabbar />
      <MovingWords text="Keywords popular on the left today:" />
      <Keywords />
      <MovingWords text="Reported headlines on the left today:" />
      <Card
        newsChannel="Times Now"
        headlines="With supporting text below as a natural lead-in to additional
            content."
        url="https://linkedin.com"
      />
      <Card
        newsChannel="Times Now"
        headlines="With supporting text below as a natural lead-in to additional
            content."
        url="https://linkedin.com"
      />
      <Card
        newsChannel="Times Now"
        headlines="With supporting text below as a natural lead-in to additional
            content."
        url="https://linkedin.com"
      />
      <Card
        newsChannel="Times Now"
        headlines="With supporting text below as a natural lead-in to additional
            content."
        url="https://linkedin.com"
      />
      <Footer />
    </>
  );
}
