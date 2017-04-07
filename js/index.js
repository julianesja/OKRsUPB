$(document).ready(function(){
	var btnGoogle=$("#btnGoogle");
	var validarEstadoUsuario=function(){
		firebase.auth().onAuthStateChanged(
			function(user) {
		        if (user) {
		           location.href='Principal.html';
		        } 
   		 	}
   		); 
	};
	firebase.auth().signOut().then(
		function() {
			validarEstadoUsuario();
		}, function(error) {
			validarEstadoUsuario();
		}
	);		

	$("#btnAceptar").on("click",function(){
		var txtEmail=$("#txtEmail").val();
		var txtPassword=$("#txtPassword").val();
		var usuario=firebase.auth().signInWithEmailAndPassword(txtEmail, txtPassword)
		.catch(function(error) {			
			var errorCode = error.code;
			console.log(errorCode);
			var errorMessage = error.message;
			if(errorCode=="auth/user-not-found"){
				alert("el usuario no es correcto");
			}	
			else if(errorCode == "auth/invalid-email"){
                 alert("email malo");
			}	
		});	
	});

	btnGoogle.on("click",function(){
		var provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider).then(function(result) {
		  // This gives you a Google Access Token. You can use it to access the Google API.
		  var token = result.credential.accessToken;
		  // The signed-in user info.
		  var user = result.user;
		  // ...
		}).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // The email of the user's account used.
		  var email = error.email;
		  // The firebase.auth.AuthCredential type that was used.
		  var credential = error.credential;
		  // ...
		});
	});
});


