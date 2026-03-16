import { useState, useEffect } from "react";
import type { CSSProperties, ReactNode } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import styled from "styled-components";

import PolitiqueConfidentialite from "./pages/PolitiqueConfidentialite";
import CGU from "./pages/CGU";
import Contact from "./pages/Contact";

// ── Store links (à remplacer quand disponibles) ─────────────────────────
const APP_STORE_LINK = "#"; // TODO: https://apps.apple.com/app/...
const PLAY_STORE_LINK = "#"; // TODO: https://play.google.com/store/apps/details?id=...

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

// ── Device detection (iOS / Android) ───────────────────────────────────
function useDeviceStore(): "ios" | "android" | "other" {
      const [store, setStore] = useState<"ios" | "android" | "other">("other");

      useEffect(() => {
            const ua = navigator.userAgent || navigator.vendor;
            const isIOS =
                  /iPad|iPhone|iPod/.test(ua) ||
                  (navigator.platform === "MacIntel" &&
                        navigator.maxTouchPoints > 1);
            const isAndroid = /android/i.test(ua);

            setStore(isIOS ? "ios" : isAndroid ? "android" : "other");
      }, []);

      return store;
}

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
            <StyledGrainSvg aria-hidden="true">
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
            </StyledGrainSvg>
      );
}

// ── 3D CTA Button ──────────────────────────────────────────────────────
function CTAButton({
      children,
      onClick,
      href,
      style,
}: {
      children: ReactNode;
      onClick?: () => void;
      href?: string;
      style?: CSSProperties;
}) {
      const [pressed, setPressed] = useState(false);

      if (href) {
            return (
                  <StyledCTAButtonLink
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        $pressed={pressed}
                        onMouseDown={() => setPressed(true)}
                        onMouseUp={() => setPressed(false)}
                        onMouseLeave={() => setPressed(false)}
                        onTouchStart={() => setPressed(true)}
                        onTouchEnd={() => setPressed(false)}
                        style={style}
                  >
                        {children}
                  </StyledCTAButtonLink>
            );
      }

      return (
            <StyledCTAButton
                  $pressed={pressed}
                  onClick={onClick}
                  onMouseDown={() => setPressed(true)}
                  onMouseUp={() => setPressed(false)}
                  onMouseLeave={() => setPressed(false)}
                  onTouchStart={() => setPressed(true)}
                  onTouchEnd={() => setPressed(false)}
                  style={style}
            >
                  {children}
            </StyledCTAButton>
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
      return (
            <StyledGhostButton $light={light} onClick={onClick} style={style}>
                  {children}
            </StyledGhostButton>
      );
}

// ── Phone mockup placeholder ───────────────────────────────────────────
function PhoneMockup({ dark = false }: { dark?: boolean }) {
      const bar = dark ? "rgba(238,235,230,0.07)" : "rgba(59,35,10,0.07)";
      const line = dark ? "rgba(238,235,230,0.11)" : "rgba(59,35,10,0.10)";

      return (
            <StyledPhoneMockup $dark={dark}>
                  <StyledPhoneStatusBar $dark={dark}>
                        <StyledPhoneNotch $dark={dark} />
                  </StyledPhoneStatusBar>

                  <StyledPhoneContent>
                        <StyledPhoneLanternPlaceholder $dark={dark}>
                              <StyledPhoneLanternCircle $dark={dark} />
                        </StyledPhoneLanternPlaceholder>

                        {[82, 62, 48].map((w, i) => (
                              <StyledPhoneSkeletonLine
                                    key={i}
                                    $w={w}
                                    $line={line}
                              />
                        ))}

                        {[1, 2].map((i) => (
                              <StyledPhoneSkeletonCard key={i} $bar={bar} />
                        ))}

                        <StyledPhoneSkeletonRow>
                              {[55, 35].map((w, i) => (
                                    <StyledPhoneSkeletonBlock
                                          key={i}
                                          $w={w}
                                          $bar={bar}
                                    />
                              ))}
                        </StyledPhoneSkeletonRow>
                  </StyledPhoneContent>

                  <StyledPhoneLabel $dark={dark}>
                        Aperçu à venir
                  </StyledPhoneLabel>
            </StyledPhoneMockup>
      );
}

// ── Navbar ─────────────────────────────────────────────────────────────
function Navbar() {
      const [scrolled, setScrolled] = useState(false);
      const isMobile = useMediaQuery("(max-width: 768px)");
      const location = useLocation();

      useEffect(() => {
            const handler = () => setScrolled(window.scrollY > 40);
            window.addEventListener("scroll", handler, { passive: true });
            return () => window.removeEventListener("scroll", handler);
      }, []);

      const handleLogoClick = () => {
            if (location.pathname === "/") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
            }
      };

      return (
            <StyledNav $scrolled={scrolled} $isMobile={isMobile}>
                  <Link
                        to="/"
                        aria-label="Retour à l'accueil"
                        onClick={handleLogoClick}
                  >
                        <StyledNavLogo
                              src="/images/logosuhab.png"
                              alt="Suhab"
                              $isMobile={isMobile}
                              $scrolled={scrolled}
                        />
                  </Link>
            </StyledNav>
      );
}

// ── Hero ────────────────────────────────────────────────────────────────
function Hero() {
      const isMobile = useMediaQuery("(max-width: 768px)");
      const isTablet = useMediaQuery("(max-width: 1024px)");
      const deviceStore = useDeviceStore();

      const storeLink =
            deviceStore === "ios"
                  ? APP_STORE_LINK
                  : deviceStore === "android"
                    ? PLAY_STORE_LINK
                    : null;

      return (
            <StyledHeroWrapper>
                  <StyledHeroSection $isMobile={isMobile} $isTablet={isTablet}>
                        <StyledHeroLeft $isMobile={isMobile}>
                              <StyledHeroBadge $isMobile={isMobile}>
                                    <StyledHeroBadgeImg
                                          src="/images/asterixe.png"
                                          alt=""
                                          $isMobile={isMobile}
                                    />
                                    <StyledHeroBadgeText $isMobile={isMobile}>
                                          Disponible sur App Store & Play Store
                                    </StyledHeroBadgeText>
                              </StyledHeroBadge>

                              <StyledHeroH1 $isMobile={isMobile}>
                                    <StyledHeroRe>(Re)</StyledHeroRe>
                                    connecte-toi
                                    <br />
                                    au Coran
                              </StyledHeroH1>

                              <StyledHeroSubtitle $isMobile={isMobile}>
                                    Fais du Coran un compagnon de vie
                              </StyledHeroSubtitle>

                              {isMobile && (
                                    <StyledHeroVisual $isMobile={true}>
                                          <StyledHeroPhoneWrap $isMobile={true}>
                                                <StyledHeroScreenshot
                                                      src="/images/IMG_7756.PNG"
                                                      alt="Aperçu de l'app Suhab"
                                                      $isMobile={true}
                                                />
                                          </StyledHeroPhoneWrap>
                                    </StyledHeroVisual>
                              )}

                              <StyledHeroCTAs
                                    $isMobile={isMobile}
                                    $hasVisualAbove={isMobile}
                              >
                                    <CTAButton
                                          href={
                                                storeLink && storeLink !== "#"
                                                      ? storeLink
                                                      : undefined
                                          }
                                          style={{
                                                width: isMobile
                                                      ? "100%"
                                                      : "auto",
                                                maxWidth: isMobile
                                                      ? 280
                                                      : "none",
                                          }}
                                    >
                                          Télécharger l'app
                                    </CTAButton>
                                    <GhostButton
                                          onClick={() => {
                                                document
                                                      .getElementById("lecture")
                                                      ?.scrollIntoView({
                                                            behavior: "smooth",
                                                      });
                                          }}
                                          style={{
                                                width: isMobile
                                                      ? "100%"
                                                      : "auto",
                                                maxWidth: isMobile
                                                      ? 280
                                                      : "none",
                                          }}
                                    >
                                          Voir les fonctionnalités
                                    </GhostButton>
                              </StyledHeroCTAs>
                        </StyledHeroLeft>

                        {!isMobile && (
                              <StyledHeroVisual $isMobile={false}>
                                    <StyledHeroGlowBlob2
                                          $isMobile={isMobile}
                                          aria-hidden="true"
                                    />

                                    <>
                                          <StyledHeroMascotWrap
                                                $isMobile={false}
                                          >
                                                <StyledHeroGlowBlob
                                                      $isMobile={false}
                                                      aria-hidden="true"
                                                />
                                                <StyledHeroMascot
                                                      src="/images/lantern_thumb.png"
                                                      alt="Mascotte Suhab — lanterne avec pouces en l'air"
                                                      $isMobile={false}
                                                />
                                          </StyledHeroMascotWrap>
                                          <StyledHeroPhoneWrap
                                                $isMobile={false}
                                          >
                                                <StyledHeroScreenshot
                                                      src="/images/IMG_7756.PNG"
                                                      alt="Aperçu de l'app Suhab"
                                                      $isMobile={false}
                                                />
                                          </StyledHeroPhoneWrap>
                                    </>
                              </StyledHeroVisual>
                        )}
                  </StyledHeroSection>
            </StyledHeroWrapper>
      );
}

