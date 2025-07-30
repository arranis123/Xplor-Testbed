import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Search, Edit, Eye, Flag, CheckCircle, X, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function TourManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedTour, setSelectedTour] = useState<any>(null);
  const queryClient = useQueryClient();

  // Fetch tours with filters
  const { data: tours = [], isLoading } = useQuery({
    queryKey: ["admin-tours", searchTerm, statusFilter, typeFilter],
    queryFn: async () => {
      let query = supabase
        .from("tours")
        .select(`
          *,
          profiles!tours_user_id_fkey(email, first_name, last_name)
        `)
        .order("created_at", { ascending: false });

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter as any);
      }

      if (typeFilter !== "all") {
        query = query.eq("property_type", typeFilter as any);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  // Update tour status
  const updateTourStatus = useMutation({
    mutationFn: async ({ tourId, status }: { tourId: string; status: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const updates: any = { status };
      if (status === "published") {
        updates.approved_by = user.id;
        updates.approved_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from("tours")
        .update(updates)
        .eq("id", tourId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-tours"] });
      toast.success("Tour status updated successfully");
    },
    onError: (error: any) => {
      toast.error(`Error updating tour status: ${error.message}`);
    },
  });

  // Toggle featured status
  const toggleFeatured = useMutation({
    mutationFn: async ({ tourId, featured }: { tourId: string; featured: boolean }) => {
      const { error } = await supabase
        .from("tours")
        .update({ is_featured: featured })
        .eq("id", tourId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-tours"] });
      toast.success("Featured status updated successfully");
    },
    onError: (error: any) => {
      toast.error(`Error updating featured status: ${error.message}`);
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
          <CardTitle>Tour Management</CardTitle>
          <CardDescription>Manage tours, content approval, and moderation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tours..."
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
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="hotel">Hotel</SelectItem>
                <SelectItem value="vacation_rental">Vacation Rental</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="event_venue">Event Venue</SelectItem>
                <SelectItem value="restaurant">Restaurant</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tour</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">Loading tours...</TableCell>
                  </TableRow>
                ) : tours.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">No tours found</TableCell>
                  </TableRow>
                ) : (
                  tours.map((tour) => (
                    <TableRow key={tour.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{tour.title}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-xs">
                            {tour.description}
                          </div>
                          {tour.pricing && (
                            <div className="text-xs text-muted-foreground">${tour.pricing}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm">{tour.profiles.email}</div>
                          <div className="text-xs text-muted-foreground">
                            {tour.profiles.first_name} {tour.profiles.last_name}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{tour.property_type?.replace("_", " ")}</Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(tour.status)}</TableCell>
                      <TableCell>{tour.view_count}</TableCell>
                      <TableCell>
                        <Button
                          variant={tour.is_featured ? "default" : "outline"}
                          size="sm"
                          onClick={() =>
                            toggleFeatured.mutate({ tourId: tour.id, featured: !tour.is_featured })
                          }
                        >
                          <Star className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {tour.vr_link && (
                            <Button variant="outline" size="sm" asChild>
                              <a href={tour.vr_link} target="_blank" rel="noopener noreferrer">
                                <Eye className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedTour(tour)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Manage Tour: {tour.title}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <label className="text-sm font-medium">Status</label>
                                  <div className="flex gap-2 mt-2">
                                    <Button
                                      variant={tour.status === "published" ? "default" : "outline"}
                                      size="sm"
                                      onClick={() =>
                                        updateTourStatus.mutate({ tourId: tour.id, status: "published" })
                                      }
                                    >
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Approve
                                    </Button>
                                    <Button
                                      variant={tour.status === "flagged" ? "destructive" : "outline"}
                                      size="sm"
                                      onClick={() =>
                                        updateTourStatus.mutate({ tourId: tour.id, status: "flagged" })
                                      }
                                    >
                                      <Flag className="h-4 w-4 mr-2" />
                                      Flag
                                    </Button>
                                    <Button
                                      variant={tour.status === "archived" ? "secondary" : "outline"}
                                      size="sm"
                                      onClick={() =>
                                        updateTourStatus.mutate({ tourId: tour.id, status: "archived" })
                                      }
                                    >
                                      <X className="h-4 w-4 mr-2" />
                                      Archive
                                    </Button>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Views</label>
                                    <div className="text-2xl font-bold">{tour.view_count}</div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Shares</label>
                                    <div className="text-2xl font-bold">{tour.share_count}</div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Leads</label>
                                    <div className="text-2xl font-bold">{tour.lead_count}</div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Storage</label>
                                    <div className="text-sm">{(tour.storage_size / 1024 / 1024).toFixed(2)} MB</div>
                                  </div>
                                </div>

                                {tour.tags && tour.tags.length > 0 && (
                                  <div>
                                    <label className="text-sm font-medium">Tags</label>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      {tour.tags.map((tag: string) => (
                                        <Badge key={tag} variant="secondary">{tag}</Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
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
    </div>
  );
}