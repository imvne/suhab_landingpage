/** App Store (iOS) — page web. */
export const APP_STORE_LINK =
      "https://apps.apple.com/fr/app/%E1%B9%A3u%E1%B8%A5ab-lis-et-%C3%A9coute-le-coran/id6760666090";

export const APP_STORE_ID = "6760666090";

/** Ouvre l’app App Store sur iOS (itms-apps). */
export const APP_STORE_NATIVE_LINK = `itms-apps://apps.apple.com/app/id${APP_STORE_ID}`;

/** Google Play (Android) — page web. */
export const PLAY_STORE_LINK =
      "https://play.google.com/store/apps/details?id=com.ansamita.suhab&hl=fr";

export const PLAY_STORE_PACKAGE = "com.ansamita.suhab";

/** Ouvre l’app Play Store sur Android. */
export const PLAY_STORE_NATIVE_LINK = `market://details?id=${PLAY_STORE_PACKAGE}`;

/**
 * Intent Android — utile dans certaines WebViews (Instagram, Facebook, etc.).
 * @see https://developer.chrome.com/docs/android/intents
 */
export const PLAY_STORE_INTENT_LINK =
      `intent://details?id=${PLAY_STORE_PACKAGE}#Intent;scheme=market;action=android.intent.action.VIEW;package=com.android.vending;end`;

function isIOS(): boolean {
      if (typeof navigator === "undefined") return false;
      return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function isAndroid(): boolean {
      if (typeof navigator === "undefined") return false;
      return /Android/i.test(navigator.userAgent);
}

function isInAppBrowser(): boolean {
      if (typeof navigator === "undefined") return false;
      const ua = navigator.userAgent;
      return /Instagram|FBAN|FBAV|FB_IAB|Twitter|Line\/|Snapchat|TikTok|musical_ly/i.test(
            ua,
      );
}

/**
 * Tente une URL native (store app), puis bascule sur la page web si rien ne s’ouvre.
 */
function openWithNativeFallback(nativeUrl: string, webUrl: string): void {
      let fallbackTimer: ReturnType<typeof setTimeout> | undefined;

      const cancelFallback = () => {
            if (fallbackTimer !== undefined) {
                  clearTimeout(fallbackTimer);
                  fallbackTimer = undefined;
            }
            window.removeEventListener("pagehide", cancelFallback);
            window.removeEventListener("blur", cancelFallback);
            document.removeEventListener("visibilitychange", onVisibility);
      };

      const onVisibility = () => {
            if (document.visibilityState === "hidden") cancelFallback();
      };

      window.addEventListener("pagehide", cancelFallback);
      window.addEventListener("blur", cancelFallback);
      document.addEventListener("visibilitychange", onVisibility);

      fallbackTimer = setTimeout(() => {
            cancelFallback();
            window.location.assign(webUrl);
      }, 1200);

      window.location.assign(nativeUrl);
}

function openExternalWeb(url: string): void {
      const opened = window.open(url, "_blank", "noopener,noreferrer");
      if (!opened) window.location.assign(url);
}

/** Clic badge App Store — store natif sur iOS, sinon page web. */
export function openAppStore(): void {
      if (isIOS()) {
            openWithNativeFallback(APP_STORE_NATIVE_LINK, APP_STORE_LINK);
            return;
      }
      openExternalWeb(APP_STORE_LINK);
}

/** Clic badge Play Store — Play Store natif sur Android, sinon page web. */
export function openPlayStore(): void {
      if (!isAndroid()) {
            openExternalWeb(PLAY_STORE_LINK);
            return;
      }

      if (isInAppBrowser()) {
            openWithNativeFallback(PLAY_STORE_INTENT_LINK, PLAY_STORE_LINK);
            return;
      }

      openWithNativeFallback(PLAY_STORE_NATIVE_LINK, PLAY_STORE_LINK);
}