// ── Lanterne entre hero et quote (mobile uniquement) ─────────────────────
function HeroLanternMobile() {
      const isMobile = useMediaQuery("(max-width: 768px)");
      if (!isMobile) return null;
      return (
            <StyledHeroLanternMobile>
                  <img
                        src="/images/lantern_thumb.png"
                        alt=""
                        aria-hidden="true"
                  />
            </StyledHeroLanternMobile>
      );
}

// ── Quote Banner ────────────────────────────────────────────────────────
function QuoteBanner() {
      const isMobile = useMediaQuery("(max-width: 768px)");

      return (
            <StyledQuoteSection $isMobile={isMobile}>
                  <StyledQuoteInner $isMobile={isMobile}>
                        <StyledQuoteBlockquote $isMobile={isMobile}>
                              <StyledQuoteIntro>
                                    Le prophète Muhammad ﷺ a dit :
                                    <br />
                                    [...] « Vous devez pratiquer comme acte ce
                                    dont vous êtes capables car certes Allah ne
                                    se lasse pas tant que vous ne vous lassez
                                    pas et certes
                                    <br />
                              </StyledQuoteIntro>
                              les actes les plus aimés par Allah sont ceux faits
                              avec assiduité, même s'ils sont peu nombreux. »
                        </StyledQuoteBlockquote>

                        <StyledQuoteCite>
                              Rapporté par Mouslim dans son Sahih n°782
                        </StyledQuoteCite>
                  </StyledQuoteInner>
            </StyledQuoteSection>
      );
}

// ── Interface de lecture ────────────────────────────────────────────────
function ReadingInterface() {
      const isMobile = useMediaQuery("(max-width: 768px)");
      const isTablet = useMediaQuery("(max-width: 1024px)");

      return (
            <StyledReadingSection
                  id="lecture"
                  $isMobile={isMobile}
                  $isTablet={isTablet}
            >
                  <StyledReadingLeft $isMobile={isMobile}>
                        <StyledReadingHeader $isMobile={isMobile}>
                              <StyledReadingTag>Interface</StyledReadingTag>
                              <StyledReadingH2 $isMobile={isMobile}>
                                    Une lecture sobre
                                    <br />
                                    et agréable.
                              </StyledReadingH2>
                              <StyledReadingP $isMobile={isMobile}>
                                    L'interface de lecture du Coran est conçue
                                    pour rester simple et apaisante. Deux modes
                                    d'affichage, des langues au choix — tu lis
                                    comme tu préfères.
                              </StyledReadingP>
                        </StyledReadingHeader>

                        <StyledReadingFeatures $isMobile={isMobile}>
                              <StyledReadingFeature $isMobile={isMobile}>
                                    <StyledReadingFeatureTitle>
                                          Modes d'affichage
                                    </StyledReadingFeatureTitle>
                                    <StyledReadingFeatureDesc>
                                          Mode cartes ou mode défilement —
                                          choisis celui qui te convient.
                                    </StyledReadingFeatureDesc>
                              </StyledReadingFeature>
                              <StyledReadingFeature $isMobile={isMobile}>
                                    <StyledReadingFeatureTitle>
                                          Langues
                                    </StyledReadingFeatureTitle>
                                    <StyledReadingFeatureDesc>
                                          Français, arabe ou phonétique —
                                          affiche les traductions qui t'aident.
                                    </StyledReadingFeatureDesc>
                              </StyledReadingFeature>
                        </StyledReadingFeatures>
                  </StyledReadingLeft>

                  <StyledReadingMockups $isMobile={isMobile}>
                        <StyledReadingMockup $isMobile={isMobile}>
                              <StyledReadingMockupLabel>
                                    Mode cartes
                              </StyledReadingMockupLabel>
                              <StyledReadingMockupImg
                                    src="/images/IMG_7758.PNG"
                                    alt="Mode cartes — affichage par cartes"
                                    $isMobile={isMobile}
                              />
                        </StyledReadingMockup>
                        <StyledReadingMockup $isMobile={isMobile}>
                              <StyledReadingMockupLabel>
                                    Mode défilement
                              </StyledReadingMockupLabel>
                              <StyledReadingMockupImg
                                    src="/images/IMG_7757.PNG"
                                    alt="Mode défilement — affichage en défilement"
                                    $isMobile={isMobile}
                              />
                        </StyledReadingMockup>
                  </StyledReadingMockups>
            </StyledReadingSection>
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
            <StyledFeaturesSection
                  id="features"
                  $isMobile={isMobile}
                  $isTablet={isTablet}
            >
                  {/* <StyledFeaturesHeader $isMobile={isMobile}>
                        <StyledFeaturesTag>Fonctionnalités</StyledFeaturesTag>
                        <StyledFeaturesH2 $isMobile={isMobile}>
                              Conçu pour durer,
                              <br />
                              pas pour impressionner.
                        </StyledFeaturesH2>
                  </StyledFeaturesHeader> */}

                  <StyledFeaturesGrid $isMobile={isMobile} $isTablet={isTablet}>
                        {cards.map((card, i) => (
                              <StyledFeatureCard
                                    key={i}
                                    $dark={card.dark}
                                    $isMobile={isMobile}
                                    $isTablet={isTablet}
                                    $fullWidth={
                                          isTablet && !isMobile && i === 1
                                    }
                              >
                                    <StyledFeatureEmoji
                                          $emoji={card.emoji}
                                          $dark={card.dark}
                                    >
                                          {card.emoji}
                                    </StyledFeatureEmoji>

                                    <StyledFeatureTag $dark={card.dark}>
                                          {card.tag}
                                    </StyledFeatureTag>

                                    <StyledFeatureH3
                                          $dark={card.dark}
                                          $isMobile={isMobile}
                                    >
                                          {card.title}
                                    </StyledFeatureH3>

                                    <StyledFeatureP
                                          $dark={card.dark}
                                          $isMobile={isMobile}
                                    >
                                          {card.desc}
                                    </StyledFeatureP>
                              </StyledFeatureCard>
                        ))}
                  </StyledFeaturesGrid>
            </StyledFeaturesSection>
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
            <StyledStreakSection $isMobile={isMobile} $isTablet={isTablet}>
                  <StyledStreakInner>
                        <StyledStreakHeader $isMobile={isMobile}>
                              <StyledStreakTag>Streak</StyledStreakTag>
                              <StyledStreakH2 $isMobile={isMobile}>
                                    Ta lanterne,
                                    <br />
                                    miroir de ta régularité.
                              </StyledStreakH2>
                              <StyledStreakP $isMobile={isMobile}>
                                    Elle brille davantage avec ton streak et
                                    s'atténue doucement si tu t'absentes.
                              </StyledStreakP>
                        </StyledStreakHeader>

                        <StyledStreakRow
                              $isMobile={isMobile}
                              $isTablet={isTablet}
                        >
                              {streaks.map((s, i) => (
                                    <StyledStreakItem
                                          key={i}
                                          $isMobile={isMobile}
                                          $active={isLanternActive(i)}
                                          $isRow={isMobile}
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
                                    >
                                          <StyledStreakImgWrap>
                                                <StyledStreakGlow
                                                      aria-hidden="true"
                                                      $color={
                                                            isLanternActive(i)
                                                                  ? s.glowHover
                                                                  : s.glow
                                                      }
                                                      $size={s.size}
                                                />

                                                <StyledStreakImg
                                                      src={s.src}
                                                      alt={s.label}
                                                      $size={s.size}
                                                      $active={isLanternActive(
                                                            i,
                                                      )}
                                                      $glowHover={s.glowHover}
                                                />
                                          </StyledStreakImgWrap>

                                          <StyledStreakLabels
                                                $isMobile={isMobile}
                                          >
                                                <StyledStreakLabel
                                                      $active={isLanternActive(
                                                            i,
                                                      )}
                                                >
                                                      {s.label}
                                                </StyledStreakLabel>
                                          </StyledStreakLabels>
                                    </StyledStreakItem>
                              ))}
                        </StyledStreakRow>
                  </StyledStreakInner>
            </StyledStreakSection>
      );
}

