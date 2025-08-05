import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Check, 
  X, 
  Trash2, 
  MoreHorizontal,
  Mail,
  FileText,
  Ship,
  Euro
} from "lucide-react";
import { toast } from "sonner";

interface FairShareMember {
  id: string;
  fullName: string;
  email: string;
  roleOnboard: string;
  yachtName: string;
  yachtStatus: "listed" | "unlisted";
  crewStatus: "pending" | "verified" | "rejected";
  charterEligibility: "eligible" | "not-eligible";
  joinedDate: string;
  uploadedProof: boolean;
  charterHistory: number;
  totalPayout: number;
}

// Mock data for demonstration
const mockMembers: FairShareMember[] = [
  {
    id: "1",
    fullName: "Captain John Smith",
    email: "john.smith@example.com",
    roleOnboard: "Captain",
    yachtName: "Ocean Dream",
    yachtStatus: "listed",
    crewStatus: "verified",
    charterEligibility: "eligible",
    joinedDate: "2024-01-15",
    uploadedProof: true,
    charterHistory: 5,
    totalPayout: 2500.00
  },
  {
    id: "2",
    fullName: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    roleOnboard: "Chief Stew",
    yachtName: "Sea Breeze",
    yachtStatus: "listed",
    crewStatus: "pending",
    charterEligibility: "not-eligible",
    joinedDate: "2024-02-20",
    uploadedProof: true,
    charterHistory: 0,
    totalPayout: 0.00
  },
  {
    id: "3",
    fullName: "Mike Rodriguez",
    email: "mike.rodriguez@example.com",
    roleOnboard: "Engineer",
    yachtName: "Luxury Wave",
    yachtStatus: "unlisted",
    crewStatus: "verified",
    charterEligibility: "not-eligible",
    joinedDate: "2024-01-30",
    uploadedProof: true,
    charterHistory: 0,
    totalPayout: 0.00
  }
];

