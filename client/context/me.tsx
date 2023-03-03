import { createContext, ReactNode, useContext } from "react";
import { useQuery, RefetchOptions, RefetchQueryFilters } from "react-query"; 
import { Me, QueryKeys } from "../types"; 
import { getMe } from "../api";
import { Loader } from "tabler-icons-react";

const MeContext = createContext<{
    user: Me;
    refetch: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) |
            undefined
            ) => any
}>(null)

function MeContextProvider({children}:{children: ReactNode}) {
    const { data, isLoading, refetch } = useQuery(QueryKeys.me,
        getMe);
    
    return (
      <MeContext.Provider value={{ user: data, refetch }}>
           {isLoading ? <Loader /> : children}
      </MeContext.Provider>
    )
}

const useMe = () => useContext(MeContext);

export { MeContextProvider, useMe }; 

