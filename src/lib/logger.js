// @flow

export function warn(message: string) {
  console.warn(`[avoriaz] WARN: ${message}`);
}

export function error(message: string) {
  throw new Error(`[avoriaz]: ${message}`);
}
