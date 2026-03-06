import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VenueCard, { VenueData } from "@/components/VenueCard";
import { Heart, LayoutDashboard, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [favorites, setFavorites] = useState<VenueData[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("favorites");

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                navigate('/login');
                return;
            }
            setUser(session.user);
            fetchFavorites(session.user.id);
        };

        checkAuth();
    }, [navigate]);

    const fetchFavorites = async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('user_favorites')
                .select('venue_data')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (error) {
                console.error("Error fetching favorites:", error);
                return;
            }

            if (data) {
                // The venue_data column contains the JSON object we stored
                const venues = data.map(item => item.venue_data as unknown as VenueData);
                setFavorites(venues);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-muted/20">
            <Navbar />

            <main className="flex-grow container px-4 sm:px-6 py-12">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-3xl font-display font-semibold mb-8">My Dashboard</h1>

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Sidebar */}
                        <aside className="w-full md:w-64 shrink-0">
                            <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
                                <div className="p-4 border-b border-border bg-slate-50">
                                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-xl mb-3">
                                        {user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0) || "U"}
                                    </div>
                                    <h3 className="font-medium truncate">{user?.user_metadata?.full_name || "User"}</h3>
                                    <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
                                </div>

                                <nav className="p-2 space-y-1">
                                    <button
                                        onClick={() => setActiveTab("favorites")}
                                        className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'favorites' ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-muted'}`}
                                    >
                                        <Heart className="w-4 h-4" /> My Favorites
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("bookings")}
                                        className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'bookings' ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-muted'}`}
                                    >
                                        <LayoutDashboard className="w-4 h-4" /> Requested Quotes
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("settings")}
                                        className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'settings' ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-muted'}`}
                                    >
                                        <Settings className="w-4 h-4" /> Settings
                                    </button>
                                </nav>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <div className="flex-grow">
                            <div className="bg-white rounded-xl shadow-sm border border-border p-6 min-h-[500px]">
                                {activeTab === "favorites" && (
                                    <div>
                                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" /> Saved Venues & Vendors
                                        </h2>

                                        {favorites.length > 0 ? (
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {favorites.map((venue) => (
                                                    <div key={venue.id} className="h-full">
                                                        <VenueCard venue={venue} />
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-20 flex flex-col items-center">
                                                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                                                    <Heart className="w-8 h-8 text-muted-foreground" />
                                                </div>
                                                <h3 className="text-lg font-medium text-foreground mb-2">No favorites yet</h3>
                                                <p className="text-muted-foreground text-sm max-w-sm mb-6">
                                                    Start exploring venues and vendors around Gujarat and click the heart icon to save them here for easy comparison later.
                                                </p>
                                                <Button onClick={() => navigate('/venues')} className="bg-primary text-white">
                                                    Explore Venues
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {activeTab === "bookings" && (
                                    <div className="text-center py-20">
                                        <LayoutDashboard className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                                        <h3 className="text-xl font-medium mb-2">Requested Quotes</h3>
                                        <p className="text-muted-foreground">This feature is coming soon in Phase 4.</p>
                                    </div>
                                )}

                                {activeTab === "settings" && (
                                    <div className="text-center py-20">
                                        <Settings className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                                        <h3 className="text-xl font-medium mb-2">Account Settings</h3>
                                        <p className="text-muted-foreground">Profile editing functionality will be available soon.</p>
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

export default Dashboard;
