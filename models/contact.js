                                                    // ॥ श्री गणेशाय नमः ॥ 



import { Schema, model, models } from "mongoose";

const contactSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    name: {
        type: String,
        trim: true,
        required: [true, "Name is required!"],
    },
    contactnumber: {
        type: Number,
        trim: true,
        required: [true, "Contact number is required!"],
    },
    image: {
        type: String,
    },
})

const Contact = models.Contact || model("Contact", contactSchema);

export default Contact;