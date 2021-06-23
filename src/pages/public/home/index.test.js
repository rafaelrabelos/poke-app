import { getCurrentPage }  from './';

describe('Home group testing', () => {

  it('should get the current page', () => {
    
    // Arrange
    const data = [
      {offset:0 , limit: 0, expct: 1},
      {offset:40 , limit: 20, expct: 3},
      {offset:80 , limit: 20, expct: 5},
      {offset:1000 , limit: 20, expct: 51}
    ];

    // Act
    data.forEach( item => {
      const page = getCurrentPage(item.offset, item.limit);

      // Assert
     expect(page).toEqual(item.expct);
    });
    
  });
  
});
