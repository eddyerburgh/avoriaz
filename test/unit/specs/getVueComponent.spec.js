import findVueComponents from '../../../src/findVueComponents';

const mockVm = {
  $children: [
    {
      $children: [
        {
          $children: [],
          $options: { _componentTag: 'SomeTag' },
        },
        {
          $children: [
            {
              $children: [],
              $options: { _componentTag: 'SomeTag' },
            },
          ],
          $options: { _componentTag: 'ATag' } },
      ],
      $options: { _componentTag: 'ATag' },
    },
    {
      $children: [],
      $options: { _componentTag: 'SomeTag' } },
    {
      $children: [
        {
          $children: [],
          $options: { _componentTag: 'ATag' },
        },
      ],
      $options: { _componentTag: 'SomeTag' } },
  ],
  $options: { _componentTag: 'ATag' },
};

describe('findVueComponents', () => {
  it('returns the correct number of VueComponents when passed vm instance and component name', () => {
    expect(findVueComponents(mockVm, 'ATag').length).to.equal(4);
  });
});
