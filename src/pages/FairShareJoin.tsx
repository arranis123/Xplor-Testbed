import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, Upload, Check, X, AlertCircle, Ship, Award, Globe, FileText, Search, Filter, Plus, Clock, RotateCcw } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

// Form schema
const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email is required"),
  nationality: z.string().min(1, "Nationality is required"),
  yachtLength: z.string().optional(),
  currentVessel: z.string().optional(),
  yachtSizeCategory: z.string().min(1, "Yacht size category is required"),
  positionAppliedFor: z.string().min(1, "Position is required"),
  primaryDepartment: z.string().min(1, "Department is required"),
  primaryCoC: z.string().min(1, "Primary Certificate of Competency is required"),
  totalYearsYachting: z.number().min(0, "Years must be positive"),
  numberOfYachts: z.number().min(0, "Number must be positive"),
  largestGRT: z.number().min(0, "GRT must be positive"),
  longevityLastYacht: z.number().min(0, "Longevity must be positive"),
  seaMilesLogged: z.number().min(0, "Sea miles must be positive"),
  atlanticCrossings: z.number().min(0, "Crossings must be positive"),
  mediterraneanCrossings: z.number().min(0, "Crossings must be positive"),
  indianCrossings: z.number().min(0, "Crossings must be positive"),
  pacificCrossings: z.number().min(0, "Crossings must be positive"),
  suezTransits: z.number().min(0, "Transits must be positive"),
  panamaTransits: z.number().min(0, "Transits must be positive"),
  corinthTransits: z.number().min(0, "Transits must be positive"),
  charterRevenue: z.number().min(0, "Revenue must be positive"),
  languagesSpoken: z.string().optional(),
  termsAccepted: z.boolean().refine(val => val, "Terms must be accepted"),
  criAccepted: z.boolean().refine(val => val, "CRI+ agreement must be accepted")
});
type FormData = z.infer<typeof formSchema>;

// Global comprehensive qualification database
const globalQualifications = {
  // Mandatory for All Crew
  mandatoryAll: ["STCW Basic Safety Training (Personal Survival)", "STCW Basic Safety Training (Fire Prevention)", "STCW Basic Safety Training (Elementary First Aid)", "STCW Basic Safety Training (Personal Safety)", "STCW Basic Safety Training (Security Awareness)", "ENG1 Medical Certificate", "ML5 Medical Certificate (alternative to ENG1)"],
  // Deck & Navigation
  deckNavigation: ["RYA Powerboat Level 2", "RYA Tender Operator", "PWC Proficiency", "PWC Instructor", "RYA VHF Radio License", "RYA Day Skipper Theory", "RYA Day Skipper Practical", "RYA Coastal Skipper Theory", "RYA Coastal Skipper Practical", "RYA Yachtmaster Theory", "RYA Yachtmaster Coastal", "RYA Yachtmaster Offshore", "RYA Yachtmaster Ocean", "EDH (Electronic Chart Display)", "GSK (Global Satellite Knowledge)", "ECDIS Generic", "ECDIS Type Specific", "ARPA (Automatic Radar)", "GMDSS ROC (Radio Operator Certificate)", "GMDSS GOC (General Operator Certificate)", "HELM Personal", "HELM Operational", "HELM Management", "Oral Preparation Course", "PEC (Personal Emergency Communication)", "Business & Law for Masters", "Navigation Assessment", "Radar Assessment", "Celestial Navigation", "Survival Craft", "Security Duties", "Yacht Rating Certificate", "PDSD (Personal Watercraft Delivery)", "OOW <500GT", "OOW <3000GT", "Chief Mate <3000GT", "Master <200GT", "Master <500GT", "Master <3000GT", "Ship Security Officer", "Company Security Officer"],
  // Engineering & Technical
  engineering: ["AEC 1 (Approved Engine Course)", "AEC 2 (Approved Engine Course)", "MEOL (Y) Marine Engine Operator", "Y4 Engineer Officer", "Y3 Engineer Officer", "Y2 Engineer Officer", "Y1 Engineer Officer", "MEC 1 (Motor Engineering Certificate)", "MEC 2 (Motor Engineering Certificate)", "General Engineering Science", "SV Courses (Small Vessel)", "GMDSS Maintenance Certificate", "ETO (Electro Technical Officer)", "HV Certificate (High Voltage)", "Low Voltage Certificate", "Refrigeration Systems", "Air Conditioning Systems", "Hydraulic Systems", "Pneumatic Systems", "Diesel Engine Maintenance", "Gas Turbine Systems", "Electrical Systems", "Electronic Systems", "Power Management Systems", "Propulsion Systems", "Automation Systems", "HVAC Systems"],
  // Medical & Safety
  medicalSafety: ["Elementary First Aid", "Medical First Aid", "Medical Care Onboard", "Mental Health First Aid", "Mental Health Awareness", "Basic Fire Fighting", "Advanced Fire Fighting", "Updated Fire Fighting", "Crowd Management", "Crisis Management & Human Behaviour", "Personal Safety & Social Responsibility", "Survival Craft & Rescue Boats", "Fast Rescue Boats", "Polar Waters Basic", "Polar Waters Advanced", "Ship Security Awareness", "Designated Security Duties", "Security Awareness (Port Facility)", "ISPS Code Training", "Anti-Piracy Awareness", "Enclosed Space Entry", "Confined Space Entry", "Hot Work Permits", "Risk Assessment", "Permit to Work Systems", "COSHH Awareness", "Manual Handling", "Working at Height", "Ladder Safety", "Lifting Operations"],
  // Leadership & Law
  leadership: ["HELM Personal", "HELM Operational", "HELM Management", "Leadership & Teamwork", "Maritime Law", "MLC (Maritime Labour Convention)", "PPR (Personal Protective Equipment)", "Environmental Awareness", "Waste Management", "MARPOL Awareness", "Ballast Water Management", "Oil Pollution Prevention", "Sewage Systems", "Garbage Management", "SOx Compliance", "NOx Compliance", "Carbon Footprint Reduction", "Green Technology", "Sustainable Practices"],
  // Interior & Service
  interior: ["Food Safety Level 1", "Food Safety Level 2", "Food Safety Level 3", "HACCP Principles", "Allergen Awareness", "Nutrition Awareness", "Menu Planning", "Cost Control", "Silver Service", "Butler Service", "Concierge Training", "Guest Relations", "Hospitality Management", "Event Planning", "Table Setting", "Wine Service", "Cocktail Preparation", "Mixology Advanced", "Floristry Basic", "Floristry Advanced", "Interior Design Awareness", "Fabric Care", "Laundry Management", "Housekeeping Standards", "Guest Service (GUEST Course)", "Cultural Awareness", "Etiquette & Protocol", "WSET Level 1 (Wine)", "WSET Level 2 (Wine)", "WSET Level 3 (Wine)", "Sake Professional", "Sommelier Certificate", "Barista Training", "Tea Specialist"],
  // Wellness & Special Roles
  wellness: ["Spa Therapy Certificate", "Massage Therapy", "Aromatherapy", "Reflexology", "Fitness Instructor", "Personal Trainer", "Yoga Instructor", "Pilates Instructor", "Aqua Fitness", "Sports Therapy", "Nutrition Counseling", "Meditation Instructor", "Mindfulness Training", "Stress Management", "Wellness Coaching", "Beauty Therapy", "Nail Technician", "Hair Styling", "Makeup Artist", "Skincare Specialist"],
  // Water Sports & Recreation
  waterSports: ["Dive Instructor (PADI)", "Dive Instructor (SSI)", "Dive Instructor (BSAC)", "Divemaster", "Rescue Diver", "Advanced Open Water", "Open Water Diver", "Technical Diving", "Nitrox Specialty", "Deep Diving Specialty", "Wreck Diving", "Underwater Photography", "Marine Biology", "Shark Diving Specialty", "Jet Ski Instructor", "Water Ski Instructor", "Wakeboard Instructor", "Kite Surf Instructor", "Wind Surf Instructor", "SUP Instructor", "Sailing Instructor", "Kayak Guide", "Snorkel Guide", "Fishing Guide", "Tender Driving", "Beach Club Operations"],
  // Aviation & Helicopter Operations
  aviation: ["HLO (Helicopter Landing Officer)", "Aviation Fuel Handling", "Ground Handling", "Aviation Security", "Helicopter Underwater Escape Training", "Aviation First Aid", "Dangerous Goods (Aviation)", "Load Planning", "Weight & Balance", "Flight Planning Support", "Aviation Weather", "Communication Procedures", "Emergency Response", "Fire & Rescue (Aviation)", "Pilot License (Private)", "Pilot License (Commercial)", "Drone Operations", "UAV Pilot License"],
  // Technical & IT
  technical: ["AV Systems Basic", "AV Systems Advanced", "Home Automation", "Network Administration", "Cybersecurity Awareness", "Data Protection", "GDPR Compliance", "Satellite Communications", "IT Support", "Computer Repair", "Software Installation", "Database Management", "WiFi Management", "Streaming Systems", "Gaming Systems", "Virtual Reality Setup", "Smart Home Integration", "Security Systems", "CCTV Operations", "Access Control", "Entertainment Systems", "Karaoke Systems", "Lighting Control", "Climate Control"],
  // Certifications of Competency (CoCs)
  certificatesOfCompetency: {
    "Under 200 GRT": ["RYA Yachtmaster Offshore", "Master <200GT", "OOW <200GT", "Engineer <200GT", "MEOL (Y)", "AEC 1", "Chief Steward Certificate", "Chef Certificate"],
    "Under 500 GRT": ["Master <500GT", "Chief Mate <500GT", "OOW <500GT", "Chief Engineer <500GT", "Second Engineer <500GT", "MEOL (Y)", "AEC 1", "AEC 2", "ETO <500GT", "Chief Steward Certificate", "Purser Certificate", "Chef Certificate"],
    "Under 3000 GRT": ["Master <3000GT", "Chief Mate <3000GT", "Second Mate <3000GT", "OOW <3000GT", "Chief Engineer <3000GT", "Second Engineer <3000GT", "Third Engineer <3000GT", "Y1 Engineer", "Y2 Engineer", "Y3 Engineer", "Y4 Engineer", "ETO <3000GT", "Chief Steward Certificate", "Purser Certificate", "Chef Certificate", "HLO Certificate"]
  }
};

