import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useMediaQuery } from "react-responsive";
import { Earth } from "./Earth";
import { Controls } from "./Controls";

export const Scene = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: isMobile ? 75 : 50 }}
      style={{
        height: isMobile ? "60vh" : "110vh",
        width: isMobile ? "100vw" : "70vw",
        margin: isMobile ? "0 auto" : "0 0 0 60rem",
        paddingTop: isMobile ? "5rem" : "10rem",
        display: "block",
        background: "transparent",
      }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={2} />
        <pointLight position={[10, 10, 10]} intensity={5} />
        <directionalLight position={[0, 5, 5]} intensity={2} />
        <Earth />
        <Controls />
      </Suspense>
    </Canvas>
  );
};
