import * as vNode from '../../../src/vNode';


function elementWithId(id) {
  const element = document.createElement('p');
  element.setAttribute('id', id);
  return element;
}

const vNodeMock = {
  elm: {
    className: 'find',
  },
  tag: 'span',
  child: undefined,
  children: [
    {
      elm: elementWithId('id'),
      tag: 'div',
      child: undefined,
      children: [
        {
          elm: {
            className: 'find',
          },
          tag: 'p',
          children: undefined,
        },
        {
          elm: {
            className: undefined,
          },
          tag: 'div',
          child: undefined,
          children: undefined,
        },
      ],
    },
    {
      elm: {
        className: undefined,
      },
      tag: 'div',
      child: undefined,
      children: undefined,
    },
  ],
};

describe('vNode', () => {
  describe('findByTag', () => {
    it('returns an array of vNodes of elements matching tag selector passed', () => {
      expect(vNode.findByTag(vNodeMock, 'div').length).to.equal(3);
    });
  });

  describe('findByClass', () => {
    it('returns an array of vNodes of elements matching className passed', () => {
      expect(vNode.findByClass(vNodeMock, 'find').length).to.equal(2);
    });
  });

  describe('findById', () => {
    it('returns an array of vNodes of elements matching id passed', () => {
      expect(vNode.findById(vNodeMock, 'id').length).to.equal(1);
    });
  });
});