// CoC prerequisite mapping
const cocPrerequisites = {
  "Master <3000GT": ["STCW Basic Safety Training (Personal Survival)", "STCW Basic Safety Training (Fire Prevention)", "STCW Basic Safety Training (Elementary First Aid)", "STCW Basic Safety Training (Personal Safety)", "STCW Basic Safety Training (Security Awareness)", "ENG1 Medical Certificate", "GMDSS GOC (General Operator Certificate)", "ECDIS Generic", "HELM Management", "Advanced Fire Fighting", "Medical Care Onboard", "Ship Security Officer"],
  "Chief Mate <3000GT": ["STCW Basic Safety Training (Personal Survival)", "STCW Basic Safety Training (Fire Prevention)", "STCW Basic Safety Training (Elementary First Aid)", "STCW Basic Safety Training (Personal Safety)", "STCW Basic Safety Training (Security Awareness)", "ENG1 Medical Certificate", "GMDSS GOC (General Operator Certificate)", "ECDIS Generic", "Advanced Fire Fighting", "Medical First Aid"],
  "Master <500GT": ["STCW Basic Safety Training (Personal Survival)", "STCW Basic Safety Training (Fire Prevention)", "STCW Basic Safety Training (Elementary First Aid)", "STCW Basic Safety Training (Personal Safety)", "STCW Basic Safety Training (Security Awareness)", "ENG1 Medical Certificate", "GMDSS GOC (General Operator Certificate)", "HELM Operational", "Advanced Fire Fighting", "Medical First Aid"],
  "OOW <3000GT": ["STCW Basic Safety Training (Personal Survival)", "STCW Basic Safety Training (Fire Prevention)", "STCW Basic Safety Training (Elementary First Aid)", "STCW Basic Safety Training (Personal Safety)", "STCW Basic Safety Training (Security Awareness)", "ENG1 Medical Certificate", "GMDSS GOC (General Operator Certificate)", "ECDIS Generic", "Advanced Fire Fighting"],
  "Y3 Engineer": ["STCW Basic Safety Training (Personal Survival)", "STCW Basic Safety Training (Fire Prevention)", "STCW Basic Safety Training (Elementary First Aid)", "STCW Basic Safety Training (Personal Safety)", "STCW Basic Safety Training (Security Awareness)", "ENG1 Medical Certificate", "AEC 1 (Approved Engine Course)", "AEC 2 (Approved Engine Course)", "Advanced Fire Fighting", "HV Certificate (High Voltage)"],
  "MEOL (Y)": ["STCW Basic Safety Training (Personal Survival)", "STCW Basic Safety Training (Fire Prevention)", "STCW Basic Safety Training (Elementary First Aid)", "STCW Basic Safety Training (Personal Safety)", "STCW Basic Safety Training (Security Awareness)", "ENG1 Medical Certificate", "AEC 1 (Approved Engine Course)", "Basic Fire Fighting"],
  "ETO <3000GT": ["STCW Basic Safety Training (Personal Survival)", "STCW Basic Safety Training (Fire Prevention)", "STCW Basic Safety Training (Elementary First Aid)", "STCW Basic Safety Training (Personal Safety)", "STCW Basic Safety Training (Security Awareness)", "ENG1 Medical Certificate", "AV Systems Advanced", "Network Administration", "Basic Fire Fighting"],
  "RYA Yachtmaster Offshore": ["STCW Basic Safety Training (Personal Survival)", "STCW Basic Safety Training (Fire Prevention)", "STCW Basic Safety Training (Elementary First Aid)", "STCW Basic Safety Training (Personal Safety)", "STCW Basic Safety Training (Security Awareness)", "ENG1 Medical Certificate", "RYA VHF Radio License", "RYA Day Skipper Theory", "RYA Coastal Skipper Theory"]
};

