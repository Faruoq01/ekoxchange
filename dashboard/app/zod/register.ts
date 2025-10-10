import { z } from "zod";

export const registrationSchema = z.object({
  firstname: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long." }),
  lastname: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long." }),
  email: z.email({ message: "Invalid email address." }),
  phone: z.string().min(1, "Please enter phone number"),
  gender: z.string().min(1, "Please enter gender"),
  roleIds: z
    .array(z.string())
    .min(1, { message: "Please select at least one role" }),
});

export type RegistrationFormValues = z.infer<typeof registrationSchema>;
