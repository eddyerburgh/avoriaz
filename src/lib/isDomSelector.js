function isDomSelector(str) {
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

module.exports = isDomSelector;
