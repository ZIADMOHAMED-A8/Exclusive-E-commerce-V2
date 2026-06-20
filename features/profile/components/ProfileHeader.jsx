import { Mail, Phone, MapPin } from "lucide-react";
import { Card } from "./UI";

export default function ProfileHeader({ user }) {
  
  return (
    <Card className="mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
      <img
        src={user.image}
        alt={user.firstName}
        className="w-24 h-24 rounded-full border border-gray-200 object-cover"
      />
      <div className="flex-1 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center sm:justify-start">
          <h2 className="text-xl font-bold text-gray-900">
            {user.firstName} {user.lastName}
          </h2>
          <span className="inline-block w-fit mx-auto sm:mx-0 text-xs font-semibold px-2 py-0.5 rounded-full bg-red-50 text-red-600 capitalize">
            {user.role}
          </span>
        </div>
        <p className="text-gray-500 text-sm mt-1">@{user.username}</p>
        <p className="text-gray-500 text-sm">
          {user.company.title} — {user.company.name}
        </p>

        <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-4 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <Mail size={14} /> {user.email}
          </span>
          <span className="flex items-center gap-1.5">
            <Phone size={14} /> {user.phone}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={14} /> {user.address.city}, {user.address.country}
          </span>
        </div>
      </div>
    </Card>
  );
}
