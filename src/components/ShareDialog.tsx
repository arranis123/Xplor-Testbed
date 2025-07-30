import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Copy, Facebook, Instagram, Mail, ExternalLink, MessageCircle, Linkedin, 
  Youtube, Camera, Share, Heart, Users, Video, Twitch as TwitchIcon, 
  PlayCircle, Send, MessageSquare, Hash, Shield, FileText, Coffee,
  Briefcase, Palette, Globe, Zap, Rss, Cloud, Star
} from "lucide-react";
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

  // Social platform sharing functions
  const shareOnWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;
    window.open(whatsappUrl, '_blank');
  };

  const shareOnLinkedIn = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedinUrl, '_blank', 'width=600,height=400');
  };

  const shareOnYouTube = () => {
    copyToClipboard();
    toast({
      title: "Link copied for YouTube!",
      description: "Paste this link in your YouTube video description or community post.",
    });
  };

  const shareOnTikTok = () => {
    copyToClipboard();
    toast({
      title: "Link copied for TikTok!",
      description: "Paste this link in your TikTok bio or video description.",
    });
  };

  const shareOnSnapchat = () => {
    copyToClipboard();
    toast({
      title: "Link copied for Snapchat!",
      description: "Paste this link in your Snapchat story or send it to friends.",
    });
  };

  const shareOnPinterest = () => {
    const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&description=${encodeURIComponent(shareText)}`;
    window.open(pinterestUrl, '_blank', 'width=600,height=400');
  };

  const shareOnReddit = () => {
    const redditUrl = `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`;
    window.open(redditUrl, '_blank', 'width=600,height=400');
  };

  const shareOn500PX = () => {
    copyToClipboard();
    toast({
      title: "Link copied for 500PX!",
      description: "Paste this link in your 500PX profile or photo description.",
    });
  };

  const shareOnFlickr = () => {
    copyToClipboard();
    toast({
      title: "Link copied for Flickr!",
      description: "Paste this link in your Flickr photo description or profile.",
    });
  };

  const shareOnVSCO = () => {
    copyToClipboard();
    toast({
      title: "Link copied for VSCO!",
      description: "Paste this link in your VSCO profile or photo description.",
    });
  };

  const shareOnTwitch = () => {
    copyToClipboard();
    toast({
      title: "Link copied for Twitch!",
      description: "Paste this link in your Twitch bio or chat.",
    });
  };

  const shareOnRumble = () => {
    copyToClipboard();
    toast({
      title: "Link copied for Rumble!",
      description: "Paste this link in your Rumble video description.",
    });
  };

  const shareOnVimeo = () => {
    copyToClipboard();
    toast({
      title: "Link copied for Vimeo!",
      description: "Paste this link in your Vimeo video description.",
    });
  };

  const shareOnTelegram = () => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(telegramUrl, '_blank');
  };

  const shareOnMessenger = () => {
    const messengerUrl = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(shareUrl)}`;
    window.open(messengerUrl, '_blank', 'width=600,height=400');
  };

  const shareOnDiscord = () => {
    copyToClipboard();
    toast({
      title: "Link copied for Discord!",
      description: "Paste this link in your Discord server or DM.",
    });
  };

  const shareOnSignal = () => {
    copyToClipboard();
    toast({
      title: "Link copied for Signal!",
      description: "Paste this link in your Signal message.",
    });
  };

  const shareOnSubstack = () => {
    copyToClipboard();
    toast({
      title: "Link copied for Substack!",
      description: "Paste this link in your Substack post.",
    });
  };

  const shareOnMedium = () => {
    copyToClipboard();
    toast({
      title: "Link copied for Medium!",
      description: "Paste this link in your Medium article.",
    });
  };

  const shareOnPatreon = () => {
    copyToClipboard();
    toast({
      title: "Link copied for Patreon!",
      description: "Paste this link in your Patreon post.",
    });
  };

  const shareOnKofi = () => {
    copyToClipboard();
    toast({
      title: "Link copied for Ko-fi!",
      description: "Paste this link in your Ko-fi post or profile.",
    });
  };

  const shareOnBehance = () => {
    copyToClipboard();
    toast({
      title: "Link copied for Behance!",
      description: "Paste this link in your Behance project description.",
    });
  };

  const shareOnDribbble = () => {
    copyToClipboard();
    toast({
      title: "Link copied for Dribbble!",
      description: "Paste this link in your Dribbble shot description.",
    });
  };

  const shareOnWeChat = () => {
    copyToClipboard();
    toast({
      title: "Link copied for WeChat!",
      description: "Paste this link in your WeChat message or Moments.",
    });
  };

  const shareOnWeibo = () => {
    copyToClipboard();
    toast({
      title: "Link copied for Weibo!",
      description: "Paste this link in your Weibo post.",
    });
  };

  const shareOnDouyin = () => {
    copyToClipboard();
    toast({
      title: "Link copied for Douyin!",
      description: "Paste this link in your Douyin bio or video description.",
    });
  };

  const shareOnVK = () => {
    const vkUrl = `https://vk.com/share.php?url=${encodeURIComponent(shareUrl)}`;
    window.open(vkUrl, '_blank', 'width=600,height=400');
  };

  const shareOnLine = () => {
    const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`;
    window.open(lineUrl, '_blank', 'width=600,height=400');
  };

  const shareOnNaver = () => {
    copyToClipboard();
    toast({
      title: "Link copied for Naver!",
      description: "Paste this link in your Naver Blog or Cafe post.",
    });
  };

  const shareOnXiaohongshu = () => {
    copyToClipboard();
    toast({
      title: "Link copied for Xiaohongshu!",
      description: "Paste this link in your Little Red Book post.",
    });
  };

  const shareOnThreads = () => {
    copyToClipboard();
    toast({
      title: "Link copied for Threads!",
      description: "Paste this link in your Threads post.",
    });
  };

  const shareOnLemon8 = () => {
    copyToClipboard();
    toast({
      title: "Link copied for Lemon8!",
      description: "Paste this link in your Lemon8 post.",
    });
  };

  const shareOnMastodon = () => {
    copyToClipboard();
    toast({
      title: "Link copied for Mastodon!",
      description: "Paste this link in your Mastodon toot.",
    });
  };

  const shareOnBlueSky = () => {
    copyToClipboard();
    toast({
      title: "Link copied for BlueSky!",
      description: "Paste this link in your BlueSky post.",
    });
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
          <div className="space-y-4 max-h-96 overflow-y-auto">
            <Label>Share on Social Media & Platforms</Label>
            
            {/* Main Social Media */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Popular Platforms</h4>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm" onClick={shareOnWhatsApp} className="flex items-center gap-1 text-xs">
                  <MessageCircle className="h-3 w-3 text-green-600" />
                  WhatsApp
                </Button>
                <Button variant="outline" size="sm" onClick={shareOnFacebook} className="flex items-center gap-1 text-xs">
                  <Facebook className="h-3 w-3 text-blue-600" />
                  Facebook
                </Button>
                <Button variant="outline" size="sm" onClick={shareOnInstagram} className="flex items-center gap-1 text-xs">
                  <Instagram className="h-3 w-3 text-pink-600" />
                  Instagram
                </Button>
                <Button variant="outline" size="sm" onClick={shareOnX} className="flex items-center gap-1 text-xs">
                  <ExternalLink className="h-3 w-3" />
                  X (Twitter)
                </Button>
                <Button variant="outline" size="sm" onClick={shareOnLinkedIn} className="flex items-center gap-1 text-xs">
                  <Linkedin className="h-3 w-3 text-blue-700" />
                  LinkedIn
                </Button>
                <Button variant="outline" size="sm" onClick={shareOnTikTok} className="flex items-center gap-1 text-xs">
                  <Video className="h-3 w-3" />
                  TikTok
                </Button>
              </div>
            </div>

            {/* Video Platforms */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Video Platforms</h4>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm" onClick={shareOnYouTube} className="flex items-center gap-1 text-xs">
                  <Youtube className="h-3 w-3 text-red-600" />
                  YouTube
                </Button>
                <Button variant="outline" size="sm" onClick={shareOnTwitch} className="flex items-center gap-1 text-xs">
                  <TwitchIcon className="h-3 w-3 text-purple-600" />
                  Twitch
                </Button>
                <Button variant="outline" size="sm" onClick={shareOnVimeo} className="flex items-center gap-1 text-xs">
                  <PlayCircle className="h-3 w-3 text-blue-500" />
                  Vimeo
                </Button>
                <Button variant="outline" size="sm" onClick={shareOnRumble} className="flex items-center gap-1 text-xs">
                  <Video className="h-3 w-3 text-green-500" />
                  Rumble
                </Button>
              </div>
            </div>

            {/* Photo Platforms */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Photo Platforms</h4>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm" onClick={shareOnSnapchat} className="flex items-center gap-1 text-xs">
                  <Camera className="h-3 w-3 text-yellow-400" />
                  Snapchat
                </Button>
                <Button variant="outline" size="sm" onClick={shareOnPinterest} className="flex items-center gap-1 text-xs">
                  <Share className="h-3 w-3 text-red-600" />
                  Pinterest
                </Button>
                <Button variant="outline" size="sm" onClick={shareOn500PX} className="flex items-center gap-1 text-xs">
                  <Camera className="h-3 w-3" />
                  500PX
                </Button>
                <Button variant="outline" size="sm" onClick={shareOnFlickr} className="flex items-center gap-1 text-xs">
                  <Camera className="h-3 w-3 text-pink-500" />
                  Flickr
                </Button>
                <Button variant="outline" size="sm" onClick={shareOnVSCO} className="flex items-center gap-1 text-xs">
                  <Camera className="h-3 w-3" />
                  VSCO
                </Button>
              </div>
            </div>

            {/* Communication */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Messaging</h4>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm" onClick={shareOnTelegram} className="flex items-center gap-1 text-xs">
                  <Send className="h-3 w-3 text-blue-500" />
                  Telegram
                </Button>
                <Button variant="outline" size="sm" onClick={shareOnMessenger} className="flex items-center gap-1 text-xs">
                  <MessageSquare className="h-3 w-3 text-blue-600" />
                  Messenger
                </Button>
                <Button variant="outline" size="sm" onClick={shareOnDiscord} className="flex items-center gap-1 text-xs">
                  <Hash className="h-3 w-3 text-indigo-500" />
                  Discord
                </Button>
                <Button variant="outline" size="sm" onClick={shareOnSignal} className="flex items-center gap-1 text-xs">
                  <Shield className="h-3 w-3 text-blue-600" />
                  Signal
                </Button>
                <Button variant="outline" size="sm" onClick={shareOnWeChat} className="flex items-center gap-1 text-xs">
                  <MessageCircle className="h-3 w-3 text-green-500" />
                  WeChat
                </Button>
                <Button variant="outline" size="sm" onClick={shareOnLine} className="flex items-center gap-1 text-xs">
                  <MessageSquare className="h-3 w-3 text-green-600" />
                  Line
                </Button>
              </div>
            </div>

            {/* Communities */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Communities</h4>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm" onClick={shareOnReddit} className="flex items-center gap-1 text-xs">
                  <Users className="h-3 w-3 text-orange-600" />
                  Reddit
                </Button>
                <Button variant="outline" size="sm" onClick={shareOnMastodon} className="flex items-center gap-1 text-xs">
                  <Share className="h-3 w-3 text-purple-600" />
                  Mastodon
                </Button>
                <Button variant="outline" size="sm" onClick={shareOnBlueSky} className="flex items-center gap-1 text-xs">
                  <Cloud className="h-3 w-3 text-blue-500" />
                  BlueSky
                </Button>
                <Button variant="outline" size="sm" onClick={shareOnVK} className="flex items-center gap-1 text-xs">
                  <Users className="h-3 w-3 text-blue-600" />
                  VK
                </Button>
                <Button variant="outline" size="sm" onClick={shareOnThreads} className="flex items-center gap-1 text-xs">
                  <Share className="h-3 w-3" />
                  Threads
                </Button>
                <Button variant="outline" size="sm" onClick={shareOnLemon8} className="flex items-center gap-1 text-xs">
                  <Star className="h-3 w-3 text-yellow-500" />
                  Lemon8
                </Button>
              </div>
            </div>

            {/* Content Creation */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Content & Publishing</h4>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm" onClick={shareOnSubstack} className="flex items-center gap-1 text-xs">
                  <FileText className="h-3 w-3 text-orange-500" />
                  Substack
                </Button>
                <Button variant="outline" size="sm" onClick={shareOnMedium} className="flex items-center gap-1 text-xs">
                  <FileText className="h-3 w-3" />
                  Medium
                </Button>
                <Button variant="outline" size="sm" onClick={shareOnPatreon} className="flex items-center gap-1 text-xs">
                  <Heart className="h-3 w-3 text-orange-600" />
                  Patreon
                </Button>
                <Button variant="outline" size="sm" onClick={shareOnKofi} className="flex items-center gap-1 text-xs">
                  <Coffee className="h-3 w-3 text-blue-500" />
                  Ko-fi
                </Button>
              </div>
            </div>

            {/* Design & Creative */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Design & Creative</h4>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm" onClick={shareOnBehance} className="flex items-center gap-1 text-xs">
                  <Briefcase className="h-3 w-3 text-blue-600" />
                  Behance
                </Button>
                <Button variant="outline" size="sm" onClick={shareOnDribbble} className="flex items-center gap-1 text-xs">
                  <Palette className="h-3 w-3 text-pink-600" />
                  Dribbble
                </Button>
              </div>
            </div>

            {/* Asian Platforms */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Asian Platforms</h4>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm" onClick={shareOnWeibo} className="flex items-center gap-1 text-xs">
                  <Globe className="h-3 w-3 text-red-500" />
                  Weibo
                </Button>
                <Button variant="outline" size="sm" onClick={shareOnDouyin} className="flex items-center gap-1 text-xs">
                  <Video className="h-3 w-3" />
                  Douyin
                </Button>
                <Button variant="outline" size="sm" onClick={shareOnXiaohongshu} className="flex items-center gap-1 text-xs">
                  <Star className="h-3 w-3 text-red-600" />
                  Xiaohongshu
                </Button>
                <Button variant="outline" size="sm" onClick={shareOnNaver} className="flex items-center gap-1 text-xs">
                  <Globe className="h-3 w-3 text-green-600" />
                  Naver
                </Button>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Email</h4>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="outline" size="sm" onClick={shareViaEmail} className="flex items-center gap-1 text-xs">
                  <Mail className="h-3 w-3 text-gray-600" />
                  Email
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};