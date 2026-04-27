import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { ArrowUpRight, BarChart3, Globe2, Mail, Megaphone, MonitorPlay, Phone, Users, GraduationCap, ChevronLeft, ChevronRight, CheckCircle2, Target, Menu, X } from "lucide-react";

const CATEGORIES = ['All', 'E-Commerce', 'Lead Generation', 'Brand Awareness', 'Brand & Sales', 'Freelance'];

const CASE_STUDIES = [
  {
    category: 'E-Commerce',
    client: 'Anythingatsupun.lk',
    desc: 'Full-funnel Meta advertising strategy built from scratch — covering cold audience prospecting, warm retargeting, and cart abandonment recovery. Implemented Facebook Pixel with Conversions API for server-side tracking, launched dynamic product ads, and continuously optimised creatives for maximum conversion efficiency. Resulted in a significant uplift in revenue while reducing cost per acquisition.',
    metrics: [{ val: '3.2×', key: 'ROAS' }, { val: '+64%', key: 'Revenue' }, { val: '-38%', key: 'CPA' }]
  },
  {
    category: 'Brand Awareness',
    client: 'Supun Group of Companies',
    desc: 'Developed and executed a multi-platform brand awareness strategy for a diversified conglomerate. Utilised Meta\'s reach and frequency buying model to build consistent brand recall among the target demographic. Managed cross-platform content strategy and audience segmentation to maximise brand visibility while keeping CPM efficient.',
    metrics: [{ val: '+120%', key: 'Reach' }, { val: '+85%', key: 'Engagement' }]
  },
  {
    category: 'Lead Generation',
    client: 'International University Hub',
    desc: 'Designed a precision lead generation campaign targeting prospective international university students. Deployed Meta Lead Ads with multi-step form optimisation and advanced audience segmentation based on interest, age, and education level. Integrated API-based lead tracking to ensure accurate attribution and enable rapid follow-up by the sales team.',
    metrics: [{ val: '-52%', key: 'CPL' }, { val: '4×', key: 'Leads' }]
  },
  {
    category: 'Brand & Sales',
    client: 'Jayarathna Group',
    desc: 'Ran a dual-objective campaign combining brand awareness with direct sales conversion for this diversified business group. Leveraged custom audiences built from website visitors and CRM data, combined with lookalike audience expansion. Used value-based optimisation to target high-intent customers, significantly boosting both brand lift and direct sales.',
    metrics: [{ val: '+95%', key: 'Sales' }, { val: '2.8×', key: 'ROAS' }]
  },
  {
    category: 'E-Commerce',
    client: 'Apex.lk',
    desc: 'End-to-end e-commerce performance setup including full Conversions API implementation, catalogue creation, and dynamic ad deployment. Ran catalogue sales campaigns with personalised product recommendations and retargeting flows. Achieved scalable revenue growth with precise attribution — reducing wasted spend and maximising ROAS.',
    metrics: [{ val: '4.1×', key: 'ROAS' }, { val: '+78%', key: 'Orders' }]
  },
  {
    category: 'Freelance',
    client: 'WeGotDigital',
    desc: 'Managed digital marketing for multiple client accounts across diverse verticals as a freelance specialist. Delivered end-to-end social media strategy, paid advertising management, and content planning. Maintained consistent growth metrics across all accounts while balancing multiple brand voices and objectives simultaneously.',
    metrics: [{ val: '5+', key: 'Clients' }, { val: '+110%', key: 'Avg. Growth' }]
  }
];

const ARTWORKS = [
  'ChamodRavihara-digital/ChamodRaviharaWeb/src/assets/Public/POST1.jpg', 
  'https://raw.githubusercontent.com/ChamodRavihara-digital/ChamodRaviharaWeb/main/Public/POST2.jpg', 
  'https://raw.githubusercontent.com/ChamodRavihara-digital/ChamodRaviharaWeb/main/Public/POST3.jpg', 
  'https://raw.githubusercontent.com/ChamodRavihara-digital/ChamodRaviharaWeb/main/Public/POST4.jpg',
  'https://raw.githubusercontent.com/ChamodRavihara-digital/ChamodRaviharaWeb/main/Public/POST5.jpg', 
  'https://raw.githubusercontent.com/ChamodRavihara-digital/ChamodRaviharaWeb/main/Public/POST6.jpg', 
  'https://raw.githubusercontent.com/ChamodRavihara-digital/ChamodRaviharaWeb/main/Public/POST7.jpg'
];

const ADS = [
  { item: 'https://raw.githubusercontent.com/ChamodRavihara-digital/ChamodRaviharaWeb/main/Public/1_HighPerformanceMetaConversionAds.jpg', desc: 'High-Performance Meta Conversion Ads focused on maximizing ROAS.' },
  { item: 'https://raw.githubusercontent.com/ChamodRavihara-digital/ChamodRaviharaWeb/main/Public/2_EcommerceBasedFacebookSalesAds.jpg', desc: 'E-Commerce driven Facebook Sales campaigns for scalable growth.' },
  { item: 'https://raw.githubusercontent.com/ChamodRavihara-digital/ChamodRaviharaWeb/main/Public/3_HighPerformanceMetaLeadAds.jpg', desc: 'Optimized Meta Lead Ads designed for high-intent customer acquisition.' },
  { item: 'https://raw.githubusercontent.com/ChamodRavihara-digital/ChamodRaviharaWeb/main/Public/4_EcommerceBasedFacebookSalesAds.jpg', desc: 'Dynamic Product Ads and retargeting flows for E-commerce brands.' },
  { item: 'https://raw.githubusercontent.com/ChamodRavihara-digital/ChamodRaviharaWeb/main/Public/5_GA4EcommerceTrackingWordpress.jpg', desc: 'Advanced GA4 E-Commerce tracking implementation for WordPress/WooCommerce.' },
  { item: 'https://raw.githubusercontent.com/ChamodRavihara-digital/ChamodRaviharaWeb/main/Public/6_FacebookPixelConversionAPI.jpg', desc: 'Server-side tracking setup using Facebook Pixel & Conversions API.' },
  { item: 'https://raw.githubusercontent.com/ChamodRavihara-digital/ChamodRaviharaWeb/main/Public/7_metapixelandconversionapi.jpg', desc: 'Seamless Meta Pixel integration to ensure accurate data attribution.' },
  { item: 'https://raw.githubusercontent.com/ChamodRavihara-digital/ChamodRaviharaWeb/main/Public/8_FacebookAdsLeadGeneration.jpg', desc: 'End-to-end Facebook Ads strategy focused on B2B and B2C Lead Generation.' }
];

