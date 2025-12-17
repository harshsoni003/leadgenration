import { useState } from "react";
import { X, Sparkles, User, Building, MapPin, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import type { Lead } from "./LeadsTable";

interface MessageModalProps {
  lead: Lead | null;
  open: boolean;
  onClose: () => void;
}

const generateAIMessage = (lead: Lead) => {
  return `Hi ${lead.name.split(" ")[0]},

I saw your recent activity at the ${lead.eventSignals[0] || "industry event"} - congratulations on the impressive work you're doing at ${lead.company}!

With your company's growth trajectory and your focus on scaling operations, I thought you might be interested in learning how other ${lead.title}s in the ${lead.location.split(",")[1]?.trim() || "region"} area have been able to 10x their sales team productivity.

Would you be open to a quick 15-minute call this week to explore if there's a fit?

Best regards`;
};

const MessageModal = ({ lead, open, onClose }: MessageModalProps) => {
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Generate message when lead changes
  useState(() => {
    if (lead) {
      setMessage(generateAIMessage(lead));
    }
  });

  if (!lead) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl glass border-border/50 shadow-xl">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-lg font-semibold">
                Review AI Draft for {lead.name}
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                Personalized outreach based on lead context
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-3 gap-6 py-4">
          {/* Message Editor */}
          <div className="md:col-span-2 space-y-4">
            <div className="relative">
              <Textarea
                value={message || generateAIMessage(lead)}
                onChange={(e) => setMessage(e.target.value)}
                className={cn(
                  "min-h-[280px] resize-none transition-all duration-200",
                  "bg-secondary/30 border-border focus:border-primary/50",
                  isEditing && "ring-2 ring-primary/20"
                )}
                onFocus={() => setIsEditing(true)}
                onBlur={() => setIsEditing(false)}
              />
              {isEditing && (
                <Badge className="absolute top-2 right-2 bg-primary/10 text-primary border-0">
                  Editing
                </Badge>
              )}
            </div>

            <div className="flex items-center justify-end gap-3">
              <Button variant="outline" onClick={onClose}>
                Edit
              </Button>
              <Button variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/10">
                Reject
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground animate-pulse-soft">
                Approve & Send
              </Button>
            </div>
          </div>

          {/* Lead Context Sidebar */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-secondary/50 border border-border/50">
              <h4 className="text-sm font-semibold text-foreground mb-3">Lead Context</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{lead.title}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Building className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{lead.company}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{lead.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{lead.followers} Followers</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Fit Score</span>
                <span className="text-2xl font-bold text-primary">{lead.totalScore}</span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                  style={{ width: `${lead.totalScore}%` }}
                />
              </div>
            </div>

            {lead.eventSignals.length > 0 && (
              <div className="p-4 rounded-xl bg-secondary/50 border border-border/50">
                <h4 className="text-sm font-semibold text-foreground mb-2">Event Signals</h4>
                <div className="flex flex-wrap gap-2">
                  {lead.eventSignals.map((signal, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="bg-accent/10 text-accent border-accent/20"
                    >
                      {signal}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessageModal;
