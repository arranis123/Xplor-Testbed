import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Facebook, Instagram, Mail, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  spaceName: string;
  spaceDescription: string;
  spaceUrl?: string;
}

export const ShareDialog = ({ open, onOpenChange, spaceName, spaceDescription, spaceUrl = window.location.href }: ShareDialogProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const shareUrl = spaceUrl;
  const shareText = `Check out this amazing virtual space: ${spaceName} - ${spaceDescription}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "The space link has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually.",
        variant: "destructive",
      });
    }
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  const shareOnX = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  const shareOnInstagram = () => {
    // Instagram doesn't have a direct URL sharing API like Facebook/Twitter
    // We'll copy the link and guide users to paste it in Instagram
    copyToClipboard();
    toast({
      title: "Link copied for Instagram!",
      description: "The link has been copied. You can now paste it in your Instagram post or story.",
    });
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`Check out this virtual space: ${spaceName}`);
    const body = encodeURIComponent(`${shareText}\n\nView the space here: ${shareUrl}`);
    const emailUrl = `mailto:?subject=${subject}&body=${body}`;
    window.location.href = emailUrl;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share "{spaceName}"</DialogTitle>
          <DialogDescription>
            Share this virtual space with others through various platforms.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Copy Link Section */}
          <div className="space-y-2">
            <Label htmlFor="share-url">Share Link</Label>
            <div className="flex gap-2">
              <Input
                id="share-url"
                value={shareUrl}
                readOnly
                className="flex-1"
              />
              <Button 
                variant="outline" 
                size="sm" 
                onClick={copyToClipboard}
                className="px-3"
              >
                {copied ? (
                  <span className="text-green-600">Copied!</span>
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Social Media Buttons */}
          <div className="space-y-3">
            <Label>Share on Social Media</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                onClick={shareOnFacebook}
                className="flex items-center gap-2"
              >
                <Facebook className="h-4 w-4 text-blue-600" />
                Facebook
              </Button>
              
              <Button 
                variant="outline" 
                onClick={shareOnX}
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                X (Twitter)
              </Button>
              
              <Button 
                variant="outline" 
                onClick={shareOnInstagram}
                className="flex items-center gap-2"
              >
                <Instagram className="h-4 w-4 text-pink-600" />
                Instagram
              </Button>
              
              <Button 
                variant="outline" 
                onClick={shareViaEmail}
                className="flex items-center gap-2"
              >
                <Mail className="h-4 w-4 text-gray-600" />
                Email
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};