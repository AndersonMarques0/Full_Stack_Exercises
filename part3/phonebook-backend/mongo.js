import mongoose from "mongoose";

if(process.argv.length < 3){
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2];

const url = `mongodb+srv://Anderson:${password}@cluster0.nmhmixe.mongodb.net/`;

mongoose.set('strictQuery', false)
mongoose.connect(url, {family: 4})

const personSchema = new mongoose.Schema({
    id: String,
    name: String,
    number: String
})

const Person = mongoose.model('Person',personSchema)

if(process.argv.length > 3) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save().then(result => {
        console.log('added to database!')
        mongoose.connection.close()
    })
}else{
    Person.find({}).then(result => {
        result.forEach(person => console.log(person))
        mongoose.connection.close()
    })
}

