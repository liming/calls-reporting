import React, { useCallback, useMemo, useRef, useState } from "react";
import Report from "../components/Report";
import { format, formatDistance } from "date-fns";
import axios from "axios";

const fetch = ({ start, limit, exception = false }) => {
  return axios
    .get(
      `http://127.0.0.1:8000/calls?start=${start}&limit=${limit}&exception=${exception}`
    )
    .then((response) => response.data);
};

export default function Reporting() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [showException, setShowException] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const fetchIdRef = useRef(0);

  const fetchData = useCallback(
    ({ pageSize, pageIndex }) => {
      const fetchId = ++fetchIdRef.current;

      // Set the loading state
      setLoading(true);

      fetch({
        start: pageSize * pageIndex,
        limit: pageSize,
        exception: showException,
      }).then((data) => {
        // Only update the data if this is the latest fetch
        if (fetchId === fetchIdRef.current) {
          setData(data.records);
          setPageCount(Math.ceil(data.total / pageSize));
          setLoading(false);
        }
      });
    },
    [showException]
  );

  const onShowException = () => {
    setShowException(!showException);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Team Name",
        accessor: "team_name", // accessor is the "key" in the data
      },
      {
        Header: "Start At",
        accessor: (d) => {
          return format(new Date(d.started_at), "dd/MM/yyyy HH:mm");
        },
      },
      {
        Header: "Duration",
        accessor: (d) => {
          return formatDistance(0, d.duration, { includeSeconds: true });
        },
      },
      {
        Header: "Participants",
        accessor: (d) => {
          return d.participants.map((p) => p.user_name).join(", ");
        },
      },
    ],
    []
  );

  return (
    <div>
      <button onClick={onShowException}>
        {showException ? "Show All" : "Show Exception"}
      </button>
      <Report
        columns={columns}
        data={data}
        fetchData={fetchData}
        pageCount={pageCount}
      />
      {loading ? <div>Loading......</div> : null}
    </div>
  );
}
