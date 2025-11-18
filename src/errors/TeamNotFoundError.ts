export class TeamNotFoundError extends Error {
  constructor(teamName: string) {
    super(`O time "${teamName}" não foi encontrado.`);
    this.name = "TeamNotFoundError";
  }
}
