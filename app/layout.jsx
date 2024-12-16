                                                    // ॥ श्री गणेशाय नमः ॥ 



import Provider from "@/components/Provider";
import "../styles/globals.css"
import AppContextProvider from "@/Context/AppContext";
import Nav from "@/components/Nav";

export const metadata = {
	title: "Contact-Craft",
	description: "Save, Edit, Delete your Contacts",
};

const RootLayout = ({ children }) => {
	return (
		<html lang="en">
			<body>
				<Provider>
					<AppContextProvider>
						<Nav/>
						{ children }
					</AppContextProvider>
						
				</Provider>
			</body>
		</html>
	);
}

export default RootLayout;