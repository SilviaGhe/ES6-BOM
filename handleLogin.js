console.log(document.cookie);

const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");

// const PASSWORD_CHECK = "1234";
// const EMAIL = "radusi.stefan@gmail.com";



myStorage = window.localStorage;

if(JSON.parse(myStorage.getItem('session') != "true"))
  myStorage.setItem('session',false);

renderOnPage();

document.getElementById("login").addEventListener("click", () => {
  const email = inputEmail.value;
  const password = inputPassword.value;

  getUsers(email,password);


});

document.getElementById("logout").addEventListener("click", () => {

  console.log("clicked Logout");

  myStorage.removeItem('session');
  myStorage.removeItem('email');
  myStorage.removeItem('password');


  renderOnPage();

});


function renderOnPage(){
  if(JSON.parse(myStorage.getItem('session') == "true") ){
    //if(myStorage.getItem('session') == "true"){
    document.getElementById("login-page").style.visibility = "hidden";
    document.getElementById("home-page").style.visibility = "visible";
    }
    
else {console.log(myStorage.getItem('session'));
        document.getElementById("login-page").style.visibility = "visible";
        document.getElementById("home-page").style.visibility = "hidden";
      console.log("enters hire");
  }


}

// get user data from server
function getUsers(email,password) {
    // by default the fetch function will generate the server request with the method 'GET'
    fetch("https://contact-agenda-rest-api.herokuapp.com/users")
      .then(processResponse)
      .then(renderUsers)
      .then(renderOnPage);

  }
  
  function processResponse(response) {
    return response.json();
  }
  
  function renderUsers(data) {
   
  
    for (const user of data) {
      renderListItem(user,email,password);

      
    }
  }
  


  function renderListItem(userData,email,password) {
    
    if(userData.email === email.value && userData.password == password.value){
      
        const USER_SESSION = {email: `${userData.email}`, password: `${userData.password}`};
        console.log("EQUALITY " + USER_SESSION.email +" "+ USER_SESSION.password);

        myStorage.setItem('email',USER_SESSION.email);
        myStorage.setItem('password', USER_SESSION.password);

        myStorage.setItem('session',true);


              
                 
    }
     
  }



  