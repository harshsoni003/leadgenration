import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  variant?: "default" | "success" | "primary" | "neutral";
  subtitle?: string;
  className?: string;
  animationDelay?: number;
}

const MetricCard = ({
  title,
  value,
  icon,
  variant = "default",
  subtitle,
  className,
  animationDelay = 0,
}: MetricCardProps) => {
  const variantStyles = {
    default: "border-border hover:border-primary/30 hover:shadow-glow",
    success: "border-success/20 hover:border-success/40 bg-gradient-to-br from-success/5 to-transparent",
    primary: "border-primary/20 hover:border-primary/40 bg-gradient-to-br from-primary/5 to-transparent",
    neutral: "border-border hover:border-muted-foreground/30",
  };

  const valueStyles = {
    default: "text-foreground",
    success: "text-success",
    primary: "text-primary",
    neutral: "text-muted-foreground",
  };

  return (
    <div
      className={cn(
        "relative p-6 rounded-xl border bg-card transition-all duration-300 ease-out",
        "hover:-translate-y-1 hover:shadow-lg",
        "opacity-0 animate-fade-in",
        variantStyles[variant],
        className
      )}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Animated glow border */}
      <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-[-1px] rounded-xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-sm" />
      </div>

      <div className="relative flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className={cn("text-3xl font-semibold tracking-tight", valueStyles[variant])}>
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div
          className={cn(
            "p-3 rounded-lg",
            variant === "success" && "bg-success/10 text-success",
            variant === "primary" && "bg-primary/10 text-primary",
            variant === "neutral" && "bg-muted text-muted-foreground",
            variant === "default" && "bg-secondary text-foreground"
          )}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
