import { useFormContext, Controller } from "react-hook-form";



import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";


interface ITextField {
  name: string;
  size?: "small" | "medium";
  placeholder?: string;
  label?: string;
  required?: boolean;
  fullWidth?: boolean;

  items: string[];
}

const BDSelect = ({ items, name, label }: any) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field ,fieldState: { error } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select Your BloodType" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items.map((n: string) => (
                <SelectItem className="" key={n} value={n}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {error && <FormMessage  className="form-error text-red-500">{error.message}</FormMessage>}
        </FormItem>
      )}
    />
  );
};

export default BDSelect;
