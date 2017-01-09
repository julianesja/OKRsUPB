$(document).ready(function(){
	var validarEstadoUsuario=function(){
		firebase.auth().onAuthStateChanged(
			function(user) {
		        if (user) {
		           location.href='inicio.html';
		        } 
   		 	}); 
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
			var errorMessage = error.message;
			if(errorCode=="auth/user-not-found"){
				alert("el usuario no es correcto");
			}		
		});	
	});
});


