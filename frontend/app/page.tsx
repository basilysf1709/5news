import { Card } from "@/components/Card";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Tabbar } from "@/components/Tabbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <Tabbar />
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
