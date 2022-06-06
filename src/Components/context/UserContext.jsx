import { createContext, useEffect, useState } from "react";

const UserContext = createContext({});

const UserProvider = ({children}) => {
    const [client, setClient] = useState({})  
    
    useEffect(() => {
      setClient({
          client_id: localStorage.getItem('client_id'),
          name: localStorage.getItem('name'),
          last_name: localStorage.getItem('last_name'),
          username: localStorage.getItem('username'),
          
        })
        console.log("desde el context -> " + JSON.stringify(client));
    
    }, [])
    
  
    return (<UserContext.Provider value={{client, setClient}}>{children}</UserContext.Provider>)


}

export {UserContext};
export default UserProvider;


        
   
    
      