import { useState, useEffect } from "react";
import type { CSSProperties, ReactNode } from "react";

// ── Design tokens ──────────────────────────────────────────────────────
const C = {
      bg: "#EEEBE6",
      text: "#3B230A",
      accent: "#F05E20",
      cta: "#45B251",
      ctaShadow: "#2A6E32",
      beige: "#F5F0E8",
      beigeMid: "#E8E0D5",
} as const;

// ── Responsive utilities ───────────────────────────────────────────────
function useMediaQuery(query: string) {
      const [matches, setMatches] = useState(false);

      useEffect(() => {
            const media = window.matchMedia(query);
            if (media.matches !== matches) {
                  setMatches(media.matches);
            }
            const listener = () => setMatches(media.matches);
            media.addEventListener("change", listener);
            return () => media.removeEventListener("change", listener);
      }, [matches, query]);

      return matches;
}

// ── Grain overlay (SVG feTurbulence inline) ────────────────────────────
function Grain() {
      return (
            <svg
                  aria-hidden="true"
                  style={{
                        position: "fixed",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        pointerEvents: "none",
                        zIndex: 9999,
                        opacity: 0.6,
                        mixBlendMode: "overlay",
                  }}
            >
                  <filter id="grain-filter">
                        <feTurbulence
                              type="fractalNoise"
                              baseFrequency="0.72"
                              numOctaves="4"
                              stitchTiles="stitch"
                        />
                        <feColorMatrix type="saturate" values="0" />
                  </filter>
                  <rect
                        width="100%"
                        height="100%"
                        filter="url(#grain-filter)"
                  />
            </svg>
      );
}

// ── 3D CTA Button ──────────────────────────────────────────────────────
function CTAButton({
      children,
      onClick,
      style,
}: {
      children: ReactNode;
      onClick?: () => void;
      style?: CSSProperties;
}) {
      const [pressed, setPressed] = useState(false);
      return (
            <button
                  onClick={onClick}
                  onMouseDown={() => setPressed(true)}
                  onMouseUp={() => setPressed(false)}
                  onMouseLeave={() => setPressed(false)}
                  onTouchStart={() => setPressed(true)}
                  onTouchEnd={() => setPressed(false)}
                  style={{
                        backgroundColor: C.cta,
                        color: "#fff",
                        border: "none",
                        borderRadius: 10,
                        padding: "14px 28px",
                        fontFamily: "'Roboto Mono', monospace",
                        fontSize: 13,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        cursor: "pointer",
                        transform: pressed
                              ? "translateY(3px)"
                              : "translateY(0)",
                        boxShadow: pressed ? "none" : `0 3px 0 ${C.ctaShadow}`,
                        transition: "transform 80ms ease, box-shadow 80ms ease",
                        whiteSpace: "nowrap",
                        ...style,
                  }}
            >
                  {children}
            </button>
      );
}

// ── Ghost Button ───────────────────────────────────────────────────────
function GhostButton({
      children,
      onClick,
      light = false,
      style,
}: {
      children: ReactNode;
      onClick?: () => void;
      light?: boolean;
      style?: CSSProperties;
}) {
      const color = light ? C.bg : C.text;
      return (
            <button
                  onClick={onClick}
                  style={{
                        backgroundColor: "transparent",
                        color,
                        border: `1.5px solid ${color}`,
                        borderRadius: 10,
                        padding: "13px 28px",
                        fontFamily: "'Roboto Mono', monospace",
                        fontSize: 13,
                        fontWeight: 500,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        cursor: "pointer",
                        opacity: 0.75,
                        whiteSpace: "nowrap",
                        transition: "opacity 0.18s ease",
                        ...style,
                  }}
            >
                  {children}
            </button>
      );
}

// ── Phone mockup placeholder ───────────────────────────────────────────
function PhoneMockup({ dark = false }: { dark?: boolean }) {
      const bg = dark ? "#1E0E02" : "#F5F0E8";
      const bar = dark ? "rgba(238,235,230,0.07)" : "rgba(59,35,10,0.07)";
      const line = dark ? "rgba(238,235,230,0.11)" : "rgba(59,35,10,0.10)";
      const borderCol = dark ? "rgba(238,235,230,0.16)" : C.text;
      const shadow = dark
            ? "4px 5px 0 rgba(238,235,230,0.09)"
            : `4px 5px 0 ${C.text}`;

      return (
            <div
                  style={{
                        width: 178,
                        height: 356,
                        borderRadius: 28,
                        border: `2px solid ${borderCol}`,
                        backgroundColor: bg,
                        position: "relative",
                        boxShadow: shadow,
                        overflow: "hidden",
                        flexShrink: 0,
                  }}
            >
                  {/* Status bar */}
                  <div
                        style={{
                              height: 40,
                              backgroundColor: dark
                                    ? "rgba(0,0,0,0.28)"
                                    : C.beigeMid,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                        }}
                  >
                        <div
                              style={{
                                    width: 58,
                                    height: 13,
                                    borderRadius: 7,
                                    backgroundColor: dark
                                          ? "rgba(238,235,230,0.18)"
                                          : "rgba(59,35,10,0.18)",
                              }}
                        />
                  </div>

                  {/* Fake UI skeleton */}
                  <div style={{ padding: "14px 14px 0" }}>
                        {/* Lantern placeholder */}
                        <div
                              style={{
                                    height: 90,
                                    borderRadius: 14,
                                    backgroundColor: dark
                                          ? "rgba(240,94,32,0.10)"
                                          : "rgba(240,94,32,0.07)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginBottom: 14,
                              }}
                        >
                              <div
                                    style={{
                                          width: 46,
                                          height: 46,
                                          borderRadius: "50%",
                                          backgroundColor: dark
                                                ? "rgba(240,94,32,0.22)"
                                                : "rgba(240,94,32,0.12)",
                                    }}
                              />
                        </div>

                        {/* Skeleton lines */}
                        {[82, 62, 48].map((w, i) => (
                              <div
                                    key={i}
                                    style={{
                                          height: 8,
                                          borderRadius: 4,
                                          width: `${w}%`,
                                          backgroundColor: line,
                                          marginBottom: 8,
                                    }}
                              />
                        ))}

                        {/* Skeleton cards */}
                        {[1, 2].map((i) => (
                              <div
                                    key={i}
                                    style={{
                                          height: 44,
                                          borderRadius: 10,
                                          backgroundColor: bar,
                                          marginBottom: 8,
                                    }}
                              />
                        ))}

                        {/* Skeleton row */}
                        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                              {[55, 35].map((w, i) => (
                                    <div
                                          key={i}
                                          style={{
                                                height: 34,
                                                borderRadius: 8,
                                                width: `${w}%`,
                                                backgroundColor: bar,
                                          }}
                                    />
                              ))}
                        </div>
                  </div>

                  {/* Label */}
                  <div
                        style={{
                              position: "absolute",
                              bottom: 14,
                              left: 0,
                              right: 0,
                              textAlign: "center",
                              fontFamily: "'Roboto Mono', monospace",
                              fontSize: 8,
                              textTransform: "uppercase",
                              letterSpacing: "0.14em",
                              color: dark
                                    ? "rgba(238,235,230,0.22)"
                                    : "rgba(59,35,10,0.18)",
                        }}
                  >
                        Aperçu à venir
                  </div>
            </div>
      );
}

