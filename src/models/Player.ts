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
    console.log(`ID: ${this.id}`);
    console.log(`Nome: ${this.name}`);
    console.log(`Idade: ${this.age}`);
    console.log(`Camisa: ${this.number}`);
    console.log(`Posição: ${this.position}`);
    console.log("------------------------");
  }
}