import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ListingFilter from "@/components/ListingFilter";
import VendorCard, { VendorData } from "@/components/VendorCard";

const DUMMY_VENDORS: VendorData[] = [
    {
        id: "vd1",
        name: "Light & Shade Photography",
        category: "Photographers",
        city: "Ahmedabad",
        rating: 4.9,
        reviews: 124,
        startingPrice: 50000,
        image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
        featured: true,
        verified: true,
    },
    {
        id: "vd2",
        name: "Glamour Looks by Priya",
        category: "Makeup Artists",
        city: "Surat",
        rating: 4.8,
        reviews: 89,
        startingPrice: 15000,
        image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80",
        verified: true,
    },
    {
        id: "vd3",
        name: "Golden Events Decorators",
        category: "Decorators",
        city: "Vadodara",
        rating: 4.7,
        reviews: 210,
        startingPrice: 100000,
        image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
        featured: true,
        verified: true,
    },
    {
        id: "vd4",
        name: "Rhythm Beats Band",
        category: "Bands",
        city: "Rajkot",
        rating: 4.6,
        reviews: 56,
        startingPrice: 30000,
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
    },
    {
        id: "vd5",
        name: "Royal Feast Caterers",
        category: "Caterers",
        city: "Ahmedabad",
        rating: 4.8,
        reviews: 345,
        startingPrice: 800, // Cost per plate usually
        image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80",
        featured: true,
        verified: true,
    },
    {
        id: "vd6",
        name: "Henna Art by Radhika",
        category: "Mehndi Artists",
        city: "Surat",
        rating: 4.9,
        reviews: 178,
        startingPrice: 5000,
        image: "https://images.unsplash.com/photo-1610041321427-8c710f5451ff?w=800&q=80",
        verified: true,
    }
];

const Vendors = () => {
    const [searchParams] = useSearchParams();
    const cityFilter = searchParams.get("city")?.toLowerCase();
    const categoryFilter = searchParams.get("category")?.toLowerCase();

    const filteredVendors = DUMMY_VENDORS.filter(vendor => {
        let match = true;
        if (cityFilter && vendor.city.toLowerCase() !== cityFilter) match = false;
        // Basic match for wedding since it's a broad term
        if (categoryFilter && categoryFilter !== 'wedding' && !vendor.category.toLowerCase().includes(categoryFilter)) match = false;
        return match;
    });

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <PageHeader
                title="Find Top Vendors"
                subtitle="Connect with the best professionals to make your event unforgettable"
                image="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1600&q=80"
            />

            <main className="flex-grow py-12">
                <div className="container">
                    <div className="flex flex-col md:flex-row gap-8">
                        <aside className="w-full md:w-[300px] shrink-0 hidden md:block">
                            <ListingFilter type="vendors" />
                        </aside>

                        <div className="flex-grow">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-2xl font-semibold text-foreground font-display">
                                    {filteredVendors.length} Professionals Found
                                </h2>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground hidden sm:inline-block">Sort by:</span>
                                    <select className="text-sm border-border rounded-md px-3 py-1.5 focus:ring-primary focus:border-primary bg-background">
                                        <option>Recommended</option>
                                        <option>Rating (High to Low)</option>
                                        <option>Price (Low to High)</option>
                                        <option>Price (High to Low)</option>
                                    </select>
                                </div>
                            </div>

                            {/* Mobile Filter Button */}
                            <div className="md:hidden mb-6">
                                <button className="w-full py-2.5 bg-white border border-border rounded-lg text-sm font-medium flex items-center justify-center gap-2 shadow-sm">
                                    Filters
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredVendors.length > 0 ? (
                                    filteredVendors.map((vendor) => (
                                        <VendorCard key={vendor.id} vendor={vendor} />
                                    ))
                                ) : (
                                    <div className="col-span-full py-12 text-center">
                                        <h3 className="text-lg font-medium text-foreground mb-2">No professionals found</h3>
                                        <p className="text-muted-foreground">Try adjusting your filters or search criteria.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Vendors;
