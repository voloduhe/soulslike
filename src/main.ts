import { Enemy } from "./entities/enemy";
import { Heroine } from "./entities/heroine";
import "./style.css";

import { Application } from "pixi.js";

const app = new Application();
(
  globalThis as unknown as {
    __PIXI_APP__: Application | undefined;
  }
).__PIXI_APP__ = app;

await app.init({ background: "#000000", resizeTo: window });
document.body.appendChild(app.canvas);

const heroine = new Heroine(app.stage);
const enemy = new Enemy(heroine.sword, app);
const enemy1 = new Enemy(heroine.sword, app, {
  x: app.screen.width - 100,
  y: 500,
});
heroine.x = app.screen.width / 2;
heroine.y = app.screen.height / 2;

app.stage.addChild(heroine.sword, heroine, enemy, enemy1);

app.ticker.add((time) => {
  heroine.movement(time.deltaTime);

  enemy.intersection();
  enemy.move(time.deltaTime);
  enemy1.intersection();
  enemy1.move(time.deltaTime);
});
