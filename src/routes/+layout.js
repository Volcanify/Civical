export const prerender = true;

import posthog from 'posthog-js';
import { browser } from '$app/environment';

export const prerender = true;

export const load = async () => {
  if (browser && !posthog.__loaded) {
    posthog.init('phc_WqSMXohypdxpBdGEFrJBIcTwzn0f1yKauzKY6UbxJHg', {
      api_host: 'https://us.i.posthog.com',
      autocapture: false,
      capture_pageview: false,
    });

    posthog.__loaded = true;
  }
};
