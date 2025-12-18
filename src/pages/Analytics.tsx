
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";
import {
  Clock,
  Zap,
  TrendingUp,
  DollarSign,
  Target,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// --- Data ---
const timeSavingsData = [
  { name: "Research Saved", value: 85, color: "#0ea5e9" }, // Sky 500
  { name: "Qualification Saved", value: 32, color: "#10b981" }, // Emerald 500
  { name: "Outreach Saved", value: 20, color: "#f59e0b" }, // Amber 500
];

const funnelData = [
  { label: "Total Scraped", value: 550, percent: 100, color: "bg-slate-600" },
  { label: "Met Size Filter", value: 485, percent: 88, color: "bg-sky-500" },
  { label: "High Followers", value: 420, percent: 76, color: "bg-sky-500" },
  { label: "Event Signals", value: 312, percent: 57, color: "bg-sky-500" },
  { label: "Ready for Outreach", value: 285, percent: 52, color: "bg-emerald-500" },
];

export default function Analytics() {
  return (
    <div className="min-h-screen bg-background p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">Analytics & ROI</h1>
        <p className="text-sm text-muted-foreground mt-1">Track your cost efficiency and time savings</p>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Cost per Lead */}
        <Card className="border-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cost per Lead</p>
                <h3 className="text-2xl font-bold text-foreground mt-2">$0.001</h3>
                <p className="text-xs text-emerald-600 font-medium mt-1">↘ 99% vs manual</p>
              </div>
              <div className="p-2 bg-sky-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-sky-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ROI Multiple */}
        <Card className="border-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">ROI Multiple</p>
                <h3 className="text-2xl font-bold text-foreground mt-2">25,000x</h3>
                <p className="text-xs text-emerald-600 font-medium mt-1">↗ vs manual cost</p>
              </div>
              <div className="p-2 bg-emerald-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hours Saved */}
        <Card className="border-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Hours Saved</p>
                <h3 className="text-2xl font-bold text-foreground mt-2">137h</h3>
                <p className="text-xs text-muted-foreground mt-1">~ 15 min/lead</p>
              </div>
              <div className="p-2 bg-teal-100 rounded-lg">
                <Clock className="w-5 h-5 text-teal-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Value Generated */}
        <Card className="border-border shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Value Generated</p>
                <h3 className="text-2xl font-bold text-foreground mt-2">$13,750</h3>
                <p className="text-xs text-muted-foreground mt-1">@$100/hr</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <Zap className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Middle Section: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

        {/* Time Savings Breakdown (Donut) */}
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Time Savings Breakdown</CardTitle>
            <CardDescription>137 hours saved this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={timeSavingsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {timeSavingsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                    itemStyle={{ color: '#1e293b' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Donut Labels (Manual implementation for custom look or use Recharts legend) */}
            </div>
            {/* Custom Legend */}
            <div className="mt-4 space-y-2">
              {timeSavingsData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-medium text-foreground">{item.value}h</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lead Qualification Funnel */}
        <Card className="border-border shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Lead Qualification Funnel</CardTitle>
            <CardDescription>How leads progress through your filters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {funnelData.map((stage) => (
                <div key={stage.label}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-foreground">{stage.label}</span>
                    <div className="flex gap-2 text-xs">
                      <span className="text-muted-foreground">{stage.value} leads</span>
                      <span className={cn("font-bold px-1.5 py-0.5 rounded text-white", stage.color.replace('bg-', 'bg-op-').includes('emerald') ? 'bg-emerald-500' : 'bg-slate-500/80')}>{stage.percent}%</span>
                    </div>
                  </div>
                  <div className="h-2.5 w-full bg-secondary rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all duration-500", stage.color)}
                      style={{ width: `${stage.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Conversion Insight */}
            <div className="mt-8 p-4 bg-emerald-50 rounded-lg border border-emerald-100 flex items-start gap-3">
              <div className="p-1.5 bg-emerald-100 rounded-full text-emerald-600 mt-0.5">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-emerald-900">52% Conversion to Ready</h4>
                <p className="text-sm text-emerald-700 mt-0.5">285 high-quality leads ready for personalized outreach</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cost Comparison */}
      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg">Cost Comparison: AI vs Manual</CardTitle>
          <CardDescription>See the value of automation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Manual Research */}
            <div className="p-6 rounded-xl bg-red-50 border border-red-100">
              <h4 className="text-sm font-medium text-red-600 mb-2">Manual Research</h4>
              <div className="mb-4">
                <span className="text-3xl font-bold text-foreground">$13,750</span>
                <div className="text-xs text-muted-foreground mt-1">137 hrs × $100/hr</div>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1.5">
                <li>• 20 min per lead</li>
                <li>• Full-time researcher needed</li>
                <li>• Limited scalability</li>
              </ul>
            </div>

            {/* Lead Gen Agency */}
            <div className="p-6 rounded-xl bg-orange-50 border border-orange-100">
              <h4 className="text-sm font-medium text-orange-600 mb-2">Lead Gen Agency</h4>
              <div className="mb-4">
                <span className="text-3xl font-bold text-foreground">$2,750</span>
                <div className="text-xs text-muted-foreground mt-1">$5 per qualified lead</div>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1.5">
                <li>• Variable quality</li>
                <li>• Less personalization</li>
                <li>• Longer turnaround</li>
              </ul>
            </div>

            {/* AI Agent */}
            <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3">
                <div className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded">Current</div>
              </div>
              <h4 className="text-sm font-medium text-emerald-600 mb-2">AI Agent (Current)</h4>
              <div className="mb-4">
                <span className="text-3xl font-bold text-foreground">$0.55</span>
                <div className="text-xs text-muted-foreground mt-1">$0.001 per lead</div>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1.5">
                <li>• Instant processing</li>
                <li>• Highly personalized</li>
                <li>• Infinitely scalable</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
