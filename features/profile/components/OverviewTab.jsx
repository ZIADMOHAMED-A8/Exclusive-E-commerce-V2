import { User, Calendar, Eye, Scissors, Ruler, Weight, Droplet, Mail, Phone, Building2 } from "lucide-react";
import { Card, SectionTitle, InfoRow } from "./UI";

export default function OverviewTab({ user }) {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      <Card>
        <SectionTitle label="Personal info" />
        <InfoRow icon={User} label="Full name" value={`${user.firstName} ${user.maidenName} ${user.lastName}`} />
        <InfoRow icon={Calendar} label="Birth date" value={`${user.birthDate} (${user.age} yrs)`} />
        <InfoRow icon={User} label="Gender" value={user.gender} />
        <InfoRow icon={Eye} label="Eye color" value={user.eyeColor} />
        <InfoRow icon={Scissors} label="Hair" value={`${user.hair.color} - ${user.hair.type}`} />
      </Card>

      <Card>
        <SectionTitle label="Physical attributes" />
        <InfoRow icon={Ruler} label="Height" value={`${user.height} cm`} />
        <InfoRow icon={Weight} label="Weight" value={`${user.weight} kg`} />
        <InfoRow icon={Droplet} label="Blood group" value={user.bloodGroup} />
      </Card>

      <Card className="sm:col-span-2">
        <SectionTitle label="Contact & education" />
        <InfoRow icon={Mail} label="Email" value={user.email} />
        <InfoRow icon={Phone} label="Phone" value={user.phone} mono />
        <InfoRow icon={Building2} label="University" value={user.university} />
      </Card>
    </div>
  );
}
