import { Heroine } from "./entities/heroine";
import { isIntercects } from "./shared/intercetrion";
import "./style.css";
import gsap from "gsap";

import { Application, Graphics } from "pixi.js";
import { Sword } from "./entities/sword";

const app = new Application();

await app.init({ background: "#000000", resizeTo: window });
document.body.appendChild(app.canvas);

const collider = new Graphics()
  .rect(100, 100, 100, 100)
  .stroke({ color: 0x00ff00, width: 2 });

const sword = new Sword(app.stage);
const heroine = new Heroine();
heroine.x = app.screen.width / 2;
heroine.y = app.screen.height / 2;

app.stage.addChild(sword, heroine, collider);

app.ticker.add((time) => {
  heroine.movement(time.deltaTime);
  sword.position = { x: heroine.position.x + 10, y: heroine.position.y };

  if (isIntercects(sword, collider) && sword.isCollidable) {
    collider.context.fill("white");
    gsap.delayedCall(0.1, () => {
      collider.context.clear();
    });
  }
});
