export const stubTransitions = () => {
  window.getComputedStyle = () => ({
    transitionDelay: '',
    animationDelay: '',
    transitionDuration: '',
    animationDuration: '',
  });
};

export default {
  stubTransitions,
};
