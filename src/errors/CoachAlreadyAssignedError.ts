export class CoachAlreadyAssignedError extends Error {
  constructor(teamName?: string) {
    const msg = teamName
      ? `Este time ("${teamName}") já possui um técnico definido.`
      : "Este time já possui um técnico definido.";
    super(msg);
    this.name = "CoachAlreadyAssignedError";
  }
}
