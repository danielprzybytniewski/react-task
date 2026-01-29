import { z } from "zod";

export const UserSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(3, "Name must be at least 3 characters long"),
  username: z.string().min(3, "Username is required"),
  email: z.email("Invalid email format"),
  address: z.object({
    street: z.string().min(1, "Street is required"),
    suite: z.string().min(1, "Suite / Apartment is required"),
    city: z.string().min(1, "City is required"),
    zipcode: z
      .string()
      .regex(/^\d{2}-\d{3}$|^\d{5}(-\d{4})?$/, "Invalid postal code"),
  }),
  phone: z.string().min(5, "Phone number is required"),
  website: z.string(),
  company: z
    .object({
      name: z.string().optional(),
      catchPhrase: z.string().optional(),
      bs: z.string().optional(),
    })
    .optional(),
});

export const UsersResponseSchema = z.array(UserSchema);

export type User = z.infer<typeof UserSchema>;
