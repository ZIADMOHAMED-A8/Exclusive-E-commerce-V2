import { UseFormRegister } from "react-hook-form";
import type { LoginFormValues } from "../types";

type Props = {
  type: string;
  placeHolder: "Password" | "E-mail";
  register: UseFormRegister<LoginFormValues>;
  name: "email" | "password";
};

const valuesRegex = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
} satisfies Record<Props["name"], RegExp>;

export default function FormInput(props: Props) {
  return (
    <input
      type={props.type}
      placeholder={props.placeHolder}
      {...props.register(props.name, {
        required: { value: true, message: `${props.name} is required` },
        validate: (value) =>
          valuesRegex[props.name].test(value) ||
          `Invalid ${props.name} format`,
      })}
      className="w-1/2 pl-4 placeholder:b-40  border-b border-[#b9bbbc] appearance-none focus:ring-0 focus:outline-0 "
    />
  );
}
