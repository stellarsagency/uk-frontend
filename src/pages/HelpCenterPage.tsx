import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Phone,
  MessageSquare,
  Mail,
  HelpCircle,
  Globe,
} from 'lucide-react';
import { faqData } from '@/data/mockData';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/Accordion';
import { cn } from '@/lib/utils';

const categories = ['All', ...Array.from(new Set(faqData.map((faq) => faq.category)))];

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredFaqs = useMemo(() => {
    return faqData.filter((faq) => {
      const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
      const matchesSearch =
        !searchQuery ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const faqsByCategory = useMemo(() => {
    const grouped: Record<string, typeof filteredFaqs> = {};
    filteredFaqs.forEach((faq) => {
      if (!grouped[faq.category]) grouped[faq.category] = [];
      grouped[faq.category].push(faq);
    });
    return grouped;
  }, [filteredFaqs]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="min-h-screen bg-[#faf5ed]"
    >
      <section className="relative overflow-hidden bg-[#002f17] py-20 md:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-[#ff467c] blur-3xl" />
          <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-[#ff467c] blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
            <HelpCircle className="h-8 w-8 text-white" />
          </div>
          <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">Help Centre</h1>
          <p className="mt-4 text-white/70 text-lg">
            Find answers to common questions or get in touch with our team.
          </p>
          <div className="mt-10 max-w-lg mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#818085]" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-14 w-full rounded-lg border-0 bg-white pl-12 pr-4 text-sm shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff467c]/50"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-10 md:py-14">
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                'rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-300',
                activeCategory === category
                  ? 'bg-[#ff467c] text-white shadow-md'
                  : 'bg-white text-[#555] border border-[#e9e3da] hover:border-[#ff467c]/30 hover:text-[#ff467c] hover:bg-[#ffd4e4]/30'
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="space-y-8">
          {Object.entries(faqsByCategory).map(([category, faqs]) => (
            <div key={category}>
              <h2 className="mb-4 text-lg font-bold text-[#002f17]">{category}</h2>
              <Accordion type="multiple">
                {faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger value={faq.id}>{faq.question}</AccordionTrigger>
                    <AccordionContent value={faq.id}>
                      <p className="leading-relaxed">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          {filteredFaqs.length === 0 && (
            <div className="py-14 text-center">
              <Search className="mx-auto h-12 w-12 text-[#e9e3da]" />
              <p className="mt-4 text-lg font-bold text-[#002f17]">No results found</p>
              <p className="mt-1 text-sm text-[#555]">
                Try a different search term or browse all categories.
              </p>
              <Button
                variant="outline"
                className="mt-5 rounded-lg font-semibold"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        <section className="mt-20">
          <h2 className="mb-8 text-center font-heading text-3xl font-bold text-[#002f17]">Still Need Help?</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="text-center transition-all duration-300 rounded-lg bg-white border-[#e9e3da] shadow-sm">
              <CardContent className="p-7">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-[#ffd4e4]">
                  <Phone className="h-6 w-6 text-[#ff467c]" />
                </div>
                <h3 className="font-bold text-[#002f17]">Call Us</h3>
                <p className="mt-1 text-sm font-semibold text-[#ff467c]">0800 123 4567</p>
                <p className="text-xs text-[#818085] mt-1">Mon-Sun, 8am-10pm</p>
                <p className="text-xs text-[#818085]">Free from UK landlines</p>
              </CardContent>
            </Card>

            <Card className="text-center transition-all duration-300 rounded-lg bg-white border-[#e9e3da] shadow-sm">
              <CardContent className="p-7">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-green-50">
                  <MessageSquare className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-bold text-[#002f17]">Live Chat</h3>
                <p className="mt-1 text-sm text-[#555]">Chat with our team</p>
                <p className="text-xs text-[#818085] mt-1">Available 24/7</p>
              </CardContent>
            </Card>

            <Card className="text-center transition-all duration-300 rounded-lg bg-white border-[#e9e3da] shadow-sm">
              <CardContent className="p-7">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-purple-50">
                  <Mail className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-bold text-[#002f17]">Email</h3>
                <p className="mt-1 text-sm text-[#555]">support@firstchoice.co.uk</p>
                <p className="text-xs text-[#818085] mt-1">Response within 24h</p>
              </CardContent>
            </Card>

            <Card className="text-center transition-all duration-300 rounded-lg bg-white border-[#e9e3da] shadow-sm">
              <CardContent className="p-7">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-[#ffd4e4]">
                  <Globe className="h-6 w-6 text-[#ff467c]" />
                </div>
                <h3 className="font-bold text-[#002f17]">Social Media</h3>
                <p className="mt-1 text-sm text-[#555]">Follow us for updates</p>
                <p className="text-xs text-[#818085] mt-1">Quick responses</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
