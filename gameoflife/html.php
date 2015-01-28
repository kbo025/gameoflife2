<html>
	<head>
		<link rel='stylesheet'  href='css/gameoflife.css' type='text/css' media='screen' />
		<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
		<script src='js/gameoflifehtml.js'></script>
		<script src='js/jquery.timer.js'></script>
		<script language="javascript">
			$( document ).ready(function() {
				dibujarGrilla($('#html-gol'));
				inicializar();
			});
		</script>
	</head>
	<body>
		<div class="encabezado">
			<h1>El Juego de la Vida</h1>
		</div>
		<div id="controles" class="controles">
			<fieldset>
				<legend><h3>Controles</h3></legend>
				<div class="row" >
					<label for="generacion" >Generación:</label><span id="generacion"></span>
					<div class="clear"></div>
				</div>
				<div class="row" >
					<label for="celulas" >Celulas Vivas:</label><span id="celulas"></span>
					<div class="clear"></div>
				</div>
				<div class="row" >
					<label for="gol-ancho" >Ancho</label><input type="number" id="gol-ancho" class="gol ctr ancho" value="25" min=3 max=50 step=1 />
					<div class="clear"></div>
				</div>
				<div class="row" >
					<label for="gol-alto" >Alto</label><input type="number" id="gol-alto" class="gol ctr alto" value="25" min=3 max=50 step=1 />
					<div class="clear"></div>
				</div>
				<div class="row button" >
					<button type="button" class="gol ctr button play" id="gol-btplay"><span>Play</span></button>
				</div>
				<div class="row button " >
					<button type="button" class="gol ctr button pause" id="gol-btpause"><span>Pause</span></button>
				</div>
				<div class="row button" >
					<button type="button" class="gol ctr button step" id="gol-btstep"><span>Step</span></button>
				</div>
				<div class="row button" >
					<button type="button" class="gol ctr button restart" id="gol-btrestart"><span>Restart</span></button>
				</div>
			</fieldset>
		</div>
		<br/>
		<div class="display" id="display">
			<div class="html-gol" id="html-gol">
			</div>
		</div>
	</body>
</html>