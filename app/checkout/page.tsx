
"use client"
import PaymentMethod from "@/features/checkout/components/paymentMethod";
import AddressForm from "@/features/checkout/components/addressForm";
import { FormProvider, useForm } from "react-hook-form";
import useToast from "@/features/hooks/useToast";
import { useRouter } from "next/navigation";
import UseGetCartItems from "@/features/cart/hooks/useGetCartItems";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/slices/cartSlice";

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
    const { data: cart, isLoading } = UseGetCartItems()
    const dispatch=useDispatch()
    const toast = useToast()
    const router = useRouter()
    const methods = useForm<CheckoutForm>();
    async function onSubmit() {
        await new Promise((res) => setTimeout(() => {
            res('')
        }, 1000))
        toast.success('Paid Successfully')
        dispatch(cartActions.clearCart())
        setTimeout(() => {
            router.push('/')
        }, 2000);
    }
    if (!isLoading) {
        return (
            <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-8">
                <FormProvider {...methods}>
                    <form
                        onSubmit={methods.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <PaymentMethod price={cart.total.toFixed(2) || 0} />
                        <AddressForm />
                        <button disabled={methods.formState.isSubmitting} type="submit" className="w-full p-4 bg-[#db4444] cursor-pointer capitalize font-bold text-white rounded-2xl">{methods.formState.isSubmitting ? "loading..." : "place order"}</button>
                    </form>
                </FormProvider>
            </div>
        );
    }
}
