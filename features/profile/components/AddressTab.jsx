import { MapPin, Globe, Building2, User } from "lucide-react";
import { Card, SectionTitle, InfoRow } from "./UI";

export default function AddressTab({ user }) {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      <Card>
        <SectionTitle label="Home address" />
        <InfoRow icon={MapPin} label="Address" value={user.address.address} />
        <InfoRow icon={MapPin} label="City" value={user.address.city} />
        <InfoRow icon={MapPin} label="State" value={`${user.address.state} (${user.address.stateCode})`} />
        <InfoRow icon={MapPin} label="Postal code" value={user.address.postalCode} />
        <InfoRow icon={Globe} label="Country" value={user.address.country} />
      </Card>

      <Card>
        <SectionTitle label="Workplace" />
        <InfoRow icon={Building2} label="Company" value={user.company.name} />
        <InfoRow icon={Building2} label="Department" value={user.company.department} />
        <InfoRow icon={User} label="Title" value={user.company.title} />
        <InfoRow
          icon={MapPin}
          label="Company address"
          value={`${user.company.address.address}, ${user.company.address.city}`}
        />
        <InfoRow icon={Globe} label="Country" value={user.company.address.country} />
      </Card>
    </div>
  );
}
