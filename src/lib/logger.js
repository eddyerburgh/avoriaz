export function warn(message) {
  console.warn(`[avoriaz] WARN: ${message}`);
}

export function error(message) {
  throw new Error(`[avoriaz]: ${message}`);
}
