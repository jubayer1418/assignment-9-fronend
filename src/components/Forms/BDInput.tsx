import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input"

import clsx from "clsx";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

type TInputProps = {
  name: string;
  label?: string;
  type?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  className?: string;
  placeholder?: string;
  required?: boolean;
};

const BDInput = ({
  name,
  label,
  type = "text",
  size = "small",
  fullWidth,
  className,
  required,
}: TInputProps) => {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={clsx("form-control", fullWidth && "w-full", className)}>
          {label && (
            <FormLabel
              htmlFor={name}
              className={clsx("form-label", {
                "text-sm": size === "small",
                "text-md": size === "medium",
              })}
            >
              {label}
            </FormLabel>
          )}
         <FormControl>
         <Input
            {...field}
            id={name}
            type={type}
            className={clsx(
              "input",
              {
                "input-sm": size === "small",
                "input-md": size === "medium",
              },
              error && "input-error"
            )}
            placeholder={label}
            required={required}
          />
         </FormControl>
          {error && <FormMessage  className="form-error text-red-500">{error.message}</FormMessage>}
        </FormItem>
      )}
    />
  );
};

export default BDInput;
