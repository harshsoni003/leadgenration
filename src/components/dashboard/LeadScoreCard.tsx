import { Building, Users, Bell, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Lead } from "./LeadsTable";

interface ScoreFactor {
  label: string;
  points: number;
  icon: React.ReactNode;
}

interface LeadScoreCardProps {
  lead: Lead | null;
  className?: string;
}

const getScoreFactors = (lead: Lead): ScoreFactor[] => {
  const factors: ScoreFactor[] = [];

  // Company size factor
  if (lead.companySize === "51-200" || lead.companySize === "201-500") {
    factors.push({
      label: `Company Size: ${lead.companySize}`,
      points: 20,
      icon: <Building className="w-4 h-4" />,
    });
  } else if (lead.companySize === "11-50") {
    factors.push({
      label: `Company Size: ${lead.companySize}`,
      points: 15,
      icon: <Building className="w-4 h-4" />,
    });
  }

  // Followers factor
  const followerCount = parseFloat(lead.followers.replace("k", "")) * 1000;
  if (followerCount >= 10000) {
    factors.push({
      label: `Influencer: ${lead.followers} Followers`,
      points: 25,
      icon: <Users className="w-4 h-4" />,
    });
  } else if (followerCount >= 5000) {
    factors.push({
      label: `Influencer: ${lead.followers} Followers`,
      points: 15,
      icon: <Users className="w-4 h-4" />,
    });
  }

  // Event signals factor
  if (lead.eventSignals.length > 0) {
    factors.push({
      label: `Event Signal: ${lead.eventSignals.join(", ")}`,
      points: 25,
      icon: <Bell className="w-4 h-4" />,
    });
  }

  // Title factor
  if (lead.title.includes("CEO") || lead.title.includes("Founder")) {
    factors.push({
      label: `Decision Maker: ${lead.title}`,
      points: 20,
      icon: <Award className="w-4 h-4" />,
    });
  }

  return factors;
};

const LeadScoreCard = ({ lead, className }: LeadScoreCardProps) => {
  if (!lead) {
    return (
      <div className={cn("rounded-xl border bg-card p-6 opacity-0 animate-fade-in border-border shadow-none", className)} style={{ animationDelay: "200ms" }}>
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto rounded-full bg-secondary flex items-center justify-center mb-4">
            <Award className="w-8 h-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">Select a lead to view scoring breakdown</p>
        </div>
      </div>
    );
  }

  const factors = getScoreFactors(lead);

  return (
    <div className={cn("rounded-xl border bg-card p-6 opacity-0 animate-fade-in shadow-none", className)} style={{ animationDelay: "200ms" }}>
      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-full bg-secondary text-foreground flex items-center justify-center text-xl font-semibold border border-border">
          {lead.name.charAt(0)}
        </div>
        <div>
          <h3 className="font-semibold text-foreground">{lead.name}</h3>
          <p className="text-sm text-muted-foreground">{lead.title} at {lead.company}</p>
        </div>
      </div>

      {/* Score Gauge */}
      <div className="relative flex justify-center mb-6">
        <div className="relative w-32 h-32">
          {/* Background circle */}
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="hsl(0 0% 92%)"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="hsl(0 0% 0%)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${lead.totalScore * 2.51} 251`}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          {/* Score number */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="text-3xl font-bold text-foreground">{lead.totalScore}</span>
              <span className="block text-xs text-muted-foreground">/100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Score Factors */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-foreground">Score Breakdown</h4>
        {factors.map((factor, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 border border-transparent hover:border-border transition-colors"
          >
            <div className="p-2 rounded-lg bg-background border border-border text-foreground">
              {factor.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground truncate">{factor.label}</p>
            </div>
            <span className="text-sm font-semibold text-foreground">+{factor.points}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadScoreCard;
