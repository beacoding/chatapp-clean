$( document ).ready(function() {
    function fetchMessages() {
        $.get( "/get_all_messages", function(data) {
            $( "#messages" ).html( data );
        });
    }
    setInterval(function(){ fetchMessages() }, 1000);


    $("#target").click(function() {
        $.get( "/random_string", function(data) {
            $( "#random-string" ).html( data );
        });
    });

    $("#formId").click(function(){
        var msg=$("#chatbox").val()
        var user=$("#username").val()
        $.post("/post_new_message", {msg: msg, user:user}, function(data) {
             $( "#messages" ).html( data );
        }) 
    });
});

 