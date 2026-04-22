import { PropsWithChildren } from "react";

export default function FormButton({ children,isLoading }: PropsWithChildren<{
  isLoading:boolean
}>) {
  if(isLoading){
    return (
          <button disabled className={ "w-1/2 h-16 text-white cursor-pointer  duration-300 bg-gray-300"}>{children}</button>
    )
  }
  return (
    <button className={ "w-1/2 h-16 text-white cursor-pointer bg-[#db4444]"}>{children}</button>
  );
}
