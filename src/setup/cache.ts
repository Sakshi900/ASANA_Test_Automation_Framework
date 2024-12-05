import { Page } from '@playwright/test';

const cache: Cache = {};

interface Cache {
  [key: string]: Page;
}

//if the cache key doesn't exist this will return undefined
//which is what we want
export function get(key: string) {
  return cache[key];
}

export function set(key: string, value: Page) {
  cache[key] = value;
}
