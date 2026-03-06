import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Message sent successfully! We'll get back to you soon.");
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <PageHeader
                title="Contact Us"
                subtitle="We're here to help you with your Event needs."
                image="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1600&q=80"
            />

            <main className="flex-grow py-16">
                <div className="container max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-display font-semibold mb-6">Get in Touch</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Have a question about booking a venue? Need help with your vendor listing? Or just want to say hi? We'd love to hear from you. Fill out the form, and our team will get back to you within 24 hours.
                                </p>
                            </div>

                            <div className="space-y-6 bg-white p-8 rounded-2xl border border-border shadow-sm">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                                        <Phone className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Call Us</h3>
                                        <p className="text-muted-foreground mt-1">+91 98765 43210</p>
                                        <p className="text-xs text-muted-foreground mt-1">Mon-Sat, 9AM-6PM IST</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                                        <Mail className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Email Us</h3>
                                        <p className="text-muted-foreground mt-1">support@venueconnect.in</p>
                                        <p className="text-muted-foreground">partners@venueconnect.in</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Visit HQ</h3>
                                        <p className="text-muted-foreground mt-1 leading-relaxed">
                                            1204, Titanium City Centre,<br />
                                            Prahlad Nagar, Ahmedabad,<br />
                                            Gujarat 380015
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white p-8 md:p-10 rounded-2xl border border-border shadow-xl shadow-primary/5">
                            <h3 className="text-2xl font-semibold mb-6">Send us a Message</h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-background"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-background"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Subject</label>
                                    <select className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-background">
                                        <option>General Support</option>
                                        <option>Venue/Vendor Listing Issue</option>
                                        <option>Booking Assistance</option>
                                        <option>Partnership Inquiry</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Your Message</label>
                                    <textarea
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-background resize-none"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>

                                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-base">
                                    <Send className="w-4 h-4 mr-2" /> Send Message
                                </Button>
                            </form>
                        </div>

                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Contact;
