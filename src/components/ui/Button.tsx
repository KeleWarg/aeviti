import { ReactNode, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline" | "warm" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  arrow?: boolean;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-terra text-white border-transparent hover:bg-terra-dark",
  secondary: "bg-transparent text-white border-white/20 hover:border-white/40",
  outline: "bg-transparent text-petrol border-petrol hover:bg-petrol/5",
  warm: "bg-sand text-petrol-dark border-transparent hover:bg-sand-dark",
  ghost: "bg-transparent text-warm-gray border-stone hover:border-warm-gray",
};

export function Button({
  variant = "primary",
  arrow,
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
        inline-flex items-center gap-2 font-body text-[15px] font-semibold
        px-[30px] py-3.5 rounded-full border-[1.5px] cursor-pointer
        tracking-[0.01em] transition-all duration-200
        ${variantClasses[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
      {arrow && <span className="text-lg leading-none">→</span>}
    </button>
  );
}
