import { useThree } from "@react-three/fiber";
import { useState, useEffect } from "react";
import { Raycaster, Vector2 } from "three";
import { useEventListener } from "./custom_hooks";

export const usePlayerControls = () => {
  const [movement, setMovement] = useState({
    KeyW: false,
    KeyS: false,
    KeyA: false,
    KeyD: false,
    Space: false,
  });
  //   const [movement2, setMovement2] = useState({
  //     moveForward: false,
  //     moveBackward: false,
  //     moveLeft: false,
  //     moveRight: false,
  //     jump: false,
  //   });

  const onKeyDown = function (key: KeyboardEvent) {
    switch (key.code) {
      case "ArrowUp":
      case "KeyW":
        setMovement((m) => ({ ...m, ["KeyW"]: true }));
        break;

      case "ArrowLeft":
      case "KeyA":
        setMovement((m) => ({ ...m, ["KeyA"]: true }));
        break;

      case "ArrowDown":
      case "KeyS":
        setMovement((m) => ({ ...m, ["KeyS"]: true }));
        break;

      case "ArrowRight":
      case "KeyD":
        setMovement((m) => ({ ...m, ["KeyD"]: true }));
        break;

      case "Space":
        // if (canJump === true) velocity.y += 350;
        setMovement((m) => ({ ...m, ["Space"]: true }));
        break;
    }
  };

  const onKeyUp = function (key: KeyboardEvent) {
    switch (key.code) {
      case "ArrowUp":
      case "KeyW":
        setMovement((m) => ({ ...m, ["KeyW"]: false }));
        break;

      case "ArrowLeft":
      case "KeyA":
        setMovement((m) => ({ ...m, ["KeyA"]: false }));
        break;

      case "ArrowDown":
      case "KeyS":
        setMovement((m) => ({ ...m, ["KeyS"]: false }));
        break;

      case "ArrowRight":
      case "KeyD":
        setMovement((m) => ({ ...m, ["KeyD"]: false }));
        break;

      case "Space":
        setMovement((m) => ({ ...m, ["Space"]: false }));
        break;
    }
  };

  useEventListener("keydown", onKeyDown);
  useEventListener("keyup", onKeyUp);

  return {
    forward: movement.KeyW,
    backward: movement.KeyS,
    left: movement.KeyA,
    right: movement.KeyD,
    jump: movement.Space,
  };
};


export const mouseCatcher = () => {
  const {mouse, camera, raycaster, scene,} = useThree()

  const onPointerDown = function (event: PointerEvent) {
    // const mouse = new Vector2()
    // const raycaster = new Raycaster()

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
				mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

				raycaster.setFromCamera( mouse, camera );
				const intersects = raycaster.intersectObjects( scene.children, false );
				if ( intersects.length > 0 ) {

					const object = intersects[ 0 ].object;
					object.layers.toggle( BLOOM_SCENE );
					render();

				}
  };


  window.addEventListener( 'pointerdown', onPointerDown );


  return {
    forward: movement.KeyW,
    backward: movement.KeyS,
    left: movement.KeyA,
    right: movement.KeyD,
    jump: movement.Space,
  };
};