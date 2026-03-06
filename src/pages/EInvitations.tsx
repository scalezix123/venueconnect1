import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Save, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import html2canvas from "html2canvas";

interface Template {
    id: string;
    name: string;
    category: string;
    thumbnail_url: string;
    background_url: string;
    default_text_color: string;
}

const EInvitations = () => {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
    const [user, setUser] = useState<any>(null);
    const inviteRef = useRef<HTMLDivElement>(null);

    // Form State
    const [eventTitle, setEventTitle] = useState("Wedding Celebration");
    const [hostName, setHostName] = useState("Rahul & Priya");
    const [eventDate, setEventDate] = useState("");
    const [eventTime, setEventTime] = useState("");
    const [venueName, setVenueName] = useState("The Grand Rajwada");
    const [venueAddress, setVenueAddress] = useState("SG Highway, Ahmedabad");
    const [textColor, setTextColor] = useState("#000000"); // Will be overridden by template default

    const [isSaving, setIsSaving] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    useEffect(() => {
        checkAuth();
        fetchTemplates();
    }, []);

    const checkAuth = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            setUser(session.user);
        }
    };

    const fetchTemplates = async () => {
        try {
            const { data, error } = await supabase
                .from('invitation_templates')
                .select('*');

            if (error) throw error;

            setTemplates(data || []);
            if (data && data.length > 0) {
                setSelectedTemplate(data[0]);
                setTextColor(data[0].default_text_color);
            }
        } catch (error) {
            console.error("Error fetching templates: ", error);
        }
    };

    const handleTemplateSelection = (template: Template) => {
        setSelectedTemplate(template);
        setTextColor(template.default_text_color);
    };

    const handleDownload = async () => {
        if (!inviteRef.current) return;
        setIsDownloading(true);

        try {
            const canvas = await html2canvas(inviteRef.current, {
                useCORS: true,
                scale: 2, // High resolution
            });

            const image = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = image;
            link.download = `${eventTitle.replace(/\s+/g, '_')}_Invitation.png`;
            link.click();
            toast.success("Invitation downloaded successfully!");
        } catch (error) {
            console.error("Error generating image:", error);
            toast.error("Failed to download image. Please try again.");
        } finally {
            setIsDownloading(false);
        }
    };

    const handleSave = async () => {
        if (!user) {
            toast.error("Please login to save your invitation.");
            return;
        }

        if (!selectedTemplate) return;

        setIsSaving(true);
        try {
            const { error } = await supabase.from('user_invitations').insert([
                {
                    user_id: user.id,
                    template_id: selectedTemplate.id,
                    event_title: eventTitle,
                    host_name: hostName,
                    event_date: eventDate,
                    event_time: eventTime,
                    venue_name: venueName,
                    venue_address: venueAddress,
                    custom_text_color: textColor
                }
            ]);

            if (error) throw error;
            toast.success("Invitation saved to your dashboard!");
        } catch (error: any) {
            toast.error("Failed to save invitation", { description: error.message });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-muted/20">
            <Navbar />

            <main className="flex-grow container px-4 sm:px-6 py-12">
                <div className="mb-10">
                    <h1 className="text-3xl font-display font-semibold mb-2">E-Invitations Builder</h1>
                    <p className="text-muted-foreground">Customize beautiful digital invitations for your events.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Column: Form & Settings */}
                    <div className="lg:col-span-5 space-y-6">

                        {/* Template Selection */}
                        <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
                            <h2 className="text-lg font-semibold mb-4">1. Choose Template</h2>
                            <div className="grid grid-cols-3 gap-3">
                                {templates.map(template => (
                                    <div
                                        key={template.id}
                                        onClick={() => handleTemplateSelection(template)}
                                        className={`cursor-pointer rounded-lg border-2 overflow-hidden transition-all ${selectedTemplate?.id === template.id ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-border'}`}
                                    >
                                        <div className="aspect-[3/4] relative">
                                            <img src={template.thumbnail_url} alt={template.name} className="w-full h-full object-cover" />
                                            {selectedTemplate?.id === template.id && (
                                                <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                                                    <div className="bg-primary text-white text-xs px-2 py-1 rounded-full font-medium shadow-sm">Selected</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Customization Details */}
                        <div className="bg-white p-6 rounded-xl border border-border shadow-sm space-y-4">
                            <h2 className="text-lg font-semibold mb-2">2. Customize Details</h2>

                            <div>
                                <Label htmlFor="eventTitle">Event Type/Title</Label>
                                <Input id="eventTitle" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} placeholder="e.g. Wedding Celebration" />
                            </div>

                            <div>
                                <Label htmlFor="hostName">Host/Couple Name</Label>
                                <Input id="hostName" value={hostName} onChange={(e) => setHostName(e.target.value)} placeholder="e.g. Rahul & Priya" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="eventDate">Date</Label>
                                    <Input id="eventDate" type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
                                </div>
                                <div>
                                    <Label htmlFor="eventTime">Time</Label>
                                    <Input id="eventTime" type="time" value={eventTime} onChange={(e) => setEventTime(e.target.value)} />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="venueName">Venue Name</Label>
                                <Input id="venueName" value={venueName} onChange={(e) => setVenueName(e.target.value)} placeholder="e.g. The Grand Palace" />
                            </div>

                            <div>
                                <Label htmlFor="venueAddress">Venue Address</Label>
                                <Input id="venueAddress" value={venueAddress} onChange={(e) => setVenueAddress(e.target.value)} placeholder="e.g. Mumbai, India" />
                            </div>

                            <div>
                                <Label htmlFor="textColor">Text Color</Label>
                                <div className="flex gap-2">
                                    <Input id="textColor" type="color" className="w-14 p-1 h-10" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
                                    <Input type="text" className="flex-grow font-mono text-sm uppercase" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <Button className="flex-1 bg-primary text-white" onClick={handleDownload} disabled={!selectedTemplate || isDownloading}>
                                {isDownloading ? "Generating..." : <><Download className="w-4 h-4 mr-2" /> Download Image</>}
                            </Button>
                            <Button variant="outline" className="flex-[0.5]" onClick={handleSave} disabled={!selectedTemplate || isSaving}>
                                {isSaving ? "Saving..." : <><Save className="w-4 h-4 mr-2" /> Save</>}
                            </Button>
                        </div>
                        {!user && (
                            <p className="text-xs text-muted-foreground text-center">Login to save your designs for later edits.</p>
                        )}
                    </div>

                    {/* Right Column: Live Preview */}
                    <div className="lg:col-span-7">
                        <div className="bg-white p-6 rounded-xl border border-border shadow-sm h-full flex flex-col">
                            <h2 className="text-lg font-semibold mb-4 flex items-center justify-between">
                                <span>3. Live Preview</span>
                            </h2>

                            <div className="bg-muted/30 rounded-lg flex-grow flex items-center justify-center p-4 sm:p-8 overflow-hidden">
                                {selectedTemplate ? (
                                    <div
                                        className="relative bg-white shadow-2xl mx-auto overflow-hidden"
                                        style={{
                                            width: '100%',
                                            maxWidth: '400px',
                                            aspectRatio: '3/4',
                                        }}
                                    >
                                        <div
                                            ref={inviteRef}
                                            className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-8 text-center"
                                            style={{
                                                backgroundImage: `url(${selectedTemplate.background_url})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                            }}
                                        >
                                            {/* Text Content Overlay */}
                                            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center" style={{ color: textColor }}>
                                                <p className="text-sm font-medium tracking-[0.2em] mb-4 uppercase opacity-90">Join us to celebrate the</p>
                                                <h1 className="font-display font-medium text-4xl leading-tight mb-8 drop-shadow-sm">{eventTitle || "Title"}</h1>

                                                <div className="mb-8">
                                                    <p className="text-sm italic opacity-80 mb-2">of</p>
                                                    <h2 className="font-display text-3xl font-semibold drop-shadow-sm">{hostName || "Names"}</h2>
                                                </div>

                                                <div className="w-16 h-px bg-current opacity-30 my-6"></div>

                                                <div className="flex items-center justify-center gap-4 text-base tracking-wide font-medium">
                                                    <span>{eventDate ? new Date(eventDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : "Date"}</span>
                                                    <span className="w-1 h-1 rounded-full bg-current"></span>
                                                    <span>{eventTime || "Time"}</span>
                                                </div>

                                                <div className="w-16 h-px bg-current opacity-30 my-6"></div>

                                                <div className="text-sm font-medium opacity-90 max-w-[80%] uppercase tracking-wider">
                                                    <p className="mb-1 font-bold">{venueName || "Venue Name"}</p>
                                                    <p className="opacity-80 text-xs">{venueAddress || "Venue Address"}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-30" />
                                        <p className="text-muted-foreground">Select a template to view the preview</p>
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

export default EInvitations;