// ── Two Paths ───────────────────────────────────────────────────────────
function TwoPaths() {
      const isMobile = useMediaQuery("(max-width: 768px)");
      const isTablet = useMediaQuery("(max-width: 1024px)");

      const pathBulletLight = (item: string) => (
            <StyledPathLi key={item} $dark={false} $isMobile={isMobile}>
                  <StyledPathBullet $dark={false}>•</StyledPathBullet>
                  {item}
            </StyledPathLi>
      );

      const pathBulletDark = (item: string) => (
            <StyledPathLi key={item} $dark={true} $isMobile={isMobile}>
                  <StyledPathBullet $dark={true}>•</StyledPathBullet>
                  {item}
            </StyledPathLi>
      );

      return (
            <StyledPathsSection
                  id="paths"
                  $isMobile={isMobile}
                  $isTablet={isTablet}
            >
                  <StyledPathsHeader $isMobile={isMobile}>
                        <StyledFeaturesTag>Parcours</StyledFeaturesTag>
                        <StyledFeaturesH2 $isMobile={isMobile}>
                              Ton besoin,
                              <br />
                              ton parcours.
                        </StyledFeaturesH2>
                  </StyledPathsHeader>

                  <StyledPathsGrid $isMobile={isMobile}>
                        <StyledPathCardFree $isMobile={isMobile}>
                              <StyledPathH3 $dark={false} $isMobile={isMobile}>
                                    Lecture libre
                              </StyledPathH3>

                              <StyledPathP $dark={false} $isMobile={isMobile}>
                                    Lis à ton rythme, en essayant de maintenir
                                    le streak.
                              </StyledPathP>

                              <StyledPathCtaWrap>
                                    <StyledPathScreenshot
                                          src="/images/IMG_7749.png"
                                          alt="Aperçu lecture libre"
                                          $isMobile={isMobile}
                                          $dark={false}
                                    />
                              </StyledPathCtaWrap>
                        </StyledPathCardFree>

                        <StyledPathPlus $isMobile={isMobile}>+</StyledPathPlus>

                        <StyledPathCard $dark={false} $isMobile={isMobile}>
                              <StyledPathH3 $dark={false} $isMobile={isMobile}>
                                    Habitudes
                              </StyledPathH3>

                              <StyledPathP $dark={false} $isMobile={isMobile}>
                                    Définis tes propres objectifs de lecture
                                    régulière. Complète ta lecture et créé une
                                    nouvelle habitude.
                              </StyledPathP>

                              <StyledPathUl>
                                    {[
                                          "1 verset par jour",
                                          "Une sourate par semaine",
                                          "Al-Baqarah le vendredi",
                                    ].map(pathBulletLight)}
                              </StyledPathUl>

                              <StyledPathCtaWrap>
                                    <StyledPathScreenshot
                                          src="/images/IMG_7762.png"
                                          alt="Aperçu habitudes"
                                          $isMobile={isMobile}
                                          $dark={false}
                                    />
                              </StyledPathCtaWrap>
                        </StyledPathCard>

                        <StyledPathCard $dark={true} $isMobile={isMobile}>
                              <StyledPathH3 $dark={true} $isMobile={isMobile}>
                                    Challenges
                              </StyledPathH3>

                              <StyledPathP $dark={true} $isMobile={isMobile}>
                                    Un challenge définit avec des parcours sur
                                    plusieurs jours/semaines. Grille interactive
                                    et roadmap pour suivre ta progression.
                              </StyledPathP>

                              <StyledPathUl>
                                    {[
                                          "Ramadan 30j — Coran en entier",
                                          "1 juz par jour",
                                          "D'autres défis à venir",
                                    ].map(pathBulletDark)}
                              </StyledPathUl>

                              <StyledPathCtaWrap>
                                    <StyledPathScreenshot
                                          src="/images/IMG_7761.png"
                                          alt="Aperçu challenges"
                                          $isMobile={isMobile}
                                          $dark={true}
                                    />
                              </StyledPathCtaWrap>
                        </StyledPathCard>
                  </StyledPathsGrid>
            </StyledPathsSection>
      );
}

// ── Download CTA (avant footer) ───────────────────────────────────────────
function DownloadCTA() {
      const isMobile = useMediaQuery("(max-width: 768px)");
      const deviceStore = useDeviceStore();

      const storeLink =
            deviceStore === "ios"
                  ? APP_STORE_LINK
                  : deviceStore === "android"
                    ? PLAY_STORE_LINK
                    : null;

      return (
            <StyledDownloadCTA $isMobile={isMobile}>
                  <StyledDownloadCTAInner>
                        <StyledDownloadCTAH2 $isMobile={isMobile}>
                              Prêt.e à te reconnecter au Coran ?
                        </StyledDownloadCTAH2>
                        <StyledDownloadCTAP $isMobile={isMobile}>
                              Télécharge l'app gratuitement
                        </StyledDownloadCTAP>
                        <StyledDownloadCTABtns $isMobile={isMobile}>
                              {deviceStore === "other" ? (
                                    <>
                                          <CTAButton
                                                href={
                                                      APP_STORE_LINK !== "#"
                                                            ? APP_STORE_LINK
                                                            : undefined
                                                }
                                                style={
                                                      isMobile
                                                            ? {
                                                                    width: "100%",
                                                                    maxWidth: 280,
                                                              }
                                                            : undefined
                                                }
                                          >
                                                App Store
                                          </CTAButton>
                                          <CTAButton
                                                href={
                                                      PLAY_STORE_LINK !== "#"
                                                            ? PLAY_STORE_LINK
                                                            : undefined
                                                }
                                                style={
                                                      isMobile
                                                            ? {
                                                                    width: "100%",
                                                                    maxWidth: 280,
                                                              }
                                                            : undefined
                                                }
                                          >
                                                Play Store
                                          </CTAButton>
                                    </>
                              ) : (
                                    <CTAButton
                                          href={
                                                storeLink && storeLink !== "#"
                                                      ? storeLink
                                                      : undefined
                                          }
                                          style={{
                                                width: isMobile
                                                      ? "100%"
                                                      : "auto",
                                                maxWidth: isMobile
                                                      ? 280
                                                      : "none",
                                          }}
                                    >
                                          Télécharger l'app
                                    </CTAButton>
                              )}
                        </StyledDownloadCTABtns>
                  </StyledDownloadCTAInner>
            </StyledDownloadCTA>
      );
}

