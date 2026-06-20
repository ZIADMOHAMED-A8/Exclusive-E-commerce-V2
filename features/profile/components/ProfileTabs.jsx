const TABS = [
  { id: "overview", label: "Overview" },
  { id: "address", label: "Address & company" },
  { id: "payment", label: "Payment" },
  { id: "security", label: "Security" },
];

export default function ProfileTabs({ active, onChange }) {
  return (
    <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
      {TABS.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
            active === t.id
              ? "bg-red-500 text-white"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
