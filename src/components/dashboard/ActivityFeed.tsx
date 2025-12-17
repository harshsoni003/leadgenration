import { MessageSquare, Bell, CheckCircle, Clock, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface Activity {
  id: number;
  type: "message" | "signal" | "approved" | "queued" | "generated";
  content: string;
  timestamp: string;
  leadId?: number;
}

const activities: Activity[] = [
  {
    id: 1,
    type: "generated",
    content: "Message draft generated for Lead #402",
    timestamp: "2 min ago",
  },
  {
    id: 2,
    type: "signal",
    content: "Event Signal Detected: 'FinTech Summit'",
    timestamp: "5 min ago",
  },
  {
    id: 3,
    type: "approved",
    content: "Message approved and sent to Sarah M.",
    timestamp: "12 min ago",
  },
  {
    id: 4,
    type: "queued",
    content: "3 new leads added to review queue",
    timestamp: "18 min ago",
  },
  {
    id: 5,
    type: "signal",
    content: "Event Signal Detected: 'Leadership Retreat'",
    timestamp: "25 min ago",
  },
  {
    id: 6,
    type: "message",
    content: "Follow-up scheduled for Andrew L.",
    timestamp: "32 min ago",
  },
];

const getActivityIcon = (type: Activity["type"]) => {
  switch (type) {
    case "message":
      return <MessageSquare className="w-4 h-4" />;
    case "signal":
      return <Bell className="w-4 h-4" />;
    case "approved":
      return <CheckCircle className="w-4 h-4" />;
    case "queued":
      return <Clock className="w-4 h-4" />;
    case "generated":
      return <Zap className="w-4 h-4" />;
    default:
      return <Bell className="w-4 h-4" />;
  }
};

const getActivityStyles = (type: Activity["type"]) => {
  switch (type) {
    case "signal":
      return "bg-primary/10 text-primary";
    case "approved":
      return "bg-success/10 text-success";
    case "generated":
      return "bg-accent/10 text-accent";
    default:
      return "bg-secondary text-muted-foreground";
  }
};

const ActivityFeed = () => {
  return (
    <div className="rounded-xl border bg-card p-4 opacity-0 animate-fade-in h-fit" style={{ animationDelay: "400ms" }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Live Activity</h3>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
        </span>
      </div>

      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className={cn(
              "flex items-start gap-3 p-3 rounded-lg transition-all duration-200",
              "hover:bg-secondary/50 cursor-pointer",
              "opacity-0 animate-fade-in"
            )}
            style={{ animationDelay: `${500 + index * 100}ms` }}
          >
            <div className={cn("p-2 rounded-lg shrink-0", getActivityStyles(activity.type))}>
              {getActivityIcon(activity.type)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-foreground leading-tight">{activity.content}</p>
              <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-2 text-sm text-primary hover:text-primary/80 transition-colors">
        View all activity →
      </button>
    </div>
  );
};

export default ActivityFeed;
