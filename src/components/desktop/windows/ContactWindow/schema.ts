import { z } from "zod";

export const contactWindowSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email").min(1, "Email is required"),
    message: z.string().min(1, "Message is required"),
})

export type ContactFormData = z.infer<typeof contactWindowSchema>;