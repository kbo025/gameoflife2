function dibujarCanvasGOL(processing)
{
	var actgen; //actgen será el array que contenga la generación actual
	var newgen; //newgen será el array donde se almacenará la proxima generación
	var estado; //el estado actual del sistema 0: estado inicial, 1: play, 2: pause
	var generacion; //representa el numero de iteraciones que han ocurrido en el sistema
	var celulas; //representa el numero de celulas vivas en un momento dado en el sistema
	var columnas; //cantidad de columnas
	var filas; //cantidad de filas;
	var ancho; //ancho del lienzo
	var alto; //alto del lienzo
	var mov; //variable de movimiento para la animación de las celulas vivas
	var col; //variable de cambio de color par las celulas que mueren o viven
	var colorFill;
	var colorStroke;
	var fillLive;
	var strokeLive;
	var fillDie;
	var strokeDie;
	var fillTrans;
	var strokeTrans;
	
	processing.setup=function(){
		processing.background(255, 255, 255);
		actgen = new Array(50);
		newgen = new Array(50);
		colorFill=new Array(50);
		colorStroke=new Array(50);
		for(i=0;i<50;i++){
			actgen[i]=new Array(50);
			newgen[i]=new Array(50);
			colorFill[i]=new Array(50);
			colorStroke[i]=new Array(50);
			for(j=0;j<50;j++){
				colorFill[i][j]=Array(3);
				colorStroke[i][j]=Array(3);
			}
		}
		estado=0;
		generacion=0;
		celulas=0;
		columnas=25;
		filas=25;
		ancho=columnas*50;
		alto=filas*50;
		mov=0;
		fillLive=[140,225,135];
		fillTrans=[13,4,14];
		fillDie=[205,205,205];
		strokeLive=[60,155,55];
		strokeTrans=[21,2,22];
		strokeDie=[165,165,165];
		randomGen();
		processing.frameRate(20);
		$('#gol-btplay').attr('enabled','enabled');
		$('#gol-btpause').attr('disabled','disabled');
		$('#gol-btstep').attr('enabled','enabled');
	}

	processing.draw=function(){
		//1.- dibujar cuadricula
		mov = (mov==0 ? 1 : 0);
		processing.background(255, 255, 255);
		processing.size(ancho,alto);
		processing.strokeWeight(2);
		w=0;
		for(i=0;i<columnas;i++){
			w=w+50;
			processing.line(w, 0, w, alto);
		}
		h=0;
		for(j=0;j<filas;j++){
			h=h+50;
			processing.line(0, h, ancho, h);
		}
		//2.- iterar
		if((estado==1)&&(processing.frameCount % parseInt(50-((filas*columnas)/60)) == 0)){
			step();
		}
		
		//3.- dibujar celulas
		w=0;
		for(i=0;i<columnas;i++){
			h=0;
			for(j=0;j<filas;j++){
				dibujarCelda(w,h,i,j);
				h=h+50;
			}
			w=w+50;
		}
	}
	
	//funcion que genera una generación 0 aleatoria
	function randomGen(){
		generacion=0;
		for(i=0;i<columnas;i++){
			for(j=0;j<filas;j++){
				if(Math.random()<0.5){
					actgen[i][j]=0;
					colorStroke[i][j][0]=strokeDie[0]
					colorStroke[i][j][1]=strokeDie[1]
					colorStroke[i][j][2]=strokeDie[2]
					colorFill[i][j][0]=fillDie[0];
					colorFill[i][j][1]=fillDie[1];
					colorFill[i][j][2]=fillDie[2];
				}else{
					celulas++;
					actgen[i][j]=1;
					colorStroke[i][j][0]=strokeLive[0]
					colorStroke[i][j][1]=strokeLive[1]
					colorStroke[i][j][2]=strokeLive[2]
					colorFill[i][j][0]=fillLive[0];
					colorFill[i][j][1]=fillLive[1];
					colorFill[i][j][2]=fillLive[2];
				}
			}
		}
		$('#generacion').text(generacion);
		$('#celulas').text(celulas);
	}

	//dibujo de una celda
	function dibujarCelda(x,y,i,j){
		processing.strokeWeight(3);
		if(actgen[i][j]==1){
			for(k=0;k<3;k++){
				if(colorStroke[i][j][k]>strokeLive[k]){
					colorStroke[i][j][k]=colorStroke[i][j][k]-strokeTrans[k];
				}else{
					if(colorStroke[i][j][k]<strokeLive[k]){
						colorStroke[i][j][k]=colorStroke[i][j][k]+strokeTrans[k];
					}
				}
				if(colorFill[i][j][k]>fillLive[k]){
					colorFill[i][j][k]=colorFill[i][j][k]-fillTrans[k];
				}else{
					if(colorFill[i][j][k]<fillLive[k]){
						colorFill[i][j][k]=colorFill[i][j][k]+fillTrans[k];
					}
				}
			}
			processing.stroke(colorStroke[i][j][0],colorStroke[i][j][1],colorStroke[i][j][2]);
			processing.fill(colorFill[i][j][0],colorFill[i][j][1],colorFill[i][j][2]);
			processing.ellipse(x+25,y+25,25+(mov*2),25+(mov*2));
		}else{
			for(k=0;k<3;k++){
				if(colorStroke[i][j][k]>strokeDie[k]){
					colorStroke[i][j][k]=colorStroke[i][j][k]-strokeTrans[k];
				}else{
					if(colorStroke[i][j][k]<strokeDie[k]){
						colorStroke[i][j][k]=colorStroke[i][j][k]+strokeTrans[k];
					}
				}
				if(colorFill[i][j][k]>fillDie[k]){
					colorFill[i][j][k]=colorFill[i][j][k]-fillTrans[k];
				}else{
					if(colorFill[i][j][k]<fillDie[k]){
						colorFill[i][j][k]=colorFill[i][j][k]+fillTrans[k];
					}
				}
			}
			processing.stroke(colorStroke[i][j][0],colorStroke[i][j][1],colorStroke[i][j][2]);
			processing.fill(colorFill[i][j][0],colorFill[i][j][1],colorFill[i][j][2]);
			processing.ellipse(x+25,y+25,25,25);
		}
	}
	
	//evaluacion para el salto de generacion del sistema
	function step(){
		celulas=0;
		for(i=0;i<columnas;i++){
			for(j=0;j<filas;j++){
				stepCelda(i,j);
			}
		}
		for(i=0;i<columnas;i++){
			for(j=0;j<filas;j++){
				actgen[i][j]=newgen[i][j];
			}
		}
		generacion++;
		$('#generacion').text(generacion);
		$('#celulas').text(celulas);
	}
	
	//evaluacion para el salto de generación de una celda
	function stepCelda(i,j){
		n=0;
		if(i>0){
			if(j>0){
				n=n+actgen[i-1][j-1];
			}
			n=n+actgen[i-1][j];
			if(j<filas-1){
				n=n+actgen[i-1][j+1];
			}
		}
		if(j>0){
			n=n+actgen[i][j-1];
		}
		if(j<filas-1){
			n=n+actgen[i][j+1];
		}
		if(i<columnas-1){
			if(j>0){
				n=n+actgen[i+1][j-1];
			}
			n=n+actgen[i+1][j];
			if(j<filas-1){
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
		randomGen();
		$('#gol-btplay').removeAttr('disabled','disabled');
		$('#gol-btpause').attr('disabled','disabled');
		$('#gol-btstep').removeAttr('disabled','disabled');
	}
	
	$('#gol-ancho').change(function(){
		if($('#gol-ancho').val()<3){
			columnas=3;
			$('#gol-ancho').val(3);
		}else{
			if($('#gol-ancho').val()>50){
				columnas=50;
				$('#gol-ancho').val(50);
			}else{
				columnas=$('#gol-ancho').val();
			}
		}
		ancho=columnas*50;
		restart();
	});
	$('#gol-alto').change(function(){
		if($('#gol-alto').val()<3){
			filas=3;
			$('#gol-alto').val(3);
		}else{
			if($('#gol-alto').val()>50){
				filas=50;
				$('#gol-alto').val(50);
			}else{
				filas=$('#gol-alto').val();
			}
		}
		alto=filas*50;
		restart();
	});

	$('#gol-btstep').click(function(){
		if(estado!=1){
			step();
			estado=2;
			$('#gol-btplay').removeAttr('disabled','disabled');
			$('#gol-btpause').attr('disabled','disabled');
			$('#gol-btstep').removeAttr('disabled','disabled');
		}
	});
	$('#gol-btrestart').click(function(){
		restart();
	});
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
}