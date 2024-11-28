export class TableConfig {
  pollTable;
  constructor(pollTable: string) {
    this.pollTable = pollTable;
  }

  updateTableConfig(name: string) {
    this.pollTable = name;
  }

  getTableConfig() {
    return { pollTable: this.pollTable };
  }
}
