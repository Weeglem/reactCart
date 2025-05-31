import { createContext, useState } from "react";


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    

    const defaultTemplate = {
        name:null,
        admin:false,
        logged:false,
    }

    const [userData,setUserData] = useState({});
    const[loaded,setLoaded] = useState(false);

    if(!loaded)
    {
        const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : defaultTemplate;
        setUserData(user);
        setLoaded(true);
        console.log("Loaded user")
    }

    
    function logout(){
        setUserData(defaultTemplate)
        localStorage.setItem("user",JSON.stringify(defaultTemplate));
    }

    function login(username,admin = false){
        if(!username || username.length === 0){
            throw("Username cannot be empty!");
        }

        setUserData({logged:true,name:username,admin:false})
        localStorage.setItem("user",JSON.stringify(userData));
    }
    

    return <UserContext.Provider value={{userData,setUserData,login,logout}}>{children}</UserContext.Provider>
}


