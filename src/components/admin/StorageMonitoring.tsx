import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { HardDrive, Users, FileText, AlertTriangle, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function StorageMonitoring() {
  // Fetch storage statistics
  const { data: storageStats, isLoading } = useQuery({
    queryKey: ["admin-storage-stats"],
    queryFn: async () => {
      // Get total storage usage
      const { data: profileStats } = await supabase
        .from("profiles")
        .select("storage_used, subscription_tier");

      // Get tour storage usage
      const { data: tourStats } = await supabase
        .from("tours")
        .select("storage_size, user_id, title, profiles!inner(email, subscription_tier)");

      const totalUsed = profileStats?.reduce((sum, p) => sum + (p.storage_used || 0), 0) || 0;
      const tierBreakdown = profileStats?.reduce((acc, p) => {
        acc[p.subscription_tier] = (acc[p.subscription_tier] || 0) + (p.storage_used || 0);
        return acc;
      }, {} as Record<string, number>) || {};

      const topUsers = profileStats
        ?.sort((a, b) => (b.storage_used || 0) - (a.storage_used || 0))
        .slice(0, 10) || [];

      const largeTours = tourStats
        ?.sort((a, b) => (b.storage_size || 0) - (a.storage_size || 0))
        .slice(0, 10) || [];

      return {
        totalUsed,
        tierBreakdown,
        topUsers,
        largeTours,
        totalUsers: profileStats?.length || 0,
        totalTours: tourStats?.length || 0,
      };
    },
  });

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  };

  const getTierColor = (tier: string) => {
    const colors: Record<string, string> = {
      free: "text-gray-600",
      basic: "text-blue-600",
      premium: "text-purple-600",
      enterprise: "text-green-600",
    };
    return colors[tier] || "text-gray-600";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-pulse">Loading storage data...</div>
      </div>
    );
  }

  const storageLimit = 1000 * 1024 * 1024 * 1024; // 1TB example limit
  const usagePercentage = ((storageStats?.totalUsed || 0) / storageLimit) * 100;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Storage Used</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatBytes(storageStats?.totalUsed || 0)}</div>
            <Progress value={usagePercentage} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              {usagePercentage.toFixed(1)}% of {formatBytes(storageLimit)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{storageStats?.totalUsers || 0}</div>
            <p className="text-xs text-muted-foreground">Total registered users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tours</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{storageStats?.totalTours || 0}</div>
            <p className="text-xs text-muted-foreground">All tours in system</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg per User</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatBytes((storageStats?.totalUsed || 0) / Math.max(storageStats?.totalUsers || 1, 1))}
            </div>
            <p className="text-xs text-muted-foreground">Average storage per user</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Storage by Tier</CardTitle>
            <CardDescription>Storage usage breakdown by subscription tier</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(storageStats?.tierBreakdown || {}).map(([tier, usage]) => (
                <div key={tier} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getTierColor(tier)}>
                      {tier}
                    </Badge>
                  </div>
                  <div className="text-sm font-medium">{formatBytes(usage)}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Storage system status and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Storage System</span>
                <Badge variant="default">Healthy</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">CDN Status</span>
                <Badge variant="default">Operational</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Backup Status</span>
                <Badge variant="default">Up to Date</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Cleanup Job</span>
                <Badge variant="secondary">Scheduled</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Storage Users</CardTitle>
          <CardDescription>Users with highest storage consumption</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead>Storage Used</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {storageStats?.topUsers.map((user: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>User {index + 1}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getTierColor(user.subscription_tier)}>
                      {user.subscription_tier}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatBytes(user.storage_used || 0)}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Largest Tours</CardTitle>
          <CardDescription>Tours with highest storage consumption</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tour</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {storageStats?.largeTours.map((tour: any) => (
                <TableRow key={tour.user_id}>
                  <TableCell>
                    <div className="font-medium">{tour.title}</div>
                  </TableCell>
                  <TableCell>{tour.profiles?.email || "Unknown"}</TableCell>
                  <TableCell>{formatBytes(tour.storage_size || 0)}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Optimize
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}