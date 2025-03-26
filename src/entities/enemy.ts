import { Application, Container, Graphics, Renderer, Text } from "pixi.js";
import { isIntercects } from "../shared/is-intercets";
import { Sword } from "./sword";
import gsap from "gsap";

class Enemy extends Container {
  private sword: Sword;
  private graphics: Graphics;
  private app: Application<Renderer>;
  public color: number = 0xff0000;
  private direction: "right" | "left" = "right";
  constructor(sword: Sword, app: Application<Renderer>) {
    super();
    const graphics = new Graphics()
      .rect(0, 0, 100, 100)
      .stroke({ color: this.color, width: 2 });

    this.position = { x: 100, y: 100 };

    this.graphics = graphics;
    const enemyName = new Text({
      text: "НОРМИС",
      pivot: 0.5,
      style: {
        fill: this.color,
      },
      scale: 0.7,
    });
    enemyName.position = {
      x: this.graphics.width / 2 - enemyName.width / 2,
      y: this.graphics.height / 2 - enemyName.height / 2,
    };
    this.addChild(graphics, enemyName);

    this.sword = sword;
    this.app = app;
  }

  intersection() {
    if (isIntercects(this.sword, this.graphics) && this.sword.isCollidable) {
      this.graphics.context.fill("white");
      gsap.delayedCall(0.1, () => {
        this.graphics.context.clear();
        this.destroy();
      });
    }
  }

  move(deltaTime: number) {
    if (!this.position) {
      return;
    }

    if (this.direction === "right") {
      this.position.x += 5 * deltaTime;
    } else {
      this.position.x -= 5 * deltaTime;
    }

    if (this.position.x + this.width >= this.app.screen.width) {
      this.direction = "left";
    } else if (this.position.x <= 0) {
      this.direction = "right";
    }
  }
}

export { Enemy };
