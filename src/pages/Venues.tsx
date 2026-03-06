import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import ListingFilter from "@/components/ListingFilter";
import VenueCard, { VenueData } from "@/components/VenueCard";

const DUMMY_VENUES: VenueData[] = [
    {
        id: "v1",
        name: "The Grand Rajwada",
        city: "Ahmedabad",
        area: "SG Highway",
        capacity: "200-1500",
        rating: 4.8,
        reviews: 245,
        image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
        featured: true,
        verified: true,
        venueType: "Banquet Hall",
        pricePerPlate: 1200
    },
    {
        id: "v2",
        name: "Royal Greens Farmhouse",
        city: "Surat",
        area: "Adajan",
        capacity: "100-800",
        rating: 4.6,
        reviews: 189,
        image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
        verified: true,
        venueType: "Farmhouse",
        pricePerPlate: 850
    },
    {
        id: "v3",
        name: "Lakshmi Vilas Banquet",
        city: "Vadodara",
        area: "Alkapuri",
        capacity: "300-2000",
        rating: 4.9,
        reviews: 312,
        image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80",
        featured: true,
        verified: true,
        venueType: "Banquet Hall",
        pricePerPlate: 1500
    },
    {
        id: "v4",
        name: "Sapphire Convention",
        city: "Rajkot",
        area: "Kalawad Road",
        capacity: "150-1000",
        rating: 4.5,
        reviews: 156,
        image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
        verified: true,
        venueType: "Resort",
        pricePerPlate: 1100
    },
    {
        id: "v5",
        name: "Crystal Palace",
        city: "Ahmedabad",
        area: "Bopal",
        capacity: "50-300",
        rating: 4.4,
        reviews: 98,
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
        venueType: "Hotel",
        pricePerPlate: 950
    },
    {
        id: "v6",
        name: "The Blue Lagoon Resort",
        city: "Surat",
        area: "Dumas Road",
        capacity: "500-3000",
        rating: 4.7,
        reviews: 412,
        image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80",
        featured: true,
        verified: true,
        venueType: "Resort",
        pricePerPlate: 2000
    }
];

const Venues = () => {
    const [searchParams] = useSearchParams();
    const searchCity = searchParams.get("city")?.toLowerCase();
    const searchCategory = searchParams.get("category")?.toLowerCase(); // from HeroSearch, usually empty for venues but passed
    const filterTypes = searchParams.getAll("type"); // e.g., Hotel, Resort
    const filterCapacity = searchParams.get("capacity");

    const filteredVenues = DUMMY_VENUES.filter(venue => {
        let match = true;

        if (searchCity && venue.city.toLowerCase() !== searchCity) match = false;

        if (filterTypes.length > 0 && venue.venueType) {
            if (!filterTypes.includes(venue.venueType)) match = false;
        }

        if (filterCapacity) {
            const maxCap = parseInt(venue.capacity.split('-')[1] || venue.capacity.replace('+', ''));
            if (filterCapacity === "Under 100" && maxCap >= 100) match = false;
            if (filterCapacity === "100 - 500" && (maxCap < 100 || maxCap > 500)) match = false;
            if (filterCapacity === "500 - 1000" && (maxCap < 500 || maxCap > 1000)) match = false;
            if (filterCapacity === "1000+" && maxCap < 1000) match = false;
        }

        return match;
    });

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <PageHeader
                title="Find Venues"
                subtitle="Discover the perfect location for your upcoming celebration"
                image="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600&q=80"
            />

            <main className="flex-grow py-12">
                <div className="container">
                    <div className="flex flex-col md:flex-row gap-8">
                        <aside className="w-full md:w-[300px] shrink-0 hidden md:block">
                            <ListingFilter type="venues" />
                        </aside>

                        <div className="flex-grow">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-2xl font-semibold text-foreground font-display">
                                    {filteredVenues.length} Venues Found {searchCity && `in ${searchParams.get("city")}`}
                                </h2>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground hidden sm:inline-block">Sort by:</span>
                                    <select className="text-sm border-border rounded-md px-3 py-1.5 focus:ring-primary focus:border-primary bg-background">
                                        <option>Recommended</option>
                                        <option>Rating (High to Low)</option>
                                        <option>Capacity (High to Low)</option>
                                        <option>Price (Low to High)</option>
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
                                {filteredVenues.length > 0 ? (
                                    filteredVenues.map((venue) => (
                                        <VenueCard key={venue.id} venue={venue} />
                                    ))
                                ) : (
                                    <div className="col-span-full py-12 text-center">
                                        <h3 className="text-lg font-medium text-foreground mb-2">No venues found</h3>
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

export default Venues;
