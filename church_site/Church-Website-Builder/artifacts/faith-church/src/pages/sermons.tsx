import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { PlayCircle, Search, ExternalLink, Youtube, Loader2, RefreshCw, Radio, Clapperboard } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface YoutubeVideo {
  id: string;
  title: string;
  published: string;
  thumbnail: string;
  description: string;
  url: string;
  views: string;
  type?: "video" | "live" | "premiere";
  liveBroadcastContent?: string;
}

const itemFade = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("ar-EG", {
      year: "numeric", month: "long", day: "numeric",
    });
  } catch {
    return iso;
  }
}

function formatDateEn(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric",
    });
  } catch {
    return iso;
  }
}

function formatViews(views: string) {
  const n = parseInt(views, 10);
  if (isNaN(n)) return "";
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export default function Sermons() {
  const { t, language } = useLanguage();
  const [videos, setVideos] = useState<YoutubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<YoutubeVideo | null>(null);
  const [filter, setFilter] = useState<"all" | "live" | "premiere" | "video">("all");

  const fetchVideos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/youtube/videos");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setVideos(data.videos ?? []);
      if (data.videos?.length > 0) setSelected(data.videos[0]);
    } catch {
      setError(t("حدث خطأ أثناء تحميل الفيديوهات", "Failed to load videos"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchVideos(); }, []);

  const filtered = videos.filter(v => {
    const matchesSearch = v.title.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || v.type === filter;
    return matchesSearch && matchesFilter;
  });

  const liveCount = videos.filter(v => v.type === "live").length;
  const premiereCount = videos.filter(v => v.type === "premiere").length;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="bg-primary py-20">
        <div className="container px-4 text-center max-w-3xl mx-auto space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-white text-sm font-medium mb-4">
              <Youtube className="h-4 w-4" />
              {t("القناة الرسمية على يوتيوب", "Official YouTube Channel")}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {t("العظات والفيديوهات", "Sermons & Videos")}
            </h1>
            <p className="text-lg text-blue-100 mt-3">
              {t(
                "استمع وشاهد رسائل من كلمة الله لتشجيعك وبنائك الروحي",
                "Watch messages from God's Word to encourage and build you up spiritually"
              )}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container px-4 max-w-7xl mx-auto">

          {/* Search + Channel link */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 mb-10"
          >
            <div className="relative flex-1">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                className="ps-10 h-12 bg-white"
                placeholder={t("ابحث عن فيديو...", "Search videos...")}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <a
              href="https://www.youtube.com/@Faithchegypt"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="h-12 px-6 gap-2 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400">
                <Youtube className="h-5 w-5" />
                {t("القناة على يوتيوب", "YouTube Channel")}
                <ExternalLink className="h-4 w-4 opacity-60" />
              </Button>
            </a>
          </motion.div>

          {/* Filter tabs */}
          {!loading && !error && videos.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {([
                { key: "all", labelAr: `الكل (${videos.length})`, labelEn: `All (${videos.length})` },
                { key: "video", labelAr: `فيديوهات`, labelEn: `Videos` },
                ...(liveCount > 0 ? [{ key: "live", labelAr: `بث مباشر (${liveCount})`, labelEn: `Live (${liveCount})` }] : []),
                ...(premiereCount > 0 ? [{ key: "premiere", labelAr: `عرض أول (${premiereCount})`, labelEn: `Premieres (${premiereCount})` }] : []),
              ] as { key: string; labelAr: string; labelEn: string }[]).map(f => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key as any)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                    filter === f.key
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-slate-600 border-slate-200 hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {t(f.labelAr, f.labelEn)}
                </button>
              ))}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-32 gap-4 text-muted-foreground">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p>{t("جاري تحميل الفيديوهات...", "Loading videos...")}</p>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <p className="text-muted-foreground">{error}</p>
              <Button variant="outline" onClick={fetchVideos} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                {t("حاول مرة أخرى", "Try Again")}
              </Button>
            </div>
          )}

          {/* Content */}
          {!loading && !error && filtered.length > 0 && (
            <>
              {/* Featured Video Player */}
              {selected && !search && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="mb-12"
                >
                  <h2 className="text-2xl font-bold text-foreground mb-5 flex items-center gap-2">
                    <span className="w-1 h-6 rounded-full bg-accent inline-block" />
                    {t("أحدث فيديو", "Latest Video")}
                  </h2>
                  <Card className="overflow-hidden border-0 shadow-xl">
                    <div className="grid lg:grid-cols-[1fr_360px] gap-0">
                      {/* Embed */}
                      <div className="aspect-video bg-black">
                        <iframe
                          key={selected.id}
                          src={`https://www.youtube-nocookie.com/embed/${selected.id}?rel=0&modestbranding=1`}
                          title={selected.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          referrerPolicy="strict-origin-when-cross-origin"
                          className="w-full h-full"
                        />
                      </div>
                      {/* Info */}
                      <div className="p-6 flex flex-col justify-between bg-white border-t lg:border-t-0 lg:border-s border-border">
                        <div>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 text-xs font-semibold rounded-full mb-3">
                            <Youtube className="h-3.5 w-3.5" />
                            {t("بث مباشر / تسجيل", "YouTube")}
                          </span>
                          <h3 className="text-xl font-bold text-foreground mb-3 leading-snug">
                            {selected.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            {language === "ar" ? formatDate(selected.published) : formatDateEn(selected.published)}
                          </p>
                          {selected.views && (
                            <p className="text-sm text-muted-foreground">
                              {t(`${formatViews(selected.views)} مشاهدة`, `${formatViews(selected.views)} views`)}
                            </p>
                          )}
                          {selected.description && (
                            <p className="text-sm text-muted-foreground mt-4 line-clamp-4 leading-relaxed">
                              {selected.description.split("\n")[0]}
                            </p>
                          )}
                        </div>
                        <a
                          href={selected.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4"
                        >
                          <Button className="w-full gap-2 bg-red-600 hover:bg-red-700 text-white">
                            <Youtube className="h-4 w-4" />
                            {t("شاهد على يوتيوب", "Watch on YouTube")}
                          </Button>
                        </a>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Video Grid */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 rounded-full bg-primary inline-block" />
                  {search
                    ? t(`نتائج البحث (${filtered.length})`, `Search Results (${filtered.length})`)
                    : t("كل الفيديوهات", "All Videos")
                  }
                </h2>
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                >
                  {filtered.map((video) => (
                    <VideoCard
                      key={video.id}
                      video={video}
                      language={language}
                      isSelected={selected?.id === video.id && !search}
                      onClick={() => {
                        setSelected(video);
                        setSearch("");
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    />
                  ))}
                </motion.div>
              </div>
            </>
          )}

          {/* No results */}
          {!loading && !error && filtered.length === 0 && search && (
            <div className="text-center py-24 text-muted-foreground">
              <PlayCircle className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p>{t("لا توجد نتائج لـ", "No results for")} "{search}"</p>
              <Button variant="ghost" onClick={() => setSearch("")} className="mt-3">
                {t("مسح البحث", "Clear Search")}
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function VideoCard({
  video,
  language,
  isSelected,
  onClick,
}: {
  video: YoutubeVideo;
  language: string;
  isSelected: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div variants={itemFade}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={onClick}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-colors ${
          isSelected ? "border-primary shadow-lg" : "border-transparent hover:border-primary/30"
        } bg-white shadow-sm hover:shadow-md`}
      >
        {/* Thumbnail */}
        <div className="aspect-video bg-slate-900 relative overflow-hidden">
          <img
            src={video.thumbnail}
            alt={video.title}
            className={`w-full h-full object-cover transition-transform duration-500 ${hovered ? "scale-105" : "scale-100"}`}
            loading="lazy"
          />
          <div className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity ${hovered ? "opacity-100" : "opacity-0"}`}>
            <motion.div
              initial={false}
              animate={hovered ? { scale: 1 } : { scale: 0.8 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <PlayCircle className="h-14 w-14 text-white drop-shadow-lg" />
            </motion.div>
          </div>
          {/* Type badge */}
          {video.type === "live" && (
            <div className="absolute top-2 end-2 flex items-center gap-1 px-2 py-0.5 bg-red-600 text-white text-xs font-bold rounded-full">
              <Radio className="h-3 w-3" />
              {language === "ar" ? "مباشر" : "Live"}
            </div>
          )}
          {video.type === "premiere" && (
            <div className="absolute top-2 end-2 flex items-center gap-1 px-2 py-0.5 bg-orange-500 text-white text-xs font-bold rounded-full">
              <Clapperboard className="h-3 w-3" />
              {language === "ar" ? "عرض أول" : "Premiere"}
            </div>
          )}
          {isSelected && (
            <div className="absolute top-2 start-2 px-2 py-0.5 bg-primary text-white text-xs font-bold rounded-full">
              {language === "ar" ? "جاري التشغيل" : "Playing"}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-3">
          <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2 mb-1.5">
            {video.title}
          </h3>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {language === "ar" ? formatDate(video.published) : formatDateEn(video.published)}
            </span>
            {video.views && video.views !== "0" && (
              <span>{formatViews(video.views)} {language === "ar" ? "مشاهدة" : "views"}</span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
