import { Application, Container, Graphics, PointData, Renderer } from "pixi.js";
import gsap from "gsap";

class Gun extends Container {
  public isCollidable: boolean = false;
  private bullet: Graphics;
  private app: Application<Renderer>;
  public mousePos: PointData = { x: 0, y: 0 };

  constructor(app: Application<Renderer>) {
    super();

    this.bullet = new Graphics()
      .rect(10, 10, 10, 10)
      .stroke({ color: 0x00ff00, width: 2 });

    this.app = app;
    this.app.stage.eventMode = "static";
    this.app.stage.interactive = true;
    this.app.stage.hitArea = app.screen;
    this.app.stage.on("pointermove", (e) => {
      this.setMousePos({ x: e.clientX, y: e.clientY });
    });

    this.addChild(this.bullet);

    this.handleKeyDown = this.handleKeyDown.bind(this);

    document.addEventListener("keypress", this.handleKeyDown);
  }

  public setMousePos(mousePos: PointData) {
    this.mousePos = mousePos;
  }

  public handleKeyDown(keyEvent: KeyboardEvent) {
    if (keyEvent.code === "KeyQ") {
      gsap.to(this.position, 0.1, {
        x: this.mousePos.x,
        y: this.mousePos.y,
      });
    }
  }
}

export { Gun };
