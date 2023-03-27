"use client";

import { Canvas } from "@react-three/fiber";

import { SceneWrapper } from "./styles";

interface Props {
  children: React.ReactNode;
}

const Scene = ({ children }: Props) => {
  return (
    <SceneWrapper>
      <Canvas shadows>{children}</Canvas>
    </SceneWrapper>
  );
};

export default Scene;
