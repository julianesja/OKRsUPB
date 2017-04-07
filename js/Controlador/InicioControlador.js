define(["Modelo/InicioModel"
		,"clases/Objetivos"]
	, function(InicioModel,Objetivos) {
        return {
    		Inicializacion:function(PanelPrincila){   
    		//obtencion sesion usuario 			
    			var that=this;
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
										  		
										  		$("#imgPerfil").attr("src",url)
											}).catch(function(error) {
										  
										});										
										$("#txtNombre").html(UsuarioSnapshot.name);
										$("#txtCorreo").html(UsuarioSnapshot.email);

										that.MostrarObjetivos(PanelPrincila,firebase.auth().currentUser.uid);
									}
								}
							);
				        }else{
				        	window.location.href="index.html";
				        }

					}
		   		); 


    		}, 

            CerrarSesion:function(){  
                firebase.auth().signOut().then(function() {
                   window.location.href="index.html";
                }, function(error) {
                   console.log(error);
                   });
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
    		,getFechaInicial:function(lstResultado){
    			var FechaInicial;
    			var i=0;
    			$.each(lstResultado,function(index, value){
    				$.each(value.Tareas,function(index1,value1){
    					
    					if(i==0){
    						FechaInicial=new Date(value1.FechaInicio);
    						i++;	
    					}
    					FechaActual=new Date(value1.FechaInicio);
    					if(FechaInicial>FechaActual){
    						FechaInicial=FechaActual;
    					}
    					
    				});
    			});
    			return FechaInicial;

    		}
    		,getFechaFinal:function(lstResultado){
    			var FechaFinal;
    			var i=0;
    			$.each(lstResultado,function(index, value){
    				$.each(value.Tareas,function(index1,value1){    					
    					if(i==0){
    						FechaFinal=new Date(value1.FechaFin);
    						i++;	
    					}
    					FechaActual=new Date(value1.FechaFin);
    					if(FechaFinal<FechaActual){
    						FechaFinal=FechaActual;
    					}
    					
    				});
    			});
    			return FechaFinal;
    		}

    		,GuardarObjetivo:function(Objetivo,mdlOkrs, idObjetivo){
    			
    			var FechaInicial=this.getFechaInicial(Objetivo.lstResultado);
    			var FechaFinal=this.getFechaFinal(Objetivo.lstResultado);
    			Objetivo["FechaInicial"]=FechaInicial.toString();
    			Objetivo["FechaFinal"]=FechaFinal.toString();  	
    			/*Inicio de validacion inserccion de objetivo*/

    			if(idObjetivo==null || idObjetivo==undefined){                    
    				firebase.database().ref('Objetivos/' + firebase.auth().currentUser.uid).push(Objetivo);
    			}else{                    
    				firebase.database().ref('Objetivos/' + firebase.auth().currentUser.uid+"/"+idObjetivo).set(Objetivo);
    			}
                mdlOkrs.modal("close");
    			
				/*Fin de validacion e inserccion de objetivo*/
    			
    			
    		},
    		/*Mostrar Objetivos*/
    		MostrarObjetivos:function(Contenedor,IdUsuario){
    			Contenedor.html("");
    			var Editar=false;
    			if(IdUsuario==firebase.auth().currentUser.uid){
    				Editar=true;
    			}
    			var starCountRef=firebase.database().ref('Objetivos/'+IdUsuario)
	        	starCountRef.on("value",
	        		function(snapshot) {
	        			Contenedor.html("");
						if(snapshot.val()!=null){
							Objetivos.InsertObjetivos(Contenedor,snapshot.val(),Objetivos,Editar);
						}
					}
				);	
    		}  		    
        }
    }
    
);