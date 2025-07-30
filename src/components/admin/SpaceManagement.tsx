import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Search, Edit, Upload, UserCheck, Trash2, Plus, Eye, ChevronDown, FolderOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadSpaceDialog } from "@/components/UploadSpaceDialog";

export default function SpaceManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [userFilter, setUserFilter] = useState("all");
  const [selectedSpace, setSelectedSpace] = useState<any>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showReassignDialog, setShowReassignDialog] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const queryClient = useQueryClient();

  // Fetch all spaces/tours with user information
  const { data: spaces = [], isLoading } = useQuery({
    queryKey: ["admin-spaces", searchTerm, statusFilter, userFilter],
    queryFn: async () => {
      let query = supabase
        .from("tours")
        .select(`
          *,
          profiles!tours_user_id_fkey(id, email, first_name, last_name)
        `)
        .order("created_at", { ascending: false });

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,address.ilike.%${searchTerm}%`);
      }

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter as any);
      }

      if (userFilter !== "all") {
        query = query.eq("user_id", userFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  // Fetch all users for reassignment and creation
  const { data: users = [] } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, email, first_name, last_name")
        .order("email");

      if (error) throw error;
      return data;
    },
  });

  // Create new space/listing
  const createSpace = useMutation({
    mutationFn: async (spaceData: {
      title: string;
      description: string;
      address: string;
      user_id: string;
      property_type: "hotel" | "vacation_rental" | "commercial" | "residential" | "event_venue" | "restaurant";
      pricing?: number;
    }) => {
      const { error } = await supabase
        .from("tours")
        .insert(spaceData);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-spaces"] });
      toast.success("Space created successfully");
      setShowCreateDialog(false);
    },
    onError: (error: any) => {
      toast.error(`Error creating space: ${error.message}`);
    },
  });

  // Update space/listing
  const updateSpace = useMutation({
    mutationFn: async ({ spaceId, updates }: { spaceId: string; updates: any }) => {
      const { error } = await supabase
        .from("tours")
        .update(updates)
        .eq("id", spaceId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-spaces"] });
      toast.success("Space updated successfully");
    },
    onError: (error: any) => {
      toast.error(`Error updating space: ${error.message}`);
    },
  });

  // Reassign space to another user
  const reassignSpace = useMutation({
    mutationFn: async ({ spaceId, newUserId }: { spaceId: string; newUserId: string }) => {
      const { error } = await supabase
        .from("tours")
        .update({ user_id: newUserId })
        .eq("id", spaceId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-spaces"] });
      toast.success("Space reassigned successfully");
      setShowReassignDialog(false);
    },
    onError: (error: any) => {
      toast.error(`Error reassigning space: ${error.message}`);
    },
  });

  // Delete space
  const deleteSpace = useMutation({
    mutationFn: async (spaceId: string) => {
      const { error } = await supabase
        .from("tours")
        .delete()
        .eq("id", spaceId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-spaces"] });
      toast.success("Space deleted successfully");
    },
    onError: (error: any) => {
      toast.error(`Error deleting space: ${error.message}`);
    },
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      draft: "outline",
      pending_approval: "secondary",
      published: "default",
      flagged: "destructive",
      archived: "secondary",
    };
    return <Badge variant={variants[status] || "outline"}>{status.replace("_", " ")}</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Space & Listing Management
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Space
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem 
                    onClick={() => {
                      setSelectedCategory("real-estate");
                      setUploadDialogOpen(true);
                    }}
                  >
                    <FolderOpen className="h-4 w-4 mr-2" />
                    Real Estate
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => {
                      setSelectedCategory("yacht");
                      setUploadDialogOpen(true);
                    }}
                  >
                    <FolderOpen className="h-4 w-4 mr-2" />
                    Yacht
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => {
                      setSelectedCategory("hotel-resort");
                      setUploadDialogOpen(true);
                    }}
                  >
                    <FolderOpen className="h-4 w-4 mr-2" />
                    Hotel/Resort
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Bulk Upload
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-xl">
                  <DialogHeader>
                    <DialogTitle>Bulk Upload Content</DialogTitle>
                  </DialogHeader>
                  <BulkUploadForm users={users} />
                </DialogContent>
              </Dialog>
            </div>
          </CardTitle>
          <CardDescription>Manage all spaces, listings, and user content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search spaces, listings, or addresses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="pending_approval">Pending Approval</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            <Select value={userFilter} onValueChange={setUserFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by user" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Space/Listing</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">Loading spaces...</TableCell>
                  </TableRow>
                ) : spaces.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">No spaces found</TableCell>
                  </TableRow>
                ) : (
                  spaces.map((space) => (
                    <TableRow key={space.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{space.title}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-xs">
                            {space.description}
                          </div>
                          {space.pricing && (
                            <div className="text-xs text-muted-foreground">${space.pricing}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm">{space.profiles.email}</div>
                          <div className="text-xs text-muted-foreground">
                            {space.profiles.first_name} {space.profiles.last_name}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{space.property_type?.replace("_", " ")}</Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(space.status)}</TableCell>
                      <TableCell>
                        <div className="text-sm truncate max-w-xs">{space.address}</div>
                      </TableCell>
                      <TableCell>{space.view_count}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {space.vr_link && (
                            <Button variant="outline" size="sm" asChild>
                              <a href={space.vr_link} target="_blank" rel="noopener noreferrer">
                                <Eye className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedSpace(space)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Edit Space: {space.title}</DialogTitle>
                              </DialogHeader>
                              <EditSpaceForm 
                                space={space} 
                                users={users} 
                                onUpdate={updateSpace.mutate}
                                onReassign={reassignSpace.mutate}
                              />
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              if (confirm("Are you sure you want to delete this space?")) {
                                deleteSpace.mutate(space.id);
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <UploadSpaceDialog 
        open={uploadDialogOpen} 
        onOpenChange={setUploadDialogOpen}
        category={selectedCategory}
      />
    </div>
  );
}

// Create Space Form Component
function CreateSpaceForm({ users, onSubmit }: { users: any[]; onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    user_id: "",
    property_type: "hotel" as "hotel" | "vacation_rental" | "commercial" | "residential" | "event_venue" | "restaurant",
    pricing: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      pricing: formData.pricing ? parseFloat(formData.pricing) : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label>Assign to User</Label>
        <Select value={formData.user_id} onValueChange={(value) => setFormData({...formData, user_id: value})}>
          <SelectTrigger>
            <SelectValue placeholder="Select user" />
          </SelectTrigger>
          <SelectContent>
            {users.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.email} - {user.first_name} {user.last_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label>Title</Label>
        <Input
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />
      </div>
      
      <div>
        <Label>Description</Label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
      </div>
      
      <div>
        <Label>Address</Label>
        <Input
          value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
        />
      </div>
      
      <div>
        <Label>Property Type</Label>
        <Select value={formData.property_type} onValueChange={(value) => setFormData({...formData, property_type: value as any})}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hotel">Hotel</SelectItem>
            <SelectItem value="vacation_rental">Vacation Rental</SelectItem>
            <SelectItem value="commercial">Commercial</SelectItem>
            <SelectItem value="residential">Residential</SelectItem>
            <SelectItem value="event_venue">Event Venue</SelectItem>
            <SelectItem value="restaurant">Restaurant</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label>Pricing (optional)</Label>
        <Input
          type="number"
          value={formData.pricing}
          onChange={(e) => setFormData({...formData, pricing: e.target.value})}
        />
      </div>
      
      <Button type="submit" className="w-full">Create Space</Button>
    </form>
  );
}

// Edit Space Form Component
function EditSpaceForm({ space, users, onUpdate, onReassign }: { 
  space: any; 
  users: any[]; 
  onUpdate: (data: any) => void;
  onReassign: (data: any) => void;
}) {
  const [formData, setFormData] = useState({
    title: space.title || "",
    description: space.description || "",
    address: space.address || "",
    property_type: (space.property_type || "hotel") as "hotel" | "vacation_rental" | "commercial" | "residential" | "event_venue" | "restaurant",
    pricing: space.pricing?.toString() || "",
    status: space.status || "draft",
  });
  const [reassignUserId, setReassignUserId] = useState("");

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({
      spaceId: space.id,
      updates: {
        ...formData,
        pricing: formData.pricing ? parseFloat(formData.pricing) : null,
      }
    });
  };

  const handleReassign = () => {
    if (reassignUserId && reassignUserId !== space.user_id) {
      onReassign({ spaceId: space.id, newUserId: reassignUserId });
    }
  };

  return (
    <Tabs defaultValue="edit" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="edit">Edit Details</TabsTrigger>
        <TabsTrigger value="reassign">Reassign Owner</TabsTrigger>
      </TabsList>
      
      <TabsContent value="edit">
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>
          
          <div>
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>
          
          <div>
            <Label>Address</Label>
            <Input
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Property Type</Label>
              <Select value={formData.property_type} onValueChange={(value) => setFormData({...formData, property_type: value as any})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hotel">Hotel</SelectItem>
                  <SelectItem value="vacation_rental">Vacation Rental</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="event_venue">Event Venue</SelectItem>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="pending_approval">Pending Approval</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="flagged">Flagged</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label>Pricing</Label>
            <Input
              type="number"
              value={formData.pricing}
              onChange={(e) => setFormData({...formData, pricing: e.target.value})}
            />
          </div>
          
          <Button type="submit" className="w-full">Update Space</Button>
        </form>
      </TabsContent>
      
      <TabsContent value="reassign">
        <div className="space-y-4">
          <div>
            <Label>Current Owner</Label>
            <div className="p-2 bg-muted rounded">
              {space.profiles.email} - {space.profiles.first_name} {space.profiles.last_name}
            </div>
          </div>
          
          <div>
            <Label>Reassign to User</Label>
            <Select value={reassignUserId} onValueChange={setReassignUserId}>
              <SelectTrigger>
                <SelectValue placeholder="Select new owner" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.email} - {user.first_name} {user.last_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={handleReassign} 
            className="w-full"
            disabled={!reassignUserId || reassignUserId === space.user_id}
          >
            <UserCheck className="h-4 w-4 mr-2" />
            Reassign Space
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
}

// Bulk Upload Form Component
function BulkUploadForm({ users }: { users: any[] }) {
  const [selectedUser, setSelectedUser] = useState("");
  const [uploadType, setUploadType] = useState("content");

  return (
    <div className="space-y-4">
      <div>
        <Label>Upload on behalf of</Label>
        <Select value={selectedUser} onValueChange={setSelectedUser}>
          <SelectTrigger>
            <SelectValue placeholder="Select user" />
          </SelectTrigger>
          <SelectContent>
            {users.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.email} - {user.first_name} {user.last_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label>Upload Type</Label>
        <Select value={uploadType} onValueChange={setUploadType}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="content">VR Content</SelectItem>
            <SelectItem value="images">Images</SelectItem>
            <SelectItem value="videos">Videos</SelectItem>
            <SelectItem value="documents">Documents</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label>Files</Label>
        <Input type="file" multiple accept="*/*" />
      </div>
      
      <Button className="w-full">
        <Upload className="h-4 w-4 mr-2" />
        Upload Content
      </Button>
    </div>
  );
}