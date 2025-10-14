import { People } from "./People";

export class Coach extends People {
  constructor(
    id: number,
    name: string,
    age: number,
    public experience: number
  ) {

    super(id, name, age);
  }

  public showInfo(): void {
    console.log("--- Ficha do Técnico ---");
    console.log(`ID: ${this.id}`);
    console.log(`Nome: ${this.name}`);
    console.log(`Idade: ${this.age}`);
    console.log(`Experiência: ${this.experience} anos`);
    console.log("------------------------");
  }
}