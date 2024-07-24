export default {
  exclusivity: {
    paths: [],
    method: ({ userId }) => {
      if (userId === 1) {
        console.log('eres el usuario 1!!!')
      }
    }
  }
}