import React from "react";
import ReactDOM from "react-dom";
import Report from "../Report";

it("renders without crashing", () => {
  const columns = [{ Header: "Team", accessor: "team_name" }];
  const data = [{ team_name: "team 1" }, { team_name: "team 2" }];

  const div = document.createElement("div");
  ReactDOM.render(
    <Report columns={columns} data={data} fetchData={() => {}} pageCount={1} />,
    div
  );
});
