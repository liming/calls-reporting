const chai = require("chai");
const { expect } = chai;
const chaiHttp = require("chai-http");
const server = require("../src");

chai.use(chaiHttp);

describe("Controller Test", () => {
  it("should return valid array", (done) => {
    chai
      .request(server)
      .get("/calls")
      .end((err, res) => {
        if (err) {
          console.error(err);
        }

        expect(res).to.have.status(200);

        done();
      });
  });

  it("should return records from 10 to 20", (done) => {
    chai
      .request(server)
      .get("/calls?start=10&limit=10")
      .end((err, res) => {
        if (err) {
          console.error(err);
        }

        expect(res).to.have.status(200);
        expect(res.body.records).to.have.lengthOf(10);
        done();
      });
  });

  it("should find exception", (done) => {
    chai
      .request(server)
      .get("/calls?start=30&limit=10")
      .end((err, res) => {
        if (err) {
          console.error(err);
        }

        console.log(res.body);

        expect(res).to.have.status(200);
        expect(res.body.records).to.have.lengthOf(10);
        expect(res.body.records[6].alert).to.equal(true);
        done();
      });
  });
});
