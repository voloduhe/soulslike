import { Heroine } from "./entities/heroine";
import { isIntercects } from "./shared/intercetrion";
import "./style.css";
import gsap from "gsap";

import { Application, Graphics } from "pixi.js";

const app = new Application();

await app.init({ background: "#000000", resizeTo: window });
document.body.appendChild(app.canvas);

const collider = new Graphics()
  .rect(100, 100, 100, 100)
  .stroke({ color: 0x00ff00, width: 2 });

const heroine = new Heroine(app.stage);
heroine.x = app.screen.width / 2;
heroine.y = app.screen.height / 2;

app.stage.addChild(heroine.sword, heroine, collider);

app.ticker.add((time) => {
  heroine.movement(time.deltaTime);

  if (isIntercects(heroine.sword, collider) && heroine.sword.isCollidable) {
    collider.context.fill("white");
    gsap.delayedCall(0.1, () => {
      collider.context.clear();
    });
  }
});
