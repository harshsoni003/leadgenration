import { useState } from "react";
import {
  Users,
  TrendingUp,
  Clock,
  Zap,
  Target,
  Shield,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import MetricCard from "@/components/dashboard/MetricCard";
import LeadsTable, { type Lead } from "@/components/dashboard/LeadsTable";
import LeadProfileModal from "@/components/dashboard/LeadProfileModal";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import LeadScoreCard from "@/components/dashboard/LeadScoreCard";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const leadsData = [
  { day: "Mon", leads: 45, qualified: 38 },
  { day: "Tue", leads: 62, qualified: 51 },
  { day: "Wed", leads: 78, qualified: 65 },
  { day: "Thu", leads: 85, qualified: 72 },
  { day: "Fri", leads: 92, qualified: 78 },
  { day: "Sat", leads: 55, qualified: 48 },
  { day: "Sun", leads: 133, qualified: 68 },
];

const benefits = [
  {
    icon: Target,
    title: "Hyper-Targeted Leads",
    description: "AI identifies CEOs with 50+ employees, 5,000+ followers, and active event signals.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Clock,
    title: "Save 15+ Min Per Lead",
    description: "Automated research replaces 20-minute manual discovery with instant results.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Sparkles,
    title: "Human-Like Personalization",
    description: "AI drafts messages referencing their specific posts—you just approve and send.",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    icon: Shield,
    title: "Quality Over Quantity",
    description: "52% of scraped leads qualify for outreach, ensuring high conversion potential.",
    color: "text-success",
    bgColor: "bg-success/10",
  },
];

export default function Dashboard() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const handleSelectLead = (lead: Lead) => {
    setSelectedLead(lead);
    setProfileModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background sticky top-0 z-40">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground tracking-tight">Analytics & ROI</h1>
              <p className="text-sm text-muted-foreground mt-1">Track your cost efficiency and time savings</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <div className="px-3 py-1 rounded-full bg-secondary text-xs font-medium text-foreground border border-border">
                  Overview
                </div>
                <div className="px-3 py-1 rounded-full text-xs font-medium text-muted-foreground hover:bg-secondary/50 cursor-pointer transition-colors">
                  Activity Feed
                </div>
                <div className="px-3 py-1 rounded-full text-xs font-medium text-muted-foreground hover:bg-secondary/50 cursor-pointer transition-colors">
                  Events
                </div>
                <div className="px-3 py-1 rounded-full text-xs font-medium text-muted-foreground hover:bg-secondary/50 cursor-pointer transition-colors">
                  Workflows
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="px-8 py-8">
        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard
            title="Total Leads"
            value="2,847"
            icon={<Users className="w-5 h-5" />}
            subtitle="+124 this week"
            animationDelay={0}
          />
          <MetricCard
            title="Value Generated"
            value="$13,750"
            icon={<TrendingUp className="w-5 h-5" />}
            subtitle="25,000x ROI"
            animationDelay={100}
          />
          <MetricCard
            title="Time Saved"
            value="137 hrs"
            icon={<Clock className="w-5 h-5" />}
            subtitle="vs manual outreach"
            animationDelay={200}
          />
        </div>

        {/* Graph + Benefits Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Leads Graph */}
          <Card className="opacity-0 animate-fade-in border-border shadow-none" style={{ animationDelay: "250ms" }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Lead Generation Trend</CardTitle>
              <CardDescription>Weekly leads captured vs qualified</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={leadsData}>
                    <defs>
                      <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(0 0% 0%)" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="hsl(0 0% 0%)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorQualified" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(0 0% 60%)" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="hsl(0 0% 60%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 92%)" vertical={false} />
                    <XAxis
                      dataKey="day"
                      stroke="hsl(0 0% 60%)"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      dy={10}
                    />
                    <YAxis
                      stroke="hsl(0 0% 60%)"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      dx={-10}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(0 0% 100%)",
                        border: "1px solid hsl(0 0% 92%)",
                        borderRadius: "8px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
                      }}
                      itemStyle={{ color: "hsl(0 0% 0%)" }}
                      labelStyle={{ color: "hsl(0 0% 40%)", marginBottom: '0.25rem' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="leads"
                      stroke="hsl(0 0% 0%)"
                      fill="url(#colorLeads)"
                      strokeWidth={2}
                      name="Total Leads"
                    />
                    <Area
                      type="monotone"
                      dataKey="qualified"
                      stroke="hsl(0 0% 60%)"
                      fill="url(#colorQualified)"
                      strokeWidth={2}
                      name="Qualified"
                      strokeDasharray="4 4"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card className="opacity-0 animate-fade-in border-border shadow-none" style={{ animationDelay: "300ms" }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Why AI Lead Generation?</CardTitle>
              <CardDescription>Key benefits of automated prospecting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 mt-4">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-3 rounded-lg hover:bg-secondary/30 transition-colors border border-transparent hover:border-border/50">
                    <div className={`mt-1 p-2 rounded-md bg-secondary text-foreground`}>
                      <benefit.icon className={`w-4 h-4`} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{benefit.title}</p>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Lead Score Card */}
          <div className="lg:col-span-1">
            <LeadScoreCard lead={selectedLead} />
          </div>

          {/* Leads Table */}
          <div className="lg:col-span-2">
            <LeadsTable onSelectLead={handleSelectLead} />
          </div>

          {/* Activity Feed */}
          <div className="lg:col-span-1">
            <ActivityFeed />
          </div>
        </div>
      </main>

      {/* Lead Profile Modal */}
      <LeadProfileModal
        lead={selectedLead}
        open={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />
    </div>
  );
}
