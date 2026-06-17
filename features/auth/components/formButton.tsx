import { PropsWithChildren } from "react";

export default function FormButton({ children,isLoading }: PropsWithChildren<{
  isLoading:boolean
}>) {
  if(isLoading){
    return (
          <button disabled className={ "h-16 w-full max-w-md text-white cursor-pointer duration-300 bg-gray-300"}>{children}</button>
    )
  }
  return (
    <button className={ "h-16 w-full max-w-md text-white cursor-pointer bg-[#db4444]"}>{children}</button>
  );
}