// ── Navbar ─────────────────────────────────────────────────────────────
function Navbar() {
      const [scrolled, setScrolled] = useState(false);
      const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
      const isMobile = useMediaQuery("(max-width: 768px)");

      useEffect(() => {
            const handler = () => setScrolled(window.scrollY > 40);
            window.addEventListener("scroll", handler, { passive: true });
            return () => window.removeEventListener("scroll", handler);
      }, []);

      const navItems = [
            { label: "Fonctionnalités", href: "#features" },
            { label: "Parcours", href: "#paths" },
            { label: "Tarifs", href: "#pricing" },
      ];

      return (
            <nav
                  style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 100,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: isMobile ? "14px 24px" : "18px 56px",
                        backgroundColor: scrolled
                              ? "rgba(238,235,230,0.86)"
                              : "transparent",
                        backdropFilter: scrolled ? "blur(18px)" : "none",
                        WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
                        borderBottom: scrolled
                              ? "1px solid rgba(59,35,10,0.08)"
                              : "1px solid transparent",
                        transition:
                              "background-color 0.35s, border-color 0.35s",
                  }}
            >
                  <img
                        src="/images/logosuhab.png"
                        alt="Suhab"
                        style={{ height: isMobile ? 28 : 34 }}
                  />

                  {isMobile ? (
                        // Mobile hamburger menu
                        <>
                              <button
                                    onClick={() =>
                                          setMobileMenuOpen(!mobileMenuOpen)
                                    }
                                    style={{
                                          background: "none",
                                          border: "none",
                                          cursor: "pointer",
                                          display: "flex",
                                          flexDirection: "column",
                                          gap: 4,
                                          padding: 8,
                                    }}
                              >
                                    {[1, 2, 3].map((i) => (
                                          <div
                                                key={i}
                                                style={{
                                                      width: 20,
                                                      height: 2,
                                                      backgroundColor: C.text,
                                                      borderRadius: 1,
                                                      transition:
                                                            "all 0.2s ease",
                                                      opacity: 0.7,
                                                      transform: mobileMenuOpen
                                                            ? i === 1
                                                                  ? "rotate(45deg) translateY(6px)"
                                                                  : i === 2
                                                                    ? "opacity(0)"
                                                                    : "rotate(-45deg) translateY(-6px)"
                                                            : "none",
                                                }}
                                          />
                                    ))}
                              </button>

                              {/* Mobile menu overlay */}
                              {mobileMenuOpen && (
                                    <div
                                          style={{
                                                position: "fixed",
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                backgroundColor:
                                                      "rgba(238,235,230,0.96)",
                                                backdropFilter: "blur(20px)",
                                                WebkitBackdropFilter:
                                                      "blur(20px)",
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: 32,
                                                zIndex: 99,
                                          }}
                                    >
                                          {navItems.map(({ label, href }) => (
                                                <a
                                                      key={label}
                                                      href={href}
                                                      onClick={() =>
                                                            setMobileMenuOpen(
                                                                  false,
                                                            )
                                                      }
                                                      style={{
                                                            fontFamily:
                                                                  "'Epilogue', sans-serif",
                                                            fontSize: 24,
                                                            fontWeight: 700,
                                                            color: C.text,
                                                            textDecoration:
                                                                  "none",
                                                            opacity: 0.8,
                                                      }}
                                                >
                                                      {label}
                                                </a>
                                          ))}
                                          <CTAButton
                                                onClick={() =>
                                                      setMobileMenuOpen(false)
                                                }
                                                style={{ marginTop: 16 }}
                                          >
                                                Télécharger
                                          </CTAButton>
                                    </div>
                              )}
                        </>
                  ) : (
                        // Desktop menu
                        <div
                              style={{
                                    display: "flex",
                                    gap: 40,
                                    alignItems: "center",
                              }}
                        >
                              {navItems.map(({ label, href }) => (
                                    <a
                                          key={label}
                                          href={href}
                                          style={{
                                                fontFamily:
                                                      "'Roboto Mono', monospace",
                                                fontSize: 11,
                                                textTransform: "uppercase",
                                                letterSpacing: "0.1em",
                                                color: C.text,
                                                textDecoration: "none",
                                                opacity: 0.55,
                                          }}
                                    >
                                          {label}
                                    </a>
                              ))}
                              <CTAButton
                                    style={{
                                          padding: "10px 20px",
                                          fontSize: 11,
                                    }}
                              >
                                    Télécharger
                              </CTAButton>
                        </div>
                  )}
            </nav>
      );
}

