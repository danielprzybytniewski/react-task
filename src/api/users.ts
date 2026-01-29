import axios from "axios";
import {
  type User,
  UsersResponseSchema,
  UserSchema,
} from "@/types/user-schema.types";

const USERS_API_URL = import.meta.env.VITE_USERS_API_URL;

export const fetchUsers = async (): Promise<User[]> => {
  const { data } = await axios.get(USERS_API_URL);

  const result = UsersResponseSchema.safeParse(data);

  if (!result.success) {
    console.error("Validation Error:", result.error.toString());
    throw new Error("Invalid API data");
  }

  return result.data;
};

export const createUser = async (userData: User): Promise<User> => {
  const { data } = await axios.post(USERS_API_URL, userData);

  const result = UserSchema.safeParse(data);

  if (!result.success) {
    console.error("Validation Error:", result.error.toString());
    throw new Error("The server returned an invalid data format");
  }

  return result.data;
};
