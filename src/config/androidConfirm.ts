/**
 * Chemin de confirmation après clic e-mail (liste d’attente Android).
 * Non listé dans la navigation — à utiliser uniquement comme URL de redirection Tally.
 */
/** Segment pour React Router (sans slash initial). */
export const ANDROID_CONFIRM_ROUTE = "r/w9k2m7p4xq8n6v3";

/** Chemin public (URL Tally, liens). */
export const ANDROID_CONFIRM_PATH = `/${ANDROID_CONFIRM_ROUTE}`;

/** URLs complètes à coller dans Tally (redirection après soumission / clic). */
export const ANDROID_CONFIRM_TALLY_REDIRECT_URLS = {
      /** Site servi à la racine (minimoapps.fr). */
      root: `https://minimoapps.fr${ANDROID_CONFIRM_PATH}`,
      /** Même build sous /suhab (minimoapps.fr/suhab). */
      suhab: `https://minimoapps.fr/suhab${ANDROID_CONFIRM_PATH}`,
} as const;