// ── Hero ────────────────────────────────────────────────────────────────
function Hero() {
      const isMobile = useMediaQuery("(max-width: 768px)");
      const isTablet = useMediaQuery("(max-width: 1024px)");

      return (
            <section
                  style={{
                        minHeight: "100vh",
                        display: "flex",
                        flexDirection: isMobile ? "column" : "row",
                        alignItems: "center",
                        padding: isMobile
                              ? "100px 24px 60px"
                              : isTablet
                                ? "120px 40px 80px"
                                : "120px 56px 80px",
                        maxWidth: 1280,
                        margin: "0 auto",
                        gap: isMobile ? 40 : isTablet ? 40 : 56,
                  }}
            >
                  {/* Left: Text */}
                  <div
                        style={{
                              flex: isMobile ? "none" : "0 0 52%",
                              maxWidth: isMobile ? "100%" : 560,
                              textAlign: isMobile ? "center" : "left",
                        }}
                  >
                        {/* Badge */}
                        <div
                              style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 8,
                                    border: "1px solid rgba(59,35,10,0.18)",
                                    borderRadius: 100,
                                    padding: "6px 14px 6px 10px",
                                    marginBottom: isMobile ? 28 : 36,
                              }}
                        >
                              <img
                                    src="/images/asterixe.png"
                                    alt=""
                                    style={{
                                          width: 15,
                                          height: 15,
                                          opacity: 0.6,
                                    }}
                              />
                              <span
                                    style={{
                                          fontFamily:
                                                "'Roboto Mono', monospace",
                                          fontSize: 10,
                                          textTransform: "uppercase",
                                          letterSpacing: "0.12em",
                                          color: C.text,
                                          opacity: 0.55,
                                    }}
                              >
                                    Disponible sur App Store
                              </span>
                        </div>

                        {/* Headline */}
                        <h1
                              style={{
                                    fontFamily: "'Epilogue', sans-serif",
                                    fontSize: isMobile
                                          ? "36px"
                                          : "clamp(42px, 4.5vw, 68px)",
                                    fontWeight: 900,
                                    lineHeight: 1.05,
                                    color: C.text,
                                    letterSpacing: "-0.025em",
                                    marginBottom: isMobile ? 20 : 26,
                              }}
                        >
                              Reconnecte-toi
                              <br />
                              au Coran,{" "}
                              <em
                                    style={{
                                          fontFamily:
                                                "'Playfair Display', serif",
                                          fontStyle: "italic",
                                          fontWeight: 700,
                                          color: C.accent,
                                    }}
                              >
                                    à ton rythme.
                              </em>
                        </h1>

                        {/* Subtitle */}
                        <p
                              style={{
                                    fontFamily: "'Epilogue', sans-serif",
                                    fontSize: isMobile ? 16 : 18,
                                    lineHeight: 1.65,
                                    color: C.text,
                                    opacity: 0.68,
                                    marginBottom: isMobile ? 32 : 44,
                                    maxWidth: isMobile ? "100%" : 450,
                                    margin: isMobile
                                          ? "0 auto 32px"
                                          : "0 0 44px",
                              }}
                        >
                              Construis de petites habitudes régulières avec le
                              Coran — sans pression, sans surcharge. Ta lanterne
                              t'accompagne, pas à pas.
                        </p>

                        {/* CTAs */}
                        <div
                              style={{
                                    display: "flex",
                                    flexDirection: isMobile ? "column" : "row",
                                    gap: 14,
                                    alignItems: "center",
                                    justifyContent: isMobile
                                          ? "center"
                                          : "flex-start",
                              }}
                        >
                              <CTAButton
                                    style={{
                                          width: isMobile ? "100%" : "auto",
                                          maxWidth: isMobile ? 280 : "none",
                                    }}
                              >
                                    Essai gratuit · 7 jours
                              </CTAButton>
                              <GhostButton
                                    style={{
                                          width: isMobile ? "100%" : "auto",
                                          maxWidth: isMobile ? 280 : "none",
                                    }}
                              >
                                    Voir les fonctionnalités
                              </GhostButton>
                        </div>

                        <p
                              style={{
                                    marginTop: 18,
                                    fontFamily: "'Roboto Mono', monospace",
                                    fontSize: 10,
                                    color: C.text,
                                    opacity: 0.38,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.1em",
                                    textAlign: isMobile ? "center" : "left",
                              }}
                        >
                              Aucune carte requise · Annulable à tout moment
                        </p>
                  </div>

                  {/* Right: Visual */}
                  <div
                        style={{
                              flex: 1,
                              display: "flex",
                              alignItems: "flex-end",
                              justifyContent: "center",
                              position: "relative",
                              minHeight: isMobile ? 300 : 500,
                              width: "100%",
                        }}
                  >
                        {/* Warm glow blob */}
                        <div
                              aria-hidden="true"
                              style={{
                                    position: "absolute",
                                    width: isMobile ? 280 : 400,
                                    height: isMobile ? 280 : 400,
                                    borderRadius: "50%",
                                    background:
                                          "radial-gradient(circle, rgba(240,94,32,0.11) 0%, transparent 70%)",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                              }}
                        />

                        {/* Second softer blob */}
                        <div
                              aria-hidden="true"
                              style={{
                                    position: "absolute",
                                    width: isMobile ? 200 : 280,
                                    height: isMobile ? 200 : 280,
                                    borderRadius: "50%",
                                    background:
                                          "radial-gradient(circle, rgba(200,160,100,0.09) 0%, transparent 70%)",
                                    top: "30%",
                                    left: "40%",
                                    transform: "translate(-50%, -50%)",
                              }}
                        />

                        {/* Mascot */}
                        <img
                              src="/images/lantern_thumb.png"
                              alt="Mascotte Suhab — lanterne avec pouces en l'air"
                              style={{
                                    width: isMobile ? 200 : 300,
                                    position: "relative",
                                    zIndex: 1,
                                    filter: "drop-shadow(0 28px 52px rgba(59,35,10,0.10))",
                              }}
                        />

                        {/* Floating phone mockup */}
                        {!isMobile && (
                              <div
                                    style={{
                                          position: "absolute",
                                          right: -10,
                                          bottom: 10,
                                          zIndex: 2,
                                    }}
                              >
                                    <PhoneMockup />
                              </div>
                        )}

                        {/* Floating asterixe decoration */}
                        <img
                              src="/images/asterixe.png"
                              alt=""
                              aria-hidden="true"
                              style={{
                                    position: "absolute",
                                    top: isMobile ? 40 : 80,
                                    right: isMobile ? 40 : 60,
                                    width: isMobile ? 16 : 22,
                                    opacity: 0.2,
                                    zIndex: 0,
                              }}
                        />
                        <img
                              src="/images/asterixe.png"
                              alt=""
                              aria-hidden="true"
                              style={{
                                    position: "absolute",
                                    top: isMobile ? 140 : 200,
                                    left: isMobile ? 20 : 30,
                                    width: isMobile ? 12 : 14,
                                    opacity: 0.15,
                                    zIndex: 0,
                              }}
                        />
                  </div>
            </section>
      );
}

// ── Quote Banner ────────────────────────────────────────────────────────
function QuoteBanner() {
      const isMobile = useMediaQuery("(max-width: 768px)");

      return (
            <section
                  style={{
                        backgroundColor: C.text,
                        padding: isMobile ? "64px 24px" : "88px 56px",
                        textAlign: "center",
                        position: "relative",
                        overflow: "hidden",
                  }}
            >
                  {/* Large decorative asterisks */}
                  {!isMobile && (
                        <>
                              <img
                                    src="/images/asterixe.png"
                                    alt=""
                                    aria-hidden="true"
                                    style={{
                                          position: "absolute",
                                          left: 80,
                                          top: "50%",
                                          transform: "translateY(-50%)",
                                          width: 44,
                                          opacity: 0.1,
                                          filter: "invert(1)",
                                    }}
                              />
                              <img
                                    src="/images/asterixe.png"
                                    alt=""
                                    aria-hidden="true"
                                    style={{
                                          position: "absolute",
                                          right: 80,
                                          top: "50%",
                                          transform: "translateY(-50%)",
                                          width: 44,
                                          opacity: 0.1,
                                          filter: "invert(1)",
                                    }}
                              />
                        </>
                  )}

                  <div
                        style={{
                              maxWidth: 760,
                              margin: "0 auto",
                              position: "relative",
                              zIndex: 1,
                        }}
                  >
                        <img
                              src="/images/asterixe.png"
                              alt=""
                              aria-hidden="true"
                              style={{
                                    width: isMobile ? 18 : 22,
                                    height: isMobile ? 18 : 22,
                                    filter: "invert(1)",
                                    opacity: 0.45,
                                    marginBottom: isMobile ? 20 : 28,
                                    display: "inline-block",
                              }}
                        />

                        <blockquote
                              style={{
                                    fontFamily: "'Playfair Display', serif",
                                    fontSize: isMobile
                                          ? "20px"
                                          : "clamp(19px, 2.8vw, 29px)",
                                    fontStyle: "italic",
                                    fontWeight: 400,
                                    color: C.bg,
                                    lineHeight: 1.65,
                                    margin: "0 0 24px",
                              }}
                        >
                              « Les actes les plus aimés par Allah sont ceux
                              faits avec assiduité, même s'ils sont peu
                              nombreux. »
                        </blockquote>

                        <cite
                              style={{
                                    fontFamily: "'Roboto Mono', monospace",
                                    fontSize: 10,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.14em",
                                    color: C.bg,
                                    opacity: 0.38,
                                    fontStyle: "normal",
                              }}
                        >
                              Hadith — Sahih Boukhari & Muslim
                        </cite>
                  </div>
            </section>
      );
}

