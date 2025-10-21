import { People } from "./People";
import { Position } from "./Position";

export class Player extends People {
  constructor(
    id: number,
    name: string,
    age: number,
    public number: number,
    public position: Position
  ) {

    super(id, name, age);
  }

  public showInfo(): void {
    console.log("--- Ficha do Jogador ---");
    console.log(`ID: ${this.id} | Nome: ${this.name} | Idade: ${this.age}`);
    console.log(`Camisa: ${this.number} | Posição: ${this.position}`);
    console.log("------------------------");
  }
}