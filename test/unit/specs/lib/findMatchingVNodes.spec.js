import findMatchingVNodes from '../../../../src/lib/findMatchingVNodes';
import '../../../../src/lib/matchesPolyfill';

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
  key: 1,
  child: {
    _vnode: {
      children: [
        { elm: elementWithClass('div', 'find'), key: 2 },
        {
          elm: elementWithAttribute('div', { attribute: 'value' }),
          key: 3,
          children: [{
            elm: elementWithClass('p', 'some-class'),
            key: 4,
            children: [
              {
                elm: elementWithClass('p', 'another-class'),
                key: 5,
                children: [{ elm: elementWithClass('div', 'another-class'), key: 6 }] },
            ],
          }],
        },
      ],
    },
  },
  children: [
    {
      elm: elementWithAttribute('div', { id: 'id', attribute: 'some value' }),
      key: 7,
      children: [
        { elm: elementWithClass('div', 'find'), key: 8 },
        { elm: elementWithClass('div', 'find'), key: 9 },
        { elm: { nodeName: '#text' }, key: 10,
        },
      ],
    },
    { elm: elementWithClass('div', 'this that'), key: 11 },
  ],
};

describe.skip('findMatchingVNodes', () => {
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

  it('returns an array of vNodes of elements matching tag selector passed with direct descendant combinator', () => {
    expect(findMatchingVNodes(vNodeMock, 'div > div').length).to.equal(6);
  });
});
