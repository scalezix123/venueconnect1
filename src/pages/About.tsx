import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";

const About = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <PageHeader
                title="About VenueConnect"
                subtitle="Your trusted partner in finding the perfect spaces and services."
                image="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600&q=80"
            />
            <main className="flex-grow py-16">
                <div className="container max-w-4xl mx-auto space-y-12">
                    <section className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-border">
                        <h2 className="text-3xl font-display font-semibold mb-6">Our Mission</h2>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                            At VenueConnect, our mission is to simplify the process of event planning. We understand that finding the right venue and vendors can be the most stressful part of organizing any occasion—whether it's a grand wedding, a corporate conference, or an intimate birthday party.
                        </p>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            We bring together the largest, most curated selection of venues and event professionals across Gujarat, making it easy for you to browse, compare, and connect with them directly. No middleman fees, just transparent pricing and honest reviews.
                        </p>
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10 text-center">
                            <div className="text-4xl font-bold text-primary mb-2">500+</div>
                            <div className="font-medium text-foreground">Premium Venues</div>
                        </div>
                        <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10 text-center">
                            <div className="text-4xl font-bold text-primary mb-2">10k+</div>
                            <div className="font-medium text-foreground">Happy Events</div>
                        </div>
                        <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10 text-center">
                            <div className="text-4xl font-bold text-primary mb-2">1000+</div>
                            <div className="font-medium text-foreground">Verified Vendors</div>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default About;
