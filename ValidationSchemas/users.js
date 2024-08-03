import { z } from "zod";

export const userSchema = z.object({
  Username: z.string().min(3, "Username is required").max(255),
  password: z
    .string()
    
   //zod work from last to now so .min(1, "Password must be at least 1 characters.")
   // work before 
   // .min(6, "Password must be at least 6 characters.")
    .min(6, "Password must be at least 6 characters.")
    .min(1, "Password can not be empty")
    .max(255)
    // .optional()
    // .or(z.literal("")),
  ,role: z.string().min(3, "Role is required.").max(10),
});

