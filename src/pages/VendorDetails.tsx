import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, MapPin, CheckCircle2, ChevronLeft, Phone, Mail, Globe, Share2, Heart, Award, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import GetQuoteModal from "@/components/GetQuoteModal";
import ReviewsList from "@/components/ReviewsList";

const VENDOR_DB: Record<string, any> = {
    "vd1": {
        name: "Light & Shade Photography",
        category: "Photographers",
        city: "Ahmedabad",
        rating: 4.9,
        reviews: 124,
        startingPrice: 50000,
        description: "Award-winning wedding photography and cinematography team specializing in capturing candid moments, portraits, and traditional ceremonies across India.",
        portfolio: [
            "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&q=80",
            "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=800&q=80",
            "https://images.unsplash.com/photo-1583939411023-14783179e581?w=800&q=80",
            "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=800&q=80"
        ],
        verified: true,
        services: ["Candid Photography", "Pre-wedding Shoots", "Cinematography", "Traditional Videos", "Drone Shoots"]
    }
};

const VendorDetails = () => {
    const { id } = useParams();

    // Try to find the vendor or fallback to vd1 for preview
    const vendor = VENDOR_DB[id as string] || VENDOR_DB["vd1"];

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-grow py-8">
                <div className="container">
                    <Link to="/vendors" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors">
                        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Vendors
                    </Link>

                    <div className="bg-white rounded-2xl border border-border p-6 md:p-8 mb-8 flex flex-col md:flex-row gap-8 items-start relative shadow-sm">
                        <div className="w-full md:w-48 h-48 shrink-0 rounded-full overflow-hidden border-4 border-background shadow-lg mx-auto md:mx-0">
                            <img src={vendor.portfolio[0]} alt={vendor.name} className="w-full h-full object-cover" />
                        </div>

                        <div className="flex-grow text-center md:text-left">
                            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                                <h1 className="font-display text-4xl font-semibold text-foreground">{vendor.name}</h1>
                                {vendor.verified && (
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold self-center md:self-auto">
                                        <CheckCircle2 className="w-4 h-4" /> Verified Professional
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-foreground font-medium mb-4">
                                <span className="px-3 py-1 bg-muted rounded-full">{vendor.category}</span>
                                <span className="flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4 text-primary" /> {vendor.city}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    {vendor.rating} ({vendor.reviews})
                                </span>
                            </div>

                            <p className="text-muted-foreground max-w-2xl leading-relaxed mb-6">
                                {vendor.description}
                            </p>

                            <div className="flex items-center justify-center md:justify-start gap-3">
                                <Button className="bg-primary hover:bg-primary/90 text-white shadow-md">
                                    <Phone className="w-4 h-4 mr-2" /> Contact Now
                                </Button>
                                <Button variant="outline" className="border-border text-foreground hover:bg-muted">
                                    <Mail className="w-4 h-4 mr-2" /> Message
                                </Button>
                                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-red-500 rounded-full">
                                    <Heart className="w-5 h-5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-blue-500 rounded-full">
                                    <Share2 className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-10">

                            {/* Portfolio Grid */}
                            <section>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-semibold font-display">Portfolio</h2>
                                    <Button variant="link" className="text-primary pr-0">View All Media &rarr;</Button>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {vendor.portfolio.slice(1).map((img: string, idx: number) => (
                                        <div key={idx} className={`rounded-xl overflow-hidden cursor-pointer group ${idx === 0 ? 'col-span-2 h-[300px]' : 'h-[200px]'}`}>
                                            <img src={img} alt={`Portfolio ${idx}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Services */}
                            <section>
                                <h2 className="text-2xl font-semibold font-display mb-4 flex items-center gap-2">
                                    <Award className="w-6 h-6 text-primary" />
                                    Services Offered
                                </h2>
                                <div className="flex flex-wrap gap-3">
                                    {vendor.services.map((item: string, idx: number) => (
                                        <span key={idx} className="px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            {/* Reviews Section */}
                            <ReviewsList venueId={vendor.id || id || "vd1"} />

                        </div>

                        {/* Sidebar Pricing & Info */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-6">

                                <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                                    <h3 className="text-lg font-semibold font-display mb-4">Pricing Package</h3>

                                    <div className="flex items-start gap-3 p-4 bg-muted/20 rounded-xl mb-4 border border-border/50">
                                        <IndianRupee className="w-6 h-6 text-primary shrink-0 mt-1" />
                                        <div>
                                            <div className="text-sm text-muted-foreground font-medium mb-1">Starting Price</div>
                                            <div className="text-2xl font-bold text-foreground">₹{vendor.startingPrice.toLocaleString('en-IN')}</div>
                                            <div className="text-xs text-muted-foreground mt-1">Inclusive of standard taxes</div>
                                        </div>
                                    </div>

                                    <GetQuoteModal businessName={vendor.name} />
                                </div>

                                <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
                                    <h3 className="text-lg font-semibold font-display mb-4">More Information</h3>
                                    <div className="space-y-4 text-sm">
                                        <div className="flex items-center justify-between py-2 border-b border-border">
                                            <span className="text-muted-foreground">Travels outstation</span>
                                            <span className="font-medium">Yes</span>
                                        </div>
                                        <div className="flex items-center justify-between py-2 border-b border-border">
                                            <span className="text-muted-foreground">Years of Experience</span>
                                            <span className="font-medium">5+ Years</span>
                                        </div>
                                        <div className="flex items-center justify-between py-2">
                                            <span className="text-muted-foreground">Booking Advance</span>
                                            <span className="font-medium">50%</span>
                                        </div>
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

export default VendorDetails;
