import { Showable } from "./interfaces/Showable";

export abstract class People implements Showable {

  constructor(
    public readonly id: number,
    public name: string,
    public age: number
  ) {}

  abstract showInfo(): void;
}