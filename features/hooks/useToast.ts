import toast, { ToastOptions } from "react-hot-toast";

const baseStyle: ToastOptions = {
  duration: 4000,
  style: {
    background: "#fff",
    color: "#111827",
    border: "1px solid #f1f5f9",
    borderLeft: "5px solid #db4444",
    padding: "16px",
    minWidth: "320px",
    fontSize: "15px",
    fontWeight: "500",
    borderRadius: "14px",
    boxShadow:
      "0 10px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.08)",
  },
};

export default function useToast() {
  return {
    success: (message: string) =>
      toast.success(message, {
        ...baseStyle,
        iconTheme: {
          primary: "#db4444",
          secondary: "#fff",
        },
      }),

    error: (message: string) =>
      toast.error(message, {
        ...baseStyle,
        iconTheme: {
          primary: "#dc2626",
          secondary: "#fff",
        },
      }),

    loading: (message: string) =>
      toast.loading(message, {
        ...baseStyle,
      }),
  };
}