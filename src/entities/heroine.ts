import gsap from "gsap";
import {
  Assets,
  Container,
  ContainerChild,
  DEG_TO_RAD,
  Sprite,
  Texture,
} from "pixi.js";
import { Sword } from "./sword";

const texture = await Assets.load("../public/koke.png");

type DirType = "up" | "down" | "left" | "right";
const directions: Record<KeyboardEvent["code"], DirType> = {
  KeyW: "up",
  KeyA: "left",
  KeyS: "down",
  KeyD: "right",
};

class Heroine extends Container {
  public hp: number;
  public stamina: number;
  public sword;
  private isSwingAnimationRunning = false;
  private speed: number = 5;
  private heldDirections: DirType[] = [];
  private stage: Container<ContainerChild>;

  constructor(stage: Container<ContainerChild>) {
    super();

    this.hp = 100;
    this.stamina = 50;
    this.stage = stage;

    this.sword = new Sword(this.stage);
    const sprite = new Sprite(texture);
    sprite.anchor.set(0.5);
    this.addChild(sprite);

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
    if (this.sword.isSwing && !this.isSwingAnimationRunning) {
      this.isSwingAnimationRunning = true;
      const originalY = this.y;
      const originalRotation = this.rotation;

      const swingTimeline = gsap
        .timeline()
        .to(this, 0.3, {
          y: originalY - 10,
          rotation: (this.sword.attackCount % 2 === 0 ? 10 : -10) * DEG_TO_RAD,
        })
        .to(this, 0.3, {
          y: originalY - 15,
          rotation: (this.sword.attackCount % 2 === 0 ? 15 : -15) * DEG_TO_RAD,
        })
        .to(this, 0.1, {
          y: originalY + 20,
          rotation: (this.sword.attackCount % 2 === 0 ? -10 : 10) * DEG_TO_RAD,
        })
        .to(this, 0.2, {
          y: originalY,
          rotation: originalRotation,
        })
        .eventCallback("onComplete", () => {
          this.isSwingAnimationRunning = false;
        });

      this.sword.once("swingcomplete", () => {
        swingTimeline.kill();
        gsap.set(this, { y: originalY, rotation: originalRotation });
      });
    }

    this.sword.position = {
      x: this.position.x + 10,
      y: this.position.y,
    };

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
