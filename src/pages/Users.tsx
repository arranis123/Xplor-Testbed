import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import luxuryYacht1 from "@/assets/luxury-yacht-1.jpg";
import luxuryYacht2 from "@/assets/luxury-yacht-2.jpg";
import luxuryProperty1 from "@/assets/luxury-property-1.jpg";
import luxuryInterior from "@/assets/luxury-interior.jpg";
import modernHouse from "@/assets/modern-house.jpg";
import yachtDetail from "@/assets/yacht-detail.jpg";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  UserPlus, 
  Search, 
  MoreHorizontal, 
  Edit,
  Trash2,
  Shield,
  Mail,
  Calendar
} from "lucide-react";

const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  role: z.enum(["Owner", "Admin", "Editor", "Viewer"]),
  status: z.enum(["Active", "Invited", "Inactive"]),
});

const inviteSchema = z.object({
  emails: z.string().min(1, "At least one email is required"),
  role: z.enum(["Admin", "Editor", "Viewer"]),
  message: z.string().optional(),
});

interface User {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Editor" | "Viewer";
  status: "Active" | "Invited" | "Inactive";
  lastActive: string;
  avatar?: string;
  spacesCount: number;
  spaces?: Array<{
    id: string;
    title: string;
    type: string;
    createdAt: string;
    imageUrl: string;
  }>;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@company.com",
    role: "Owner",
    status: "Active",
    lastActive: "2 hours ago",
    spacesCount: 24,
    spaces: [
      { id: "s1", title: "Luxury Villa Santorini", type: "Property", createdAt: "2024-01-15", imageUrl: luxuryProperty1 },
      { id: "s2", title: "Super Yacht Marina", type: "Yacht", createdAt: "2024-01-20", imageUrl: luxuryYacht1 },
      { id: "s3", title: "Beachfront Resort", type: "Hospitality", createdAt: "2024-01-25", imageUrl: luxuryInterior },
      { id: "s4", title: "Luxury Yacht Interior", type: "Yacht", createdAt: "2024-02-01", imageUrl: yachtDetail },
      { id: "s10", title: "Penthouse Manhattan", type: "Property", createdAt: "2024-02-10", imageUrl: modernHouse },
    ]
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@company.com",
    role: "Admin",
    status: "Active",
    lastActive: "1 day ago",
    spacesCount: 18,
    spaces: [
      { id: "s5", title: "Mega Yacht Deck", type: "Yacht", createdAt: "2024-01-10", imageUrl: luxuryYacht2 },
      { id: "s6", title: "Luxury Property Pool", type: "Property", createdAt: "2024-01-18", imageUrl: luxuryProperty1 },
      { id: "s7", title: "Private Yacht Suite", type: "Yacht", createdAt: "2024-02-05", imageUrl: yachtDetail },
    ]
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "m.chen@company.com",
    role: "Editor",
    status: "Active",
    lastActive: "3 days ago",
    spacesCount: 12,
    spaces: [
      { id: "s8", title: "Private Estate Gardens", type: "Property", createdAt: "2024-01-12", imageUrl: modernHouse },
      { id: "s9", title: "Sailing Yacht Cockpit", type: "Yacht", createdAt: "2024-01-28", imageUrl: luxuryYacht1 },
    ]
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@company.com",
    role: "Viewer",
    status: "Invited",
    lastActive: "Never",
    spacesCount: 0,
    spaces: []
  }
];

