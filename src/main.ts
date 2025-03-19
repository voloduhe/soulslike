import { attack } from "./attack";
import { movement } from "./movement";
import { isIntercects } from "./shared/intercetrion";
import "./style.css";
import gsap from "gsap";

import { Application, Assets, Container, Graphics, Sprite } from "pixi.js";

const app = new Application();

await app.init({ background: "#000000", resizeTo: window });
document.body.appendChild(app.canvas);

const texture = await Assets.load("https://pixijs.com/assets/bunny.png");
const bunny = new Sprite(texture);
const blade = new Graphics()
  .rect(10, 0, 100, 10)
  .stroke({ color: 0x00ff00, width: 2 });
const handle = new Graphics()
  .rect(0, 5 / 2, 10, 5)
  .stroke({ color: 0x00ff00, width: 2 });
const sword = new Container();

const collider = new Graphics()
  .rect(100, 100, 100, 100)
  .stroke({ color: 0x00ff00, width: 2 });

bunny.anchor.set(0.5);
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;

sword.addChild(blade);
sword.addChild(handle);
sword.name = "";
app.stage.addChild(sword);
app.stage.addChild(bunny);
app.stage.addChild(collider);

attack(sword, app.stage);

app.ticker.add((time) => {
  movement(bunny, time.deltaTime);
  sword.position = { x: bunny.position.x + 10, y: bunny.position.y };
  if (isIntercects(sword, collider) && sword.name === "col") {
    collider.context.fill("white");
    gsap.delayedCall(0.1, () => {
      collider.context.clear();
    });
  }
});
