function validateForm(){
    var userName = document.forms["loginForm"]["username"].value;
    
    if(userName==null || userName==""){
        alert("Username is required");
        return false;
    }
}



//Admin makes new post 

var newpost = {title:"", content:""};
            
$('#submit').click(function(event){
    newpost.title = $('#title').val();
    newpost.content = $('#content').val();
    $.ajax({
        method: "POST",
        url: "/newpost/create",
        data: newpost
    }).done(function(response){
        console.log(response);
    }).fail(function(response){
        console.log(response.responseText);
    });
});

$('#getArticles').click(function(event){
    $.ajax({
        method: "GET",
        url: "/newpost/list",
    }).done(function(response){
        console.log(response);
    }).fail(function(response){
        console.log(response.responseText);
    });
});