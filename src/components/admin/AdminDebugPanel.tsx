import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, RefreshCw, Bug, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export function AdminDebugPanel() {
  const { user, session, isAdmin, debugInfo, refreshAuth, forceAdminCheck } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshAuth();
      toast.success('Authentication refreshed');
    } catch (error) {
      toast.error('Failed to refresh authentication');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleForceAdminCheck = async () => {
    const result = await forceAdminCheck();
    toast.info(result ? 'Admin privileges confirmed' : 'No admin privileges found');
  };

  const getStatusIcon = (status: boolean) => {
    return status ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <XCircle className="h-4 w-4 text-red-500" />
    );
  };

  return (
    <Card className="mb-6">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bug className="h-5 w-5" />
                <div>
                  <CardTitle className="text-lg">Authentication Debug Panel</CardTitle>
                  <CardDescription>
                    View detailed authentication status and troubleshoot issues
                  </CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={isAdmin ? "default" : "destructive"}>
                  {isAdmin ? "Admin Access" : "No Admin Access"}
                </Badge>
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <CardContent className="space-y-6">
            {/* Current Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  Current Status
                  {debugInfo.lastCheck && (
                    <span className="text-xs text-muted-foreground">
                      (Last check: {debugInfo.lastCheck.toLocaleTimeString()})
                    </span>
                  )}
                </h4>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(!!user)}
                    <span className="text-sm">User Logged In</span>
                    <Badge variant="outline" className="text-xs">
                      {user?.email || 'Not logged in'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {getStatusIcon(debugInfo.sessionValid)}
                    <span className="text-sm">Session Valid</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {getStatusIcon(debugInfo.adminRoleExists)}
                    <span className="text-sm">Admin Role Found</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {getStatusIcon(isAdmin)}
                    <span className="text-sm">Admin Access Granted</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Session Details</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">User ID: </span>
                    <span className="font-mono text-xs">{user?.id || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="font-medium">Email: </span>
                    <span>{user?.email || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="font-medium">Session expires: </span>
                    <span>{session?.expires_at ? new Date(session.expires_at * 1000).toLocaleString() : 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Errors */}
            {debugInfo.errors.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                  Issues Detected
                </h4>
                <div className="bg-muted p-3 rounded-md">
                  {debugInfo.errors.map((error, index) => (
                    <div key={index} className="text-sm text-muted-foreground">
                      • {error}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t">
              <Button 
                onClick={handleRefresh} 
                disabled={isRefreshing}
                variant="outline"
                size="sm"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh Auth
              </Button>
              
              <Button 
                onClick={handleForceAdminCheck}
                variant="outline"
                size="sm"
              >
                Force Admin Check
              </Button>
            </div>

            {/* Troubleshooting Tips */}
            <div className="bg-muted p-3 rounded-md">
              <h5 className="font-medium mb-2">Troubleshooting Tips:</h5>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Try refreshing authentication if session appears invalid</li>
                <li>• Clear browser cache/cookies if experiencing persistent issues</li>
                <li>• Force admin check will verify role assignment</li>
                <li>• Contact support if authorized email doesn't have admin access</li>
              </ul>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}