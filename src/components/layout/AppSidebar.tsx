import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  Megaphone,
  Users,
  MessageSquare,
  Settings,
  Linkedin,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: Megaphone, label: "Campaigns", path: "/campaigns" },
  { icon: Users, label: "Leads", path: "/leads" },
  { icon: MessageSquare, label: "Messages", path: "/messages" },
];

const bottomItems = [
  { icon: Settings, label: "Settings", path: "/settings" },
];

export default function AppSidebar() {
  const location = useLocation();

  const NavItem = ({ item }: { item: typeof navItems[0] }) => {
    const isActive = location.pathname === item.path;
    const Icon = item.icon;

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={item.path}
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200",
              isActive
                ? "bg-[#1a1a2e] text-white"
                : "text-[#6b7280] hover:text-[#1a1a2e] hover:bg-[#f3f4f6]"
            )}
          >
            <Icon className="w-5 h-5" strokeWidth={1.5} />
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" className="ml-2">
          {item.label}
        </TooltipContent>
      </Tooltip>
    );
  };

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-16 flex-col bg-white border-r border-[#e5e7eb]">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-[#e5e7eb]">
        <div className="w-8 h-8 rounded-lg bg-[#0A66C2] flex items-center justify-center">
          <Linkedin className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 flex flex-col items-center gap-1 py-4">
        {navItems.map((item) => (
          <NavItem key={item.path} item={item} />
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="flex flex-col items-center gap-1 py-4 border-t border-[#e5e7eb]">
        {bottomItems.map((item) => (
          <NavItem key={item.path} item={item} />
        ))}
        
        {/* User Avatar */}
        <div className="mt-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white font-medium text-xs">
            JD
          </div>
        </div>
      </div>
    </aside>
  );
}
