import { PropsWithChildren } from "react";

export default function FormButton({ children }: PropsWithChildren) {
  return (
    <button className="w-1/2 h-16 text-white bg-[#db4444]">{children}</button>
  );
}
