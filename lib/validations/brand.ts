import * as z from "zod";

export const createBrandSchema = z.object({
  name: z.string().min(2, { message: "Brand name is minimum 2 characters" }),
  website: z.string().url({ message: "Enter a valid URL" }),
});
