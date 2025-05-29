import mongoose, { Document,Schema } from "mongoose";

export interface Resource extends Document {
    name: string;
    description: string;
    link: string;
    imageUrl : string;
    userId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const ResourceSchema = new Schema<Resource>(
    {
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength:20,
        },
        description: {
            type: String,
            required: true,
            minlength: 3,
            maxlength:50,
        },
        link: {
            type: String,
        },
        imageUrl: {
            type: String,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps:true }
);

const ResourceModel = mongoose.model<Resource>("Resource", ResourceSchema);

export default ResourceModel;