// ── Footer ──────────────────────────────────────────────────────────────
function Footer() {
      const isMobile = useMediaQuery("(max-width: 768px)");
      const isTablet = useMediaQuery("(max-width: 1024px)");

      return (
            <StyledFooter $isMobile={isMobile}>
                  <StyledFooterInner>
                        <StyledFooterTop $isMobile={isMobile}>
                              <StyledFooterBrand $isMobile={isMobile}>
                                    <StyledFooterLogo
                                          src="/images/logosuhab.png"
                                          alt="Suhab"
                                          $isMobile={isMobile}
                                    />
                                    <StyledFooterBrandP $isMobile={isMobile}>
                                          Fais du Coran ton compagnon de vie
                                    </StyledFooterBrandP>
                              </StyledFooterBrand>

                              <StyledFooterNav $isMobile={isMobile}>
                                    {[
                                          {
                                                title: "Légal",
                                                links: [
                                                      {
                                                            label: "Politique de confidentialité",
                                                            to: "/privacy-policy",
                                                      },
                                                      {
                                                            label: "CGU",
                                                            to: "/terms-of-use",
                                                      },
                                                      {
                                                            label: "Contact",
                                                            to: "/contact",
                                                      },
                                                ],
                                          },
                                    ].map((col) => (
                                          <StyledFooterCol
                                                key={col.title}
                                                $isMobile={isMobile}
                                          >
                                                <StyledFooterColTitle>
                                                      {col.title}
                                                </StyledFooterColTitle>
                                                {col.links.map((link) => (
                                                      <StyledFooterLink
                                                            key={link.to}
                                                            as={Link}
                                                            to={link.to}
                                                            $isMobile={isMobile}
                                                      >
                                                            {link.label}
                                                      </StyledFooterLink>
                                                ))}
                                          </StyledFooterCol>
                                    ))}
                              </StyledFooterNav>
                        </StyledFooterTop>

                        <StyledFooterBottom $isMobile={isMobile}>
                              <StyledFooterCopyright>
                                    © 2026 Minimo inc. - Suhab. Tous droits
                                    réservés.
                              </StyledFooterCopyright>
                              <StyledFooterLove>Fait avec 🧡</StyledFooterLove>
                        </StyledFooterBottom>
                  </StyledFooterInner>
            </StyledFooter>
      );
}

// ── Scroll to top on route change ───────────────────────────────────────
function ScrollToTop() {
      const { pathname } = useLocation();
      useEffect(() => {
            window.scrollTo(0, 0);
      }, [pathname]);
      return null;
}

// ── App ─────────────────────────────────────────────────────────────────
export default function App() {
      return (
            <StyledAppRoot>
                  <ScrollToTop />
                  <Grain />
                  <Navbar />
                  <main>
                        <Routes>
                              <Route
                                    path="/"
                                    element={
                                          <>
                                                <Hero />
                                                <HeroLanternMobile />
                                                <QuoteBanner />
                                                <ReadingInterface />
                                                <StreakSection />
                                                <TwoPaths />
                                                <DownloadCTA />
                                          </>
                                    }
                              />
                              <Route
                                    path="/privacy-policy"
                                    element={<PolitiqueConfidentialite />}
                              />
                              <Route path="/terms-of-use" element={<CGU />} />
                              <Route path="/contact" element={<Contact />} />
                        </Routes>
                  </main>
                  <Footer />
            </StyledAppRoot>
      );
}

// ═══════════════════════════════════════════════════════════════════════════
// STYLED COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

const StyledAppRoot = styled.div`
      background-color: ${C.beigeMid};
      min-height: 100vh;
`;

const StyledGrainSvg = styled.svg`
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      opacity: 0.6;
      mix-blend-mode: overlay;
`;

const StyledCTAButton = styled.button<{ $pressed?: boolean }>`
      background-color: ${C.cta};
      color: #fff;
      border: none;
      border-radius: 10px;
      padding: 14px 28px;
      font-family: "Roboto Mono", monospace;
      letter-spacing: 2px;
      font-size: 13px;
      text-transform: uppercase;
      cursor: pointer;
      transform: ${(p) => (p.$pressed ? "translateY(3px)" : "translateY(0)")};
      box-shadow: ${(p) => (p.$pressed ? "none" : `0 3px 0 ${C.ctaShadow}`)};
      transition:
            transform 80ms ease,
            box-shadow 80ms ease;
      white-space: nowrap;
`;

const StyledCTAButtonLink = styled.a<{ $pressed?: boolean }>`
      background-color: ${C.cta};
      color: #fff;
      border: none;
      border-radius: 10px;
      padding: 14px 28px;
      font-family: "Roboto Mono", monospace;
      letter-spacing: 2px;
      font-size: 13px;
      text-transform: uppercase;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
      transform: ${(p) => (p.$pressed ? "translateY(3px)" : "translateY(0)")};
      box-shadow: ${(p) => (p.$pressed ? "none" : `0 3px 0 ${C.ctaShadow}`)};
      transition:
            transform 80ms ease,
            box-shadow 80ms ease;
      white-space: nowrap;
`;

const StyledGhostButton = styled.button<{ $light?: boolean }>`
      background-color: transparent;
      color: ${(p) => (p.$light ? C.bg : C.text)};
      border: 1px solid ${(p) => (p.$light ? C.bg : C.text)};
      border-radius: 10px;
      padding: 13px 28px;
      font-family: "Roboto Mono", monospace;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      cursor: pointer;
      opacity: 0.75;
      white-space: nowrap;
      transition: opacity 0.18s ease;
`;

const StyledPhoneMockup = styled.div<{ $dark?: boolean }>`
      width: 178px;
      height: 356px;
      border-radius: 28px;
      border: 2px solid ${(p) => (p.$dark ? "rgba(238,235,230,0.16)" : C.text)};
      background-color: ${(p) => (p.$dark ? "#1E0E02" : "#F5F0E8")};
      position: relative;
      box-shadow: ${(p) =>
            p.$dark
                  ? "4px 5px 0 rgba(238,235,230,0.09)"
                  : `4px 5px 0 ${C.text}`};
      overflow: hidden;
      flex-shrink: 0;
`;

const StyledPhoneStatusBar = styled.div<{ $dark?: boolean }>`
      height: 40px;
      background-color: ${(p) => (p.$dark ? "rgba(0,0,0,0.28)" : C.beigeMid)};
      display: flex;
      align-items: center;
      justify-content: center;
`;

const StyledPhoneNotch = styled.div<{ $dark?: boolean }>`
      width: 58px;
      height: 13px;
      border-radius: 7px;
      background-color: ${(p) =>
            p.$dark ? "rgba(238,235,230,0.18)" : "rgba(59,35,10,0.18)"};
`;

const StyledPhoneContent = styled.div`
      padding: 14px 14px 0;
`;

const StyledPhoneLanternPlaceholder = styled.div<{ $dark?: boolean }>`
      height: 90px;
      border-radius: 14px;
      background-color: ${(p) =>
            p.$dark ? "rgba(240,94,32,0.10)" : "rgba(240,94,32,0.07)"};
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 14px;
`;

const StyledPhoneLanternCircle = styled.div<{ $dark?: boolean }>`
      width: 46px;
      height: 46px;
      border-radius: 50%;
      background-color: ${(p) =>
            p.$dark ? "rgba(240,94,32,0.22)" : "rgba(240,94,32,0.12)"};
`;

const StyledPhoneSkeletonLine = styled.div<{
      $w: number;
      $line: string;
}>`
      height: 8px;
      border-radius: 4px;
      width: ${(p) => p.$w}%;
      background-color: ${(p) => p.$line};
      margin-bottom: 8px;
`;

const StyledPhoneSkeletonCard = styled.div<{ $bar: string }>`
      height: 44px;
      border-radius: 10px;
      background-color: ${(p) => p.$bar};
      margin-bottom: 8px;
`;

const StyledPhoneSkeletonRow = styled.div`
      display: flex;
      gap: 8px;
      margin-top: 4px;
`;

const StyledPhoneSkeletonBlock = styled.div<{ $w: number; $bar: string }>`
      height: 34px;
      border-radius: 8px;
      width: ${(p) => p.$w}%;
      background-color: ${(p) => p.$bar};
`;

