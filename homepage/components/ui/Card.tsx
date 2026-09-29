import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CardProps {
  as?: "div" | "article" | "li";
  id?: string;
  /** Lift + border on hover (pointer devices only, see .card-hover). */
  hover?: boolean;
  className?: string;
  children: ReactNode;
}

export function Card({ as: Tag = "div", id, hover = true, className, children }: CardProps) {
  return (
    <Tag
      id={id}
      className={cn("rounded-2xl border border-line bg-elevated p-6 lg:p-8", hover && "card-hover", className)}
    >
      {children}
    </Tag>
  );
}
