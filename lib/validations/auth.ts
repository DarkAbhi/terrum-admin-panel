import * as z from "zod";

export const userAuthSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {message: "Enter a valid password"}),
});
