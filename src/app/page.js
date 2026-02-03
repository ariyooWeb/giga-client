import MAIN_IMG from "../assets/rainbow2.jpeg";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Image src={MAIN_IMG} alt="MAIN_IMG" />
    </div>
  );
}
