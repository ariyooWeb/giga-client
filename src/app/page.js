import MAIN_IMG from "../assets/wallpaper.jpeg";
import Image from "next/image";

export default function Home() {
  return (
    <div className="main-background">
      <Image src={MAIN_IMG} alt="MAIN_IMG" />
      <div className="main-explain">
        <div className="main-explain-giga">GIGAHITZ</div>
        <div className="main-explain-text">
          아카펠라 동호회 기가히츠 어드민 사이트입니다.
        </div>
      </div>
    </div>
  );
}
