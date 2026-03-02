import { Search, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const searches = [
  "Wedding venues in Ahmedabad",
  "Banquet halls in Surat",
  "Farmhouses in Vadodara",
  "Birthday party venues in Rajkot",
  "Corporate event venues in Gandhinagar",
  "Engagement venues in Ahmedabad",
  "Pool party venues in Surat",
  "Garba venues in Vadodara",
  "Kitty party venues in Ahmedabad",
  "Reception halls in Surat",
  "Party plots in Vadodara",
  "Hotels for events in Rajkot",
  "Resorts in Gandhinagar",
  "Restaurant venues in Ahmedabad",
  "Convention centers in Surat",
  "Luxury venues in Vadodara",
  "Garden venues in Ahmedabad",
  "Rooftop venues in Surat",
  "Heritage venues in Vadodara",
  "Budget venues in Rajkot",
];

const PopularSearches = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-primary/30" />
            <span className="text-[10.5px] font-semibold tracking-[3px] uppercase text-primary">
              SEO Discovery
            </span>
            <div className="h-px w-12 bg-primary/30" />
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Popular <em className="italic text-primary">Searches</em>
          </h2>
          
          <p className="text-[15px] text-muted-foreground max-w-2xl mx-auto">
            Quick access to the most searched venue categories
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-3 justify-center max-w-5xl mx-auto">
          {searches.map((search, i) => (
            <motion.a
              key={i}
              href={`/search?q=${encodeURIComponent(search)}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.02 }}
              className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary/5 hover:bg-primary hover:text-white border border-primary/20 hover:border-primary transition-all duration-200 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-primary group-hover:text-white" />
              <span className="text-sm font-medium text-foreground group-hover:text-white">
                {search}
              </span>
            </motion.a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Can't find what you're looking for?
          </p>
          <a
            href="/search"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
          >
            <TrendingUp className="w-4 h-4" />
            Explore All Venues
          </a>
        </div>
      </div>
    </section>
  );
};

export default PopularSearches;
