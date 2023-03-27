"use client";

import { useRef, useState } from "react";

import * as THREE from "three";
import { DoubleSide, Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { useCursor } from "@react-three/drei";
import { Plane } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";

const Record = () => {
  const recordRef = useRef<Mesh>(null);
  const [isHovering, setIsHovering] = useState(false);

  const loader = new THREE.TextureLoader();
  const texture = loader.load("im-in-your-mind-fuzz.jpg");

  useFrame(({ clock }) => {
    if (!recordRef.current) return;

    const t = Math.sin(clock.getElapsedTime());

    recordRef.current.rotation.x = -0.25;
    recordRef.current.rotation.y = t * 0.25;
  });

  const { scale } = useSpring({
    scale: isHovering ? [1.02, 1.02, 1.02] : [1, 1, 1],
    config: { mass: 1, tension: 280, friction: 60 },
  });

  useCursor(isHovering);

  return (
    <animated.mesh scale={scale}>
      <Plane
        ref={recordRef}
        position={[0, 0, 4]}
        // castShadow
        onPointerEnter={() => setIsHovering(true)}
        onPointerLeave={() => setIsHovering(false)}
        onClick={() => {
          window.location = "/albums/im-in-your-mind-fuzz";
        }}
      >
        <meshPhongMaterial side={DoubleSide} map={texture} />
      </Plane>
    </animated.mesh>
  );
};

export default Record;
