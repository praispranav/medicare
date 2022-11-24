import React, { useState } from "react";
import { sessionStorageKeys } from "../constants/localStorage";

export function useDataLayer() {
  const [last] = useState(3);

  const set = (key, value) => {
    const oldData = sessionStorage.getItem(sessionStorageKeys.dataLayer);
    if (oldData) {
      const parsed = JSON.parse(oldData);
      parsed[key] = value;
      sessionStorage.setItem(
        sessionStorageKeys.dataLayer,
        JSON.stringify(parsed)
      );
      window.dataLayer[last] = parsed;
    } else {
      const obj = {};
      obj[key] = value;
      sessionStorage.setItem(sessionStorageKeys.dataLayer, JSON.stringify(obj));
      window.dataLayer[last] = obj;
    }
  };

  const getAndSetFromSession = (values) => {
    window.dataLayer[last] = values;
  };

  const update = () =>{
    const result = sessionStorage.getItem(sessionStorageKeys.dataLayer);
    if(result) getAndSetFromSession(JSON.parse(result));
  }

  const get = () => {
    const result = sessionStorage.getItem(sessionStorageKeys.dataLayer);
    if (result) return JSON.parse(result);
    else return null;
  };

  return {
    get,
    set,
    update,
    getAndSetFromSession,
  };
}
