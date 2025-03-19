import { Sprite } from "pixi.js";

type DirType = "up" | "down" | "left" | "right";
const directions: Record<KeyboardEvent["code"], DirType> = {
  KeyW: "up",
  KeyA: "left",
  KeyS: "down",
  KeyD: "right",
};

const speed: number = 5;
const heldDirections: DirType[] = [];

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

function handleKeyDown(keyEvent: KeyboardEvent) {
  const dir = directions[keyEvent.code];
  if (dir && heldDirections.indexOf(dir) === -1) {
    heldDirections.unshift(dir);
  }
}

function handleKeyUp(keyEvent: KeyboardEvent) {
  const dir = directions[keyEvent.code];
  const index = heldDirections.indexOf(dir);
  if (index > -1) {
    heldDirections.splice(index, 1);
  }
}

function movement(player: Sprite, deltaTime: number) {
  heldDirections.forEach((heldDirection) => {
    if (heldDirection) {
      if (heldDirection === "up") {
        player.y -= speed * deltaTime;
      } else if (heldDirection === "down") {
        player.y += speed * deltaTime;
      } else if (heldDirection === "left") {
        player.x -= speed * deltaTime;
      } else if (heldDirection === "right") {
        player.x += speed * deltaTime;
      }
    }
  });
}

export { movement };
