$( document ).ready(function() {
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
        $.post("/post_new_message", {msg: msg}, function(data) {
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

 