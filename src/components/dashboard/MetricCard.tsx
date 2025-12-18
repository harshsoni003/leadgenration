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
  return (
    <div
      className={cn(
        "relative p-6 rounded-xl border bg-card transition-all duration-300 ease-out",
        "hover:border-foreground/20 hover:shadow-sm",
        "opacity-0 animate-fade-in",
        className
      )}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="relative flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-semibold tracking-tight text-foreground">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <div
          className={cn(
            "p-2 rounded-md",
            "bg-secondary text-foreground"
          )}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
