import { useState } from "react";
import {
  Send,
  CheckCircle,
  XCircle,
  Edit3,
  Eye,
  Search,
  Mail,
  Loader2,
  FileText,
  Trash2,
  Plus,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: number;
  leadName: string;
  leadTitle: string;
  company: string;
  email: string;
  status: "draft" | "approved" | "sent" | "rejected" | "replied";
  content: string;
  context: {
    followers: number;
    recentTopic: string;
    score: number;
  };
  createdAt: string;
  sentAt?: string;
}

async function sendEmailWebhook(email: string, message: string, leadName: string) {
  try {
    const { data, error } = await supabase.functions.invoke('send-webhook', {
      body: { email, message, leadName },
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Webhook error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

const messages: Message[] = [
  {
    id: 1,
    leadName: "Ayush Aryan Sinha",
    leadTitle: "CEO",
    company: "Dyota AI",
    email: "ayush@dyotaai.com",
    status: "draft",
    content: "Hi Ayush, I noticed your impressive work at Dyota AI - the innovations in AI solutions are truly remarkable!",
    context: {
      followers: 15000,
      recentTopic: "AI Innovation Summit",
      score: 96,
    },
    createdAt: "12/17/2025, 1:54 PM",
  },
  {
    id: 2,
    leadName: "Andrew L.",
    leadTitle: "CEO",
    company: "TechVentures Inc",
    email: "andrew@techventures.com",
    status: "approved",
    content: "Hi Andrew, I noticed your recent keynote at the FinTech Summit - impressive insights on scaling fintech startups!",
    context: {
      followers: 12500,
      recentTopic: "FinTech Summit keynote",
      score: 94,
    },
    createdAt: "12/17/2025, 1:53 PM",
  },
  {
    id: 3,
    leadName: "Sarah M.",
    leadTitle: "Founder & CEO",
    company: "FinanceFlow",
    email: "sarah@financeflow.com",
    status: "sent",
    content: "Hi Sarah, Congratulations on FinanceFlow's growth - I saw your post about the leadership retreat last month.",
    context: {
      followers: 8900,
      recentTopic: "Leadership retreat",
      score: 91,
    },
    createdAt: "11/11/2025, 5:31 AM",
    sentAt: "Yesterday at 2:30 PM",
  },
  {
    id: 4,
    leadName: "Robert P.",
    leadTitle: "Managing Director",
    company: "Investment Group",
    email: "robert@investmentgroup.com",
    status: "replied",
    content: "Hi Robert, Your presentation at the Investment Summit was outstanding.",
    context: {
      followers: 18500,
      recentTopic: "Investment Summit speaker",
      score: 96,
    },
    createdAt: "11/11/2025, 3:46 AM",
    sentAt: "3 days ago",
  },
  {
    id: 5,
    leadName: "Michael R.",
    leadTitle: "President",
    company: "Healthcare Plus",
    email: "michael@healthcareplus.com",
    status: "approved",
    content: "Hi Michael, I came across your post about the Healthcare Innovation Conference.",
    context: {
      followers: 15200,
      recentTopic: "Healthcare Innovation Conference",
      score: 88,
    },
    createdAt: "11/11/2025, 1:00 AM",
  },
  {
    id: 6,
    leadName: "Emily C.",
    leadTitle: "Founder & CEO",
    company: "EdTech Innovate",
    email: "emily@edtechinnovate.com",
    status: "rejected",
    content: "Hi Emily, I noticed your work in EdTech - impressive trajectory!",
    context: {
      followers: 5100,
      recentTopic: "None detected",
      score: 72,
    },
    createdAt: "12/03/2025, 6:10 AM",
  },
  {
    id: 7,
    leadName: "David K.",
    leadTitle: "CEO",
    company: "CloudSync",
    email: "david@cloudsync.com",
    status: "draft",
    content: "Hi David, Your cloud infrastructure solutions are impressive.",
    context: {
      followers: 9200,
      recentTopic: "Cloud Summit",
      score: 85,
    },
    createdAt: "11/11/2025, 9:55 PM",
  },
];

const getStatusBadge = (status: Message["status"]) => {
  switch (status) {
    case "draft":
      return <Badge className="bg-muted text-muted-foreground border-0 font-normal text-xs px-2 py-0.5">draft</Badge>;
    case "approved":
      return <Badge className="bg-emerald-50 text-emerald-600 border-0 font-normal text-xs px-2 py-0.5">ready</Badge>;
    case "sent":
      return <Badge className="bg-emerald-50 text-emerald-600 border-0 font-normal text-xs px-2 py-0.5">sent</Badge>;
    case "replied":
      return <Badge className="bg-emerald-50 text-emerald-600 border-0 font-normal text-xs px-2 py-0.5">replied</Badge>;
    case "rejected":
      return <Badge className="bg-red-50 text-red-600 border-0 font-normal text-xs px-2 py-0.5">rejected</Badge>;
  }
};

type TabValue = "all" | "draft" | "approved" | "sent";

export default function Messages() {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [editedContent, setEditedContent] = useState("");
  const [activeTab, setActiveTab] = useState<TabValue>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSending, setIsSending] = useState(false);

  const openEditor = (message: Message) => {
    setSelectedMessage(message);
    setEditedContent(message.content);
  };

  const closeEditor = () => {
    setSelectedMessage(null);
    setEditedContent("");
  };

  const handleSendEmail = async () => {
    if (!selectedMessage) return;
    
    setIsSending(true);
    const result = await sendEmailWebhook(
      selectedMessage.email,
      editedContent,
      selectedMessage.leadName
    );
    setIsSending(false);

    if (result.success) {
      toast.success(`Email sent to ${selectedMessage.email}`);
      closeEditor();
    } else {
      toast.error(`Failed to send email: ${result.error}`);
    }
  };

  const filteredMessages = messages.filter((m) => {
    const matchesTab = activeTab === "all" || m.status === activeTab;
    const matchesSearch = 
      m.leadName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const tabs: { value: TabValue; label: string }[] = [
    { value: "all", label: "All" },
    { value: "draft", label: "Drafts" },
    { value: "approved", label: "Ready" },
    { value: "sent", label: "Sent" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Messages</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Review and approve AI-generated outreach messages.
          </p>
        </div>

        {/* Tabs and Search Row */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                  activeTab === tab.value
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search messages..." 
                className="pl-9 h-9 bg-background border-border rounded-lg text-sm" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="h-9 px-4 text-sm font-medium">
              <Plus className="w-4 h-4 mr-2" />
              Add Message
            </Button>
            <Button size="sm" className="h-9 px-4 text-sm font-medium bg-foreground text-background hover:bg-foreground/90">
              <Upload className="w-4 h-4 mr-2" />
              Import Leads
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="border border-border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-background hover:bg-background border-b border-border">
                <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide py-3 px-4">Name</TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide py-3 px-4">Preview</TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide py-3 px-4">Company</TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide py-3 px-4">Status</TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground uppercase tracking-wide py-3 px-4">Date Created</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMessages.map((message) => (
                <TableRow 
                  key={message.id} 
                  className="hover:bg-muted/30 cursor-pointer border-b border-border last:border-b-0"
                  onClick={() => openEditor(message)}
                >
                  <TableCell className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <span className="font-medium text-foreground text-sm">{message.leadName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 px-4">
                    <span className="text-muted-foreground text-sm line-clamp-1 max-w-xs">
                      {message.content}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 px-4">
                    <span className="text-muted-foreground text-sm">
                      {message.company}
                    </span>
                  </TableCell>
                  <TableCell className="py-4 px-4">
                    {getStatusBadge(message.status)}
                  </TableCell>
                  <TableCell className="py-4 px-4">
                    <span className="text-muted-foreground text-sm">{message.createdAt}</span>
                  </TableCell>
                  <TableCell className="py-4 px-4">
                    <button 
                      className="text-muted-foreground hover:text-foreground transition-colors p-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        toast.info("Delete functionality coming soon");
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredMessages.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                    No messages found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Edit Modal */}
      <Dialog open={!!selectedMessage} onOpenChange={() => closeEditor()}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Edit Message</DialogTitle>
            <DialogDescription>
              {selectedMessage?.leadName} • {selectedMessage?.company}
            </DialogDescription>
          </DialogHeader>

          {selectedMessage && (
            <div className="space-y-4">
              <div className="flex gap-4 text-sm flex-wrap">
                <div className="px-3 py-2 rounded-md bg-muted">
                  <span className="text-muted-foreground">Score:</span>{" "}
                  <span className="font-medium">{selectedMessage.context.score}</span>
                </div>
                <div className="px-3 py-2 rounded-md bg-muted">
                  <span className="text-muted-foreground">Topic:</span>{" "}
                  <span className="font-medium">{selectedMessage.context.recentTopic}</span>
                </div>
                <div className="px-3 py-2 rounded-md bg-primary/10">
                  <span className="text-muted-foreground">Email:</span>{" "}
                  <span className="font-medium text-primary">{selectedMessage.email}</span>
                </div>
              </div>

              <Textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="min-h-[180px]"
              />
              <p className="text-xs text-muted-foreground">
                {editedContent.length} characters
              </p>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={closeEditor}>
              Cancel
            </Button>
            <Button variant="destructive" size="sm">
              <XCircle className="w-4 h-4 mr-1" />
              Reject
            </Button>
            <Button>
              <CheckCircle className="w-4 h-4 mr-1" />
              Approve
            </Button>
            <Button 
              onClick={handleSendEmail} 
              disabled={isSending}
              className="bg-emerald-600 hover:bg-emerald-700 text-background"
            >
              {isSending ? (
                <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              ) : (
                <Mail className="w-4 h-4 mr-1" />
              )}
              Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
