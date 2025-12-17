import { useState } from "react";
import {
  Send,
  CheckCircle,
  Edit3,
  Eye,
  RefreshCw,
  Search,
  Mail,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    content: "Hi Ayush, I noticed your impressive work at Dyota AI - the innovations in AI solutions are truly remarkable! As a leader driving cutting-edge technology, have you considered joining a peer advisory group? Vistage connects CEOs like yourself to share challenges and accelerate growth. Would love to share how it's helped similar tech leaders.",
    context: {
      followers: 15000,
      recentTopic: "AI Innovation Summit",
      score: 96,
    },
    createdAt: "1 hour ago",
  },
  {
    id: 2,
    leadName: "Andrew L.",
    leadTitle: "CEO",
    company: "TechVentures Inc",
    email: "andrew@techventures.com",
    status: "draft",
    content: "Hi Andrew, I noticed your recent keynote at the FinTech Summit - impressive insights on scaling fintech startups! As someone leading a company of 150+, have you considered joining a peer advisory group? Vistage connects CEOs like yourself to share challenges and accelerate growth. Would love to share how it's helped similar leaders in Philadelphia.",
    context: {
      followers: 12500,
      recentTopic: "FinTech Summit keynote",
      score: 94,
    },
    createdAt: "2 hours ago",
  },
  {
    id: 3,
    leadName: "Sarah M.",
    leadTitle: "Founder & CEO",
    company: "FinanceFlow",
    email: "sarah@financeflow.com",
    status: "sent",
    content: "Hi Sarah, Congratulations on FinanceFlow's growth - I saw your post about the leadership retreat last month. Building a company to 85 employees is no small feat! I work with Vistage, connecting high-growth CEOs in Philadelphia for confidential peer advisory. Many of our members have navigated similar scaling challenges. Interested in learning more?",
    context: {
      followers: 8900,
      recentTopic: "Leadership retreat",
      score: 91,
    },
    createdAt: "1 day ago",
    sentAt: "Yesterday at 2:30 PM",
  },
  {
    id: 4,
    leadName: "Robert P.",
    leadTitle: "Managing Director",
    company: "Investment Group",
    email: "robert@investmentgroup.com",
    status: "replied",
    content: "Hi Robert, Your presentation at the Investment Summit was outstanding - particularly your views on alternative investments. With your track record leading a 180-person firm, I'd love to introduce you to Vistage. Our Philadelphia CEO groups are filled with leaders who'd value your perspective. Would a brief call work this week?",
    context: {
      followers: 18500,
      recentTopic: "Investment Summit speaker",
      score: 96,
    },
    createdAt: "3 days ago",
    sentAt: "3 days ago",
  },
  {
    id: 5,
    leadName: "Michael R.",
    leadTitle: "President",
    company: "Healthcare Plus",
    email: "michael@healthcareplus.com",
    status: "approved",
    content: "Hi Michael, I came across your post about the Healthcare Innovation Conference - your take on patient-centered care resonated with me. Leading Healthcare Plus to 200+ employees shows real leadership. Have you explored peer advisory groups? Vistage has helped many healthcare executives navigate growth challenges. Happy to share more.",
    context: {
      followers: 15200,
      recentTopic: "Healthcare Innovation Conference",
      score: 88,
    },
    createdAt: "5 hours ago",
  },
  {
    id: 6,
    leadName: "Emily C.",
    leadTitle: "Founder & CEO",
    company: "EdTech Innovate",
    email: "emily@edtechinnovate.com",
    status: "rejected",
    content: "Hi Emily, I noticed your work in EdTech - impressive trajectory! Would love to connect about peer advisory groups for growing founders.",
    context: {
      followers: 5100,
      recentTopic: "None detected",
      score: 72,
    },
    createdAt: "1 week ago",
  },
];

const getStatusBadge = (status: Message["status"]) => {
  switch (status) {
    case "draft":
      return <Badge variant="outline">Draft</Badge>;
    case "approved":
      return <Badge className="bg-primary/10 text-primary border-0">Ready</Badge>;
    case "sent":
      return <Badge className="bg-success/10 text-success border-0">Sent</Badge>;
    case "replied":
      return <Badge className="bg-accent/10 text-accent border-0">Replied</Badge>;
    case "rejected":
      return <Badge variant="destructive">Rejected</Badge>;
  }
};

export default function Messages() {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [editedContent, setEditedContent] = useState("");
  const [activeTab, setActiveTab] = useState("all");
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

  const counts = {
    all: messages.length,
    draft: messages.filter((m) => m.status === "draft").length,
    approved: messages.filter((m) => m.status === "approved").length,
    sent: messages.filter((m) => m.status === "sent").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Messages</h1>
            <p className="text-sm text-muted-foreground">
              Review and approve AI-generated outreach
            </p>
          </div>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Generate Drafts
          </Button>
        </div>
      </header>

      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
            <TabsList>
              <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
              <TabsTrigger value="draft">Drafts ({counts.draft})</TabsTrigger>
              <TabsTrigger value="approved">Ready ({counts.approved})</TabsTrigger>
              <TabsTrigger value="sent">Sent ({counts.sent})</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search..." 
              className="pl-9 h-9" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="border rounded-lg bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Lead</TableHead>
                <TableHead>Message Preview</TableHead>
                <TableHead className="w-[80px] text-center">Score</TableHead>
                <TableHead className="w-[100px]">Status</TableHead>
                <TableHead className="w-[120px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMessages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{message.leadName}</p>
                      <p className="text-xs text-muted-foreground">
                        {message.leadTitle}, {message.company}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {message.content}
                    </p>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`font-medium ${message.context.score >= 90 ? 'text-success' : message.context.score >= 80 ? 'text-primary' : 'text-muted-foreground'}`}>
                      {message.context.score}
                    </span>
                  </TableCell>
                  <TableCell>{getStatusBadge(message.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {message.status === "draft" && (
                        <>
                          <Button size="icon" variant="ghost" onClick={() => openEditor(message)}>
                            <Edit3 className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" className="text-success hover:text-success">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      {message.status === "approved" && (
                        <Button size="sm" variant="default">
                          <Send className="w-3 h-3 mr-1" />
                          Send
                        </Button>
                      )}
                      {(message.status === "sent" || message.status === "replied") && (
                        <Button size="icon" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredMessages.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
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
            <Button 
              onClick={handleSendEmail} 
              disabled={isSending}
              className="bg-success hover:bg-success/90 text-success-foreground"
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