// ── Features ────────────────────────────────────────────────────────────
function Features() {
      const isMobile = useMediaQuery("(max-width: 768px)");
      const isTablet = useMediaQuery("(max-width: 1024px)");

      const cards = [
            {
                  emoji: "🌱",
                  tag: "Assiduité",
                  title: "Petites habitudes\nrégulières",
                  desc: "1 verset par jour, Al-Baqarah le vendredi… Personnalise tes habitudes de lecture et suis ta progression sans te prendre la tête.",
                  dark: false,
            },
            {
                  emoji: "🏮",
                  tag: "Mascotte",
                  title: "Ta lanterne\nt'accompagne",
                  desc: "La lumière de ta lanterne reflète ta régularité. Elle brille davantage avec ton streak et s'atténue doucement si tu t'absentes — sans jamais te juger.",
                  dark: true,
            },
            {
                  emoji: "✦",
                  tag: "Challenge",
                  title: "Ramadan 30j\npour les assidus",
                  desc: "Pour les lecteurs expérimentés : lis l'intégralité du Coran en 30 jours. Grille interactive + roadmap nénuphars pour suivre ta progression.",
                  dark: false,
            },
      ];

      return (
            <section
                  id="features"
                  style={{
                        padding: isMobile
                              ? "80px 24px"
                              : isTablet
                                ? "96px 40px"
                                : "108px 56px",
                        maxWidth: 1280,
                        margin: "0 auto",
                  }}
            >
                  {/* Header */}
                  <div
                        style={{
                              marginBottom: isMobile ? 40 : 56,
                              textAlign: isMobile ? "center" : "left",
                        }}
                  >
                        <span
                              style={{
                                    fontFamily: "'Roboto Mono', monospace",
                                    fontSize: 11,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.12em",
                                    color: C.accent,
                                    display: "block",
                                    marginBottom: 14,
                              }}
                        >
                              Fonctionnalités
                        </span>
                        <h2
                              style={{
                                    fontFamily: "'Epilogue', sans-serif",
                                    fontSize: isMobile
                                          ? "32px"
                                          : "clamp(28px, 3.5vw, 48px)",
                                    fontWeight: 900,
                                    color: C.text,
                                    letterSpacing: "-0.02em",
                                    lineHeight: 1.1,
                                    margin: 0,
                              }}
                        >
                              Conçu pour durer,
                              <br />
                              pas pour impressionner.
                        </h2>
                  </div>

                  {/* Cards grid */}
                  <div
                        style={{
                              display: "grid",
                              gridTemplateColumns: isMobile
                                    ? "1fr"
                                    : isTablet
                                      ? "repeat(2, 1fr)"
                                      : "repeat(3, 1fr)",
                              gap: 18,
                        }}
                  >
                        {cards.map((card, i) => (
                              <div
                                    key={i}
                                    style={{
                                          backgroundColor: card.dark
                                                ? C.text
                                                : C.beige,
                                          borderRadius: 22,
                                          padding: isMobile
                                                ? "32px 28px"
                                                : "40px 36px",
                                          display: "flex",
                                          flexDirection: "column",
                                          // En tablet, faire la card sombre sur toute la largeur en bas
                                          ...(isTablet && !isMobile && i === 1
                                                ? {
                                                        gridColumn: "1 / -1",
                                                        maxWidth: 600,
                                                        margin: "0 auto",
                                                  }
                                                : {}),
                                    }}
                              >
                                    <span
                                          style={{
                                                fontSize:
                                                      card.emoji === "✦"
                                                            ? 28
                                                            : 34,
                                                display: "block",
                                                marginBottom: 22,
                                                color: card.dark
                                                      ? C.bg
                                                      : C.accent,
                                                lineHeight: 1,
                                          }}
                                    >
                                          {card.emoji}
                                    </span>

                                    <span
                                          style={{
                                                fontFamily:
                                                      "'Roboto Mono', monospace",
                                                fontSize: 10,
                                                textTransform: "uppercase",
                                                letterSpacing: "0.13em",
                                                color: card.dark
                                                      ? C.bg
                                                      : C.accent,
                                                opacity: card.dark ? 0.45 : 1,
                                                display: "block",
                                                marginBottom: 12,
                                          }}
                                    >
                                          {card.tag}
                                    </span>

                                    <h3
                                          style={{
                                                fontFamily:
                                                      "'Epilogue', sans-serif",
                                                fontSize: isMobile ? 20 : 22,
                                                fontWeight: 800,
                                                color: card.dark
                                                      ? C.bg
                                                      : C.text,
                                                letterSpacing: "-0.015em",
                                                lineHeight: 1.2,
                                                marginBottom: 18,
                                                whiteSpace: "pre-line",
                                          }}
                                    >
                                          {card.title}
                                    </h3>

                                    <p
                                          style={{
                                                fontFamily:
                                                      "'Epilogue', sans-serif",
                                                fontSize: isMobile ? 14 : 15,
                                                lineHeight: 1.68,
                                                color: card.dark
                                                      ? C.bg
                                                      : C.text,
                                                opacity: card.dark
                                                      ? 0.65
                                                      : 0.68,
                                                margin: 0,
                                          }}
                                    >
                                          {card.desc}
                                    </p>
                              </div>
                        ))}
                  </div>
            </section>
      );
}

