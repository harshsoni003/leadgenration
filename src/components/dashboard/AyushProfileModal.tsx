import { X, Linkedin, Bell, MapPin, Building, Users, GraduationCap, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import ayushProfile from "@/assets/ayush-profile.png";

interface AyushProfileModalProps {
  open: boolean;
  onClose: () => void;
}

const AyushProfileModal = ({ open, onClose }: AyushProfileModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden bg-white border-border/50 shadow-2xl max-h-[90vh]">
        <ScrollArea className="max-h-[90vh]">
          {/* Banner */}
          <div className="relative h-24 bg-gradient-to-r from-[#7fc7d4] to-[#8bc9c9]">
            <button 
              onClick={onClose}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors"
            >
              <X className="w-4 h-4 text-foreground" />
            </button>
          </div>

          {/* Profile Picture */}
          <div className="relative px-6">
            <div className="absolute -top-12 left-6">
              <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-lg">
                <img 
                  src={ayushProfile} 
                  alt="Ayusharyan Sinha"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-14 px-6 pb-6">
            {/* Header Info */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold text-foreground">Ayusharyan sinha</h2>
                  <Badge variant="outline" className="text-xs font-normal bg-secondary/50">He/Him</Badge>
                  <span className="text-muted-foreground text-sm">· 1st</span>
                </div>
                <p className="text-sm text-foreground mt-0.5">AI Developer focused on Automation</p>
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Mumbai, Maharashtra, India · <span className="text-[#0a66c2] hover:underline cursor-pointer">Contact info</span>
                </p>
                <p className="text-xs text-[#0a66c2] mt-1">1,215 followers · 500+ connections</p>
              </div>
              <div className="flex gap-2">
                <Linkedin className="w-5 h-5 text-[#0a66c2]" />
                <Bell className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>

            {/* Company Info */}
            <div className="flex items-center gap-4 mb-4 text-sm">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">Braind AI</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">Vidyalankar Institute of Technology, Mumbai</span>
              </div>
            </div>

            {/* Mutual Connection */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
              <div className="flex -space-x-2">
                <div className="w-5 h-5 rounded-full bg-secondary border border-white" />
                <div className="w-5 h-5 rounded-full bg-secondary border border-white" />
              </div>
              <span>Dhananjay Patel, Ph.D, Dr. Pratik Mhatre, and 777 other mutual connections</span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mb-6">
              <Button className="bg-[#0a66c2] hover:bg-[#004182] text-white gap-1.5 rounded-full px-4">
                <Send className="w-4 h-4" />
                Message
              </Button>
              <Button variant="outline" className="rounded-full px-4">
                More
              </Button>
            </div>

            {/* Highlights Section */}
            <div className="border-t border-border pt-4 mb-4">
              <h3 className="font-semibold text-foreground mb-3">Highlights</h3>
              <div className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg">
                <GraduationCap className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">You both studied at Vidyalankar Institute of Technology, Mumbai</p>
                  <p className="text-xs text-muted-foreground mt-0.5">You both studied at Vidyalankar Institute of Technology, Mumbai from 2022 to 2026</p>
                  <Button variant="outline" size="sm" className="mt-2 gap-1.5 text-xs h-7">
                    <Send className="w-3 h-3" />
                    Message
                  </Button>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="border-t border-border pt-4">
              <h3 className="font-semibold text-foreground mb-3">About</h3>
              <div className="text-sm text-muted-foreground space-y-3">
                <p>
                  Currently pursuing a Bachelor of Technology in Electronics and Computer Science at Vidyalankar Institute of Technology, 
                  this professional is an AI Developer at Braind AI, contributing to innovative projects in automation and chatbot development. 
                  Their academic background and hands-on experience have equipped them with a robust foundation in advanced technologies 
                  like chatbot design and optimization.
                </p>
                <p>
                  At Braind AI, they work on developing cutting-edge AI solutions, leveraging their skills in automation and chatbot development. 
                  Their collaborative approach and commitment to impactful innovation align with the organization's goals, 
                  ensuring the delivery of efficient and user-centric technologies that enhance user experiences.
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AyushProfileModal;
