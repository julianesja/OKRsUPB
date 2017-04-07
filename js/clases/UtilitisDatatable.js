define([]
    , function () {
        return {
            /*Pregunta si un Objeto es null o undifeni */
            SelectedDatatable: function () {
                $(document).on( 'click', '.selectedTable tbody tr', function () {
                	var table=$($(this).parent("tbody").parent("table"));
                	
			        if ( $(this).hasClass('selected') ) {
			            $(this).removeClass('selected');
			        }
			        else {			        				  
			            table.children('tbody').children("tr.selected").removeClass('selected');
			            $(this).addClass('selected');
			        }
			    } );
               
            }
        };
    });