import { useState } from "react";
import axios from "../config";

export default function useAxios(
  url: string,
  method: string,
  data?: any,
  token?: string
) {
  const [response, setResponse] = useState<any>(null);
  const axiosFn = () => {
    switch (method) {
      case "get":
        axios.get(url).then((res) => console.log(res.data));
        break;
      case "post":
        axios
          .post(url, {
            headers: {
              "Content-Type": "application/json",

              Authorization: token ? "Bearer " : "",
            },
            ...data,
          })
          .then((res) => setResponse(res.data));
    }
  };
  return [axiosFn, response];
}