// ── Streak Section ──────────────────────────────────────────────────────
function StreakSection() {
      const [hovered, setHovered] = useState<number | null>(null);
      const [tapped, setTapped] = useState<number | null>(null);
      const isMobile = useMediaQuery("(max-width: 768px)");
      const isTablet = useMediaQuery("(max-width: 1024px)");

      const handleLanternInteraction = (index: number, isActive: boolean) => {
            if (isMobile) {
                  setTapped(isActive ? index : null);
            } else {
                  setHovered(isActive ? index : null);
            }
      };

      const isLanternActive = (index: number) => {
            return isMobile ? tapped === index : hovered === index;
      };

      const streaks = [
            {
                  src: "/images/lanterns/streak0.png",
                  label: "Jour 0",
                  sub: "Éteinte",
                  size: isMobile ? 50 : 70,
                  glow: "rgba(59,35,10,0.04)",
                  glowHover: "rgba(59,35,10,0.10)",
            },
            {
                  src: "/images/lanterns/streak1.png",
                  label: "Jour 1",
                  sub: "Veille",
                  size: isMobile ? 62 : 88,
                  glow: "rgba(200,160,100,0.08)",
                  glowHover: "rgba(200,160,100,0.20)",
            },
            {
                  src: "/images/lanterns/streak2.png",
                  label: "Jour 3",
                  sub: "S'allume",
                  size: isMobile ? 74 : 104,
                  glow: "rgba(240,94,32,0.10)",
                  glowHover: "rgba(240,94,32,0.24)",
            },
            {
                  src: "/images/lanterns/streak3.png",
                  label: "Jour 7",
                  sub: "Lumineuse",
                  size: isMobile ? 84 : 118,
                  glow: "rgba(240,94,32,0.18)",
                  glowHover: "rgba(240,94,32,0.38)",
            },
            {
                  src: "/images/lanterns/streak4.png",
                  label: "14+ jours",
                  sub: "Rayonnante",
                  size: isMobile ? 94 : 134,
                  glow: "rgba(240,94,32,0.28)",
                  glowHover: "rgba(240,94,32,0.52)",
            },
      ];

      return (
            <section
                  style={{
                        padding: isMobile
                              ? "80px 24px"
                              : isTablet
                                ? "96px 40px"
                                : "108px 56px",
                        backgroundColor: C.beigeMid,
                  }}
            >
                  <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                        {/* Header */}
                        <div
                              style={{
                                    textAlign: "center",
                                    marginBottom: isMobile ? 48 : 72,
                              }}
                        >
                              <span
                                    style={{
                                          fontFamily:
                                                "'Roboto Mono', monospace",
                                          fontSize: 11,
                                          textTransform: "uppercase",
                                          letterSpacing: "0.12em",
                                          color: C.accent,
                                          display: "block",
                                          marginBottom: 14,
                                    }}
                              >
                                    Streak
                              </span>
                              <h2
                                    style={{
                                          fontFamily: "'Epilogue', sans-serif",
                                          fontSize: isMobile
                                                ? "32px"
                                                : "clamp(28px, 3.5vw, 48px)",
                                          fontWeight: 900,
                                          color: C.text,
                                          letterSpacing: "-0.02em",
                                          lineHeight: 1.1,
                                          marginBottom: 20,
                                    }}
                              >
                                    Ta lanterne,
                                    <br />
                                    miroir de ta régularité.
                              </h2>
                              <p
                                    style={{
                                          fontFamily: "'Epilogue', sans-serif",
                                          fontSize: isMobile ? 15 : 17,
                                          color: C.text,
                                          opacity: 0.62,
                                          maxWidth: 480,
                                          margin: "0 auto",
                                          lineHeight: 1.62,
                                    }}
                              >
                                    Regarde-la s'illuminer au fil de tes jours
                                    de lecture.
                                    <br />
                                    Chaque verset compte.
                              </p>
                        </div>

                        {/* Lanterns row */}
                        <div
                              style={{
                                    display: "flex",
                                    flexDirection: isMobile ? "column" : "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: isMobile ? 24 : isTablet ? 24 : 36,
                                    ...(isMobile
                                          ? {
                                                  maxWidth: 200,
                                                  margin: "0 auto",
                                            }
                                          : {}),
                              }}
                        >
                              {streaks.map((s, i) => (
                                    <div
                                          key={i}
                                          onMouseEnter={() =>
                                                !isMobile &&
                                                handleLanternInteraction(
                                                      i,
                                                      true,
                                                )
                                          }
                                          onMouseLeave={() =>
                                                !isMobile &&
                                                handleLanternInteraction(
                                                      i,
                                                      false,
                                                )
                                          }
                                          onTouchStart={() =>
                                                isMobile &&
                                                handleLanternInteraction(
                                                      i,
                                                      true,
                                                )
                                          }
                                          onTouchEnd={() =>
                                                isMobile &&
                                                handleLanternInteraction(
                                                      i,
                                                      false,
                                                )
                                          }
                                          style={{
                                                display: "flex",
                                                flexDirection: isMobile
                                                      ? "row"
                                                      : "column",
                                                alignItems: "center",
                                                gap: isMobile ? 16 : 18,
                                                cursor: isMobile
                                                      ? "pointer"
                                                      : "default",
                                                transition:
                                                      "transform 0.32s cubic-bezier(0.34,1.56,0.64,1)",
                                                transform: isLanternActive(i)
                                                      ? `translateY(${isMobile ? -8 : -16}px)`
                                                      : "translateY(0)",
                                                ...(isMobile
                                                      ? {
                                                              width: "100%",
                                                              justifyContent:
                                                                    "flex-start",
                                                              padding: "12px 16px",
                                                              // Suppression du background rectangle
                                                              WebkitTapHighlightColor:
                                                                    "transparent",
                                                              userSelect:
                                                                    "none",
                                                        }
                                                      : {}),
                                          }}
                                    >
                                          {/* Image + glow */}
                                          <div
                                                style={{
                                                      position: "relative",
                                                      display: "flex",
                                                      alignItems: "flex-end",
                                                      justifyContent: "center",
                                                      paddingBottom: 4,
                                                }}
                                          >
                                                {/* Glow blob */}
                                                <div
                                                      aria-hidden="true"
                                                      style={{
                                                            position: "absolute",
                                                            bottom: -10,
                                                            left: "50%",
                                                            transform:
                                                                  "translateX(-50%)",
                                                            width: s.size * 2,
                                                            height: s.size * 2,
                                                            borderRadius: "50%",
                                                            backgroundColor:
                                                                  isLanternActive(
                                                                        i,
                                                                  )
                                                                        ? s.glowHover
                                                                        : s.glow,
                                                            filter: "blur(22px)",
                                                            transition:
                                                                  "background-color 0.32s ease",
                                                      }}
                                                />

                                                <img
                                                      src={s.src}
                                                      alt={s.label}
                                                      style={{
                                                            width: isLanternActive(
                                                                  i,
                                                            )
                                                                  ? s.size *
                                                                    1.14
                                                                  : s.size,
                                                            position: "relative",
                                                            zIndex: 1,
                                                            transition:
                                                                  "width 0.32s cubic-bezier(0.34,1.56,0.64,1)",
                                                            filter: isLanternActive(
                                                                  i,
                                                            )
                                                                  ? `drop-shadow(0 6px 16px ${s.glowHover})`
                                                                  : "none",
                                                      }}
                                                />
                                          </div>

                                          {/* Labels */}
                                          <div
                                                style={{
                                                      textAlign: isMobile
                                                            ? "left"
                                                            : "center",
                                                      flex: isMobile
                                                            ? 1
                                                            : "none",
                                                }}
                                          >
                                                <div
                                                      style={{
                                                            fontFamily:
                                                                  "'Epilogue', sans-serif",
                                                            fontSize: isMobile
                                                                  ? 13
                                                                  : 13,
                                                            fontWeight: 700,
                                                            color: C.text,
                                                            marginBottom:
                                                                  isMobile
                                                                        ? 2
                                                                        : 3,
                                                            opacity: isLanternActive(
                                                                  i,
                                                            )
                                                                  ? 1
                                                                  : 0.75,
                                                            transition:
                                                                  "opacity 0.2s",
                                                      }}
                                                >
                                                      {s.label}
                                                </div>
                                                <div
                                                      style={{
                                                            fontFamily:
                                                                  "'Roboto Mono', monospace",
                                                            fontSize: isMobile
                                                                  ? 9
                                                                  : 9,
                                                            textTransform:
                                                                  "uppercase",
                                                            letterSpacing:
                                                                  "0.1em",
                                                            color: C.text,
                                                            opacity: isLanternActive(
                                                                  i,
                                                            )
                                                                  ? 0.6
                                                                  : 0.35,
                                                            transition:
                                                                  "opacity 0.2s",
                                                      }}
                                                >
                                                      {s.sub}
                                                </div>
                                          </div>
                                    </div>
                              ))}
                        </div>
                  </div>
            </section>
      );
}

