export class DuplicatePlayerError extends Error {
  constructor(playerId: number) {
    super(`Não é possível adicionar: o jogador com ID ${playerId} já está no time.`);
    this.name = "DuplicatePlayerError";
  }
}
