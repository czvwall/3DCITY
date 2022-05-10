import { useThree, useFrame, useLoader, GroupProps } from "@react-three/fiber";
import { useRef } from "react";
import {
  BackSide,
  Group,
  MathUtils,
  Mesh,
  TextureLoader,
  Vector3,
} from "three";
import { usePlayerControls } from "../helpers/helper_functions";

export function PlayerCam(props: any) {
  const axe = useRef<THREE.Group>(null!);

  const { forward, backward, left, right, jump } = usePlayerControls();
  console.log(forward, backward, left, right, jump);
  // const { camera, controls } = useThree();
  // const velocity = useRef([0, 0, 0]);
  const velocity = useRef(new Vector3());
  const ref = useRef<Mesh>(null!);

  const SPEED = 5;
  const direction = useRef(new Vector3());
  const rotation = new Vector3();

  useFrame((state) => {
    const deltaTime = state.clock.elapsedTime;
    ref.current.getWorldPosition(state.camera.position);
    // if (forward || backward || left || right || jump) {

    const delta = deltaTime / 1000;
    // console.log(delta,deltaTime);
    const newVX = velocity.current.x - velocity.current.x * SPEED * delta;
    const newVZ = velocity.current.z - velocity.current.z * SPEED * delta;
    // const newVZ = velocity.current.z - 9.8 * 100.0 * delta; // 100.0 = mass;
    const newVY = 0;

    velocity.current.set(newVX, newVY, newVZ);
    direction.current.set(
      Number(left) - Number(right),
      0,
      Number(backward) - Number(forward)
    );

    direction.current.normalize() //.applyEuler(state.camera.rotation);

    if (forward || backward) {
      velocity.current.setZ(
        velocity.current.z - direction.current.z * 400.0 * delta
      );
    }
    if (left || right) {
      velocity.current.setX(
        velocity.current.x - direction.current.x * 400.0 * delta
      );
    }

    // state.camera.rotation.copy(velocity.current)
    state.camera.position.copy(velocity.current)
    // speed.fromArray(velocity.current);
    // axe.current.children[0].rotation.x = MathUtils.lerp(
    //   axe.current.children[0].rotation.x,
    //   Math.sin(speed.length() * state.clock.elapsedTime * 10) / 10,
    //   0.1
    // );
    axe.current.rotation.copy(state.camera.rotation);
    axe.current.position
      .copy(state.camera.position)
      .add(state.camera.getWorldDirection(rotation).multiplyScalar(1));
    state.camera.position.setY(state.camera.position.y + 8);

    // api.velocity.set(direction.x, velocity.current[1], direction.z);
    // if (jump && Math.abs(velocity.current[1]) < 0.05)
    //   api.velocity.set(velocity.current[0], 10, velocity.current[2]);

    ref.current.position.copy(direction.current);

    console.log(direction.current);
    console.log(velocity.current);
  });

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
