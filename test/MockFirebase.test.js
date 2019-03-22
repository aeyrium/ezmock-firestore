const firebase = require('../src')
firebase.initializeApp({
  rootDir: __dirname
})

test('Start Up Firebase', () => {
  const db = firebase.firestore().doc('Blog/top-ten-socks-1990').set({
    tile: 'Top 10 socks for 1990!',
    categories: ['Top 10 Lists']
    
  })

})