import { Container, ContainerChild } from "pixi.js";
import gsap from "gsap";
import { degToRad } from "./shared/deg-to-rad";

function attack(sword: Container, stage: Container<ContainerChild>) {
  document.addEventListener("keypress", handleKeyDown);
  let anim: Promise<gsap.core.Tween> | null;
  let attackCount = 0;

  function handleKeyDown(keyEvent: KeyboardEvent) {
    if (keyEvent.code === "Space" && !anim) {
      const attackType = attackCount % 2 === 0 ? "alt" : "default";

      anim = gsap
        .to(sword, {
          duration: 0.5,
          rotation: degToRad(attackType === "alt" ? -100 : 20),
        })
        .then(() => {
          sword.name = "col";
          gsap.to(stage.position, 0.1, { x: "+=20", yoyo: true, repeat: 1 });
          gsap.to(stage.position, 0.1, { x: "-=20", yoyo: true, repeat: 1 });

          gsap
            .fromTo(
              sword,
              0.3,
              { rotation: degToRad(attackType === "alt" ? -100 : 10) },
              { rotation: degToRad(attackType === "alt" ? 360 : -360) }
            )
            .then(() => {
              sword.name = "";
            });
        });

      anim.then(() => {
        sword.rotation = 0;
        anim = null;
        attackCount++;
      });
    }
  }
}

export { attack };
