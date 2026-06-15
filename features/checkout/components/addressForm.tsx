"use client";

import usegetUser from "@/features/auth/user/hooks/getUser";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { CheckoutForm } from "@/features/types";
type AddressData = {
    address: string;
    city: string;
    stateCode: string;
    postalCode: string;
};

export default function AddressForm() {
    const { data, isLoading } = usegetUser();

    const {
        register,
        reset,
        formState:{errors}
    } = useFormContext<CheckoutForm>();

    useEffect(() => {
        if (data?.address) {
            reset({
                address: data.address.address ?? "",
                city: data.address.city ?? "",
                stateCode: data.address.stateCode ?? "",
                postalCode: data.address.postalCode ?? "",
            });
        }
    }, [data, reset]);

    function onSubmit(values: AddressData) {
        console.log(values);
    }

    if (isLoading) {
        return (
            <article className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                Loading...
            </article>
        );
    }

    return (
        <article className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-6">
                Billing Address
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <input
                        {...register("address", {
                            required: "Address is required",
                            minLength: {
                                value: 5,
                                message: "Address is too short",
                            },
                        })}
                        placeholder="Address"
                        className="w-full border border-gray-200 rounded-xl p-3"
                    />

                    {errors.address && (
                        <span className="mt-1 block text-sm text-red-500">
                            {errors.address.message}
                        </span>
                    )}
                </div>

                <div>
                    <input
                        {...register("city", {
                            required: "City is required",
                        })}
                        placeholder="City"
                        className="w-full border border-gray-200 rounded-xl p-3"
                    />

                    {errors.city && (
                        <span className="mt-1 block text-sm text-red-500">
                            {errors.city.message}
                        </span>
                    )}
                </div>

                <div>
                    <input
                        {...register("stateCode", {
                            required: "State is required",
                        })}
                        placeholder="State"
                        className="w-full border border-gray-200 rounded-xl p-3"
                    />

                    {errors.stateCode && (
                        <span className="mt-1 block text-sm text-red-500">
                            {errors.stateCode.message}
                        </span>
                    )}
                </div>

                <div className="md:col-span-2">
                    <input
                        {...register("postalCode", {
                            required: "Postal code is required",
                            pattern: {
                                value: /^\d{5,10}$/,
                                message: "Invalid postal code",
                            },
                        })}
                        placeholder="Postal Code"
                        className="w-full border border-gray-200 rounded-xl p-3"
                    />

                    {errors.postalCode && (
                        <span className="mt-1 block text-sm text-red-500">
                            {errors.postalCode.message}
                        </span>
                    )}
                </div>
            </div>
        </article>
    );
}