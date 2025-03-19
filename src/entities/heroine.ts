import { Assets, Sprite } from "pixi.js";

const texture = await Assets.load("../public/koke.png");

type DirType = "up" | "down" | "left" | "right";
const directions: Record<KeyboardEvent["code"], DirType> = {
  KeyW: "up",
  KeyA: "left",
  KeyS: "down",
  KeyD: "right",
};

class Heroine extends Sprite {
  public hp: number;
  public stamina: number;
  private speed: number = 5;
  private heldDirections: DirType[] = [];

  constructor() {
    super(texture);

    this.hp = 100;
    this.stamina = 50;

    this.anchor.set(0.5);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
  }

  public handleKeyDown(keyEvent: KeyboardEvent) {
    const dir = directions[keyEvent.code];
    if (dir && this.heldDirections.indexOf(dir) === -1) {
      this.heldDirections.unshift(dir);
    }
  }

  public handleKeyUp(keyEvent: KeyboardEvent) {
    const dir = directions[keyEvent.code];
    const index = this.heldDirections.indexOf(dir);
    if (index > -1) {
      this.heldDirections.splice(index, 1);
    }
  }

  public movement(deltaTime: number) {
    this.heldDirections.forEach((heldDirection) => {
      if (heldDirection) {
        if (heldDirection === "up") {
          this.y -= this.speed * deltaTime;
        } else if (heldDirection === "down") {
          this.y += this.speed * deltaTime;
        } else if (heldDirection === "left") {
          this.x -= this.speed * deltaTime;
        } else if (heldDirection === "right") {
          this.x += this.speed * deltaTime;
        }
      }
    });
  }
}

export { Heroine };
