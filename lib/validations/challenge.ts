import * as z from "zod";

export const challengeFormSchema = z.object({
  name: z
    .string()
    .min(12, { message: "Challenge title should be minimum 12 characters" }),
  description: z
    .string()
    .min(12, { message: "Description should be minimum 60 characters." }),
  start_date: z.date(),
  end_date: z.date(),
});