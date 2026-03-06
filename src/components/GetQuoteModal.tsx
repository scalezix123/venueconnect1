import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User, Phone, Calendar, Users, MessageSquare, IndianRupee } from "lucide-react";
import { toast } from "sonner";

interface GetQuoteModalProps {
    businessName: string;
    triggerButton?: React.ReactNode;
}

const GetQuoteModal = ({ businessName, triggerButton }: GetQuoteModalProps) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
            toast.success(`Request sent to ${businessName}!`, {
                description: "They will contact you shortly with a personalized quote.",
            });
        }, 1200);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {triggerButton || (
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white shadow-md text-base h-12">
                        Request Pricing Details
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="font-display text-2xl">Get Free Quote</DialogTitle>
                    <DialogDescription>
                        Request latest pricing and availability from <strong className="text-foreground">{businessName}</strong>.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Your Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                required
                                placeholder="E.g., Rahul Sharma"
                                className="w-full pl-9 pr-4 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Phone Number</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="tel"
                                required
                                placeholder="+91"
                                className="w-full pl-9 pr-4 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Event Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="date"
                                    required
                                    className="w-full pl-9 pr-2 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Guests</label>
                            <div className="relative">
                                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="number"
                                    min="10"
                                    step="10"
                                    placeholder="E.g., 200"
                                    className="w-full pl-9 pr-4 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Any specific requirements?</label>
                        <div className="relative">
                            <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                            <textarea
                                placeholder="Any special requests or details about your event..."
                                className="w-full pl-9 pr-4 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary min-h-[80px]"
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 mt-2" disabled={loading}>
                        {loading ? "Sending Request..." : "Send Request to Venue"}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground mt-2 flex items-center justify-center gap-1">
                        <IndianRupee className="w-3 h-3" /> No booking fees or hidden charges
                    </p>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default GetQuoteModal;
