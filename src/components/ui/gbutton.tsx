import Link from "next/link";
import { cn } from "@/lib/utils";

export default function GButton({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        `
        group inline-flex items-center gap-2
        px-4 py-2 mt-6
        rounded-lg text-sm font-medium
        text-red-400 border border-red-400/40
        bg-red-400/10 backdrop-blur-md
        shadow-[0_0_15px_rgba(0,0,0,0.15)]
        transition-all duration-300
        hover:bg-red-400/20 hover:text-red-300
        hover:border-red-400/60
        hover:-translate-y-0.5
        hover:shadow-[0_0_25px_rgba(255,60,60,0.25)]
        `,
        className
      )}
    >
      <span className="translate-x-0 group-hover:translate-x-1 transition-all duration-300">
        →
      </span>
      {children}
    </Link>
  );
}
