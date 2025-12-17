import { useState } from "react";
import { Bell, ChevronDown, ExternalLink, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Lead {
  id: number;
  name: string;
  title: string;
  company: string;
  companySize: string;
  location: string;
  totalScore: number;
  followers: string;
  eventSignals: string[];
  status: "Pending Review" | "Approved" | "Rejected";
  avatar?: string;
}

const mockLeads: Lead[] = [
  {
    id: 1,
    name: "Nate C.",
    title: "CEO",
    company: "TechVentures Inc",
    companySize: "51-200",
    location: "Philadelphia, PA",
    totalScore: 95,
    followers: "12k",
    eventSignals: ["Conference", "Keynote"],
    status: "Pending Review",
  },
  {
    id: 2,
    name: "Sarah M.",
    title: "Founder",
    company: "FinTech Solutions",
    companySize: "11-50",
    location: "New York, NY",
    totalScore: 88,
    followers: "8.5k",
    eventSignals: ["Summit", "Speaker"],
    status: "Approved",
  },
  {
    id: 3,
    name: "Andrew L.",
    title: "CEO",
    company: "Growth Partners",
    companySize: "201-500",
    location: "Chicago, IL",
    totalScore: 94,
    followers: "15k",
    eventSignals: ["Retreat"],
    status: "Pending Review",
  },
  {
    id: 4,
    name: "Michelle K.",
    title: "Managing Director",
    company: "Apex Consulting",
    companySize: "51-200",
    location: "Boston, MA",
    totalScore: 82,
    followers: "6k",
    eventSignals: ["Conference"],
    status: "Approved",
  },
  {
    id: 5,
    name: "David R.",
    title: "Founder & CEO",
    company: "DataDriven Co",
    companySize: "11-50",
    location: "Austin, TX",
    totalScore: 76,
    followers: "4.2k",
    eventSignals: [],
    status: "Rejected",
  },
];

const getScoreColor = (score: number) => {
  if (score >= 90) return "text-success bg-success/10";
  if (score >= 80) return "text-primary bg-primary/10";
  if (score >= 70) return "text-warning bg-warning/10";
  return "text-muted-foreground bg-muted";
};

const getStatusVariant = (status: Lead["status"]) => {
  switch (status) {
    case "Approved":
      return "default";
    case "Pending Review":
      return "secondary";
    case "Rejected":
      return "destructive";
    default:
      return "secondary";
  }
};

interface LeadsTableProps {
  onSelectLead: (lead: Lead) => void;
}

const LeadsTable = ({ onSelectLead }: LeadsTableProps) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <div className="rounded-xl border bg-card overflow-hidden opacity-0 animate-fade-in" style={{ animationDelay: "300ms" }}>
      <div className="p-4 border-b bg-secondary/30">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">Lead Pipeline</h3>
            <p className="text-sm text-muted-foreground">
              {mockLeads.length} leads matching your criteria
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="text-muted-foreground">
              Filter
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className="text-muted-foreground">
              Export
              <ExternalLink className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30 hover:bg-muted/30">
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="font-semibold">Title</TableHead>
            <TableHead className="font-semibold">Company Size</TableHead>
            <TableHead className="font-semibold">Location</TableHead>
            <TableHead className="font-semibold text-center">Score</TableHead>
            <TableHead className="font-semibold">Followers</TableHead>
            <TableHead className="font-semibold">Event Signals</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="w-10"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockLeads.map((lead) => (
            <TableRow
              key={lead.id}
              className={cn(
                "cursor-pointer transition-all duration-200",
                hoveredRow === lead.id && "bg-secondary/50 shadow-md -translate-y-px"
              )}
              onMouseEnter={() => setHoveredRow(lead.id)}
              onMouseLeave={() => setHoveredRow(null)}
              onClick={() => onSelectLead(lead)}
            >
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-sm font-medium">
                    {lead.name.charAt(0)}
                  </div>
                  <span className="font-medium">{lead.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">{lead.title}</TableCell>
              <TableCell className="text-muted-foreground">{lead.companySize}</TableCell>
              <TableCell className="text-muted-foreground">{lead.location}</TableCell>
              <TableCell>
                <div className="flex justify-center">
                  <span
                    className={cn(
                      "inline-flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm",
                      getScoreColor(lead.totalScore)
                    )}
                  >
                    {lead.totalScore}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">{lead.followers}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {lead.eventSignals.length > 0 ? (
                    lead.eventSignals.map((signal, idx) => (
                      <Badge
                        key={idx}
                        variant="outline"
                        className="bg-primary/5 text-primary border-primary/20 text-xs"
                      >
                        <Bell className="w-3 h-3 mr-1" />
                        {signal}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-muted-foreground text-sm">—</span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(lead.status)}>
                  {lead.status}
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Draft Message</DropdownMenuItem>
                    <DropdownMenuItem>Add to List</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeadsTable;
export type { Lead };
