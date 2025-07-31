import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { carDataService } from "@/services/carDataService";
import { useToast } from "@/hooks/use-toast";

export function CarDatabaseInitializer() {
  const [isInitializing, setIsInitializing] = useState(false);
  const [initStatus, setInitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [stats, setStats] = useState<{ manufacturers: number; models: number; variants: number } | null>(null);
  const { toast } = useToast();

  const handleInitialize = async () => {
    setIsInitializing(true);
    setInitStatus('idle');
    
    try {
      console.log('Starting car database initialization...');
      
      const result = await carDataService.initializeDatabase();
      
      if (result.success) {
        setInitStatus('success');
        setStats(result.stats);
        toast({
          title: "Success!",
          description: result.message,
          duration: 5000,
        });
        
        // Clear cache to ensure fresh data
        carDataService.clearCache();
      } else {
        throw new Error(result.message || 'Failed to initialize database');
      }
    } catch (error) {
      console.error('Error initializing car database:', error);
      setInitStatus('error');
      toast({
        title: "Error",
        description: `Failed to initialize car database: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Car Database Setup
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Initialize the car database with comprehensive global manufacturer, model, and variant data.
        </p>
        
        {stats && (
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{stats.manufacturers}</div>
              <div className="text-xs text-muted-foreground">Manufacturers</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{stats.models}</div>
              <div className="text-xs text-muted-foreground">Models</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{stats.variants}</div>
              <div className="text-xs text-muted-foreground">Variants</div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Button 
            onClick={handleInitialize} 
            disabled={isInitializing}
            className="flex-1"
          >
            {isInitializing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Initializing...
              </>
            ) : (
              <>
                <Database className="h-4 w-4 mr-2" />
                Initialize Database
              </>
            )}
          </Button>
          
          {initStatus === 'success' && (
            <Badge variant="default" className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Ready
            </Badge>
          )}
          
          {initStatus === 'error' && (
            <Badge variant="destructive">
              <AlertCircle className="h-3 w-3 mr-1" />
              Error
            </Badge>
          )}
        </div>

        <div className="text-xs text-muted-foreground">
          <strong>Includes:</strong> 70+ global manufacturers • Toyota, BMW, Tesla, Ferrari, etc. • Year-specific variants • Real-time data loading
        </div>
      </CardContent>
    </Card>
  );
}