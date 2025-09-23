import { People } from "./People";

export class Coach extends People {
  constructor(
    public name: string,
    public experience: number
  ) {
    super(name);
  }

  showInfo(): void {
    console.log(`Coach: ${this.name} - ${this.experience} years of experience`);
  }
}
