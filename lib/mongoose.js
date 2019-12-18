import mongoose from 'mongoose'

const connectDb = handler => async(req, res) => {
  if(mongoose.connections[0].readyState !== 1) {

    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

  }
  return handler(req, res);
}

const db = mongoose.connection;
db.once('open', () => {
  console.log('connected to mongo');
})

export default connectDb