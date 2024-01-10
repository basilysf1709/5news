"use client";
import { useEffect, useState } from "react";
import { Card } from "@/components/Card";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Tabbar } from "@/components/Tabbar";
import { Keywords } from "@/components/Keywords";
import { MovingWords } from "@/components/MovingWords";

interface Headline {
  newsChannel: string;
  headline: string;
  url: string;
  politicalSpectrum: string; // Add other relevant properties here
}


export default function Home() {
  const [headlines, setHeadlines] = useState<Headline[]>([]);

  useEffect(() => {
    fetch('/api/v1/headlines')
      .then(response => response.json())
      .then((data) => {
        const allHeadlines : any= [];
  
        Object.keys(data).forEach(newsChannel => {
          const channelData = data[newsChannel];
  
          if (channelData['political-spectrum'] === 'left') {
            channelData.headlines.forEach((headline : any) => {
              allHeadlines.push({
                newsChannel: newsChannel, // Using the key as the news channel name
                headline: headline.headline,
                url: headline.url,
                politicalSpectrum: channelData['political-spectrum']
              });
            });
          }
        });
  
        setHeadlines(allHeadlines);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  
  

  return (
    <>
      <Navbar />
      <Tabbar wing="/" />
      <MovingWords text="Keywords popular on the left today:" />
      <Keywords />
      <MovingWords text="Reported headlines on the left today:" />
      {headlines.map((headline, index) => (
        <Card
          key={index}
          newsChannel={headline.newsChannel}
          headlines={headline.headline}
          url={headline.url}
        />
      ))}
      <Footer />
    </>
  );
}
