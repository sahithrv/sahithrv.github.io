import { type ReactNode } from "react";
import AnimatedPixelBackground from "@/components/AnimatedPixelBackground";

type PhotographyBackdropProps = {
  children: ReactNode;
};

export default function PhotographyBackdrop({ children }: PhotographyBackdropProps) {
  return (
    <div className="photography-page-backdrop">
      <AnimatedPixelBackground baseSrc="/images/backgrounds/background1.png" />
      {children}
    </div>
  );
}
