// @flow

export function isDomSelector(str: any) {
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

export function isVueComponent(component: any) {
  if (typeof component === 'function') {
    return false;
  }

  if (component === null) {
    return false;
  }

  if (typeof component !== 'object') {
    return false;
  }

  return typeof component.render === 'function';
}

export function isValidSelector(selector: any) {
  if (isDomSelector(selector)) {
    return true;
  }

  return isVueComponent(selector);
}
