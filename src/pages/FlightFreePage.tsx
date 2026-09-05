import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Train,
  Ship,
  Leaf,
  MapPin,
  ArrowRight,
  Star,
  Clock,
  Search,
  ChevronDown,
  Sprout,
  Earth,
} from 'lucide-react';
import { allHolidays } from '@/data/mockData';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/Accordion';

const howItWorks = [
  {
    icon: Search,
    title: 'Choose Your Destination',
    description: 'Browse our handpicked flight-free holidays across Europe. From Paris to the Norwegian fjords.',
  },
  {
    icon: Train,
    title: 'Book Your Journey',
    description: 'Reserve your Eurostar, train, or ferry tickets alongside your hotel. Everything in one simple booking.',
  },
  {
    icon: Leaf,
    title: 'Travel Sustainably',
    description: 'Enjoy a greener journey with up to 90% less carbon emissions compared to flying.',
  },
];

const popularRoutes = [
  {
    from: 'London',
    to: 'Paris',
    method: 'Eurostar',
    duration: '2h 16m',
    price: 89,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop',
  },
  {
    from: 'London',
    to: 'Amsterdam',
    method: 'Eurostar + Thalys',
    duration: '4h',
    price: 120,
    image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=600&h=400&fit=crop',
  },
  {
    from: 'Dover',
    to: 'Bruges',
    method: 'Ferry + Train',
    duration: '5h 30m',
    price: 75,
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&h=400&fit=crop',
  },
];

const faqs = [
  {
    q: 'How long does the Eurostar take to reach Paris?',
    a: 'The Eurostar from London St Pancras to Paris Gare du Nord takes approximately 2 hours and 16 minutes. It is a comfortable and scenic journey through the Channel Tunnel.',
  },
  {
    q: 'Is travel by train really more sustainable?',
    a: 'Yes! Train travel produces up to 90% fewer carbon emissions per passenger compared to flying. By choosing flight-free travel, you are making a significant positive impact on the environment.',
  },
  {
    q: 'Can I bring luggage on the train/ferry?',
    a: 'Absolutely. Eurostar allows up to 2 bags (85cm x 55cm x 35cm) plus 1 hand luggage per person, free of charge. Ferry operators typically have generous luggage allowances too.',
  },
  {
    q: 'Are flight-free holidays more expensive?',
    a: 'Not necessarily. When you factor in the cost of airport transfers, baggage fees, and the comfort of city-centre to city-centre travel, train and ferry holidays can be excellent value.',
  },
];

export default function FlightFreePage() {
  const flightFreeHolidays = allHolidays.filter((h) => !h.flightIncluded).slice(0, 4);

  const fallbackHolidays = allHolidays.slice(0, 4);
  const displayHolidays = flightFreeHolidays.length > 0 ? flightFreeHolidays : fallbackHolidays;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="min-h-screen bg-[#faf5ed]"
    >
      <section className="relative overflow-hidden bg-[#002f17] py-24 md:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-[#ff467c] blur-3xl" />
          <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-white blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm border border-white/20">
              <Sprout className="h-4 w-4" />
              Sustainable Travel
            </div>
            <h1 className="font-heading text-5xl font-bold text-white md:text-6xl lg:text-7xl">
              Explore Europe by
              <br />
              Train & Ferry
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-lg text-white/70 leading-relaxed">
              Discover breathtaking destinations without taking off. Our flight-free holidays let you
              enjoy scenic journeys through the heart of Europe while reducing your carbon footprint.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link to="/search">
                <Button size="lg" className="bg-[#ff467c] text-white hover:bg-[#e63d6e] shadow-lg rounded-lg font-semibold tracking-wide">
                  <Search className="mr-2 h-5 w-5" />
                  Browse Holidays
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 rounded-lg font-semibold">
                  How It Works
                  <ChevronDown className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
          </motion.div>

          <div className="mt-14 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { icon: Train, label: 'Eurostar' },
              { icon: Ship, label: 'Ferry' },
              { icon: Leaf, label: 'Eco-Friendly' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm border border-white/10">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <p className="text-sm font-semibold text-white/90">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-12 text-center font-heading text-3xl font-bold text-[#002f17] md:text-4xl">How It Works</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {howItWorks.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <Card className="h-full text-center transition-all duration-300 rounded-lg bg-white border-[#e9e3da] shadow-sm">
                  <CardContent className="p-8">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-lg bg-[#ffd4e4]">
                      <step.icon className="h-7 w-7 text-[#ff467c]" />
                    </div>
                    <div className="mb-2 text-sm font-bold text-[#ff467c] uppercase tracking-widest">Step {i + 1}</div>
                    <h3 className="mb-3 font-heading text-lg font-bold text-[#002f17]">{step.title}</h3>
                    <p className="text-sm text-[#555] leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-white">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-4 text-center font-heading text-3xl font-bold text-[#002f17] md:text-4xl">
            Featured Flight-Free Packages
          </h2>
          <p className="mb-12 text-center text-[#555]">
            Handpicked holidays you can reach without flying.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {displayHolidays.map((holiday, i) => (
              <motion.div
                key={holiday.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link
                  to={`/property/${holiday.id}`}
                  className="group block overflow-hidden rounded-lg border border-[#e9e3da] bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={holiday.image}
                      alt={holiday.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <Badge variant="destructive" className="absolute left-3 top-3 text-[10px] rounded-full">
                      No Flight Required
                    </Badge>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-[#002f17] group-hover:text-[#ff467c] transition-colors">
                      {holiday.name}
                    </h3>
                    <div className="mt-1.5 flex items-center gap-1 text-sm text-[#555]">
                      <MapPin className="h-3.5 w-3.5" />
                      {holiday.destination}, {holiday.country}
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-lg font-bold text-[#ff467c]">
                        {formatPrice(holiday.price)}
                        <span className="text-xs font-normal text-[#818085]"> pp</span>
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-semibold">{holiday.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-12 text-center font-heading text-3xl font-bold text-[#002f17] md:text-4xl">Popular Routes</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {popularRoutes.map((route, i) => (
              <motion.div
                key={route.to}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group overflow-hidden rounded-lg border border-[#e9e3da] bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={route.image}
                    alt={route.to}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-white font-bold text-lg">
                      <span>{route.from}</span>
                      <ArrowRight className="h-4 w-4" />
                      <span>{route.to}</span>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm text-[#555]">
                      <span className="flex items-center gap-1">
                        <Train className="h-4 w-4 text-[#ff467c]" />
                        {route.method}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {route.duration}
                      </span>
                    </div>
                    <span className="text-lg font-bold text-[#ff467c]">
                      From {formatPrice(route.price)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-white">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-10 text-center font-heading text-2xl font-bold text-[#002f17] md:text-3xl">
            Frequently Asked Questions
          </h2>
          <Accordion type="single">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger value={`faq-${i}`}>{faq.q}</AccordionTrigger>
                <AccordionContent value={`faq-${i}`}>
                  <p className="leading-relaxed">{faq.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-[#002f17] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-[#ff467c] blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Earth className="mx-auto mb-5 h-12 w-12 text-white/80" />
            <h2 className="font-heading text-4xl font-bold text-white">Ready to Travel Sustainably?</h2>
            <p className="mt-4 text-white/70 text-lg">
              Book your flight-free holiday today and explore Europe the greener way.
            </p>
            <Link to="/search" className="mt-10 inline-block">
              <Button size="lg" className="bg-[#ff467c] text-white hover:bg-[#e63d6e] shadow-lg rounded-lg font-semibold tracking-wide">
                Explore Holidays
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
