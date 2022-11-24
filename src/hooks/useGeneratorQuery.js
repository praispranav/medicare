import React from "react";
import { sessionStorageKeys } from "../constants/localStorage";

export function useGeneratorQuery() {
  const set = (value) => sessionStorage.setItem(sessionStorageKeys.generatorName, value)
    const get = () =>
    `?generator=${sessionStorage.getItem(sessionStorageKeys.generatorName)}`;
  return { get, set };
}
