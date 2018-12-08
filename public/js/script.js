// Making an AJAX request using jQuery
$(document).ready(function(){
  $('.delete-post').on('click', function(event){
    // To get the ID value of the article, attach a variable to the target event attribute
    $target = $(event.target);
    console.log($target.attr('data-id'));
    var id = $target.attr('data-id');

    $.ajax({
      type:'DELETE',
      url: '/dash/post/'+id,
      success: function(response){
        alert('Deleting Post');
        window.location.href='/dash';
      },
      error: function(error){
        console.log(error);
      }
    });
  });
});

// Form validation
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