import { Star, MapPin, Send, CheckCircle2, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export interface VendorData {
    id: string;
    name: string;
    category: string;
    city: string;
    rating: number;
    reviews: number;
    startingPrice: number;
    image: string;
    featured?: boolean;
    verified?: boolean;
}

interface VendorCardProps {
    vendor: VendorData;
}

const VendorCard = ({ vendor }: VendorCardProps) => {
    return (
        <Link to={`/vendors/${vendor.id}`} className="block group">
            <div className="bg-white rounded-xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="relative h-56 overflow-hidden">
                    <img
                        src={vendor.image}
                        alt={vendor.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                        {vendor.featured && (
                            <span className="px-3 py-1.5 rounded-full bg-primary text-xs font-semibold text-white">
                                Premium
                            </span>
                        )}
                        <span className="px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-xs font-semibold text-white">
                            {vendor.category}
                        </span>
                    </div>

                    {vendor.verified && (
                        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/95 backdrop-blur-sm shadow-sm">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                        </div>
                    )}

                    <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-foreground/80 backdrop-blur-sm text-white text-xs font-semibold">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        {vendor.rating} <span className="text-white/60">({vendor.reviews})</span>
                    </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-display font-semibold text-foreground text-xl leading-tight group-hover:text-primary transition-colors mb-2">
                        {vendor.name}
                    </h3>

                    <div className="space-y-2 mb-4 flex-grow">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4 text-primary shrink-0" />
                            <span>{vendor.city}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <IndianRupee className="w-4 h-4 text-primary shrink-0" />
                            <span>Starting from <strong className="text-foreground">₹{vendor.startingPrice.toLocaleString('en-IN')}</strong></span>
                        </div>
                    </div>

                    <Button size="sm" variant="outline" className="w-full border-primary/20 hover:bg-primary/5 text-primary">
                        <Send className="w-3.5 h-3.5 mr-2" /> Message Vendor
                    </Button>
                </div>
            </div>
        </Link>
    );
};

export default VendorCard;
