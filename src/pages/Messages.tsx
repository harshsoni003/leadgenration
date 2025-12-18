
import { useState } from "react";
import { Search, PenLine, CheckCircle2, Send, Eye, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LeadProfileModal from "@/components/dashboard/LeadProfileModal";
import leadDataJson from "@/lib/leaddata.json";
import type { Lead } from "@/components/dashboard/LeadsTable";

// Data structure for the Messages page
interface MessageItem {
  lead: Lead;
  messageStatus: "Draft" | "Ready" | "Sent" | "Replied" | "Rejected";
  messagePreview: string;
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

// Convert LinkedIn lead to Message Item
function convertToMessageItem(linkedInLead: LinkedInLead, index: number): MessageItem {
  const fullName = `${linkedInLead.firstName} ${linkedInLead.lastName}`;
  const score = Math.floor(Math.random() * 30) + 70;

  // Assign message status based on index for variety
  const statuses: MessageItem["messageStatus"][] = ["Draft", "Draft", "Ready", "Sent", "Replied", "Rejected"];
  const messageStatus = statuses[index % statuses.length];

  // Generate message preview
  const messagePreview = `Hi ${linkedInLead.firstName}, I noticed your impressive work at ${linkedInLead.companyName} - the innovations in ${linkedInLead.companyIndustry || 'your industry'} are truly remarkable! As a leader...`;

  const lead: Lead = {
    id: parseInt(linkedInLead.id) || index,
    name: fullName,
    title: linkedInLead.jobTitle,
    company: linkedInLead.companyName,
    companySize: "11-50",
    location: linkedInLead.location,
    totalScore: score,
    followers: "2.5k",
    eventSignals: linkedInLead.companyIndustry ? [linkedInLead.companyIndustry] : [],
    // Map score to lead status
    status: score > 85 ? "Pending Review" : score > 75 ? "Approved" : "Rejected",
    avatar: linkedInLead.profilePictureUrl || undefined,
    profileUrl: linkedInLead.profileUrl,
    salesNavigatorUrl: linkedInLead.salesNavigatorUrl,
  };

  return {
    lead,
    messageStatus,
    messagePreview,
  };
}

// Generate data from JSON
const messageItems: MessageItem[] = (leadDataJson as LinkedInLead[])
  .slice(0, 50) // Load 50 items
  .map((item, index) => convertToMessageItem(item, index));

const getStatusBadge = (status: MessageItem["messageStatus"]) => {
  switch (status) {
    case "Draft":
      return <Badge variant="outline" className="text-foreground border-border font-normal">Draft</Badge>;
    case "Ready":
      return <Badge variant="secondary" className="bg-sky-100 text-sky-700 hover:bg-sky-200 border-transparent font-normal">Ready</Badge>;
    case "Sent":
      return <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-transparent font-normal">Sent</Badge>;
    case "Replied":
      return <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-transparent font-normal">Replied</Badge>;
    case "Rejected":
      return <Badge variant="secondary" className="bg-red-100 text-red-700 hover:bg-red-200 border-transparent font-normal">Rejected</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const getActionButtons = (status: MessageItem["messageStatus"]) => {
  switch (status) {
    case "Draft":
      return (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <PenLine className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
            <CheckCircle2 className="w-4 h-4" />
          </Button>
        </div>
      );
    case "Ready":
      return (
        <Button size="sm" className="bg-[#0a66c2] hover:bg-[#004182] text-white h-8 px-3 gap-1.5">
          <Send className="w-3.5 h-3.5" />
          Send
        </Button>
      );
    default:
      return (
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
          <Eye className="w-4 h-4" />
        </Button>
      );
  }
};

export default function Messages() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredMessages = activeTab === "All"
    ? messageItems
    : messageItems.filter(m => {
      if (activeTab === "Drafts") return m.messageStatus === "Draft";
      if (activeTab === "Ready") return m.messageStatus === "Ready";
      if (activeTab === "Sent") return ["Sent", "Replied", "Rejected"].includes(m.messageStatus);
      return true;
    });

  const handleRowClick = (lead: Lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-8 pb-4 border-b border-border sticky top-0 bg-background/95 backdrop-blur z-40">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">Messages</h1>
            <p className="text-sm text-muted-foreground mt-1">Review and approve AI-generated outreach</p>
          </div>
          <Button variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Generate Drafts
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-1 bg-secondary/30 p-1 rounded-lg">
            {["All", "Drafts", "Ready", "Sent"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === tab
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                  }`}
              >
                {tab} {tab === "All" && `(${messageItems.length})`}
              </button>
            ))}
          </div>
          <div className="w-72">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-8 bg-background" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/30 hover:bg-secondary/30 border-b border-border">
                <TableHead className="font-semibold text-muted-foreground w-[300px]">Lead</TableHead>
                <TableHead className="font-semibold text-muted-foreground">Message Preview</TableHead>
                <TableHead className="font-semibold text-muted-foreground text-center w-[100px]">Score</TableHead>
                <TableHead className="font-semibold text-muted-foreground text-center w-[120px]">Status</TableHead>
                <TableHead className="font-semibold text-muted-foreground text-right w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMessages.map((item, i) => (
                <TableRow
                  key={item.lead.id}
                  className="hover:bg-muted/30 border-b border-border transition-colors cursor-pointer"
                  onClick={() => handleRowClick(item.lead)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {item.lead.avatar ? (
                        <img
                          src={item.lead.avatar}
                          alt={item.lead.name}
                          className="w-10 h-10 rounded-full object-cover border border-border"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground text-sm font-medium border border-border">
                          {item.lead.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-foreground">{item.lead.name}</div>
                        <div className="text-xs text-muted-foreground">{item.lead.title}, {item.lead.company}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-muted-foreground line-clamp-1 max-w-xl">
                      {item.messagePreview}
                    </p>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="font-semibold text-emerald-600">{item.lead.totalScore}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    {getStatusBadge(item.messageStatus)}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
                      {getActionButtons(item.messageStatus)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <LeadProfileModal
        lead={selectedLead}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
