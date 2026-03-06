import { Search, MapPin, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ListingFilterProps {
    type: 'venues' | 'vendors';
}

const ListingFilter = ({ type }: ListingFilterProps) => {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-border p-5 sticky top-24 z-10">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5 text-primary" />
                    Filters
                </h3>
                <span className="text-xs text-primary font-medium cursor-pointer hover:underline">Clear All</span>
            </div>

            <div className="space-y-6">
                {/* Location Search */}
                <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground">Location</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                            type="text"
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
                                {['Banquet Hall', 'Farmhouse', 'Hotel', 'Resort', 'Party Plot'].map((cat) => (
                                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                        <input type="checkbox" className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20 cursor-pointer" />
                                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{cat}</span>
                                    </label>
                                ))}
                            </>
                        ) : (
                            <>
                                {['Photographers', 'Makeup Artists', 'Decorators', 'Caterers', 'Mehndi Artists'].map((cat) => (
                                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                                        <input type="checkbox" className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20 cursor-pointer" />
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
                            {['Under 100', '100 - 500', '500 - 1000', '1000+'].map((cap) => (
                                <label key={cap} className="flex items-center gap-3 cursor-pointer group">
                                    <input type="radio" name="capacity" className="w-4 h-4 text-primary border-border focus:ring-primary/20 cursor-pointer" />
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
                        {[
                            type === 'venues' ? 'Under ₹1 Lakh' : 'Under ₹20,000',
                            type === 'venues' ? '₹1L - ₹3L' : '₹20k - ₹50k',
                            type === 'venues' ? '₹3L - ₹5L' : '₹50k - ₹1L',
                            type === 'venues' ? 'Above ₹5L' : 'Above ₹1L'
                        ].map((range) => (
                            <label key={range} className="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20 cursor-pointer" />
                                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{range}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-white shadow-md">
                    Apply Filters
                </Button>
            </div>
        </div>
    );
};

export default ListingFilter;
