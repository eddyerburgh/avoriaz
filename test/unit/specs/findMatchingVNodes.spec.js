import findMatchingVNodes from '../../../src/lib/findMatchingVNodes';
import '../../../src/lib/matchesPolyfill';

function divWithAttribute(attributes) {
  const element = document.createElement('div');
  Object.keys(attributes).forEach((key) => {
    element.setAttribute(key, attributes[key]);
  });
  return element;
}

function divWithClass(className) {
  const element = document.createElement('div');
  element.className = className;
  return element;
}

const vNodeMock = {
  elm: divWithClass('find'),
  tag: 'div',
  child: {
    _vnode: {
      children: [
        {
          elm: divWithClass('find'),
          tag: 'div',
          child: undefined,
          children: undefined,
        },
        {
          elm: divWithAttribute({ attribute: 'value' }),
          tag: 'div',
          child: undefined,
          children: undefined,
        },
      ],
    },
  },
  children: [
    {
      elm: divWithAttribute({ id: 'id', attribute: 'some value' }),
      tag: 'div',
      child: undefined,
      children: [
        {
          elm: divWithClass('find'),
          tag: 'p',
          children: undefined,
        },
        {
          elm: divWithClass('find'),
          tag: 'div',
          child: undefined,
          children: undefined,
        },
        {
          elm: {
            nodeName: '#text',
          },
        },
      ],
    },
    {
      elm: divWithClass('this that'),
      tag: 'div',
      child: undefined,
      children: undefined,
    },
  ],
};

describe('findMatchingVNodes', () => {
  it('returns an array of vNodes of elements matching tag selector passed', () => {
    expect(findMatchingVNodes(vNodeMock, 'div').length).to.equal(7);
  });

  it('returns an array of vNodes of elements matching className passed', () => {
    expect(findMatchingVNodes(vNodeMock, '.find').length).to.equal(4);
  });

  it('returns an array of vNodes of elements matching className passed when node has multiple classes', () => {
    expect(findMatchingVNodes(vNodeMock, '.this').length).to.equal(1);
  });

  it('returns an array of vNodes of elements with attribute matching attribute passed', () => {
    expect(findMatchingVNodes(vNodeMock, '[attribute]').length).to.equal(2);
  });

  it('returns an array of vNodes of elements with attribute and exact value matching selector', () => {
    expect(findMatchingVNodes(vNodeMock, '[attribute="value"]').length).to.equal(1);
  });

  it('returns an array of vNodes of elements with attribute and value matching selector', () => {
    expect(findMatchingVNodes(vNodeMock, '[attribute~="value"]').length).to.equal(2);
  });

  it('returns an array of vNodes of elements matching id passed', () => {
    expect(findMatchingVNodes(vNodeMock, '#id').length).to.equal(1);
  });
});
