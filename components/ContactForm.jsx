                                                    // ॥ श्री गणेशाय नमः ॥ 



import { useRef } from 'react';
import  useOnClickOutside from "../utils/clickOutside.js";
import Link from 'next/link';

const ContactForm = ({ contact, setContact, handleSubmit, setContactModal, type }) => {
    console.log("Type", type);
    const ref = useRef();
    useOnClickOutside(ref, () => setContactModal((prev) => !prev));
    return (
        
            <div ref={ref} className='flex flex-col gap-8 mx-auto z-10 justify-between items-center bg-gray-300 w-1/2 rounded-xl fixed top-24 left-[25%]'>
                <h1 className='text-4xl mt-4'> { type } Contact</h1>
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col justify-between items-center gap-4 mb-8'
                >
                    <label className='flex flex-col'>
                        <span className='text-2xl'>Name</span>
                        <input
                            type='text'
                            value={contact.name}
                            onChange={(e) => setContact({...contact, name: e.target.value})}
                            className="block w-full rounded-md border border-gray-200 bg-white py-2.5 font-satoshi pl-5 pr-12 text-sm shadow-lg font-medium focus:border-black focus:outline-none focus:ring-0"
                        />
                    </label>

                    <label className='flex flex-col'>
                        <span className='text-2xl'>Contact Number</span>
                        <input
                            type='number'
                            value={contact.contactnumber}
                            onChange={(e) => setContact({...contact, contactnumber: e.target.value})}
                            className="block w-full rounded-md border border-gray-200 bg-white py-2.5 font-satoshi pl-5 pr-12 text-sm shadow-lg font-medium focus:border-black focus:outline-none focus:ring-0"
                        />
                    </label>
                    
                    <div className='flex gap-8'>
                        <Link href="/" onClick={() => {
                            setContactModal((prev) => !prev);
                            setContact({
                                name:"",
                                contactnumber:"",
                            })
                            }}
                            className='border-2 border-black py-1 px-4 rounded-3xl hover:bg-black hover:text-white'
                            >
                            Cancel
                        </Link>

                        <button 
                            type='submit'
                            className='border-2 border-black py-1 px-4 rounded-3xl hover:bg-black hover:text-white'
                        >
                            { type }
                        </button>
                    </div>
                </form>
            </div>
        
        
    )
}

export default ContactForm
