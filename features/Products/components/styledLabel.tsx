import { PropsWithChildren } from "react";

export default function StyledLabel({ children }: PropsWithChildren<{

}>) {
    return (
        <div className="border-l-16 rounded-l font-bold text-[#db4444] py-2 border-l-[#db4444] pl-2">
            {children}
        </div>
    )
}