const StyledPhoneLabel = styled.div<{ $dark?: boolean }>`
      position: absolute;
      bottom: 14px;
      left: 0;
      right: 0;
      text-align: center;
      font-family: "Roboto Mono", monospace;
      font-size: 8px;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: ${(p) =>
            p.$dark ? "rgba(238,235,230,0.22)" : "rgba(59,35,10,0.18)"};
`;

const StyledNav = styled.nav<{ $scrolled: boolean; $isMobile: boolean }>`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: ${(p) =>
            p.$isMobile
                  ? p.$scrolled
                        ? "2px 24px"
                        : "14px 24px"
                  : "18px 56px"};
      background-color: ${C.beigeMid};
      backdrop-filter: ${(p) => (p.$scrolled ? "blur(18px)" : "none")};
      -webkit-backdrop-filter: ${(p) => (p.$scrolled ? "blur(18px)" : "none")};
      border-bottom: ${(p) =>
            p.$scrolled
                  ? "1px solid rgba(59,35,10,0.08)"
                  : "1px solid transparent"};
      transition:
            background-color 0.35s,
            border-color 0.35s,
            padding 0.3s ease;
`;

const StyledNavLogo = styled.img<{
      $isMobile: boolean;
      $scrolled?: boolean;
}>`
      height: ${(p) =>
            p.$isMobile && p.$scrolled ? 22 : p.$isMobile ? 28 : 34}px;
      transition: height 0.3s ease;
`;

const StyledHeroWrapper = styled.div`
      width: 100%;
      background-color: ${C.beigeMid};
`;

const StyledHeroLanternMobile = styled.div`
      display: flex;
      justify-content: center;
      padding: 70px 0;
      background-color: ${C.beigeMid};

      img {
            width: 120px;
            height: auto;
      }
`;

const StyledHeroSection = styled.section<{
      $isMobile: boolean;
      $isTablet: boolean;
}>`
      min-height: ${(p) => (p.$isMobile ? "100svh" : "100vh")};
      display: flex;
      flex-direction: ${(p) => (p.$isMobile ? "column" : "row")};
      align-items: center;
      padding: ${(p) =>
            p.$isMobile
                  ? "80px 24px 40px"
                  : p.$isTablet
                    ? "120px 40px 80px"
                    : "120px 56px 80px"};
      max-width: 1280px;
      margin: 0 auto;
      gap: ${(p) => (p.$isMobile ? 40 : p.$isTablet ? 40 : 56)}px;
`;

const StyledHeroLeft = styled.div<{
      $isMobile: boolean;
}>`
      flex: ${(p) => (p.$isMobile ? "none" : "0 0 52%")};
      max-width: ${(p) => (p.$isMobile ? "100%" : "560px")};
      text-align: ${(p) => (p.$isMobile ? "center" : "left")};
`;

const StyledHeroBadge = styled.div<{ $isMobile: boolean }>`
      display: inline-flex;
      align-items: center;
      gap: ${(p) => (p.$isMobile ? 5 : 8)}px;
      border: 1px solid rgba(59, 35, 10, 0.325);
      border-radius: 100px;
      padding: ${(p) =>
            p.$isMobile ? "4px 10px 4px 8px" : "6px 14px 6px 10px"};
      margin-bottom: ${(p) => (p.$isMobile ? 20 : 36)}px;
`;

const StyledHeroBadgeImg = styled.img<{ $isMobile?: boolean }>`
      width: ${(p) => (p.$isMobile ? 12 : 15)}px;
      height: ${(p) => (p.$isMobile ? 12 : 15)}px;
      opacity: 1;
`;

const StyledHeroBadgeText = styled.span<{ $isMobile?: boolean }>`
      font-family: "Roboto Mono", monospace;
      font-size: ${(p) => (p.$isMobile ? 9 : 10)}px;
      font-weight: 400;
      text-transform: uppercase;
      letter-spacing: ${(p) => (p.$isMobile ? "0.08em" : "0.12em")};
      color: ${C.text};
      opacity: 0.7;
      display: inline-flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0 2px;
      line-height: 1;
`;

const StyledHeroH1 = styled.h1<{ $isMobile: boolean }>`
      font-family: "Epilogue", sans-serif;
      font-size: ${(p) => (p.$isMobile ? "36px" : "clamp(42px, 4.5vw, 68px)")};
      font-weight: 900;
      line-height: 1.05;
      color: ${C.text};
      letter-spacing: -0.025em;
      margin-bottom: ${(p) => (p.$isMobile ? 16 : 26)}px;
      margin-top: ${(p) => (p.$isMobile ? 20 : 0)}px;
`;

const StyledHeroRe = styled.span`
      font-weight: 100;
      opacity: 0.75;
`;

const StyledHeroSubtitle = styled.p<{ $isMobile: boolean }>`
      font-family: "Epilogue", sans-serif;
      font-size: ${(p) => (p.$isMobile ? 16 : 18)}px;
      line-height: 1.65;
      color: ${C.text};
      opacity: 0.68;
      margin: ${(p) => (p.$isMobile ? "0 auto 24px" : "0 0 44px")};
      max-width: ${(p) => (p.$isMobile ? "100%" : "450px")};
`;

const StyledHeroCTAs = styled.div<{
      $isMobile: boolean;
      $hasVisualAbove?: boolean;
}>`
      display: flex;
      flex-direction: ${(p) => (p.$isMobile ? "column" : "row")};
      gap: 14px;
      align-items: center;
      justify-content: ${(p) => (p.$isMobile ? "center" : "flex-start")};
      margin-top: ${(p) => (p.$hasVisualAbove ? 32 : 0)}px;
`;

const StyledHeroVisual = styled.div<{ $isMobile: boolean }>`
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: ${(p) => (p.$isMobile ? "center" : "flex-end")};
      justify-content: center;
      position: relative;
      min-height: ${(p) => (p.$isMobile ? 0 : 500)}px;
      width: 100%;
      gap: ${(p) => (p.$isMobile ? 0 : 24)}px;
`;

const StyledHeroMascotWrap = styled.div<{ $isMobile: boolean }>`
      position: relative;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      z-index: 1;
`;

const StyledHeroGlowBlob = styled.div<{ $isMobile: boolean }>`
      position: absolute;
      width: ${(p) => (p.$isMobile ? 120 : 260)}px;
      height: ${(p) => (p.$isMobile ? 120 : 260)}px;
      border-radius: 50%;
      background: radial-gradient(
            circle,
            rgba(240, 94, 32, 0.11) 0%,
            transparent 70%
      );
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 20%);
`;

const StyledHeroGlowBlob2 = styled.div<{ $isMobile: boolean }>`
      position: absolute;
      width: ${(p) => (p.$isMobile ? 200 : 280)}px;
      height: ${(p) => (p.$isMobile ? 200 : 280)}px;
      border-radius: 50%;
      background: radial-gradient(
            circle,
            rgba(200, 160, 100, 0.09) 0%,
            transparent 70%
      );
      top: 30%;
      left: 40%;
      transform: translate(-50%, -50%);
`;

const StyledHeroMascot = styled.img<{ $isMobile: boolean }>`
      width: ${(p) => (p.$isMobile ? 90 : 200)}px;
      position: relative;
      z-index: 1;
      filter: drop-shadow(0 28px 52px rgba(59, 35, 10, 0.1));
`;

const StyledHeroPhoneWrap = styled.div<{ $isMobile?: boolean }>`
      position: relative;
      z-index: 1;
`;

const StyledHeroScreenshot = styled.img<{ $isMobile?: boolean }>`
      width: ${(p) => (p.$isMobile ? 200 : 240)}px;
      height: auto;
      display: block;
      object-fit: contain;
      object-position: center;
      border-radius: ${(p) => (p.$isMobile ? 24 : 24)}px;
      border: 2px solid rgba(59, 35, 10, 0.2);
      margin-top: ${(p) => (p.$isMobile ? 20 : 0)}px;
      margin-bottom: ${(p) => (p.$isMobile ? 20 : 0)}px;
      flex-shrink: 0;
`;

