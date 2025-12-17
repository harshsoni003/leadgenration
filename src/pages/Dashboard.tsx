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
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Vistage Lead Gen Agent</h1>
                <p className="text-sm text-muted-foreground">AI-Powered Lead Intelligence</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Campaign Active</p>
                <p className="text-sm font-medium text-success flex items-center gap-1 justify-end">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                  </span>
                  Running
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="px-6 py-8">
        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <MetricCard
            title="Total Leads"
            value="2,847"
            icon={<Users className="w-5 h-5" />}
            variant="default"
            subtitle="+124 this week"
            animationDelay={0}
          />
          <MetricCard
            title="Value Generated"
            value="$13,750"
            icon={<TrendingUp className="w-5 h-5" />}
            variant="success"
            subtitle="25,000x ROI"
            animationDelay={100}
          />
          <MetricCard
            title="Time Saved"
            value="137 hrs"
            icon={<Clock className="w-5 h-5" />}
            variant="primary"
            subtitle="vs manual outreach"
            animationDelay={200}
          />
        </div>

        {/* Graph + Benefits Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Leads Graph */}
          <Card className="opacity-0 animate-fade-in" style={{ animationDelay: "250ms" }}>
            <CardHeader>
              <CardTitle>Lead Generation Trend</CardTitle>
              <CardDescription>Weekly leads captured vs qualified</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={leadsData}>
                    <defs>
                      <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(199 89% 48%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(199 89% 48%)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorQualified" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(162 63% 41%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(162 63% 41%)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
                    <XAxis dataKey="day" stroke="hsl(220 9% 46%)" fontSize={12} />
                    <YAxis stroke="hsl(220 9% 46%)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(0 0% 100%)",
                        border: "1px solid hsl(220 13% 91%)",
                        borderRadius: "8px",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="leads"
                      stroke="hsl(199 89% 48%)"
                      fill="url(#colorLeads)"
                      strokeWidth={2}
                      name="Total Leads"
                    />
                    <Area
                      type="monotone"
                      dataKey="qualified"
                      stroke="hsl(162 63% 41%)"
                      fill="url(#colorQualified)"
                      strokeWidth={2}
                      name="Qualified"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card className="opacity-0 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <CardHeader>
              <CardTitle>Why AI Lead Generation?</CardTitle>
              <CardDescription>Key benefits of automated prospecting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                    <div className={`p-2 rounded-lg ${benefit.bgColor}`}>
                      <benefit.icon className={`w-5 h-5 ${benefit.color}`} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{benefit.title}</p>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
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
