"use client"
import { useState } from "react";
import ProfileHeader from "@/features/profile/components/ProfileHeader";
import ProfileTabs from "@/features/profile/components/ProfileTabs";
import OverviewTab from "@/features/profile/components/OverviewTab";
import AddressTab from "@/features/profile/components/AddressTab";
import PaymentTab from "@/features/profile/components/PaymentTab";
import SecurityTab from "@/features/profile/components/SecurityTab";
import usegetUser from "@/features/auth/user/hooks/getUser";
import ProfileSkeleton from "@/features/profile/components/ProfileSkeleton";
export default function UserProfilePage() {
  const { data, isLoading, error } = usegetUser();
  const [tab, setTab] = useState("overview");

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (error || !data) {
    return <div className="min-h-screen flex items-center justify-center text-gray-400">Couldn't load profile.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1.5 h-5 bg-red-500 rounded-sm" />
          <span className="text-red-500 font-semibold text-sm">My account</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile</h1>

        <ProfileHeader user={data} />
        <ProfileTabs active={tab} onChange={setTab} />

        {tab === "overview" && <OverviewTab user={data} />}
        {tab === "address" && <AddressTab user={data} />}
        {tab === "payment" && <PaymentTab user={data} />}
        {tab === "security" && <SecurityTab user={data} />}
      </div>
    </div>
  );
}