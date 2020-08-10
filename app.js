var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

//Schema Setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String, 
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({

//         name: "Granite Hill", 
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQoTiNGKN-KjJ12MbDjMa4aI-_bLWPoGrkWsw&usqp=CAU",
//         description: "This is a huge granite hill"
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("NEWLY CREATED CAMPGROUND:");
//             console.log(campground);
//         }
//     });


app.get("/", function(req, res){
    res.render("landing");
});


//Index - Show all campgrounds
app.get("/campgrounds", function(req, res){
    // Get all campgrounds fron DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds:allCampgrounds});
        }
    });
});

//Create - add new campground to DB
app.post("/campgrounds", function(req, res){
    //get data from form and add to campgorunds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    //Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

//New - show form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

//Show - this needs to be after anything with something after /campgrounds/....
// it will treat it as an id, such as /campgrounds/new, new will be looked as an id
app.get("/campgrounds/:id", function(req, res){
    //find campground with provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(3000, function(){
    console.log("YelpCamp Has Started!");
});