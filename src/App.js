import { useEffect } from 'react';
import './App.css';
import { AppStart } from './modules/AppStart/AppStart';
import { localStorageKeys } from "./constants/localStorage.ts";
import { v4 as uuid } from 'uuid';

function App() {

  const checkOrCreateVisitorId = () => {
    const localStorageVisitorId = localStorage.getItem(
      localStorageKeys.visitorId
    );
    if (localStorageVisitorId) {
    } else {
      const newVisitorId = uuid();
      localStorage.setItem(localStorageKeys.visitorId, newVisitorId);
    }
  };

  useEffect(()=>{
    checkOrCreateVisitorId();
  },[])

  return (
    <div className="App">
      <AppStart />
    </div>
  );
}

export default App;
