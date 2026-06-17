import { Path, UseFormRegister } from "react-hook-form";
import { LoginFormValues } from "../login/types";
import { signUpFormValues } from "../signup/types";

type AuthFormValues = LoginFormValues | signUpFormValues;
type AuthFieldName = keyof signUpFormValues;

type Props<T extends AuthFormValues> = {
  type: string;
  placeHolder: string;
  register: UseFormRegister<T>;
  name: Extract<keyof T, AuthFieldName>;
  password?: string
};
type regexTypes = { email: RegExp, password: RegExp, name: RegExp, confirmPassword: RegExp }

const valuesRegex: regexTypes = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  name: /^[\p{L}\s'-]+$/u,
  confirmPassword:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};

export default function FormInput<T extends AuthFormValues>(props: Props<T>) {
  if (props.name !== 'confirmPassword') {
    return (
      <input
        type={props.type}
        placeholder={props.placeHolder}
        {...props.register(props.name as unknown as Path<T>, {
          required: { value: true, message: `${props.name} is required` },
          validate: (value) =>
            valuesRegex[props.name as AuthFieldName].test(value) ||
             'invalid'
          ,
        })}
        className="w-full pl-4 placeholder:b-40 border-b border-[#b9bbbc] appearance-none focus:ring-0 focus:outline-0 sm:max-w-md"
      />
    );
  }
  return (
    <input
      type={props.type}
      placeholder={props.placeHolder}
      {...props.register(props.name as unknown as Path<T>, {
        required: { value: true, message: `Confirm password is required` },
        validate: (value) =>
          value === props.password ||
          `Passwords dont match`,
      })}
      className="w-full pl-4 placeholder:b-40 border-b border-[#b9bbbc] appearance-none focus:ring-0 focus:outline-0 sm:max-w-md"
    />
  );
}
