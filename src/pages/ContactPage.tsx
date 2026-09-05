import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  Globe,
  Camera,
  MessageCircle,
  Headphones,
  AlertTriangle,
} from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone must be at least 10 digits').optional().or(z.literal('')),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const subjectOptions = [
  { value: '', label: 'Select a subject' },
  { value: 'general', label: 'General Enquiry' },
  { value: 'booking', label: 'Booking Question' },
  { value: 'amendment', label: 'Amend Existing Booking' },
  { value: 'complaint', label: 'Complaint' },
  { value: 'feedback', label: 'Feedback' },
  { value: 'other', label: 'Other' },
];

const offices = [
  {
    city: 'London',
    address: '123 Travel House, Victoria Street, London SW1V 1QT',
    phone: '020 7946 0958',
    hours: 'Mon-Fri: 9am-6pm, Sat: 10am-4pm',
  },
  {
    city: 'Manchester',
    address: '45 Deansgate, Manchester M3 1BA',
    phone: '0161 537 4000',
    hours: 'Mon-Fri: 9am-5:30pm, Sat: 10am-3pm',
  },
];

const socialLinks = [
  { name: 'Facebook', icon: Globe, href: '#' },
  { name: 'Instagram', icon: Camera, href: '#' },
  { name: 'Twitter', icon: MessageCircle, href: '#' },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormData) => {
    console.log('Contact form submitted:', data);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

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
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
            <Headphones className="h-8 w-8 text-white" />
          </div>
          <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">Contact Us</h1>
          <p className="mt-4 text-white/70 text-lg">
            We would love to hear from you. Get in touch with our friendly team.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="shadow-lg rounded-lg bg-white border-[#e9e3da]">
              <CardContent className="p-8 md:p-10">
                <h2 className="mb-7 font-heading text-2xl font-bold text-[#002f17]">Send Us a Message</h2>

                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-7 flex items-center gap-3 rounded-lg bg-green-50 border border-green-100 p-4 text-green-800"
                  >
                    <CheckCircle className="h-5 w-5 shrink-0 text-green-600" />
                    <p className="text-sm font-medium">
                      Thank you for your message! We will get back to you within 24 hours.
                    </p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                      label="Full Name"
                      placeholder="John Smith"
                      error={errors.name?.message}
                      {...register('name')}
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      placeholder="john@example.com"
                      error={errors.email?.message}
                      {...register('email')}
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                      label="Phone Number (optional)"
                      type="tel"
                      placeholder="07700 900000"
                      error={errors.phone?.message}
                      {...register('phone')}
                    />
                    <Select
                      label="Subject"
                      options={subjectOptions}
                      error={errors.subject?.message}
                      {...register('subject')}
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      placeholder="How can we help you?"
                      className={cn(
                        'flex w-full rounded-lg border bg-[#faf5ed] border-[#e9e3da] px-4 py-3 text-sm transition-colors',
                        'placeholder:text-[#818085] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff467c] focus-visible:ring-offset-2',
                        errors.message ? 'border-error' : 'border-[#e9e3da]'
                      )}
                      {...register('message')}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-error">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="group flex items-center justify-center gap-2 rounded-lg bg-[#ff467c] px-6 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-[#e63d6e] shadow-md hover:shadow-lg"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-5">
            <Card className="transition-all duration-300 rounded-lg bg-white border-[#e9e3da] shadow-sm">
              <CardContent className="p-7">
                <h3 className="mb-5 font-heading text-lg font-bold text-[#002f17]">Our Offices</h3>
                <div className="space-y-6">
                  {offices.map((office) => (
                    <div key={office.city} className="space-y-2">
                      <h4 className="font-bold text-[#002f17]">{office.city}</h4>
                      <div className="flex items-start gap-2 text-sm text-[#555]">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#ff467c]" />
                        <span>{office.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#555]">
                        <Phone className="h-4 w-4 shrink-0 text-[#ff467c]" />
                        <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="hover:text-[#ff467c] font-medium">
                          {office.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#555]">
                        <Clock className="h-4 w-4 shrink-0 text-[#ff467c]" />
                        <span>{office.hours}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50/80 rounded-lg">
              <CardContent className="p-7">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <h3 className="font-heading text-lg font-bold text-red-800">Emergency Contact</h3>
                </div>
                <p className="text-sm text-red-700 mb-4">
                  For urgent assistance while travelling, call our 24/7 emergency line:
                </p>
                <a
                  href="tel:+447700900123"
                  className="inline-flex items-center gap-2 text-lg font-bold text-red-800 hover:underline"
                >
                  <Phone className="h-5 w-5" />
                  +44 7700 900 123
                </a>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 rounded-lg bg-white border-[#e9e3da] shadow-sm">
              <CardContent className="p-7">
                <h3 className="mb-5 font-heading text-lg font-bold text-[#002f17]">Follow Us</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#faf5ed] text-[#555] transition-all duration-300 hover:bg-[#ff467c] hover:text-white shadow-sm"
                      aria-label={social.name}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="transition-all duration-300 rounded-lg bg-white border-[#e9e3da] shadow-sm">
              <CardContent className="p-7">
                <h3 className="mb-4 font-heading text-lg font-bold text-[#002f17]">General Enquiries</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-[#555]">
                    <Mail className="h-4 w-4 text-[#ff467c]" />
                    <a href="mailto:support@firstchoice.co.uk" className="hover:text-[#ff467c] font-medium">
                      support@firstchoice.co.uk
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-[#555]">
                    <Phone className="h-4 w-4 text-[#ff467c]" />
                    <a href="tel:08001234567" className="hover:text-[#ff467c] font-medium">
                      0800 123 4567
                    </a>
                  </div>
                  <p className="text-xs text-[#818085]">Free from UK landlines</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
