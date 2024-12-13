                                                    // ॥ श्री गणेशाय नमः ॥ 



import Nav from "@/components/nav";
import Provider from "@/components/Provider";
import "../styles/globals.css"
import AppContextProvider from "@/Context/AppContext";

export const metadata = {
	title: "Contact Management App",
	description: "Save, Edit, Delete your Contacts",
};

const RootLayout = ({ children }) => {
	return (
		<html lang="en">
			<body>
				<Provider>
					<AppContextProvider>
						<Nav />
						{ children }
					</AppContextProvider>
						
				</Provider>
			</body>
		</html>
	);
}

export default RootLayout;