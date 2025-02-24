export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-gray-200 rounded-lg p-4">
      <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
      <div className="h-10 bg-gray-300 rounded mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </div>
  );
}
