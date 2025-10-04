import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Button from "./Button";

function NoResult({
  title = "No Products Found",
  message = "We couldn't find any products matching your search or filters. Please try again.",
  actions,
}) {
  return (
    <div className="col-span-full flex h-full min-h-[40vh] flex-col items-center justify-center rounded-lg bg-gray-50 p-8 text-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-200">
        <MagnifyingGlassIcon className="h-12 w-12 text-gray-400" />
      </div>
      <h2 className="mt-6 text-2xl font-bold text-gray-800">{title}</h2>
      <p className="mt-2 max-w-md text-gray-500">{message}</p>

      {actions && actions.length > 0 && (
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              onClick={action.onClick}
              variant={action.variant || "primary"}
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

export default NoResult;
