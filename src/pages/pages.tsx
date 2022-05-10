import { Suspense, useRef, useState } from "react";
import "./pages.css";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Edges,
  Environment,
  OrbitControls,
} from "@react-three/drei";
import { Mesh, Vector3 } from "three";
import React from "react";
import ReactDOM from "react-dom";

function Pages() {
  return (
    <div className="App">
      <CanvasComponent />

      <div className="header-major">
        <span className="header-options">Virtual Wall</span>
      </div>
    </div>
  );
}

const CanvasComponent = () => {

  return (
    <Canvas
      className="App-header"
      camera={{ fov: 50, far: 3000, position: [1000, 2000, 1000] }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.7} />
        {/* <directionalLight /> */}
        <pointLight position={[1000, 1000, 1000]} />

        <MoveBox />
        <OrbitControls />

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

function MoveBox() {
  const mesh = useRef<Mesh>(null!);
  const boxPosition = useRef<Vector3>(new Vector3().set(0, 0, 0));
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const [selecting, setSelecting] = useState(false);

  const { size, viewport } = useThree();

  // const [boxPosition, setBoxPosition] = useState<Vector3>(
  //   new Vector3().set(props.id * 2, 0, 0)
  // ); // [props.id * 2, 0, 0]);
  // Rotate mesh every frame, this is outside of React without overhead
  // let poss =
  //   mesh.current.rotation.x < 5
  //     ? mesh.current.rotation.x
  //     : mesh.current.rotation.x / 5;

  const v = new Vector3();

  useFrame(({ clock, mouse, camera, pointer }) => {
    const a = clock.getElapsedTime();
    const aSine = Math.sin(a);
    const aCose = Math.cos(a);
    // console.log(a);
    mesh.current.rotation.x = a; // Math.sin(clock.getElapsedTime())
    mesh.current.rotation.y = aSine;

    mesh.current.position.x = (aSine + 2) / 0.75;
    mesh.current.position.y = (aSine + 0) / 0.75;
    mesh.current.position.z = (aCose - 0.5) / 1;

    if (active) {
      // camera.position.lerp(
      //   v.set(active ? 25 : 10, active ? 1 : 5, active ? 0 : 10),
      //   0.05
      // );
      // camera.lookAt(0, 0, 0);
      // camera.updateProjectionMatrix();
    }
  });

  return (
    <mesh
      //   {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => {
        // camera.lookAt(5, 0, 0);
        setActive(!active);
      }}
      onPointerOver={(event) => {
        setHover(true);
      }}
      onPointerOut={(event) => setHover(false)}
      position={boxPosition.current}
    >
      <boxGeometry args={[150, 150, 150]} />
      <meshStandardMaterial color={hovered ? "purple" : "yellow"} />
      <Edges visible={true} scale={1.1} renderOrder={1000}>
        <meshBasicMaterial transparent color="#333" depthTest={false} />
      </Edges>
    </mesh>
  );
}

export default Pages;

ReactDOM.render(
    <React.StrictMode>
      <Pages />
    </React.StrictMode>,
    document.getElementById('root2')
  )