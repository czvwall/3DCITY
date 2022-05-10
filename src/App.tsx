import { Suspense, useEffect, useRef, useState } from "react";
import "./App.css";
import { Box } from "./components/box_component";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, OrbitControls, Select, useGLTF } from "@react-three/drei";

import LittleTokyo from "./components/littleTokyo";
import useStore from "./helpers/store";

function App() {
  return (
    <div className="App">
      <CanvasComponent />

      <div className="header-major">
        <span className="header-options">Virtual Wall City</span>

        <span className="header-options">
          {" "}
          <a href="/pages/" className="header-optionst" children="ホーム" />
        </span>

        <span className="header-options">
          <a href="/pages/" className="header-optionst" children="トレンド" />{" "}
        </span>
        <span className="header-options">
          <a href="/pages/" className="header-optionst" children="エリア" />
        </span>
        <span className="header-options">
          <a href="/pages/" className="header-optionst" children="掲示板" />
        </span>
      </div>
    </div>
  );
}

const CanvasComponent = () => {
  // const gltf = useLoader(GLTFLoader, '/LittlestTokyo.glb')
  const gltf = useGLTF("/LittlestTokyo.glb") as any;

  const [selected, setSelected] = useState([]);
  // const fbx = useLoader(FBXLoader, "/manhattan.fbx");

  return (
    <Canvas
      className="App-header"
      camera={{ fov: 50, far: 3000, position: [1000, 2000, 1000] }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.7} />
        {/* <directionalLight /> */}
        <pointLight position={[1000, 1000, 1000]} />

        <Select multiple box onChange={() => {}}>
          {" "}
          // setSelected
          <Box id={1} />
          <Box id={-1} />
          <LittleTokyo position={[0, 0, 0]} />
          <LittleTokyo position={[540, 0, 0]} />
          <LittleTokyo position={[0, 0, -540]} />
          <LittleTokyo position={[540, 0, -540]} />
        </Select>

        <MyControls />
        {/* <PerspectiveCamera makeDefault /> */}
        {/* <primitive object={gltf.scene} /> */}
        {/* <PlayerCam2 /> */}

        {/* <primitive object={fbx} /> */}
        <Environment
          ground={{
            height: 15, // Height of the camera that was used to create the env map (Default: 15)
            radius: 1000, // Radius of the world. (Default 60)
            scale: 5000, // Scale of the backside projected sphere that holds the env texture (Default: 1000)
          }}
          preset="city"
          background
        />
        {/* <Sky distance={1500} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} /> */}
      </Suspense>
    </Canvas>
  );
};

const MyControls = () => {
  const { camera } = useThree();
  // const controls = useRef<PointerLockControlsProps>(null!);
  const cont = useStore((state) => state.controls);

  // useStore.setState(contr{ controls });

  console.log("State", useStore.getState());

  // console.log(camera.position)
  return <OrbitControls />;
};

export default App;
