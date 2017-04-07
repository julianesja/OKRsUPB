define([]
    , function () {
        return {
            getCardPrincipal:function(idobjetivo,Nombre,Editar){
                var Objetivo;
                console.log(Editar);
                if(Editar){
                    Objetivo='<div class="col s6 m6">'
                            +'    <h5 class="header">'+Nombre+'</h5>'                            
                            +'    <div class="card horizontal">'      
                            +'        <div class="card-stacked">'
                            +'            <div class="card-content" id="'+idobjetivo+'">'
                            +'<a data-okrsid="'+idobjetivo+'" class="waves-effect waves-light btn btnEditarOkrs">Editar</a>'             
                                  
                            +'            </div>'
                            +'        </div>'
                                   
                            +'    </div>'
                            +'</div>'
                }else{
                    Objetivo='<div class="col s6 m6">'
                            +'    <h5 class="header">'+Nombre+'</h5>'
                            +'    <div class="card horizontal">'      
                            +'        <div class="card-stacked">'
                            +'            <div class="card-content" id="'+idobjetivo+'">'
                                          
                                  
                            +'            </div>'
                            +'        </div>'
                                   
                            +'    </div>'
                            +'</div>'
                }
                

                return $(Objetivo);
            }
            ,getCardSecundaria:function(Nombre, IdResultado){
                var Resultado='<div class="col s12 m12">'    
                            +'    <div class="card horizontal">'
                            +'        <div class="card-image">'                            
                            +'        </div>'
                            +'        <div class="card-stacked">'
                            +'            <p>'+Nombre+'</p>'
                            +'            <div class="card-content">'
                            +'                <div id="'+IdResultado+'" style="height: 180px;"></div>'
                            +'            </div>'
                            +'        </div>'
                            +'    </div>'
                            +'</div>'
                return $(Resultado);
            },
            InsertObjetivos:function(Contenedor,lstObjetivo,that,Editar){ 
                var i=0;               
                /*Recorro los objetivos*/
                $.each(lstObjetivo,function(index, Value){                    
                    var Objetivo=that.getCardPrincipal(index,Value.Objetivo,Editar);
                    Contenedor.append(Objetivo);
                    /*Recorro los Resultados*/
                    $.each(Value.lstResultado,function(indexResultado,ValueResultado){
                        var Resultado=that.getCardSecundaria(ValueResultado.Resultado,(index+"-"+i));
                        /*Agrego los Resultados a las tareas*/
                        $("#"+index).append(Resultado);
                        /*Variables para hacer el dubujo de las tareas*/
                        var container = document.getElementById((index+"-"+i));
                        var chart = new google.visualization.Timeline(container);
                        var dataTable = new google.visualization.DataTable();
                        var dataTareas=[];

                        dataTable.addColumn({ type: 'string', id: 'Tarea' });
                        dataTable.addColumn({ type: 'date', id: 'Start' });
                        dataTable.addColumn({ type: 'date', id: 'End' });
                         /*Recorro las tareas*/
                        $.each(ValueResultado.Tareas,function(indexTareas,ValueTareas){
                            
                            dataTareas.push([ValueTareas.Tarea
                                            , new Date(ValueTareas.FechaInicio)
                                            ,new Date(ValueTareas.FechaFin)
                                            ]);
                           
                        });
                        
                        dataTable.addRows(dataTareas);
                        chart.draw(dataTable);
                        /*Contador para no repetir id*/
                        i++;
                        
                        
                    });
                });
            }

        };
    });