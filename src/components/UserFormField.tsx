import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { type User } from "@/types/user-schema.types";

interface UserFormFieldProps<TFieldValues extends FieldValues = User> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
}

export function UserFormField<TFieldValues extends FieldValues = User>({
  control,
  name,
  label,
  placeholder,
}: UserFormFieldProps<TFieldValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-gray-700">{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              value={(field.value as string) ?? ""}
              placeholder={placeholder}
              className="bg-white border-gray-300 text-gray-900"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
