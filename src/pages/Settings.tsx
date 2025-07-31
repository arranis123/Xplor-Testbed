import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  CreditCard, 
  Bell, 
  Shield, 
  Globe, 
  Camera, 
  Download,
  Mail,
  Phone,
  Building,
  MapPin,
  Calendar,
  Crown,
  AlertTriangle,
  Check
} from "lucide-react";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState("public");
  const [createPin, setCreatePin] = useState("");
  const [pinRequestEmail, setPinRequestEmail] = useState("");

  const timezones = [
    { value: "utc", label: "UTC (Coordinated Universal Time)" },
    { value: "america/new_york", label: "America/New York (EST/EDT)" },
    { value: "america/chicago", label: "America/Chicago (CST/CDT)" },
    { value: "america/denver", label: "America/Denver (MST/MDT)" },
    { value: "america/los_angeles", label: "America/Los Angeles (PST/PDT)" },
    { value: "america/anchorage", label: "America/Anchorage (AKST/AKDT)" },
    { value: "pacific/honolulu", label: "Pacific/Honolulu (HST)" },
    { value: "america/toronto", label: "America/Toronto (EST/EDT)" },
    { value: "america/vancouver", label: "America/Vancouver (PST/PDT)" },
    { value: "america/mexico_city", label: "America/Mexico City (CST/CDT)" },
    { value: "america/sao_paulo", label: "America/Sao Paulo (BRT)" },
    { value: "america/argentina/buenos_aires", label: "America/Buenos Aires (ART)" },
    { value: "europe/london", label: "Europe/London (GMT/BST)" },
    { value: "europe/paris", label: "Europe/Paris (CET/CEST)" },
    { value: "europe/berlin", label: "Europe/Berlin (CET/CEST)" },
    { value: "europe/rome", label: "Europe/Rome (CET/CEST)" },
    { value: "europe/madrid", label: "Europe/Madrid (CET/CEST)" },
    { value: "europe/amsterdam", label: "Europe/Amsterdam (CET/CEST)" },
    { value: "europe/zurich", label: "Europe/Zurich (CET/CEST)" },
    { value: "europe/vienna", label: "Europe/Vienna (CET/CEST)" },
    { value: "europe/prague", label: "Europe/Prague (CET/CEST)" },
    { value: "europe/warsaw", label: "Europe/Warsaw (CET/CEST)" },
    { value: "europe/stockholm", label: "Europe/Stockholm (CET/CEST)" },
    { value: "europe/helsinki", label: "Europe/Helsinki (EET/EEST)" },
    { value: "europe/moscow", label: "Europe/Moscow (MSK)" },
    { value: "europe/istanbul", label: "Europe/Istanbul (TRT)" },
    { value: "asia/dubai", label: "Asia/Dubai (GST)" },
    { value: "asia/karachi", label: "Asia/Karachi (PKT)" },
    { value: "asia/kolkata", label: "Asia/Kolkata (IST)" },
    { value: "asia/dhaka", label: "Asia/Dhaka (BST)" },
    { value: "asia/bangkok", label: "Asia/Bangkok (ICT)" },
    { value: "asia/jakarta", label: "Asia/Jakarta (WIB)" },
    { value: "asia/singapore", label: "Asia/Singapore (SGT)" },
    { value: "asia/hong_kong", label: "Asia/Hong Kong (HKT)" },
    { value: "asia/taipei", label: "Asia/Taipei (CST)" },
    { value: "asia/manila", label: "Asia/Manila (PST)" },
    { value: "asia/tokyo", label: "Asia/Tokyo (JST)" },
    { value: "asia/seoul", label: "Asia/Seoul (KST)" },
    { value: "asia/shanghai", label: "Asia/Shanghai (CST)" },
    { value: "australia/sydney", label: "Australia/Sydney (AEST/AEDT)" },
    { value: "australia/melbourne", label: "Australia/Melbourne (AEST/AEDT)" },
    { value: "australia/brisbane", label: "Australia/Brisbane (AEST)" },
    { value: "australia/perth", label: "Australia/Perth (AWST)" },
    { value: "pacific/auckland", label: "Pacific/Auckland (NZST/NZDT)" },
    { value: "pacific/fiji", label: "Pacific/Fiji (FJT)" },
    { value: "africa/cairo", label: "Africa/Cairo (EET)" },
    { value: "africa/johannesburg", label: "Africa/Johannesburg (SAST)" },
    { value: "africa/lagos", label: "Africa/Lagos (WAT)" },
    { value: "africa/nairobi", label: "Africa/Nairobi (EAT)" }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Account Settings</h1>
          <p className="text-muted-foreground">Manage your <span className="font-typografix">xplor</span> account preferences and settings</p>
        </div>
        <Badge variant="secondary" className="bg-xplor-yellow/10 text-xplor-yellow-dark">
          <Crown className="h-3 w-3 mr-1" />
          Pro Plan
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Account
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Privacy
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Preferences
          </TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Picture */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
                <CardDescription>Update your profile photo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button size="sm">
                      <Camera className="h-4 w-4 mr-2" />
                      Upload Photo
                    </Button>
                    <Button variant="outline" size="sm">Remove</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                </div>
                <Button className="w-full md:w-auto">Save Changes</Button>
              </CardContent>
            </Card>
          </div>

          {/* Company Information */}
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Update your organization details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" defaultValue="Acme Real Estate" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select defaultValue="real-estate">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="real-estate">Real Estate</SelectItem>
                      <SelectItem value="architecture">Architecture</SelectItem>
                      <SelectItem value="construction">Construction</SelectItem>
                      <SelectItem value="hospitality">Hospitality</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="123 Main Street, Suite 100" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue="San Francisco" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" defaultValue="CA" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" defaultValue="94105" />
                </div>
              </div>
              <Button>Update Company Info</Button>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Two-Factor Authentication</div>
                  <div className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </div>
                </div>
                <Switch
                  checked={twoFactorEnabled}
                  onCheckedChange={setTwoFactorEnabled}
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <Button variant="outline">Change Password</Button>
                <Button variant="outline" className="ml-2">Download Backup Codes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          {/* Current Plan */}
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>Manage your subscription and billing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-xplor-yellow/5">
                <div className="flex items-center gap-3">
                  <Crown className="h-6 w-6 text-xplor-yellow" />
                  <div>
                    <h3 className="font-semibold">Professional Plan</h3>
                    <p className="text-sm text-muted-foreground">100 active spaces, unlimited scans</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">$69</div>
                  <div className="text-sm text-muted-foreground">per month</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Change Plan</Button>
                <Button variant="outline">Cancel Subscription</Button>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Manage your payment information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-6 w-6" />
                  <div>
                    <div className="font-medium">•••• •••• •••• 4242</div>
                    <div className="text-sm text-muted-foreground">Expires 12/25</div>
                  </div>
                </div>
                <Badge variant="secondary">Primary</Badge>
              </div>
              <Button variant="outline">Add Payment Method</Button>
            </CardContent>
          </Card>

          {/* Billing History */}
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>Download invoices and view payment history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { date: "Dec 1, 2024", amount: "$69.00", status: "Paid", invoice: "INV-001" },
                  { date: "Nov 1, 2024", amount: "$69.00", status: "Paid", invoice: "INV-002" },
                  { date: "Oct 1, 2024", amount: "$69.00", status: "Paid", invoice: "INV-003" },
                ].map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="font-medium">{payment.amount}</div>
                        <div className="text-sm text-muted-foreground">{payment.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        <Check className="h-3 w-3 mr-1" />
                        {payment.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Invoice
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Choose which emails you'd like to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Account Activity</div>
                  <div className="text-sm text-muted-foreground">
                    Security alerts, login notifications, and account changes
                  </div>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Scan Processing</div>
                  <div className="text-sm text-muted-foreground">
                    Updates when your scans are processed and ready
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Marketing Communications</div>
                  <div className="text-sm text-muted-foreground">
                    Product updates, tips, and promotional content
                  </div>
                </div>
                <Switch
                  checked={marketingEmails}
                  onCheckedChange={setMarketingEmails}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Weekly Reports</div>
                  <div className="text-sm text-muted-foreground">
                    Summary of your space views and activity
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data & Privacy</CardTitle>
              <CardDescription>Control how your data is used and shared</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="font-medium">Analytics & Performance</div>
                  <div className="text-sm text-muted-foreground">
                    Allow us to collect anonymous usage data to improve our service
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="profileVisibility">Profile Visibility</Label>
                  <Select value={profileVisibility} onValueChange={setProfileVisibility}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="text-sm text-muted-foreground">
                    Control how your profile is visible to other <span className="font-typografix">xplor</span> users
                  </div>
                </div>
                
                {profileVisibility === "private" && (
                  <div className="space-y-4 p-4 border border-border rounded-lg bg-muted/20">
                    <div className="space-y-2">
                      <Label htmlFor="createPin">Create Pin</Label>
                      <Input 
                        id="createPin" 
                        value={createPin}
                        onChange={(e) => setCreatePin(e.target.value)}
                        placeholder="Enter a PIN for private access" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pinRequestEmail">Email for PIN Requests</Label>
                      <Input 
                        id="pinRequestEmail" 
                        type="email"
                        value={pinRequestEmail}
                        onChange={(e) => setPinRequestEmail(e.target.value)}
                        placeholder="admin@company.com" 
                      />
                      <div className="text-xs text-muted-foreground">
                        Note: This email will only be visible to admin
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <Separator />
              <div className="space-y-3">
                <h4 className="font-medium">Data Export & Deletion</h4>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export My Data
                  </Button>
                  <Button variant="destructive">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Display Preferences</CardTitle>
              <CardDescription>Customize your <span className="font-typografix">xplor</span> experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="america/new_york">
                  <SelectTrigger className="w-96">
                    <SelectValue placeholder="Select your timezone" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    {timezones.map((timezone) => (
                      <SelectItem key={timezone.value} value={timezone.value}>
                        {timezone.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="units">Measurement Units</Label>
                <Select defaultValue="imperial">
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="imperial">Imperial (ft, in)</SelectItem>
                    <SelectItem value="metric">Metric (m, cm)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;