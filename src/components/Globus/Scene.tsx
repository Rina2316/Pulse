import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Earth } from "./Earth";
import { Controls } from "./Controls";

export const Scene = () => {

  
  return (
    
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }}   style={{
      height: "110vh",
      width: "70vw",       
      marginLeft: "60rem", 
      marginRight: 0,
      paddingTop:"10rem",
      display: "block",
      background:"trasparent"
    }} >
      <Suspense fallback={null}>
      <ambientLight intensity={2} />
<pointLight position={[10, 10, 10]} intensity={5} />

        <directionalLight position={[0, 5, 5]} intensity={2} /> {/* Направленный свет */}
        <Earth />
        <Controls />
   
      </Suspense>
    </Canvas>
  );
};
