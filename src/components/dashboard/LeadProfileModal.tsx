import {
  MapPin,
  Building,
  Users,
  Eye,
  BarChart3,
  Briefcase,
  X,
  Pencil,
  Shield,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
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
  const profileData = lead.name === "Pratik Kadam" ? {
    headline: `building AgenticOs @customaistudio.io | Building the platform for Executives and not developers | Context Engineering | Prompt Engineering`,
    about: `I am building AI Agent's which solve real life business.`,
    profileViews: 246,
    postImpressions: 188,
    connections: "500+",
    pronouns: "He/Him",
  } : {
    headline: `${lead.title} at ${lead.company} | Helping businesses scale through innovation`,
    about: `I'm a ${lead.title} with a passion for building modern, user-friendly solutions.`,
    profileViews: Math.floor(Math.random() * 200) + 50,
    postImpressions: Math.floor(Math.random() * 1000) + 200,
    connections: "500+",
    pronouns: "He/Him",
  };

  // Generate initials or use first letter
  const getInitials = (name: string) => {
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return parts[0][0] + parts[1][0];
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 bg-white">
        {/* Cover Image with Audio Waveform */}
        <div className="h-64 bg-black relative overflow-hidden">
          {/* Use actual banner if available, otherwise show waveform */}
          {lead.name === "Pratik Kadam" ? (
            <img
              src="/assets/pratik-banner.jpg"
              alt="Profile Banner"
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              {/* Audio Waveform Visualization */}
              <div className="absolute inset-0 flex items-end justify-center px-8 pb-4">
                <div className="flex items-end gap-[2px] h-24 w-full max-w-3xl">
                  {Array.from({ length: 120 }).map((_, i) => {
                    const height = Math.random() * 100;
                    const isHighlight = i > 80;
                    return (
                      <div
                        key={i}
                        className={`flex-1 rounded-sm transition-all ${isHighlight ? "bg-white" : "bg-white/40"
                          }`}
                        style={{ height: `${height}%` }}
                      />
                    );
                  })}
                </div>
                {/* AI Label */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded text-white text-sm font-medium">
                  AI ▼
                </div>
              </div>
            </>
          )}
        </div>

        {/* Profile Section */}
        <div className="px-8 -mt-20 relative bg-white">
          <div className="flex items-end gap-4">
            {/* Profile Picture */}
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-5xl font-bold border-4 border-white shadow-lg overflow-hidden">
              {lead.avatar ? (
                <img
                  src={lead.avatar}
                  alt={lead.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-600">
                  {getInitials(lead.name)}
                </div>
              )}
            </div>

            {/* Edit Profile Button */}
            <Button
              variant="ghost"
              size="icon"
              className="mb-2 ml-auto bg-white hover:bg-gray-50 rounded-full w-10 h-10 border border-gray-300"
            >
              <Pencil className="w-4 h-4 text-gray-700" />
            </Button>
          </div>

          <div className="mt-4">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-gray-900">{lead.name}</h2>
              <Shield className="w-5 h-5 text-gray-500" />
              <Badge variant="outline" className="text-xs text-gray-600 border-gray-300 bg-white font-normal">
                {profileData.pronouns}
              </Badge>
            </div>
            <p className="text-base text-gray-900 mt-2 leading-relaxed">
              {profileData.headline}
            </p>

            <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                {lead.location}
              </span>
              <span>·</span>
              <span className="text-blue-600 hover:underline cursor-pointer font-semibold">
                Contact info
              </span>
            </div>

            <div className="flex items-center gap-2 mt-2 text-sm">
              <span className="text-blue-600 font-semibold hover:underline cursor-pointer">
                {lead.followers} followers
              </span>
              <span className="text-gray-600">·</span>
              <span className="text-gray-600">{profileData.connections} connections</span>
            </div>

            <div className="flex gap-2 mt-4 flex-wrap">
              <Button size="sm" className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4">
                Open to
              </Button>
              <Button size="sm" variant="outline" className="rounded-full border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-4">
                Add profile section
              </Button>
              <Button size="sm" variant="outline" className="rounded-full border-gray-400 text-gray-700 hover:bg-gray-50 font-semibold px-4">
                Enhance profile
              </Button>
              <Button size="sm" variant="outline" className="rounded-full border-gray-400 text-gray-700 hover:bg-gray-50 font-semibold px-4">
                Resources
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Analytics Section */}
        <div className="px-8">
          <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900">Analytics</h3>
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <Eye className="w-3 h-3" />
                <span>Private to you</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-4">
              <div className="flex items-start gap-3">
                <Users className="w-6 h-6 text-gray-600 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">{profileData.profileViews} profile views</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Discover who's viewed your profile.
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Past 7 days</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BarChart3 className="w-6 h-6 text-gray-600 mt-1" />
                <div>
                  <p className="font-semibold text-gray-900">{profileData.postImpressions} post impressions</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Check out who's engaging with your posts.
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Past 7 days</p>
                </div>
              </div>
            </div>
            <button className="text-sm text-gray-700 hover:text-blue-600 mt-4 font-semibold flex items-center gap-1">
              Show all analytics →
            </button>
          </div>
        </div>

        <Separator className="my-6" />

        {/* About Section */}
        <div className="px-8 pb-8">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900">About</h3>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-100 rounded-full w-8 h-8"
            >
              <Pencil className="w-4 h-4 text-gray-700" />
            </Button>
          </div>
          <p className="text-sm text-gray-900 leading-relaxed whitespace-pre-line">
            {profileData.about}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadProfileModal;
