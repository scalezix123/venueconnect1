import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const occasions = [
  { icon: "💑", name: "Wedding" },
  { icon: "🎂", name: "Birthday" },
  { icon: "💍", name: "Engagement" },
  { icon: "🏊", name: "Pool Party" },
  { icon: "🍸", name: "Cocktail Party" },
  { icon: "👔", name: "Corporate Party" },
  { icon: "🎉", name: "Kitty Party" },
  { icon: "🏛️", name: "Banquet Hall" },
  { icon: "🎪", name: "Conference" },
  { icon: "🎭", name: "Reception" },
];

const OccasionSlider = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="bg-white py-16">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-primary/30" />
            <span className="text-[10.5px] font-semibold tracking-[3px] uppercase text-primary">
              Find Your Event
            </span>
            <div className="h-px w-12 bg-primary/30" />
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-3">
            What's the <span className="text-primary">Occasion?</span>
          </h2>
          
          <p className="text-[15px] text-muted-foreground max-w-xl mx-auto">
            Discover the perfect venue for every celebration across Gujarat
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-border flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Scrollable Cards */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {occasions.map((occasion, index) => (
              <div
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`flex-shrink-0 w-[130px] group cursor-pointer transition-all duration-300 ${
                  selectedIndex === index ? 'scale-105' : ''
                }`}
              >
                <div className={`bg-white rounded-2xl p-5 transition-all duration-300 h-[150px] flex flex-col items-center justify-center ${
                  selectedIndex === index 
                    ? 'border-2 border-primary shadow-lg' 
                    : 'border-2 border-border hover:border-primary/50 hover:shadow-md'
                }`}>
                  {/* Icon */}
                  <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {occasion.icon}
                  </div>
                  
                  {/* Name */}
                  <div className={`text-sm font-semibold text-center transition-colors ${
                    selectedIndex === index ? 'text-primary' : 'text-foreground group-hover:text-primary'
                  }`}>
                    {occasion.name}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            <div className="w-8 h-1 rounded-full bg-primary" />
            <div className="w-1 h-1 rounded-full bg-border" />
            <div className="w-1 h-1 rounded-full bg-border" />
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default OccasionSlider;
