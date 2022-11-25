import React from "react";
import { sessionStorageKeys } from "../constants/localStorage";

export function useGeneratorQuery() {
  const set = (key, value) => {
    const result = sessionStorage.getItem(sessionStorageKeys.generator);
    if (result) {
      const parsed = JSON.parse(result);
      parsed[key] = value;
      sessionStorage.setItem(
        sessionStorageKeys.generator,
        JSON.stringify(parsed)
      );
    } else {
      const obj = {};
      obj[key] = value;
      sessionStorage.setItem(sessionStorageKeys.generator, JSON.stringify(obj));
    }
  };
  const get = () => {
    const result = sessionStorage.getItem(sessionStorageKeys.generator);
    if (result) {
      const parsed = JSON.parse(result);
      const entries = Object.entries(parsed);
      let finalQuery = "?";
      entries.forEach((keyValuePair) => {
        finalQuery += keyValuePair[0];
        finalQuery += "=" + keyValuePair[1] + '&';
      });
      return finalQuery
    }
    else return``;
  };
  return { get, set };
}
