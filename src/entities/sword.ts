import { Container, ContainerChild, DEG_TO_RAD, Graphics } from "pixi.js";
import gsap from "gsap";

class Sword extends Container {
  private blade: Graphics;
  private handle: Graphics;
  public isCollidable: boolean = false;
  private stage: Container<ContainerChild>;

  private anim: Promise<gsap.core.Tween> | null = null;
  private attackCount = 0;

  constructor(stage: Container<ContainerChild>) {
    super();

    this.blade = new Graphics()
      .rect(10, 0, 100, 10)
      .stroke({ color: 0x00ff00, width: 2 });
    this.handle = new Graphics()
      .rect(0, 5 / 2, 10, 5)
      .stroke({ color: 0x00ff00, width: 2 });

    this.stage = stage;

    this.addChild(this.blade);
    this.addChild(this.handle);

    this.handleKeyDown = this.handleKeyDown.bind(this);

    document.addEventListener("keypress", this.handleKeyDown);
  }

  public handleKeyDown(keyEvent: KeyboardEvent) {
    if (keyEvent.code === "Space" && !this.anim) {
      const attackType = this.attackCount % 2 === 0 ? "alt" : "default";

      this.anim = gsap
        .to(this, {
          duration: 0.5,
          rotation: (attackType === "alt" ? -100 : 20) * DEG_TO_RAD,
        })
        .then(() => {
          this.isCollidable = true;
          gsap.to(this.stage.position, 0.1, {
            x: "+=20",
            yoyo: true,
            repeat: 1,
          });
          gsap.to(this.stage.position, 0.1, {
            x: "-=20",
            yoyo: true,
            repeat: 1,
          });

          gsap
            .fromTo(
              this,
              0.3,
              { rotation: (attackType === "alt" ? -100 : 10) * DEG_TO_RAD },
              { rotation: (attackType === "alt" ? 360 : -360) * DEG_TO_RAD }
            )
            .then(() => {
              this.isCollidable = false;
            });
        });

      this.anim.then(() => {
        this.rotation = 0;
        this.anim = null;
        this.attackCount++;
      });
    }
  }
}

export { Sword };
