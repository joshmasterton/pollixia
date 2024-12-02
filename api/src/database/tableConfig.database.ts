export class TableConfig {
  pollTable;
  voteTable;
  optionsTable;
  constructor(pollTable: string, voteTable: string, optionsTable: string) {
    this.pollTable = pollTable;
    this.voteTable = voteTable;
    this.optionsTable = optionsTable;
  }

  updatePollTableConfig(value: string) {
    this.pollTable = value;
  }

  updateVoteTableConfig(value: string) {
    this.voteTable = value;
  }

  updateOptionsTableConfig(value: string) {
    this.optionsTable = value;
  }

  getTableConfig() {
    return {
      pollTable: this.pollTable,
      voteTable: this.voteTable,
      optionsTable: this.optionsTable,
    };
  }
}
