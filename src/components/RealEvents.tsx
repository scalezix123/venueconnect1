import { Calendar, MapPin, Users } from "lucide-react";
import { motion } from "framer-motion";

const events = [
  {
    title: "Priya & Rahul's Wedding",
    venue: "The Grand Rajwada, Ahmedabad",
    date: "15th March 2025",
    guests: "800 Guests",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    type: "Wedding"
  },
  {
    title: "Tech Summit 2025",
    venue: "Sapphire Convention, Rajkot",
    date: "22nd February 2025",
    guests: "500 Guests",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    type: "Corporate"
  },
  {
    title: "Aarav's 5th Birthday",
    venue: "Royal Greens Farmhouse, Surat",
    date: "10th January 2025",
    guests: "150 Guests",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
    type: "Birthday"
  },
  {
    title: "Meera's Engagement",
    venue: "Lakshmi Vilas Banquet, Vadodara",
    date: "5th December 2024",
    guests: "300 Guests",
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80",
    type: "Engagement"
  },
];

const RealEvents = () => {
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
              Get Inspired
            </span>
            <div className="h-px w-12 bg-primary/30" />
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Real <em className="italic text-primary">Events</em> Organized
          </h2>
          
          <p className="text-[15px] text-muted-foreground max-w-xl mx-auto">
            Discover some real events organized through our platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative h-64 rounded-xl overflow-hidden mb-4">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 rounded-full bg-primary text-white text-xs font-semibold">
                    {event.type}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-display text-xl font-semibold text-white mb-2">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-white/80 text-xs">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{event.venue}</span>
                    </div>
                    <div className="flex items-center gap-4 text-white/80 text-xs">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        <span>{event.guests}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RealEvents;
