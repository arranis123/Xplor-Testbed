import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

interface User {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Editor" | "Viewer";
  status: "Active" | "Invited" | "Inactive";
  lastActive: string;
  avatar?: string;
  spacesCount: number;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@company.com",
    role: "Owner",
    status: "Active",
    lastActive: "2 hours ago",
    spacesCount: 24
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@company.com",
    role: "Admin",
    status: "Active",
    lastActive: "1 day ago",
    spacesCount: 18
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "m.chen@company.com",
    role: "Editor",
    status: "Active",
    lastActive: "3 days ago",
    spacesCount: 12
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@company.com",
    role: "Viewer",
    status: "Invited",
    lastActive: "Never",
    spacesCount: 0
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
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>(mockUsers);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInviteUser = () => {
    // Placeholder for invite functionality
    console.log("Invite user clicked");
  };

  const handleEditUser = (userId: string) => {
    console.log("Edit user:", userId);
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
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

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spaces</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.reduce((sum, user) => sum + user.spacesCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all users
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
    </div>
  );
}