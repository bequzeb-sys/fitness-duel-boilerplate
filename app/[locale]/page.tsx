import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale?: string }>;
}): Promise<Metadata> {
  const { locale: resolvedLocale } = await params;
  const locale =
    resolvedLocale && routing.locales.includes(resolvedLocale as "fr" | "en")
      ? resolvedLocale
      : routing.defaultLocale;

  const t = await getTranslations({ locale, namespace: "landing" });

  return {
    title: {
      default: t("heroHeadline"),
      template: `%s | Fitness Duel`,
    },
    description: t("heroSubtitle"),
    keywords: [
      "fitness",
      "défis sportifs",
      "classement fitness",
      "coach ia",
      "entraînement",
      "pompes",
      "squats",
      "gamification",
    ],
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_GB",
      siteName: "Fitness Duel",
      title: t("heroHeadline"),
      description: t("heroSubtitle"),
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Fitness Duel",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("heroHeadline"),
      description: t("heroSubtitle"),
      images: ["/og-image.png"],
    },
    robots: { index: true, follow: true },
  };
}

const FAQ_SCHEMA = [
  {
    question: "faqFreeQ",
    answer: "faqFreeA",
  },
  {
    question: "faqStartQ",
    answer: "faqStartA",
  },
  {
    question: "faqOfflineQ",
    answer: "faqOfflineA",
  },
  {
    question: "faqDataQ",
    answer: "faqDataA",
  },
  {
    question: "faqFriendsQ",
    answer: "faqFriendsA",
  },
  {
    question: "faqXpQ",
    answer: "faqXpA",
  },
];

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale?: string }>;
}) {
  const { locale: resolvedLocale } = await params;
  const locale =
    resolvedLocale && routing.locales.includes(resolvedLocale as "fr" | "en")
      ? resolvedLocale
      : routing.defaultLocale;

  const t = await getTranslations({ locale, namespace: "landing" });

  const baseUrl = process.env.APP_URL ?? "https://fitness-duel.app";
  const currentLocale = locale ?? "fr";
  const loginHref = `/${currentLocale}/auth/login`;
  const registerHref = `/${currentLocale}/auth/register`;

  return (
    <>
      {/* FAQPage JSON-LD schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ_SCHEMA.map((f) => ({
              "@type": "Question",
              name: t(f.question),
              acceptedAnswer: {
                "@type": "Answer",
                text: t(f.answer),
              },
            })),
          }),
        }}
      />

      <div className="bg-[#050911] text-sans">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1b2333] bg-[#050911]/90 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-xl">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8" />
                  <path d="m16 16 6-6" />
                  <path d="m8 8 6-6" />
                  <path d="m9 7 8 8" />
                  <path d="m21 11-8-8" />
                </svg>
              </div>
              <span className="font-display text-lg font-bold text-white">Fitness Duel</span>
            </div>
            <a
              href={loginHref}
              className="text-sm text-slate-400 hover:text-white transition-colors px-4 py-2"
            >
              {t("navLogin")}
            </a>
          </div>
        </nav>

        {/* Hero */}
        <section className="pt-20 pb-24 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-400 text-xs font-medium mb-8">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /></svg>
              Coach IA intégré — Fonctionne hors ligne
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              {t("heroHeadline")}
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
              {t("heroSubtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={registerHref}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-[0_0_30px_rgba(0,102,255,0.3)]"
              >
                {t("heroCta")}
              </a>
              <a
                href="#features"
                className="px-8 py-4 border border-[#1b2333] text-slate-300 font-medium rounded-xl hover:border-blue-500/50 hover:text-white transition-all"
              >
                {t("heroCtaSecondary")}
              </a>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-24 px-6 border-t border-[#1b2333]">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-white text-center mb-4">
              {t("featuresTitle")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {/* Challenges */}
              <div className="p-6 rounded-2xl border border-[#1b2333] bg-[#070b12] hover:border-blue-500/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8" />
                    <path d="m16 16 6-6" />
                    <path d="m8 8 6-6" />
                    <path d="m9 7 8 8" />
                    <path d="m21 11-8-8" />
                  </svg>
                </div>
                <h3 className="font-bold text-white mb-2">{t("featureChallengesTitle")}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{t("featureChallengesDesc")}</p>
              </div>
              {/* XP & Badges */}
              <div className="p-6 rounded-2xl border border-[#1b2333] bg-[#070b12] hover:border-blue-500/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <h3 className="font-bold text-white mb-2">{t("featureXpTitle")}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{t("featureXpDesc")}</p>
              </div>
              {/* Coach IA */}
              <div className="p-6 rounded-2xl border border-[#1b2333] bg-[#070b12] hover:border-blue-500/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-purple-600/10 flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-white mb-2">{t("featureCoachTitle")}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{t("featureCoachDesc")}</p>
              </div>
              {/* Rankings */}
              <div className="p-6 rounded-2xl border border-[#1b2333] bg-[#070b12] hover:border-blue-500/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                  </svg>
                </div>
                <h3 className="font-bold text-white mb-2">{t("featureRankingsTitle")}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{t("featureRankingsDesc")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-24 px-6 border-t border-[#1b2333] bg-[#070b12]">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-white text-center mb-16">
              {t("howItWorksTitle")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-blue-600/20 border border-blue-600/30 flex items-center justify-center mx-auto mb-6">
                  <span className="font-display text-xl font-black text-blue-400">1</span>
                </div>
                <h3 className="font-bold text-white mb-3">{t("step1Title")}</h3>
                <p className="text-sm text-slate-400">{t("step1Desc")}</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center mx-auto mb-6">
                  <span className="font-display text-xl font-black text-cyan-400">2</span>
                </div>
                <h3 className="font-bold text-white mb-3">{t("step2Title")}</h3>
                <p className="text-sm text-slate-400">{t("step2Desc")}</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-purple-600/20 border border-purple-600/30 flex items-center justify-center mx-auto mb-6">
                  <span className="font-display text-xl font-black text-purple-400">3</span>
                </div>
                <h3 className="font-bold text-white mb-3">{t("step3Title")}</h3>
                <p className="text-sm text-slate-400">{t("step3Desc")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Challenge categories */}
        <section className="py-24 px-6 border-t border-[#1b2333]">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="font-display text-3xl font-bold text-white mb-2">{t("challengesTitle")}</h2>
            <p className="text-slate-400 mb-12">{t("challengesSubtitle")}</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: t("challengeMusculation"), desc: t("challengeMusculationDesc"), color: "from-blue-600/20 to-blue-600/5", border: "hover:border-blue-500/40", accent: "text-blue-400" },
                { title: t("challengeEndurance"), desc: t("challengeEnduranceDesc"), color: "from-orange-600/20 to-orange-600/5", border: "hover:border-orange-500/40", accent: "text-orange-400" },
                { title: t("challengeGainage"), desc: t("challengeGainageDesc"), color: "from-cyan-500/20 to-cyan-500/5", border: "hover:border-cyan-500/40", accent: "text-cyan-400" },
                { title: t("challengeSquats"), desc: t("challengeSquatsDesc"), color: "from-purple-600/20 to-purple-600/5", border: "hover:border-purple-500/40", accent: "text-purple-400" },
              ].map((cat) => (
                <div
                  key={cat.title}
                  className={`p-5 rounded-xl bg-gradient-to-br ${cat.color} border border-[#1b2333] ${cat.border} transition-all`}
                >
                  <h3 className={`font-bold mb-2 ${cat.accent}`}>{cat.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{cat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* XP & Badges */}
        <section className="py-24 px-6 border-t border-[#1b2333] bg-[#070b12]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl font-bold text-white mb-2">{t("xpTitle")}</h2>
            <p className="text-slate-400 mb-12">{t("xpSubtitle")}</p>
            <div className="flex justify-center gap-6">
              {[
                { label: t("xpBadgeStandard"), color: "text-slate-400", border: "border-slate-600" },
                { label: t("xpBadgeRare"), color: "text-blue-400", border: "border-blue-500" },
                { label: t("xpBadgeMythical"), color: "text-purple-400", border: "border-purple-500" },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className={`px-5 py-3 rounded-xl border ${badge.border} bg-[#050911]/60 ${badge.color} text-sm font-semibold`}
                >
                  {badge.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Coach IA */}
        <section className="py-24 px-6 border-t border-[#1b2333]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl font-bold text-white mb-2">{t("coachTitle")}</h2>
            <p className="text-slate-400 mb-12">{t("coachSubtitle")}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[t("coachFeature1"), t("coachFeature2"), t("coachFeature3")].map((feat) => (
                <div key={feat} className="p-4 rounded-xl border border-[#1b2333] bg-[#070b12]">
                  <p className="text-sm text-slate-300">{feat}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 px-6 border-t border-[#1b2333] bg-[#070b12]">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-white text-center mb-12">
              {t("faqTitle")}
            </h2>
            <div className="space-y-6">
              {FAQ_SCHEMA.map((f) => (
                <div key={f.question} className="p-6 rounded-xl border border-[#1b2333] bg-[#050911]">
                  <h3 className="font-semibold text-white mb-3">{t(f.question)}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{t(f.answer)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6 text-center border-t border-[#1b2333]">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-white mb-4">{t("ctaTitle")}</h2>
            <p className="text-slate-400 mb-10">{t("ctaSubtitle")}</p>
            <a
              href={registerHref}
              className="inline-block px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-[0_0_40px_rgba(0,102,255,0.3)] text-lg"
            >
              {t("ctaButton")}
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#1b2333] py-8 px-6">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-1.5 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-lg">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8" />
                  <path d="m16 16 6-6" />
                  <path d="m8 8 6-6" />
                  <path d="m9 7 8 8" />
                  <path d="m21 11-8-8" />
                </svg>
              </div>
              <span className="font-display text-sm font-bold text-white">Fitness Duel</span>
            </div>
            <div className="flex items-center gap-6 text-xs text-slate-500">
              <a href={`${baseUrl}/privacy`} className="hover:text-slate-300 transition-colors">{t("footerPrivacy")}</a>
              <a href={`${baseUrl}/terms`} className="hover:text-slate-300 transition-colors">{t("footerTerms")}</a>
              <a href={`${baseUrl}/contact`} className="hover:text-slate-300 transition-colors">{t("footerContact")}</a>
            </div>
            <p className="text-xs text-slate-600">{t("footerCopyright")}</p>
        </div>
        </footer>
      </div>
    </>
  );
}