export default function FairShareMembersManagement() {
  const [members, setMembers] = useState<FairShareMember[]>(mockMembers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [eligibilityFilter, setEligibilityFilter] = useState<string>("all");
  const [selectedMember, setSelectedMember] = useState<FairShareMember | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Filter and search logic
  const filteredMembers = members.filter(member => {
    const matchesSearch = 
      member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.yachtName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.roleOnboard.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || member.crewStatus === statusFilter;
    const matchesEligibility = eligibilityFilter === "all" || member.charterEligibility === eligibilityFilter;

    return matchesSearch && matchesStatus && matchesEligibility;
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline"; className?: string }> = {
      verified: { variant: "default", className: "bg-green-100 text-green-800 border-green-200" },
      pending: { variant: "secondary", className: "bg-yellow-100 text-yellow-800 border-yellow-200" },
      rejected: { variant: "destructive" },
      eligible: { variant: "default", className: "bg-green-100 text-green-800 border-green-200" },
      "not-eligible": { variant: "outline", className: "bg-red-50 text-red-700 border-red-200" },
      listed: { variant: "default", className: "bg-blue-100 text-blue-800 border-blue-200" },
      unlisted: { variant: "outline" }
    };

    const config = variants[status] || { variant: "outline" };
    
    return (
      <Badge variant={config.variant} className={config.className}>
        {status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")}
      </Badge>
    );
  };

  const handleAction = (action: string, memberId: string) => {
    const member = members.find(m => m.id === memberId);
    if (!member) return;

    switch (action) {
      case "verify":
        setMembers(prev => prev.map(m => 
          m.id === memberId 
            ? { ...m, crewStatus: "verified", charterEligibility: m.yachtStatus === "listed" ? "eligible" : "not-eligible" }
            : m
        ));
        toast.success(`${member.fullName} has been verified`);
        break;
      case "reject":
        setMembers(prev => prev.map(m => 
          m.id === memberId 
            ? { ...m, crewStatus: "rejected", charterEligibility: "not-eligible" }
            : m
        ));
        toast.success(`${member.fullName} has been rejected`);
        break;
      case "delete":
        setMembers(prev => prev.filter(m => m.id !== memberId));
        toast.success(`${member.fullName} has been removed from FairShare`);
        break;
    }
  };

  const exportToCSV = () => {
    const headers = [
      "Full Name", "Email", "Role Onboard", "Yacht Name", "Yacht Status", 
      "Crew Status", "Charter Eligibility", "Joined Date", "Charter History", "Total Payout"
    ];
    
    const csvContent = [
      headers.join(","),
      ...filteredMembers.map(member => [
        `"${member.fullName}"`,
        `"${member.email}"`,
        `"${member.roleOnboard}"`,
        `"${member.yachtName}"`,
        `"${member.yachtStatus}"`,
        `"${member.crewStatus}"`,
        `"${member.charterEligibility}"`,
        `"${member.joinedDate}"`,
        member.charterHistory,
        member.totalPayout.toFixed(2)
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fairshare_members.csv';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("FairShare members exported to CSV");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">FairShare Members</h2>
          <p className="text-muted-foreground">
            Manage crew members in the FairShare commission program
          </p>
        </div>
        <Button onClick={exportToCSV} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Members</p>
                <p className="text-2xl font-bold">{members.length}</p>
              </div>
              <Ship className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Verified</p>
                <p className="text-2xl font-bold text-green-600">
                  {members.filter(m => m.crewStatus === "verified").length}
                </p>
              </div>
              <Check className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Eligible</p>
                <p className="text-2xl font-bold text-blue-600">
                  {members.filter(m => m.charterEligibility === "eligible").length}
                </p>
              </div>
              <Ship className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Payouts</p>
                <p className="text-2xl font-bold text-green-600">
                  €{members.reduce((sum, m) => sum + m.totalPayout, 0).toFixed(2)}
                </p>
              </div>
              <Euro className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by name, email, yacht, or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Crew Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={eligibilityFilter} onValueChange={setEligibilityFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Eligibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Eligibility</SelectItem>
                <SelectItem value="eligible">Eligible</SelectItem>
                <SelectItem value="not-eligible">Not Eligible</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Members Table */}
      <Card>
        <CardHeader>
          <CardTitle>Members ({filteredMembers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Yacht</TableHead>
                  <TableHead>Yacht Status</TableHead>
                  <TableHead>Crew Status</TableHead>
                  <TableHead>Eligibility</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Charters</TableHead>
                  <TableHead>Payout</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.fullName}</TableCell>
                    <TableCell>
                      <a 
                        href={`mailto:${member.email}`}
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        <Mail className="h-3 w-3 mr-1" />
                        {member.email}
                      </a>
                    </TableCell>
                    <TableCell>{member.roleOnboard}</TableCell>
                    <TableCell>
                      <button 
                        onClick={() => toast.info(`View yacht: ${member.yachtName}`)}
                        className="text-blue-600 hover:underline"
                      >
                        {member.yachtName}
                      </button>
                    </TableCell>
                    <TableCell>{getStatusBadge(member.yachtStatus)}</TableCell>
                    <TableCell>{getStatusBadge(member.crewStatus)}</TableCell>
                    <TableCell>{getStatusBadge(member.charterEligibility)}</TableCell>
                    <TableCell>{new Date(member.joinedDate).toLocaleDateString()}</TableCell>
                    <TableCell>{member.charterHistory}</TableCell>
                    <TableCell>€{member.totalPayout.toFixed(2)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedMember(member);
                              setShowDetails(true);
                            }}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          {member.crewStatus === "pending" && (
                            <DropdownMenuItem
                              onClick={() => handleAction("verify", member.id)}
                            >
                              <Check className="h-4 w-4 mr-2" />
                              Verify
                            </DropdownMenuItem>
                          )}
                          {member.crewStatus !== "rejected" && (
                            <DropdownMenuItem
                              onClick={() => handleAction("reject", member.id)}
                            >
                              <X className="h-4 w-4 mr-2" />
                              Reject
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() => toast.info("Edit functionality coming soon")}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleAction("delete", member.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredMembers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No members found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Member Details Modal */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Member Details</DialogTitle>
            <DialogDescription>
              Detailed information for {selectedMember?.fullName}
            </DialogDescription>
          </DialogHeader>
          
          {selectedMember && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                  <p className="text-sm">{selectedMember.fullName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-sm">{selectedMember.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Role Onboard</label>
                  <p className="text-sm">{selectedMember.roleOnboard}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Yacht</label>
                  <p className="text-sm">{selectedMember.yachtName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Crew Status</label>
                  <div className="mt-1">{getStatusBadge(selectedMember.crewStatus)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Charter Eligibility</label>
                  <div className="mt-1">{getStatusBadge(selectedMember.charterEligibility)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Joined Date</label>
                  <p className="text-sm">{new Date(selectedMember.joinedDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Charter History</label>
                  <p className="text-sm">{selectedMember.charterHistory} charters</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Total Payout</label>
                  <p className="text-sm font-medium text-green-600">€{selectedMember.totalPayout.toFixed(2)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Uploaded Proof</label>
                  <p className="text-sm">{selectedMember.uploadedProof ? "Yes" : "No"}</p>
                </div>
              </div>
              
              {selectedMember.uploadedProof && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Verification Documents</label>
                  <div className="mt-2 space-y-2">
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      View ID Document
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      View Employment Contract
                    </Button>
                  </div>
                </div>
              )}
              
              <div className="flex gap-2 pt-4">
                {selectedMember.crewStatus === "pending" && (
                  <Button 
                    onClick={() => {
                      handleAction("verify", selectedMember.id);
                      setShowDetails(false);
                    }}
                    size="sm"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Verify Member
                  </Button>
                )}
                {selectedMember.crewStatus !== "rejected" && (
                  <Button 
                    variant="destructive"
                    onClick={() => {
                      handleAction("reject", selectedMember.id);
                      setShowDetails(false);
                    }}
                    size="sm"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reject Member
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}