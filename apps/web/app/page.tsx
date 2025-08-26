import Image, { type ImageProps } from "next/image";
import styles from "./page.module.css";
import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";




export default function Home() {
  return (
    <div className="text-3xl font-bold">
      <Hero/>
    </div>
  );
}