// Position mapping by vessel size with department grouping
const positionsByVesselSize = {
  "Under 200 GRT": {
    "Deck": ["Master (200 GT)", "Mate", "Deckhand", "Bosun", "Tender Driver", "Watersports Instructor"],
    "Engineering": ["Sole Engineer", "AEC Engineer", "Electrician/Mechanic (dual-role)"],
    "Interior": ["Steward/Stewardess", "Cook/Stew", "Chef (Solo or dual-role)", "Housekeeper"],
    "Other": ["Nanny", "Masseuse", "Dive Instructor", "Personal Trainer"]
  },
  "Under 500 GRT": {
    "Deck": ["Master <500 GT", "Chief Officer", "Second Officer", "Bosun", "Lead Deckhand", "Deckhand", "Dive/Watersports Instructor"],
    "Engineering": ["Chief Engineer (MEOL(Y), Y4, Y3)", "Second Engineer", "AEC 1 & 2 Engineer", "ETO (optional)"],
    "Interior": ["Chief Stewardess", "Second Steward/Stewardess", "Laundry Stewardess", "Housekeeper", "Cook / Chef", "Masseuse / Beautician", "Butler (optional)", "Purser (optional)"],
    "Other": ["AV/IT Support (dual-role)", "Fitness Trainer", "Medical Officer (on large private yachts)"]
  },
  "Under 3000 GRT": {
    "Deck": ["Master <3000 GT", "Chief Officer (Unlimited or Yacht)", "Second Officer", "Third Officer", "Bosun", "Lead Deckhand", "Deckhand", "Dive Master / Jet Ski Instructor", "Security Officer (ISPS/Designated)"],
    "Engineering": ["Chief Engineer Y1–Y3 or MEC 2", "Second Engineer", "Third Engineer", "Sole ETO / IT Officer", "AV/IT Manager", "HVAC Technician", "Motorman (optional)"],
    "Interior": ["Purser", "Chief Stewardess", "Second Stewardess", "Third Stewardess", "Laundry Supervisor", "Spa Therapist / Beautician", "Hairdresser", "Butler / Valet", "Housekeeper", "Private Chef", "Head Chef / Sous Chef", "Pastry Chef"],
    "Other": ["Aviation Officer / Heli Ops (if helipad)", "Medical Officer / Nurse", "Yacht Security Team (on high-risk itineraries)", "Dive Instructor / Expedition Guide", "Specialist Roles (Videographer, Photographer, etc.)"]
  }
};
const departments = ['Deck', 'Engineering', 'Interior', 'AV/IT', 'Wellness', 'Hospitality', 'Aviation'];
const vesselSizes = ['Under 200 GRT', 'Under 500 GRT', 'Under 3000 GRT'];
const nationalities = ["Afghan", "Albanian", "Algerian", "American", "Andorran", "Angolan", "Argentinian", "Armenian", "Australian", "Austrian", "Azerbaijani", "Bahamian", "Bahraini", "Bangladeshi", "Barbadian", "Belarusian", "Belgian", "Belizean", "Beninese", "Bhutanese", "Bolivian", "Bosnian", "Brazilian", "British", "Bruneian", "Bulgarian", "Burkinabe", "Burmese", "Burundian", "Cambodian", "Cameroonian", "Canadian", "Cape Verdean", "Central African", "Chadian", "Chilean", "Chinese", "Colombian", "Comoran", "Congolese", "Costa Rican", "Croatian", "Cuban", "Cypriot", "Czech", "Danish", "Djiboutian", "Dominican", "Dutch", "East Timorese", "Ecuadorean", "Egyptian", "Emirian", "Equatorial Guinean", "Eritrean", "Estonian", "Ethiopian", "Fijian", "Filipino", "Finnish", "French", "Gabonese", "Gambian", "Georgian", "German", "Ghanaian", "Greek", "Grenadian", "Guatemalan", "Guinea-Bissauan", "Guinean", "Guyanese", "Haitian", "Herzegovinian", "Honduran", "Hungarian", "I-Kiribati", "Icelander", "Indian", "Indonesian", "Iranian", "Iraqi", "Irish", "Israeli", "Italian", "Ivorian", "Jamaican", "Japanese", "Jordanian", "Kazakhstani", "Kenyan", "Kittian and Nevisian", "Kuwaiti", "Kyrgyz", "Laotian", "Latvian", "Lebanese", "Liberian", "Libyan", "Liechtensteiner", "Lithuanian", "Luxembourgish", "Macedonian", "Malagasy", "Malawian", "Malaysian", "Maldivan", "Malian", "Maltese", "Marshallese", "Mauritanian", "Mauritian", "Mexican", "Micronesian", "Moldovan", "Monacan", "Mongolian", "Moroccan", "Mosotho", "Motswana", "Mozambican", "Namibian", "Nauruan", "Nepalese", "New Zealander", "Ni-Vanuatu", "Nicaraguan", "Nigerian", "Nigerien", "North Korean", "Northern Irish", "Norwegian", "Omani", "Pakistani", "Palauan", "Palestinian", "Panamanian", "Papua New Guinean", "Paraguayan", "Peruvian", "Polish", "Portuguese", "Qatari", "Romanian", "Russian", "Rwandan", "Saint Lucian", "Salvadoran", "Samoan", "San Marinese", "Sao Tomean", "Saudi", "Scottish", "Senegalese", "Serbian", "Seychellois", "Sierra Leonean", "Singaporean", "Slovakian", "Slovenian", "Solomon Islander", "Somali", "South African", "South Korean", "Spanish", "Sri Lankan", "Sudanese", "Surinamer", "Swazi", "Swedish", "Swiss", "Syrian", "Taiwanese", "Tajik", "Tanzanian", "Thai", "Togolese", "Tongan", "Trinidadian", "Tunisian", "Turkish", "Tuvaluan", "Ugandan", "Ukrainian", "Uruguayan", "Uzbekistani", "Venezuelan", "Vietnamese", "Welsh", "Yemenite", "Zambian", "Zimbabwean"];

