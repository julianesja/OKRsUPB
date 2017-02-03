define(["Modelo/InicioModel"]
	, function() {
        return {
    		Inicializacion:function(){    			
				firebase.auth().onAuthStateChanged(
					function(user) {
				        if (user) {
				        	var starCountRef=firebase.database().ref('users/'+user.uid)
				        	starCountRef.on("value",
				        		function(snapshot) {
									if(snapshot.val()==null){
										$('#mdlInformacionUsuario').modal('open');
									}else{
										var UsuarioSnapshot=snapshot.val();
										var storage = firebase.storage();
										var storageRef = storage.ref();
										storageRef.child('pictures/'+user.uid).getDownloadURL().then(
											function(url) {
										  		console.log(url);
										  		$("#imgPerfil").attr("src",url)
											}).catch(function(error) {
										  
										});										
										$("#txtNombre").html(UsuarioSnapshot.name);
										$("#txtCorreo").html(UsuarioSnapshot.email);
									}
								}
							);
				        } 	
					}
		   		); 
    		}, 
    		CargarAreas:function(Lista){
    			var starCountRef = firebase.database().ref('Areas');
				starCountRef.on('value'
					, function(snapshot) {
						$('#lstArea').material_select("destroy");												
						Lista.html("");		  	
						Lista.append('<option value="">Seleccione un área</option>');	
						$.each(snapshot.val(),function(index, value){
							if(value){
								Lista.append('<option value="'+index+'">'+value.name+'</option>');
							}
							
						});
						$('#lstArea').material_select();
					}
				);
    		},GuardarInformacion:function(txtName,txtlstArea,NombreOpcion,FilePicture,progressCargar){
    			var storageRef=firebase.storage().ref("pictures/"+firebase.auth().currentUser.uid);
    			var task=storageRef.put(FilePicture);
				task.on("state_changed"
					,function(snapshot){
						var porcentaje=(snapshot.bytesTransferred/snapshot.totalBytes)*100;							
						progressCargar.css("width",porcentaje+"%");
						if(porcentaje>98){
							firebase.database().ref('users/' + firebase.auth().currentUser.uid).set(
							{
							    name: txtName,
							    email: firebase.auth().currentUser.email,
							    profile_picture : firebase.auth().currentUser.uid,
							    area:{name:NombreOpcion, value:txtlstArea}
							});
							$('#mdlInformacionUsuario').modal('close');
						}					
					}
				);
				

    		}  		    
        }
    }
    
);