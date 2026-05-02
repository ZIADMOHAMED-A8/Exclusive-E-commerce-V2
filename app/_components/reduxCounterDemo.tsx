"use client";

import { counterActions, useAppDispatch, useAppSelector } from "@/store";

export default function ReduxCounterDemo() {
  const value = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center gap-3">
      <span>Redux: {value}</span>
      <button
        className="px-2 py-1 rounded border"
        onClick={() => dispatch(counterActions.decrement())}
      >
        -
      </button>
      <button
        className="px-2 py-1 rounded border"
        onClick={() => dispatch(counterActions.increment())}
      >
        +
      </button>
    </div>
  );
}

