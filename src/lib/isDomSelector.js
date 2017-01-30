function isDomSelector(str) {
  if (typeof str !== 'string') {
    return false;
  }

  try {
    document.querySelector(str);
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = isDomSelector;
