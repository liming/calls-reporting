import { useQuery } from "react-query";
import axios from "axios";

export default function useCalls({ start = 0, limit = 30, filter = {} }) {
  const fetch = () => {
    return axios
      .get("http://127.0.0.1:8000/calls")
      .then((response) => response.data);
  };

  return useQuery(`answers-${start}-${limit}-${JSON.stringify(filter)}`, fetch);
}
