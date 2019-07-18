$( document ).ready(function() {
    $("#target").click(function() {
     $.get( "/random_string", function(data) {
       $( "#random-string" ).html( data );
    });
 });
    $("#formId").click(function(){
        var msg=$("#chatbox").val()
    	console.log("This is message", msg);
    	$.post("/post_new_message", {msg: msg}, function(data) {
    		console.log(data);
             $( "#messages" ).html( data );
    	}) 
    });
});

 