import { createContext, useEffect, useState } from "react";

const UserContext = createContext({});

const UserProvider = ({children}) => {
    const [client_id, setClient_id] = useState("")    
  
    return (<UserContext.Provider value={{client_id, setClient_id}}>{children}</UserContext.Provider>)


}

export {UserContext};
export default UserProvider;


        
   
    
      