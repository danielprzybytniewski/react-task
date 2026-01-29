import { createContext, useState, useEffect, type ReactNode } from "react";
import type { User } from "@/types/user-schema.types";
import { fetchUsers, createUser } from "@/api/users";
import { toast } from "sonner";
interface UsersContextType {
  users: User[];
  loading: boolean;
  addUser: (user: User) => void;
  deleteUser: (id: number) => void;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export function UsersProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const validatedUsers = await fetchUsers();
        setUsers(validatedUsers);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  const addUser = async (user: User) => {
    try {
      const createdUser = await createUser(user);

      setUsers((prev) => [{ ...createdUser, id: Date.now() }, ...prev]);
    } catch (error) {
      console.error("Error while adding user:", error);
    }
  };

  const deleteUser = (id: number) => {
    const deletedUser = users.find((user) => user.id === id);
    setUsers((prev) => prev.filter((user) => user.id !== id));
    toast.error(`User ${deletedUser?.name} has been deleted`);
  };

  return (
    <UsersContext.Provider value={{ users, loading, addUser, deleteUser }}>
      {children}
    </UsersContext.Provider>
  );
}

export { UsersContext };