// Define yacht experience entry type
interface YachtExperience {
  id: string;
  yachtName: string;
  position: string;
  yachtType: 'Charter' | 'Private';
  crewCount: number;
  startDate: string;
  endDate: string;
  rotationSchedule?: string;
  roleType: 'Full-Time' | 'Part-Time' | 'Rotational';
  yachtSizeCategory?: string;
  durationMonths?: number;
}
export default function FairShareJoin() {
  const navigate = useNavigate();
  const [selectedYachtSize, setSelectedYachtSize] = useState<string>("");
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const [selectedCoC, setSelectedCoC] = useState<string>("");
  const [qualificationStatus, setQualificationStatus] = useState<{
    [key: string]: {
      status: 'valid' | 'expired' | 'in-progress' | 'not-held';
      hasFile: boolean;
    };
  }>({});
  const [showTerms, setShowTerms] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  // Yacht experience state
  const [yachtExperiences, setYachtExperiences] = useState<YachtExperience[]>([]);
  const [showAddForm, setShowAddForm] = useState<'Full-Time' | 'Part-Time' | 'Rotational' | null>(null);
  const [newExperience, setNewExperience] = useState<Partial<YachtExperience>>({});

  // Navigation experience state
  const [navigationExperience, setNavigationExperience] = useState<{
    [key: string]: {
      checked: boolean;
      year?: string;
      documentation?: File;
    };
  }>({});
  const [openSections, setOpenSections] = useState<{
    [key: string]: boolean;
  }>({
    mandatoryAll: true,
    prerequisites: true,
    deckNavigation: false,
    engineering: false,
    medicalSafety: false,
    leadership: false,
    interior: false,
    wellness: false,
    waterSports: false,
    aviation: false,
    technical: false
  });
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      nationality: "",
      currentVessel: "",
      yachtSizeCategory: "",
      positionAppliedFor: "",
      primaryDepartment: "",
      primaryCoC: "",
      totalYearsYachting: 0,
      numberOfYachts: 0,
      largestGRT: 0,
      longevityLastYacht: 0,
      seaMilesLogged: 0,
      atlanticCrossings: 0,
      mediterraneanCrossings: 0,
      indianCrossings: 0,
      pacificCrossings: 0,
      suezTransits: 0,
      panamaTransits: 0,
      corinthTransits: 0,
      charterRevenue: 0,
      languagesSpoken: "",
      termsAccepted: false,
      criAccepted: false
    }
  });
  const onSubmit = (data: FormData) => {
    // Check if required prerequisites are valid
    const prerequisites = selectedCoC ? cocPrerequisites[selectedCoC as keyof typeof cocPrerequisites] || [] : [];
    const invalidPrerequisites = prerequisites.filter(cert => !qualificationStatus[cert] || qualificationStatus[cert].status !== 'valid');
    if (invalidPrerequisites.length > 0) {
      toast({
        title: "Missing Required Qualifications",
        description: `Please mark the following as valid: ${invalidPrerequisites.slice(0, 3).join(', ')}${invalidPrerequisites.length > 3 ? '...' : ''}`,
        variant: "destructive"
      });
      return;
    }
    console.log("FairShare application submitted:", {
      ...data,
      qualifications: qualificationStatus
    });
    toast({
      title: "Application Submitted!",
      description: "Your FairShare application has been sent for review. You'll receive a confirmation email shortly."
    });
  };
  const handleYachtSizeChange = (size: string) => {
    setSelectedYachtSize(size);
    form.setValue("yachtSizeCategory", size);
    // Reset dependent fields when yacht size changes
    setSelectedPosition("");
    setSelectedCoC("");
    form.setValue("positionAppliedFor", "");
    form.setValue("primaryCoC", "");
  };
  const handlePositionChange = (position: string) => {
    setSelectedPosition(position);
    form.setValue("positionAppliedFor", position);
    // Reset CoC when position changes
    setSelectedCoC("");
    form.setValue("primaryCoC", "");
  };
  const handleCoCChange = (coc: string) => {
    setSelectedCoC(coc);
    form.setValue("primaryCoC", coc);
  };
  const handleQualificationStatus = (qual: string, status: 'valid' | 'expired' | 'in-progress' | 'not-held', hasFile: boolean = false) => {
    setQualificationStatus(prev => ({
      ...prev,
      [qual]: {
        status,
        hasFile
      }
    }));
  };
  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Get available positions based on selected yacht size
  const availablePositions = selectedYachtSize ? Object.values(positionsByVesselSize[selectedYachtSize as keyof typeof positionsByVesselSize] || {}).flat() : [];

  // Get available CoCs based on selected yacht size
  const availableCoCs = selectedYachtSize ? globalQualifications.certificatesOfCompetency[selectedYachtSize as keyof typeof globalQualifications.certificatesOfCompetency] || [] : [];

  // Get required prerequisites for selected CoC
  const requiredPrerequisites = selectedCoC ? cocPrerequisites[selectedCoC as keyof typeof cocPrerequisites] || [] : [];

  // Filter qualifications based on search and category
  const filterQualifications = (qualList: string[]) => {
    let filtered = qualList;
    if (searchTerm) {
      filtered = filtered.filter(qual => qual.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return filtered;
  };

  // Yacht experience functions
  const addYachtExperience = (type: 'Full-Time' | 'Part-Time' | 'Rotational') => {
    setShowAddForm(type);
    setNewExperience({
      roleType: type
    });
  };
  const saveYachtExperience = () => {
    if (!newExperience.yachtName || !newExperience.position || !newExperience.yachtType || !newExperience.crewCount || !newExperience.startDate || !newExperience.endDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    const startDate = new Date(newExperience.startDate!);
    const endDate = new Date(newExperience.endDate!);
    const durationMonths = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
    const experience: YachtExperience = {
      id: Date.now().toString(),
      yachtName: newExperience.yachtName!,
      position: newExperience.position!,
      yachtType: newExperience.yachtType!,
      crewCount: newExperience.crewCount!,
      startDate: newExperience.startDate!,
      endDate: newExperience.endDate!,
      rotationSchedule: newExperience.rotationSchedule,
      roleType: newExperience.roleType!,
      durationMonths
    };
    setYachtExperiences([...yachtExperiences, experience]);
    setShowAddForm(null);
    setNewExperience({});
    toast({
      title: "Experience Added",
      description: `${experience.roleType} position on ${experience.yachtName} has been added`
    });
  };
  const removeYachtExperience = (id: string) => {
    setYachtExperiences(yachtExperiences.filter(exp => exp.id !== id));
  };

  // Calculate experience summary
  const experienceSummary = {
    fullTime: yachtExperiences.filter(exp => exp.roleType === 'Full-Time'),
    partTime: yachtExperiences.filter(exp => exp.roleType === 'Part-Time'),
    rotational: yachtExperiences.filter(exp => exp.roleType === 'Rotational'),
    avgCrewSize: yachtExperiences.length > 0 ? Math.round(yachtExperiences.reduce((sum, exp) => sum + exp.crewCount, 0) / yachtExperiences.length) : 0,
    charterCount: yachtExperiences.filter(exp => exp.yachtType === 'Charter').length,
    privateCount: yachtExperiences.filter(exp => exp.yachtType === 'Private').length
  };
  const getAvgDuration = (experiences: YachtExperience[], inWeeks = false) => {
    if (experiences.length === 0) return 0;
    const avgMonths = experiences.reduce((sum, exp) => sum + (exp.durationMonths || 0), 0) / experiences.length;
    return inWeeks ? Math.round(avgMonths * 4.33) : Math.round(avgMonths * 10) / 10;
  };

  // Calculate completion progress
  const totalPrerequisites = requiredPrerequisites.length;
  const validPrerequisites = requiredPrerequisites.filter(cert => qualificationStatus[cert]?.status === 'valid').length;
  const completionPercentage = totalPrerequisites > 0 ? validPrerequisites / totalPrerequisites * 100 : 0;

  // Qualification status component
  const QualificationItem = ({
    qualification,
    isRequired = false
  }: {
    qualification: string;
    isRequired?: boolean;
  }) => {
    const status = qualificationStatus[qualification];
    const getStatusIcon = () => {
      switch (status?.status) {
        case 'valid':
          return <Check className="h-4 w-4 text-green-600" />;
        case 'expired':
          return <X className="h-4 w-4 text-red-600" />;
        case 'in-progress':
          return <AlertCircle className="h-4 w-4 text-yellow-600" />;
        default:
          return <X className="h-4 w-4 text-muted-foreground" />;
      }
    };
    const getStatusColor = () => {
      switch (status?.status) {
        case 'valid':
          return 'border-green-200 bg-green-50';
        case 'expired':
          return 'border-red-200 bg-red-50';
        case 'in-progress':
          return 'border-yellow-200 bg-yellow-50';
        default:
          return 'border-muted bg-background';
      }
    };
    return <div className={`p-3 rounded-lg border ${getStatusColor()} ${isRequired ? 'ring-2 ring-primary/20' : ''}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {getStatusIcon()}
            <span className="text-sm font-medium">{qualification}</span>
            {isRequired && <Badge variant="secondary" className="text-xs">Required</Badge>}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={status?.status || 'not-held'} onValueChange={value => handleQualificationStatus(qualification, value as any)}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="valid">✅ Valid</SelectItem>
              <SelectItem value="expired">❌ Expired</SelectItem>
              <SelectItem value="in-progress">🟡 In Progress</SelectItem>
              <SelectItem value="not-held">⚪ Not Held</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm" className="h-8">
            <Upload className="h-3 w-3" />
          </Button>
        </div>
      </div>;
  };
  return <>
      <Helmet>
        <title>Join FairShare – Crew Qualification & Revenue Share Application | Xplor</title>
        <meta name="description" content="Join the FairShare crew network with comprehensive qualification validation. Verify your maritime certificates and become part of the exclusive yacht crew revenue sharing program." />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Join FairShare – Crew Qualification & Revenue Share Application
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Join the exclusive FairShare crew network where your qualifications and experience translate to revenue sharing opportunities. 
              Complete our comprehensive qualification validation and become part of the Xplor crew community.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Info Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ship className="h-5 w-5" />
                    Basic Info
                  </CardTitle>
                  <CardDescription>
                    Tell us about yourself and your background
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="fullName" render={({
                    field
                  }) => <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />
                    <FormField control={form.control} name="email" render={({
                    field
                  }) => <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="nationality" render={({
                    field
                  }) => <FormItem>
                          <FormLabel>Nationality *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select nationality" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="max-h-[200px]">
                              {nationalities.map(nationality => <SelectItem key={nationality} value={nationality}>
                                  {nationality}
                                </SelectItem>)}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>} />
                     <FormField control={form.control} name="currentVessel" render={({
                    field
                  }) => <FormItem>
                          <FormLabel>Current Vessel (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="M/Y Example" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                     <FormField control={form.control} name="yachtLength" render={({
                    field
                  }) => <FormItem>
                          <FormLabel>Yacht Length (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 50m, 164ft" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>} />
                     <div></div>
                  </div>

                  <FormField control={form.control} name="primaryDepartment" render={({
                  field
                }) => <FormItem>
                        <FormLabel>Primary Department *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {departments.map(dept => <SelectItem key={dept} value={dept}>
                                {dept}
                              </SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>} />
                </CardContent>
              </Card>

              {/* Yacht Experience Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Position & Certificate of Competancy</CardTitle>
                  <CardDescription>Select your yacht size, position and valid CoC</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField control={form.control} name="yachtSizeCategory" render={({
                  field
                }) => <FormItem>
                        <FormLabel>Yacht Size Category (GRT) *</FormLabel>
                        <Select onValueChange={handleYachtSizeChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select yacht size category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {vesselSizes.map(size => <SelectItem key={size} value={size}>
                                {size}
                              </SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>} />

                  {/* Position Selection - Only show when yacht size is selected */}
                  {selectedYachtSize && <FormField control={form.control} name="positionAppliedFor" render={({
                  field
                }) => <FormItem>
                          <FormLabel>Position *</FormLabel>
                          <Select onValueChange={handlePositionChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select position" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {selectedYachtSize && positionsByVesselSize[selectedYachtSize as keyof typeof positionsByVesselSize] && Object.entries(positionsByVesselSize[selectedYachtSize as keyof typeof positionsByVesselSize]).map(([department, positions]) => <div key={department}>
                                    <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">{department}</div>
                                    {(positions as string[]).map(position => <SelectItem key={position} value={position} className="pl-6">{position}</SelectItem>)}
                                  </div>)}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>} />}

                  {/* CoC Selection - Only show when yacht size is selected */}
                  {selectedYachtSize && <FormField control={form.control} name="primaryCoC" render={({
                  field
                }) => <FormItem>
                          <FormLabel>Primary Certificate of Competency *</FormLabel>
                          <Select onValueChange={handleCoCChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your highest CoC" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {availableCoCs.map(coc => <SelectItem key={coc} value={coc}>
                                  {coc}
                                </SelectItem>)}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>} />}
                </CardContent>
              </Card>

              {/* Prerequisites Section - Only show when CoC is selected */}
              {selectedCoC && requiredPrerequisites.length > 0 && <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Required Prerequisites for {selectedCoC}
                    </CardTitle>
                    <CardDescription>
                      These qualifications are mandatory for your selected Certificate of Competency
                    </CardDescription>
                    <div className="flex items-center gap-4 mt-4">
                      <Progress value={completionPercentage} className="flex-1" />
                      <span className="text-sm font-medium">
                        {validPrerequisites}/{totalPrerequisites} Complete
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      {requiredPrerequisites.map(qual => <QualificationItem key={qual} qualification={qual} isRequired />)}
                    </div>
                  </CardContent>
                </Card>}

              {/* Global Qualifications Checklist */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Complete Qualification Checklist
                  </CardTitle>
                  <CardDescription>
                    Declare all your qualifications and certifications. Use the search and filter options to find specific qualifications.
                  </CardDescription>
                  
                  {/* Search and Filter */}
                  <div className="flex gap-4 mt-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search qualifications..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
                    </div>
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                      <SelectTrigger className="w-[200px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="deck">Deck & Navigation</SelectItem>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="medical">Medical & Safety</SelectItem>
                        <SelectItem value="interior">Interior & Service</SelectItem>
                        <SelectItem value="wellness">Wellness</SelectItem>
                        <SelectItem value="watersports">Water Sports</SelectItem>
                        <SelectItem value="aviation">Aviation</SelectItem>
                        <SelectItem value="technical">Technical & IT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Mandatory for All Crew */}
                  <Collapsible open={openSections.mandatoryAll} onOpenChange={() => toggleSection('mandatoryAll')}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-muted/50 rounded-lg hover:bg-muted/70">
                      <h3 className="font-semibold text-red-600">💠 Mandatory for All Crew</h3>
                      <ChevronDown className={`h-4 w-4 transition-transform ${openSections.mandatoryAll ? 'rotate-180' : ''}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3">
                      <div className="grid gap-3">
                        {filterQualifications(globalQualifications.mandatoryAll).map(qual => <QualificationItem key={qual} qualification={qual} />)}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Additional Qualifications Section Header */}
                  <div className="mt-6 mb-4">
                    <h2 className="text-xl font-semibold text-foreground">Additional Qualifications</h2>
                    <p className="text-sm text-muted-foreground">Optional qualifications to enhance your profile</p>
                  </div>

                  {/* Deck & Navigation */}
                  {(filterCategory === 'all' || filterCategory === 'deck') && <Collapsible open={openSections.deckNavigation} onOpenChange={() => toggleSection('deckNavigation')}>
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-blue-50 rounded-lg hover:bg-blue-100">
                        <h3 className="font-semibold text-blue-600">🔹 Deck & Navigation</h3>
                        <ChevronDown className={`h-4 w-4 transition-transform ${openSections.deckNavigation ? 'rotate-180' : ''}`} />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-3">
                        <div className="grid gap-3">
                          {filterQualifications(globalQualifications.deckNavigation).map(qual => <QualificationItem key={qual} qualification={qual} />)}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>}

                  {/* Engineering & Technical */}
                  {(filterCategory === 'all' || filterCategory === 'engineering') && <Collapsible open={openSections.engineering} onOpenChange={() => toggleSection('engineering')}>
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-red-50 rounded-lg hover:bg-red-100">
                        <h3 className="font-semibold text-red-600">🔧 Engineering & Technical</h3>
                        <ChevronDown className={`h-4 w-4 transition-transform ${openSections.engineering ? 'rotate-180' : ''}`} />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-3">
                        <div className="grid gap-3">
                          {filterQualifications(globalQualifications.engineering).map(qual => <QualificationItem key={qual} qualification={qual} />)}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>}

                  {/* Medical & Safety */}
                  {(filterCategory === 'all' || filterCategory === 'medical') && <Collapsible open={openSections.medicalSafety} onOpenChange={() => toggleSection('medicalSafety')}>
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-green-50 rounded-lg hover:bg-green-100">
                        <h3 className="font-semibold text-green-600">🆘 Medical & Safety</h3>
                        <ChevronDown className={`h-4 w-4 transition-transform ${openSections.medicalSafety ? 'rotate-180' : ''}`} />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-3">
                        <div className="grid gap-3">
                          {filterQualifications(globalQualifications.medicalSafety).map(qual => <QualificationItem key={qual} qualification={qual} />)}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>}

                  {/* Leadership & Law */}
                  <Collapsible open={openSections.leadership} onOpenChange={() => toggleSection('leadership')}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-purple-50 rounded-lg hover:bg-purple-100">
                      <h3 className="font-semibold text-purple-600">⚖️ Leadership & Law</h3>
                      <ChevronDown className={`h-4 w-4 transition-transform ${openSections.leadership ? 'rotate-180' : ''}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3">
                      <div className="grid gap-3">
                        {filterQualifications(globalQualifications.leadership).map(qual => <QualificationItem key={qual} qualification={qual} />)}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Interior & Service */}
                  {(filterCategory === 'all' || filterCategory === 'interior') && <Collapsible open={openSections.interior} onOpenChange={() => toggleSection('interior')}>
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100">
                        <h3 className="font-semibold text-yellow-600">🎓 Interior & Service</h3>
                        <ChevronDown className={`h-4 w-4 transition-transform ${openSections.interior ? 'rotate-180' : ''}`} />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-3">
                        <div className="grid gap-3">
                          {filterQualifications(globalQualifications.interior).map(qual => <QualificationItem key={qual} qualification={qual} />)}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>}

                  {/* Wellness & Special Roles */}
                  {(filterCategory === 'all' || filterCategory === 'wellness') && <Collapsible open={openSections.wellness} onOpenChange={() => toggleSection('wellness')}>
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-teal-50 rounded-lg hover:bg-teal-100">
                        <h3 className="font-semibold text-teal-600">🧘 Wellness & Special Roles</h3>
                        <ChevronDown className={`h-4 w-4 transition-transform ${openSections.wellness ? 'rotate-180' : ''}`} />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-3">
                        <div className="grid gap-3">
                          {filterQualifications(globalQualifications.wellness).map(qual => <QualificationItem key={qual} qualification={qual} />)}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>}

                  {/* Water Sports & Recreation */}
                  {(filterCategory === 'all' || filterCategory === 'watersports') && <Collapsible open={openSections.waterSports} onOpenChange={() => toggleSection('waterSports')}>
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-cyan-50 rounded-lg hover:bg-cyan-100">
                        <h3 className="font-semibold text-cyan-600">🏄 Water Sports & Recreation</h3>
                        <ChevronDown className={`h-4 w-4 transition-transform ${openSections.waterSports ? 'rotate-180' : ''}`} />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-3">
                        <div className="grid gap-3">
                          {filterQualifications(globalQualifications.waterSports).map(qual => <QualificationItem key={qual} qualification={qual} />)}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>}

                  {/* Aviation & Helicopter Operations */}
                  {(filterCategory === 'all' || filterCategory === 'aviation') && <Collapsible open={openSections.aviation} onOpenChange={() => toggleSection('aviation')}>
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100">
                        <h3 className="font-semibold text-indigo-600">✈️ Aviation & Helicopter Operations</h3>
                        <ChevronDown className={`h-4 w-4 transition-transform ${openSections.aviation ? 'rotate-180' : ''}`} />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-3">
                        <div className="grid gap-3">
                          {filterQualifications(globalQualifications.aviation).map(qual => <QualificationItem key={qual} qualification={qual} />)}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>}

                  {/* Technical & IT */}
                  {(filterCategory === 'all' || filterCategory === 'technical') && <Collapsible open={openSections.technical} onOpenChange={() => toggleSection('technical')}>
                      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
                        <h3 className="font-semibold text-gray-600">💻 Technical & IT</h3>
                        <ChevronDown className={`h-4 w-4 transition-transform ${openSections.technical ? 'rotate-180' : ''}`} />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-3">
                        <div className="grid gap-3">
                          {filterQualifications(globalQualifications.technical).map(qual => <QualificationItem key={qual} qualification={qual} />)}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>}
                </CardContent>
              </Card>

              {/* Crew Experience & Longevity Tracker */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Crew Experience & Longevity Tracker
                  </CardTitle>
                  <CardDescription>
                    Track your detailed work history across all yacht positions to calculate your CRI+ score
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Full-Time Positions */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">⛵ Full-Time Positions</h3>
                      <Button type="button" variant="outline" size="sm" onClick={() => addYachtExperience('Full-Time')}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Full-Time Position
                      </Button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Permanent roles with standard employment contracts
                    </div>
                    
                    {/* Full-time position entries */}
                    {experienceSummary.fullTime.length === 0 ? <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                        <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-muted-foreground">No full-time positions added yet</p>
                        <p className="text-sm text-muted-foreground mt-1">Click "Add Full-Time Position" to get started</p>
                      </div> : <div className="space-y-3">
                        {experienceSummary.fullTime.map(exp => <Card key={exp.id} className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold">{exp.yachtName}</h4>
                                <p className="text-sm text-muted-foreground">{exp.position} | {exp.yachtType} | {exp.crewCount} crew</p>
                                <p className="text-xs text-muted-foreground">{exp.startDate} to {exp.endDate} ({exp.durationMonths} months)</p>
                              </div>
                              <Button variant="ghost" size="sm" onClick={() => removeYachtExperience(exp.id)}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </Card>)}
                      </div>}
                  </div>

                  {/* Part-Time / Temp Positions */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">⏰ Part-Time / Temp Positions</h3>
                      <Button type="button" variant="outline" size="sm" onClick={() => addYachtExperience('Part-Time')}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Temp Position
                      </Button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Short-term roles, freelance work, or fill-in positions
                    </div>
                    
                    {experienceSummary.partTime.length === 0 ? <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                        <Clock className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-muted-foreground">No temp positions added yet</p>
                        <p className="text-sm text-muted-foreground mt-1">Click "Add Temp Position" to get started</p>
                      </div> : <div className="space-y-3">
                        {experienceSummary.partTime.map(exp => <Card key={exp.id} className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold">{exp.yachtName}</h4>
                                <p className="text-sm text-muted-foreground">{exp.position} | {exp.yachtType} | {exp.crewCount} crew</p>
                                <p className="text-xs text-muted-foreground">{exp.startDate} to {exp.endDate} ({Math.round((exp.durationMonths || 0) * 4.33)} weeks)</p>
                              </div>
                              <Button variant="ghost" size="sm" onClick={() => removeYachtExperience(exp.id)}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </Card>)}
                      </div>}
                  </div>

                  {/* Rotational Positions */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">🔄 Rotational Positions</h3>
                      <Button type="button" variant="outline" size="sm" onClick={() => addYachtExperience('Rotational')}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Rotational Position
                      </Button>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Positions with scheduled rotation patterns (e.g., 2:1, 3:3, 10:10)
                    </div>
                    
                    {experienceSummary.rotational.length === 0 ? <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                        <RotateCcw className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-muted-foreground">No rotational positions added yet</p>
                        <p className="text-sm text-muted-foreground mt-1">Click "Add Rotational Position" to get started</p>
                      </div> : <div className="space-y-3">
                        {experienceSummary.rotational.map(exp => <Card key={exp.id} className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold">{exp.yachtName}</h4>
                                <p className="text-sm text-muted-foreground">{exp.position} | {exp.yachtType} | {exp.crewCount} crew</p>
                                <p className="text-xs text-muted-foreground">
                                  {exp.startDate} to {exp.endDate} ({exp.durationMonths} months)
                                  {exp.rotationSchedule && ` | ${exp.rotationSchedule} rotation`}
                                </p>
                              </div>
                              <Button variant="ghost" size="sm" onClick={() => removeYachtExperience(exp.id)}>
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </Card>)}
                      </div>}
                  </div>

                  {/* Real-Time Summary Panel */}
                  <Card className="bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-lg">📊 Experience Summary</CardTitle>
                      <CardDescription>Auto-calculated metrics for your CRI+ score</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-background rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{experienceSummary.fullTime.length}</div>
                          <div className="text-sm text-muted-foreground">Full-Time Roles</div>
                          <div className="text-xs text-muted-foreground">Avg: {getAvgDuration(experienceSummary.fullTime)} months</div>
                        </div>
                        <div className="text-center p-4 bg-background rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">{experienceSummary.partTime.length}</div>
                          <div className="text-sm text-muted-foreground">Temp Positions</div>
                          <div className="text-xs text-muted-foreground">Avg: {getAvgDuration(experienceSummary.partTime, true)} weeks</div>
                        </div>
                        <div className="text-center p-4 bg-background rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{experienceSummary.rotational.length}</div>
                          <div className="text-sm text-muted-foreground">Rotational Roles</div>
                          <div className="text-xs text-muted-foreground">Avg: {getAvgDuration(experienceSummary.rotational)} months</div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex justify-between text-sm">
                          <span>Average Crew Size:</span>
                          <span className="font-medium">{experienceSummary.avgCrewSize}</span>
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                          <span>Charter vs Private:</span>
                          <span className="font-medium">{experienceSummary.charterCount} Charter | {experienceSummary.privateCount} Private</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Yacht Experience Form Dialog */}
                  {showAddForm && <Card className="border-2 border-primary">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span>Add {showAddForm} Position</span>
                          <Button variant="ghost" size="sm" onClick={() => setShowAddForm(null)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </CardTitle>
                        <CardDescription>
                          Enter details for your {showAddForm.toLowerCase()} yacht position
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Yacht Size Selection */}
                        <div>
                          <Label htmlFor="formYachtSize">Yacht Size (GRT) *</Label>
                          <Select value={newExperience.yachtSizeCategory || ''} onValueChange={value => setNewExperience({
                        ...newExperience,
                        yachtSizeCategory: value,
                        position: ''
                      })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select yacht size category" />
                            </SelectTrigger>
                            <SelectContent>
                               <SelectItem value="Under 200 GRT">⚪ &lt;200 GRT (Small yachts)</SelectItem>
                               <SelectItem value="Under 500 GRT">⚫ &lt;500 GRT (Medium to large yachts)</SelectItem>
                               <SelectItem value="Under 3000 GRT">⚫ &lt;3000 GRT (Large commercial yachts)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="yachtName">Yacht Name *</Label>
                            <Input id="yachtName" placeholder="e.g., M/Y Eclipse" value={newExperience.yachtName || ''} onChange={e => setNewExperience({
                          ...newExperience,
                          yachtName: e.target.value
                        })} />
                          </div>
                          <div>
                            <Label htmlFor="position">Position Held *</Label>
                            <Select value={newExperience.position || ''} onValueChange={value => setNewExperience({
                          ...newExperience,
                          position: value
                        })}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select position" />
                              </SelectTrigger>
                              <SelectContent>
                                {newExperience.yachtSizeCategory && positionsByVesselSize[newExperience.yachtSizeCategory as keyof typeof positionsByVesselSize] && Object.entries(positionsByVesselSize[newExperience.yachtSizeCategory as keyof typeof positionsByVesselSize]).map(([department, positions]) => <div key={department}>
                                      <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">{department}</div>
                                      {(positions as string[]).map(pos => <SelectItem key={pos} value={pos} className="pl-6">{pos}</SelectItem>)}
                                    </div>)}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="yachtType">Yacht Type *</Label>
                            <Select value={newExperience.yachtType || ''} onValueChange={value => setNewExperience({
                          ...newExperience,
                          yachtType: value as 'Charter' | 'Private'
                        })}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Charter">⛵ Charter</SelectItem>
                                <SelectItem value="Private">🛥 Private</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="crewCount">Number of Crew Onboard *</Label>
                            <Input id="crewCount" type="number" min="1" placeholder="e.g., 12" value={newExperience.crewCount || ''} onChange={e => setNewExperience({
                          ...newExperience,
                          crewCount: parseInt(e.target.value)
                        })} />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="startDate">Start Date *</Label>
                            <Input id="startDate" type="date" value={newExperience.startDate || ''} onChange={e => setNewExperience({
                          ...newExperience,
                          startDate: e.target.value
                        })} />
                          </div>
                          <div>
                            <Label htmlFor="endDate">End Date *</Label>
                            <Input id="endDate" type="date" value={newExperience.endDate || ''} onChange={e => setNewExperience({
                          ...newExperience,
                          endDate: e.target.value
                        })} />
                          </div>
                        </div>

                        {showAddForm === 'Rotational' && <div>
                            <Label htmlFor="rotationSchedule">Rotation Schedule</Label>
                            <Select value={newExperience.rotationSchedule || ''} onValueChange={value => setNewExperience({
                        ...newExperience,
                        rotationSchedule: value
                      })}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select rotation pattern" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="2:1">2:1 (2 months on, 1 month off)</SelectItem>
                                <SelectItem value="3:3">3:3 (3 months on, 3 months off)</SelectItem>
                                <SelectItem value="4:2">4:2 (4 months on, 2 months off)</SelectItem>
                                <SelectItem value="6:6">6:6 (6 months on, 6 months off)</SelectItem>
                                <SelectItem value="10:10">10:10 (10 weeks on, 10 weeks off)</SelectItem>
                                <SelectItem value="Custom">Custom Schedule</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>}

                        <div className="flex justify-end gap-2 pt-4">
                          <Button type="button" variant="outline" onClick={() => setShowAddForm(null)}>
                            Cancel
                          </Button>
                          <Button type="button" onClick={saveYachtExperience}>
                            Save Position
                          </Button>
                        </div>
                      </CardContent>
                    </Card>}
                </CardContent>
              </Card>

              {/* Global Navigation & Voyage Checklist */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Navigated Waters & Significant Voyages
                  </CardTitle>
                  <CardDescription>
                    Claim all oceans, seas, and significant yacht passages you've navigated to enhance your CRI+ score
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Major Oceans */}
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-muted rounded-lg hover:bg-muted/80">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                        <span className="font-medium">🌊 Major Oceans</span>
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3 space-y-2">
                      {['Atlantic Ocean', 'Pacific Ocean', 'Indian Ocean', 'Arctic Ocean', 'Southern Ocean'].map(ocean => <div key={ocean} className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center gap-3">
                            <Checkbox checked={navigationExperience[ocean]?.checked || false} onCheckedChange={checked => setNavigationExperience(prev => ({
                          ...prev,
                          [ocean]: {
                            ...prev[ocean],
                            checked: !!checked
                          }
                        }))} />
                            <span>{ocean}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input type="text" placeholder="YYYY" className="w-20" value={navigationExperience[ocean]?.year || ''} onChange={e => setNavigationExperience(prev => ({
                          ...prev,
                          [ocean]: {
                            ...prev[ocean],
                            year: e.target.value
                          }
                        }))} />
                            <Button variant="outline" size="sm">
                              <Upload className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>)}
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Notable Seas */}
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-muted rounded-lg hover:bg-muted/80">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
                        <span className="font-medium">🗺 Notable Seas (Mediterranean & Europe)</span>
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3 space-y-2">
                      {['Mediterranean Sea', 'Adriatic Sea', 'Aegean Sea', 'Ionian Sea', 'North Sea', 'Baltic Sea', 'English Channel'].map(sea => <div key={sea} className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center gap-3">
                            <Checkbox checked={navigationExperience[sea]?.checked || false} onCheckedChange={checked => setNavigationExperience(prev => ({
                          ...prev,
                          [sea]: {
                            ...prev[sea],
                            checked: !!checked
                          }
                        }))} />
                            <span>{sea}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input type="text" placeholder="YYYY" className="w-20" value={navigationExperience[sea]?.year || ''} onChange={e => setNavigationExperience(prev => ({
                          ...prev,
                          [sea]: {
                            ...prev[sea],
                            year: e.target.value
                          }
                        }))} />
                            <Button variant="outline" size="sm">
                              <Upload className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>)}
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Caribbean & Americas */}
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-muted rounded-lg hover:bg-muted/80">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-cyan-500 rounded-full"></div>
                        <span className="font-medium">🏝 Caribbean & Americas</span>
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3 space-y-2">
                      {['Caribbean Sea', 'Gulf of Mexico', 'Bahamas Banks', 'Florida Straits'].map(region => <div key={region} className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center gap-3">
                            <Checkbox checked={navigationExperience[region]?.checked || false} onCheckedChange={checked => setNavigationExperience(prev => ({
                          ...prev,
                          [region]: {
                            ...prev[region],
                            checked: !!checked
                          }
                        }))} />
                            <span>{region}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input type="text" placeholder="YYYY" className="w-20" value={navigationExperience[region]?.year || ''} onChange={e => setNavigationExperience(prev => ({
                          ...prev,
                          [region]: {
                            ...prev[region],
                            year: e.target.value
                          }
                        }))} />
                            <Button variant="outline" size="sm">
                              <Upload className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>)}
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Canal & Strategic Passages */}
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-muted rounded-lg hover:bg-muted/80">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                        <span className="font-medium">🚢 Canal & Strategic Passages</span>
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3 space-y-2">
                      {['Panama Canal', 'Suez Canal', 'Corinth Canal', 'Kiel Canal', 'Strait of Magellan', 'Beagle Channel'].map(passage => <div key={passage} className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center gap-3">
                            <Checkbox checked={navigationExperience[passage]?.checked || false} onCheckedChange={checked => setNavigationExperience(prev => ({
                          ...prev,
                          [passage]: {
                            ...prev[passage],
                            checked: !!checked
                          }
                        }))} />
                            <span>{passage}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input type="text" placeholder="YYYY" className="w-20" value={navigationExperience[passage]?.year || ''} onChange={e => setNavigationExperience(prev => ({
                          ...prev,
                          [passage]: {
                            ...prev[passage],
                            year: e.target.value
                          }
                        }))} />
                            <Button variant="outline" size="sm">
                              <Upload className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>)}
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Polar & Expedition Areas */}
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-muted rounded-lg hover:bg-muted/80">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gray-200 rounded-full border border-gray-400"></div>
                        <span className="font-medium">❄️ Polar & Expedition Areas</span>
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3 space-y-2">
                      {['Antarctic Peninsula', 'Ross Sea', 'Svalbard / Spitsbergen', 'Greenland Coast', 'Arctic Circle'].map(polar => <div key={polar} className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center gap-3">
                            <Checkbox checked={navigationExperience[polar]?.checked || false} onCheckedChange={checked => setNavigationExperience(prev => ({
                          ...prev,
                          [polar]: {
                            ...prev[polar],
                            checked: !!checked
                          }
                        }))} />
                            <span>{polar}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input type="text" placeholder="YYYY" className="w-20" value={navigationExperience[polar]?.year || ''} onChange={e => setNavigationExperience(prev => ({
                          ...prev,
                          [polar]: {
                            ...prev[polar],
                            year: e.target.value
                          }
                        }))} />
                            <Button variant="outline" size="sm">
                              <Upload className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>)}
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Major Yacht Voyages */}
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-muted rounded-lg hover:bg-muted/80">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                        <span className="font-medium">⛵ Significant Yacht Voyages</span>
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-3 space-y-2">
                      {['Atlantic Crossing (West to East)', 'Atlantic Crossing (East to West)', 'Pacific Crossing', 'Indian Ocean Crossing', 'Full Circumnavigation', 'Trans-Canal Delivery'].map(voyage => <div key={voyage} className="flex items-center justify-between p-2 border rounded">
                          <div className="flex items-center gap-3">
                            <Checkbox checked={navigationExperience[voyage]?.checked || false} onCheckedChange={checked => setNavigationExperience(prev => ({
                          ...prev,
                          [voyage]: {
                            ...prev[voyage],
                            checked: !!checked
                          }
                        }))} />
                            <span>{voyage}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Input type="text" placeholder="YYYY" className="w-20" value={navigationExperience[voyage]?.year || ''} onChange={e => setNavigationExperience(prev => ({
                          ...prev,
                          [voyage]: {
                            ...prev[voyage],
                            year: e.target.value
                          }
                        }))} />
                            <Button variant="outline" size="sm">
                              <Upload className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>)}
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Global Experience Summary */}
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      🌐 Global Experience Summary
                    </h4>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Total Regions Claimed: </span>
                        <span className="text-primary font-semibold">
                          {Object.values(navigationExperience).filter(exp => exp.checked).length}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Oceans: </span>
                        <span className="text-blue-600 font-semibold">
                          {['Atlantic Ocean', 'Pacific Ocean', 'Indian Ocean', 'Arctic Ocean', 'Southern Ocean'].filter(ocean => navigationExperience[ocean]?.checked).length}
                        </span>
                      </div>
                      <div>
                        <span className="font-medium">Canal Passages: </span>
                        <span className="text-yellow-600 font-semibold">
                          {['Panama Canal', 'Suez Canal', 'Corinth Canal', 'Kiel Canal', 'Strait of Magellan', 'Beagle Channel'].filter(canal => navigationExperience[canal]?.checked).length}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>


              {/* Legal Declaration */}
              <Card>
                <CardHeader>
                  <CardTitle>Legal Declaration</CardTitle>
                  <CardDescription>
                    Please confirm your agreement to the terms and conditions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField control={form.control} name="termsAccepted" render={({
                  field
                }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal">
                            I confirm that the above information is true and accurate. I understand that this will be reviewed for FairShare eligibility and accept the terms of FairShare crew membership.
                          </FormLabel>
                        </div>
                      </FormItem>} />
                  <FormMessage />

                  <FormField control={form.control} name="criAccepted" render={({
                  field
                }) => <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-normal">
                            I understand and agree that this information will be used to generate your CRI+ (Crew Rating Index) score, a performance-based metric that reflects your qualifications, experience, and contributions. Your CRI+ score will directly influence your eligibility and share of charter income under the xplor FairShare Agreement.
                          </FormLabel>
                        </div>
                      </FormItem>} />
                  <FormMessage />

                  <Collapsible open={showTerms} onOpenChange={setShowTerms}>
                    <CollapsibleTrigger className="text-sm text-primary hover:underline mt-2">
                      Read Terms & Conditions
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-4 p-4 bg-muted rounded-lg text-sm">
                      <h4 className="font-semibold mb-2">FairShare Terms & Conditions</h4>
                      <p className="mb-2">
                        By joining FairShare, you agree to:
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Provide accurate and truthful information about your qualifications</li>
                        <li>Maintain valid certifications as required for your position</li>
                        <li>Participate in the revenue sharing program as outlined</li>
                        <li>Comply with yacht safety and operational standards</li>
                        <li>Allow verification of submitted qualifications and experience</li>
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-center">
                <div className="grid md:grid-cols-2 gap-4 w-full max-w-lg">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="px-12" 
                    disabled={!form.getValues("termsAccepted") || !form.getValues("criAccepted")}
                  >
                    Join FairShare Now
                  </Button>
                  <Button 
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      const formData = form.getValues();
                      navigate('/fairshare/cri-calculator', { state: { crewData: formData } });
                    }}
                    className="border-primary text-primary hover:bg-primary/10 px-12"
                  >
                    Calculate CRI+ Score
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>;
}