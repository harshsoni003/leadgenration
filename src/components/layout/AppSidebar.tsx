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
              "flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200",
              isActive
                ? "bg-primary text-primary-foreground shadow-glow"
                : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
            )}
          >
            <Icon className="w-5 h-5" />
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" className="ml-2">
          {item.label}
        </TooltipContent>
      </Tooltip>
    );
  };

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-[72px] flex-col bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-sidebar-border">
        <div className="w-10 h-10 rounded-xl bg-[#0A66C2] flex items-center justify-center">
          <Linkedin className="w-6 h-6 text-primary-foreground" />
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 flex flex-col items-center gap-2 py-4">
        {navItems.map((item) => (
          <NavItem key={item.path} item={item} />
        ))}
      </nav>

      {/* Bottom Navigation */}
      <div className="flex flex-col items-center gap-2 py-4 border-t border-sidebar-border">
        {bottomItems.map((item) => (
          <NavItem key={item.path} item={item} />
        ))}
        
        {/* User Avatar */}
        <div className="mt-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold text-sm">
            JD
          </div>
        </div>
      </div>
    </aside>
  );
}
