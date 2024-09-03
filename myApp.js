require('dotenv').config();


//let Person;
/** 3 create and save person*/


//4.create many people
var arrayOfPeople = [
  {name:"Ann", age:21, favoriteFoods:["Pasta"]},
  {name:"Lola", age:24,favoriteFoods:["Pizza"]},
  {name:"Ivan", age:25, favoriteFoods:["Pastry"]}
  ];
  
var createManyPeople = function(arrayOfPeople, done){
  Person.create(arrayOfPeople, function(err, people){
     if(err){
       return console.error(err);
     }else{
        done(null, people);
       
     }
    
    
  });
  
  //done(null /*, data*/);
};

var findPeopleByName = function (personName,done) {
  Person.find({name:personName}, function(err,personFound){
     if(err){
      return console.log(err);
     }else{
       return done(null, personFound);
     }
  });
//done(null /*, data*/);
};
/**1) install and set up mongoose*/
const mongoose=require('mongoose');
let uri = 'mongodb+srv://edtech:gigumenon2021@backendlessons.uoknb.mongodb.net/db1?retryWrites=true&w=majority';

mongoose.connect(uri,{useNewUrlParser:true, useUnifiedTopology:true});
/**2( create Person Model*/
const Schema = mongoose.Schema;
var personSchema = new Schema({
  name:{type:String, required:true},
  age:Number,
  favoriteFoods:[String]
  
});

var Person = mongoose.model("Person", personSchema);

  
 //3.create and save person  
   var createAndSavePerson = function(done){
     
     var tomSmith = new Person({name: "tomSmith", age: 24, favoriteFoods:["pasta", "pizza"]
       
     });
    tomSmith.save(function(err, data){
        if(err){
         return console.error(err);
        }else{
         done(null, data)
        }
     });
       
       
     
   };
      
      
    
    
    
      
    
    
  
  
  /**6.use model .findOne() */
var findOneByFood = function (food, done){
  Person.findOne({favoriteFoods:food},function(err, data){
    
       if(err){
         
         return console.log(err);
       }else{
         return done(null, data);
       }
  });
 //done(null /*, data*/);
};

/**7.use model findById()*/
var findPersonById = function(personId, done){
   Person.findById(personId, function(err, data){
     
       if(err){
         return console.log(err);
       }else{
         return done(null, data);
       }
   });
  //done(null /*, data*/);
};

/**8.find,edit,save */
const findEditThenSave = function(personId, done){
 const foodToAdd = "hamburger";
 //.findId() method
 Person.findById(personId,(err,person)=>{
   
   if(err) return console.log ;
   //array.push() method
   person.favoriteFoods.push(foodToAdd);
   //and inside the find //callback and save this //updated person
    person.save(function(err, updatedPerson){
       
        if(err) return console.log(err);
        done(null, updatedPerson);
     }) 
 })
 

 // done(null /*, data*/);
};
/**9.find and update doc */
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName},{age:ageToSet},{new:true},(err,updatedDoc)=>{
     if(err) return console.log(err);
     done(null, updatedDoc);
  });

 // done(null /*, data*/);
};
/**10. delete one doc find by id and remove */
const removeById = function(personId, done){
   Person.findByIdAndRemove(personId, (err, removedDoc) => {
     if(err) return console.log(err);
     done(null,removedDoc);
   });
  //done(null /*, data*/);
};
/**11. remove many doc */
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove}, (err,response) =>{
      if(err) return console.log(err);
      done(null, response);
  });
  //done(null /*, data*/);
};

/**12.chain search query helpers to narrow search */
//chain, .find(), .sort(), //.limit(), .select() and //then .exec()//pass the //done(err,data) callback to //it
const queryChain = function(done){
  const foodToSearch = "burrito";
  Person.find({favoriteFoods:{$all:[foodToSearch]}})
    .sort({name:'asc'})
    .limit(2)
    .select('-age')
    .exec((error, filteredResults) =>{
      if(error){
        console.log(error)
      }else{
        done(null, filteredResults)
      }
      
    });
 //done(null /*, data*/);
};


/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
