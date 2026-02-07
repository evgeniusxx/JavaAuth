import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

export type SwitchProps = React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> & {
  className?: string;
};

export const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitive.Root>, SwitchProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <SwitchPrimitive.Root
        ref={ref}
        className={[
          "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border transition-colors",
          "border-slate-300 bg-slate-200 dark:border-slate-700 dark:bg-slate-800",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 dark:focus-visible:ring-slate-600",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "data-[state=checked]:bg-slate-900 dark:data-[state=checked]:bg-slate-100",
          className,
        ].join(" ")}
        style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={[
            "pointer-events-none block size-5 rounded-full shadow transition-transform",
            "bg-white dark:bg-slate-900",
            "translate-x-0.5 data-[state=checked]:translate-x-[1.375rem]",
          ].join(" ")}
        />
      </SwitchPrimitive.Root>
    );
  }
);

Switch.displayName = "Switch";
