export class PlayerNotFoundError extends Error {
  constructor(playerId: number) {
    super(`O jogador com ID ${playerId} não foi encontrado.`);
    this.name = "PlayerNotFoundError";
  }
}