// ── Two Paths ───────────────────────────────────────────────────────────
function TwoPaths() {
      const isMobile = useMediaQuery("(max-width: 768px)");
      const isTablet = useMediaQuery("(max-width: 1024px)");

      const checkmarkLight = (item: string) => (
            <li
                  key={item}
                  style={{
                        fontFamily: "'Epilogue', sans-serif",
                        fontSize: isMobile ? 13 : 14,
                        color: C.text,
                        opacity: 0.78,
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        lineHeight: 1.45,
                  }}
            >
                  <span
                        style={{
                              color: C.cta,
                              fontWeight: 700,
                              fontSize: isMobile ? 13 : 14,
                              lineHeight: 1.6,
                              flexShrink: 0,
                        }}
                  >
                        ✓
                  </span>
                  {item}
            </li>
      );

      const checkmarkDark = (item: string) => (
            <li
                  key={item}
                  style={{
                        fontFamily: "'Epilogue', sans-serif",
                        fontSize: isMobile ? 13 : 14,
                        color: C.bg,
                        opacity: 0.75,
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        lineHeight: 1.45,
                  }}
            >
                  <span
                        style={{
                              color: C.accent,
                              fontWeight: 700,
                              fontSize: isMobile ? 13 : 14,
                              lineHeight: 1.6,
                              flexShrink: 0,
                        }}
                  >
                        ✓
                  </span>
                  {item}
            </li>
      );

      return (
            <section
                  id="paths"
                  style={{
                        padding: isMobile
                              ? "80px 24px"
                              : isTablet
                                ? "96px 40px"
                                : "108px 56px",
                        maxWidth: 1280,
                        margin: "0 auto",
                  }}
            >
                  {/* Header */}
                  <div
                        style={{
                              textAlign: "center",
                              marginBottom: isMobile ? 40 : 56,
                        }}
                  >
                        <span
                              style={{
                                    fontFamily: "'Roboto Mono', monospace",
                                    fontSize: 11,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.12em",
                                    color: C.accent,
                                    display: "block",
                                    marginBottom: 14,
                              }}
                        >
                              Deux parcours
                        </span>
                        <h2
                              style={{
                                    fontFamily: "'Epilogue', sans-serif",
                                    fontSize: isMobile
                                          ? "32px"
                                          : "clamp(28px, 3.5vw, 48px)",
                                    fontWeight: 900,
                                    color: C.text,
                                    letterSpacing: "-0.02em",
                                    lineHeight: 1.1,
                                    margin: 0,
                              }}
                        >
                              Ton niveau,
                              <br />
                              ton parcours.
                        </h2>
                  </div>

                  <div
                        style={{
                              display: "grid",
                              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                              gap: 22,
                        }}
                  >
                        {/* Lecture libre */}
                        <div
                              style={{
                                    backgroundColor: C.beige,
                                    borderRadius: 24,
                                    padding: isMobile
                                          ? "36px 28px"
                                          : "48px 44px",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 26,
                              }}
                        >
                              <div>
                                    <span
                                          style={{
                                                fontFamily:
                                                      "'Roboto Mono', monospace",
                                                fontSize: 10,
                                                textTransform: "uppercase",
                                                letterSpacing: "0.13em",
                                                color: C.cta,
                                                display: "block",
                                                marginBottom: 12,
                                                fontWeight: 700,
                                          }}
                                    >
                                          ✦ Recommandé · 80–90% des utilisateurs
                                    </span>
                                    <h3
                                          style={{
                                                fontFamily:
                                                      "'Epilogue', sans-serif",
                                                fontSize: isMobile ? 26 : 32,
                                                fontWeight: 900,
                                                color: C.text,
                                                letterSpacing: "-0.02em",
                                                lineHeight: 1.1,
                                                margin: 0,
                                          }}
                                    >
                                          Lecture libre
                                          <br />
                                          <span style={{ opacity: 0.38 }}>
                                                +
                                          </span>{" "}
                                          Habitudes
                                    </h3>
                              </div>

                              <p
                                    style={{
                                          fontFamily: "'Epilogue', sans-serif",
                                          fontSize: isMobile ? 14 : 15,
                                          lineHeight: 1.65,
                                          color: C.text,
                                          opacity: 0.68,
                                          margin: 0,
                                    }}
                              >
                                    Lis à ton rythme et construis des habitudes
                                    personnalisées. Ton streak, ta progression
                                    et ta lanterne t'encouragent au quotidien —
                                    sans pression.
                              </p>

                              <ul
                                    style={{
                                          listStyle: "none",
                                          padding: 0,
                                          margin: 0,
                                          display: "flex",
                                          flexDirection: "column",
                                          gap: 10,
                                    }}
                              >
                                    {[
                                          "Streak et progression visible",
                                          "Habitudes de lecture personnalisables",
                                          "Lecture & écoute audio",
                                          "Lanterne de régularité",
                                          "Lecture hybride papier + app",
                                    ].map(checkmarkLight)}
                              </ul>

                              <div
                                    style={{
                                          marginTop: "auto",
                                          paddingTop: 8,
                                          display: "flex",
                                          justifyContent: "center",
                                    }}
                              >
                                    <PhoneMockup />
                              </div>
                        </div>

                        {/* Challenge Ramadan */}
                        <div
                              style={{
                                    backgroundColor: C.text,
                                    borderRadius: 24,
                                    padding: isMobile
                                          ? "36px 28px"
                                          : "48px 44px",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 26,
                              }}
                        >
                              <div>
                                    <span
                                          style={{
                                                fontFamily:
                                                      "'Roboto Mono', monospace",
                                                fontSize: 10,
                                                textTransform: "uppercase",
                                                letterSpacing: "0.13em",
                                                color: C.bg,
                                                opacity: 0.4,
                                                display: "block",
                                                marginBottom: 12,
                                          }}
                                    >
                                          Lecteurs expérimentés
                                    </span>
                                    <h3
                                          style={{
                                                fontFamily:
                                                      "'Epilogue', sans-serif",
                                                fontSize: isMobile ? 26 : 32,
                                                fontWeight: 900,
                                                color: C.bg,
                                                letterSpacing: "-0.02em",
                                                lineHeight: 1.1,
                                                margin: 0,
                                          }}
                                    >
                                          Challenge
                                          <br />
                                          Ramadan 30j
                                    </h3>
                              </div>

                              <p
                                    style={{
                                          fontFamily: "'Epilogue', sans-serif",
                                          fontSize: isMobile ? 14 : 15,
                                          lineHeight: 1.65,
                                          color: C.bg,
                                          opacity: 0.58,
                                          margin: 0,
                                    }}
                              >
                                    Pour ceux qui ont déjà lu le Coran en entier
                                    et lisent très régulièrement. Lis
                                    l'intégralité du Coran en 30 jours pendant
                                    le Ramadan.
                              </p>

                              <ul
                                    style={{
                                          listStyle: "none",
                                          padding: 0,
                                          margin: 0,
                                          display: "flex",
                                          flexDirection: "column",
                                          gap: 10,
                                    }}
                              >
                                    {[
                                          "Grille 30 jours interactive",
                                          "Roadmap nénuphars",
                                          "Lanterne d'avancement personnalisée",
                                          "Lecture hybride papier + app",
                                          "Retour au parcours libre après le Ramadan",
                                    ].map(checkmarkDark)}
                              </ul>

                              <div
                                    style={{
                                          marginTop: "auto",
                                          paddingTop: 8,
                                          display: "flex",
                                          justifyContent: "center",
                                    }}
                              >
                                    <PhoneMockup dark />
                              </div>
                        </div>
                  </div>
            </section>
      );
}

