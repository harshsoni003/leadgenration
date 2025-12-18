import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import ayushLinkedInProfile from "@/assets/ayush-linkedin-profile.png";

interface AyushProfileModalProps {
  open: boolean;
  onClose: () => void;
}

const AyushProfileModal = ({ open, onClose }: AyushProfileModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden bg-white border-border/50 shadow-2xl max-h-[90vh]">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/90 hover:bg-white transition-colors shadow-md"
        >
          <X className="w-4 h-4 text-foreground" />
        </button>
        <ScrollArea className="max-h-[90vh]">
          <img 
            src={ayushLinkedInProfile} 
            alt="Ayush Aryan Sinha LinkedIn Profile"
            className="w-full h-auto"
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AyushProfileModal;
