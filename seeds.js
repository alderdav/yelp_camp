var mongoose = require("mongoose");
var Campground = require("./models/campground");
var  Comment = require("./models/comment");

//this will be the seed data
var data = [
    {
        name: "Bluegrass Camp",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZrbjoLL0lUh-GFxQNFn_YVDE5Y7jATLTAFfZTjTMR5yp7uVSZI7AXF95Mlq0Dc95y-Zya4q1PPcJQCp5JPbz2l4eQTU9oDteeLK4q&usqp=CAU&ec=45687380",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name: "Tipsinah Mounds",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRZrbjoLL0lUh-GFxQNFn_YVDE5Y7jATLTAFfZTjTMR5yp7uVSZI7AXF95Mlq0Dc95y-Zya4q1PPcJQCp5JPbz2l4eQTU9oDteeLK4q&usqp=CAU&ec=45687380",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." 
    },
    {
        name: "Hickory Hollow",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTjaifiIlnUiB63L6KT1M8nD2qEmxKxz8wdIForIDkVQVE3cLADAmPoZ5aXqojT1DbQGopfX1Bty8mM4N91Y60MdymMADed7dpt3Ylq&usqp=CAU&ec=45687380",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." 
    }
]

function seedDB(){
    // Remove all Campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create(
                        {
                        text: "This place is great, but I wish they had internet",
                        author: "Cha Boy"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("create new comment");
                            }  
                        });
                }
            });
        });
    });
}

module.exports = seedDB;