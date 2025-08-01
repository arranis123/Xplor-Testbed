import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Compass, Users, Shield, Package, Truck, AlertTriangle } from "lucide-react";

const languages = [
  { id: "english", label: "English" },
  { id: "spanish", label: "Spanish" },
  { id: "french", label: "French" },
  { id: "german", label: "German" },
  { id: "italian", label: "Italian" },
  { id: "portuguese", label: "Portuguese" },
  { id: "mandarin", label: "Mandarin Chinese" },
  { id: "japanese", label: "Japanese" },
  { id: "korean", label: "Korean" },
  { id: "arabic", label: "Arabic" },
  { id: "russian", label: "Russian" },
  { id: "dutch", label: "Dutch" },
  { id: "swedish", label: "Swedish" },
  { id: "norwegian", label: "Norwegian" },
  { id: "danish", label: "Danish" },
];

const commonIncludes = [
  { id: "guide", label: "Professional Guide" },
  { id: "equipment", label: "All Equipment" },
  { id: "refreshments", label: "Refreshments" },
  { id: "lunch", label: "Lunch" },
  { id: "snacks", label: "Snacks & Water" },
  { id: "transportation", label: "Transportation" },
  { id: "entrance-fees", label: "Entrance Fees" },
  { id: "insurance", label: "Insurance Coverage" },
  { id: "photos", label: "Professional Photos" },
  { id: "certificate", label: "Certificate of Completion" },
  { id: "souvenir", label: "Souvenir" },
  { id: "safety-briefing", label: "Safety Briefing" },
];

const commonExcludes = [
  { id: "personal-expenses", label: "Personal Expenses" },
  { id: "tips", label: "Gratuities/Tips" },
  { id: "travel-insurance", label: "Travel Insurance" },
  { id: "accommodation", label: "Accommodation" },
  { id: "flights", label: "Flights" },
  { id: "meals", label: "Meals (unless specified)" },
  { id: "alcoholic-beverages", label: "Alcoholic Beverages" },
  { id: "personal-equipment", label: "Personal Equipment" },
  { id: "medical-expenses", label: "Medical Expenses" },
  { id: "visa-fees", label: "Visa Fees" },
];

const equipmentProvided = [
  { id: "safety-helmet", label: "Safety Helmet" },
  { id: "life-jacket", label: "Life Jacket" },
  { id: "wetsuit", label: "Wetsuit" },
  { id: "snorkel-gear", label: "Snorkeling Gear" },
  { id: "diving-equipment", label: "Diving Equipment" },
  { id: "climbing-gear", label: "Climbing Gear" },
  { id: "hiking-poles", label: "Hiking Poles" },
  { id: "bicycle", label: "Bicycle" },
  { id: "kayak", label: "Kayak & Paddle" },
  { id: "surfboard", label: "Surfboard" },
  { id: "fishing-equipment", label: "Fishing Equipment" },
  { id: "camera", label: "Underwater Camera" },
  { id: "binoculars", label: "Binoculars" },
  { id: "first-aid", label: "First Aid Kit" },
];

const equipmentRequired = [
  { id: "comfortable-shoes", label: "Comfortable Walking Shoes" },
  { id: "swimwear", label: "Swimwear" },
  { id: "sun-protection", label: "Sun Protection (hat, sunscreen)" },
  { id: "warm-clothes", label: "Warm Clothing" },
  { id: "rain-gear", label: "Rain Gear" },
  { id: "water-bottle", label: "Water Bottle" },
  { id: "small-backpack", label: "Small Backpack" },
  { id: "camera", label: "Camera" },
  { id: "cash", label: "Cash for Personal Expenses" },
  { id: "id-passport", label: "ID/Passport" },
  { id: "medical-certificate", label: "Medical Certificate (if required)" },
  { id: "insurance-documents", label: "Insurance Documents" },
];

