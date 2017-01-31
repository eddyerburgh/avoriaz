import findMatchingVNodes from '../../../src/lib/findMatchingVNodes';
import '../../../src/lib/matchesPolyfill';

function elementWithAttribute(tag, attributes) {
  const element = document.createElement(tag);
  Object.keys(attributes).forEach((key) => {
    element.setAttribute(key, attributes[key]);
  });
  return element;
}

function elementWithClass(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

const vNodeMock = {
  elm: elementWithClass('div', 'find'),
  child: {
    _vnode: {
      children: [
        { elm: elementWithClass('div', 'find') },
        {
          elm: elementWithAttribute('div', { attribute: 'value' }),
          children: [{
            elm: elementWithClass('p', 'some-class'),
            children: [
              {
                elm: elementWithClass('p', 'another-class'),
                children: [{ elm: elementWithClass('div', 'another-class') }] },
            ],
          }],
        },
      ],
    },
  },
  children: [
    {
      elm: elementWithAttribute('div', { id: 'id', attribute: 'some value' }),
      children: [
        { elm: elementWithClass('div', 'find') },
        { elm: elementWithClass('div', 'find') },
        { elm: { nodeName: '#text' },
        },
      ],
    },
    { elm: elementWithClass('div', 'this that') },
  ],
};

describe('findMatchingVNodes', () => {
  it('returns an array of vNodes of elements matching tag selector passed', () => {
    expect(findMatchingVNodes(vNodeMock, 'div').length).to.equal(8);
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

  it('returns an array of vNodes of elements matching tag selector passed with descendant combinator', () => {
    expect(findMatchingVNodes(vNodeMock, 'p p div').length).to.equal(1);
  });
});