const StyledHeroAsterixe1 = styled.img<{ $isMobile: boolean }>`
      position: absolute;
      top: ${(p) => (p.$isMobile ? 40 : 80)}px;
      right: ${(p) => (p.$isMobile ? 40 : 60)}px;
      width: ${(p) => (p.$isMobile ? 16 : 22)}px;
      opacity: 0.2;
      z-index: 0;
`;

const StyledHeroAsterixe2 = styled.img<{ $isMobile: boolean }>`
      position: absolute;
      top: ${(p) => (p.$isMobile ? 140 : 200)}px;
      left: ${(p) => (p.$isMobile ? 20 : 30)}px;
      width: ${(p) => (p.$isMobile ? 12 : 14)}px;
      opacity: 0.15;
      z-index: 0;
`;

const StyledQuoteSection = styled.section<{ $isMobile: boolean }>`
      background-color: ${C.beigeMid};
      padding: ${(p) => (p.$isMobile ? "64px 24px" : "88px 56px")};
      text-align: ${(p) => (p.$isMobile ? "left" : "center")};
      position: relative;
      overflow: hidden;
`;

const StyledQuoteInner = styled.div<{ $isMobile?: boolean }>`
      max-width: 760px;
      margin: ${(p) => (p.$isMobile ? "0" : "0 auto")};
      position: relative;
      z-index: 1;
`;

const StyledQuoteAsterixeSmall = styled.img<{ $isMobile: boolean }>`
      width: ${(p) => (p.$isMobile ? 18 : 22)}px;
      height: ${(p) => (p.$isMobile ? 18 : 22)}px;
      filter: invert(1);
      opacity: 0.45;
      margin-bottom: ${(p) => (p.$isMobile ? 20 : 28)}px;
      display: inline-block;
`;

const StyledQuoteIntro = styled.span`
      display: block;
      font-family: "Epilogue", sans-serif;
      font-size: 0.82em;
      font-style: normal;
      opacity: 0.5;
      margin-bottom: 1em;
`;

const StyledQuoteBlockquote = styled.blockquote<{ $isMobile: boolean }>`
      font-family: "Playfair Display", serif;
      font-size: ${(p) => (p.$isMobile ? "20px" : "clamp(19px, 2.8vw, 29px)")};
      font-style: italic;
      font-weight: 400;
      color: ${C.text};
      line-height: 1.65;
      margin: 0 0 24px;
      text-align: ${(p) => (p.$isMobile ? "justify" : "inherit")};
`;

const StyledQuoteCite = styled.cite`
      font-family: "Roboto Mono", monospace;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: ${C.text};
      opacity: 0.38;
      font-style: normal;
`;

const StyledReadingSection = styled.section<{
      $isMobile: boolean;
      $isTablet: boolean;
}>`
      padding: ${(p) =>
            p.$isMobile
                  ? "80px 24px"
                  : p.$isTablet
                    ? "96px 40px"
                    : "108px 56px"};
      max-width: 1280px;
      margin: 0 auto;
      display: flex;
      flex-direction: ${(p) => (p.$isMobile ? "column" : "row")};
      align-items: center;
      gap: ${(p) => (p.$isMobile ? 56 : 56)}px;
`;

const StyledReadingLeft = styled.div<{ $isMobile: boolean }>`
      flex: ${(p) => (p.$isMobile ? "none" : "0 0 45%")};
      max-width: ${(p) => (p.$isMobile ? "100%" : "480px")};
`;

const StyledReadingHeader = styled.div<{ $isMobile: boolean }>`
      text-align: ${(p) => (p.$isMobile ? "center" : "left")};
      margin-bottom: ${(p) => (p.$isMobile ? 40 : 32)}px;
`;

const StyledReadingTag = styled.span`
      font-family: "Roboto Mono", monospace;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: ${C.accent};
      display: block;
      margin-bottom: 14px;
`;

const StyledReadingH2 = styled.h2<{ $isMobile: boolean }>`
      font-family: "Epilogue", sans-serif;
      font-size: ${(p) => (p.$isMobile ? "32px" : "clamp(28px, 3.5vw, 48px)")};
      font-weight: 900;
      color: ${C.text};
      letter-spacing: -0.02em;
      line-height: 1.1;
      margin: 0 0 20px;
`;

const StyledReadingP = styled.p<{ $isMobile: boolean }>`
      font-family: "Epilogue", sans-serif;
      font-size: ${(p) => (p.$isMobile ? 15 : 17)}px;
      line-height: 1.65;
      color: ${C.text};
      opacity: 0.68;
      max-width: 560px;
      margin: 0 auto;
`;

const StyledReadingFeatures = styled.div<{ $isMobile: boolean }>`
      display: flex;
      flex-direction: ${(p) => (p.$isMobile ? "column" : "row")};
      gap: ${(p) => (p.$isMobile ? 20 : 24)}px;
      justify-content: ${(p) => (p.$isMobile ? "center" : "flex-start")};
`;

const StyledReadingFeature = styled.div<{ $isMobile?: boolean }>`
      flex: 1;
      max-width: 280px;
      margin: ${(p) => (p.$isMobile ? "0 auto" : "0")};
      text-align: ${(p) => (p.$isMobile ? "center" : "left")};
`;

const StyledReadingFeatureTitle = styled.div`
      font-family: "Roboto Mono", monospace;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: ${C.accent};
      margin-bottom: 8px;
`;

const StyledReadingFeatureDesc = styled.div`
      font-family: "Epilogue", sans-serif;
      font-size: 14px;
      line-height: 1.5;
      color: ${C.text};
      opacity: 0.72;
`;

const StyledReadingMockups = styled.div<{ $isMobile: boolean }>`
      flex: ${(p) => (p.$isMobile ? "none" : 1)};
      display: flex;
      flex-direction: row;
      gap: ${(p) => (p.$isMobile ? 16 : 24)}px;
      justify-content: center;
      align-items: center;
      width: 100%;
`;

const StyledReadingMockup = styled.div<{ $isMobile?: boolean }>`
      flex: 1;
      max-width: ${(p) => (p.$isMobile ? 140 : 320)}px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
`;

const StyledReadingMockupLabel = styled.span`
      font-family: "Roboto Mono", monospace;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: ${C.text};
      font-weight: 600;
      opacity: 0.6;
`;

const StyledReadingMockupImg = styled.img<{ $isMobile?: boolean }>`
      width: 100%;
      max-width: ${(p) => (p.$isMobile ? 120 : 200)}px;
      height: auto;
      display: block;
      border-radius: ${(p) => (p.$isMobile ? 18 : 24)}px;
      border: 2px solid rgba(59, 35, 10, 0.2);
      object-fit: contain;
`;

const StyledFeaturesSection = styled.section<{
      $isMobile: boolean;
      $isTablet: boolean;
}>`
      padding: ${(p) =>
            p.$isMobile
                  ? "80px 24px"
                  : p.$isTablet
                    ? "96px 40px"
                    : "108px 56px"};
      max-width: 1280px;
      margin: 0 auto;
`;

const StyledFeaturesTag = styled.span`
      font-family: "Roboto Mono", monospace;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: ${C.accent};
      display: block;
      margin-bottom: 14px;
`;

const StyledFeaturesH2 = styled.h2<{ $isMobile: boolean }>`
      font-family: "Epilogue", sans-serif;
      font-size: ${(p) => (p.$isMobile ? "32px" : "clamp(28px, 3.5vw, 48px)")};
      font-weight: 900;
      color: ${C.text};
      letter-spacing: -0.02em;
      line-height: 1.1;
      margin: 0;
`;

const StyledFeaturesGrid = styled.div<{
      $isMobile: boolean;
      $isTablet: boolean;
}>`
      display: grid;
      grid-template-columns: ${(p) =>
            p.$isMobile
                  ? "1fr"
                  : p.$isTablet
                    ? "repeat(2, 1fr)"
                    : "repeat(3, 1fr)"};
      gap: 18px;
`;