// ── Pricing ─────────────────────────────────────────────────────────────
function Pricing() {
      const isMobile = useMediaQuery("(max-width: 768px)");
      const isTablet = useMediaQuery("(max-width: 1024px)");

      return (
            <section
                  id="pricing"
                  style={{
                        padding: isMobile
                              ? "80px 24px"
                              : isTablet
                                ? "96px 40px"
                                : "108px 56px",
                        backgroundColor: C.beigeMid,
                  }}
            >
                  <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                        {/* Header */}
                        <div
                              style={{
                                    textAlign: "center",
                                    marginBottom: isMobile ? 48 : 64,
                              }}
                        >
                              <span
                                    style={{
                                          fontFamily:
                                                "'Roboto Mono', monospace",
                                          fontSize: 11,
                                          textTransform: "uppercase",
                                          letterSpacing: "0.12em",
                                          color: C.accent,
                                          display: "block",
                                          marginBottom: 14,
                                    }}
                              >
                                    Tarifs
                              </span>
                              <h2
                                    style={{
                                          fontFamily: "'Epilogue', sans-serif",
                                          fontSize: isMobile
                                                ? "32px"
                                                : "clamp(28px, 3.5vw, 48px)",
                                          fontWeight: 900,
                                          color: C.text,
                                          letterSpacing: "-0.02em",
                                          lineHeight: 1.1,
                                          margin: 0,
                                    }}
                              >
                                    Simple, transparent,
                                    <br />
                                    sans publicité.
                              </h2>
                        </div>

                        {/* Tiers */}
                        <div
                              style={{
                                    display: "grid",
                                    gridTemplateColumns: isMobile
                                          ? "1fr"
                                          : isTablet
                                            ? "1fr 1.2fr 1fr"
                                            : "1fr 1.08fr 1fr",
                                    gap: 18,
                                    alignItems: "start",
                              }}
                        >
                              {/* Essai */}
                              <div
                                    style={{
                                          backgroundColor: C.beige,
                                          borderRadius: 20,
                                          padding: isMobile
                                                ? "28px 24px"
                                                : "36px 32px",
                                          ...(isMobile ? { order: 2 } : {}),
                                    }}
                              >
                                    <div
                                          style={{
                                                fontFamily:
                                                      "'Roboto Mono', monospace",
                                                fontSize: 10,
                                                textTransform: "uppercase",
                                                letterSpacing: "0.13em",
                                                color: C.text,
                                                opacity: 0.42,
                                                marginBottom: 24,
                                          }}
                                    >
                                          Essai gratuit
                                    </div>
                                    <div
                                          style={{
                                                fontFamily:
                                                      "'Epilogue', sans-serif",
                                                fontSize: isMobile ? 38 : 46,
                                                fontWeight: 900,
                                                color: C.text,
                                                letterSpacing: "-0.025em",
                                                lineHeight: 1,
                                                marginBottom: 6,
                                          }}
                                    >
                                          0 €
                                    </div>
                                    <div
                                          style={{
                                                fontFamily:
                                                      "'Roboto Mono', monospace",
                                                fontSize: 11,
                                                color: C.text,
                                                opacity: 0.4,
                                                textTransform: "uppercase",
                                                letterSpacing: "0.09em",
                                                marginBottom: 28,
                                          }}
                                    >
                                          Pendant 7 jours
                                    </div>

                                    <ul
                                          style={{
                                                listStyle: "none",
                                                padding: 0,
                                                margin: "0 0 28px",
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 10,
                                          }}
                                    >
                                          {[
                                                "Accès complet à toutes les fonctionnalités",
                                                "Aucune carte requise",
                                                "Annulable à tout moment",
                                          ].map((f) => (
                                                <li
                                                      key={f}
                                                      style={{
                                                            fontFamily:
                                                                  "'Epilogue', sans-serif",
                                                            fontSize: isMobile
                                                                  ? 13
                                                                  : 14,
                                                            color: C.text,
                                                            opacity: 0.68,
                                                            display: "flex",
                                                            gap: 9,
                                                            alignItems:
                                                                  "flex-start",
                                                            lineHeight: 1.45,
                                                      }}
                                                >
                                                      <span
                                                            style={{
                                                                  color: C.cta,
                                                                  flexShrink: 0,
                                                                  lineHeight: 1.6,
                                                            }}
                                                      >
                                                            ✓
                                                      </span>
                                                      {f}
                                                </li>
                                          ))}
                                    </ul>

                                    <button
                                          style={{
                                                width: "100%",
                                                padding: "13px",
                                                border: "1.5px solid rgba(59,35,10,0.3)",
                                                borderRadius: 10,
                                                backgroundColor: "transparent",
                                                fontFamily:
                                                      "'Roboto Mono', monospace",
                                                fontSize: 11,
                                                textTransform: "uppercase",
                                                letterSpacing: "0.09em",
                                                color: C.text,
                                                cursor: "pointer",
                                                opacity: 0.72,
                                          }}
                                    >
                                          Commencer gratuitement
                                    </button>
                              </div>

                              {/* Annuel — featured */}
                              <div
                                    style={{
                                          backgroundColor: C.text,
                                          borderRadius: 20,
                                          padding: isMobile
                                                ? "28px 24px"
                                                : "36px 32px",
                                          position: "relative",
                                          overflow: "hidden",
                                          ...(isMobile ? { order: 1 } : {}),
                                    }}
                              >
                                    {/* Ramadan badge */}
                                    <div
                                          style={{
                                                position: "absolute",
                                                top: 18,
                                                right: 18,
                                                backgroundColor: C.accent,
                                                borderRadius: 100,
                                                padding: "4px 10px",
                                                fontFamily:
                                                      "'Roboto Mono', monospace",
                                                fontSize: 9,
                                                textTransform: "uppercase",
                                                letterSpacing: "0.1em",
                                                color: "#fff",
                                                fontWeight: 700,
                                          }}
                                    >
                                          🌙 -40% Ramadan
                                    </div>

                                    <div
                                          style={{
                                                fontFamily:
                                                      "'Roboto Mono', monospace",
                                                fontSize: 10,
                                                textTransform: "uppercase",
                                                letterSpacing: "0.13em",
                                                color: C.bg,
                                                opacity: 0.48,
                                                marginBottom: 24,
                                          }}
                                    >
                                          Annuel · Le plus populaire
                                    </div>

                                    <div
                                          style={{
                                                fontFamily:
                                                      "'Epilogue', sans-serif",
                                                fontSize: isMobile ? 38 : 46,
                                                fontWeight: 900,
                                                color: C.bg,
                                                letterSpacing: "-0.025em",
                                                lineHeight: 1,
                                                marginBottom: 6,
                                          }}
                                    >
                                          X,XX €
                                    </div>
                                    <div
                                          style={{
                                                fontFamily:
                                                      "'Roboto Mono', monospace",
                                                fontSize: 11,
                                                color: C.bg,
                                                opacity: 0.38,
                                                textTransform: "uppercase",
                                                letterSpacing: "0.09em",
                                                marginBottom: 8,
                                          }}
                                    >
                                          / mois, facturé annuellement
                                    </div>
                                    <div
                                          style={{
                                                fontFamily:
                                                      "'Epilogue', sans-serif",
                                                fontSize: isMobile ? 12 : 13,
                                                color: C.accent,
                                                marginBottom: 28,
                                                fontWeight: 500,
                                          }}
                                    >
                                          -40% si tu t'abonnes avant le 5ᵉ jour
                                          du Ramadan
                                    </div>

                                    <ul
                                          style={{
                                                listStyle: "none",
                                                padding: 0,
                                                margin: "0 0 28px",
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 10,
                                          }}
                                    >
                                          {[
                                                "Accès complet",
                                                "Challenge Ramadan 30j",
                                                "Écoute audio",
                                                "Habitudes personnalisées",
                                                "Lecture hybride papier + app",
                                          ].map((f) => (
                                                <li
                                                      key={f}
                                                      style={{
                                                            fontFamily:
                                                                  "'Epilogue', sans-serif",
                                                            fontSize: isMobile
                                                                  ? 13
                                                                  : 14,
                                                            color: C.bg,
                                                            opacity: 0.78,
                                                            display: "flex",
                                                            gap: 9,
                                                            alignItems:
                                                                  "flex-start",
                                                            lineHeight: 1.45,
                                                      }}
                                                >
                                                      <span
                                                            style={{
                                                                  color: C.accent,
                                                                  flexShrink: 0,
                                                                  lineHeight: 1.6,
                                                            }}
                                                      >
                                                            ✓
                                                      </span>
                                                      {f}
                                                </li>
                                          ))}
                                    </ul>

                                    <CTAButton
                                          style={{
                                                width: "100%",
                                                display: "block",
                                          }}
                                    >
                                          Choisir l'annuel
                                    </CTAButton>
                              </div>

                              {/* Mensuel */}
                              <div
                                    style={{
                                          backgroundColor: C.beige,
                                          borderRadius: 20,
                                          padding: isMobile
                                                ? "28px 24px"
                                                : "36px 32px",
                                          ...(isMobile ? { order: 3 } : {}),
                                    }}
                              >
                                    <div
                                          style={{
                                                fontFamily:
                                                      "'Roboto Mono', monospace",
                                                fontSize: 10,
                                                textTransform: "uppercase",
                                                letterSpacing: "0.13em",
                                                color: C.text,
                                                opacity: 0.42,
                                                marginBottom: 24,
                                          }}
                                    >
                                          Mensuel
                                    </div>
                                    <div
                                          style={{
                                                fontFamily:
                                                      "'Epilogue', sans-serif",
                                                fontSize: isMobile ? 38 : 46,
                                                fontWeight: 900,
                                                color: C.text,
                                                letterSpacing: "-0.025em",
                                                lineHeight: 1,
                                                marginBottom: 6,
                                          }}
                                    >
                                          X,XX €
                                    </div>
                                    <div
                                          style={{
                                                fontFamily:
                                                      "'Roboto Mono', monospace",
                                                fontSize: 11,
                                                color: C.text,
                                                opacity: 0.4,
                                                textTransform: "uppercase",
                                                letterSpacing: "0.09em",
                                                marginBottom: 28,
                                          }}
                                    >
                                          Par mois
                                    </div>

                                    <ul
                                          style={{
                                                listStyle: "none",
                                                padding: 0,
                                                margin: "0 0 28px",
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 10,
                                          }}
                                    >
                                          {[
                                                "Accès complet",
                                                "Sans engagement",
                                                "Tarif plein (pas de promo Ramadan)",
                                          ].map((f) => (
                                                <li
                                                      key={f}
                                                      style={{
                                                            fontFamily:
                                                                  "'Epilogue', sans-serif",
                                                            fontSize: isMobile
                                                                  ? 13
                                                                  : 14,
                                                            color: C.text,
                                                            opacity: 0.68,
                                                            display: "flex",
                                                            gap: 9,
                                                            alignItems:
                                                                  "flex-start",
                                                            lineHeight: 1.45,
                                                      }}
                                                >
                                                      <span
                                                            style={{
                                                                  color: C.cta,
                                                                  flexShrink: 0,
                                                                  lineHeight: 1.6,
                                                            }}
                                                      >
                                                            ✓
                                                      </span>
                                                      {f}
                                                </li>
                                          ))}
                                    </ul>

                                    <button
                                          style={{
                                                width: "100%",
                                                padding: "13px",
                                                border: "1.5px solid rgba(59,35,10,0.3)",
                                                borderRadius: 10,
                                                backgroundColor: "transparent",
                                                fontFamily:
                                                      "'Roboto Mono', monospace",
                                                fontSize: 11,
                                                textTransform: "uppercase",
                                                letterSpacing: "0.09em",
                                                color: C.text,
                                                cursor: "pointer",
                                                opacity: 0.72,
                                          }}
                                    >
                                          Choisir le mensuel
                                    </button>
                              </div>
                        </div>
                  </div>
            </section>
      );
}

