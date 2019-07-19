$( document ).ready(function() {
    var colours = {
        "cb-1": "black",
        "cb-2": "#7b7d7b",
        "cb-3": "#7b0000",
        "cb-4": "#7b7d01",
        "cb-5": "#027d00",
        "cb-6": "#027d7b",
        "cb-7": "#05007b",
        "cb-8": "#7b007b",
        "cb-9": "#7b7d39",
        "cb-10": "#003c39",
        "cb-11": "#007dfe",
        "cb-12": "#003c7b",
        "cb-13": "#3900ff",
        "cb-14": "#7b3c00",
        "cb-15": "#ffffff",
        "cb-16": "#bdbebd",
        "cb-17": "#ff0000",
        "cb-18": "#feff00",
        "cb-19": "#01ff00",
        "cb-20": "#01ffff",
        "cb-21": "#1600ff",
        "cb-22": "#ff00ff",
        "cb-23": "#feff7b",
        "cb-24": "#02ff7b",
        "cb-25": "#7cfffe",
        "cb-26": "#7b7dff",
        "cb-27": "#ff007b",
        "cb-28": "#ff7d38"

    }

    for (var id in colours)  {
        var colour_box = document.getElementById(id)
        colour_box.style.backgroundColor = colours[id];
    }

    var colour;

    $('.cb').click(function() {
        console.log("clicked on cb");
        colour =  colours[this.id]
    });


     var scrolledDown = false;
    function fetchMessages() {
        $.get( "/get_all_messages", function(data) {
            data = JSON.parse(data);
            $("#messages").html("")
            data.forEach((x) =>  {
                var style = `${"'" + "color:" + x.colour + "'"}`;
                $("#messages").append(`<div class = "message"><div class = "username" style = ${style}> ${x.user}</div> <div class = "text">${x.msg}</div></div>`)
            });
            var cows = document.getElementById("messages");
            if (scrolledDown === false) {
                cows.scrollTop = cows.scrollHeight;
                scrolledDown = true;
            }
        });
    }
    setInterval(function(){ fetchMessages() }, 1000);


    $("#target").click(function() {
        $.get( "/random_string", function(data) {
            $( "#random-string" ).html( data );
        });
    });

    $("#formId").click(function(){
        var msg=$("#chatbox").val();

        // Post a new message to the route /post_new_message and also 
        // give it the message and the user who sent  it !!
        $.post("/post_new_message", {msg: msg,colour:colour}, function(data) {
            $("#messages").html("")
            $("#chatbox").val("")
            
            // Server gives us back a JSON string. We have to parse it to
            // tturn it into a list
            data = JSON.parse(data);
            // For loop over every single messagee to display user and message
            data.forEach((x) =>  {
                console.log("This  is x:", x);
                var style = `${"'" + "color:" + x.colour + "'"}`;
                // we add a new div to the html elemenet with id messages
                $("#messages").append(`<div class = "message"><div class = "username" style = ${style}> ${x.user}</div> <div class = "text" >${x.msg}</div></div>`)
            });
            var cows = document.getElementById("messages");

            cows.scrollTop = cows.scrollHeight;
        }) 
    });
});

 