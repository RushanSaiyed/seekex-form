function ShowToastrMsg(MsgType, MsgPosition, MsgText, MsgTimeOut) {
    toastr.options =
    {
        "closeButton": true,
        "debug": false,
        "positionClass": MsgPosition,
        "onclick": null,
        "showEasing": "linear",
        "showMethod": "show",
        "timeOut": MsgTimeOut
    }
    if (MsgType == 'Success') {
        toastr.success(MsgText, 'Success');
    } else if (MsgType == 'Error') {
        toastr.error(MsgText, 'Error');
    } else if (MsgType == 'Warning') {
        toastr.warning(MsgText, 'Warning');
    } else {
        toastr.info(MsgText, 'Information');
    }
}

function HideToastrMsg() {
    toastr.clear();
}

/*START - VALIDATE E-MAIL FUNCTIONALITY*/
var validateEmail = function (elementValue) {
    //var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9._%+-]+\.[a-zA-Z0-9._%+-]/; //--WORKING
    return emailPattern.test(elementValue);
}
/*END - VALIDATE E-MAIL FUNCTIONALITY*/

// Validation 

$('.form-submit').on('submit',function(e){
    e.preventDefault(); 
    ErrMsg = '';
    mailformat = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;
    // let name = document.getElementById("name").value;
    // document.getElementById("user-name").innerHTML = name;
   

    if( $($('#name')).val().trim()=='' ){
        ShowToastrMsg("Error", "toast-top-full-width", 'Please Enter Name', 15000);
    }    
    else if($('#email').val().trim() == ''){
        ShowToastrMsg("Error", "toast-top-full-width", 'E-mail ID.', 15000);            
    }                         
    else if($($('#dob')).val().trim()==''){
        ShowToastrMsg("Error", "toast-top-full-width", 'Please Enter Date of Birth', 15000);
    }
    else if($($('#profile')).val().trim()==''){
        ShowToastrMsg("Error", "toast-top-full-width", 'Please Select Profile Picture', 15000);
    }
    else if($($('#country')).val().trim()==''){
        ShowToastrMsg("Error", "toast-top-full-width", 'Please Select Country', 15000);
    }   

    else{
        var pro = $('#profile').val();
        $('.profile img').attr('src',pro)
        ShowToastrMsg("Success", "toast-top-full-width", 'Account created successfully.', 15000);

        let name = $('#name').val();
        let email = $('#email').val();
        let dob = $('#dob').val();
        let profile = $('#profile').val();
        let country = $('#country').val();

        $('table > tbody').append(`<tr data-name=`+ name +` data-email=`+ email +`><td>`+ name + `</td><td>`+ email +`</td><td>`+ dob +`</td><td>`+ country +`</td><td><i class="fa fa-edit edit"></i><i style='margin-left:10px;' class="fa fa-trash delete"></i></td></tr>`)

        $('#name').val('');
        $('#email').val('');
        $('#dob').val('');
     
        $('#country').val('');
    }
});

$('body').on('click','.edit',function(){
    var name = $(this).parents("tr").attr('data-name');  
        var email = $(this).parents("tr").attr('data-email');  
      
        $(this).parents("tr").find("td:eq(0)").html('<input name="edit_name" value="'+ name +'">');  
        $(this).parents("tr").find("td:eq(1)").html('<input name="edit_email" value="'+ email +'">');  
      
        $(this).parents("tr").find("td:eq(5)").prepend("<button class='btn btn-info btn-xs btn-update'>Update</button><button class='btn btn-warning btn-xs btn-cancel'>Cancel</button>")  
        $(this).hide(); 
        $('.delete').hide();
});

$("body").on("click", ".btn-cancel", function(){  
    var name = $(this).parents("tr").attr('data-name');  
    var email = $(this).parents("tr").attr('data-email');  
  
    $(this).parents("tr").find("td:eq(0)").text(name);  
    $(this).parents("tr").find("td:eq(1)").text(email);  
 
    $(this).parents("tr").find(".edit").show();  
    $(this).parents("tr").find(".delete").show(); 
    $(this).parents("tr").find(".btn-update").remove();  
    $(this).parents("tr").find(".btn-cancel").remove();  
});  

$("body").on("click", ".btn-update", function(){  
    var name = $(this).parents("tr").find("input[name='edit_name']").val();  
    var email = $(this).parents("tr").find("input[name='edit_email']").val();  
  
    $(this).parents("tr").find("td:eq(0)").text(name);  
    $(this).parents("tr").find("td:eq(1)").text(email);  
   
    $(this).parents("tr").attr('data-name', name);  
    $(this).parents("tr").attr('data-email', email);  
  
    $(this).parents("tr").find(".edit").show();  
    $(this).parents("tr").find(".delete").show(); 
    $(this).parents("tr").find(".btn-cancel").remove();  
    $(this).parents("tr").find(".btn-update").remove();  
}); 

$('body').on('click','.delete',function(){
    $(this).parents('tr').remove();
});

// function remove(){
//     alert('hello');
//     $(this).parents('tr').remove();
// }

