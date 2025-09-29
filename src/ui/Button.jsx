import { Link } from "react-router";
import { clsx } from "clsx";

const baseStyles =
  "inline-flex items-center justify-center gap-2 font-bold tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variantStyles = {
  primary:
    "bg-[var(--background-btn)] text-white shadow-lg shadow-orange-500/20 hover:bg-amber-500 focus:ring-amber-500",
  secondary:
    "bg-gray-200 text-[var(--textPrimary)] hover:bg-gray-300 focus:ring-gray-400",
  link: "bg-transparent p-0 text-amber-500 underline hover:text-amber-600 focus:ring-amber-500",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-xs rounded-md",
  md: "px-4 py-2 text-sm rounded-lg",
  lg: "px-8 py-3 text-base rounded-full",
};

function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  as,
  ...props
}) {
  const Component = as === "Link" ? Link : as || "button";

  const combinedStyles = clsx(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className,
  );

  return (
    <Component className={combinedStyles} {...props}>
      {children}
    </Component>
  );
}

export default Button;
