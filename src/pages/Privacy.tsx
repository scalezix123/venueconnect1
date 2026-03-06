import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-grow py-16">
                <div className="container max-w-4xl mx-auto">
                    <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-border">
                        <h1 className="text-4xl font-display font-semibold mb-8">Privacy Policy</h1>

                        <div className="space-y-8 text-muted-foreground leading-relaxed">
                            <section>
                                <h2 className="text-xl font-semibold text-foreground mb-3">1. Information We Collect</h2>
                                <p>
                                    We collect information you provide directly to us when you create an account, update your profile, use our services, or communicate with us. This may include your name, email address, phone number, payment information, and any other information you choose to provide.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-foreground mb-3">2. How We Use Your Information</h2>
                                <p className="mb-2">We use the information we collect to:</p>
                                <ul className="list-disc pl-5 space-y-2">
                                    <li>Provide, maintain, and improve our services.</li>
                                    <li>Process transactions and send related information.</li>
                                    <li>Send technical notices, updates, security alerts, and support messages.</li>
                                    <li>Respond to your comments, questions, and requests.</li>
                                    <li>Communicate about products, services, offers, promotions, and events.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-foreground mb-3">3. Information Sharing</h2>
                                <p>
                                    We do not share your personal information with third parties except as described in this privacy policy or as necessary to provide our services (such as processing payments or communicating with venues/vendors you interact with).
                                </p>
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold text-foreground mb-3">4. Security</h2>
                                <p>
                                    We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.
                                </p>
                            </section>

                            <section className="pt-8 border-t border-border mt-12">
                                <p className="text-sm">
                                    Last updated: October 2023. If you have any questions about this Privacy Policy, please contact us at privacy@venueconnect.in.
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

export default Privacy;
