                                                    // ॥ श्री गणेशाय नमः ॥ 



"use client"

import { useSession } from "next-auth/react";
import { createContext, useState } from "react";

export const AppContext = createContext();

function AppContextProvider({children}){

    const { data: session } = useSession();
	const [ contactData, setContactData ] = useState([]);

    const fetchContacts = async () => {
		const response = await fetch(`/api/contacts/${session?.user.id}`);
		const data = await response.json();
        const sortedData = data.sort((a,b) => a.name.localeCompare(b.name));
		// console.log("Data", data);
		setContactData(sortedData);
	}

    const value = {
        contactData,
        setContactData,
        fetchContacts
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>

}

export default AppContextProvider;