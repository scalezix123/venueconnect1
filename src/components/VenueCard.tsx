import { Star, Users, MapPin, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export interface VenueData {
    id: string;
    name: string;
    city: string;
    area?: string;
    capacity: string;
    rating: number;
    reviews: number;
    image: string;
    featured?: boolean;
    verified?: boolean;
    amenities?: string[];
}

interface VenueCardProps {
    venue: VenueData;
}

const VenueCard = ({ venue }: VenueCardProps) => {
    return (
        <Link to={`/venues/${venue.id}`} className="block group">
            <div className="bg-white rounded-xl overflow-hidden border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="relative h-56 overflow-hidden">
                    <img
                        src={venue.image}
                        alt={venue.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {venue.featured && (
                        <span className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-primary text-xs font-semibold text-white">
                            Featured
                        </span>
                    )}
                    {venue.verified && (
                        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/95 backdrop-blur-sm">
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                            <span className="text-[10px] font-medium text-foreground uppercase tracking-wider">Verified</span>
                        </div>
                    )}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-foreground/80 backdrop-blur-sm text-white text-xs font-semibold">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        {venue.rating} <span className="text-white/60">({venue.reviews})</span>
                    </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-display font-semibold text-foreground text-xl leading-tight group-hover:text-primary transition-colors mb-2">
                        {venue.name}
                    </h3>

                    <div className="space-y-2 mb-4 flex-grow">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4 text-primary shrink-0" />
                            <span className="truncate">{venue.area ? `${venue.area}, ` : ""}{venue.city}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Users className="w-4 h-4 text-primary shrink-0" />
                            <span>{venue.capacity} Guests</span>
                        </div>
                    </div>

                    <Button size="sm" className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors duration-300">
                        <Send className="w-3.5 h-3.5 mr-2" /> View Details & Prices
                    </Button>
                </div>
            </div>
        </Link>
    );
};

export default VenueCard;
