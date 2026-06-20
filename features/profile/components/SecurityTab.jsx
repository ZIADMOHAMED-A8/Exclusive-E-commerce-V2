import { User, ShieldCheck, Fingerprint, Globe, Network } from "lucide-react";
import { Card, SectionTitle, InfoRow } from "./UI";

export default function SecurityTab({ user }) {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      <Card>
        <SectionTitle label="Account info" />
        <InfoRow icon={User} label="Username" value={user.username} />
        <InfoRow icon={ShieldCheck} label="Role" value={user.role} />
        <InfoRow icon={Fingerprint} label="EIN" value={user.ein} mono />
        <InfoRow icon={Fingerprint} label="SSN" value={user.ssn} mono />
      </Card>

      <Card>
        <SectionTitle label="Network" />
        <InfoRow icon={Globe} label="IP address" value={user.ip} mono />
        <InfoRow icon={Network} label="MAC address" value={user.macAddress} mono />
      </Card>
    </div>
  );
}