// ── Footer ──────────────────────────────────────────────────────────────
function Footer() {
      const isMobile = useMediaQuery("(max-width: 768px)");
      const isTablet = useMediaQuery("(max-width: 1024px)");

      return (
            <footer
                  style={{
                        backgroundColor: C.text,
                        padding: isMobile ? "48px 24px 32px" : "64px 56px 40px",
                  }}
            >
                  <div style={{ maxWidth: 1280, margin: "0 auto" }}>
                        <div
                              style={{
                                    display: "flex",
                                    flexDirection: isMobile ? "column" : "row",
                                    justifyContent: "space-between",
                                    alignItems: isMobile
                                          ? "center"
                                          : "flex-start",
                                    marginBottom: isMobile ? 36 : 52,
                                    gap: isMobile ? 32 : 48,
                                    textAlign: isMobile ? "center" : "left",
                              }}
                        >
                              {/* Brand */}
                              <div
                                    style={{
                                          maxWidth: isMobile ? "100%" : 280,
                                          order: isMobile ? 1 : 0,
                                    }}
                              >
                                    <img
                                          src="/images/logosuhab.png"
                                          alt="Suhab"
                                          style={{
                                                height: isMobile ? 28 : 32,
                                                marginBottom: 16,
                                                filter: "invert(1) brightness(1.1)",
                                                opacity: 0.88,
                                          }}
                                    />
                                    <p
                                          style={{
                                                fontFamily:
                                                      "'Epilogue', sans-serif",
                                                fontSize: isMobile ? 13 : 14,
                                                color: C.bg,
                                                opacity: 0.48,
                                                margin: 0,
                                                lineHeight: 1.65,
                                          }}
                                    >
                                          Reconnecte-toi au Coran, à ton rythme.
                                          Sans pression, avec assiduité.
                                    </p>
                              </div>

                              {/* Nav links */}
                              <div
                                    style={{
                                          display: "flex",
                                          flexDirection: isMobile
                                                ? "column"
                                                : "row",
                                          gap: isMobile ? 24 : 64,
                                          order: isMobile ? 2 : 0,
                                    }}
                              >
                                    {[
                                          {
                                                title: "Application",
                                                links: [
                                                      "Fonctionnalités",
                                                      "Parcours",
                                                      "Tarifs",
                                                ],
                                          },
                                          {
                                                title: "Légal",
                                                links: [
                                                      "Politique de confidentialité",
                                                      "CGU",
                                                      "Contact",
                                                ],
                                          },
                                    ].map((col) => (
                                          <div
                                                key={col.title}
                                                style={{
                                                      textAlign: isMobile
                                                            ? "center"
                                                            : "left",
                                                }}
                                          >
                                                <div
                                                      style={{
                                                            fontFamily:
                                                                  "'Roboto Mono', monospace",
                                                            fontSize: 10,
                                                            textTransform:
                                                                  "uppercase",
                                                            letterSpacing:
                                                                  "0.13em",
                                                            color: C.bg,
                                                            opacity: 0.32,
                                                            marginBottom: 18,
                                                      }}
                                                >
                                                      {col.title}
                                                </div>
                                                {col.links.map((link) => (
                                                      <a
                                                            key={link}
                                                            href="#"
                                                            style={{
                                                                  display: "block",
                                                                  fontFamily:
                                                                        "'Epilogue', sans-serif",
                                                                  fontSize: isMobile
                                                                        ? 13
                                                                        : 14,
                                                                  color: C.bg,
                                                                  opacity: 0.58,
                                                                  textDecoration:
                                                                        "none",
                                                                  marginBottom: 10,
                                                                  lineHeight: 1.45,
                                                            }}
                                                      >
                                                            {link}
                                                      </a>
                                                ))}
                                          </div>
                                    ))}
                              </div>
                        </div>

                        {/* Bottom bar */}
                        <div
                              style={{
                                    borderTop:
                                          "1px solid rgba(238,235,230,0.1)",
                                    paddingTop: 24,
                                    display: "flex",
                                    flexDirection: isMobile ? "column" : "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: isMobile ? 12 : 0,
                                    textAlign: "center",
                              }}
                        >
                              <span
                                    style={{
                                          fontFamily:
                                                "'Roboto Mono', monospace",
                                          fontSize: 10,
                                          color: C.bg,
                                          opacity: 0.28,
                                          textTransform: "uppercase",
                                          letterSpacing: "0.1em",
                                    }}
                              >
                                    © 2025 Suhab. Tous droits réservés.
                              </span>
                              <span
                                    style={{
                                          fontFamily: "'Epilogue', sans-serif",
                                          fontSize: 13,
                                          color: C.bg,
                                          opacity: 0.32,
                                    }}
                              >
                                    Fait avec 🤍
                              </span>
                        </div>
                  </div>
            </footer>
      );
}

// ── App ─────────────────────────────────────────────────────────────────
export default function App() {
      return (
            <div style={{ backgroundColor: C.bg, minHeight: "100vh" }}>
                  <Grain />
                  <Navbar />
                  <main>
                        <Hero />
                        <QuoteBanner />
                        <Features />
                        <StreakSection />
                        <TwoPaths />
                        <Pricing />
                  </main>
                  <Footer />
            </div>
      );
}
