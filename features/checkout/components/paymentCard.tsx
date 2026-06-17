import type { LucideIcon } from "lucide-react";

type PaymentCardProps = {
    Icon: LucideIcon;
    label: string;
    desc: string;
    amount: string;
};

export default function PaymentCard({Icon,label,desc,amount}: PaymentCardProps){
    return (
        <>
            <article className="flex-col gap-1 hidden md:flex bg-white items-center rounded-2xl p-4">
                <div className="bg-[#4fd1c5] rounded-xl p-5">
                <Icon size={30} className="text-white  " />
                </div>
                <h1 className=" font-bold text-2xl mt-4">{label}</h1>
                <p className="text-gray-400
                pb-4
                      bg-gradient-to-r from-transparent via-gray-300 to-transparent
      bg-no-repeat
      [background-size:100%_1px]
      [background-position:0_100%]
                ">{desc}</p>
                <p className="text-xl font-bold pt-4 ">{amount}</p>
            </article>
        </>
    )
}
