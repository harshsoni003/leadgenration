
import { useState, useMemo } from "react";
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
import { Card, CardContent } from "@/components/ui/card";
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
import leadDataJson from "@/lib/leaddata.json";

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
  avatar?: string;
}

interface LinkedInLead {
  companyIndustry: string;
  companyLocation: string;
  companyName: string;
  connectionType: string;
  firstName: string;
  id: string;
  jobTitle: string;
  lastName: string;
  location: string;
  openLink: string;
  pendingInvitation: string;
  premium: string;
  profileId: string;
  profilePictureUrl: string;
  profileUrl: string;
  salesNavigatorUrl: string;
  saved: string;
  viewed: string;
}

// Convert JSON data to Lead interface
const allLeads: Lead[] = (leadDataJson as LinkedInLead[]).map((itm, index) => {
  const fullName = `${itm.firstName} ${itm.lastName}`;
  const score = Math.floor(Math.random() * 30) + 70; // Mock score 70-100
  const followers = Math.floor(Math.random() * 20000) + 500;

  // Deterministic status based on index/random for variety
  const statuses: Lead["status"][] = ["qualified", "pending", "contacted", "rejected"];
  const status = statuses[index % 4];

  return {
    id: parseInt(itm.id) || index,
    name: fullName,
    title: itm.jobTitle,
    company: itm.companyName,
    companySize: "11-50", // Placeholder
    location: itm.location || itm.companyLocation,
    followers,
    score,
    status,
    eventSignals: itm.companyIndustry ? [itm.companyIndustry] : [],
    lastPost: `${Math.floor(Math.random() * 10) + 1} days ago`,
    linkedinUrl: itm.profileUrl,
    avatar: itm.profilePictureUrl
  };
});

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
  if (score >= 90) return "text-emerald-600";
  if (score >= 80) return "text-blue-600";
  if (score >= 70) return "text-amber-600";
  return "text-muted-foreground";
};

export default function Leads() {
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredLeads = useMemo(() => {
    return allLeads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

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
    total: allLeads.length,
    qualified: allLeads.filter((l) => l.status === "qualified").length,
    pending: allLeads.filter((l) => l.status === "pending").length,
    contacted: allLeads.filter((l) => l.status === "contacted").length,
  };

  return (
    <div className="min-h-screen bg-background flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm z-40 flex-none">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Lead Database</h1>
              <p className="text-sm text-muted-foreground">
                {allLeads.length} total leads • {stats.qualified} qualified
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

      <div className="flex-1 overflow-hidden flex flex-col p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-none">
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
                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/20">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald-600">{stats.qualified}</p>
                  <p className="text-sm text-muted-foreground">Qualified</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/20">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">{stats.contacted}</p>
                  <p className="text-sm text-muted-foreground">Contacted</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters & Search */}
        <Card className="flex-none">
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
          <Card className="border-primary bg-primary/5 flex-none">
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

        {/* Leads Table Container with Scroll */}
        <div className="flex-1 min-h-0 border rounded-lg overflow-hidden bg-card">
          <div className="h-full overflow-y-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-card z-10 shadow-sm">
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
                    <TableRow key={lead.id} className="group hover:bg-muted/50">
                      <TableCell>
                        <Checkbox
                          checked={selectedLeads.includes(lead.id)}
                          onCheckedChange={() => toggleSelect(lead.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {lead.avatar ? (
                            <img
                              src={lead.avatar}
                              alt={lead.name}
                              className="w-10 h-10 rounded-full object-cover border border-border"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-medium text-sm">
                              {lead.name.split(" ").map((n) => n[0]).join("")}
                            </div>
                          )}
                          <div>
                            <p className="font-medium text-foreground">{lead.name}</p>
                            <p className="text-sm text-muted-foreground">{lead.title}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium max-w-[200px] truncate" title={lead.company}>{lead.company}</p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Building className="w-3 h-3" />
                            {lead.companySize} employees
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          <span className="max-w-[150px] truncate" title={lead.location}>{lead.location}</span>
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
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {lead.eventSignals.length > 0 ? (
                            lead.eventSignals.map((signal, i) => (
                              <Badge key={i} variant="outline" className="text-xs gap-1">
                                <Bell className="w-3 h-3" />
                                <span className="truncate max-w-[100px]">{signal}</span>
                              </Badge>
                            ))
                          ) : (
                            <span className="text-sm text-muted-foreground">None</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusConfig.variant} className="gap-1 whitespace-nowrap">
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
                              <a href={lead.linkedinUrl} target="_blank" rel="noopener noreferrer">Open LinkedIn</a>
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
          </div>
        </div>
      </div>
    </div>
  );
}

