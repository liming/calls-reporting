import React from "react";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import "./App.css";
import Reporting from "./views/Reporting";

const queryCache = new QueryCache({});

export default function App() {
  return (
    <div className="App">
      <ReactQueryCacheProvider queryCache={queryCache}>
        <Reporting />
      </ReactQueryCacheProvider>
    </div>
  );
}
