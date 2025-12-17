import { useState } from "react";
import {
  Megaphone,
  Play,
  Pause,
  Settings,
  Plus,
  Filter,
  Target,
  Users,
  MapPin,
  Building,
  Hash,
  Calendar,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const campaigns = [
  {
    id: 1,
    name: "Vistage Philadelphia CEOs",
    status: "active",
    leads: 285,
    qualified: 215,
    messaged: 142,
    responded: 38,
    filters: {
      location: "Philadelphia",
      minEmployees: 50,
      minFollowers: 5000,
      eventSignals: true,
    },
    lastRun: "2 hours ago",
  },
  {
    id: 2,
    name: "Financial Services Leaders",
    status: "active",
    leads: 165,
    qualified: 128,
    messaged: 89,
    responded: 24,
    filters: {
      location: "Northeast US",
      minEmployees: 100,
      minFollowers: 8000,
      eventSignals: true,
    },
    lastRun: "4 hours ago",
  },
  {
    id: 3,
    name: "Tech Startup Founders",
    status: "paused",
    leads: 100,
    qualified: 77,
    messaged: 45,
    responded: 12,
    filters: {
      location: "San Francisco",
      minEmployees: 20,
      minFollowers: 3000,
      eventSignals: false,
    },
    lastRun: "2 days ago",
  },
];

const eventKeywords = [
  "Conference",
  "Summit",
  "Speaker",
  "Retreat",
  "Workshop",
  "Keynote",
  "Panel",
  "Networking",
];

export default function Campaigns() {
  const [selectedCampaign, setSelectedCampaign] = useState(campaigns[0]);
  const [minEmployees, setMinEmployees] = useState([50]);
  const [minFollowers, setMinFollowers] = useState([5000]);
  const [eventSignalsEnabled, setEventSignalsEnabled] = useState(true);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([
    "Conference",
    "Summit",
    "Speaker",
    "Retreat",
  ]);

  const toggleKeyword = (keyword: string) => {
    setSelectedKeywords((prev) =>
      prev.includes(keyword)
        ? prev.filter((k) => k !== keyword)
        : [...prev, keyword]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Campaigns</h1>
              <p className="text-sm text-muted-foreground">Manage your targeting filters and campaigns</p>
            </div>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Campaign
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Campaign List */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground flex items-center gap-2">
              <Megaphone className="w-4 h-4" />
              Active Campaigns
            </h3>
            
            {campaigns.map((campaign) => (
              <Card
                key={campaign.id}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedCampaign.id === campaign.id
                    ? "border-primary shadow-glow"
                    : "hover:border-muted-foreground/30"
                }`}
                onClick={() => setSelectedCampaign(campaign)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-foreground">{campaign.name}</h4>
                      <p className="text-xs text-muted-foreground">Last run: {campaign.lastRun}</p>
                    </div>
                    <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
                      {campaign.status === "active" ? (
                        <span className="flex items-center gap-1">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-foreground opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-foreground"></span>
                          </span>
                          Active
                        </span>
                      ) : (
                        "Paused"
                      )}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div>
                      <p className="text-lg font-semibold text-foreground">{campaign.leads}</p>
                      <p className="text-xs text-muted-foreground">Leads</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-success">{campaign.qualified}</p>
                      <p className="text-xs text-muted-foreground">Qualified</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-primary">{campaign.messaged}</p>
                      <p className="text-xs text-muted-foreground">Messaged</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-accent">{campaign.responded}</p>
                      <p className="text-xs text-muted-foreground">Replied</p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Response Rate</span>
                      <span className="font-medium">{Math.round((campaign.responded / campaign.messaged) * 100)}%</span>
                    </div>
                    <Progress value={(campaign.responded / campaign.messaged) * 100} className="h-1.5" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filter Configuration */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Filter className="w-5 h-5" />
                      {selectedCampaign.name}
                    </CardTitle>
                    <CardDescription>Configure targeting filters for high-quality leads</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                    {selectedCampaign.status === "active" ? (
                      <Button variant="outline" size="sm" className="gap-1">
                        <Pause className="w-4 h-4" />
                        Pause
                      </Button>
                    ) : (
                      <Button size="sm" className="gap-1">
                        <Play className="w-4 h-4" />
                        Resume
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Location Filter */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    Target Location
                  </Label>
                  <Input
                    value={selectedCampaign.filters.location}
                    placeholder="e.g., Philadelphia, Northeast US"
                    className="max-w-md"
                  />
                </div>

                {/* Company Size Filter */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-muted-foreground" />
                    Minimum Company Size
                  </Label>
                  <div className="flex items-center gap-4 max-w-md">
                    <Slider
                      value={minEmployees}
                      onValueChange={setMinEmployees}
                      max={500}
                      min={10}
                      step={10}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-24 text-right">{minEmployees[0]}+ employees</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Filters for companies with {minEmployees[0]}+ employees (implies ~${minEmployees[0] >= 50 ? "5M+" : "2M+"} revenue)
                  </p>
                </div>

                {/* Followers Filter */}
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    Minimum LinkedIn Followers
                  </Label>
                  <div className="flex items-center gap-4 max-w-md">
                    <Slider
                      value={minFollowers}
                      onValueChange={setMinFollowers}
                      max={20000}
                      min={1000}
                      step={500}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-24 text-right">{(minFollowers[0] / 1000).toFixed(1)}k+</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Targets influencers with strong professional networks
                  </p>
                </div>

                {/* Event Signals */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      Event Signal Detection
                    </Label>
                    <Switch
                      checked={eventSignalsEnabled}
                      onCheckedChange={setEventSignalsEnabled}
                    />
                  </div>
                  
                  {eventSignalsEnabled && (
                    <div className="p-4 rounded-lg bg-muted/50 border">
                      <p className="text-sm text-muted-foreground mb-3">
                        Detect these keywords in recent posts (indicates willingness to invest in growth):
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {eventKeywords.map((keyword) => (
                          <Badge
                            key={keyword}
                            variant={selectedKeywords.includes(keyword) ? "default" : "outline"}
                            className="cursor-pointer transition-all"
                            onClick={() => toggleKeyword(keyword)}
                          >
                            {selectedKeywords.includes(keyword) && (
                              <CheckCircle className="w-3 h-3 mr-1" />
                            )}
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Scoring Logic */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Lead Scoring Logic
                </CardTitle>
                <CardDescription>How leads are scored and prioritized</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border bg-card">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Company Size Match</span>
                        <Badge variant="outline">+20 pts</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {minEmployees[0]}+ employees indicates established business
                      </p>
                    </div>

                    <div className="p-4 rounded-lg border bg-card">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Influencer Status</span>
                        <Badge variant="outline">+15 pts</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {(minFollowers[0] / 1000).toFixed(1)}k+ followers shows thought leadership
                      </p>
                    </div>

                    <div className="p-4 rounded-lg border bg-card">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Event Signal Detected</span>
                        <Badge variant="outline">+25 pts</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Conference/Summit mentions indicate growth investment
                      </p>
                    </div>

                    <div className="p-4 rounded-lg border bg-card">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Title Match (CEO/Founder)</span>
                        <Badge variant="outline">+20 pts</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Decision-maker with budget authority
                      </p>
                    </div>

                    <div className="p-4 rounded-lg border bg-card">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Location Match</span>
                        <Badge variant="outline">+10 pts</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Within target geographic area
                      </p>
                    </div>

                    <div className="p-4 rounded-lg border bg-card">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Recent Activity</span>
                        <Badge variant="outline">+10 pts</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Posted within last 30 days (active user)
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-primary" />
                      <span className="font-medium text-foreground">Qualification Threshold</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Leads scoring 70+ points are automatically qualified and move to message drafting queue.
                      Leads 50-69 are flagged for manual review.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