const StyledFeatureCard = styled.div<{
      $dark: boolean;
      $isMobile: boolean;
      $isTablet: boolean;
      $fullWidth: boolean;
}>`
      background-color: ${(p) => (p.$dark ? C.text : C.beige)};
      border-radius: 22px;
      padding: ${(p) => (p.$isMobile ? "32px 28px" : "40px 36px")};
      display: flex;
      flex-direction: column;
      ${(p) =>
            p.$fullWidth
                  ? `
    grid-column: 1 / -1;
    max-width: 600px;
    margin: 0 auto;
  `
                  : ""}
`;

const StyledFeatureEmoji = styled.span<{
      $emoji: string;
      $dark: boolean;
}>`
      font-size: ${(p) => (p.$emoji === "✦" ? 28 : 34)}px;
      display: block;
      margin-bottom: 22px;
      color: ${(p) => (p.$dark ? C.bg : C.accent)};
      line-height: 1;
`;

const StyledFeatureTag = styled.span<{ $dark: boolean }>`
      font-family: "Roboto Mono", monospace;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.13em;
      color: ${(p) => (p.$dark ? C.bg : C.accent)};
      opacity: ${(p) => (p.$dark ? 0.45 : 1)};
      display: block;
      margin-bottom: 12px;
`;

const StyledFeatureH3 = styled.h3<{ $dark: boolean; $isMobile: boolean }>`
      font-family: "Epilogue", sans-serif;
      font-size: ${(p) => (p.$isMobile ? 20 : 22)}px;
      font-weight: 800;
      color: ${(p) => (p.$dark ? C.bg : C.text)};
      letter-spacing: -0.015em;
      line-height: 1.2;
      margin-bottom: 18px;
      white-space: pre-line;
`;

const StyledFeatureP = styled.p<{ $dark: boolean; $isMobile: boolean }>`
      font-family: "Epilogue", sans-serif;
      font-size: ${(p) => (p.$isMobile ? 14 : 15)}px;
      line-height: 1.68;
      color: ${(p) => (p.$dark ? C.bg : C.text)};
      opacity: ${(p) => (p.$dark ? 0.65 : 0.68)};
      margin: 0;
`;

const StyledStreakSection = styled.section<{
      $isMobile: boolean;
      $isTablet: boolean;
}>`
      padding: ${(p) =>
            p.$isMobile
                  ? "80px 24px"
                  : p.$isTablet
                    ? "96px 40px"
                    : "108px 56px"};
      background-color: ${C.beigeMid};
`;

const StyledStreakInner = styled.div`
      max-width: 1280px;
      margin: 0 auto;
`;

const StyledStreakHeader = styled.div<{ $isMobile: boolean }>`
      text-align: center;
      margin-bottom: ${(p) => (p.$isMobile ? 48 : 72)}px;
`;

const StyledStreakTag = styled.span`
      font-family: "Roboto Mono", monospace;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: ${C.accent};
      display: block;
      margin-bottom: 14px;
`;

const StyledStreakH2 = styled.h2<{ $isMobile: boolean }>`
      font-family: "Epilogue", sans-serif;
      font-size: ${(p) => (p.$isMobile ? "32px" : "clamp(28px, 3.5vw, 48px)")};
      font-weight: 900;
      color: ${C.text};
      letter-spacing: -0.02em;
      line-height: 1.1;
      margin-bottom: 20px;
`;

const StyledStreakP = styled.p<{ $isMobile: boolean }>`
      font-family: "Epilogue", sans-serif;
      font-size: ${(p) => (p.$isMobile ? 15 : 17)}px;
      color: ${C.text};
      opacity: 0.62;
      max-width: 480px;
      margin: 0 auto;
      line-height: 1.62;
`;

const StyledStreakRow = styled.div<{ $isMobile: boolean; $isTablet: boolean }>`
      display: flex;
      flex-direction: ${(p) => (p.$isMobile ? "column" : "row")};
      justify-content: center;
      align-items: center;
      gap: ${(p) => (p.$isMobile ? 24 : p.$isTablet ? 24 : 36)}px;
      ${(p) =>
            p.$isMobile
                  ? `
    max-width: 200px;
    margin: 0 auto;
  `
                  : ""}
`;

const StyledStreakItem = styled.div<{
      $isMobile: boolean;
      $active: boolean;
      $isRow: boolean;
}>`
      display: flex;
      flex-direction: ${(p) => (p.$isRow ? "row" : "column")};
      align-items: center;
      gap: ${(p) => (p.$isMobile ? 16 : 18)}px;
      cursor: ${(p) => (p.$isMobile ? "pointer" : "default")};
      transition: transform 0.32s cubic-bezier(0.34, 1.56, 0.64, 1);
      transform: ${(p) =>
            p.$active
                  ? `translateY(${p.$isMobile ? -8 : -16}px)`
                  : "translateY(0)"};
      ${(p) =>
            p.$isMobile
                  ? `
    width: 100%;
    justify-content: flex-start;
    padding: 12px 16px;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
  `
                  : ""}
`;

const StyledStreakImgWrap = styled.div`
      position: relative;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 4px;
`;

const StyledStreakGlow = styled.div<{ $color: string; $size: number }>`
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: ${(p) => p.$size * 2}px;
      height: ${(p) => p.$size * 2}px;
      border-radius: 50%;
      background-color: ${(p) => p.$color};
      filter: blur(22px);
      transition: background-color 0.32s ease;
`;

const StyledStreakImg = styled.img<{
      $size: number;
      $active: boolean;
      $glowHover: string;
}>`
      width: ${(p) => (p.$active ? p.$size * 1.14 : p.$size)}px;
      position: relative;
      z-index: 1;
      transition: width 0.32s cubic-bezier(0.34, 1.56, 0.64, 1);
      filter: ${(p) =>
            p.$active ? `drop-shadow(0 6px 16px ${p.$glowHover})` : "none"};
`;

const StyledStreakLabels = styled.div<{ $isMobile: boolean }>`
      text-align: ${(p) => (p.$isMobile ? "left" : "center")};
      flex: ${(p) => (p.$isMobile ? 1 : "none")};
`;

const StyledStreakLabel = styled.div<{ $active: boolean }>`
      font-family: "Epilogue", sans-serif;
      font-size: 13px;
      font-weight: 700;
      color: ${C.text};
      margin-bottom: 2px;
      opacity: ${(p) => (p.$active ? 1 : 0.75)};
      transition: opacity 0.2s;
`;

const StyledStreakSub = styled.div<{ $active: boolean }>`
      font-family: "Roboto Mono", monospace;
      font-size: 9px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: ${C.text};
      opacity: ${(p) => (p.$active ? 0.6 : 0.35)};
      transition: opacity 0.2s;
`;

const StyledPathsSection = styled.section<{
      $isMobile: boolean;
      $isTablet: boolean;
}>`
      padding: ${(p) =>
            p.$isMobile
                  ? "80px 24px"
                  : p.$isTablet
                    ? "96px 40px"
                    : "108px 56px"};
      max-width: 1280px;
      margin: 0 auto;
`;

const StyledPathsHeader = styled.div<{ $isMobile: boolean }>`
      text-align: center;
      margin-bottom: ${(p) => (p.$isMobile ? 40 : 56)}px;
`;

const StyledPathsGrid = styled.div<{ $isMobile: boolean }>`
      display: grid;
      grid-template-columns: ${(p) =>
            p.$isMobile ? "1fr" : "1fr auto 1fr 1fr"};
      gap: 22px;
      align-items: center;
`;

const StyledPathPlus = styled.div<{ $isMobile: boolean }>`
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: "Epilogue", sans-serif;
      font-size: ${(p) => (p.$isMobile ? 24 : 32)}px;
      font-weight: 300;
      color: ${C.text};
      opacity: 0.5;
      ${(p) => p.$isMobile && "padding: 12px 0;"}
`;

