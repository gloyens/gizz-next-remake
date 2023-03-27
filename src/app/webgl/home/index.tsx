"use client";

import Scene from "@/app/webgl/Scene";

import Record from "../Record";

const HomeCanvas = () => (
  <Scene>
    <ambientLight />
    {/* <OrbitControls
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={Math.PI / 2}
      enablePan={false}
      //   enableZoom={false}
    /> */}
    <Record />
  </Scene>
);

export default HomeCanvas;
