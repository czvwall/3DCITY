import { useFrame, useLoader, GroupProps } from "@react-three/fiber";
import { useRef } from "react";
import { BackSide, Group, Mesh, TextureLoader, Vector3 } from "three";
import { usePlayerControls } from "../helpers/helper_functions";
import useStore from "../helpers/store";

export function PlayerCam2(props: any) {
  const axe = useRef<THREE.Group>(null!);

  const { forward, backward, left, right, jump } = usePlayerControls();
  console.log(forward, backward, left, right, jump);

  const velocity = useRef(new Vector3());
  const charPos = useRef(new Vector3());
  const ref = useRef<Mesh>(null!);

  const SPEED = 5;
  const direction = useRef(new Vector3());
  const rotation = new Vector3();

  useFrame((state) => {
    const deltaTime = state.clock.elapsedTime;
    ref.current.getWorldPosition(state.camera.position);

    const delta = deltaTime / 1000;
    // console.log(delta,deltaTime);
    const newVX = velocity.current.x + velocity.current.x * SPEED * delta;
    const newVZ = velocity.current.z + velocity.current.z * SPEED * delta;
    // const newVZ = velocity.current.z - 9.8 * 100.0 * delta; // 100.0 = mass;
    const newVY = 0;

    // velocity.current.set(newVX, newVY, newVZ);
    direction.current.set(
      Number(right) - Number(left),
      0,
      Number(backward) - Number(forward)
    );

    direction.current.normalize(); //.applyEuler(state.camera.rotation);

    charPos.current.add(direction.current);

    if (forward || backward) {
      velocity.current.setZ(velocity.current.z - direction.current.z * delta);
    }
    if (left || right) {
      velocity.current.setX(velocity.current.x - direction.current.x * delta);
    }

    state.controls?.dispatchEvent
    // state.camera.rotation.copy(velocity.current)
    state.camera.position.copy(charPos.current);

    axe.current.rotation.copy(state.camera.rotation);
    axe.current.position
      .copy(state.camera.position)
      .add(state.camera.getWorldDirection(rotation).multiplyScalar(1));
    state.camera.position.setY(state.camera.position.y + 8);

    // ref.current.position.copy(charPos.current);

    console.log("direction", direction.current);
    console.log("velocity", velocity.current);
    console.log("charPos", charPos.current);
  });

  const controls = useStore((state) => state.controls);
  useStore.setState({ controls });
  console.log("State2", useStore.getState());


  return (
    <>
      <mesh ref={ref} />
      <group
        ref={axe}
        onPointerMissed={(e) => (axe.current.children[0].rotation.x = -0.5)}
      >
        <Body position={[0, 4, 0]} />
      </group>
    </>
  );
}

function Body(props: GroupProps) {
  const group = useRef<Group>(null!);
  const texture = useLoader(
    TextureLoader,
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn7OX5z96GGvEGlyrCQxcbDCLLzaU9AOfM3w&usqp=CAU"
  );
  return (
    <group ref={group} dispose={null} {...props}>
      <mesh castShadow>
        <planeGeometry attach="geometry" args={[10, 10]} />
        <meshBasicMaterial
          attach="material"
          map={texture}
          transparent
          side={BackSide}
        />
      </mesh>
    </group>
  );
}
