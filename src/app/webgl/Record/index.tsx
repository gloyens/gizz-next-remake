"use client";

import { useRef, useState, useEffect } from "react";

import * as THREE from "three";
import { DoubleSide, Mesh, Vector3 } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useCursor } from "@react-three/drei";
import { Plane } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";

const Record = () => {
  const recordRef = useRef<Mesh>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [textureLoaded, setTextureLoaded] = useState(false);
  const { size } = useThree();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load("im-in-your-mind-fuzz.jpg", (loadedTexture) => {
      texture.current = loadedTexture;
      setTextureLoaded(true);
    });
  }, []);

  const texture = useRef<THREE.Texture | null>(null);

  useFrame(({ clock, pointer }) => {
    if (!recordRef.current || !textureLoaded) return;

    // Convert pointer coordinates to normalized device coordinates (-1 to 1)
    const x = (pointer.x * size.width) / size.width;
    const y = (pointer.y * size.height) / size.height;

    setMousePosition((prev) => ({
      x: prev.x + (x - prev.x) * 0.05,
      y: prev.y + (y - prev.y) * 0.05,
    }));

    // Base rotation from clock for continuous movement
    const baseRotation = Math.sin(clock.getElapsedTime()) * 0.1;

    // Add mouse influence to rotation - centered at 0 when mouse is at center
    recordRef.current.rotation.x = mousePosition.y * 0.3;
    recordRef.current.rotation.y = baseRotation + mousePosition.x * 0.3;

    // Subtle position adjustment based on mouse
    recordRef.current.position.y =
      Math.sin(clock.getElapsedTime() * 4 + 1) * 0.02 + mousePosition.y * 0.1;
    recordRef.current.position.x = mousePosition.x * 0.1;
  });

  const { scale } = useSpring({
    scale: isHovering ? [1.02, 1.02, 1.02] : [1, 1, 1],
    config: { mass: 1, tension: 280, friction: 60 },
  });

  useCursor(isHovering);

  // Show a placeholder or loading state while texture loads
  if (!textureLoaded || !texture.current) {
    return (
      <Plane position={[0, 0, 4]}>
        <meshBasicMaterial color="#000000" />
      </Plane>
    );
  }

  return (
    <animated.mesh scale={scale as unknown as Vector3}>
      <Plane
        ref={recordRef}
        position={[0, 0, 4]}
        // castShadow
        onPointerEnter={() => setIsHovering(true)}
        onPointerLeave={() => setIsHovering(false)}
        onClick={() => {
          window.location =
            "/albums/im-in-your-mind-fuzz" as unknown as Location;
        }}
      >
        <meshPhongMaterial
          side={DoubleSide}
          map={texture.current}
          transparent={true}
        />
      </Plane>
    </animated.mesh>
  );
};

export default Record;
