import { ArrowPathIcon } from "@heroicons/react/24/solid";

function SpinnerFullPage() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm">
      <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white p-4 shadow-lg">
        <ArrowPathIcon className="h-12 w-12 animate-spin text-[var(--primary)]" />
      </div>
    </div>
  );
}

export default SpinnerFullPage;
