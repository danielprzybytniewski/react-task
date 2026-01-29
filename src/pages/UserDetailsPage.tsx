import { useParams, useNavigate } from "react-router-dom";
import { useUsers } from "@/hooks/useUsers";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2 } from "lucide-react";

export default function UserDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, loading, deleteUser } = useUsers();

  if (loading)
    return (
      <p className="p-8 text-center text-gray-600">Loading user details...</p>
    );

  const user = users.find((user) => user.id === Number(id));

  const handleDelete = () => {
    if (user?.id) {
      deleteUser(user.id);
      navigate("/");
    }
  };

  if (!user) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600 mb-4">User not found</p>
        <Button
          onClick={() => navigate("/users")}
          variant="outline"
          className="text-gray-700 text-md border-gray-200 hover:bg-gray-300 hover:cursor-pointer"
        >
          <ArrowLeft className="mr-2 h-5 w-5" /> Back to users list
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-4">
      <Button
        variant="outline"
        onClick={() => navigate("/users")}
        className="mb-4 text-gray-700 text-md hover:bg-gray-200 hover:text-gray-900 pl-0 hover:cursor-pointer"
      >
        <ArrowLeft className="mr-2 h-5 w-5" /> Back to users list
      </Button>
      <Card className="bg-white border-gray-200 text-gray-900 shadow-sm">
        <CardHeader className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl text-gray-700">
              {user.name}
            </CardTitle>
            <p className="text-gray-500">{user.username}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="text-red-600 hover:text-red-700 hover:bg-red-100 hover:cursor-pointer transition-colors"
          >
            <Trash2 className="h-4 w-4" />{" "}
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-1">
                Contact Data
              </h3>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone Number:</strong> {user.phone}
              </p>
              {user.website && (
                <p>
                  <strong>Website:</strong> {user.website}
                </p>
              )}
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-1">
                Address
              </h3>
              <p>
                {user.address.street} {user.address.suite}
              </p>
              <p>
                {user.address.zipcode} {user.address.city}
              </p>
            </div>
          </div>
          {user.company?.name && (
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Company
              </h3>
              <p className="text-md">{user.company.name}</p>
              {user.company.catchPhrase && (
                <p className="text-sm italic text-gray-600">
                  "{user.company.catchPhrase}"
                </p>
              )}
              {user.company.bs && (
                <p className="text-sm text-gray-500">{user.company.bs}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
