import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MatterportAdBanner from "@/components/MatterportAdBanner";

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQ[] = [
  // General
  {
    category: "General",
    question: "What is Xplor?",
    answer: "Xplor is a platform that lets you explore, upload, and monetize immersive virtual tours of real-world spaces — including yachts, homes, hotels, cars, restaurants, and jets."
  },
  {
    category: "General",
    question: "Who can use Xplor?",
    answer: "Anyone can browse spaces. Owners, crew, agents, and professionals can upload and manage listings."
  },
  {
    category: "General",
    question: "What types of spaces can be listed?",
    answer: "Yachts, villas, apartments, restaurants, hotels, showrooms, private jets, aviation training centers, vehicles, commercial developments, and more."
  },

  // Uploading & Listings
  {
    category: "Uploading",
    question: "How do I upload a space?",
    answer: "Click [Upload a Space] and follow the form. You can add media, virtual tours, booking links, and documents."
  },
  {
    category: "Uploading",
    question: "What types of tours do you support?",
    answer: "We support Matterport, 360° images, embedded videos, Kuula, iStaging, and more."
  },
  {
    category: "Uploading",
    question: "Do I need professional photography or VR capture?",
    answer: "No, but professional-quality tours help your space stand out. Need help? We can match you with a capture specialist."
  },
  {
    category: "Uploading",
    question: "Can I list spaces that are not mine?",
    answer: "You must have permission to upload any property, yacht, or vehicle you don't own. Misuse may result in removal."
  },

  // FairShare Program
  {
    category: "FairShare",
    question: "What is FairShare?",
    answer: "FairShare is Xplor's commission-sharing model. It splits 50% of the net charter commission equally among active crew on eligible yachts."
  },
  {
    category: "FairShare",
    question: "Who qualifies for FairShare?",
    answer: "Active crew on a yacht listed for charter on Xplor — where Xplor is the central agent or acting broker."
  },
  {
    category: "FairShare",
    question: "Do I need to upload my yacht to join FairShare?",
    answer: "Not necessarily. You can register your yacht and crew profile, and we'll verify your eligibility if your yacht becomes listed."
  },
  {
    category: "FairShare",
    question: "How are payouts made?",
    answer: "After a successful charter where Xplor earns commission, we calculate the net amount and distribute 50% equally among verified crew."
  },

  // Bookings & API Integrations
  {
    category: "Bookings & API Plugins",
    question: "Can guests book directly through Xplor?",
    answer: "Yes. For supported listings, guests can book rentals, viewings, charters, test drives, or simulator sessions via booking plugins."
  },
  {
    category: "Bookings & API Plugins",
    question: "What booking systems do you integrate with?",
    answer: "We support API or iframe integration with systems like OpenTable, Resy, Cloudbeds, DealerSocket, CharterPad, Calendly, and more."
  },
  {
    category: "Bookings & API Plugins",
    question: "How do I connect my booking system?",
    answer: "Use the \"Request Booking Plugin\" form on your listing dashboard, or contact our integration team."
  },

  // Pricing
  {
    category: "Pricing",
    question: "Is it free to list on Xplor?",
    answer: "Yes — basic listings are free with fair usage limits. Premium features and additional upload capacity are available via paid plans."
  },
  {
    category: "Pricing",
    question: "Are there fees for bookings?",
    answer: "If Xplor facilitates a booking or deal as an agent, a commission may apply. Otherwise, listing and browsing are free."
  },
  {
    category: "Pricing",
    question: "What's included in a premium account?",
    answer: "More uploads, priority search placement, analytics tools, branded pages, and early access to monetization features."
  },

  // Legal & Trust
  {
    category: "Legal & Trust",
    question: "Is my content protected?",
    answer: "Yes. You retain ownership of your media. We don't sell or reuse it without your consent."
  },
  {
    category: "Legal & Trust",
    question: "How is commission handled legally for FairShare?",
    answer: "Crew commission is governed by our platform's FairShare agreement and local laws. Payments are processed transparently."
  },
  {
    category: "Legal & Trust",
    question: "Can Xplor operate globally?",
    answer: "Yes — our brokerage and platform are registered in the UAE and operate internationally. For regulated services, we comply with local requirements."
  },
  {
    category: "Legal & Trust",
    question: "What if someone misuses my tour?",
    answer: "Report it. We'll investigate and remove content that violates rights or terms."
  },

  // Technical Support
  {
    category: "Technical Support",
    question: "What if I need help uploading?",
    answer: "Contact our support team or check the Upload Guide."
  },
  {
    category: "Technical Support",
    question: "Can I edit a listing after it's published?",
    answer: "Yes, you can update details, replace media, or add booking links at any time from your dashboard."
  },
  {
    category: "Technical Support",
    question: "Does Xplor work on mobile?",
    answer: "Yes — the platform and all tours are fully responsive across devices."
  },
  {
    category: "Technical Support",
    question: "How do I get in touch with support?",
    answer: "Email us at support@xplor.io or use the in-app contact form."
  }
];

const categories = [
  "General",
  "Uploading",
  "FairShare",
  "Bookings & API Plugins",
  "Pricing",
  "Legal & Trust",
  "Technical Support"
];

export default function FAQs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = searchTerm === "" || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === null || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const groupedFAQs = categories.reduce((acc, category) => {
    acc[category] = filteredFAQs.filter(faq => faq.category === category);
    return acc;
  }, {} as Record<string, FAQ[]>);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Find answers to common questions about the Xplor platform, uploading spaces, 
            FairShare program, bookings, and more.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar with Ad Banner and Navigation */}
          <div className="lg:w-1/4 space-y-6">
            {/* Matterport Ad Banner */}
            <MatterportAdBanner />
            
            {/* Category Navigation */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                    selectedCategory === null 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-muted"
                  }`}
                >
                  All Categories
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                      selectedCategory === category 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-muted"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Search Bar */}
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search FAQs... (e.g., Matterport, crew payment, API)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* FAQ Content */}
            <div className="space-y-8">
              {categories.map((category) => {
                const categoryFAQs = groupedFAQs[category];
                if (categoryFAQs.length === 0) return null;

                return (
                  <Card key={category}>
                    <CardHeader>
                      <CardTitle className="text-xl text-primary">
                        {category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        {categoryFAQs.map((faq, index) => (
                          <AccordionItem 
                            key={`${category}-${index}`} 
                            value={`${category}-${index}`}
                          >
                            <AccordionTrigger className="text-left">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredFAQs.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    No FAQs found matching your search.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory(null);
                    }}
                    className="text-primary hover:underline"
                  >
                    Clear filters
                  </button>
                </CardContent>
              </Card>
            )}

            {/* Contact CTA */}
            <Card className="mt-12">
              <CardContent className="text-center py-8">
                <h3 className="text-xl font-semibold mb-2">
                  Didn't find your answer?
                </h3>
                <p className="text-muted-foreground mb-4">
                  Our support team is here to help you get the most out of Xplor.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="mailto:support@xplor.io"
                    className="inline-flex items-center justify-center px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Email Support
                  </a>
                  <button className="inline-flex items-center justify-center px-6 py-2 border border-input rounded-md hover:bg-muted transition-colors">
                    Contact Form
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}