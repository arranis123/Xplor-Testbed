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
import { Search, UserCheck, UserX, Ban, Edit, FileText, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [noteText, setNoteText] = useState("");
  const queryClient = useQueryClient();

  // Fetch users with filters
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["admin-users", searchTerm, roleFilter, statusFilter],
    queryFn: async () => {
      let query = supabase
        .from("profiles")
        .select(`
          *,
          user_roles!inner(role),
          admin_notes(note, created_at, admin_id)
        `)
        .order("created_at", { ascending: false });

      if (searchTerm) {
        query = query.or(`email.ilike.%${searchTerm}%,first_name.ilike.%${searchTerm}%,last_name.ilike.%${searchTerm}%`);
      }

      if (roleFilter !== "all") {
        query = query.eq("user_roles.role", roleFilter as any);
      }

      if (statusFilter !== "all") {
        query = query.eq("account_status", statusFilter as any);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  // Update user status
  const updateUserStatus = useMutation({
    mutationFn: async ({ userId, status }: { userId: string; status: string }) => {
      const { error } = await supabase
        .from("profiles")
        .update({ account_status: status as any })
        .eq("id", userId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("User status updated successfully");
    },
    onError: (error) => {
      toast.error(`Error updating user status: ${error.message}`);
    },
  });

  // Update subscription tier
  const updateSubscriptionTier = useMutation({
    mutationFn: async ({ userId, tier }: { userId: string; tier: string }) => {
      const { error } = await supabase
        .from("profiles")
        .update({ subscription_tier: tier as any })
        .eq("id", userId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("Subscription tier updated successfully");
    },
    onError: (error) => {
      toast.error(`Error updating subscription: ${error.message}`);
    },
  });

  // Add admin note
  const addNote = useMutation({
    mutationFn: async ({ userId, note }: { userId: string; note: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("admin_notes")
        .insert({
          user_id: userId,
          admin_id: user.id,
          note,
          is_internal: true,
        });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      setNoteText("");
      toast.success("Note added successfully");
    },
    onError: (error) => {
      toast.error(`Error adding note: ${error.message}`);
    },
  });

  // Export users
  const exportUsers = () => {
    const csv = [
      ["Email", "Name", "Company", "Role", "Status", "Subscription", "Tours", "Storage", "Created"].join(","),
      ...users.map(user => [
        user.email,
        `${user.first_name || ""} ${user.last_name || ""}`.trim(),
        user.company || "",
        user.user_roles?.[0]?.role || "user",
        user.account_status,
        user.subscription_tier,
        user.tour_count,
        `${(user.storage_used / 1024 / 1024).toFixed(2)} MB`,
        new Date(user.created_at).toLocaleDateString()
      ].join(","))
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      active: "default",
      suspended: "secondary",
      banned: "destructive",
      pending_verification: "outline",
    };
    return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
  };

  const getTierBadge = (tier: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      free: "outline",
      basic: "secondary",
      premium: "default",
      enterprise: "destructive",
    };
    return <Badge variant={variants[tier] || "outline"}>{tier}</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage user accounts, roles, and subscriptions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="moderator">Moderator</SelectItem>
                <SelectItem value="creator">Creator</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="banned">Banned</SelectItem>
                <SelectItem value="pending_verification">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={exportUsers} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Subscription</TableHead>
                  <TableHead>Tours</TableHead>
                  <TableHead>Storage</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">Loading users...</TableCell>
                  </TableRow>
                ) : users.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">No users found</TableCell>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{user.email}</div>
                          <div className="text-sm text-muted-foreground">
                            {user.first_name} {user.last_name}
                          </div>
                          {user.company && (
                            <div className="text-xs text-muted-foreground">{user.company}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {user.user_roles?.[0]?.role ? (
                          <Badge variant="secondary">{user.user_roles[0].role}</Badge>
                        ) : (
                          <Badge variant="outline">user</Badge>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(user.account_status)}</TableCell>
                      <TableCell>{getTierBadge(user.subscription_tier)}</TableCell>
                      <TableCell>{user.tour_count}</TableCell>
                      <TableCell>{(user.storage_used / 1024 / 1024).toFixed(2)} MB</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedUser(user)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Manage User: {user.email}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium">Account Status</label>
                                    <Select
                                      defaultValue={user.account_status}
                                      onValueChange={(value) =>
                                        updateUserStatus.mutate({ userId: user.id, status: value })
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="suspended">Suspended</SelectItem>
                                        <SelectItem value="banned">Banned</SelectItem>
                                        <SelectItem value="pending_verification">Pending</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium">Subscription Tier</label>
                                    <Select
                                      defaultValue={user.subscription_tier}
                                      onValueChange={(value) =>
                                        updateSubscriptionTier.mutate({ userId: user.id, tier: value })
                                      }
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="free">Free</SelectItem>
                                        <SelectItem value="basic">Basic</SelectItem>
                                        <SelectItem value="premium">Premium</SelectItem>
                                        <SelectItem value="enterprise">Enterprise</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>

                                <div>
                                  <label className="text-sm font-medium">Add Internal Note</label>
                                  <Textarea
                                    placeholder="Add a note about this user..."
                                    value={noteText}
                                    onChange={(e) => setNoteText(e.target.value)}
                                  />
                                  <Button
                                    onClick={() => addNote.mutate({ userId: user.id, note: noteText })}
                                    className="mt-2"
                                    disabled={!noteText.trim()}
                                  >
                                    Add Note
                                  </Button>
                                </div>

                                {user.admin_notes && user.admin_notes.length > 0 && (
                                  <div>
                                    <label className="text-sm font-medium">Previous Notes</label>
                                    <div className="space-y-2 mt-2">
                                      {user.admin_notes.map((note: any, index: number) => (
                                        <div key={index} className="p-2 bg-muted rounded text-sm">
                                          <div>{note.note}</div>
                                          <div className="text-xs text-muted-foreground mt-1">
                                            {new Date(note.created_at).toLocaleString()}
                                          </div>
                                        </div>
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