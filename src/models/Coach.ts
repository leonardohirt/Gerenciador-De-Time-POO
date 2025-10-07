import { People } from "./People";

export class Coach extends People {
  constructor(
    public name: string,
    public experience: number
  ) {
    super(name);
  }

  showInfo(): void {
    console.log(`Técnico: ${this.name} - ${this.experience} anos de experiência`);
  }
}
