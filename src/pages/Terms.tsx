import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-grow py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-border">
                        <h1 className="text-4xl font-display font-semibold mb-8">Terms of Service</h1>

                        <div className="space-y-8 text-muted-foreground leading-relaxed">
                            <section>
                                <h2 className="text-xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
                                <p>
                                    By accessing or using our platform, you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the service.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-foreground mb-3">2. Description of Service</h2>
                                <p>
                                    VenueConnect provides an online platform that connects users seeking venues and vendors for events with the respective business owners. We act as an intermediary and are not responsible for the exact delivery of services by third-party vendors.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-foreground mb-3">3. User Responsibilities</h2>
                                <p className="mb-2">Users must:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Provide accurate and complete information when booking or listing.</li>
                                    <li>Maintain the security of their account credentials.</li>
                                    <li>Not use the platform for any illegal or unauthorized purpose.</li>
                                    <li>Respect the cancellation policies set by individual venues and vendors.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-foreground mb-3">4. Limitation of Liability</h2>
                                <p>
                                    VenueConnect shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
                                </p>
                            </section>

                            <section className="pt-8 border-t border-border mt-12">
                                <p className="text-sm">
                                    Last updated: October 2023. If you have any questions about these Terms, please contact us at legal@venueconnect.in.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Terms;
