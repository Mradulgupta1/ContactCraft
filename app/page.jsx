                                                    // ॥ श्री गणेशाय नमः ॥ 



"use client"
import ContactCard from "@/components/ContactCard";
import ContactForm from "@/components/ContactForm";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/Context/AppContext";

const ContactCardList = ({data, handleEdit, handleDelete}) => {
	return(
		data.map((contact) => (
			<ContactCard
				key={contact._id}
				contact={contact}
				name={contact.name}
				contactnumber={contact.contactnumber}
				image={contact.image}
				handleEdit={() => handleEdit(contact)}
				handleDelete={() => handleDelete(contact)}
			/>
		))
	)
}

export default function Home() {

	const { data: session } = useSession();
	const [ searchText, setSearchText ] = useState("");
	const [ searchTimeout, setSearchTimeout ] = useState(null);
	const [ searchResult, setSearchResult ] = useState([]);
	const [ contactModal, setContactModal ] = useState(false);
	const [ contact, setContact ] = useState({
		name:"",
		contactnumber:"",
		id:"",
	});
	const { fetchContacts, contactData, setContactData } = useContext(AppContext);

	const filterContacts = (searchText) => {
		const regex = new RegExp(searchText, "i");
		return contactData.filter((item) => 
			regex.test(item.name) ||
			regex.test(item.contactnumber)
		);
	}

	const handleSearchChange = (e) => {
		clearTimeout(searchTimeout);
		setSearchText(e.target.value);
		setSearchTimeout(
			setTimeout(() => {
				const searchResult = filterContacts(e.target.value);
				setSearchResult(searchResult);
			}, 500)
		)
	}
	
	const handleEdit = async (contact) => {
		setContact({
			name: contact.name,
			contactnumber: contact.contactnumber,
			id: contact._id,
		});
		setContactModal((prev) => !prev);
	}

	const handleSubmit = async(e) => {
		e.preventDefault();
		console.log("Contact", contact);
		try {
			const response = await fetch(`/api/contacts/${contact.id}`,
				{ method: "PATCH",
					body: JSON.stringify({
						name: contact.name,
						contactnumber: contact.contactnumber,
					})
				}
			)
			if(response.ok){
				console.log("Contact Updates successfully");
				setContactData((prev) => !prev);
				setContact({
					name: "",
					contactnumber: "",
				});
				fetchContacts();
			}
		} catch (error) {
			console.log(error);
		}
	}

	const handleDelete = async (contact) => {
		const hasConfirmed = confirm("Are you sure you want to delete this Contact?");
		if(hasConfirmed){
			try {
				await fetch(`/api/contacts/${contact._id}`, { method: "DELETE" });
				fetchContacts();
			} catch (error) {
				console.log(error);
			}
		}

	}

	useEffect(() => {
		if(session?.user) fetchContacts();
	},[session?.user]);

	return (
		<>
			{
				(session?.user) && (
					<section className="mt-12 mx-auto my-4 w-full max-w-7xl flex justify-center items-center flex-col gap-2">
						<form className="relative w-full">
							<input 
								type="text"
								placeholder="Search for a contact by name or number"
								value={searchText}
								onChange={handleSearchChange}
								className="block w-full rounded-md border border-gray-200 bg-white py-2.5 font-satoshi pl-5 pr-12 text-sm shadow-lg font-medium focus:border-black focus:outline-none focus:ring-0"
							>
							</input>
						</form>

						<div className="mx-auto w-full max-w-7xl flex justify-center rounded-lg">
							<ul className="w-full mx-auto mt-4 flex justify-between">
								<li className=" border-2 border-black rounded-tl-xl w-full flex justify-center items-center p-3 text-2xl font-semibold">Name</li>
								<li className=" border-y-2 border-black w-full flex justify-center items-center p-3 text-2xl font-semibold">Contact Number</li>
								<li className=" border-2 border-black rounded-tr-xl w-full flex justify-center items-center p-3 text-2xl font-semibold">Action</li>
							</ul>
						</div>

						{
							searchText ? (
								<ContactCardList
									data={searchResult}
									handleEdit={handleEdit}
									handleDelete={handleDelete}
								/>
							) : (
								<ContactCardList
									data={contactData}
									handleEdit={handleEdit}
									handleDelete={handleDelete}
								/>
							)
						}

						{
							contactModal && <ContactForm
								contact={contact}
								setContact={setContact}
								handleSubmit={handleSubmit}
								setContactModal={setContactModal}
								type="Update"
							/>
						}
					</section>
				)
			}
		</>	
	)
}