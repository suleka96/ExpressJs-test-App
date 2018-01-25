$document.ready(function(){
    $('.deleteUser').on('click', delete);
});

function delete(){
    var confirmation = confirm('Are you sure?');
    if(confirmation){
       alert(1);
    }
}