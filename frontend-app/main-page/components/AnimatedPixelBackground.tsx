import Image, { type StaticImageData } from "next/image";
import bigTreeLayer from "../../assets/animation_assets/big-tree.png";
import bushLayer from "../../assets/animation_assets/bush.png";
import leftTreesLayer from "../../assets/animation_assets/left-trees.png";
import rightTreesLayer from "../../assets/animation_assets/right-trees.png";
import waterLayer from "../../assets/animation_assets/water.png";

type AnimatedPixelImageSource = string | StaticImageData;

type AnimatedPixelLayer = {
  src: AnimatedPixelImageSource;
  kind: "water" | "left-trees" | "right-trees" | "big-tree" | "bush";
};

type AnimatedPixelBackgroundProps = {
  baseSrc: AnimatedPixelImageSource;
  layers?: AnimatedPixelLayer[];
  className?: string;
};

const riverBeachLayers: AnimatedPixelLayer[] = [
  { src: waterLayer, kind: "water" },
  { src: leftTreesLayer, kind: "left-trees" },
  { src: rightTreesLayer, kind: "right-trees" },
  { src: bigTreeLayer, kind: "big-tree" },
  { src: bushLayer, kind: "bush" }
];

export default function AnimatedPixelBackground({
  baseSrc,
  layers = riverBeachLayers,
  className
}: AnimatedPixelBackgroundProps) {
  return (
    <div className={["animated-pixel-background", className].filter(Boolean).join(" ")} aria-hidden="true">
      <Image
        className="animated-pixel-background__layer animated-pixel-background__layer--base"
        src={baseSrc}
        alt=""
        fill
        priority
        sizes="100vw"
        unoptimized
        draggable={false}
      />

      {layers.map((layer) => (
        <Image
          key={layer.kind}
          className={`animated-pixel-background__layer animated-pixel-background__layer--${layer.kind}`}
          src={layer.src}
          alt=""
          fill
          sizes="100vw"
          unoptimized
          draggable={false}
        />
      ))}
    </div>
  );
}
