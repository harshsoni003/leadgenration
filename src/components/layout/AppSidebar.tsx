import { LayoutGrid, MessageSquare, BarChart2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutGrid, path: "/", label: "Dashboard" },
  { icon: BarChart2, path: "/analytics", label: "Analytics" },
  { icon: MessageSquare, path: "/messages", label: "Messages" },
];

export default function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="w-[72px] shrink-0 h-screen sticky top-0 flex flex-col bg-sidebar border-r border-sidebar-border/50 py-6 items-center z-50">
      {/* LinkedIn Logo */}
      <div className="mb-8 p-2">
        <div className="w-10 h-10 bg-[#0a66c2] rounded-md flex items-center justify-center text-white font-bold text-2xl">
          in
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex flex-col gap-6 w-full items-center">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "w-10 h-10 flex items-center justify-center rounded-md transition-all duration-200",
                isActive
                  ? "bg-[#0a66c2] text-white shadow-sm"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              )}
              title={item.label}
            >
              <item.icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions (Placeholder) */}
      <div className="mt-auto flex flex-col gap-4 pb-4">
        <button className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground">
          <MessageSquare className="w-5 h-5" />
        </button>
      </div>
    </aside>
  );
}
