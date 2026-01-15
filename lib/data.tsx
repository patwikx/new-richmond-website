import { 
  Building2, 
  Users, 
  Trophy, 
  Zap, 
  Target, 
  Rocket, 
  Award,
  Factory,
  Home,
  ShoppingBag,
  MapPin,
  Phone,
  Mail,
  Clock
} from "lucide-react";

// --- Navigation ---
export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Properties", href: "/properties" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

// --- Company Info ---
export const COMPANY_INFO = {
  name: "Richmond Land Innovations Inc.",
  shortName: "RLII",
  tagline: "Engineered for the future.",
  address: {
    line1: "123 Richmond Avenue",
    line2: "Business District",
    city: "Makati City",
    country: "Philippines",
    full: "123 Richmond Avenue, Business District, Makati City, Philippines"
  },
  contact: {
    phone: ["+63 2 8123 4567", "+63 917 123 4567"],
    email: ["info@richmondland.com.ph", "sales@richmondland.com.ph"],
    hours: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 9:00 AM - 1:00 PM"]
  },
  socials: {
    facebook: "#",
    instagram: "#",
    linkedin: "#"
  }
};

// --- Properties (Unified Data Source) ---
export const PROPERTIES = [
  {
    id: "rd-city",
    title: "RD City",
    location: "Polomolok, South Cotabato",
    category: "Industrial & Commercial",
    description: "RD City is a 104 hectares commercial-industrial estates located in the boundaries of Polomolok and General Santos City. At RD City, a potential investor can gain a speedy foothold of the huge domestic market of the Philippines and quick access to abundant human and natural resources needed for their production and operations. Most locators in this special economic zone can avail of fiscal incentives from the government, which their business and trade laws are treated special above the rest.",
    shortDescription: "A master-planned economic zone designed to drive business growth.",
    image: "https://4b9moeer4y.ufs.sh/f/pUvyWRtocgCVVg2KbATnl8YJnfQXZwHKRbB5kUFVSIov20cm",
    gallery: [
       "https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=1974&auto=format&fit=crop"
    ],
    stats: {
      sqm: 50000,
      price: "Inquire for Pricing",
      priceRange: "Inquire for Pricing",
      status: "Active",
      year: "2024",
      beds: null
    },
    specs: ["50,000 SQM", "PEZA Registered"],
    features: [
      "PEZA Registered Economic Zone",
      "Reliable Power & Water Supply",
      "Fiber-Optic Connectivity",
      "24/7 Security & Surveillance",
      "Strategic Location near Airport & Seaport",
      "Wide Concrete Roads",
      "Commercial & Retail Spaces",
      "Modern Waste Management"
    ],
    coordinates: [6.1164, 125.1716] as [number, number],
    tenants: [],
    nearbyLandmarks: [
      { name: "General Santos International Airport", distance: "15 mins" },
      { name: "Makar Wharf", distance: "25 mins" },
      { name: "Polomolok Municipal Hall", distance: "10 mins" },
      { name: "Dole Philippines", distance: "12 mins" }
    ],
    floorPlans: [
      { title: "Master Plan", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2062&auto=format&fit=crop" },
      { title: "Industrial Zone Layout", image: "https://images.unsplash.com/photo-1558036117-15db63622051?q=80&w=2070&auto=format&fit=crop" }
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.846506300067!2d125.16941131477015!3d6.116400095572832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f79f1234567890%3A0x1234567890abcdef!2sPolomolok%2C%20South%20Cotabato!5e0!3m2!1sen!2sph!4v1625123456789!5m2!1sen!2sph"
  },
  {
    id: "la-cassandra",
    title: "La Cassandra",
    fullName: "La Cassandra Residences",
    location: "Brgy. Apopong, General Santos City, Philippines",
    category: "Residential",
    description: "La Cassandra Residences is a modern townhouse, that offers exclusivity with only 51-unit, situated in a medium-density community a few kilometers away from the Aerotropolis center.",
    shortDescription: "A sanctuary of peace and modern living for growing families.",
    image: "https://4b9moeer4y.ufs.sh/f/pUvyWRtocgCVOm2EmT7GY7PtskD6VZpxrq8LEdQvmhiWj4zo",
    gallery: [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop"
    ],
    stats: {
      sqm: 120,
      price: "Inquire for Pricing",
      priceRange: "Inquire for Pricing",
      status: "Selling",
      year: "2022",
      beds: 3
    },
    specs: ["3 Beds", "120 SQM"],
    features: [
      "Gated Community",
      "24-Hour Security",
      "Clubhouse & Swimming Pool",
      "Playground & Parks",
      "Modern House Designs",
      "Wide Roads",
      "Proximity to Schools & Markets",
      "Serene Environment"
    ],
    coordinates: [6.2238, 125.0634] as [number, number],
    tenants: [],
    nearbyLandmarks: [
      { name: "Cannery Central School", distance: "5 mins" },
      { name: "Polomolok Public Market", distance: "8 mins" },
      { name: "St. Howard Hospital", distance: "10 mins" },
      { name: "Gaisano Grand Mall", distance: "15 mins" }
    ],
    floorPlans: [
      { title: "Ground Floor Layout", image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop" },
      { title: "Second Floor Layout", image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=2000&auto=format&fit=crop" }
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.800000000000!2d125.0634!3d6.2238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTMnMjUuNyJOIDEyNcKwMDMnNDguMiJF!5e0!3m2!1sen!2sph!4v1625123456789!5m2!1sen!2sph"
  },
  {
    id: "norfolk-pine",
    title: "Norfolk Pine",
    fullName: "Norfolk Pine Residences",
    location: "Brgy. Apopong, General Santos City, Philippines",
    category: "Residential",
    description: "In 2011, Richmond launched its second housing project, Norfolk Pine, a middle-class subdivision. It is a 5.2-hectare development with 113 saleable lots. The Middle class-subdivision features a clubhouse with a swimming pool, children’s playground, a basketball court and a gated community with 24/7 security.",
    shortDescription: "Luxury residences inspired by contemporary architecture.",
    image: "https://4b9moeer4y.ufs.sh/f/pUvyWRtocgCV9JuluZzJB0e3I8TZNRHvqsKkSblXQwiEfanp",
    gallery: [
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070&auto=format&fit=crop"
    ],
    stats: {
      sqm: 180,
      price: "Inquire for Pricing",
      priceRange: "Inquire for Pricing",
      status: "Selling",
      year: "2021",
      beds: 4
    },
    specs: ["4 Beds", "180 SQM"],
    features: [
      "Exclusive Subdivision",
      "Premium Finishes",
      "Landscaped Gardens",
      "Clubhouse & Amenities",
      "High-Speed Internet Ready",
      "Secure Perimeter Fence",
      "Strategic City Location",
      "Underground Drainage System"
    ],
    coordinates: [6.1100, 125.1800] as [number, number],
    tenants: [],
    nearbyLandmarks: [
      { name: "SM City General Santos", distance: "10 mins" },
      { name: "General Santos Doctors Hospital", distance: "5 mins" },
      { name: "Notre Dame of Dadiangas University", distance: "8 mins" },
      { name: "KCC Mall of Gensan", distance: "12 mins" }
    ],
    floorPlans: [
      { title: "Site Development Plan", image: "https://images.unsplash.com/photo-1558036117-15db63622051?q=80&w=2070&auto=format&fit=crop" },
      { title: "Model Unit Layout", image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop" }
    ],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.800000000000!2d125.1800!3d6.1100!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMDYnMzYuMCJOIDEyNcKwMTAnNDguMCJF!5e0!3m2!1sen!2sph!4v1625123456789!5m2!1sen!2sph"
  }
];

// --- About Section Data ---
export const ABOUT_FEATURES = [
  {
    icon: Building2,
    title: "Structure",
    description: "Architectural marvels engineered for durability."
  },
  {
    icon: Users,
    title: "Community",
    description: "Ecosystems designed for interaction."
  },
  {
    icon: Trophy,
    title: "Excellence",
    description: "Award-winning development standards."
  },
  {
    icon: Zap,
    title: "Future",
    description: "Sustainable power and smart integration."
  }
];

export const ABOUT_VALUES = [
  {
    icon: Target,
    title: "Mission",
    description: "Engineer sustainable developments that upgrade community lifestyles."
  },
  {
    icon: Rocket,
    title: "Vision",
    description: "To be the premier architect of the Philippine future."
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Precision in every blueprint, construction, and delivery."
  },
  {
    icon: Users,
    title: "Community",
    description: "Building ecosystems, not just structures."
  }
];

export const MILESTONES = [
  { year: "2008", title: "Initialization", description: "Richmond Land Innovations, Inc. founded." },
  { year: "2012", title: "Phase 1: Residential", description: "First residential subdivision launch in GenSan." },
  { year: "2015", title: "Expansion", description: "Operations scaled to Davao and Tagaytay regions." },
  { year: "2019", title: "Project RD City", description: "Groundbreaking of flagship economic zone." },
  { year: "2024", title: "Recognition", description: "Awarded Best Developer in Mindanao." }
];

// --- Contact Page Data ---
export const CONTACT_DETAILS = [
  { 
    icon: MapPin, 
    label: "Visit Us", 
    lines: [COMPANY_INFO.address.line1, COMPANY_INFO.address.line2, COMPANY_INFO.address.full.split(', ').slice(2).join(', ')] 
  },
  { 
    icon: Phone, 
    label: "Call Us", 
    lines: COMPANY_INFO.contact.phone 
  },
  { 
    icon: Mail, 
    label: "Email Us", 
    lines: COMPANY_INFO.contact.email 
  },
  { 
    icon: Clock, 
    label: "Office Hours", 
    lines: COMPANY_INFO.contact.hours 
  }
];

// --- Categories (Sectors) ---
export const SECTORS = [
    {
      title: "Industrial",
      id: "SEC-01",
      description: "Eco-zones, Warehousing & Logistics Hubs",
      icon: Factory,
      stats: [{ label: "Projects", value: "04" }, { label: "Status", value: "Active" }],
      href: "/properties?category=industrial",
    },
    {
      title: "Residential",
      id: "SEC-02",
      description: "Modern Subdivisions & Private Estates",
      icon: Home,
      stats: [{ label: "Units", value: "500+" }, { label: "Status", value: "Selling" }],
      href: "/properties?category=residential",
    },
    {
      title: "Commercial",
      id: "SEC-03",
      description: "Mixed-use Retail & Office Spaces",
      icon: Building2,
      stats: [{ label: "Spaces", value: "50+" }, { label: "Status", value: "Leasing" }],
      href: "/properties?category=commercial",
    },
    {
      title: "RD Malls",
      id: "SEC-04",
      description: "Premier Lifestyle & Entertainment Centers",
      icon: ShoppingBag,
      stats: [{ label: "Footfall", value: "High" }, { label: "Status", value: "Open" }],
      href: "/properties?category=malls",
    }
  ];
