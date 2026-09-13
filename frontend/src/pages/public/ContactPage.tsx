import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Phone,
  Clock,
  MessageSquare,
  Flame,
  Send,
  HelpCircle,
  ChevronDown,
  ShieldCheck,
} from 'lucide-react';
import { toast } from 'sonner';

/**
 * ContactPage
 * Premium Devotee & Purohit Support Desk.
 * 100% Flexbox, pure solid white canvas, zero grids, zero gradients.
 */
export const ContactPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [ritualType, setRitualType] = useState('Griha Pravesh');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Accordion FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneNumber.trim()) {
      toast.error('Please provide your name and mobile number.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('Thank you! Our Purohit Support Desk will call you within 30 minutes.');
      setFullName('');
      setPhoneNumber('');
      setMessage('');
    }, 800);
  };



  const faqs = [
    {
      q: 'How are Purohits matched with our family tradition and language?',
      a: 'During booking, you specify your mother tongue (e.g., Bengali, Hindi, Telugu, Tamil, Marathi, Odia, Gujarati) and Gotra/Sampradaya. We assign verified Purohits fluent in your specific traditions.',
    },
    {
      q: 'How does Dakshina payment work?',
      a: 'PujaCircle charges zero platform commission on the priest dakshina. You hand over the recommended dakshina directly in cash or UPI to the Purohit upon completion of the ceremony.',
    },
    {
      q: 'Can the Purohit provide the complete Samagri?',
      a: 'Yes! You can choose between "Devotee Arranges Samagri" (we provide an itemized checklist) or "Purohit Brings Samagri" where the priest brings all sacred herbs, woods, gangajal, and havan items.',
    },
    {
      q: 'What if we need an urgent ceremony within 24 hours?',
      a: 'Please call our Dedicated Urgent Muhurat Hotline (+91 98765 43210). Our city coordinators immediately dispatch verified Purohits on standby.',
    },
  ];

  return (
    <div className="w-full text-stone-900">
      {/* 1. Hero Section */}
      <section className="w-full pt-8 sm:pt-14 pb-10 sm:pb-12 px-4 border-b border-stone-200">
        <div className="container max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-700 text-white text-xs font-semibold tracking-wide uppercase shadow-sm">
            <Flame className="h-3.5 w-3.5 text-amber-300 fill-amber-300 animate-pulse" />
            <span>Devotee Support & Inquiries</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif text-stone-900 tracking-tight">
            Connect with Our Sacred Desk
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-stone-600 max-w-xl mx-auto leading-relaxed">
            Need guidance regarding an upcoming auspicious muhurat, ritual preparations, or priest onboarding? We are here to assist your family.
          </p>
        </div>
      </section>

      {/* 2. Urgent Muhurat Banner */}
      <section className="w-full px-4 pt-6">
        <div className="container max-w-5xl mx-auto">
          <div className="rounded-2xl border-2 border-amber-400 bg-[#780016] text-white p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="h-10 w-10 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-bold shrink-0">
                <Flame className="h-5 w-5 fill-stone-950" />
              </div>
              <div>
                <div className="text-sm sm:text-base font-bold font-serif text-amber-200">
                  Urgent Ceremony or Immediate Muhurat Assistance?
                </div>
                <div className="text-xs text-amber-100">
                  For same-day Antim Sanskar, Shraddh, or unexpected Griha Shanti, call our emergency priority desk directly.
                </div>
              </div>
            </div>

            <a
              href="tel:+919876543210"
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-stone-950 font-bold text-xs shrink-0 flex items-center gap-2 shadow-sm puja-btn-tap"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>+91 98765 43210 (24/7)</span>
            </a>
          </div>
        </div>
      </section>

      {/* 3. Interactive Two-Column Support Section (Flexbox Only, Zero Grids) */}
      <section className="w-full py-10 sm:py-14 px-4 border-b border-stone-200">
        <div className="container max-w-5xl mx-auto flex flex-col lg:flex-row items-start gap-8">
          {/* Left Column: Interactive Ritual Enquiry Form */}
          <div className="w-full lg:w-7/12 rounded-2xl border-2 border-stone-200 bg-white p-6 sm:p-8 shadow-xs space-y-5">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900">
                Send a Ritual Inquiry
              </h2>
              <p className="text-xs text-stone-600">
                Fill out the details below and a Vedic coordinator will call you to confirm your muhurat and priest requirements.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <div className="w-full sm:w-1/2 space-y-1.5">
                  <Label className="text-xs font-semibold text-stone-700">Full Name *</Label>
                  <Input
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ramesh Chandra Sharma"
                    className="text-xs h-10 border-stone-300 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>

                <div className="w-full sm:w-1/2 space-y-1.5">
                  <Label className="text-xs font-semibold text-stone-700">Mobile Number (+91) *</Label>
                  <Input
                    required
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="text-xs h-10 border-stone-300 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <div className="w-full sm:w-1/2 space-y-1.5">
                  <Label className="text-xs font-semibold text-stone-700">Your City</Label>
                  <Input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Varanasi, Kolkata, Bengaluru"
                    className="text-xs h-10 border-stone-300 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>

                <div className="w-full sm:w-1/2 space-y-1.5">
                  <Label className="text-xs font-semibold text-stone-700">Sacred Ritual</Label>
                  <select
                    value={ritualType}
                    onChange={(e) => setRitualType(e.target.value)}
                    className="w-full h-10 rounded-md border border-stone-300 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="Griha Pravesh">Griha Pravesh (House Warming)</option>
                    <option value="Satyanarayan Katha">Satyanarayan Vrat Katha</option>
                    <option value="Rudrabhishek">Maha Rudrabhishek</option>
                    <option value="Ganesh Puja">Ganesh Puja & Havan</option>
                    <option value="Navagraha Shanti">Navagraha Shanti Havan</option>
                    <option value="Vivah Sanskar">Vivah Sanskar (Marriage)</option>
                    <option value="Namkaran / Mundan">Namkaran / Mundan Sanskar</option>
                    <option value="Other Vedic Ceremony">Other Vedic Ceremony</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-stone-700">Ceremony Details or Questions</Label>
                <Textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Mention preferred muhurat dates, gotra, mother tongue preference, or any specific samagri requirements..."
                  className="text-xs border-stone-300 focus:border-amber-500 focus:ring-amber-500"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-700 hover:bg-red-800 text-white font-bold text-xs h-11 shadow-sm gap-2 puja-btn-tap"
              >
                {isSubmitting ? 'Submitting...' : 'Request Priest Consultation Call'}
                <Send className="h-3.5 w-3.5" />
              </Button>
            </form>
          </div>

          {/* Right Column: Direct Touchpoint Cards */}
          <div className="w-full lg:w-5/12 space-y-4">
            <h3 className="text-lg font-bold font-serif text-stone-900">
              Direct Contact Desks
            </h3>

            {/* Helpline */}
            <Card className="border-2 border-stone-200 bg-white rounded-2xl shadow-xs puja-card-lift">
              <CardContent className="p-4 sm:p-5 flex items-start gap-3.5">
                <div className="h-10 w-10 rounded-xl bg-red-700 text-white flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-stone-900 font-serif">Devotee Booking Helpline</h4>
                  <p className="text-xs text-red-700 font-mono font-bold">+91 98765 43210</p>
                  <p className="text-[11px] text-stone-600 leading-snug">Available 6:00 AM – 9:00 PM IST daily</p>
                </div>
              </CardContent>
            </Card>

            {/* WhatsApp */}
            <Card className="border-2 border-stone-200 bg-white rounded-2xl shadow-xs puja-card-lift">
              <CardContent className="p-4 sm:p-5 flex items-start gap-3.5">
                <div className="h-10 w-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-stone-900 font-serif">WhatsApp Muhurat Desk</h4>
                  <p className="text-xs text-emerald-700 font-mono font-bold">+91 98765 43211</p>
                  <p className="text-[11px] text-stone-600 leading-snug">Quick text assistance for samagri lists & muhurat queries</p>
                </div>
              </CardContent>
            </Card>

            {/* Priest Onboarding */}
            <Card className="border-2 border-stone-200 bg-white rounded-2xl shadow-xs puja-card-lift">
              <CardContent className="p-4 sm:p-5 flex items-start gap-3.5">
                <div className="h-10 w-10 rounded-xl bg-amber-500 text-stone-900 flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-stone-900 font-serif">Purohit Onboarding & Verification</h4>
                  <p className="text-xs text-amber-800 font-bold">purohits@pujacircle.demo</p>
                  <p className="text-[11px] text-stone-600 leading-snug">Gurukul certifications and priest onboarding inquiries</p>
                </div>
              </CardContent>
            </Card>

            {/* Operating Hours Card */}
            <Card className="border-2 border-stone-200 bg-white rounded-2xl shadow-xs">
              <CardContent className="p-4 sm:p-5 flex items-start gap-3.5">
                <div className="h-10 w-10 rounded-xl bg-stone-900 text-white flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-stone-900 font-serif">Operational Timings</h4>
                  <p className="text-xs text-stone-900 font-semibold">Mon – Sun: 6:00 AM – 9:00 PM IST</p>
                  <p className="text-[11px] text-stone-600 leading-snug">Aligned with sacred morning Brahma Muhurat & Sandhya Kaal</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>



      {/* 5. Frequently Asked Questions (Accordion) */}
      <section className="w-full py-12 sm:py-16 px-4">
        <div className="container max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold">
              <HelpCircle className="h-3.5 w-3.5 text-red-700" />
              <span>Common Inquiries</span>
            </div>
            <h3 className="text-2xl font-bold font-serif text-stone-900">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((f, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border-2 border-stone-200 bg-white overflow-hidden transition-all shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-bold text-stone-900 font-serif hover:bg-stone-50 transition-colors"
                  >
                    <span>{f.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 transition-transform ${
                        isOpen ? 'transform rotate-180 text-red-700' : 'text-stone-400'
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-4 pt-1 text-xs text-stone-600 leading-relaxed border-t border-stone-100">
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
