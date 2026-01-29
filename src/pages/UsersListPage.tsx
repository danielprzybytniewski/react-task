import { useUsers } from "@/hooks/useUsers";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UsersListPage() {
  const { users, loading, deleteUser } = useUsers();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredUsers = users
    .filter((user) =>
      `${user.address.street} ${user.address.city}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name),
    );

  if (loading)
    return <p className="p-8 text-center text-gray-600">Loading users...</p>;

  return (
    <div className="p-8 space-y-4">
      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="Search by address (street, city)"
            className="pl-2 bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          onClick={() =>
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
          }
          className="bg-white border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:cursor-pointer transition-colors"
        >
          Sort by name
          <ArrowUpDown className="ml-2 h-4 w-4 " />
        </Button>
      </div>
      <div className="border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow className="border-gray-200 hover:bg-gray-100">
              <TableHead className="text-gray-700">Full Name</TableHead>
              <TableHead className="text-gray-700">Email</TableHead>
              <TableHead className="text-gray-700">Full Address</TableHead>
              <TableHead className="text-right text-gray-700">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow
                key={user.id}
                className="border-gray-200 hover:bg-gray-50"
              >
                <TableCell className="font-medium text-gray-900">
                  {user.name}
                </TableCell>
                <TableCell className="text-gray-600">{user.email}</TableCell>
                <TableCell className="text-gray-600">
                  {`${user.address.street}, ${user.address.suite}, ${user.address.city} (${user.address.zipcode})`}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-gray-900 hover:bg-gray-200 hover:cursor-pointer transition-colors"
                    onClick={() => navigate(`/users/${user.id}`)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (user.id) {
                        deleteUser(user.id);
                      }
                    }}
                    className="text-red-600 hover:text-red-700 hover:bg-red-100 hover:cursor-pointer transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
