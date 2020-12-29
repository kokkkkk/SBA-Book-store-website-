var page=0;
var item_num=0;
var login=false;
var search_name;
var search_find;
var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var book_name=["Assembly","C++","CPU","Html","Information And Technology","Java","Javascript","PHP","Python","Virtual Assistant"]
var book_discription=["a low level language,it tell you how to use it,by abc ko","C++ is the most popular language in this time,it can tell you how to get to the world,def ko","CPU is the most basic thing in nowaday live,by ghi ko","HTML is used on website and very important,by jkl ko","This is the book of Information and Technology nowaday,by mno ko","Java can make small applet and app,by pqr ko","Javascript is important on website making,by stu ko","PHP can work on website for database,by vwx ko","Python is a quite basic language and easy to learn.by yz ko","Virtual Assistant like SIRI is the world future,by abc k"]
var book_price=["100","99","98","97","96","95","94","93","92","91"];
var book=new Array();
var click_name;
var click_num;
var choose_name=["test"];
var choose_num=["1"];
var cal=["100"];

function filter(p){
    page=p;
    showBook();
}
function filter(p,value,match){
    page=p;
    search_name=value;
    search_find=match;
    showBook();
}
function searchs(){
    console.log("search: "+searchbar.search.value);
    var value=searchbar.search.value;
    var match=false;
    for(var i=0;i<book_name.length;i++){
            if(book_name[i]==value){
                match=true;
                filter(4,i,match);
            }
        }
     if(match==false){
         filter(4,value,match);
     } 
}
function logins(){
    var validate=validation();
    if(validate==true){
        var name=forms.username.value;
        login=true;
        Remove("form");
        document.getElementById('login_already').innerHTML="Welcome,"+name;
        if(localStorage.getItem("num")){
            var num=localStorage.getItem("num");
            choose_num=num.split(",");
            var quant=localStorage.getItem("quant");
            cal=quant.split(",");
            item_num=choose_num.length-1;
            document.getElementById('item_num').innerHTML=item_num;
            for(var i=1;i<choose_num.length;i++){
                choose_name.push(book_name[choose_num[i]]);
            }
        }
      
    }
}
function Remove(form_id) {
        document.getElementById(form_id).remove();
}
function validation(){
    if(forms.username.value=="ko_kkkkk"&&forms.Password.value=="123456"&&forms.robot.checked==true){
        return true;
    }else if(forms.username.value!="ko_kkkkk"||forms.Password.value!="123456"){
        alert("Wrong username or password!");
        location.reload();
        return false;
    }else if(forms.username.value==""|forms.Password.value==""){
        alert("Username or password cannot be empty!");
        location.reload();
        return false;
    }else if(forms.robot.checked==false){
        alert("You should check the checkbox!");
        location.reload();
        return false;
    }
}
function sign(){
    var email=forms.email.value;
    if(forms.Username.value==""|forms.password.value==""|forms.email.value==""){
        alert("You should enter all the username,password and email");
        location.reload();
    }else if(re.test(email)){
        confirm("Please confirm the data");
        document.getElementById("signup").innerHTML='welcome '+forms.Username.value+'<br>You have sign up successfully!'
    }else{
        alert("The email is not validate");
    }
}
function forgotpass(){
    var email=forgot.email.value;
    if(re.test(email)){
        document.getElementById("resetpass").innerHTML='Your reset password have been send to <pre style="text-transform:none;">'+email+"</pre><br>Please go and check it";
    }else{
        alert("It is not a email");
        location.reload();
    }
}
function bookDetail(books){
    var match=false;
    var matches=0;
    console.log("bookdetail");
    do{
        if(book[books]==book_name[matches]){
            match=true;
            document.getElementById('bookDisc').innerHTML=book_discription[matches];
            click_name=book_name[matches];
            click_num=matches;
            document.getElementById('price').innerHTML="$"+book_price[matches];
            document.getElementById('cart_add').innerHTML='<form name="nums"><input type="number" name="num" placeholder="number of books"><a href="#cart_add" Onclick="cart_add();"><img src="./picture/cart_icon.png" alt="add to shopping cart" style="float:right;width:60;height:auto;"><p style="font-size:18px ;color:white;">add to cart</p></form>';
            console.log(book_discription[matches])
        }else{
            matches++;
        }
    }while(match==false);
}
function cart(){
     if(login==true){
        if(item_num==0){
            alert("You have not select anything");
        }else{
            localStorage.setItem("num",choose_num);
            localStorage.setItem("quant",cal);
            window.location.assign("./shoppingcart.html");
        }
    }else{
        alert("You should login first!");
        location.reload();
    } 
}
function cart_add(){
  check_login();
  if(item_num==0){
    choose_name.push(click_name);
    choose_num.push(click_num);
    if(nums.num.value<=0){
        alert("invalid number");
        location.reload();
    }else{
        cal.push(nums.num.value);
    }
    console.log(cal);
    console.log(choose_name);
    console.log(choose_num);
    item_num++;
    document.getElementById('item_num').innerHTML=item_num;
  }else{
    var match=false;
    for(var i=1;i<choose_name.length;i++){
            if(choose_name[i]==click_name){
                 alert("You have select this book already");
                 match=true;
        }
    }
    if(match==false){
       choose_name.push(click_name);
       choose_num.push(click_num);
       cal.push(nums.num.value);
       item_num++;
       document.getElementById('item_num').innerHTML=item_num;
    }
  }
}
function check_login(){
    if(login==false){
        alert("You should login first!");
        location.reload();
    }
}
function showBook(){
console.log("showbook");
    if(page==0){
        var nums=0;
        var same=false;
        do{
            same=false;
            var num =parseInt(Math.random()*book_name.length);
            console.log(num);
            if(nums!=0){
                 console.log(book_name[num]);
            for(var a=0;a<book.length;a++){
                if(book[a]==book_name[num]){
                    var same=true;
                    
                }
            }
            }
            if(same!=true){
                book[nums]=book_name[num];
                nums++;
            }
           
    }while(nums<3);
    reset();
    document.getElementById('book1').innerHTML=book[0];
    document.getElementById('photo1').innerHTML='<img src="./img/'+book[0]+'.jpg" title="'+book[0]+'"style="float:left;width:150px;height:200px;padding: 14px 30px;">';
    document.getElementById('book2').innerHTML=book[1];
    document.getElementById('photo2').innerHTML='<img src="./img/'+book[1]+'.jpg" title="'+book[1]+'"style="float:left;width:150px;height:200px;padding: 14px 30px;">';
    document.getElementById('book3').innerHTML=book[2];
    document.getElementById('photo3').innerHTML='<img src="./img/'+book[2]+'.jpg" title="'+book[2]+'"style="float:left;width:150px;height:200px;padding: 14px 30px;" >';
    document.getElementById('click_on').innerHTML="Click on the book for more!";
    document.getElementById('aboutUs').innerHTML="";
}else if(page==1){
    reset();
    book[0]=book_name[0];
    book[1]=book_name[1];
    book[2]=book_name[2];
    document.getElementById('book1').innerHTML=book_name[0];
    document.getElementById('photo1').innerHTML='<img src="./img/'+book_name[0]+'.jpg" title="'+book_name[0]+'"style="float:left;width:150px;height:200px;padding: 14px 30px;" >';
    document.getElementById('book2').innerHTML=book_name[1];
    document.getElementById('photo2').innerHTML='<img src="./img/'+book_name[1]+'.jpg" title="'+book_name[1]+'"style="float:left;width:150px;height:200px;padding: 14px 30px;" >';
    document.getElementById('book3').innerHTML=book_name[2];
    document.getElementById('photo3').innerHTML='<img src="./img/'+book_name[2]+'.jpg" title="'+book_name[2]+'"style="float:left;width:150px;height:200px;padding: 14px 30px;" >';
    document.getElementById('click_on').innerHTML="Click on the book for more!";
    document.getElementById('aboutUs').innerHTML="";
}else if(page==2){
    reset();
    book[0]=book_name[3];
    book[1]=book_name[4];
    book[2]=book_name[5];
    document.getElementById('book1').innerHTML=book_name[3];
    document.getElementById('photo1').innerHTML='<img src="./img/'+book_name[3]+'.jpg" title="'+book_name[3]+'"style="float:left;width:150px;height:200px;padding: 14px 30px;" >';
    document.getElementById('book2').innerHTML=book_name[4];
    document.getElementById('photo2').innerHTML='<img src="./img/'+book_name[4]+'.jpg" title="'+book_name[4]+'"style="float:left;width:150px;height:200px;padding: 14px 30px;" >';
    document.getElementById('book3').innerHTML=book_name[5];
    document.getElementById('photo3').innerHTML='<img src="./img/'+book_name[5]+'.jpg" title="'+book_name[5]+'"style="float:left;width:150px;height:200px;padding: 14px 30px;" >';
    document.getElementById('click_on').innerHTML="Click on the book for more!";
    document.getElementById('aboutUs').innerHTML="";
    
}else if(page==3){
    reset();
    document.getElementById('book1').innerHTML="";
    document.getElementById('photo1').innerHTML="";
    document.getElementById('book2').innerHTML="";
    document.getElementById('photo2').innerHTML="";
    document.getElementById('book3').innerHTML="";
    document.getElementById('photo3').innerHTML="";
    document.getElementById('aboutUs').innerHTML='We are the best book store ever,founded in 2017.We are welcome to serve you!Thank you.<br><p>Contact Us:<br>Telephone:3875 6954<br>Email:hightech@email.com<br>Address: 3 Wai Chi Street, Shek Kip Mei, Kowloon</p> <table> <tr><td><img src="./img/cart.jpeg" style="float:left;width:300px;height:auto;"></td><td><img src="./img/cart1.jpeg" style="float:left;width:300px;height:auto;"></td><td><img src="./img/cart2.jpg" style="float:left;width:300px;height:auto;"></td></tr>......'
}else if(page==4){
    reset();
    if(search_find==true){
        book[0]=book_name[search_name];
        document.getElementById('book1').innerHTML=book_name[search_name];
        document.getElementById('photo1').innerHTML='<img src="./img/'+book_name[search_name]+'.jpg" title="'+book_name[search_name]+'"style="float:left;width:150px;height:200px;padding: 14px 30px;" >';
        document.getElementById('book2').innerHTML="";
        document.getElementById('photo2').innerHTML="";
        document.getElementById('book3').innerHTML="";
        document.getElementById('photo3').innerHTML="";
        document.getElementById('aboutUs').innerHTML="";
    }else{
        document.getElementById('book1').innerHTML="Sorry,we cannot find the book : "+search_name;
        document.getElementById('photo1').innerHTML="";
        document.getElementById('book2').innerHTML="";
        document.getElementById('photo2').innerHTML="";
        document.getElementById('book3').innerHTML="";
        document.getElementById('photo3').innerHTML="";
        document.getElementById('aboutUs').innerHTML="";
    }
}
}
function reset(){
    document.getElementById('click_on').innerHTML="";
    document.getElementById('bookDisc').innerHTML="";
    document.getElementById('price').innerHTML="";
    document.getElementById('cart_add').innerHTML="";
}
/*shopping cart-----------------------------------------------------------*/
 function settable(){
       var num=localStorage.getItem("num");
       var nums=num.split(",");
       var quant=localStorage.getItem("quant");
       var quants=quant.split(",");
       var o=0;
       var q=1;
       var img;
       console.log(num);
       var node = document.getElementById("t");
       for(var i=1;i<nums.length/3;i++){
           var row = node.insertRow(i-1);
           for(var a=1;a<=3;a++){   
                var str=row.insertCell(a-1);
                img='<img src="./img/'+book_name[nums[q]]+'.jpg" title="'+book_name[nums[q]]+'"style="float:right;width:50px;height:60px;">'
                 str.innerHTML=book_name[nums[q]]+img+'<p style="font-size:20px">'+book_discription[nums[q]]+'<br><div style="color:yellow;">$'+book_price[nums[q]]+'</div></p><br>Quantity: '+quants[q];
                q++;
            }
            o=i;
       }
       if((nums.length-1)%3!=0){
        var row = node.insertRow(o++);
        for(var p=0;p<(nums.length-1)%3;p++){
            img='<img src="./img/'+book_name[nums[q]]+'.jpg" title="'+book_name[nums[p+q]]+'"style="float:right;width:50px;height:60px;">'
            var str=row.insertCell(p);
            str.innerHTML=book_name[nums[q]]+img+'<p style="font-size:20px">'+book_discription[nums[q]]+'<br><div style="color:yellow;">$'+book_price[nums[q]]+'</div></p><br>Quantity: '+quants[q];
        }
       }
    }
function save(){    
    var num=localStorage.getItem("num");
    var nums=num.split(",");
    alert("saved "+(nums.length-1)+" books selection");
    window.location.assign("./sba.html");
}
function clears(){
localStorage.removeItem("num");
localStorage.removeItem("quant");
window.location.assign("./sba.html");
}
function checkout(){
    var num=localStorage.getItem("num");
    var nums=num.split(",");
    var quant=localStorage.getItem("quant");
    var quants=quant.split(",");
    var total=0;
    for(i=1;i<quants.length;i++){
        total+=(quants[i]*book_price[nums[i]]);
    }
    document.getElementById("total").innerHTML='<td colspan="3" align="right">Total: $'+total;
    if(confirm("The total is $"+total+" Do you want to check out now?")){
        clear();
        window.location.assign("./sba.html");
    }
    
}