export type PageType = 'home' | 'web-solutions' | 'pricing';

export default function App() {
  const [page, setPage] = useState<PageType>('home');

  return (
    <div className="relative min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar page={page} setPage={setPage} />
      
      {page === 'home' && (
        <>
          <HeroSection setPage={setPage} />
          <main className="px-6 md:px-12 max-w-6xl mx-auto pb-24 space-y-16 md:space-y-24">
            <CredentialsSection />
            <AboutSection />
            <ServicesSection />
            <CaseStudiesSection />
            <ContactSection />
          </main>
        </>
      )}
      
      {page === 'web-solutions' && (
        <main className="px-6 md:px-12 max-w-6xl mx-auto pt-32 pb-24 min-h-[85vh] space-y-16 md:space-y-24">
          <WebSolutions />
          <ContactSection />
        </main>
      )}

      {page === 'pricing' && (
        <main className="px-6 md:px-12 max-w-6xl mx-auto pt-32 pb-24 min-h-[85vh] space-y-16 md:space-y-24">
          <PricingSection />
          <ContactSection />
        </main>
      )}

      <Footer />
    </div>
  );
}

function Navbar({ page, setPage }: { page: string, setPage: (p: PageType) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (
    targetPage: PageType,
    elementId?: string
  ) => {
    setPage(targetPage);
    setIsOpen(false);
    if (elementId) {
      setTimeout(() => document.getElementById(elementId)?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div className="bg-white/70 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/40 rounded-3xl md:rounded-full px-6 py-3 w-full max-w-4xl mx-auto flex flex-col md:block">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => handleNavClick('home')}>
            <span className="font-serif font-semibold text-lg tracking-tight text-slate-900 leading-none">Chamod Gamage</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button onClick={() => handleNavClick('home', 'about')} className="hover:text-slate-900 transition-colors">About</button>
            <button onClick={() => handleNavClick('home', 'services')} className="hover:text-slate-900 transition-colors">Services</button>
            <button onClick={() => handleNavClick('home', 'case-studies')} className="hover:text-slate-900 transition-colors">Case Studies</button>
            <button onClick={() => handleNavClick('web-solutions')} className={`transition-colors font-semibold ${page === 'web-solutions' ? 'text-indigo-600' : 'text-slate-800 hover:text-indigo-600'}`}>Web Solutions</button>
            <button onClick={() => handleNavClick('pricing')} className={`transition-colors font-semibold ${page === 'pricing' ? 'text-indigo-600' : 'text-slate-800 hover:text-indigo-600'}`}>Pricing</button>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <motion.button 
                data-tally-open="681NBo" data-tally-layout="modal" data-tally-width="1000" data-tally-emoji-text="👋" data-tally-emoji-animation="wave"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group inline-flex rounded-full p-[2px] shadow-sm hover:shadow-md transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-50 group-hover:opacity-100 blur-sm transition-opacity duration-300 rounded-full" />
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-70 group-hover:opacity-100 rounded-full transition-opacity duration-300" />
                <div className="relative flex items-center gap-2 bg-slate-900 text-white text-sm font-medium px-5 py-2 rounded-full">
                  Get in touch
                  <ArrowUpRight className="w-4 h-4 text-indigo-300 group-hover:text-white transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </motion.button>
            </div>
            
            <button 
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden flex flex-col gap-4 border-t border-slate-100 mt-3"
            >
              <div className="pt-4 pb-2 flex flex-col gap-4">
                <button onClick={() => handleNavClick('home', 'about')} className="text-left font-medium text-slate-600 hover:text-slate-900 transition-colors">About</button>
                <button onClick={() => handleNavClick('home', 'services')} className="text-left font-medium text-slate-600 hover:text-slate-900 transition-colors">Services</button>
                <button onClick={() => handleNavClick('home', 'case-studies')} className="text-left font-medium text-slate-600 hover:text-slate-900 transition-colors">Case Studies</button>
                <button onClick={() => handleNavClick('web-solutions')} className={`text-left font-semibold ${page === 'web-solutions' ? 'text-indigo-600' : 'text-slate-800'}`}>Web Solutions</button>
                <button onClick={() => handleNavClick('pricing')} className={`text-left font-semibold ${page === 'pricing' ? 'text-indigo-600' : 'text-slate-800'}`}>Pricing</button>
                
                <button 
                  data-tally-open="681NBo" data-tally-layout="modal" data-tally-width="1000" data-tally-emoji-text="👋" data-tally-emoji-animation="wave"
                  className="mt-2 bg-slate-900 text-white text-sm font-medium px-5 py-2.5 rounded-full flex items-center justify-center gap-2 w-full"
                >
                  Get in touch
                  <ArrowUpRight className="w-4 h-4 text-indigo-300" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

function HeroSection({ setPage }: { setPage: (p: PageType)=>void }) {
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const yParallaxBg = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const yParallaxLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const yParallaxRight = useTransform(scrollYProgress, [0, 1], ["0%", "-150%"]);

  // Cursor Glow state
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 25 });

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  const handlePointerLeave = () => {
    // Move glow offscreen smoothly when cursor leaves
    mouseX.set(-1000);
    mouseY.set(-1000);
  };

  return (
    <section 
      ref={ref} 
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative flex flex-col items-center text-center justify-center min-h-[90vh] pt-24 pb-20 w-full overflow-hidden"
    >
      
      {/* Dynamic Cursor Glow */}
      <motion.div
        style={{ x: springX, y: springY }}
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-full blur-[120px] pointer-events-none -z-10 -ml-[250px] -mt-[250px]"
      />

      {/* Background Glows for focus */}
      <motion.div 
        style={{ y: yParallaxBg, x: "-50%" }}
        className="absolute top-1/2 left-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/40 blur-[120px] rounded-full pointer-events-none -z-10"
      ></motion.div>

      {/* Floating Widget 1 (Left) - Growth Chart */}
      <motion.div 
        style={{ y: yParallaxLeft }}
        className="absolute -left-[8%] 2xl:left-[2%] top-[20%] hidden xl:block z-0"
      >
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [-6, -4, -6] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-56 h-64 bg-white/80 backdrop-blur-xl rounded-3xl p-4 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-white/60 flex flex-col">
             <div className="w-full flex-1 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl mb-4 flex items-center justify-center border border-indigo-100/50">
               <BarChart3 className="w-12 h-12 text-indigo-400/80" />
             </div>
             <div className="px-2 space-y-2">
               <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Campaign Scale</span>
                  <span className="text-xs font-bold text-emerald-500">Active</span>
               </div>
               <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-indigo-500 rounded-full"></div>
               </div>
             </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Widget 2 (Right) - Performance Stat */}
      <motion.div 
        style={{ y: yParallaxRight }}
        className="absolute -right-[8%] 2xl:right-[2%] bottom-[25%] hidden xl:flex flex-col z-0"
      >
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [4, 6, 4] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <div className="w-64 bg-white/90 backdrop-blur-xl rounded-3xl p-5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-white/60">
             <div className="flex justify-between items-start mb-4">
               <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center">
                 <ArrowUpRight className="w-6 h-6 text-emerald-600" />
               </div>
               <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2 py-1 rounded-lg">+340%</span>
             </div>
             <h3 className="text-lg font-bold text-slate-900 leading-tight">Average ROAS</h3>
             <p className="text-sm text-slate-500 mt-1">Across top e-commerce clients</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-4xl space-y-8 z-10 relative px-4">
        
        <motion.div
           initial={{ opacity: 0, scale: 0.9, y: 20 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           transition={{ duration: 0.5, ease: "easeOut" }}
           className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-white shadow-sm text-sm font-medium text-slate-700 mx-auto"
         >
           <span className="relative flex h-2.5 w-2.5">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
           </span>
           Accepting new clients for Q3
         </motion.div>

        <motion.h1 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
           className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-slate-900 leading-[1.05]"
        >
          Digital Marketing <br className="hidden md:block"/>
          <span className="font-serif italic font-medium relative inline-block">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative z-10">
              with a Human Touch.
            </span>
          </span>
        </motion.h1>
        
        <motion.p 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
           className="text-lg md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-light"
        >
          Results-driven Performance Marketer specializing in Meta, TikTok & Google Ads. I help brands scale through data-backed strategies that drive measurable ROI.
        </motion.p>
        
        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
           className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
        >
          <motion.button 
            data-tally-open="681NBo" data-tally-layout="modal" data-tally-width="1000" data-tally-emoji-text="👋" data-tally-emoji-animation="wave"
            className="group relative inline-flex w-full sm:w-auto text-left"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur opacity-25 group-hover:opacity-60 transition duration-500 group-hover:duration-200"></div>
            <div className="relative flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full font-semibold focus:ring-4 focus:ring-slate-200 shadow-xl w-full">
              Discuss Your Project 
              <ArrowUpRight className="w-4 h-4 text-indigo-300 group-hover:text-white transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </motion.button>
          <a href="#services" className="w-full sm:w-auto px-8 py-4 bg-white/60 backdrop-blur-md text-slate-800 rounded-full font-semibold focus:ring-4 focus:ring-slate-100 transition-all shadow-sm border border-slate-200/50 hover:border-slate-300 hover:bg-white/80">
            View Services
          </a>
        </motion.div>

        {/* Global Reach / Social Proof */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 0.8 }}
           className="pt-16 flex flex-col items-center gap-5"
        >
           <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Global Marketing Reach</span>
           <div className="flex flex-wrap justify-center gap-2">
              {['Sri Lanka', 'Australia', 'Maldives', 'India', 'UK'].map((country, i) => (
                <div key={i} className="px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-sm border border-white/60 text-sm font-medium text-slate-600 shadow-sm">
                   {country}
                </div>
              ))}
           </div>
        </motion.div>
      </div>
    </section>
  );
}

function CredentialsSection() {
  const credentials = [
    {
      provider: "HubSpot Academy",
      title: "Social Media Marketing",
      logo: "https://www.vectorlogo.zone/logos/hubspot/hubspot-icon.svg"
    },
    {
      provider: "Google",
      title: "Google Ads — Measurement",
      logo: "https://www.vectorlogo.zone/logos/google/google-icon.svg"
    },
    {
      provider: "Google",
      title: "AI-Powered Performance Ads",
      logo: "https://www.vectorlogo.zone/logos/google/google-icon.svg"
    },
    {
      provider: "Emind Academy - Australia",
      title: "DPDM in Practical Digital Marketing",
      icon: <GraduationCap className="w-8 h-8 text-indigo-500" />
    },
    {
      provider: "Canva",
      title: "Canva Essentials",
      logo: "https://www.vectorlogo.zone/logos/canva/canva-icon.svg"
    }
  ];

  return (
    <section className="pb-10 pt-4 overflow-hidden relative w-full">
      <div className="text-center mb-8">
         <span className="text-sm font-bold text-slate-400 uppercase tracking-widest block mb-2">Backed by Recognised Credentials</span>
      </div>
      
      <div className="relative flex overflow-hidden group">
        {/* Soft edge gradients for smooth enter/exit */}
        <div className="absolute top-0 left-0 w-20 md:w-32 h-full bg-gradient-to-r from-[#fafbfc] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-20 md:w-32 h-full bg-gradient-to-l from-[#fafbfc] to-transparent z-10 pointer-events-none"></div>

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          className="flex gap-6 w-max group-hover:[animation-play-state:paused]"
        >
           {[...credentials, ...credentials].map((item, idx) => (
              <div key={idx} className="w-[320px] bg-white/60 backdrop-blur-md border border-white shadow-sm hover:shadow-md transition-all rounded-3xl p-5 flex items-center gap-5 shrink-0 hover:bg-white/90">
                 <div className="w-14 h-14 rounded-2xl bg-white shadow-[0_2px_10px_rgb(0,0,0,0.02)] flex items-center justify-center shrink-0 overflow-hidden p-2.5 border border-slate-100">
                     {item.logo ? (
                        <img src={item.logo} alt={item.provider} className="w-full h-full object-contain" />
                     ) : (
                        item.icon
                     )}
                 </div>
                 <div className="flex flex-col gap-0.5">
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.provider}</p>
                   <h4 className="text-sm font-bold text-slate-800 leading-snug whitespace-normal pr-2">{item.title}</h4>
                 </div>
              </div>
           ))}
        </motion.div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="pt-10 scroll-m-32">
      <div className="bg-white/60 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_8px_40px_rgb(0,0,0,0.03)] flex flex-col md:flex-row gap-12 items-center">
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex-1 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-sm font-medium text-indigo-600">
            About Me
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Hi, I'm <span className="font-serif italic text-indigo-600">Chamod.</span>
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            I'm a results-driven Digital Marketer specialising in performance advertising and social media growth. With a focus on ROI, I help brands scale through data-backed strategies across Meta, TikTok and Google Ads. 
          </p>
          <p className="text-slate-600 leading-relaxed text-lg">
            From pixel-perfect tracking setups to full-funnel campaign architecture, I'm passionate about driving measurable impact through innovative digital solutions that connect brands with real people.
          </p>
          <div className="pt-2 text-sm font-medium text-slate-500 uppercase tracking-wider flex flex-wrap gap-2 items-center">
            Global Reach: 
            <span className="normal-case tracking-normal text-slate-800 bg-white/80 px-3 py-1 rounded-full border border-slate-200 shadow-sm">Sri Lanka</span>
            <span className="normal-case tracking-normal text-slate-800 bg-white/80 px-3 py-1 rounded-full border border-slate-200 shadow-sm">Australia</span>
            <span className="normal-case tracking-normal text-slate-800 bg-white/80 px-3 py-1 rounded-full border border-slate-200 shadow-sm">Maldives</span>
            <span className="normal-case tracking-normal text-slate-800 bg-white/80 px-3 py-1 rounded-full border border-slate-200 shadow-sm">India</span>
            <span className="normal-case tracking-normal text-slate-800 bg-white/80 px-3 py-1 rounded-full border border-slate-200 shadow-sm">UK</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6 w-full md:w-auto"
        >
          <div className="flex justify-center md:justify-center">
             <div className="w-48 h-48 md:w-52 md:h-52 rounded-3xl overflow-hidden shadow-[0_10px_40px_rgb(0,0,0,0.06)] bg-white border-4 border-white/60">
                <img src="https://raw.githubusercontent.com/ChamodRavihara-digital/ChamodRaviharaWeb/main/Public/myphoto.jpg" alt="Chamod" className="w-full h-full object-cover" />
             </div>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            {[
              { label: "Brands Scaled", value: "35+" },
              { label: "Years Experience", value: "4+" },
              { label: "Countries Active", value: "4+" },
              { label: "Focus", value: "ROI" },
            ].map((stat, i) => (
              <div key={i} className="bg-white/80 p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
                <div className="text-3xl md:text-4xl font-bold font-serif text-slate-900 mb-1">{stat.value}</div>
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

function ServicesSection() {
  const services = [
    {
      icon: <Users className="w-6 h-6 text-pink-500" />,
      title: "Social Media Management",
      desc: "Full-service social media management including content planning, scheduling, community engagement, and performance reporting.",
      color: "bg-pink-50"
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-blue-500" />,
      title: "Meta Advertising",
      desc: "Complete Meta Ads setup including page claiming, portfolio configuration, Pixel & Conversions API integration for scaling.",
      color: "bg-blue-50"
    },
    {
      icon: <MonitorPlay className="w-6 h-6 text-slate-800" />,
      title: "TikTok Advertising",
      desc: "Performance-driven TikTok ad campaigns crafted for engagement and conversions — from creative strategy to management.",
      color: "bg-slate-100"
    },
    {
      icon: <Globe2 className="w-6 h-6 text-emerald-500" />,
      title: "Website Development",
      desc: "Budget-friendly, conversion-optimised websites that load fast, look great, and support your marketing campaigns.",
      color: "bg-emerald-50"
    },
    {
      icon: <Megaphone className="w-6 h-6 text-orange-500" />,
      title: "Google Advertising",
      desc: "Google Search, Display & Shopping campaigns with strategic keyword targeting, bid management, and ongoing optimisation.",
      color: "bg-orange-50"
    }
  ];

  return (
    <section id="services" className="scroll-m-32">
      <div className="bg-slate-50/70 backdrop-blur-xl border border-white/60 rounded-[3rem] p-8 md:p-12 lg:p-16 shadow-[0_8px_40px_rgb(0,0,0,0.03)]">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900">How I Can <span className="font-serif italic text-indigo-600">Help You Grow</span></h2>
          <p className="text-lg text-slate-600">End-to-end digital marketing solutions tailored to your business goals.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((svc, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
            className="group p-8 rounded-3xl bg-white/70 backdrop-blur-md border border-white/60 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_15px_40px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300"
          >
            <div className={`w-14 h-14 rounded-2xl ${svc.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
              {svc.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{svc.title}</h3>
            <p className="text-slate-600 leading-relaxed text-sm">{svc.desc}</p>
          </motion.div>
        ))}
        
        {/* Empty slot for aesthetic layout balance in a 3-col grid (optional, but looks nice as a CTA card) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          className="p-8 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-center gap-4 hover:border-indigo-300 hover:bg-indigo-50/50 hover:shadow-[0_15px_40px_rgb(0,0,0,0.05)] hover:-translate-y-2 transition-all duration-300"
        >
          <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center">
             <ArrowUpRight className="w-6 h-6 text-slate-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Need something else?</h3>
            <p className="text-slate-500 text-sm mt-1">Let's discuss a custom strategy.</p>
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="scroll-m-32">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 text-white p-10 md:p-16 text-center max-w-4xl mx-auto shadow-2xl">
        {/* Background glow effects inside the dark card */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[50%] bg-indigo-500 blur-[120px] opacity-20 pointer-events-none rounded-full"></div>
        
        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">Ready to Scale <span className="font-serif italic text-indigo-300">Your Brand?</span></h2>
            <p className="text-slate-300 text-lg">
              Let's talk about your goals. Book a free consultation and find out how data-backed digital marketing can transform your business.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
            <a href="mailto:hello@chamod.digital" className="flex items-center gap-2 hover:text-indigo-300 transition-colors">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                <Mail className="w-4 h-4" />
              </div>
              <span className="font-medium">hello@chamod.digital</span>
            </a>
            <a href="tel:+94770675710" className="flex items-center gap-2 hover:text-indigo-300 transition-colors">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                <Phone className="w-4 h-4" />
              </div>
              <span className="font-medium">+94 770 675 710</span>
            </a>
          </div>
          
          <div className="pt-6">
            <motion.button 
              data-tally-open="681NBo" data-tally-layout="modal" data-tally-width="1000" data-tally-emoji-text="👋" data-tally-emoji-animation="wave"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group inline-flex rounded-full p-[3px] shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-60 group-hover:opacity-100 blur-md transition-opacity duration-300 rounded-full" />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-80 group-hover:opacity-100 rounded-full transition-opacity duration-300" />
              <div className="relative flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-full font-bold">
                Book a Consultation
                <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-pink-500 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}

function CaseStudyCard({ study, idx }: { study: typeof CASE_STUDIES[0], idx: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 150;
  const isLongDescription = study.desc.length > maxLength;
  const displayText = !isLongDescription || isExpanded 
    ? study.desc 
    : `${study.desc.substring(0, maxLength)}...`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      className="bg-white/80 backdrop-blur-sm rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex flex-col group hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300"
    >
      <div className="bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full w-fit mb-5">
        {study.category}
      </div>
      <h3 className="font-serif text-2xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">
        {study.client}
      </h3>
      <div className="text-slate-500 leading-relaxed mb-8 flex-grow">
        <span>{displayText}</span>
        {isLongDescription && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-indigo-600 font-medium ml-2 hover:text-indigo-700 whitespace-nowrap"
          >
            {isExpanded ? 'View Less' : 'View More'}
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-x-6 gap-y-4 pt-6 border-t border-slate-100">
        {study.metrics.map((metric, mIdx) => (
          <div key={mIdx}>
            <div className="text-2xl font-bold text-emerald-500">{metric.val}</div>
            <div className="text-[0.65rem] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">{metric.key}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function CaseStudiesSection() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredCases = activeFilter === 'All' 
    ? CASE_STUDIES 
    : CASE_STUDIES.filter(c => c.category === activeFilter);

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Case Studies Section */}
      <section id="case-studies" className="relative z-10 scroll-m-32">
        <div className="bg-indigo-50/30 backdrop-blur-xl border border-white/60 rounded-[3rem] p-8 md:p-12 lg:p-16 shadow-[0_8px_40px_rgb(0,0,0,0.02)]">
          <div className="mb-12">
            <div className="text-center max-w-2xl mx-auto space-y-4 mb-8">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900">Case <span className="font-serif italic text-indigo-600">Studies</span></h2>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-3">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === cat 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCases.map((study, idx) => (
            <CaseStudyCard key={idx} study={study} idx={idx} />
          ))}
        </div>
        </div>
      </section>

      {/* Artworks section */}
      <section className="relative z-10">
        <div className="bg-slate-900 rounded-[3rem] p-8 md:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
          {/* Subtle glow inside the dark card */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[100px] pointer-events-none rounded-full translate-x-1/3 -translate-y-1/2"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">Artworks & Design Portfolio</h2>
          
          <div className="relative flex w-full py-4 overflow-hidden -mx-6 md:-mx-12 px-6 md:px-12 w-[calc(100%+3rem)] md:w-[calc(100%+6rem)]">
            {/* Gradient Edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #0f172a, transparent)' }}></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #0f172a, transparent)' }}></div>

            <div className="flex w-max animate-marquee pointer-events-auto">
              {[...ARTWORKS, ...ARTWORKS, ...ARTWORKS, ...ARTWORKS].map((art, idx) => (
                <div key={idx} className="bg-white/5 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-slate-700 aspect-[4/5] md:aspect-[4/5] w-[220px] md:w-[300px] shrink-0 mx-3 md:mx-4 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 relative group/card">
                  <img 
                    src={art} 
                    alt={`Artwork ${(idx % ARTWORKS.length) + 1}`} 
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500 opacity-90 group-hover/card:opacity-100"
                    onError={(e) => { e.currentTarget.src = `https://placehold.co/400x400/0f172a/94a3b8?text=POST${(idx % ARTWORKS.length) + 1}` }} 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ads section */}
      <section className="relative z-10">
        <div className="bg-white/60 backdrop-blur-xl border border-white rounded-[3rem] p-8 md:p-12 lg:p-16 shadow-[0_8px_40px_rgb(0,0,0,0.03)] text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">Creative <span className="font-serif italic text-indigo-600">That Converts</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ADS.map((ad, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              key={idx} className="bg-white/80 backdrop-blur-sm rounded-[2rem] p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 group hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="rounded-[1.5rem] overflow-hidden bg-slate-50 aspect-video mb-5 relative border border-slate-100/50">
                <img 
                  src={ad.item} 
                  alt={ad.desc}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.currentTarget.src = `https://placehold.co/600x338/f8fafc/94a3b8?text=Ad+Visual+${idx+1}` }}
                />
              </div>
              <p className="text-sm font-medium text-slate-600 leading-relaxed px-2 pb-2 text-center">
                {ad.desc}
              </p>
            </motion.div>
          ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const WEB_SOLUTIONS = [
  { title: "Tourism Website (Custom UI + Web Development)", url: "https://birdflightsrilanka.com/" },
  { title: "Ecommerce Website (Web Development)", url: "https://santhari.com/" },
  { title: "Architecture Business Website", url: "https://vertiqengineering.com/" },
  { title: "Cosmetic Website", url: "https://sephyraluxe.com/" },
  { title: "Ecommerce", url: "https://hellocomfylove.com/" },
  { title: "B2B Portfolio", url: "https://ymacfootwear.com/" },
  { title: "Clothing Web Site - Ecommerce Store", url: "http://kapro.lk/" },
  { title: "Reseller-Management System", url: "http://www.sscdrop.com" },
  { title: "Luxury Hotel Booking", url: "https://grand.zenax.info/" },
  { title: "Gourmet Online Food Ordering", url: "https://mysunshine.lk/" }
];

function WebSolutions() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const extendedSolutions = [...WEB_SOLUTIONS, ...WEB_SOLUTIONS, ...WEB_SOLUTIONS];

  useEffect(() => {
    if (scrollRef.current && scrollRef.current.children.length > WEB_SOLUTIONS.length) {
      const children = scrollRef.current.children;
      const singleSetWidth = (children[WEB_SOLUTIONS.length] as HTMLElement).offsetLeft - (children[0] as HTMLElement).offsetLeft;
      scrollRef.current.scrollLeft = singleSetWidth;
    }
  }, []);

  const handleScroll = () => {
    if (!scrollRef.current || scrollRef.current.children.length <= WEB_SOLUTIONS.length) return;
    const container = scrollRef.current;
    const children = container.children;
    const singleSetWidth = (children[WEB_SOLUTIONS.length] as HTMLElement).offsetLeft - (children[0] as HTMLElement).offsetLeft;

    if (container.scrollLeft <= 5) {
      container.scrollLeft += singleSetWidth;
    } else if (container.scrollLeft >= singleSetWidth * 2 - 5) {
      container.scrollLeft -= singleSetWidth;
    }
  };

  const scrollPrev = () => {
    if (scrollRef.current && scrollRef.current.children.length > 0) {
      const container = scrollRef.current;
      const childWidth = (container.children[0] as HTMLElement).offsetWidth + 24;
      container.scrollBy({ left: -childWidth, behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (scrollRef.current && scrollRef.current.children.length > 0) {
      const container = scrollRef.current;
      const childWidth = (container.children[0] as HTMLElement).offsetWidth + 24;
      container.scrollBy({ left: childWidth, behavior: 'smooth' });
    }
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDown(true);
    scrollRef.current.classList.remove('snap-x', 'snap-mandatory');
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const onMouseLeave = () => {
    setIsDown(false);
    if (scrollRef.current) scrollRef.current.classList.add('snap-x', 'snap-mandatory');
  };

  const onMouseUp = () => {
    setIsDown(false);
    if (scrollRef.current) scrollRef.current.classList.add('snap-x', 'snap-mandatory');
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="animate-in fade-in duration-500 relative z-10 w-full pt-4">
      <div className="bg-slate-50/70 backdrop-blur-xl border border-white/60 rounded-[3rem] p-8 md:p-12 shadow-[0_8px_40px_rgb(0,0,0,0.03)] text-center overflow-hidden">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Web <span className="font-serif italic text-indigo-600">Solutions</span></h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">Showcasing custom websites, e-commerce stores, and digital platforms. Drag or scroll to explore.</p>

        {/* Scrollable container for mobile & desktop */}
        <div className="relative group">
          <button 
            onClick={scrollPrev}
            className="absolute left-2 md:-left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white hover:bg-slate-50 text-slate-800 rounded-full shadow-[0_4px_20px_rgb(0,0,0,0.1)] border border-slate-100 transition-all opacity-100 md:opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={scrollNext}
            className="absolute right-2 md:-right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white hover:bg-slate-50 text-slate-800 rounded-full shadow-[0_4px_20px_rgb(0,0,0,0.1)] border border-slate-100 transition-all opacity-100 md:opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div 
            ref={scrollRef}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            onScroll={handleScroll}
            className="w-full overflow-x-auto pb-10 pt-4 snap-x snap-mandatory flex gap-6 px-4 md:px-8 hide-scrollbars -mx-4 md:-mx-8 w-[calc(100%+2rem)] md:w-[calc(100%+4rem)] cursor-grab active:cursor-grabbing"
          >
            {extendedSolutions.map((site, i) => (
              <div 
                key={i}
                className="snap-center w-[300px] md:w-[400px] bg-white rounded-3xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 group/card shrink-0 flex flex-col pointer-events-auto hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="aspect-[16/10] bg-slate-100 rounded-2xl overflow-hidden mb-5 relative border border-slate-200 pointer-events-none">
                  <img 
                    src={`https://image.thum.io/get/width/800/crop/800/${site.url}`} 
                    alt={site.title}
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700 pointer-events-none" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-indigo-900/0 group-hover/card:bg-indigo-900/10 transition-colors pointer-events-none"></div>
                </div>
                
                <h3 className="font-bold text-slate-900 text-lg mb-2 text-left">{site.title}</h3>
                
                <a 
                  href={site.url.startsWith('http') ? site.url : `https://${site.url}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  draggable={false}
                  className="mt-auto inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-800 transition-colors w-fit group/btn"
                >
                  Visit Website 
                  <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const DIGITAL_MARKETING_PRICING = [
  {
    name: "Meta Page Setup",
    price: "$50",
    originalPrice: null,
    target: "One Time Payment",
    description: "Professional Facebook and Instagram page setup.",
    features: [
      "Facebook/Instagram page setup",
      "Pages claimed to Meta Business Suite",
      "Add people/assets correctly",
      "Meta pixels & API Configuration"
    ],
    highlighted: false
  },
  {
    name: "Starter Package",
    price: "$150",
    originalPrice: "$170",
    description: "I will manage your social media marketing and advertising.",
    features: [
      "1 competitor analyzed",
      "Action plan",
      "Target audience and buyer persona",
      "3 Meta campaigns / 1 Google Campaigns"
    ],
    highlighted: false
  },
  {
    name: "Growth Package",
    price: "$250",
    originalPrice: null,
    description: "Marketing analysis + marketing strategy, channels & tactics, marketing action plan.",
    features: [
      "5 Meta campaigns",
      "2 Google Campaigns"
    ],
    highlighted: true,
    badge: "Selected"
  },
  {
    name: "Premium Package",
    price: "$550",
    originalPrice: null,
    description: "I will handle your social media, ads, content writing, SEO, email marketing and website maintenance.",
    features: [
      "Social Media & Ads Management",
      "Content Writing",
      "Advanced SEO",
      "Email Marketing",
      "Website Maintenance"
    ],
    highlighted: false
  }
];

const WEB_DEV_PRICING = [
  {
    name: "Starter Pack",
    price: "From $500",
    target: "Small business / restaurant",
    features: [
      "5 pages website",
      "Mobile responsive",
      "Basic SEO",
      "Contact form",
      "Basic speed optimization"
    ],
    highlighted: false
  },
  {
    name: "Growth Package",
    price: "From $1000",
    target: "This is your MAIN SELLER",
    features: [
      "Everything in Starter",
      "Conversion-focused design",
      "Booking / ordering system",
      "Meta Pixel + GA setup",
      "Landing page",
      "Basic funnel structure"
    ],
    highlighted: true,
    badge: "Main Seller"
  },
  {
    name: "Premium Package",
    price: "From $2000",
    target: "High-end clients",
    features: [
      "Custom UI/UX",
      "Advanced ecommerce / ordering system",
      "Full funnel (ads + landing pages)",
      "Speed optimization",
      "Ongoing support"
    ],
    highlighted: false
  }
];

const SOCIAL_MEDIA_HANDLING_PRICING = [
  {
    name: "Starter Package",
    price: "$50",
    originalPrice: null,
    target: "Social Media Optimizer 1.0",
    description: "",
    features: [
      "30 Days",
      "**02 Platforms**",
      "**10 SEO POSTS** (8 Static, 1 Reel, 1 Carousel)",
      "Story Highlights",
      "Custom Graphics",
      "Social Kit",
      "Reporting"
    ],
    highlighted: false
  },
  {
    name: "Growth Package",
    price: "$90",
    originalPrice: null,
    target: "Social Media Optimizer 2.0",
    description: "",
    features: [
      "30 Days",
      "**03 Platforms**",
      "**15 SEO POSTS** (10 Static, 3 Reel, 2 Carousel)",
      "Story Highlights",
      "Custom Graphics",
      "Social Kit",
      "Reporting"
    ],
    highlighted: true,
    badge: "Main Seller"
  },
  {
    name: "Premium Package",
    price: "$150",
    originalPrice: null,
    target: "Social Media Best Seller",
    description: "",
    features: [
      "30 Days",
      "**Up to 05 platforms**",
      "**30 SEO POSTS** (20 Static, 5 Reel, 5 Carousel)",
      "Story Highlights",
      "Custom Graphics",
      "Social Kit",
      "Reporting"
    ],
    highlighted: false
  }
];

function PricingSection() {
  const [pricingType, setPricingType] = useState<'marketing' | 'social' | 'web'>('marketing');

  const currentPricing = pricingType === 'marketing' 
    ? DIGITAL_MARKETING_PRICING 
    : pricingType === 'social' 
      ? SOCIAL_MEDIA_HANDLING_PRICING 
      : WEB_DEV_PRICING;

  return (
    <section className="animate-in fade-in duration-500 relative z-10 w-full pt-4">
      <div className="bg-slate-50/70 backdrop-blur-xl border border-white/60 rounded-[3rem] p-8 md:p-12 shadow-[0_8px_40px_rgb(0,0,0,0.03)] text-center overflow-hidden">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Simple, <span className="font-serif italic text-indigo-600">Transparent</span> Pricing</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">Choose the package that best fits your business needs and growth trajectory.</p>

        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-1.5 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-1 relative overflow-hidden xl:overflow-visible">
            {(['marketing', 'social', 'web'] as const).map((tab) => (
              <button 
                key={tab}
                onClick={() => setPricingType(tab)}
                className={`relative px-4 sm:px-6 py-2.5 rounded-full font-semibold text-xs sm:text-sm transition-colors z-10 flex-1 whitespace-nowrap ${pricingType === tab ? 'text-white' : 'text-slate-600 hover:text-slate-900'}`}
              >
                {tab === 'marketing' ? 'Digital Marketing' : tab === 'social' ? 'Social Media Handling' : 'Web Dev + Marketing'}
                {pricingType === tab && (
                  <motion.div 
                    layoutId="pricing-tab-bg"
                    className="absolute inset-0 bg-indigo-600 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {pricingType === 'social' && (
          <div className="max-w-4xl mx-auto mb-10">
            <p className="text-slate-600 mb-4 text-sm md:text-base font-medium">
              <span className="text-indigo-600 font-bold">I will be your social media marketing manager.</span> All packages include:
            </p>
            <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-6 gap-y-3 text-xs md:text-sm text-slate-500 font-medium bg-white px-6 py-4 rounded-3xl border border-slate-100 shadow-sm">
              {[
                "Profile Optimization",
                "Custom Content & Graphics",
                "Branded Posts",
                "Reels & Shorts",
                "SEO & Hashtags",
                "Social Kit",
                "Scheduling & Posting"
              ].map((item, idx) => (
                <span key={idx} className="flex items-center gap-1.5 whitespace-nowrap"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" /> {item}</span>
              ))}
            </div>
          </div>
        )}

        {/* Pricing Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${currentPricing.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6 text-left`}>
          {currentPricing.map((pkg, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className={`relative rounded-3xl p-8 flex flex-col group cursor-pointer active:scale-[0.98] transition-all duration-300 ${pkg.highlighted ? 'bg-indigo-900 text-white shadow-xl md:scale-[1.05] z-20 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(49,46,129,0.4)]' : 'bg-white text-slate-900 shadow-sm border border-slate-100 z-10 hover:-translate-y-1 hover:shadow-xl hover:border-indigo-200 hover:z-30'}`}
            >
              {pkg.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-md whitespace-nowrap">
                  {pkg.badge}
                </div>
              )}
              
              <h3 className={`text-xl font-bold mb-2 ${pkg.highlighted ? 'text-indigo-100' : 'text-slate-900'}`}>{pkg.name}</h3>
              
              <div className="mb-4">
                {pkg.originalPrice && (
                  <div className="text-slate-400 line-through text-sm font-medium">{pkg.originalPrice}</div>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold">{pkg.price}</span>
                  {(pkg.price.includes('150') || pkg.price.includes('250') || pkg.price.includes('550')) && <span className={`text-sm ${pkg.highlighted ? 'text-indigo-200' : 'text-slate-500'}`}>/mo</span>}
                </div>
              </div>

              {'target' in pkg && pkg.target && (
                 <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold mb-4 w-fit border ${
                   pkg.highlighted 
                     ? 'bg-white/10 text-indigo-100 border-white/20' 
                     : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                 }`}>
                   <Target className="w-3.5 h-3.5" />
                   <span>{pkg.target}</span>
                 </div>
              )}

              {'description' in pkg && pkg.description && (
                <p className={`text-sm mb-6 ${pkg.highlighted ? 'text-indigo-100/80' : 'text-slate-600'}`}>
                  {pkg.description}
                </p>
              )}

              <div className="h-px w-full bg-current opacity-10 mb-6"></div>

              <ul className="space-y-4 mb-8 flex-grow">
                {pkg.features.map((feature, j) => {
                  const parts = feature.split(/(\*\*.*?\*\*)/g);
                  return (
                    <li key={j} className="flex gap-3 text-sm">
                      <CheckCircle2 className={`w-5 h-5 shrink-0 ${pkg.highlighted ? 'text-indigo-300' : 'text-indigo-500'}`} />
                      <span className={pkg.highlighted ? 'text-indigo-50' : 'text-slate-600'}>
                        {parts.map((part, i) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={i} className={pkg.highlighted ? 'text-white' : 'text-slate-900 font-bold'}>{part.slice(2, -2)}</strong>;
                          }
                          return <span key={i}>{part}</span>;
                        })}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <a 
                href="#contact"
                className={`mt-auto text-center w-full py-3 px-6 rounded-xl font-semibold transition-all ${pkg.highlighted ? 'bg-white text-indigo-900 hover:bg-slate-100' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
              >
                Get Started
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/50 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500 font-medium">
        <p>© 2025 Chamod Ravihara</p>
        <p className="hidden md:block">·</p>
        <p>Digital Marketing with a Human Touch</p>
        <p className="hidden md:block">·</p>
        <a href="mailto:hello@chamod.digital" className="hover:text-slate-900 transition-colors">hello@chamod.digital</a>
      </div>
    </footer>
  );
}

