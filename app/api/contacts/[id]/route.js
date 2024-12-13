                                                    // ॥ श्री गणेशाय नमः ॥ 



import Contact from "@/models/contact";
import { connectToDB } from "@/utils/database";

export const GET = async(req, { params }) => {
    const { id } = await params;
    try {
        await connectToDB();
        const contacts = await Contact.find({ creator: id});
        if(!contacts) return new Response("Contact not found", { status: 404 })
        return new Response(JSON.stringify(contacts), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch Contacts", { status: 500 });
    }
}

export const PATCH = async(req, { params }) => {
    const { name, contactnumber } = await req.json();
    const { id } = await params;

    try {
        await connectToDB();
        const existingContact = await Contact.findById(id);
        if(!existingContact) return new Response("Contact not found", { status: 404 });
        existingContact.name = name;
        existingContact.contactnumber = contactnumber;

        await existingContact.save();

        return new Response(JSON.stringify(existingContact), { status: 200 });
    } catch (error) {
        return new Response("Failed to update contact", { status: 500 });
    }
}

export const DELETE = async(req, { params }) => {
    const { id } = await params;
    try {
        // console.log("params", params);
        await connectToDB();
        await Contact.findByIdAndDelete(id);
        return new Response("Contact deleted Successfully", { status: 200 });
    } catch (error) {
        return new Response("Failed to delete contact", { status: 500 });
    }
}