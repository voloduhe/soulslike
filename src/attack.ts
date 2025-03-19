import { Container } from "pixi.js";
import gsap from "gsap";
import { degToRad } from "./shared/deg-to-rad";

function attack(sword: Container) {
  document.addEventListener("keypress", handleKeyDown);
  let anim: Promise<gsap.core.Tween> | null;

  function handleKeyDown(keyEvent: KeyboardEvent) {
    if (keyEvent.key === " " && !anim) {
      anim = gsap
        .to(sword, { duration: 0.5, rotation: degToRad(20) })
        .then(() =>
          gsap.fromTo(
            sword,
            0.3,
            { rotation: degToRad(10) },
            { rotation: degToRad(-360) }
          )
        );

      anim.then(() => {
        sword.rotation = 0;
        anim = null;
      });
    }
  }
}

export { attack };
