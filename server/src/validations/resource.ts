import { z } from "zod";

const createResourceValidation = z.object({
    name: z.string().min(2,"Name must be at least 2 characters"),
    description: z.string().min(10,"Description must be at least 10 characters"),
    link: z.string().url("Invalid link"),
    imageUrl: z.string().url("Invalid image URL"),
});

const updateResourceValidation = z.object({
    _id: z.string().min(2,"Resource ID must be at least 2 characters"),
    name: z.string().min(2,"Name must be at least 2 characters").optional(),
    description: z.string().min(10,"Description must be at least 10 characters").optional(),
    link: z.string().url("Invalid link").optional(),
    imageUrl: z.string().url("Invalid image URL").optional(),
});

export const resourceValidation = {
    create: createResourceValidation,
    update: updateResourceValidation,
}