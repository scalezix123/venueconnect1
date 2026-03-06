import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Building2, MapPin, Camera, Info } from "lucide-react";
import { toast } from "sonner";

const ListVenue = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        businessName: "",
        category: "venue",
        city: "",
        address: "",
        contactName: "",
        phone: "",
        email: "",
        description: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => setStep((s) => Math.min(s + 1, 3));
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            toast.success("Details submitted successfully! Our team will contact you soon.");
            setStep(4); // Success step
        }, 1000);
    };

    const StepProgress = () => (
        <div className="flex items-center justify-center mb-10 w-full max-w-2xl mx-auto">
            <div className={`flex flex-col items-center w-24 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 transition-colors ${step >= 1 ? 'bg-primary text-white shadow-md' : 'bg-muted'}`}>1</div>
                <span className="text-xs font-medium">Basic Info</span>
            </div>
            <div className={`h-1 w-20 mx-2 rounded-full transition-colors ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />

            <div className={`flex flex-col items-center w-24 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 transition-colors ${step >= 2 ? 'bg-primary text-white shadow-md' : 'bg-muted'}`}>2</div>
                <span className="text-xs font-medium">Details</span>
            </div>
            <div className={`h-1 w-20 mx-2 rounded-full transition-colors ${step >= 3 ? 'bg-primary' : 'bg-muted'}`} />

            <div className={`flex flex-col items-center w-24 ${step >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 transition-colors ${step >= 3 ? 'bg-primary text-white shadow-md' : 'bg-muted'}`}>3</div>
                <span className="text-xs font-medium">Review</span>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <PageHeader
                title="Partner With Us"
                subtitle="List your venue or services and reach thousands of customers across Gujarat."
                image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80"
            />

            <main className="flex-grow py-20 bg-muted/20">
                <div className="container px-4 sm:px-6 flex justify-center">

                    <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-border/50 p-6 md:p-12">

                        {step < 4 && (
                            <>
                                <div className="text-center mb-10">
                                    <h2 className="font-display text-3xl font-semibold text-foreground mb-3">Add Your Business</h2>
                                    <p className="text-muted-foreground text-sm max-w-md mx-auto">
                                        Fill out the form below to initiate your listing process. It takes less than 3 minutes.
                                    </p>
                                </div>
                                <StepProgress />
                            </>
                        )}

                        {step === 4 ? (
                            <div className="text-center py-12">
                                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 className="w-10 h-10 text-green-500" />
                                </div>
                                <h3 className="text-2xl font-semibold mb-2">Application Submitted!</h3>
                                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                                    Thank you for applying to list with VenueConnect. Our onboarding team will review your application and contact you within 24 hours.
                                </p>
                                <Button onClick={() => window.location.href = '/'} className="bg-primary hover:bg-primary/90 text-white">
                                    Return Home
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>

                                {/* STEP 1: Basic Info */}
                                {step === 1 && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Business Category *</label>
                                                <select
                                                    name="category"
                                                    value={formData.category}
                                                    onChange={handleChange}
                                                    className="w-full border-border rounded-lg px-4 py-2.5 focus:ring-primary focus:border-primary bg-background"
                                                    required
                                                >
                                                    <option value="venue">Venue (Banquet, Farmhouse, etc.)</option>
                                                    <option value="vendor">Vendor (Photographer, Decorator, etc.)</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Business Name *</label>
                                                <div className="relative">
                                                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                    <input
                                                        name="businessName"
                                                        value={formData.businessName}
                                                        onChange={handleChange}
                                                        type="text"
                                                        placeholder="e.g. Royal Palace Banquet"
                                                        className="w-full pl-9 pr-4 py-2.5 text-sm border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-background"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">City *</label>
                                                <select
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleChange}
                                                    className="w-full border-border rounded-lg px-4 py-2.5 focus:ring-primary focus:border-primary bg-background"
                                                    required
                                                >
                                                    <option value="">Select city</option>
                                                    <option value="Ahmedabad">Ahmedabad</option>
                                                    <option value="Surat">Surat</option>
                                                    <option value="Vadodara">Vadodara</option>
                                                    <option value="Rajkot">Rajkot</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Primary Contact Number *</label>
                                                <input
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    type="tel"
                                                    placeholder="+91"
                                                    className="w-full px-4 py-2.5 text-sm border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-background"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-border mt-8 flex justify-end">
                                            <Button type="submit" className="bg-primary hover:bg-primary/90 text-white min-w-[120px]">
                                                Save & Next <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 2: Details */}
                                {step === 2 && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Full Address *</label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                                <textarea
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                    placeholder="Enter complete street address..."
                                                    className="w-full pl-9 pr-4 py-2.5 text-sm border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-background min-h-[100px]"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Your Name *</label>
                                                <input
                                                    name="contactName"
                                                    value={formData.contactName}
                                                    onChange={handleChange}
                                                    type="text"
                                                    placeholder="John Doe"
                                                    className="w-full px-4 py-2.5 text-sm border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-background"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Email Address</label>
                                                <input
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    type="email"
                                                    placeholder="contact@business.com"
                                                    className="w-full px-4 py-2.5 text-sm border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-background"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Brief Description (Optional)</label>
                                            <div className="relative">
                                                <Info className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                                                <textarea
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                    placeholder="Tell us a bit about your services..."
                                                    className="w-full pl-9 pr-4 py-2.5 text-sm border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all bg-background min-h-[100px]"
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-border mt-8 flex justify-between">
                                            <Button type="button" variant="outline" onClick={prevStep}>
                                                Back
                                            </Button>
                                            <Button type="submit" className="bg-primary hover:bg-primary/90 text-white min-w-[120px]">
                                                Review Details <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 3: Review */}
                                {step === 3 && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="bg-muted/30 rounded-xl p-6 border border-border/50">
                                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                                <CheckCircle2 className="w-5 h-5 text-primary" /> Verify Information
                                            </h3>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                                                <div>
                                                    <span className="text-muted-foreground block text-xs">Business Category</span>
                                                    <span className="font-medium capitalize">{formData.category}</span>
                                                </div>
                                                <div>
                                                    <span className="text-muted-foreground block text-xs">Business Name</span>
                                                    <span className="font-medium">{formData.businessName || "Not provided"}</span>
                                                </div>
                                                <div>
                                                    <span className="text-muted-foreground block text-xs">City</span>
                                                    <span className="font-medium">{formData.city || "Not provided"}</span>
                                                </div>
                                                <div>
                                                    <span className="text-muted-foreground block text-xs">Contact Person</span>
                                                    <span className="font-medium">{formData.contactName || "Not provided"}</span>
                                                </div>
                                                <div>
                                                    <span className="text-muted-foreground block text-xs">Phone Number</span>
                                                    <span className="font-medium">{formData.phone || "Not provided"}</span>
                                                </div>
                                                <div>
                                                    <span className="text-muted-foreground block text-xs">Email</span>
                                                    <span className="font-medium">{formData.email || "Not provided"}</span>
                                                </div>
                                                <div className="md:col-span-2">
                                                    <span className="text-muted-foreground block text-xs">Address</span>
                                                    <span className="font-medium">{formData.address || "Not provided"}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-6">
                                            <div className="flex gap-4">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                                    <Camera className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-sm text-blue-900 mb-1">What's Next? (Images & Pricing)</h4>
                                                    <p className="text-xs text-blue-700/80 leading-relaxed">
                                                        After submitting this application, our team will review the details. Once approved, you'll receive a secure link to upload high-quality images and define your pricing packages in your dedicated seller dashboard.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-border mt-8 flex justify-between">
                                            <Button type="button" variant="outline" onClick={prevStep}>
                                                Edit Details
                                            </Button>
                                            <Button type="submit" className="bg-primary hover:bg-primary/90 text-white min-w-[150px] shadow-md">
                                                Submit Application
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </form>
                        )}

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ListVenue;
