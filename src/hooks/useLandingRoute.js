import React from "react";
import { useSearchParams } from "react-router-dom";
import { MODULE_TYPE } from "../constants/moduleType";

export function useLandingRoute(){
    const [search] = useSearchParams();

    if(search.get('type') === MODULE_TYPE.short){
        return "../short"
    }
    if(search.get('type') === MODULE_TYPE.full){
        return '../full'
    }
    if(search.get('type') === MODULE_TYPE.call){
        return '../call'
    }
}

export default useLandingRoute