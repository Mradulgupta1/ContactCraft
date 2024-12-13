                                                    // ॥ श्री गणेशाय नमः ॥ 



import Contact from "@/models/contact";
import { connectToDB } from "@/utils/database";

export const POST = async(req) => {
    const { userId, name, contactnumber } = await req.json();

    try {
        await connectToDB();
        const newContact = new Contact({
            creator: userId,
            name: name,
            contactnumber: contactnumber,
            image: `https://api.dicebear.com/9.x/initials/svg?seed=${name}`,
        })
        await newContact.save();
        return new Response(JSON.stringify(newContact), { status: 201 });
    } catch (error) {
        console.log(error);
        return new Response("Failed to create contact", { status: 500 });
    }
}