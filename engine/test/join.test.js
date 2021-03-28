const { expect } = require("chai");
const { findRecords, joinRecords } = require("../src");

describe("join calls", () => {
  it("should join 5 calls with teams", async () => {
    const { records: calls } = await findRecords({
      tableName: "calls",
      start: 0,
      limit: 5,
    });
    expect(calls).to.have.lengthOf(5);
    expect(calls[0].call_id).to.equal("30960045-a443-4fcc-9a0c-5935809cb193");

    const joinedCalls = await joinRecords({
      records: calls,
      tableName: "teams",
      joinKey: "team_id",
      joinFields: [{ key: "name", name: "team_name" }],
    });

    expect(joinedCalls).to.have.lengthOf(5);
    expect(joinedCalls[0].team_name).to.equal("Jamnation");

    return Promise.resolve();
  });
});
