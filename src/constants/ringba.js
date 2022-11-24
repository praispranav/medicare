import { useEffect, useState } from "react";

export const GENERATOR_QUERY = "generator";

export const RINGBA_SCRIPT_ID = "rgba_script"

const RINGBA_COM_TAGS = [
  {
    key: "JSbfbe6e3aef084885af8a574bec4f8d45",
    user: "internal1",
    number: "1-866-790-0241",
  },
];

export function useRingbaUser(hist) {
  const [generator, setGenerator] = useState("");
  const activeUserKeyObj = RINGBA_COM_TAGS.find((i) => i.user === generator);

  useEffect(() => {
    setGenerator(hist.get(GENERATOR_QUERY));
  }, [hist && hist.get(GENERATOR_QUERY)]);

  if (activeUserKeyObj) return activeUserKeyObj;
  else return { key: "", user: "", number: "" };
}
