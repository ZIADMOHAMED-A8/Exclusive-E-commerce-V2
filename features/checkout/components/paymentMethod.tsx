"use client";

import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

import AddingCardForm from "./addingCardForm";
import { PropsWithChildren } from "react";
import { toexpiry } from "@/features/utils/toExpiryDate";
import { useForm } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import { CheckoutForm } from "@/features/types";


function Heading({ children }: PropsWithChildren) {
    return <h2 className="text-xl font-semibold">{children}</h2>;
}

type PaymentForm = {
    CardNumber: string;
    CVV: string;
    Expiry: string;
};

export default function PaymentMethod({ price }: { price: string }) {
    const {
        watch,
        register,
        reset,
        formState: { errors },
    } = useFormContext<CheckoutForm>();

    function onSubmit(data: PaymentForm) {
        console.log(data);
        reset();
    }

    return (
        <article className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="mb-6">
                <Heading>Payment Information</Heading>

                <p className="text-sm text-gray-500 mt-1">
                    Enter your card details to pay <em className="font-bold  text-black"> {price}$</em>
                </p>
            </div>

            <div className="flex justify-center mb-8">
                <Cards
                    number={watch("CardNumber")}
                    expiry={toexpiry(watch("Expiry"))}
                    cvc={watch("CVV")}
                    name="Ziad"
                />
            </div>

            <AddingCardForm
                register={register}
                // handleSubmit={handleSubmit}
                errors={errors}
                onSubmit={onSubmit}
            />
        </article>
    );
}