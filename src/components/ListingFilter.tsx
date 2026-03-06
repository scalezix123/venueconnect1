import { Search, MapPin, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

interface ListingFilterProps {
    type: 'venues' | 'vendors';
}

const VENUE_TYPES = ['Banquet Hall', 'Farmhouse', 'Hotel', 'Resort', 'Party Plot'];
const VENDOR_TYPES = ['Photographers', 'Makeup Artists', 'Decorators', 'Caterers', 'Mehndi Artists'];

const VENUE_CAPACITIES = ['Under 100', '100 - 500', '500 - 1000', '1000+'];

const VENUE_PRICES = ['Under ₹1 Lakh', '₹1L - ₹3L', '₹3L - ₹5L', 'Above ₹5L'];
const VENDOR_PRICES = ['Under ₹20,000', '₹20k - ₹50k', '₹50k - ₹1L', 'Above ₹1L'];

const ListingFilter = ({ type }: ListingFilterProps) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [location, setLocation] = useState(searchParams.get("city") || "");
    const [selectedTypes, setSelectedTypes] = useState<string[]>(searchParams.getAll("type"));
    const [selectedCapacity, setSelectedCapacity] = useState<string>(searchParams.get("capacity") || "");
    const [selectedPrices, setSelectedPrices] = useState<string[]>(searchParams.getAll("price"));

    // Sync state if URL changes externally
    useEffect(() => {
        setLocation(searchParams.get("city") || "");
        setSelectedTypes(searchParams.getAll("type"));
        setSelectedCapacity(searchParams.get("capacity") || "");
        setSelectedPrices(searchParams.getAll("price"));
    }, [searchParams]);

    const handleTypeToggle = (t: string) => {
        setSelectedTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
    };

    const handlePriceToggle = (p: string) => {
        setSelectedPrices(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
    };

    const applyFilters = () => {
        const newParams = new URLSearchParams(searchParams);

        if (location) newParams.set("city", location);
        else newParams.delete("city");

        newParams.delete("type");
        selectedTypes.forEach(t => newParams.append("type", t));

        if (type === 'venues') {
            if (selectedCapacity) newParams.set("capacity", selectedCapacity);
            else newParams.delete("capacity");
        }

        newParams.delete("price");
        selectedPrices.forEach(p => newParams.append("price", p));

        setSearchParams(newParams);
    };

    const clearFilters = () => {
        setLocation("");
        setSelectedTypes([]);
        setSelectedCapacity("");
        setSelectedPrices([]);
        setSearchParams(new URLSearchParams());
    };
    return (
        <div className="bg-white rounded-xl shadow-sm border border-border p-5 sticky top-24 z-10">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5 text-primary" />
                    Filters
                </h3>
                <span onClick={clearFilters} className="text-xs text-primary font-medium cursor-pointer hover:underline">Clear All</span>
            </div>

            <div className="space-y-6">
                {/* Location Search */}
                <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground">Location</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Search city or area..."
                            className="w-full pl-9 pr-4 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-muted/20"
                        />
                    </div>
                </div>

                {/* Categories */}
                <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground">
                        {type === 'venues' ? 'Venue Type' : 'Vendor Category'}
                    </label>
                    <div className="space-y-2">
                        {type === 'venues' ? (
                            <>
                                {VENUE_TYPES.map((cat) => (
                                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={selectedTypes.includes(cat)}
                                            onChange={() => handleTypeToggle(cat)}
                                            className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20 cursor-pointer"
                                        />
                                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{cat}</span>
                                    </label>
                                ))}
                            </>
                        ) : (
                            <>
                                {VENDOR_TYPES.map((cat) => (
                                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={selectedTypes.includes(cat)}
                                            onChange={() => handleTypeToggle(cat)}
                                            className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20 cursor-pointer"
                                        />
                                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{cat}</span>
                                    </label>
                                ))}
                            </>
                        )}
                    </div>
                </div>

                {/* Capacity (Venues Only) */}
                {type === 'venues' && (
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-foreground">Guest Capacity</label>
                        <div className="space-y-2">
                            {VENUE_CAPACITIES.map((cap) => (
                                <label key={cap} className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="radio"
                                        name="capacity"
                                        checked={selectedCapacity === cap}
                                        onChange={() => setSelectedCapacity(cap)}
                                        className="w-4 h-4 text-primary border-border focus:ring-primary/20 cursor-pointer"
                                    />
                                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{cap}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                {/* Price Range */}
                <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground">Budget Range</label>
                    <div className="space-y-2">
                        {(type === 'venues' ? VENUE_PRICES : VENDOR_PRICES).map((range) => (
                            <label key={range} className="flex items-center gap-3 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={selectedPrices.includes(range)}
                                    onChange={() => handlePriceToggle(range)}
                                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20 cursor-pointer"
                                />
                                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{range}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <Button onClick={applyFilters} className="w-full bg-primary hover:bg-primary/90 text-white shadow-md">
                    Apply Filters
                </Button>
            </div>
        </div>
    );
};

export default ListingFilter;
