export default function NoDataFound({ title }) {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen w-full">
      <div className="flex flex-col items-center justify-center">
        <span className="mt-4 text-lg font-semibold text-gray-900">
          <span>This page coming soon...</span>
          No {title} found
        </span>
      </div>
    </div>
  );
}
