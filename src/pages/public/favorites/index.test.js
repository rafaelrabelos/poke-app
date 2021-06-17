import Favorites  from './';

describe('Home group testing', () => {

  it('should get the current page', () => {
    
    // Arrange
    const data = [
      {set:';5;6;8;9', expct: 4},
      {set:'' ,  expct: 0},
      {set:';4;' ,  expct: 1}
    ];

    // Act
    data.forEach( item => {
      localStorage.setItem('favlist', item)
      const fav = Favorites.getFavorites();

      // Assert
     expect(fav.length).toEqual(item.expct);
    });
    
  });
  
});
