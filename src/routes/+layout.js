export const prerender = true;
import posthog from 'posthog-js'
import { browser } from '$app/environment';

export const load = async () => {
  if (browser) {
    posthog.init('phc_WqSMXohypdxpBdGEFrJBIcTwzn0f1yKauzKY6UbxJHg', {
      api_host: 'https://us.i.posthog.com',
      defaults: '2025-05-24',
    })
  }

  return
};