import { CreditCard, Calendar, Wallet, Fingerprint, Network } from "lucide-react";
import { Card, SectionTitle, InfoRow } from "./UI";

export default function PaymentTab({ user }) {
  return (
    <div className="grid sm:grid-cols-2 gap-6">
      <Card>
        <SectionTitle label="Bank details" />
        <InfoRow icon={CreditCard} label="Card type" value={user.bank.cardType} />
        <InfoRow
          icon={CreditCard}
          label="Card number"
          value={user.bank.cardNumber.replace(/(.{4})/g, "$1 ").trim()}
          mono
        />
        <InfoRow icon={Calendar} label="Expires" value={user.bank.cardExpire} mono />
        <InfoRow icon={Wallet} label="Currency" value={user.bank.currency} />
        <InfoRow icon={Fingerprint} label="IBAN" value={user.bank.iban} mono />
      </Card>

      <Card>
        <SectionTitle label="Crypto wallet" />
        <InfoRow icon={Wallet} label="Coin" value={user.crypto.coin} />
        <InfoRow icon={Network} label="Network" value={user.crypto.network} />
        <InfoRow
          icon={Fingerprint}
          label="Wallet"
          value={`${user.crypto.wallet.slice(0, 10)}...${user.crypto.wallet.slice(-6)}`}
          mono
        />
      </Card>
    </div>
  );
}
