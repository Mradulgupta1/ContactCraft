                                                    // ॥ श्री गणेशाय नमः ॥ 



"use client"


import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect, useContext } from "react"
import Image from "next/image";
import ContactForm from "./ContactForm";
import { AppContext } from "@/Context/AppContext";
import { useRouter } from "next/navigation";
const Nav = () => {

	const router = useRouter();
	const { data: session } = useSession();
    const [ providers, setProviders ] = useState(null);
	const [ contactModal, setContactModal ] = useState(false);
	const [ contact, setContact ] = useState({
		name:"",
		contactnumber:"",
	});
	const { fetchContacts } = useContext(AppContext);

	useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();

            setProviders(response);
        }
        setUpProviders()
    }, [])

	const handleContactSubmit = async(e) => {
		e.preventDefault();
		try {
			const response = await fetch("/api/contacts/new",{
				method: "POST",
				body: JSON.stringify({
					name: contact.name,
					contactnumber: contact.contactnumber,
					userId:session?.user.id
				})
			})

			

			if(response.ok){
				setContactModal((prev) => !prev);
				setContact({
					name:"",
					contactnumber:"",
				})
				
				fetchContacts();
				// console.log("Fetch contact Completed");
				// revalidatePath("/");
				// router.push("/");
			}
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<nav className='max-w-full bg-blue-600 flex justify-around items-center p-3'>
				<div className='font-bold text-4xl flex gap-4'>
					<Image
						src={"/assets/logo/logo.svg"}
						alt="logo"
						width={40}
						height={40}
					/>
					<p className="text-white">ContactCraft</p>
				</div>

				{
					session?.user ? (
						<div className="flex gap-3 md:gap-5">
							<button 
								type="button"
								className="rounded-full border bg-white border-black bg-transparent py-1.5 px-5 text-black transition-all hover:bg-black hover:text-white text-center text-sm font-inter flex items-center justify-center"
								onClick={() => setContactModal((prev) => !prev)}
							>
								Create Contact
							</button>
							<button 
								type="button"
								className="rounded-full border bg-white border-black bg-transparent py-1.5 px-5 text-black transition-all hover:bg-black hover:text-white text-center text-sm font-inter flex items-center justify-center"
								onClick={signOut}
							>
								Sign Out
							</button>
							<Image
								src={session?.user.image}
								alt="user_image"
								width={37}
								height={37}
								className=" rounded-full"
							/>
						</div>
					) : (
						<>
							{
								providers && Object.values(providers).map((provider) => (
									<button
										type="button"
										key={provider.name}
										onClick={() => signIn(provider.id)}
										className="rounded-full border border-black bg-black py-1.5 px-5 text-white transition-all hover:bg-white hover:text-black text-center text-sm font-inter flex items-center justify-center"
									>
										Sign In
									</button>
								))
							}
						</>
					)
				}
				
			</nav>

			{
				contactModal && (
					<ContactForm
						contact={contact}
						setContact={setContact}
						handleSubmit={handleContactSubmit}
						setContactModal={setContactModal}
						type="Create"
					/>
				)
			}
		</>
		
	)
}

export default Nav
