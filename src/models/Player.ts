import { People } from "./People";
import { Position } from "./Position";

export class Player extends People {
  constructor(
    public name: string,
    public number: number,
    public position: Position
  ) {
    super(name);
  }

  showInfo(): void {
    console.log(`${this.name} - #${this.number} - Position: ${this.position}`);
  }
}
