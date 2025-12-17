import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  MessageSquare,
  ExternalLink,
  ChevronDown,
  Users,
  MapPin,
  Building,
  Star,
  Bell,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Lead {
  id: number;
  name: string;
  title: string;
  company: string;
  companySize: string;
  location: string;
  followers: number;
  score: number;
  status: "qualified" | "pending" | "rejected" | "contacted";
  eventSignals: string[];
  lastPost: string;
  linkedinUrl: string;
}

const leads: Lead[] = [
  {
    id: 1,
    name: "Andrew L.",
    title: "CEO",
    company: "TechVentures Inc",
    companySize: "150",
    location: "Philadelphia, PA",
    followers: 12500,
    score: 94,
    status: "qualified",
    eventSignals: ["Conference", "Speaker"],
    lastPost: "2 days ago",
    linkedinUrl: "#",
  },
  {
    id: 2,
    name: "Sarah M.",
    title: "Founder & CEO",
    company: "FinanceFlow",
    companySize: "85",
    location: "Philadelphia, PA",
    followers: 8900,
    score: 91,
    status: "contacted",
    eventSignals: ["Summit", "Retreat"],
    lastPost: "1 day ago",
    linkedinUrl: "#",
  },
  {
    id: 3,
    name: "Michael R.",
    title: "President",
    company: "Healthcare Plus",
    companySize: "200",
    location: "King of Prussia, PA",
    followers: 15200,
    score: 88,
    status: "pending",
    eventSignals: ["Conference"],
    lastPost: "3 days ago",
    linkedinUrl: "#",
  },
  {
    id: 4,
    name: "Jennifer K.",
    title: "CEO",
    company: "RetailMax",
    companySize: "120",
    location: "Cherry Hill, NJ",
    followers: 7600,
    score: 85,
    status: "qualified",
    eventSignals: ["Workshop", "Panel"],
    lastPost: "Today",
    linkedinUrl: "#",
  },
  {
    id: 5,
    name: "David W.",
    title: "Founder",
    company: "SaaS Solutions",
    companySize: "65",
    location: "Philadelphia, PA",
    followers: 11300,
    score: 82,
    status: "contacted",
    eventSignals: ["Keynote"],
    lastPost: "5 days ago",
    linkedinUrl: "#",
  },
  {
    id: 6,
    name: "Lisa T.",
    title: "CEO",
    company: "ConsultPro",
    companySize: "55",
    location: "Wilmington, DE",
    followers: 6200,
    score: 79,
    status: "pending",
    eventSignals: [],
    lastPost: "1 week ago",
    linkedinUrl: "#",
  },
  {
    id: 7,
    name: "Robert P.",
    title: "Managing Director",
    company: "Investment Group",
    companySize: "180",
    location: "Philadelphia, PA",
    followers: 18500,
    score: 96,
    status: "qualified",
    eventSignals: ["Summit", "Speaker", "Conference"],
    lastPost: "Today",
    linkedinUrl: "#",
  },
  {
    id: 8,
    name: "Emily C.",
    title: "Founder & CEO",
    company: "EdTech Innovate",
    companySize: "45",
    location: "Princeton, NJ",
    followers: 5100,
    score: 72,
    status: "rejected",
    eventSignals: [],
    lastPost: "2 weeks ago",
    linkedinUrl: "#",
  },
  {
    id: 9,
    name: "James H.",
    title: "CEO",
    company: "Manufacturing Co",
    companySize: "320",
    location: "Allentown, PA",
    followers: 9800,
    score: 87,
    status: "qualified",
    eventSignals: ["Retreat", "Networking"],
    lastPost: "3 days ago",
    linkedinUrl: "#",
  },
  {
    id: 10,
    name: "Amanda B.",
    title: "President",
    company: "Legal Services LLC",
    companySize: "75",
    location: "Philadelphia, PA",
    followers: 7200,
    score: 81,
    status: "pending",
    eventSignals: ["Panel"],
    lastPost: "4 days ago",
    linkedinUrl: "#",
  },
];

