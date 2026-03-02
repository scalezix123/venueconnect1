import { Camera, Utensils, Music, Flower2, Cake, Car, Shirt, Gift } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  { icon: Camera, name: "Photographers", count: "2,400+", color: "bg-blue-50 text-blue-600" },
  { icon: Utensils, name: "Caterers", count: "1,800+", color: "bg-orange-50 text-orange-600" },
  { icon: Music, name: "DJs & Music", count: "900+", color: "bg-purple-50 text-purple-600" },
  { icon: Flower2, name: "Decorators", count: "1,500+", color: "bg-pink-50 text-pink-600" },
  { icon: Cake, name: "Bakers", count: "650+", color: "bg-yellow-50 text-yellow-600" },
  { icon: Car, name: "Transport", count: "420+", color: "bg-green-50 text-green-600" },
  { icon: Shirt, name: "Makeup Artists", count: "1,200+", color: "bg-red-50 text-red-600" },
  { icon: Gift, name: "Gift Services", count: "380+", color: "bg-indigo-50 text-indigo-600" },
];

const VendorCategories = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-primary/5">
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
              Complete Event Solutions
            </span>
            <div className="h-px w-12 bg-primary/30" />
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Browse <em className="italic text-primary">Vendors</em> & Services
          </h2>
          
          <p className="text-[15px] text-muted-foreground max-w-xl mx-auto">
            Connect with verified vendors for every aspect of your event
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, i) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group bg-white rounded-xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-full ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7" />
                </div>
                
                <h3 className="font-semibold text-foreground text-base mb-1 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
                
                <p className="text-sm text-muted-foreground">
                  {category.count} vendors
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VendorCategories;