const StyledPathCardFree = styled.div<{ $isMobile: boolean }>`
      background-color: transparent;
      border: 2px dashed rgba(59, 35, 10, 0.25);
      border-radius: 24px;
      padding: ${(p) => (p.$isMobile ? "36px 28px" : "48px 44px")};
      display: flex;
      flex-direction: column;
      gap: 26px;
`;

const StyledPathCard = styled.div<{ $dark: boolean; $isMobile: boolean }>`
      background-color: ${(p) => (p.$dark ? C.text : C.beige)};
      border-radius: 24px;
      padding: ${(p) => (p.$isMobile ? "36px 28px" : "48px 44px")};
      display: flex;
      flex-direction: column;
      gap: 26px;
`;

const StyledPathH3 = styled.h3<{ $dark: boolean; $isMobile: boolean }>`
      font-family: "Epilogue", sans-serif;
      font-size: ${(p) => (p.$isMobile ? 26 : 32)}px;
      font-weight: 900;
      color: ${(p) => (p.$dark ? C.bg : C.text)};
      letter-spacing: -0.02em;
      line-height: 1.1;
      margin: 0;
`;

const StyledPathP = styled.p<{ $dark: boolean; $isMobile: boolean }>`
      font-family: "Epilogue", sans-serif;
      font-size: ${(p) => (p.$isMobile ? 14 : 15)}px;
      line-height: 1.65;
      color: ${(p) => (p.$dark ? C.bg : C.text)};
      opacity: ${(p) => (p.$dark ? 0.58 : 0.68)};
      margin: 0;
`;

const StyledPathUl = styled.ul`
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 10px;
`;

const StyledPathLi = styled.li<{ $dark: boolean; $isMobile: boolean }>`
      font-family: "Epilogue", sans-serif;
      font-size: ${(p) => (p.$isMobile ? 13 : 14)}px;
      color: ${(p) => (p.$dark ? C.bg : C.text)};
      opacity: ${(p) => (p.$dark ? 0.75 : 0.78)};
      display: flex;
      align-items: flex-start;
      gap: 10px;
      line-height: 1.45;
`;

const StyledPathBullet = styled.span<{ $dark: boolean }>`
      color: ${(p) => (p.$dark ? C.accent : C.text)};
      font-weight: 400;
      font-size: 1.2em;
      line-height: 1.6;
      flex-shrink: 0;
`;

const StyledPathCtaWrap = styled.div`
      margin-top: auto;
      padding-top: 8px;
      display: flex;
      justify-content: center;
`;

const StyledPathScreenshot = styled.img<{
      $isMobile?: boolean;
      $dark?: boolean;
}>`
      width: 100%;
      max-width: ${(p) => (p.$isMobile ? 120 : 200)}px;
      height: auto;
      display: block;
      border-radius: ${(p) => (p.$isMobile ? 18 : 24)}px;
      border: 2px solid
            ${(p) =>
                  p.$dark
                        ? "rgba(238, 235, 230, 0.25)"
                        : "rgba(59, 35, 10, 0.2)"};
      object-fit: contain;
`;

const StyledDownloadCTA = styled.section<{ $isMobile: boolean }>`
      background-color: ${C.beigeMid};
      padding: ${(p) => (p.$isMobile ? "72px 24px 64px" : "96px 56px 88px")};
`;

const StyledDownloadCTAInner = styled.div`
      max-width: 640px;
      margin: 0 auto;
      text-align: center;
`;

const StyledDownloadCTAH2 = styled.h2<{ $isMobile: boolean }>`
      font-family: "Epilogue", sans-serif;
      font-size: ${(p) => (p.$isMobile ? "28px" : "clamp(26px, 3vw, 40px)")};
      font-weight: 600;
      color: ${C.text};
      margin: 0 0 12px;
      line-height: 1.25;
`;

const StyledDownloadCTAP = styled.p<{ $isMobile: boolean }>`
      font-family: "Epilogue", sans-serif;
      font-size: ${(p) => (p.$isMobile ? 15 : 17)}px;
      color: ${C.text};
      opacity: 0.72;
      margin: 0 0 32px;
`;

const StyledDownloadCTABtns = styled.div<{ $isMobile: boolean }>`
      display: flex;
      flex-direction: ${(p) => (p.$isMobile ? "column" : "row")};
      justify-content: center;
      align-items: center;
      gap: 16px;
`;

const StyledFooter = styled.footer<{ $isMobile: boolean }>`
      background-color: ${C.beigeMid};
      padding: ${(p) => (p.$isMobile ? "48px 24px 32px" : "64px 56px 40px")};
`;

const StyledFooterInner = styled.div`
      max-width: 1280px;
      margin: 0 auto;
`;

const StyledFooterTop = styled.div<{ $isMobile: boolean }>`
      display: flex;
      flex-direction: ${(p) => (p.$isMobile ? "column" : "row")};
      justify-content: space-between;
      align-items: ${(p) => (p.$isMobile ? "center" : "flex-start")};
      margin-bottom: ${(p) => (p.$isMobile ? 36 : 52)}px;
      gap: ${(p) => (p.$isMobile ? 56 : 48)}px;
      text-align: ${(p) => (p.$isMobile ? "center" : "left")};
`;

const StyledFooterBrand = styled.div<{ $isMobile: boolean }>`
      max-width: ${(p) => (p.$isMobile ? "100%" : "280px")};
      order: ${(p) => (p.$isMobile ? 1 : 0)};
`;

const StyledFooterLogo = styled.img<{ $isMobile: boolean }>`
      height: ${(p) => (p.$isMobile ? 28 : 32)}px;
      margin-bottom: 16px;
      opacity: 0.88;
`;

const StyledFooterBrandP = styled.p<{ $isMobile: boolean }>`
      font-family: "Epilogue", sans-serif;
      font-size: ${(p) => (p.$isMobile ? 13 : 14)}px;
      color: ${C.text};
      opacity: 0.48;
      margin: 0;
      line-height: 1.65;
`;

const StyledFooterNav = styled.div<{ $isMobile: boolean }>`
      display: flex;
      flex-direction: ${(p) => (p.$isMobile ? "column" : "row")};
      gap: ${(p) => (p.$isMobile ? 24 : 64)}px;
      order: ${(p) => (p.$isMobile ? 2 : 0)};
`;

const StyledFooterCol = styled.div<{ $isMobile: boolean }>`
      text-align: ${(p) => (p.$isMobile ? "center" : "left")};
`;

const StyledFooterColTitle = styled.div`
      font-family: "Roboto Mono", monospace;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.13em;
      color: ${C.text};
      opacity: 0.32;
      margin-bottom: 18px;
`;

const StyledFooterLink = styled.a<{ $isMobile: boolean }>`
      display: block;
      font-family: "Epilogue", sans-serif;
      font-size: ${(p) => (p.$isMobile ? 13 : 14)}px;
      color: ${C.text};
      opacity: 0.58;
      text-decoration: none;
      margin-bottom: ${(p) => (p.$isMobile ? 4 : 10)}px;
      line-height: 1.45;
`;

const StyledFooterBottom = styled.div<{ $isMobile: boolean }>`
      border-top: 1px solid rgba(238, 235, 230, 0.1);
      padding-top: 24px;
      display: flex;
      flex-direction: ${(p) => (p.$isMobile ? "column" : "row")};
      justify-content: space-between;
      align-items: center;
      gap: ${(p) => (p.$isMobile ? 12 : 0)}px;
      text-align: center;
`;

const StyledFooterCopyright = styled.span`
      font-family: "Roboto Mono", monospace;
      font-size: 10px;
      color: ${C.text};
      opacity: 0.6;
      text-transform: uppercase;
      letter-spacing: 0.1em;
`;

const StyledFooterLove = styled.span`
      font-family: "Epilogue", sans-serif;
      font-size: 13px;
      color: ${C.text};
      opacity: 0.6;
`;
