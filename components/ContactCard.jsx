                                                    // ॥ श्री गणेशाय नमः ॥ 



import Image from "next/image"

const ContactCard = ({ name, contactnumber, image, handleEdit, handleDelete, contact}) => {

	return (
		<ul className="w-full mx-auto max-w-7xl flex justify-between">
			<li className="w-full max-w-full border-2 border-black flex justify-center items-center p-3">
				<Image
					src={image}
					alt="user_img"
					width={60}
					height={60}
					className="rounded-full max-w-1/4 flex justify-center items-center"
				/>
				<p className="w-3/4 max-w-3/4 flex justify-center items-center text-xl">{name}</p>
			</li>
			<li className="w-full border-y-2 border-black flex justify-center items-center p-3 text-xl">
				{contactnumber}
			</li>
			<li className="w-full border-2 border-black flex gap-6 justify-center items-center p-3">
				
				<button onClick={() => handleEdit(contact)}>
					<Image
						src={'/assets/icons/edit_icon.svg'}
						alt="edit_icon"
						width={40}
						height={40}
						className="rounded-lg hover:scale-125 transition-all"
					/>
				</button>

				<button onClick={() => handleDelete(contact)}>
					<Image
						src={'/assets/icons/delete_icon.svg'}
						alt="delete_icon"
						width={40}
						height={40}
						className="rounded-lg hover:scale-125 transition-all"
					/>
				</button>

			</li>
		</ul>
	)
}

export default ContactCard
