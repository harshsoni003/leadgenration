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
import leadDataJson from "@/lib/leaddata.json";

export interface Lead {
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
  profileUrl?: string;
  salesNavigatorUrl?: string;
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

// Convert all JSON data to Lead format
const allLeads: Lead[] = (leadDataJson as LinkedInLead[]).map((itm, index) => {
  const fullName = `${itm.firstName} ${itm.lastName}`;
  const score = Math.floor(Math.random() * 30) + 70;

  // Assign status deterministically or randomly
  const statuses: Lead["status"][] = ["Pending Review", "Approved", "Rejected"];
  const status = statuses[index % 3];

  return {
    id: parseInt(itm.id) || index,
    name: fullName,
    title: itm.jobTitle,
    company: itm.companyName,
    companySize: "11-50",
    location: itm.location || itm.companyLocation,
    totalScore: score,
    followers: "2.5k", // Placeholder
    eventSignals: itm.companyIndustry ? [itm.companyIndustry] : [],
    status: status,
    avatar: itm.profilePictureUrl,
    profileUrl: itm.profileUrl,
    salesNavigatorUrl: itm.salesNavigatorUrl
  };
});

// Add our manual lead at the top if desired, or just use the JSON data.
// Since the user asked for "show all user from leaddata.json", ensuring the JSON data is primary.
// We can prepend the "Pratik Kadam" lead if we want to keep it as a demo.
const pratikLead: Lead = {
  id: 99999999, // Distinct ID
  name: "Pratik Kadam",
  title: "Founder & CEO",
  company: "Custom AI Studio",
  companySize: "11-50",
  location: "Mumbai, Maharashtra, India",
  totalScore: 98,
  followers: "2.6k",
  eventSignals: ["AI Summit", "Tech Conference"],
  status: "Pending Review",
  avatar: "/assets/pratik-profile.jpg",
};

const leadsData = [pratikLead, ...allLeads];

const getScoreColor = (score: number) => {
  if (score >= 90) return "text-foreground font-bold";
  if (score >= 80) return "text-foreground font-semibold";
  if (score >= 70) return "text-muted-foreground";
  return "text-muted-foreground opacity-70";
};

const getStatusVariant = (status: Lead["status"]) => {
  switch (status) {
    case "Approved":
      return "default";
    case "Pending Review":
      return "secondary";
    case "Rejected":
      return "outline";
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
    <div className="rounded-xl border bg-card overflow-hidden opacity-0 animate-fade-in shadow-none flex flex-col h-[600px]" style={{ animationDelay: "300ms" }}>
      <div className="p-4 border-b border-border flex-none">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">Lead Pipeline</h3>
            <p className="text-sm text-muted-foreground">
              {leadsData.length} leads matching your criteria
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

      <div className="flex-1 overflow-y-auto min-h-0">
        <Table>
          <TableHeader className="sticky top-0 bg-card z-10 shadow-sm">
            <TableRow className="hover:bg-transparent border-b border-border">
              <TableHead className="font-semibold text-muted-foreground">Name</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Title</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Company Size</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Location</TableHead>
              <TableHead className="font-semibold text-center text-muted-foreground">Score</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Followers</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Event Signals</TableHead>
              <TableHead className="font-semibold text-muted-foreground">Status</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leadsData.map((lead) => (
              <TableRow
                key={lead.id}
                className={cn(
                  "cursor-pointer transition-colors duration-200 border-b border-border",
                  hoveredRow === lead.id && "bg-secondary/40"
                )}
                onMouseEnter={() => setHoveredRow(lead.id)}
                onMouseLeave={() => setHoveredRow(null)}
                onClick={() => onSelectLead(lead)}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    {lead.avatar ? (
                      <img
                        src={lead.avatar}
                        alt={lead.name}
                        className="w-8 h-8 rounded-full object-cover border border-border"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-foreground text-sm font-medium border border-border">
                        {lead.name.charAt(0)}
                      </div>
                    )}
                    <span className="font-medium text-foreground">{lead.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{lead.title}</TableCell>
                <TableCell className="text-muted-foreground">{lead.companySize}</TableCell>
                <TableCell className="text-muted-foreground">
                  <span className="truncate max-w-[150px] block" title={lead.location}>{lead.location}</span>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <span
                      className={cn(
                        "inline-flex items-center justify-center w-10 h-10 rounded-full text-sm",
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
                          variant="secondary"
                          className="bg-secondary text-foreground border-transparent text-xs font-normal whitespace-nowrap"
                        >
                          <Bell className="w-3 h-3 mr-1 opacity-70" />
                          {signal}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground text-sm">—</span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(lead.status)} className="font-normal whitespace-nowrap">
                    {lead.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
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
    </div>
  );
};

export default LeadsTable;

