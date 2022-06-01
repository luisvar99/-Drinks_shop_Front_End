import { createContext, useEffect, useState } from "react";

const UserContext = createContext({});

const UserProvider = ({children}) => {
    const [userData, setUserData] = useState({
        id:'',
        first_name:'',
        last_name:'',
    })

        
    return (<UserContext.Provider value={userData}>{children}</UserContext.Provider>)


}

export {UserContext};
export default UserProvider;


        
   
    
      