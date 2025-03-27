import { Container, Graphics, PointData } from "pixi.js";

class StatusBar extends Container {
  private hp: number;
  private stamina: number;

  constructor(hp: number, stamina: number) {
    super();
    this.hp = hp;
    this.stamina = stamina;

    const hpStroke = new Graphics()
      .rect(30, 30, 200, 20)
      .stroke({ color: 0x47080b, width: 2 });
    const hpFill = new Graphics()
      .rect(30, 30, 200, 20)
      .fill({ color: 0xed1c24 });

    const staminaStroke = new Graphics()
      .rect(30, 60, 150, 20)
      .stroke({ color: 0x104709, width: 2 });
    const staminaFill = new Graphics()
      .rect(30, 60, 150, 20)
      .fill({ color: 0x30db1d });
    this.addChild(hpFill, hpStroke, staminaFill, staminaStroke);
  }
}

export { StatusBar };
