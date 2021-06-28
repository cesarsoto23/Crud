
module.exports = {
    port: process.env.PORT || 3000,
    db: process.env.MONGODB || 'mongodb+srv://Testo:123@cluster0.jzwuj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    urlParser : {
useNewUrlParser: true,
useUnifiedTopology: true,
useFindAndModify: false,
useCreateIndex: true

    }

    

}