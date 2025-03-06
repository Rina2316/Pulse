import * as THREE from "three";
import { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { ArcLineGrowing } from "./MovingLines";

export const Earth = () => {
  // Вместо earthRef используем groupRef,
  // чтобы вращать всю группу (и сферу, и линии).
  const groupRef = useRef<THREE.Group>(null);

  const texture = useLoader(THREE.TextureLoader, "/textures/earth.jpg");

  const routes = [
    { lat1: 40, lng1: -74, lat2: 35, lng2: 139, color: "#ffcb2e" }, // Нью-Йорк -> Токио
    { lat1: 51.5, lng1: 0, lat2: 48.8, lng2: 2.3, color: "#ffcb2e" }, // Лондон -> Париж
    { lat1: 37.77, lng1: -122.42, lat2: 34.05, lng2: -118.24, color: "#ffcb2e" }, // Сан-Франциско -> Лос-Анджелес
    { lat1: -33.86, lng1: 151.2, lat2: 1.29, lng2: 103.85, color: "#ffcb2e" }, // Сидней -> Сингапур
    { lat1: 48.85, lng1: 2.35, lat2: 55.75, lng2: 37.62, color: "#ffcb2e" }, // Париж -> Москва
    
    { lat1: 19.43, lng1: -99.13, lat2: 40.71, lng2: -74.01, color: "#ffcb2e" }, // Мехико -> Нью-Йорк
    { lat1: 55.75, lng1: 37.62, lat2: 35.68, lng2: 139.76, color: "#ffcb2e" }, // Москва -> Токио
    { lat1: 34.05, lng1: -118.24, lat2: 51.5, lng2: -0.12, color: "#ffcb2e" }, // Лос-Анджелес -> Лондон
    { lat1: -23.55, lng1: -46.63, lat2: 48.85, lng2: 2.35, color: "#ffcb2e" }, // Сан-Паулу -> Париж
    { lat1: 39.91, lng1: 116.40, lat2: 55.75, lng2: 37.62, color: "#ffcb2e" } // Пекин -> Москва
];


  // Вращаем всю группу
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    // ГРУППА со ссылкой groupRef
    <group ref={groupRef} >
      {/* СФЕРА планеты */}
      <mesh>
      <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* ЛИНИИ внутри той же группы */}
      {routes.map((route, index) => (
        <ArcLineGrowing key={index} {...route} speed={0.01} />
      ))}
    </group>
  );
};
