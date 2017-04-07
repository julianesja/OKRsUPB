 require( ["Controlador/InicioControlador"
 			,"clases/UtilitisDatatable"],
    function(InicioControlador,UtilitisDatatable) {
		$(document).ready(function(){
			var readyApiGlogle=function(){
				/*Variables para modificar*/
				var RowTarea;
				var RowResultado;
				var OkrsModificar;
				/*Variables*/
				var accion={
					Insertar:"Insertar"
					,Modificar:"Modificar"
					,Eliminar:"Eliminar"
				};
				var accionRow={
					Insertar:"Insertar"
					,Modificar:"Modificar"
					,Eliminar:"Eliminar"
				};
				var txtName=$("#txtName");
				var lstArea=$("#lstArea");
				var txtFile=$("#txtFile");
				var btnGuardarDatosPersonales=$("#btnGuardarDatosPersonales");
				var progressCargar=$("#progressCargar");
				var PanelPrincila=$("#PanelPrincila");
				var btnNuevoOkrs=$("#btnNuevoOkrs");
				var btnCerrarSesion=$("#btnCerrarSesion");
				var txtsearch=$("#txtsearch");
				var dtResultadosTabla=$('#dtResultadosTabla').DataTable({
					"paging":   false,
			        "ordering": false,
			        "info":     false,
			        "searching": false
				});
				/*Modal Okrs*/
				var btnInsertarResultado=$("#btnInsertarResultado");
				var btnEliminarResultado=$("#btnEliminarResultado");
				var btnVerResultado=$("#btnVerResultado");
				var mdlOkrs=$("#mdlOkrs");
				var btnGuardarObjetivos=$("#btnGuardarObjetivos");
				var btnCancelarObjetivos=$("#btnCancelarObjetivos");
				var txtObjetivoInsertar=$("#txtObjetivoInsertar");
				/*Modal Resultado*/
				var mdlResultado=$("#mdlResultado");
				var txtResultadoInsertar=$("#txtResultadoInsertar");
				var btnInsertarTarea=$("#btnInsertarTarea");
				var btnEliminarTarea=$("#btnEliminarTarea");
				var btnVerTarea=$("#btnVerTarea");
				var btnGuardarResultado=$("#btnGuardarResultado");
				var btnCancelarResultado=$("#btnCancelarResultado");
				var dtTareas=$("#dtTareas").DataTable({
					"paging":   false,
			        "ordering": false,
			        "info":     false,
			        "searching": false
				});

			


				/*Moadal Tarea*/
				var accionTarea;
				var accionResultado;
				var accionOKrs;
				var mdlTarea=$("#mdlTarea");
				var btnGuardarTarea=$("#btnGuardarTarea");
				var btnCancelarTarea=$("#btnCancelarTarea");
				var txtTareaInsertar=$("#txtTareaInsertar");
				var txtTareaFechaInicio=$("#txtTareaFechaInicio");
				var txtTareaFechaFin=$("#txtTareaFechaFin");
				/*Metodos*/

				/*Validar*/
				var Validar=function(){
					if(txtName.val()==undefined || txtName.val()=="" || txtName.val()==null){
						Materialize.toast('Ingrese su nombre', 4000);
						return false;
					}else if(lstArea.val()==undefined || lstArea.val()=="" || lstArea.val()==null){
						Materialize.toast('Seleccione su área', 4000);
						return false;
					}else if(txtFile.val()==undefined || txtFile.val()=="" || txtFile.val()==null){
						Materialize.toast('Seleccione su mejor foto', 4000);
						return false;
					}else{
						return true;
					}
				};
				/*Validar Resultados*/
				var ValidarOKrs=function(){
					if(txtObjetivoInsertar.val()==undefined 
						|| txtObjetivoInsertar.val()==""
						|| txtObjetivoInsertar.val()==null){
						Materialize.toast("Ingrese la descripción del Objetivo",4000);
						return false;
					}else if(dtResultadosTabla.row().length<1){
						Materialize.toast("Ingrese minimo una resultado para el objetivos",4000);
						return false;
					}else{
						return true;
					}
					
				}
				/*Validar Resultados*/
				var ValidarResultado=function(){
					if(txtResultadoInsertar.val()==undefined 
						|| txtResultadoInsertar.val()==""
						|| txtResultadoInsertar.val()==null){
						Materialize.toast("Ingrese la descripción del Resultado",4000);
						return false;
					}else if(dtTareas.row().length<1){
						Materialize.toast("Ingrese minimo una tarea para el resutado",4000);
						return false;
					}else{
						return true;
					}
					
				}
				/*Funciones Tareas*/
				var ValidarTareas=function(){
					if(txtTareaInsertar.val()==undefined 
						|| txtTareaInsertar.val()==""
						|| txtTareaInsertar.val()==null){
						Materialize.toast("Ingrese la descripción de la tarea",4000);
						return false;
					}else if(txtTareaFechaInicio.val()==undefined 
						|| txtTareaFechaInicio.val()==""
						|| txtTareaFechaInicio.val()==null){
						Materialize.toast("Ingrese la fecha inicio de la tarea",4000);
						return false;
					}else if(txtTareaFechaFin.val()==undefined 
						|| txtTareaFechaFin.val()==""
						|| txtTareaFechaFin.val()==null){
						Materialize.toast("Ingrese la fecha fin de la tarea",4000);
						return false;
					}else if(new Date(txtTareaFechaFin.val()) <= new Date(txtTareaFechaInicio.val())){
						Materialize.toast("La fecha final no puede ser menor o igual a la fecha inicial",4000);
						return false;
					}else{
						return true;
					}
				};

				var LimpiarTareas=function(){
					txtTareaInsertar.val("");
					txtTareaFechaInicio.val("");
					txtTareaFechaFin.val("");
				};
				var LimpiarResultado=function(){
					txtResultadoInsertar.val("");
					dtTareas.clear().draw();
					LimpiarTareas();
				};
				var LimpiarOkRs=function(){
					txtObjetivoInsertar.val("");
					dtResultadosTabla.clear().draw();
					LimpiarResultado();
				}

				$('.modal').modal({dismissible: false,});
				$(".button-collapse").sideNav();
				$('select').material_select();
				InicioControlador.Inicializacion(PanelPrincila);
				InicioControlador.CargarAreas($("#lstArea"));
				btnGuardarDatosPersonales.on("click",function(){
					if(Validar()){
						var Files=document.getElementById("txtFile");
						var File=Files.files[0];	
						var lstIdArea=document.getElementById("lstArea");
						var NombreOpcion=lstIdArea.options[lstIdArea.selectedIndex].innerHTML;
						InicioControlador.GuardarInformacion(txtName.val()
															,lstArea.val()
															,NombreOpcion
															,File
															,progressCargar);		


					}
				});


	        

				$('.datepicker').pickadate({
				    selectMonths: true, // Creates a dropdown to control month
				    selectYears: 15 // Creates a dropdown of 15 years to control year
				  });

	            btnCerrarSesion.on("click",InicioControlador.CerrarSesion);

	            

				/*NuevoOkrs*/
				btnNuevoOkrs.on("click",function(){
					LimpiarOkRs();
					accionOKrs=accion.Insertar;
					mdlOkrs.modal('open');
				});

				btnInsertarResultado.on("click",function(){
					LimpiarResultado();
					accionResultado=accion.Insertar;
					mdlResultado.modal('open');
				});
				/*Elimina un resultado ya creado*/
				btnEliminarResultado.on("click",function(){
					var row=dtResultadosTabla.row(".selected");
					if(row.length>0){
						var data=row.data();
						var Sigla=data[0];
						swal({
						  title: "Eliminar?",
						  text: "Realmente desea eliminar el resultado seleccionada",
						  type: "warning",
						  showCancelButton: true,
						  confirmButtonColor: "#DD6B55",
						  confirmButtonText: "Si",
						  closeOnConfirm: false
						},
						function(){
							dtResultadosTabla
					        .row(row)
					        .remove()
					        .draw();
					        swal("Eliminado!", "Sigla Eliminada correctamente", "success");
							
						});
					}else{
						Materialize.toast('Seleccione un registro de la tabla Resultado', 4000);
					}
				});

				btnVerResultado.on("click",function(){
					LimpiarResultado();	
					var row=dtResultadosTabla.row(".selected");
					var $row=$("#dtResultadosTabla").find("tbody tr.selected");
					if(row.length>0){
						var data=row.data();
						accionResultado=accion.Modificar;
						RowResultado=row;
						txtResultadoInsertar.val(data[0]);											
						$.each($($row).data("Tareas"),function(index, value){
							
							dtTareas.row.add( [ value.Tarea
												, value.FechaInicio
												, value.FechaFin
												] ).draw().node();
						});
						mdlResultado.modal('open');
					}else{
						Materialize.toast('Seleccione un registro de la tabla Resultado', 4000);
					}
				});

				btnInsertarTarea.on("click",function(){
					LimpiarTareas();
					accionTarea=accion.Insertar;
					mdlTarea.modal('open');
				});

				btnEliminarTarea.on("click",function(){
					var row=dtTareas.row(".selected");
					if(row.length>0){
						var data=row.data();
						
						swal({
						  title: "Eliminar?",
						  text: "Realmente desea eliminar la tarea seleccionada",
						  type: "warning",
						  showCancelButton: true,
						  confirmButtonColor: "#DD6B55",
						  confirmButtonText: "Si",
						  closeOnConfirm: false
						},
						function(){
							dtTareas
					        .row(row)
					        .remove()
					        .draw();
					        swal("Eliminado!", "Tarea Eliminada correctamente", "success");
							
						});
					}else{
						Materialize.toast('Seleccione un registro de la tabla Resultado', 4000);
					}
				});

				btnVerTarea.on("click",function(){
					var row=dtTareas.row(".selected");
					if(row.length>0){
						accionTarea=accion.Modificar;
						RowTarea=row;
						var data=row.data();
						txtTareaInsertar.val(data[0]);
						txtTareaFechaInicio.val(data[1]);
						txtTareaFechaFin.val(data[2]);
						mdlTarea.modal('open');

					}else{
						Materialize.toast('Seleccione un registro de la tabla Resultado', 4000);
					}
				});

				btnGuardarObjetivos.on("click",function(){					
					if(accionOKrs==accion.Insertar){
						if(ValidarOKrs()){
							var lstResultado=[];
							var Objetivo=txtObjetivoInsertar.val();
							$.each($("#dtResultadosTabla").find( "tbody tr" ),function(index, value){							
								var row=dtResultadosTabla.rows(value);
								var $row=$(value);							
								var Resultado=row.data()[0][0];							
								lstResultado.push({Resultado:Resultado,Tareas:$row.data("Tareas")});
								
							});
							var objObjetivo={Objetivo:Objetivo,lstResultado:lstResultado};
							InicioControlador.GuardarObjetivo(objObjetivo,mdlOkrs);
							
						}
					}else if(accionOKrs==accion.Modificar){
						
						
						if(ValidarOKrs()){

							var lstResultado=[];
							var Objetivo=txtObjetivoInsertar.val();
							
							$.each($("#dtResultadosTabla").find( "tbody tr" ),function(index, value){							
								var row=dtResultadosTabla.rows(value);
								var $row=$(value);							
								var Resultado=row.data()[0][0];							
								lstResultado.push({Resultado:Resultado,Tareas:$row.data("Tareas")});
								
							});

							var objObjetivo={Objetivo:Objetivo,lstResultado:lstResultado};
							
							InicioControlador.GuardarObjetivo(objObjetivo,mdlOkrs,OkrsModificar);
							//OkrsModificar=undefined;
						}
					}
						
					
				});

				btnCancelarObjetivos.on("click",function(){
					mdlOkrs.modal("close");
				});

				/*Eventos Insertar Resultados*/
				btnCancelarResultado.on("click",function(){
					mdlResultado.modal("close");
				});
				btnGuardarResultado.on("click",function(){
					if(ValidarResultado()){
						if(accionResultado==accion.Insertar){						
							var row=dtResultadosTabla.row.add( [txtResultadoInsertar.val()] )
		    					.draw()
			    				.node();
			    			Tareas=[];		    			
			    			$.each( dtTareas.data(),function(index,value){		    				
			    				Tareas.push({Tarea:value[0]
			    							,FechaInicio:value[1]
			    							,FechaFin:value[2]
			    						});
			    			});		    			
		    				$(row).data( "Tareas", Tareas );
		    				mdlResultado.modal("close");
						}else if(accionResultado==accion.Modificar){
							RowResultado.data( [txtResultadoInsertar.val()] ).draw();
							Tareas=[];
							var $row=$("#dtResultadosTabla").find("tbody tr.selected");
							$.each( dtTareas.data(),function(index,value){		    				
			    				Tareas.push({Tarea:value[0]
			    							,FechaInicio:value[1]
			    							,FechaFin:value[2]
			    						});
			    			});		
			    			$($row).data( "Tareas", Tareas );
		    				mdlResultado.modal("close");
		    				accionResultado=undefined;
		    				RowResultado=undefined;

						}
					}
				});

				/*Eventos Insertar Tarea*/
				btnGuardarTarea.on("click",function(){	
					if(ValidarTareas()){
						if(accionTarea==accion.Insertar){						
							var row=dtTareas.row.add( [ txtTareaInsertar.val()
												, txtTareaFechaInicio.val()
												, txtTareaFechaFin.val() 
												] )
	    					.draw()
		    				.node();
		    				$(row).attr("data-UPBid","0");
		    				$(row).attr("data-UPBAccion",accionRow.Insertar);	
		    				mdlTarea.modal("close");
						}else if(accionTarea==accion.Modificar){
							RowTarea.data( [ txtTareaInsertar.val()
											, txtTareaFechaInicio.val()
											, txtTareaFechaFin.val() 
											]).draw();
							mdlTarea.modal("close");
							RowTarea=undefined;
						}
						
					}	
				});
				btnCancelarTarea.on("click",function(){
					mdlTarea.modal("close");
					RowTarea=undefined;
				});

				/*Load Funciones*/
				UtilitisDatatable.SelectedDatatable();
				var starCountRef=firebase.database().ref("users");			
				starCountRef.on("value"
					,function(snapshot){
						var source=[];
						if(snapshot.val()!=null){
							$.each(snapshot.val(),function(index, valor){
								source.push({id:index,name:valor.name});
							});
						}
						txtsearch.typeahead({
							source:source
							,autoSelect: true
						});

				});
				txtsearch.change(function() {
					var current = txtsearch.typeahead("getActive");
					if (current) {
					// Some item from your model is active!
						if (current.name == txtsearch.val()) {	    
							InicioControlador.MostrarObjetivos(PanelPrincila,current.id); 	
						 	
						} else {
						  // This means it is only a partial match, you can either add a new item
						  // or take the active if you don't want new items
						}
					} else {
					// Nothing is active so it is a new value (or maybe empty value)
					}
				});

				$( document ).on( "click", ".btnEditarOkrs", function() {
					var IdUsuario=firebase.auth().currentUser.uid;
					var $this=$(this);					
					var starCountRef=firebase.database().ref('Objetivos/'+IdUsuario+"/"+$this.attr("data-okrsid"));
		        	starCountRef.on("value",
		        		function(snapshot) {		        			
							if(snapshot.val()!=null){
								LimpiarOkRs();
								var valor=snapshot.val();
								OkrsModificar=$this.attr("data-okrsid");
								accionOKrs=accion.Modificar;
								txtObjetivoInsertar.val(valor.Objetivo);
								$.each(valor.lstResultado,function(index,value){
									
									var row=dtResultadosTabla.row.add( [value.Resultado])
				    					.draw()
					    				.node();
					    			Tareas=[];	

					    			$.each( value.Tareas,function(index,value2){	
					    				   					
					    				Tareas.push({Tarea:value2.Tarea
					    							,FechaInicio:value2.FechaInicio
					    							,FechaFin:value2.FechaFin
					    						});
					    			});		    			
				    				$(row).data( "Tareas", Tareas );
								});
								mdlOkrs.modal('open');
								
							}
						}
					);	
				});
			};
			google.charts.load('current', {'packages':['timeline']});
     		google.charts.setOnLoadCallback(readyApiGlogle);

        });
});

