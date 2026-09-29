import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CardProps {
  as?: "div" | "article" | "li";
  id?: string;
  size?: "large" | "compact";
  hover?: boolean;
  dashed?: boolean;
  className?: string;
  children: ReactNode;
}

export function Card({ as: Tag = "div", id, size = "large", hover = true, dashed = false, className, children }: CardProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "border bg-elevated",
        dashed ? "border-dashed border-line-strong" : "border-line",
        size === "large" ? "rounded-2xl p-6 lg:p-8" : "rounded-xl p-5",
        hover && "card-hover",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
