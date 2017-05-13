export function isDomSelector(str) {
  if (typeof str !== 'string') {
    return false;
  }

  try {
    if (!document) {
      throw new Error('avoriaz must be run in a browser environment like PhantomJS, jsdom or chrome');
    }
  } catch (error) {
    throw new Error('avoriaz must be run in a browser environment like PhantomJS, jsdom or chrome');
  }

  try {
    document.querySelector(str);
    return true;
  } catch (error) {
    return false;
  }
}

export function isValidSelector(selector) {
  if (isDomSelector(selector)) {
    return true;
  }
  if (typeof selector === 'function') {
    return false;
  }

  if (selector === null) {
    return false;
  }

  if (typeof selector !== 'object') {
    return false;
  }

  if (typeof selector.name !== 'string') {
    return false;
  }

  return true;
}
