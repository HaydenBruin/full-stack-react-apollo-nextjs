export const habitsResolvers = {
  Query: {

    async habits () {
      console.log('habits');

      return [{
        _id: "somefunkythinggggaaagg",
        name: "Make my bed"
      }]
    }

  }
}