import * as vNode from '../../../src/vNode';

describe('vNode', () => {
  describe('findByTag', () => {
    const vNodeMock = {
      elm: document.createElement('span'),
      tag: 'span',
      child: undefined,
      children: [
        {
          elm: document.createElement('div'),
          tag: 'div',
          child: undefined,
          children: [
            {
              elm: document.createElement('p'),
              tag: 'p',
              children: undefined,
            },
            {
              elm: document.createElement('div'),
              tag: 'div',
              child: undefined,
              children: undefined,
            },
          ],
        },
        {
          elm: document.createElement('div'),
          tag: 'div',
          child: undefined,
          children: undefined,
        },
      ],
    };
    it('returns an array of vNodes of elements matching tag selector passed', () => {
      expect(vNode.findByTag(vNodeMock, 'div').length).to.equal(3);
    });
  });
});