const getStatusConfig = (status: Lead["status"]) => {
  switch (status) {
    case "qualified":
      return { label: "Qualified", variant: "default" as const, icon: CheckCircle };
    case "contacted":
      return { label: "Contacted", variant: "secondary" as const, icon: MessageSquare };
    case "pending":
      return { label: "Pending Review", variant: "outline" as const, icon: Clock };
    case "rejected":
      return { label: "Rejected", variant: "destructive" as const, icon: XCircle };
  }
};

const getScoreColor = (score: number) => {
  if (score >= 90) return "text-success";
  if (score >= 80) return "text-primary";
  if (score >= 70) return "text-warning";
  return "text-muted-foreground";
};

export default function Leads() {
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleSelectAll = () => {
    if (selectedLeads.length === filteredLeads.length) {
      setSelectedLeads([]);
    } else {
      setSelectedLeads(filteredLeads.map((l) => l.id));
    }
  };

  const toggleSelect = (id: number) => {
    setSelectedLeads((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const stats = {
    total: leads.length,
    qualified: leads.filter((l) => l.status === "qualified").length,
    pending: leads.filter((l) => l.status === "pending").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Lead Database</h1>
              <p className="text-sm text-muted-foreground">
                {leads.length} total leads • {stats.qualified} qualified
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
              <Button variant="outline" className="gap-2">
                <ExternalLink className="w-4 h-4" />
                Sync to LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <Users className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-sm text-muted-foreground">Total Leads</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-success/10">
                  <CheckCircle className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-success">{stats.qualified}</p>
                  <p className="text-sm text-muted-foreground">Qualified</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-warning/10">
                  <Clock className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-warning">{stats.pending}</p>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{stats.contacted}</p>
                  <p className="text-sm text-muted-foreground">Contacted</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters & Search */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, company, or location..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="pending">Pending Review</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bulk Actions */}
        {selectedLeads.length > 0 && (
          <Card className="border-primary bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">
                  <strong>{selectedLeads.length}</strong> leads selected
                </span>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    Approve Selected
                  </Button>
                  <Button size="sm" variant="outline">
                    Generate Messages
                  </Button>
                  <Button size="sm" variant="destructive">
                    Reject Selected
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Leads Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedLeads.length === filteredLeads.length && filteredLeads.length > 0}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Lead</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Event Signals</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => {
                  const statusConfig = getStatusConfig(lead.status);
                  const StatusIcon = statusConfig.icon;

                  return (
                    <TableRow key={lead.id} className="group">
                      <TableCell>
                        <Checkbox
                          checked={selectedLeads.includes(lead.id)}
                          onCheckedChange={() => toggleSelect(lead.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-medium text-sm">
                            {lead.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{lead.name}</p>
                            <p className="text-sm text-muted-foreground">{lead.title}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{lead.company}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Building className="w-3 h-3" />
                            {lead.companySize} employees
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {lead.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`text-lg font-bold ${getScoreColor(lead.score)}`}>
                            {lead.score}
                          </span>
                          <div className="text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {(lead.followers / 1000).toFixed(1)}k
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {lead.eventSignals.length > 0 ? (
                            lead.eventSignals.map((signal) => (
                              <Badge key={signal} variant="outline" className="text-xs gap-1">
                                <Bell className="w-3 h-3" />
                                {signal}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-sm text-muted-foreground">None</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusConfig.variant} className="gap-1">
                          <StatusIcon className="w-3 h-3" />
                          {statusConfig.label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2">
                              <Eye className="w-4 h-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <MessageSquare className="w-4 h-4" />
                              Draft Message
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <ExternalLink className="w-4 h-4" />
                              Open LinkedIn
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-destructive">
                              <XCircle className="w-4 h-4" />
                              Reject Lead
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
