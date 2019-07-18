$( document ).ready(function() {
    function fetchMessages() {
        $.get( "/get_all_messages", function(data) {
            data = JSON.parse(data);
            $("#messages").html("")
            data.forEach((x) =>  {
                var style = `${"'" + "color:" + x.colour + "'"}`;
                $("#messages").append(`<div><span class = "username" style = ${style}> ${x.user}</span>: ${x.msg}</div>`)
            });
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
        var user=$("#username").val();
        var colour=$("#colour").val();
        // Post a new message to the route /post_new_message and also 
        // give it the message and teh user who sent  it
        $.post("/post_new_message", {msg: msg, user:user, colour:colour}, function(data) {
            $("#messages").html("")
            // Server gives us back a JSON string. We have to parse it to
            // tturn it into a list
            data = JSON.parse(data);
            // For loop over every single messagee to display user and message
            data.forEach((x) =>  {
                console.log("This  is x:", x);
                var style = `${"'" + "color:" + x.colour + "'"}`;
                // we add a new div to the html elemenet with id messages
                $("#messages").append(`<div><span class = "username" style = ${style}> ${x.user}</span>: ${x.msg}</div>`)
            });
        }) 
    });
});

 