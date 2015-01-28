var actgen; //actgen será el array que contenga la generación actual
var newgen; //newgen será el array donde se almacenará la proxima generación
var generacion;
var celulas;
var estado;
var container;

function inicializar(){
	actgen = new Array(50);
	newgen = new Array(50);
	generacion=0;
	celulas=0;
	estado=0;
	for(i=0;i<50;i++){
		actgen[i]=new Array(50);
		newgen[i]=new Array(50);
	}
	randomGeneration();
	$('#gol-btstep').click(function(){
		if(estado!=1){
			stepHtml();
			estado=2;
			$('#gol-btplay').removeAttr('disabled','disabled');
			$('#gol-btpause').attr('disabled','disabled');
			$('#gol-btstep').removeAttr('disabled','disabled');
		}
	});
	$('#gol-btrestart').click(function(){
		restart();
	});
	$('#gol-btplay').removeAttr('disabled','disabled');
	$('#gol-btpause').attr('disabled','disabled');
	$('#gol-btstep').removeAttr('disabled','disabled');
	$.timer(4000, function(){
		if(estado==1){
			stepHtml();
		}
	})
	$('#gol-btplay').click(function(){
		estado=1;
		$('#gol-btplay').attr('disabled','disabled');
		$('#gol-btpause').removeAttr('disabled','disabled');
		$('#gol-btstep').attr('disabled','disabled');
	});
	$('#gol-btpause').click(function(){
		estado=2;
		$('#gol-btplay').removeAttr('disabled','disabled');
		$('#gol-btpause').attr('disabled','disabled');
		$('#gol-btstep').removeAttr('disabled','disabled');
	});
	$('#gol-ancho').change(function(){
		if($('#gol-ancho').val()<3){
			$('#gol-ancho').val(3);
		}else{
			if($('#gol-ancho').val()>50){
				$('#gol-ancho').val(50);
			}else{
				columnas=$('#gol-ancho').val();
			}
		}
		container.html('');
		dibujarGrilla(container);
		restart();
	});
	$('#gol-alto').change(function(){
		if($('#gol-alto').val()<3){
			$('#gol-alto').val(3);
		}else{
			if($('#gol-alto').val()>50){
				$('#gol-alto').val(50);
			}else{
				filas=$('#gol-alto').val();
			}
		}
		container.html('');
		dibujarGrilla(container);
		restart();
	});
}

//funcion que genera una generación 0 aleatoria
function randomGeneration(){
	generacion=0;
	for(i=0;i<$('#gol-ancho').val();i++){
		for(j=0;j<$('#gol-alto').val();j++){
			if(Math.random()<0.5){
				actgen[i][j]=0;
				$('.f'+i+' .c'+j+' .celula').removeClass('live');
				$('.f'+i+' .c'+j+' .celula').addClass('die');
			}else{
				celulas++;
				actgen[i][j]=1;
				$('.f'+i+' .c'+j+' .celula').removeClass('die');
				$('.f'+i+' .c'+j+' .celula').addClass('live');
			}
		}
	}
	$('#generacion').text(generacion);
	$('#celulas').text(celulas);
}

function dibujarGrilla(contenedor)
{
	container=contenedor;
	contenedor.html('<div class="container"></div>');
	for(i=0;i<$('#gol-ancho').val();i++)
	{
		$('.container').append('<div class="fila f'+i+'"></div>');
	}
	for(i=0;i<$('#gol-alto').val();i++)
	{
		$('.fila').append('<div class="celda c'+i+'"></div>');
	}
	$('.fila').append('<div class="clear"></div>');
	$('.celda').append('<div class="celula"></div>');
}

function stepHtml(){
	celulas=0;
	for(i=0;i<$('#gol-ancho').val();i++){
		for(j=0;j<$('#gol-alto').val();j++){
			stepCeldaHtml(i,j);
		}
	}
	for(i=0;i<$('#gol-ancho').val();i++){
		for(j=0;j<$('#gol-alto').val();j++){
			actgen[i][j]=newgen[i][j];
			if(actgen[i][j]==0){
				$('.f'+i+' .c'+j+' .celula').removeClass('live');
				$('.f'+i+' .c'+j+' .celula').addClass('die');
			}else{
				celulas++;
				$('.f'+i+' .c'+j+' .celula').removeClass('die');
				$('.f'+i+' .c'+j+' .celula').addClass('live');
			}
		}
	}
	generacion++;
	$('#generacion').text(generacion);
	$('#celulas').text(celulas);
}

//evaluacion para el salto de generación de una celda
function stepCeldaHtml(i,j){
	n=0;
	if(i>0){
		if(j>0){
			n=n+actgen[i-1][j-1];
		}
		n=n+actgen[i-1][j];
		if(j<$('#gol-alto').val()-1){
			n=n+actgen[i-1][j+1];
		}
	}
	if(j>0){
		n=n+actgen[i][j-1];
	}
	if(j<$('#gol-alto').val()-1){
		n=n+actgen[i][j+1];
	}
	if(i<$('#gol-ancho').val()-1){
		if(j>0){
			n=n+actgen[i+1][j-1];
		}
		n=n+actgen[i+1][j];
		if(j<$('#gol-alto').val()-1){
			n=n+actgen[i+1][j+1];
		}
	}
	if(actgen[i][j]==1){
		if((n<2)||(n>3)){
			newgen[i][j]=0;
		}else{
			newgen[i][j]=1;
			celulas++;
		}
	}else{
		if(n==3){
			newgen[i][j]=1;
			celulas++;
		}else{
			newgen[i][j]=0;
		}
	}
}

//reinicia el sistema
function restart(){
	estado=0;
	generacion=0;
	celulas=0;
	randomGeneration();
	$('#gol-btplay').removeAttr('disabled','disabled');
	$('#gol-btpause').attr('disabled','disabled');
	$('#gol-btstep').removeAttr('disabled','disabled');
}