const safetyRequirements = [
  { id: "swimming-ability", label: "Must be able to swim" },
  { id: "physical-fitness", label: "Good physical fitness required" },
  { id: "no-heart-conditions", label: "No heart conditions" },
  { id: "no-back-problems", label: "No back/neck problems" },
  { id: "no-pregnancy", label: "Not suitable for pregnant women" },
  { id: "no-recent-surgery", label: "No recent surgeries" },
  { id: "height-weight-limits", label: "Height/weight restrictions apply" },
  { id: "age-restrictions", label: "Age restrictions apply" },
  { id: "medical-clearance", label: "Medical clearance required" },
  { id: "experience-required", label: "Previous experience required" },
];

interface ExperienceFormProps {
  form: any;
}

export function ExperienceForm({ form }: ExperienceFormProps) {
  return (
    <div className="space-y-6">
      {/* Languages Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Users className="h-5 w-5" />
          Languages & Communication
        </h3>
        
        <FormField
          control={form.control}
          name="languages"
          render={() => (
            <FormItem>
              <FormLabel>Languages Available</FormLabel>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {languages.map((language) => (
                  <FormField
                    key={language.id}
                    control={form.control}
                    name="languages"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={language.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(language.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value || [], language.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: string) => value !== language.id
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal cursor-pointer">
                            {language.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* What's Included Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Package className="h-5 w-5" />
          What's Included
        </h3>
        
        <FormField
          control={form.control}
          name="includes"
          render={() => (
            <FormItem>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {commonIncludes.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="includes"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value || [], item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: string) => value !== item.id
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal cursor-pointer">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* What's Not Included Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Truck className="h-5 w-5" />
          What's Not Included
        </h3>
        
        <FormField
          control={form.control}
          name="excludes"
          render={() => (
            <FormItem>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {commonExcludes.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="excludes"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value || [], item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: string) => value !== item.id
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal cursor-pointer">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Equipment Provided Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Equipment Provided
        </h3>
        
        <FormField
          control={form.control}
          name="equipmentProvided"
          render={() => (
            <FormItem>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {equipmentProvided.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="equipmentProvided"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value || [], item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: string) => value !== item.id
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal cursor-pointer">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Equipment Required Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <Package className="h-5 w-5" />
          What to Bring
        </h3>
        
        <FormField
          control={form.control}
          name="equipmentRequired"
          render={() => (
            <FormItem>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {equipmentRequired.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="equipmentRequired"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value || [], item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: string) => value !== item.id
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal cursor-pointer">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Safety Requirements Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Safety Requirements
        </h3>
        
        <FormField
          control={form.control}
          name="safetyRequirements"
          render={() => (
            <FormItem>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {safetyRequirements.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="safetyRequirements"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value || [], item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: string) => value !== item.id
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal cursor-pointer">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Policies Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Policies</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="cancellationPolicy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cancellation Policy</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cancellation policy" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="free-cancellation-24h">Free cancellation up to 24 hours</SelectItem>
                    <SelectItem value="free-cancellation-48h">Free cancellation up to 48 hours</SelectItem>
                    <SelectItem value="free-cancellation-7d">Free cancellation up to 7 days</SelectItem>
                    <SelectItem value="partial-refund">Partial refund with conditions</SelectItem>
                    <SelectItem value="no-refund">No refund policy</SelectItem>
                    <SelectItem value="reschedule-only">Reschedule only, no refunds</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="weatherPolicy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weather Policy</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select weather policy" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="rain-or-shine">Rain or Shine (no cancellations)</SelectItem>
                    <SelectItem value="extreme-weather-only">Cancelled only in extreme weather</SelectItem>
                    <SelectItem value="inclement-weather">Cancelled/rescheduled for inclement weather</SelectItem>
                    <SelectItem value="indoor-alternative">Indoor alternative available</SelectItem>
                    <SelectItem value="full-refund-weather">Full refund if cancelled due to weather</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}