const getRoleColor = (role: string) => {
  switch (role) {
    case "Owner": return "bg-primary text-primary-foreground";
    case "Admin": return "bg-destructive text-destructive-foreground";
    case "Editor": return "bg-secondary text-secondary-foreground";
    case "Viewer": return "bg-muted text-muted-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "Invited": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "Inactive": return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
};

export default function Users() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [isSpacesDialogOpen, setIsSpacesDialogOpen] = useState(false);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "Viewer",
      status: "Active",
    },
  });

  const inviteForm = useForm<z.infer<typeof inviteSchema>>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      emails: "",
      role: "Viewer",
      message: "",
    },
  });

  const handleInviteUser = () => {
    setIsInviteDialogOpen(true);
  };

  const handleSendInvites = (values: z.infer<typeof inviteSchema>) => {
    // Parse emails (split by comma, semicolon, or newline and clean up)
    const emailList = values.emails
      .split(/[,;\n]/)
      .map(email => email.trim())
      .filter(email => email.length > 0);

    // Validate each email
    const invalidEmails = emailList.filter(email => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return !emailRegex.test(email);
    });

    if (invalidEmails.length > 0) {
      toast({
        title: "Invalid email addresses",
        description: `Please fix these emails: ${invalidEmails.join(", ")}`,
        variant: "destructive",
      });
      return;
    }

    // Create new invited users
    const newUsers = emailList.map(email => ({
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0], // Use email prefix as temporary name
      email: email,
      role: values.role,
      status: "Invited" as const,
      lastActive: "Never",
      spacesCount: 0,
    }));

    setUsers(prev => [...prev, ...newUsers]);
    setIsInviteDialogOpen(false);
    inviteForm.reset();

    toast({
      title: "Invitations sent",
      description: `Sent ${emailList.length} invitation${emailList.length > 1 ? 's' : ''} successfully.`,
    });
  };

  const handleEditUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setEditingUser(user);
      form.reset({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      });
      setIsEditDialogOpen(true);
    }
  };

  const handleUpdateUser = (values: z.infer<typeof userSchema>) => {
    if (!editingUser) return;

    const updatedUsers = users.map(user =>
      user.id === editingUser.id
        ? { ...user, ...values }
        : user
    );
    
    setUsers(updatedUsers);
    setIsEditDialogOpen(false);
    setEditingUser(null);
    
    toast({
      title: "User updated",
      description: `${values.name} has been updated successfully.`,
    });
  };

  const handleDeleteUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    setUsers(users.filter(user => user.id !== userId));
    
    toast({
      title: "User removed",
      description: `${user?.name} has been removed from the team.`,
      variant: "destructive",
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Team Members</h1>
          <p className="text-muted-foreground">
            Manage your team and their access to spaces
          </p>
        </div>
        <Button onClick={handleInviteUser} className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Invite User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => u.status === "Active").length}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((users.filter(u => u.status === "Active").length / users.length) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invites</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => u.status === "Invited").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting response
            </p>
          </CardContent>
        </Card>

        <Card 
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => setIsSpacesDialogOpen(true)}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spaces</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.reduce((sum, user) => sum + user.spacesCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Click to view all spaces
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Manage team member access and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>

          {/* Users Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Spaces</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleColor(user.role)}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.spacesCount}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.lastActive}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            onClick={() => handleEditUser(user.id)}
                            className="flex items-center gap-2"
                          >
                            <Edit className="h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          {user.role !== "Owner" && (
                            <DropdownMenuItem 
                              onClick={() => handleDeleteUser(user.id)}
                              className="flex items-center gap-2 text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                              Remove
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information and permissions.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdateUser)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter user name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email address" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Owner">Owner</SelectItem>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Editor">Editor</SelectItem>
                        <SelectItem value="Viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Invited">Invited</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Invite Users Dialog */}
      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Invite Team Members</DialogTitle>
            <DialogDescription>
              Send invitations to new team members. They'll receive an email with instructions to join your workspace.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...inviteForm}>
            <form onSubmit={inviteForm.handleSubmit(handleSendInvites)} className="space-y-4">
              <FormField
                control={inviteForm.control}
                name="emails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email addresses</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter email addresses separated by commas, semicolons, or new lines&#10;example@company.com, user@domain.com&#10;another@email.com"
                        className="min-h-[100px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">
                      Separate multiple emails with commas, semicolons, or new lines
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={inviteForm.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Default role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Admin">Admin - Full access to manage workspace</SelectItem>
                        <SelectItem value="Editor">Editor - Can create and edit spaces</SelectItem>
                        <SelectItem value="Viewer">Viewer - Can only view spaces</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={inviteForm.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Personal message (optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add a personal message to the invitation email..."
                        className="min-h-[80px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsInviteDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  Send Invitations
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Spaces by User Dialog */}
      <Dialog open={isSpacesDialogOpen} onOpenChange={setIsSpacesDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Spaces by Team Member</DialogTitle>
            <DialogDescription>
              All spaces organized by user across your team
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {users.filter(user => user.spacesCount > 0).map((user) => (
              <div key={user.id} className="border rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {user.spacesCount} spaces • {user.role}
                    </p>
                  </div>
                </div>
                
                {user.spaces && user.spaces.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {user.spaces.map((space) => (
                      <Card key={space.id} className="border border-border overflow-hidden">
                        <div className="h-48 w-full bg-muted">
                          <img 
                            src={space.imageUrl} 
                            alt={space.title}
                            className="w-full h-full object-cover rounded-t-lg"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-1">{space.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{space.type}</p>
                          <p className="text-xs text-muted-foreground">
                            Created: {new Date(space.createdAt).toLocaleDateString()}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No spaces created yet</p>
                )}
              </div>
            ))}
            
            {users.filter(user => user.spacesCount > 0).length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No spaces found across team members</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}