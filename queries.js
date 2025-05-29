// Task 1: MongoDB queries

db.books.find({genre: "Fiction"});
db.books.find({genre: "Romance"});

db.books.find({published_year: {$gt: 1940}});
db.books.find({published_year: {$gte: 1940}});

db.books.find({author: "F. Scott Fitzgerald"});
db.books.find({author: "J.R.R. Tolkien"});

db.books.updateOne({_id: ObjectId('683869764ae9c566cca17102')}, {$set: {price: 11.50}});
db.books.updateOne({_id: ObjectId('683869764ae9c566cca17105')}, {$set: {price: 5.2}});

db.books.deleteOne({author: "J.R.R. Tolkien"});
db.books.deleteOne({author: "F. Scott Fitzgerald"});


// Task 2: Advanced Queries
db.books.find({in_stock: true, published_year: {$gt: 2010}});
db.books.find({}, {title: true, author: true, price: true, _id: false});
db.books.find().sort({price: 1});
db.books.find().sort({price: -1});
db.books.find().skip(5).limit(5);

db.books.aggregate([
  { $group: { _id: "$author", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
  { $limit: 1 }
]);

db.books.aggregate([
  {
    $group: {
      _id: {
        $concat: [
          { $toString: { $subtract: [ { $divide: ["$published_year", 10] }, { $mod: ["$published_year", 10] } ] } },
          "0s"
        ]
      },
      count: { $sum: 1 }
    }
  }
]);

// Task 3: Indexing

db.books.createIndex({ title: 1 });
db.books.createIndex({ author: 1, published_year: 1 });
db.books.find({ title: "1984" }).explain("executionStats");

