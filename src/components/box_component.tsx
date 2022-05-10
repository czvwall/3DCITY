import React, { useRef, useState } from "react";
// import ReactDOM from "react-dom";
import { Canvas, MeshProps, useFrame, useThree } from "@react-three/fiber";
import { Euler, Vector3, Color, Mesh } from "three";

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Edges, useSelect } from "@react-three/drei";

export function Box(props: { id: number }) {
  // console.log("----", props.id);
  //     position={[-2, 0, 0]}
  // position={[2, 0, 0]}
  // This reference will give us direct access to the mesh
  // const mesh = useRef({ rotation: { x: 0, y: 0 }, positionX: props.id * 2 });
  const selected = useSelect().map((sel) => sel.userData.store)
  // const isSelected = !!selected.find((sel) => sel === store)
  
  const mesh = useRef<Mesh>(
    // rotation: { x: 0, y: 0, z: 0 },
    // position: [props.id * 2, 0, 0] as Vector3,
    null!
  );
  const boxPosition = useRef<Vector3>(new Vector3().set(props.id * 200, 100, 0));
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const [selecting, setSelecting] = useState(false);

  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

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
    // mesh.current.rotation.x = a; // Math.sin(clock.getElapsedTime())
    // mesh.current.rotation.y = aSine;

    // mesh.current.position.x = ((aSine + 2) / 0.75) * props.id;
    // mesh.current.position.y = ((aSine + 0) / 0.75) * props.id;
    // mesh.current.position.z = ((aCose - 0.5) / 1) * props.id;

    if (props.id == -1) {
      // mesh.current.position.x = ((aSine + 2) / 0.75) * props.id * mouse.x;
    }

    // if (pointer.x == ) {

    // }

    // boxPosition.current.set(pointer.x * 5, pointer.y * 5, 0);
    if (selecting) {
      mesh.current.position.set(pointer.x * 100, pointer.y * 100, 0);
    }

    // console.log("pointer", pointer.x);
    // console.log("mouse", mouse.x, "--", "mesh", mesh.current.position);

    // camera.lookAt(mouse.x, mouse.y, 0);
    // camera.translateX(-0.5 * mouse.x);
    // camera.rotateY(mouse.x)

    // camera.fov = THREE.MathUtils.lerp(state.camera.fov, zoom ? 10 : 42, 0.05)

    if (active) {
      // camera.position.lerp(
      //   v.set(active ? 25 : 10, active ? 1 : 5, active ? 0 : 10),
      //   0.05
      // );
      // camera.lookAt(0, 0, 0);
      // camera.updateProjectionMatrix();
    }
  });

  const camera = useThree((state) => state.camera);
  // camera.position.set(500, 200, 1000);
  // camera.rotateY(90)
  // camera.lookAt(0, 0, 0);
  const pointerState = useThree((state) => state.pointer);

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
      onPointerDown={(event) => {
        setSelecting(true);

        // mesh.current.position.set(
        //   boxPosition.current.x,
        //   boxPosition.current.y,
        //   0
        // );
      }}
      onPointerUp={(event) => {
        setSelecting(false);
      }}
      onPointerMove={(event) => {
        if (selecting) {
          // event.pointer.set(event.pointer.x, event.pointer.y);
          // setBoxPosition(boxPosition.set(event.pointer.x, event.pointer.y, 0));
          // mesh.current.position.set(event.pointer.x, event.pointer.y, 0);
        }
      }}
      position={boxPosition.current}
    >
      <boxGeometry args={[150, 150, 150]} />
      <meshStandardMaterial
        color={hovered ? "purple" : props.id === 1 ? "gold" : "blue"}
      />
      <Edges visible={true} scale={1.1} renderOrder={1000}>
        <meshBasicMaterial transparent color="#333" depthTest={false} />
      </Edges>
    </mesh>
  );
}

