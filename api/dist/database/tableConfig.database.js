export class TableConfig {
    pollTable;
    voteTable;
    optionsTable;
    constructor(pollTable, voteTable, optionsTable) {
        this.pollTable = pollTable;
        this.voteTable = voteTable;
        this.optionsTable = optionsTable;
    }
    updatePollTableConfig(value) {
        this.pollTable = value;
    }
    updateVoteTableConfig(value) {
        this.voteTable = value;
    }
    updateOptionsTableConfig(value) {
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
