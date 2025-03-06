import * as THREE from "three";
import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";

function latLngToVector3(lat: number, lng: number, radius = 1) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

function createArcCurve(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
  radius = 2
) {
  const startVec = latLngToVector3(lat1, lng1, radius);
  const endVec = latLngToVector3(lat2, lng2, radius);

  const mid = startVec.clone().lerp(endVec, 0.5);
  // «Поднимаем» середину дуги (меняй 0.8 на что-то выше/ниже)
  const offset = mid.clone().normalize().multiplyScalar(0.4);
  mid.add(offset);

  return new THREE.CatmullRomCurve3([startVec, mid, endVec]);
}

/**
 * Линия «растёт» по дуге A->B, потом обратно B->A,
 * и в крайних точках (fraction=0 или 1) останавливается на 0.5 секунды.
 */
export function ArcLineGrowing({
  lat1,
  lng1,
  lat2,
  lng2,
  color = "yellow",
  radius = 2,
  speed = 0.0015,
}: {
  lat1: number;
  lng1: number;
  lat2: number;
  lng2: number;
  color?: string;
  radius?: number;
  speed?: number;
}) {
  // progress идёт по циклу [0..2] — (0..1) вперёд, (1..2) назад
  const [progress, setProgress] = useState(0);

  // Храним флаги для «паузы»
  const isPausedRef = useRef(false);
  const pausedUntilRef = useRef(0);
  const pauseDuration = 1500; // 0.5 секунды

  // Генерируем дугу (A->B)
  const curve = createArcCurve(lat1, lng1, lat2, lng2, radius);
  const forwardPoints = curve.getPoints(100);
  // Обратный массив (B->A)
  const reversePoints = [...forwardPoints].reverse();

  useFrame(() => {
    const now = performance.now(); // Текущее время (ms)

    // 1) Если мы сейчас «на паузе», проверяем, не прошла ли пауза
    if (isPausedRef.current) {
      // Если время ещё не вышло — просто ждём
      if (now < pausedUntilRef.current) {
        return; // не двигаем progress
      }
      // Иначе, пауза закончена
      isPausedRef.current = false;
    }

    // 2) Если не на паузе — двигаем progress
    setProgress((p) => {
      let next = p + speed;
      if (next > 2) next -= 2;
      return next;
    });
  });

  // fraction = часть дуги [0..1] (вперёд) либо (1..0) (назад)
  const fraction = progress <= 1 ? progress : 2 - progress;

  // Пауза в крайних точках
  if (!isPausedRef.current && (fraction <= 0 || fraction >= 1)) {
    // Начинаем полсекунды паузы
    isPausedRef.current = true;
    pausedUntilRef.current = performance.now() + pauseDuration;
  }

  // Вычисляем, какой кусок дуги отображать
  const sliceIndex = Math.floor(fraction * (forwardPoints.length - 1));
  const partialPoints =
    progress <= 1
      ? forwardPoints.slice(0, sliceIndex + 1)
      : reversePoints.slice(0, sliceIndex + 1);

  // Рендерим нашу «неоновую» линию
  return (
    <Line
      points={partialPoints}
      color={color}
      lineWidth={4}
      toneMapped={false}
      transparent
      blending={THREE.AdditiveBlending}
    />
  );
}
