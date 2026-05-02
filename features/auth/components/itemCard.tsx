import Image from "next/image";
import { PropsWithChildren } from "react";
import { StarsDisplayer } from "@/features/utils/stardDisplayer";
import { Product } from "@/features/types";
import toCurrency from "@/features/utils/toCurrency";
import { useAppDispatch } from "@/store";
import { cartActions } from "@/store/slices/cartSlice";
export default function ItemCard({
  children,
  item,
}: PropsWithChildren<{
  item: Product;
}>) {
  const rating = Number(item.rating ?? 0);
  const safeRating = Number.isFinite(rating) ? rating : 0;
  const dispatch=useAppDispatch()
  
  return (
    <article onClick={()=>{
      dispatch(cartActions.addItem({
        id:item.id
      }))
    }} className="group flex w-56 shrink-0 flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-zinc-50">
        <Image
          alt={item.title}
          src={item.thumbnail}
          fill
          sizes="224px"
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-col gap-1">
        <p className="truncate text-sm font-medium leading-snug text-zinc-900">
          {item.title}
        </p>

        <div className="flex items-center justify-between gap-3">
          <p className="text-base font-semibold text-zinc-900">
            {toCurrency(item.price)}
          </p>

          <div className="flex items-center gap-1 text-xs text-zinc-600">
            <span className="flex items-center gap-0.5">
              <StarsDisplayer num={safeRating} size={16} />
            </span>
            <span className="tabular-nums">({safeRating.toFixed(1)})</span>
          </div>
        </div>
      </div>

      {children ? <div className="pt-1">{children}</div> : null}
    </article>
  );
}
