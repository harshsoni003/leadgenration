import {
  MapPin,
  Building,
  Users,
  Link as LinkIcon,
  Eye,
  BarChart3,
  Briefcase,
  GraduationCap,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Lead } from "./LeadsTable";

interface LeadProfileModalProps {
  lead: Lead | null;
  open: boolean;
  onClose: () => void;
}

const LeadProfileModal = ({ lead, open, onClose }: LeadProfileModalProps) => {
  if (!lead) return null;

  // Generate dummy detailed data based on lead
  const profileData = {
    headline: `${lead.title} at ${lead.company} | Helping businesses scale through innovation`,
    about: `I'm a ${lead.title} with a passion for building modern, user-friendly solutions. I specialize in strategic leadership, business development, and scaling operations, helping businesses create efficient and scalable solutions.\n\nI'm focused on driving growth and building high-performing teams that deliver exceptional results.`,
    education: "MBA, Business Administration",
    university: "Wharton School of Business",
    skills: ["Leadership", "Business Strategy", "Sales", "Team Building", "Operations"],
    profileViews: Math.floor(Math.random() * 200) + 50,
    postImpressions: Math.floor(Math.random() * 1000) + 200,
    connections: "500+",
    experience: [
      {
        title: lead.title,
        company: lead.company,
        duration: "2019 - Present",
        description: `Leading strategic initiatives and driving company growth.`,
      },
      {
        title: "VP of Operations",
        company: "Previous Corp",
        duration: "2015 - 2019",
        description: "Managed operations and scaled the team from 20 to 100+.",
      },
    ],
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        {/* Cover Image */}
        <div className="h-24 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/10 relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-background/80 hover:bg-background"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Profile Header */}
        <div className="px-6 -mt-12 relative">
          <div className="flex items-end gap-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-3xl font-bold border-4 border-background shadow-lg">
              {lead.name.charAt(0)}
            </div>
          </div>

          <div className="mt-3">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-foreground">{lead.name}</h2>
              <Badge variant="outline" className="text-xs">He/Him</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{profileData.headline}</p>
            
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {lead.location}
              </span>
              <span className="text-primary hover:underline cursor-pointer">Contact info</span>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-primary font-medium">{lead.followers} followers</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-sm text-muted-foreground">{profileData.connections} connections</span>
            </div>

            <div className="flex items-center gap-2 mt-3 text-sm">
              <Building className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{lead.company}</span>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <Button size="sm" className="rounded-full">Open to</Button>
            <Button size="sm" variant="outline" className="rounded-full">Add profile section</Button>
            <Button size="sm" variant="outline" className="rounded-full">Enhance profile</Button>
            <Button size="sm" variant="outline" className="rounded-full">Resources</Button>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Analytics Section */}
        <div className="px-6">
          <div className="p-4 rounded-lg border bg-card">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-foreground">Analytics</h3>
              <Badge variant="outline" className="text-xs">Private to you</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-3">
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-semibold text-foreground">{profileData.profileViews} profile views</p>
                  <p className="text-xs text-muted-foreground">Discover who's viewed your profile.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-semibold text-foreground">{profileData.postImpressions} post impressions</p>
                  <p className="text-xs text-muted-foreground">Check out who's engaging with your posts.</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3 cursor-pointer hover:text-primary">
              Show all analytics →
            </p>
          </div>
        </div>

        <Separator className="my-4" />

        {/* About Section */}
        <div className="px-6">
          <h3 className="font-semibold text-foreground mb-3">About</h3>
          <p className="text-sm text-muted-foreground whitespace-pre-line">{profileData.about}</p>
        </div>

        <Separator className="my-4" />

        {/* Experience Section */}
        <div className="px-6">
          <h3 className="font-semibold text-foreground mb-3">Experience</h3>
          <div className="space-y-4">
            {profileData.experience.map((exp, idx) => (
              <div key={idx} className="flex gap-3">
                <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{exp.title}</p>
                  <p className="text-sm text-muted-foreground">{exp.company}</p>
                  <p className="text-xs text-muted-foreground">{exp.duration}</p>
                  <p className="text-sm text-muted-foreground mt-1">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-4" />

        {/* Skills Section */}
        <div className="px-6 pb-6">
          <h3 className="font-semibold text-foreground mb-3">Top skills</h3>
          <div className="flex flex-wrap gap-2">
            {profileData.skills.map((skill, idx) => (
              <Badge key={idx} variant="secondary" className="text-sm">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadProfileModal;
