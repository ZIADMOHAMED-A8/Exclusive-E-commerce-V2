import { UseFormRegister } from "react-hook-form";
import { LoginFormValues } from "../login/types";
import { signUpFormValues } from "../signup/types";

type Props = {
  type: string;
  placeHolder: string;
  register: UseFormRegister<signUpFormValues>;
  name: 'email' | 'password' | 'name' | 'confirmPassword';
  password: string | undefined
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

export default function FormInput(props: Props) {
  if (props.name !== 'confirmPassword') {
    return (
      <input
        type={props.type}
        placeholder={props.placeHolder}
        {...props.register(props.name, {
          required: { value: true, message: `${props.name} is required` },
          validate: (value) =>
            valuesRegex[props.name].test(value) ||
              props.name === 'email' ? `Invalid ${props.name} format` : 'Password Should Contain only Uppercase and lowercase letters,a number and a special symbol at least'
          ,
        })}
        className="w-1/2 pl-4 placeholder:b-40  border-b border-[#b9bbbc] appearance-none focus:ring-0 focus:outline-0 "
      />
    );
  }
  return (
    <input
      type={props.type}
      placeholder={props.placeHolder}
      {...props.register(props.name, {
        required: { value: true, message: `Confirm password is required` },
        validate: (value) =>
          value === props.password ||
          `Passwords dont match`,
      })}
      className="w-1/2 pl-4 placeholder:b-40  border-b border-[#b9bbbc] appearance-none focus:ring-0 focus:outline-0 "
    />
  );
}
