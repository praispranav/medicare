import { useEffect, useState } from "react";
import { useGeneratorQuery } from "./useGeneratorQuery";
import { useLandingRoute } from "./useLandingRoute";

export function useLanderPageQueries(){
    const generatorQuery = useGeneratorQuery();
    const landingRoute = useLandingRoute()
    const [redirect, setRedirect] = useState({ pathname: "" });
  
    useEffect(() => {
      if (generatorQuery.get().length > 3) {
        setRedirect({
          pathname: landingRoute,
          search: generatorQuery.get(),
          options: {
            replace: true,
          },
        });
      }
    }, [generatorQuery.get()]);

    return { redirect }
}