import { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  Clock,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const costData = [
  { day: "Mon", cost: 65, leads: 78 },
  { day: "Tue", cost: 72, leads: 85 },
  { day: "Wed", cost: 68, leads: 92 },
  { day: "Thu", cost: 75, leads: 88 },
  { day: "Fri", cost: 82, leads: 95 },
  { day: "Sat", cost: 45, leads: 62 },
  { day: "Sun", cost: 55, leads: 50 },
];

const roiData = [
  { month: "Jan", roi: 18, value: 8500 },
  { month: "Feb", roi: 22, value: 10200 },
  { month: "Mar", roi: 25, value: 11800 },
  { month: "Apr", roi: 29, value: 13750 },
];

const timeBreakdown = [
  { name: "Research Saved", value: 85, color: "hsl(199 89% 48%)" },
  { name: "Qualification Saved", value: 32, color: "hsl(162 63% 41%)" },
  { name: "Outreach Saved", value: 20, color: "hsl(38 92% 50%)" },
];

const qualificationData = [
  { stage: "Total Scraped", count: 550, rate: 100 },
  { stage: "Met Size Filter", count: 485, rate: 88 },
  { stage: "High Followers", count: 420, rate: 76 },
  { stage: "Event Signals", count: 312, rate: 57 },
  { stage: "Ready for Outreach", count: 285, rate: 52 },
];

export default function Analytics() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Analytics & ROI</h1>
              <p className="text-sm text-muted-foreground">Track your cost efficiency and time savings</p>
            </div>
            <Badge variant="outline" className="gap-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
              </span>
              Live Data
            </Badge>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Key ROI Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Cost per Lead</p>
                  <p className="text-3xl font-bold text-foreground">$0.85</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowDownRight className="w-4 h-4 text-success" />
                    <span className="text-sm text-success">12% vs target</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-primary/10">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-success/20 bg-gradient-to-br from-success/5 to-transparent">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">ROI Multiple</p>
                  <p className="text-3xl font-bold text-foreground">29x</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowUpRight className="w-4 h-4 text-success" />
                    <span className="text-sm text-success">+4x this month</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-success/10">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-transparent">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Hours Saved</p>
                  <p className="text-3xl font-bold text-foreground">137h</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="w-4 h-4 text-accent" />
                    <span className="text-sm text-muted-foreground">~15 min/lead</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-accent/10">
                  <Clock className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-warning/20 bg-gradient-to-br from-warning/5 to-transparent">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Value Generated</p>
                  <p className="text-3xl font-bold text-foreground">$13,750</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Target className="w-4 h-4 text-warning" />
                    <span className="text-sm text-muted-foreground">@$100/hr</span>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-warning/10">
                  <Zap className="w-6 h-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Cost & Leads Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Cost vs Leads Generated</CardTitle>
              <CardDescription>This week's performance breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={costData}>
                    <defs>
                      <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(199 89% 48%)" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(199 89% 48%)" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
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
                      dataKey="cost"
                      stroke="hsl(199 89% 48%)"
                      fill="url(#colorCost)"
                      strokeWidth={2}
                      name="Cost ($)"
                    />
                    <Area
                      type="monotone"
                      dataKey="leads"
                      stroke="hsl(162 63% 41%)"
                      fill="url(#colorLeads)"
                      strokeWidth={2}
                      name="Leads"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* ROI Trend */}
          <Card>
            <CardHeader>
              <CardTitle>ROI Growth Trend</CardTitle>
              <CardDescription>Monthly ROI multiple progression</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={roiData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
                    <XAxis dataKey="month" stroke="hsl(220 9% 46%)" fontSize={12} />
                    <YAxis stroke="hsl(220 9% 46%)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(0 0% 100%)",
                        border: "1px solid hsl(220 13% 91%)",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar
                      dataKey="roi"
                      fill="hsl(199 89% 48%)"
                      radius={[4, 4, 0, 0]}
                      name="ROI Multiple (x)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Time Savings & Qualification Funnel */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Time Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Time Savings Breakdown</CardTitle>
              <CardDescription>137 hours saved this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={timeBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      dataKey="value"
                      label={({ name, value }) => `${value}h`}
                    >
                      {timeBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col gap-2 mt-4">
                {timeBreakdown.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{item.value}h</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Qualification Funnel */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Lead Qualification Funnel</CardTitle>
              <CardDescription>How leads progress through your filters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {qualificationData.map((stage, index) => (
                  <div key={stage.stage} className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{stage.stage}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{stage.count} leads</span>
                        <Badge variant={stage.rate > 70 ? "default" : stage.rate > 50 ? "secondary" : "outline"}>
                          {stage.rate}%
                        </Badge>
                      </div>
                    </div>
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${stage.rate}%`,
                          background: index === 0
                            ? "hsl(220 9% 46%)"
                            : index === qualificationData.length - 1
                            ? "hsl(162 63% 41%)"
                            : "hsl(199 89% 48%)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-lg bg-success/5 border border-success/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-success/10">
                    <Target className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">52% Conversion to Ready</p>
                    <p className="text-sm text-muted-foreground">285 high-quality leads ready for personalized outreach</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cost Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Cost Comparison: AI vs Manual</CardTitle>
            <CardDescription>See the value of automation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-destructive/5 border border-destructive/20">
                <h4 className="font-medium text-destructive mb-2">Manual Research</h4>
                <p className="text-3xl font-bold text-foreground mb-1">$13,750</p>
                <p className="text-sm text-muted-foreground">137 hrs × $100/hr</p>
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>• 20 min per lead</p>
                  <p>• Full-time researcher needed</p>
                  <p>• Limited scalability</p>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-warning/5 border border-warning/20">
                <h4 className="font-medium text-warning mb-2">Lead Gen Agency</h4>
                <p className="text-3xl font-bold text-foreground mb-1">$2,750</p>
                <p className="text-sm text-muted-foreground">$5 per qualified lead</p>
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>• Variable quality</p>
                  <p>• Less personalization</p>
                  <p>• Longer turnaround</p>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-success/5 border border-success/20">
                <h4 className="font-medium text-success mb-2">AI Agent (Current)</h4>
                <p className="text-3xl font-bold text-foreground mb-1">$467.50</p>
                <p className="text-sm text-muted-foreground">$0.85 per lead</p>
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>• Instant processing</p>
                  <p>• Highly personalized</p>
                  <p>• Infinitely scalable</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
