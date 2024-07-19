import { createContext, useState } from "react";

const AppContext = createContext(null);

const AppProvider = (children) => {
    const [login, SetLogin] = useState(true);

    const value = {
        login, SetLogin
    }

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export {AppProvider, AppContext}