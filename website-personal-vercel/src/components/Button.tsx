type ButtonBaseProps = {
  variant?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
  children: React.ReactNode;
};

type ButtonProps =
  | (ButtonBaseProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
  | (ButtonBaseProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined });

export function Button({ variant = 'primary', href, className = '', children, ...props }: ButtonProps) {
  const baseClasses = "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 ease-in-out whitespace-nowrap";
  
  const variantClasses = {
    primary: "bg-[#051A24] dark:bg-white text-white dark:text-[#051A24] px-7 py-3 shadow-[0_1px_2px_0_rgba(5,26,36,0.1),0_4px_4px_0_rgba(5,26,36,0.09),0_9px_6px_0_rgba(5,26,36,0.05),0_17px_7px_0_rgba(5,26,36,0.01),0_26px_7px_0_rgba(5,26,36,0),inset_0_2px_8px_0_rgba(255,255,255,0.5)] dark:shadow-none hover:opacity-90",
    secondary: "bg-white dark:bg-[#0D212C] text-[#051A24] dark:text-white px-7 py-3 shadow-[0_0_0_0.5px_rgba(0,0,0,0.05),0_4px_30px_rgba(0,0,0,0.08)] dark:shadow-none dark:border dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10",
    tertiary: "bg-white dark:bg-[#0D212C] text-[#051A24] dark:text-white px-7 py-3 shadow-[0_1px_2px_0_rgba(5,26,36,0.1),0_4px_4px_0_rgba(5,26,36,0.09),0_9px_6px_0_rgba(5,26,36,0.05),0_17px_7px_0_rgba(5,26,36,0.01),0_26px_7px_0_rgba(5,26,36,0),inset_0_2px_8px_0_rgba(255,255,255,0.5)] dark:shadow-none dark:border dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10"
  };

  if (href) {
    return (
      <a
        href={href}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        {...props as React.AnchorHTMLAttributes<HTMLAnchorElement>}
      >
        {children}
      </a>
    );
  }
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props as React.ButtonHTMLAttributes<HTMLButtonElement>}
    >
      {children}
    </button>
  );
}
