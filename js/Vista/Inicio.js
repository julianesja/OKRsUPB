 require( ["Controlador/InicioControlador"],
    function(InicioControlador) {
		$(document).ready(function(){
			/*Variables*/
			var txtName=$("#txtName");
			var lstArea=$("#lstArea");
			var txtFile=$("#txtFile");
			var btnGuardarDatosPersonales=$("#btnGuardarDatosPersonales");
			var progressCargar=$("#progressCargar");
			var btnMiOKRs=$("#btnMiOKRs");
			var PanelPrincila=$("#PanelPrincila");
			var btnNuevoOkrs=$("#btnNuevoOkrs");
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
			}	
			$('.modal').modal({dismissible: false,});
			$(".button-collapse").sideNav();
			$('select').material_select();
			btnNuevoOkrs.hide();
			InicioControlador.Inicializacion();
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

			btnMiOKRs.on("click",function(){
				PanelPrincila.load("misokrs.html");
			});

		});
});

