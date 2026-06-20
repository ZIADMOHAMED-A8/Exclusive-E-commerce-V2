"use client";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonCard({ rows = 4 }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <Skeleton width={120} height={16} className="mb-4" />
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0"
        >
          <Skeleton width={90} height={14} />
          <Skeleton width={140} height={14} />
        </div>
      ))}
    </div>
  );
}

export default function ProfileSkeleton() {
  return (
    <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-10">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-4">
            <Skeleton width={6} height={20} />
            <Skeleton width={70} height={14} />
          </div>
          <Skeleton width={140} height={32} className="mb-8" />

          {/* Profile header */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Skeleton circle width={96} height={96} />
            <div className="flex-1 w-full text-center sm:text-left">
              <Skeleton width={180} height={20} className="mb-2" />
              <Skeleton width={100} height={14} className="mb-2" />
              <Skeleton width={220} height={14} className="mb-4" />
              <div className="flex flex-wrap justify-center sm:justify-start gap-4">
                <Skeleton width={160} height={14} />
                <Skeleton width={140} height={14} />
                <Skeleton width={150} height={14} />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} width={100} height={36} borderRadius={8} />
            ))}
          </div>

          {/* Cards grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            <SkeletonCard rows={5} />
            <SkeletonCard rows={3} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}