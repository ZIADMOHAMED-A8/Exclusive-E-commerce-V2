
"use client"
import PaymentMethod from "@/features/checkout/components/paymentMethod";
import AddressForm from "@/features/checkout/components/addressForm";
import { FormProvider, useForm } from "react-hook-form";
import useToast from "@/features/hooks/useToast";
import { useRouter } from "next/navigation";

export type CheckoutForm = {
    CardNumber: string;
    CVV: string;
    Expiry: string;
    address: string;
    city: string;
    stateCode: string;
    postalCode: string;
};
export default function Page() {
    const toast=useToast()
    const router=useRouter()
    const methods = useForm<CheckoutForm>();
    console.log(methods)
    async function onSubmit(data: CheckoutForm) {
        await new Promise((res,rej)=>setTimeout(() => {
            res('')
        }, 1000))
        toast.success('Paid Successfully')
        setTimeout(() => {
            router.push('/')
        }, 2000);
        console.log("iss",methods?.formState?.isSubmitting)
    }
    return (
        <div className="mx-16   py-8">
            <FormProvider {...methods}>
                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <PaymentMethod />
                    <AddressForm />
                    <button disabled={methods.formState.isSubmitting} type="submit" className="w-full p-4 bg-[#db4444] cursor-pointer capitalize font-bold text-white rounded-2xl">{methods.formState.isSubmitting ? "loading..." : "place order"}</button>
                </form>
            </FormProvider>
        </div>
    );
}