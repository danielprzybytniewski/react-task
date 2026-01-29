import { useUsers } from "@/hooks/useUsers";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema, type User } from "@/types/user-schema.types";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UserFormField } from "@/components/UserFormField";

export default function AddUserPage() {
  const { addUser } = useUsers();
  const navigate = useNavigate();

  const form = useForm<User>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      phone: "",
      address: { street: "", suite: "", city: "", zipcode: "" },
      company: { name: "", catchPhrase: "", bs: "" },
    },
  });

  const onSubmit = (data: User) => {
    addUser(data);
    navigate("/users");
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <Card className="bg-white border-gray-200 text-gray-900 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-700 text-lg text-center">
            Add User
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <UserFormField
                  control={form.control}
                  name="name"
                  label="Full Name"
                  placeholder="Jan Kowalski"
                />
                <UserFormField
                  control={form.control}
                  name="username"
                  label="Username"
                  placeholder="jankowalski"
                />
                <UserFormField
                  control={form.control}
                  name="email"
                  label="Email"
                  placeholder="jan.kowalski@example.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <UserFormField
                  control={form.control}
                  name="address.street"
                  label="Street"
                  placeholder="ul. Przykładowa 123"
                />
                <UserFormField
                  control={form.control}
                  name="address.suite"
                  label="Suite / Apt / Unit"
                  placeholder="m. 10"
                />
                <UserFormField
                  control={form.control}
                  name="address.city"
                  label="City"
                  placeholder="Radom"
                />
                <UserFormField
                  control={form.control}
                  name="address.zipcode"
                  label="Zip Code"
                  placeholder="00-000"
                />
                <UserFormField
                  control={form.control}
                  name="phone"
                  label="Phone Number"
                  placeholder="123-456-789"
                />
              </div>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <h3 className="text-sm font-medium mb-2 text-gray-500">
                  Company (optional)
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <UserFormField
                    control={form.control}
                    name="company.name"
                    label="Company Name"
                    placeholder="Nazwa Firmy Sp. z o.o."
                  />
                  <UserFormField
                    control={form.control}
                    name="company.catchPhrase"
                    label="Catch Phrase (Company Slogan)"
                    placeholder="Technologia dla wszystkich"
                  />
                  <UserFormField
                    control={form.control}
                    name="company.bs"
                    label="BS (Industry)"
                    placeholder="IT"
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-gray-700 hover:bg-gray-800 hover:cursor-pointer text-white transition-all"
              >
                Add User
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
