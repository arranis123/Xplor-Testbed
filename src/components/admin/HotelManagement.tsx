import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Edit, Plus, Building } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function HotelManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHotel, setSelectedHotel] = useState<any>(null);
  const queryClient = useQueryClient();

  // Fetch hotels with their spaces
  const { data: hotels = [], isLoading } = useQuery({
    queryKey: ["admin-hotels", searchTerm],
    queryFn: async () => {
      let query = supabase
        .from("hotels")
        .select(`
          *,
          profiles!inner(email, first_name, last_name),
          hotel_spaces(
            id,
            name,
            type,
            capacity,
            pricing,
            tour_id,
            tours(title, status)
          )
        `)
        .order("created_at", { ascending: false });

      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,brand.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Hotel Management</CardTitle>
          <CardDescription>Manage hotel properties and their associated spaces</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search hotels..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hotel</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Spaces</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">Loading hotels...</TableCell>
                  </TableRow>
                ) : hotels.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">No hotels found</TableCell>
                  </TableRow>
                ) : (
                  hotels.map((hotel) => (
                    <TableRow key={hotel.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{hotel.name}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-xs">
                            {hotel.description}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm">{hotel.profiles.email}</div>
                          <div className="text-xs text-muted-foreground">
                            {hotel.profiles.first_name} {hotel.profiles.last_name}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {hotel.brand ? (
                          <Badge variant="outline">{hotel.brand}</Badge>
                        ) : (
                          <span className="text-muted-foreground">No brand</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {hotel.hotel_spaces?.length || 0} spaces
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{hotel.address || "No address"}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedHotel(hotel)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>Hotel Details: {hotel.name}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Hotel Name</label>
                                    <div className="text-lg font-semibold">{hotel.name}</div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Brand</label>
                                    <div className="text-lg">{hotel.brand || "Independent"}</div>
                                  </div>
                                </div>

                                <div>
                                  <label className="text-sm font-medium">Description</label>
                                  <div className="text-sm mt-1">{hotel.description || "No description"}</div>
                                </div>

                                <div>
                                  <label className="text-sm font-medium">Address</label>
                                  <div className="text-sm mt-1">{hotel.address || "No address provided"}</div>
                                </div>

                                {hotel.amenities && hotel.amenities.length > 0 && (
                                  <div>
                                    <label className="text-sm font-medium">Amenities</label>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      {hotel.amenities.map((amenity: string) => (
                                        <Badge key={amenity} variant="secondary">{amenity}</Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {hotel.policies && hotel.policies.length > 0 && (
                                  <div>
                                    <label className="text-sm font-medium">Policies</label>
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      {hotel.policies.map((policy: string) => (
                                        <Badge key={policy} variant="outline">{policy}</Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                <div>
                                  <div className="flex items-center justify-between mb-4">
                                    <label className="text-sm font-medium">Hotel Spaces</label>
                                    <Button size="sm">
                                      <Plus className="h-4 w-4 mr-2" />
                                      Add Space
                                    </Button>
                                  </div>
                                  {hotel.hotel_spaces && hotel.hotel_spaces.length > 0 ? (
                                    <div className="space-y-2">
                                      {hotel.hotel_spaces.map((space: any) => (
                                        <div key={space.id} className="flex items-center justify-between p-3 border rounded">
                                          <div>
                                            <div className="font-medium">{space.name}</div>
                                            <div className="text-sm text-muted-foreground">
                                              {space.type} • Capacity: {space.capacity || "N/A"}
                                              {space.pricing && ` • $${space.pricing}`}
                                            </div>
                                            {space.tours && (
                                              <div className="text-xs text-muted-foreground">
                                                Tour: {space.tours.title} ({space.tours.status})
                                              </div>
                                            )}
                                          </div>
                                          <Button variant="outline" size="sm">
                                            <Edit className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="text-center py-4 text-muted-foreground">
                                      No spaces configured
                                    </div>
                                  )}
                                </div>
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