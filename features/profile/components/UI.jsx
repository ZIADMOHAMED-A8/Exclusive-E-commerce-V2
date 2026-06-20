export function SectionTitle({ label }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-1.5 h-5 bg-red-500 rounded-sm" />
      <span className="text-red-500 font-semibold text-sm">{label}</span>
    </div>
  );
}

export function InfoRow({ icon: Icon, label, value, mono }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center gap-3 text-gray-500">
        <Icon size={16} className="text-gray-400" />
        <span className="text-sm">{label}</span>
      </div>
      <span
        className={`text-sm font-medium text-gray-900 text-right ${
          mono ? "font-mono tracking-tight" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}

export function Card({ children, className = "" }) {
  return (
    <div className={`bg-white border border-gray-200 rounded-xl p-5 ${className}`}>
      {children}
    </div>
  );
}
