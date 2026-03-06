import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, MapPin, CheckCircle2, ChevronLeft, Phone, Mail, Globe, Share2, Heart, Users, Calendar, Clock, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import GetQuoteModal from "@/components/GetQuoteModal";

const VENUE_DB: Record<string, any> = {
    "v1": {
        name: "The Grand Rajwada",
        city: "Ahmedabad",
        area: "SG Highway",
        capacity: "200-1500",
        rating: 4.8,
        reviews: 245,
        description: "The Grand Rajwada is a luxurious banquet hall and lawn perfectly suited for grand weddings, receptions, and corporate events. Featuring state-of-the-art amenities, stunning decor, and top-tier catering services.",
        images: [
            "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200&q=80",
            "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
            "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80"
        ],
        verified: true,
        pricePerPlate: 1200,
        amenities: ["AC Banquet", "Valet Parking", "In-house Catering", "Bridal Room", "DJ Allowed", "Decor Available"]
    }
};

const VenueDetails = () => {
    const { id } = useParams();

    // Try to find the venue or fallback to v1 for preview
    const venue = VENUE_DB[id as string] || VENUE_DB["v1"];

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-grow py-8">
                <div className="container">
                    <Link to="/venues" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors">
                        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Venues
                    </Link>

                    {/* Hero Image Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 h-[50vh] min-h-[400px]">
                        <div className="md:col-span-3 rounded-2xl overflow-hidden relative">
                            <img src={venue.images[0]} alt={venue.name} className="w-full h-full object-cover" />
                            <div className="absolute top-4 right-4 flex gap-2">
                                <Button variant="secondary" size="icon" className="bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white hover:text-red-500 transition-colors">
                                    <Heart className="w-4 h-4" />
                                </Button>
                                <Button variant="secondary" size="icon" className="bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white hover:text-blue-500 transition-colors">
                                    <Share2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="hidden md:flex flex-col gap-4">
                            <div className="h-1/2 rounded-2xl overflow-hidden">
                                <img src={venue.images[1]} alt="Gallery 1" className="w-full h-full object-cover" />
                            </div>
                            <div className="h-1/2 rounded-2xl overflow-hidden relative">
                                <img src={venue.images[2]} alt="Gallery 2" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer hover:bg-black/50 transition-colors">
                                    <span className="text-white font-medium">View All Photos</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-10">

                            {/* Header Info */}
                            <div>
                                <div className="flex items-start justify-between mb-2">
                                    <h1 className="font-display text-4xl font-semibold text-foreground">{venue.name}</h1>
                                    {venue.verified && (
                                        <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold">
                                            <CheckCircle2 className="w-4 h-4" /> Verified
                                        </div>
                                    )}
                                </div>

                                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-4">
                                    <span className="flex items-center gap-1.5 font-medium text-foreground">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        {venue.rating} ({venue.reviews} reviews)
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-border" />
                                    <span className="flex items-center gap-1.5">
                                        <MapPin className="w-4 h-4" /> {venue.area}, {venue.city}
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-border" />
                                    <span className="flex items-center gap-1.5">
                                        <Users className="w-4 h-4" /> Up to {venue.capacity} Guests
                                    </span>
                                </div>
                            </div>

                            {/* About Section */}
                            <section>
                                <h2 className="text-2xl font-semibold font-display mb-4">About the Venue</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {venue.description}
                                </p>
                            </section>

                            {/* Amenities */}
                            <section>
                                <h2 className="text-2xl font-semibold font-display mb-4">Amenities</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {venue.amenities.map((item: string, idx: number) => (
                                        <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-muted/20">
                                            <CheckCircle2 className="w-5 h-5 text-primary" />
                                            <span className="text-sm font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                        </div>

                        {/* Sidebar Sticky Panel */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 bg-white rounded-2xl border border-border p-6 shadow-xl shadow-primary/5">
                                <h3 className="text-xl font-semibold font-display mb-6">Pricing & Availability</h3>

                                <div className="flex items-baseline gap-2 mb-6">
                                    <span className="text-3xl font-bold text-foreground">₹{venue.pricePerPlate}</span>
                                    <span className="text-sm text-muted-foreground">starting price per plate</span>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <GetQuoteModal businessName={venue.name} />
                                    <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5 text-base h-12">
                                        <Phone className="w-4 h-4 mr-2" /> Show Contact Number
                                    </Button>
                                </div>

                                <hr className="border-border mb-6" />

                                <div className="space-y-4">
                                    <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Contact Direct</h4>
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center shrink-0">
                                            <Mail className="w-4 h-4 text-foreground" />
                                        </div>
                                        <span className="text-foreground font-medium">Send Email Enquiry</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center shrink-0">
                                            <Globe className="w-4 h-4 text-foreground" />
                                        </div>
                                        <span className="text-foreground font-medium flex items-center gap-1 hover:text-primary cursor-pointer transition-colors">
                                            Visit Website <Share2 className="w-3 h-3" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default VenueDetails;
