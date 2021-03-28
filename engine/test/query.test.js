const { expect } = require("chai");
const { findRecords, findRecordByKey } = require("../src");

describe("find records", () => {
  it("should return first 5 calls", (done) => {
    findRecords({ tableName: "calls", start: 0, limit: 5 }).then((result) => {
      expect(result.count).to.equal(2000);
      expect(result.records).to.have.lengthOf(5);
      expect(result.records[0].team_id).to.equal(14);

      done();
    });
  });

  it("should find a call", (done) => {
    findRecordByKey({ tableName: "users", columnName: "user_id", v: 5 }).then(
      (user) => {
        // eslint-disable-next-line no-unused-expressions
        expect(user).to.exist;
        expect(user.user_id).to.equal(5);

        done();
      }
    );
  });

  it("should return all the exceptions", (done) => {
    findRecords({
      tableName: "calls",
      start: 0,
      limit: 5,
      onlyException: true,
      exception: { columnName: "duration", min: 120000 },
    }).then((result) => {
      expect(result.count).to.equal(48);
      expect(result.records).to.have.lengthOf(5);

      done();
    });
  });
});
