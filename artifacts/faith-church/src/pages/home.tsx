import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, BookOpen, Users, Baby, PlayCircle, MapPin, CalendarDays, ArrowRight, Youtube, Loader2 } from "lucide-react";
import { useRef, useEffect, useState } from "react";

interface LatestSermon {
  id: string;
  title: string;
  published: string;
  views: string;
}

import heroBg from "@assets/image_1775740698464.png";
import kidsImg from "@assets/image_1775740702854.png";
import studentsImg from "@assets/image_1775740698464.png";
import adultsImg from "@assets/image_1775740698464.png";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemFade = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

function useCounter(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [start, target, duration]);
  return count;
}

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useCounter(value, 2200, inView);
  return (
    <motion.div
      ref={ref}
      variants={itemFade}
      className="text-center space-y-2"
    >
      <div className="text-5xl font-bold text-white">
        {count}{suffix}
      </div>
      <div className="text-blue-100 text-sm font-medium">{label}</div>
    </motion.div>
  );
}

export default function Home() {
  const { t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 160]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.3]);

  const [latestSermon, setLatestSermon] = useState<LatestSermon | null>(null);
  const [sermonLoading, setSermonLoading] = useState(true);

  useEffect(() => {
    fetch("/api/youtube/videos")
      .then(r => r.json())
      .then(data => {
        const videos: Array<{ id: string; title: string; published: string; views: string; url: string }> = data.videos ?? [];
        const sermon = videos.find(v => !v.url.includes("shorts"));
        if (sermon) setLatestSermon(sermon);
      })
      .catch(() => {})
      .finally(() => setSermonLoading(false));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section — parallax */}
      <section ref={heroRef} className="relative h-[92vh] min-h-[640px] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})`, y: heroY }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/55 to-slate-900/80 z-10" />

        {/* Floating decorative cross */}
        <motion.div
          className="absolute top-16 end-16 w-20 h-20 opacity-20 z-20 hidden lg:block"
          animate={{ y: [0, -16, 0], rotate: [0, 3, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 40 60" fill="none" className="w-full h-full">
            <rect x="16" y="0" width="8" height="60" rx="3" fill="#F9901A" />
            <rect x="0" y="14" width="40" height="8" rx="3" fill="#F9901A" />
          </svg>
        </motion.div>

        {/* Floating circle accent */}
        <motion.div
          className="absolute bottom-24 start-12 w-32 h-32 rounded-full border-2 border-white/10 z-20 hidden lg:block"
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="container relative z-20 px-4 text-center"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-4xl mx-auto space-y-7"
          >
            <motion.div variants={itemFade}>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-accent/20 text-accent border border-accent/30 mb-4">
                {t("منذ ١٩٦٩", "Since 1969")}
              </span>
            </motion.div>

            <motion.h1
              variants={itemFade}
              className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-tight"
            >
              {t(
                <>
                  <span className="block text-white">مرحبًا بكم في</span>
                  <span className="block text-accent">كنيسة الإيمان فيكتوريا</span>
                </>,
                <>
                  <span className="block text-white">Welcome to</span>
                  <span className="block text-accent">Faith Church Victoria</span>
                </>
              )}
            </motion.h1>

            <motion.p variants={itemFade} className="text-lg md:text-xl text-slate-200 font-medium">
              {t(
                "أكون مثله، وأعمل لأجله",
                "A Place to Grow in Faith, Community & Service"
              )}
            </motion.p>

            <motion.div
              variants={itemFade}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
            >
              <Link href="/first-visit">
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" className="w-full sm:w-auto text-base px-8 shadow-lg btn-glow bg-primary hover:bg-primary/90">
                    {t("خطط لزيارتك", "Plan Your Visit")}
                  </Button>
                </motion.div>
              </Link>
              <Link href="/sermons">
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-base bg-white/10 text-white border-white/30 hover:bg-white/25 hover:text-white gap-2">
                    <PlayCircle className="h-5 w-5" />
                    {t("شاهد العظة الأخيرة", "Watch Latest Sermon")}
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/40 flex justify-center pt-2">
            <div className="w-1 h-2.5 bg-white/60 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Stats Strip */}
      <section className="bg-primary py-14">
        <div className="container px-4">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-4 w-full"
          >
            <div />
            <StatItem value={100} suffix="+" label={t("مجموعة صغيرة", "Small Groups")} />
            <StatItem value={56} suffix="+" label={t("سنة من الخدمة", "Years of Ministry")} />
            <div />
          </motion.div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-24 bg-background">
        <div className="container px-4 text-center max-w-3xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="space-y-6"
          >
            <motion.div variants={itemFade}>
              <span className="inline-block w-12 h-1 rounded-full bg-accent mb-4" />
              <h2 className="text-4xl font-bold text-foreground">
                {t("أهلاً بك في بيتك", "Welcome Home")}
              </h2>
            </motion.div>
            <motion.p variants={itemFade} className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
              {t(
                "مهما كانت خلفيتك أو قصتك، لك مكان هنا في كنيسة الإيمان.\nرسالتنا هي عبادة الرب وخدمة شعبه بالمنطقة المحيطة والمناطق المختلفة؛ وذلك لربحهم للمسيح وتنميتهم التنمية المتكاملة وتسديد احتياجاتهم الروحية والنفسية والجسدية\nمن خلال المجموعات الصغيرة والإجتماعات العامة.\nشعارنا: نَنْمُو فِي كُلِّ شَيْءٍ (أف 4: 15)",
                "No matter your background or story, there is a place for you here at Faith Church.\nOur mission is to worship the Lord and serve His people in the surrounding and various areas; winning them to Christ, developing them holistically, and meeting their spiritual, psychological, and physical needs\nthrough small groups and public gatherings.\nOur motto: We Grow in All Things (Eph 4:15)"
              )}
            </motion.p>
            <motion.div variants={itemFade}>
              <Link href="/first-visit">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white transition-all">
                  {t("تعرّف علينا أكثر", "Learn More About Us")}
                  <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <FeatureCard
              icon={<Music className="h-8 w-8 text-primary" />}
              iconBg="bg-primary/10"
              title={t("العبادة", "Worship")}
              description={t("أوقات عبادة حية ومملوءة بالروح القدس", "Spirit-filled worship services every week")}
            />
            <FeatureCard
              icon={<BookOpen className="h-8 w-8 text-secondary" />}
              iconBg="bg-secondary/10"
              title={t("التعليم الكتابي", "Biblical Teaching")}
              description={t("تعليم كتابي عميق وعملي في الحياة اليومية", "Deep, practical Bible teaching for daily life")}
            />
            <FeatureCard
              icon={<Users className="h-8 w-8 text-accent" />}
              iconBg="bg-accent/10"
              title={t("المجتمع", "Community")}
              description={t("علاقات حقيقية ومجموعات صغيرة متنوعة", "Real relationships and small groups")}
            />
            <FeatureCard
              icon={<Baby className="h-8 w-8 text-primary" />}
              iconBg="bg-primary/10"
              title={t("خدمة الأطفال", "Kids Ministry")}
              description={t("برامج آمنة وممتعة لجميع الأعمار (٤-١٢)", "Safe, fun programs for ages 4–12")}
            />
          </motion.div>
        </div>
      </section>

      {/* Ministries Section */}
      <section className="py-24 bg-background">
        <div className="container px-4">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <motion.div variants={itemFade}>
              <span className="inline-block w-12 h-1 rounded-full bg-secondary mb-4" />
              <h2 className="text-4xl font-bold text-foreground mb-4">{t("الخدمات", "Ministries")}</h2>
              <p className="text-muted-foreground text-lg">
                {t("اكتشف المكان المناسب لك للنمو والخدمة", "Find your place to grow and serve")}
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <MinistryCard
              href="/kids"
              image={kidsImg}
              title={t("الأطفال", "Kids")}
              description={t("مدارس الأحد ومجموعات صغيرة (٤-١٢ سنة)", "Sunday school & small groups (ages 4–12)")}
              color="bg-primary"
            />
            <MinistryCard
              href="/students"
              image={studentsImg}
              title={t("الشباب", "Students")}
              description={t("طلبة الجامعة والتلمذة والنمو الروحي", "University students & discipleship")}
              color="bg-accent"
            />
            <MinistryCard
              href="/adults"
              image={adultsImg}
              title={t("البالغين", "Adults")}
              description={t("خدمات الرجال، السيدات، والمتزوجين", "Men's, Women's, and Married Couples")}
              color="bg-secondary"
            />
          </motion.div>
        </div>
      </section>

      {/* Latest Sermon & Events */}
      <section className="py-24 bg-muted/20">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Latest Sermon */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-1 rounded-full bg-accent" />
                <h2 className="text-2xl font-bold text-foreground">{t("العظة الأخيرة", "Latest Sermon")}</h2>
              </div>
              <Card className="overflow-hidden border-0 shadow-lg">
                {sermonLoading ? (
                  <div className="aspect-video bg-slate-100 flex items-center justify-center">
                    <Loader2 className="w-10 h-10 animate-spin text-primary" />
                  </div>
                ) : latestSermon ? (
                  <>
                    <div className="aspect-video bg-black">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${latestSermon.id}?rel=0&modestbranding=1`}
                        title={latestSermon.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin"
                        className="w-full h-full"
                      />
                    </div>
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-50 text-red-600 text-xs font-semibold">
                              <Youtube className="h-3 w-3" />
                              YouTube
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                              {t("جديد", "New")}
                            </span>
                          </div>
                          <CardTitle className="text-lg leading-snug line-clamp-2">
                            {latestSermon.title}
                          </CardTitle>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
                          {new Date(latestSermon.published).toLocaleDateString(
                            t("ar-EG", "en-US"),
                            { year: "numeric", month: "short", day: "numeric" }
                          )}
                        </span>
                      </div>
                    </CardHeader>
                  </>
                ) : (
                  <div className="aspect-video bg-slate-100 flex items-center justify-center text-muted-foreground">
                    <PlayCircle className="w-12 h-12 opacity-30" />
                  </div>
                )}
              </Card>
              <Link href="/sermons">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white transition-all gap-2">
                  {t("كل العظات", "All Sermons")}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </Button>
              </Link>
            </motion.div>

            {/* Upcoming Events */}
            <motion.div
              variants={fadeUp}
              custom={0.15}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="lg:col-span-5 space-y-6"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-1 rounded-full bg-secondary" />
                  <h2 className="text-2xl font-bold text-foreground">{t("فعاليات قادمة", "Upcoming Events")}</h2>
                </div>
                <Link href="/events" className="text-primary font-medium flex items-center gap-1 hover:underline text-sm animated-underline">
                  {t("عرض الكل", "View All")}
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Link>
              </div>

              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4"
              >
                {[
                  { titleAr: "اجتماع الصلاة", titleEn: "Prayer Meeting", dateAr: "الجمعة، ٤ مساءً", dateEn: "Friday, 4 PM", color: "bg-primary/10 text-primary", month: "APR", day: "11" },
                  { titleAr: "مؤتمر الأسرة", titleEn: "Family Conference", dateAr: "٢٠-٢٢ يونيو", dateEn: "June 20–22", color: "bg-accent/10 text-accent", month: "JUN", day: "20" },
                  { titleAr: "كامب الشباب", titleEn: "Youth Camp", dateAr: "١٥-١٨ يوليو", dateEn: "July 15–18", color: "bg-secondary/10 text-secondary", month: "JUL", day: "15" },
                ].map((event, i) => (
                  <motion.div
                    key={i}
                    variants={itemFade}
                    whileHover={{ x: 4, boxShadow: "0 8px 30px rgba(0,0,0,0.1)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <Card className="border border-border/60 hover:border-primary/30 transition-colors">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-xl ${event.color} flex flex-col items-center justify-center shrink-0`}>
                          <span className="text-xs font-bold uppercase tracking-wider leading-none">{event.month}</span>
                          <span className="text-xl font-bold leading-none mt-0.5">{event.day}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{t(event.titleAr, event.titleEn)}</h3>
                          <p className="text-sm text-muted-foreground">{t(event.dateAr, event.dateEn)}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground ms-auto rtl:rotate-180 shrink-0" />
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quote / Scripture Section */}
      <section className="py-20 bg-background">
        <div className="container px-4 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="text-8xl text-primary/10 font-serif leading-none select-none mb-2">"</div>
            <blockquote className="text-2xl md:text-3xl font-semibold text-foreground leading-relaxed">
              {t(
                "لأَنَّهُ هكَذَا أَحَبَّ اللهُ الْعَالَمَ حَتَّى بَذَلَ ابْنَهُ الْوَحِيدَ",
                "For God so loved the world that He gave His one and only Son"
              )}
            </blockquote>
            <p className="mt-4 text-accent font-medium">{t("يوحنا ٣: ١٦", "John 3:16")}</p>
          </motion.div>
        </div>
      </section>

      {/* Location CTA */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Background decorative elements */}
        <motion.div
          className="absolute top-0 end-0 w-96 h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 start-0 w-72 h-72 rounded-full bg-accent/15 blur-3xl pointer-events-none"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />

        <div className="container px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="text-center mb-12"
            >
              <motion.div variants={itemFade}>
                <MapPin className="w-12 h-12 text-accent mx-auto mb-4" />
              </motion.div>
              <motion.h2 variants={itemFade} className="text-4xl font-bold mb-4">
                {t("انضم إلينا هذا الأسبوع", "Join Us This Week")}
              </motion.h2>
              <motion.p variants={itemFade} className="text-slate-300 text-lg">
                {t("ميدان فيكتوريا، شبرا، القاهرة", "Victoria Square, Shubra, Cairo")}
              </motion.p>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto"
            >
              {[
                { dayAr: "الجمعة", dayEn: "Friday", timeAr: "٤ مساءً", timeEn: "4 PM", labelAr: "اجتماع الشباب", labelEn: "Youth Service" },
                { dayAr: "الأحد", dayEn: "Sunday", timeAr: "٧ مساءً", timeEn: "7 PM", labelAr: "اجتماع الأحد", labelEn: "Sunday Service" },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  variants={scaleIn}
                  whileHover={{ y: -6, backgroundColor: "rgba(255,255,255,0.12)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="bg-white/8 rounded-2xl p-6 text-center border border-white/10 cursor-default"
                >
                  <div className="text-accent font-bold text-lg mb-1">{t(s.dayAr, s.dayEn)}</div>
                  <div className="text-4xl font-bold mb-2">{t(s.timeAr, s.timeEn)}</div>
                  <div className="text-slate-300 text-sm">{t(s.labelAr, s.labelEn)}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mt-10"
            >
              <Link href="/contact">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                  <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/25 hover:text-white text-base px-8">
                    {t("احصل على الاتجاهات", "Get Directions")}
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, iconBg, title, description }: { icon: React.ReactNode; iconBg: string; title: string; description: string }) {
  return (
    <motion.div variants={itemFade}>
      <motion.div
        whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Card className="border border-border/60 hover:border-primary/30 transition-colors h-full">
          <CardContent className="pt-8 pb-6 px-6 text-center space-y-4">
            <motion.div
              className={`mx-auto w-16 h-16 ${iconBg} rounded-2xl flex items-center justify-center`}
              whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
              transition={{ duration: 0.4 }}
            >
              {icon}
            </motion.div>
            <h3 className="text-xl font-bold text-foreground">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

function MinistryCard({ image, title, description, href, color }: { image: string; title: string; description: string; href: string; color: string }) {
  return (
    <motion.div variants={itemFade}>
      <Link href={href}>
        <motion.div
          whileHover={{ y: -8 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="group cursor-pointer"
        >
          <Card className="overflow-hidden border-0 shadow-md hover:shadow-2xl transition-shadow duration-400 h-full">
            <div className="h-56 overflow-hidden relative">
              <motion.img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className={`absolute bottom-4 start-4 px-3 py-1 rounded-full text-white text-xs font-bold ${color}`}>
                {title}
              </div>
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
              <div className="flex items-center gap-1 mt-4 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                <span>{title === "الأطفال" || title === "Kids" ? "اكتشف" : title === "الشباب" || title === "Students" ? "انضم" : "تعرّف"}{" "}</span>
                <ArrowRight className="h-4 w-4 rtl:rotate-180" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Link>
    </motion.div>
  );
}
