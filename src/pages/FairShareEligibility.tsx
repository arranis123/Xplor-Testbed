import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Check, FileText } from "lucide-react";

const formSchema = z.object({
  activelyEmployed: z.boolean().refine(val => val === true, "This requirement must be confirmed"),
  validSTCW: z.boolean().refine(val => val === true, "This requirement must be confirmed"),
  validENG1: z.boolean().refine(val => val === true, "This requirement must be confirmed"),
  crewManifest: z.boolean().refine(val => val === true, "This requirement must be confirmed"),
  completedProfile: z.boolean().refine(val => val === true, "This requirement must be confirmed"),
  yachtProfileUpdated: z.boolean().refine(val => val === true, "This requirement must be confirmed"),
  minimumDays: z.boolean().refine(val => val === true, "This requirement must be confirmed"),
  commissionSharing: z.boolean().refine(val => val === true, "This requirement must be confirmed"),
  termsAccepted: z.boolean().refine(val => val === true, "This requirement must be confirmed"),
  digitalSignature: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const FairShareEligibility = () => {
  const { toast } = useToast();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      activelyEmployed: false,
      validSTCW: false,
      validENG1: false,
      crewManifest: false,
      completedProfile: false,
      yachtProfileUpdated: false,
      minimumDays: false,
      commissionSharing: false,
      termsAccepted: false,
      digitalSignature: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Here you would typically send the data to your backend
      console.log("Form submitted:", data);
      toast({
        title: "Eligibility Confirmed",
        description: "Your FairShare eligibility has been confirmed. The agreement link will be sent to your email.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit eligibility form. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRequestAgreement = () => {
    toast({
      title: "Agreement Requested",
      description: "The electronic FairShare Agreement will be sent to your email address.",
    });
  };

  // Mock user data - in real app, this would come from auth context
  const currentDate = new Date().toLocaleDateString();
  const userProfile = {
    name: "John Doe", // This would be auto-filled from profile
    position: "First Officer", // This would be auto-filled from crew role
  };

  const eligibilityItems = [
    {
      key: "activelyEmployed",
      label: "I am actively employed on a yacht listed for charter on Xplor.",
    },
    {
      key: "validSTCW",
      label: "I hold a valid STCW Basic Safety Training certificate.",
    },
    {
      key: "validENG1",
      label: "I hold a valid ENG1 or equivalent seafarer medical certificate.",
    },
    {
      key: "crewManifest",
      label: "I am listed on the official crew manifest during charter operations.",
    },
    {
      key: "completedProfile",
      label: "I have completed my Xplor crew profile with certifications and position.",
    },
    {
      key: "yachtProfileUpdated",
      label: "I help keep our yacht's Xplor profile updated (location, photos, menus, features, etc.).",
    },
    {
      key: "minimumDays",
      label: "I served a minimum of 7 consecutive days onboard during a qualifying charter.",
    },
    {
      key: "commissionSharing",
      label: "I agree that commission is shared equally among eligible crew unless otherwise agreed.",
    },
    {
      key: "termsAccepted",
      label: "I accept the terms of the FairShare Agreement.",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-foreground">
              FairShare Program – Crew Eligibility Confirmation
            </CardTitle>
            <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
              Please confirm your eligibility to participate in the Xplor FairShare Program, which shares 50% of charter commission with qualifying crew members. Tick all the boxes below to proceed.
            </p>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Eligibility Checkboxes */}
                <div className="space-y-4">
                  {eligibilityItems.map((item) => (
                    <FormField
                      key={item.key}
                      control={form.control}
                      name={item.key as keyof FormData}
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent/50 transition-colors">
                          <FormControl>
                            <Checkbox
                              checked={field.value as boolean}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm font-medium leading-relaxed cursor-pointer">
                              {item.label}
                            </FormLabel>
                            <FormMessage />
                          </div>
                          {field.value && (
                            <Check className="h-4 w-4 text-green-600 ml-auto" />
                          )}
                        </FormItem>
                      )}
                    />
                  ))}
                </div>

                {/* Confirmation Section */}
                <Card className="bg-accent/20">
                  <CardHeader>
                    <CardTitle className="text-xl">Confirmation Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Name</label>
                        <Input
                          value={userProfile.name}
                          disabled
                          className="bg-muted"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Position</label>
                        <Input
                          value={userProfile.position}
                          disabled
                          className="bg-muted"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Date</label>
                        <Input
                          value={currentDate}
                          disabled
                          className="bg-muted"
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="digitalSignature"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-muted-foreground">
                              Digital Signature (Optional)
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Type your full name as signature"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Request Agreement Button */}
                <div className="flex flex-col space-y-4 pt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleRequestAgreement}
                    className="w-full md:w-auto mx-auto"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Request Link to the Electronic FairShare Agreement
                  </Button>
                  
                  <Button
                    type="submit"
                    className="w-full md:w-auto mx-auto"
                    disabled={!form.formState.isValid}
                  >
                    Submit Eligibility Confirmation
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FairShareEligibility;