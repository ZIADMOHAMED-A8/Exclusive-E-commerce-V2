import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

type PaymentForm = {
  CardNumber: string;
  CVV: string;
  Expiry: string;
};

type AddingCardFormProps = {
  errors: FieldErrors<PaymentForm>;
  // handleSubmit: UseFormHandleSubmit<PaymentForm>;
  register: UseFormRegister<PaymentForm>;
  onSubmit: (data: PaymentForm) => void;
};

export default function AddingCardForm({
  errors,
  // handleSubmit,
  register,
  onSubmit,
}: AddingCardFormProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        <input
          type="number"
          inputMode="numeric"
          placeholder="Card Number"
          className="
            w-full
            h-14
            rounded-xl
            border
            border-gray-200
            px-4
            transition
            focus:outline-none
            focus:ring-2
            focus:ring-black/20
            focus:border-black
          "
          {...register("CardNumber", {
            required: "Card number is required",
            pattern: {
              value:
                /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|2[2-7][0-9]{14}|6(?:011|5[0-9]{2})[0-9]{12}|3[47][0-9]{13})$/,
              message: "Invalid Card Number",
            },
          })}
        />

        {errors.CardNumber && (
          <span className="mt-1 block text-sm text-red-500">
            {errors.CardNumber.message}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            type="number"
            inputMode="numeric"
            placeholder="CVV"
            className="
              w-full
              h-14
              rounded-xl
              border
              border-gray-200
              px-4
              transition
              focus:outline-none
              focus:ring-2
              focus:ring-black/20
              focus:border-black
            "

            {...register("CVV", {
              required: "CVV is required",
              minLength: {
                value: 3,
                message: "CVV must be 3 digits",
              },
              maxLength: {
                value: 3,
                message: "CVV must be 3 digits",
              },
            })}
          />

          {errors.CVV && (
            <span className="mt-1 block text-sm text-red-500">
              {errors.CVV.message}
            </span>
          )}
        </div>

        <div>
          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            className="
              w-full
              h-14
              rounded-xl
              border
              border-gray-200
              px-4
              transition
              focus:outline-none
              focus:ring-2
              focus:ring-black/20
              focus:border-black
            "
            {...register("Expiry", {
              required: "Expiry is required",
            })}
          />

          {errors.Expiry && (
            <span className="mt-1 block text-sm text-red-500">
              {errors.Expiry.message}
            </span>
          )}
        </div>
      </div>
    </div>

  );
}