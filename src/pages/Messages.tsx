import { useState } from "react";
import {
  MessageSquare,
  Send,
  Clock,
  CheckCircle,
  XCircle,
  Edit3,
  Eye,
  RefreshCw,
  Sparkles,
  User,
  Calendar,
  ThumbsUp,
  ThumbsDown,
  Filter,
  Search,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Message {
  id: number;
  leadName: string;
  leadTitle: string;
  company: string;
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

const messages: Message[] = [
  {
    id: 1,
    leadName: "Andrew L.",
    leadTitle: "CEO",
    company: "TechVentures Inc",
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
    id: 2,
    leadName: "Sarah M.",
    leadTitle: "Founder & CEO",
    company: "FinanceFlow",
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
    id: 3,
    leadName: "Robert P.",
    leadTitle: "Managing Director",
    company: "Investment Group",
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
    id: 4,
    leadName: "Michael R.",
    leadTitle: "President",
    company: "Healthcare Plus",
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
    id: 5,
    leadName: "Emily C.",
    leadTitle: "Founder & CEO",
    company: "EdTech Innovate",
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

const getStatusConfig = (status: Message["status"]) => {
  switch (status) {
    case "draft":
      return { label: "Draft", color: "bg-muted text-muted-foreground", icon: Edit3 };
    case "approved":
      return { label: "Ready to Send", color: "bg-primary/10 text-primary", icon: CheckCircle };
    case "sent":
      return { label: "Sent", color: "bg-success/10 text-success", icon: Send };
    case "replied":
      return { label: "Replied", color: "bg-accent/10 text-accent", icon: MessageSquare };
    case "rejected":
      return { label: "Rejected", color: "bg-destructive/10 text-destructive", icon: XCircle };
  }
};

export default function Messages() {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [editedContent, setEditedContent] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const openEditor = (message: Message) => {
    setSelectedMessage(message);
    setEditedContent(message.content);
  };

  const closeEditor = () => {
    setSelectedMessage(null);
    setEditedContent("");
  };

  const stats = {
    drafts: messages.filter((m) => m.status === "draft").length,
    approved: messages.filter((m) => m.status === "approved").length,
    sent: messages.filter((m) => m.status === "sent").length,
    replied: messages.filter((m) => m.status === "replied").length,
  };

  const filteredMessages =
    activeTab === "all"
      ? messages
      : messages.filter((m) => m.status === activeTab);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Message Center</h1>
              <p className="text-sm text-muted-foreground">
                Review and approve AI-generated personalized messages
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Generate New Drafts
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="cursor-pointer hover:border-muted-foreground/30 transition-colors" onClick={() => setActiveTab("draft")}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <Edit3 className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.drafts}</p>
                  <p className="text-sm text-muted-foreground">Drafts</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:border-muted-foreground/30 transition-colors" onClick={() => setActiveTab("approved")}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{stats.approved}</p>
                  <p className="text-sm text-muted-foreground">Ready to Send</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:border-muted-foreground/30 transition-colors" onClick={() => setActiveTab("sent")}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-success/10">
                  <Send className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-success">{stats.sent}</p>
                  <p className="text-sm text-muted-foreground">Sent</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:border-muted-foreground/30 transition-colors" onClick={() => setActiveTab("replied")}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <MessageSquare className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent">{stats.replied}</p>
                  <p className="text-sm text-muted-foreground">Replied</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs & Messages */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="all">All Messages</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="sent">Sent</TabsTrigger>
              <TabsTrigger value="replied">Replied</TabsTrigger>
            </TabsList>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search messages..." className="pl-10" />
            </div>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            <div className="space-y-4">
              {filteredMessages.map((message) => {
                const statusConfig = getStatusConfig(message.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <Card key={message.id} className="hover:border-muted-foreground/30 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-semibold flex-shrink-0">
                          {message.leadName.split(" ").map((n) => n[0]).join("")}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-medium text-foreground">
                                {message.leadName}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {message.leadTitle} at {message.company}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge className={statusConfig.color}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {statusConfig.label}
                              </Badge>
                            </div>
                          </div>

                          {/* Message Preview */}
                          <p className="text-sm text-foreground/80 line-clamp-2 mb-3">
                            {message.content}
                          </p>

                          {/* Context & Actions */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                {(message.context.followers / 1000).toFixed(1)}k followers
                              </span>
                              <span className="flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />
                                Score: {message.context.score}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {message.createdAt}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              {message.status === "draft" && (
                                <>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => openEditor(message)}
                                  >
                                    <Edit3 className="w-4 h-4 mr-1" />
                                    Edit
                                  </Button>
                                  <Button size="sm" variant="destructive" className="gap-1">
                                    <ThumbsDown className="w-4 h-4" />
                                    Reject
                                  </Button>
                                  <Button size="sm" className="gap-1">
                                    <ThumbsUp className="w-4 h-4" />
                                    Approve
                                  </Button>
                                </>
                              )}
                              {message.status === "approved" && (
                                <>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => openEditor(message)}
                                  >
                                    <Edit3 className="w-4 h-4 mr-1" />
                                    Edit
                                  </Button>
                                  <Button size="sm" className="gap-1">
                                    <Send className="w-4 h-4" />
                                    Send Now
                                  </Button>
                                </>
                              )}
                              {(message.status === "sent" || message.status === "replied") && (
                                <Button size="sm" variant="outline">
                                  <Eye className="w-4 h-4 mr-1" />
                                  View Thread
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Modal */}
      <Dialog open={!!selectedMessage} onOpenChange={() => closeEditor()}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Message for {selectedMessage?.leadName}</DialogTitle>
            <DialogDescription>
              Review and personalize the AI-generated message before approving.
            </DialogDescription>
          </DialogHeader>

          {selectedMessage && (
            <div className="space-y-4">
              {/* Lead Context */}
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <h4 className="text-sm font-medium mb-2">Lead Context</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Followers</p>
                      <p className="font-medium">{(selectedMessage.context.followers / 1000).toFixed(1)}k</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Score</p>
                      <p className="font-medium">{selectedMessage.context.score}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Recent Topic</p>
                      <p className="font-medium">{selectedMessage.context.recentTopic}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Message Editor */}
              <div>
                <label className="text-sm font-medium mb-2 block">Message Content</label>
                <Textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="min-h-[200px]"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  {editedContent.length} characters • Recommended: 150-300 characters
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={closeEditor}>
              Cancel
            </Button>
            <Button variant="destructive" className="gap-1">
              <XCircle className="w-4 h-4" />
              Reject
            </Button>
            <Button className="gap-1">
              <CheckCircle className="w-4 h-4" />
              Approve & Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
