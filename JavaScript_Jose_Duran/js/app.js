var calculadora = {

	visor: document.getElementById("display"),
	ValorEnPantalla: "0",
	operacion: "",
	primerValor: 0,
	segundoValor: 0,
	ultimoValor: 0,
	resultado: 0,
	auxTeclaIgual: false,

	init: (function(){
		this.eventoBntTecla(".tecla");
		this.asignarEventosaFuncion();
	}),

//Eventos mouse - sobre y salida
	eventoBntTecla: function(selector){
		var x = document.querySelectorAll(selector);
		for (var i = 0; i<x.length;i++) {
			x[i].onmouseover = this.EventoOverBtn;
			x[i].onmouseleave = this.EventoLeaveBtn;
		};
	},

	EventoOverBtn: function(event){
		calculadora.achicaBoton(event.target);
	},

	EventoLeaveBtn: function(event){
		calculadora.agrandaBoton(event.target);
	},

	achicaBoton: function(elemento){
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "28%";
			elemento.style.height = "62px";
		} else if(x=="mas") {
			elemento.style.width = "88%";
			elemento.style.height = "98%";
		} else {
		elemento.style.width = "21%";
		elemento.style.height = "62px";
		}
	},

	agrandaBoton: function(elemento){
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "30%";
			elemento.style.height = "62.91px";
		} else if(x=="mas") {
			elemento.style.width = "90%";
			elemento.style.height = "100%";
		} else {
		elemento.style.width = "23%";
		elemento.style.height = "62.91px";
		}
	},

	asignarEventosaFuncion: function(){
		document.getElementById("0").addEventListener("click", function() {calculadora.ingresoNumero("0");});
		document.getElementById("1").addEventListener("click", function() {calculadora.ingresoNumero("1");});
		document.getElementById("2").addEventListener("click", function() {calculadora.ingresoNumero("2");});
		document.getElementById("3").addEventListener("click", function() {calculadora.ingresoNumero("3");});
		document.getElementById("4").addEventListener("click", function() {calculadora.ingresoNumero("4");});
		document.getElementById("5").addEventListener("click", function() {calculadora.ingresoNumero("5");});
		document.getElementById("6").addEventListener("click", function() {calculadora.ingresoNumero("6");});
		document.getElementById("7").addEventListener("click", function() {calculadora.ingresoNumero("7");});
		document.getElementById("8").addEventListener("click", function() {calculadora.ingresoNumero("8");});
		document.getElementById("9").addEventListener("click", function() {calculadora.ingresoNumero("9");});
		document.getElementById("on").addEventListener("click", function() {calculadora.linpiarPantalla();});
		document.getElementById("sign").addEventListener("click", function() {calculadora.cambiarSigno();});
		document.getElementById("punto").addEventListener("click", function() {calculadora.ingresoDecimal();});
		document.getElementById("igual").addEventListener("click", function() {calculadora.verResultado();});
		document.getElementById("raiz").addEventListener("click", function() {calculadora.ingresoOperacion("raiz");});
		document.getElementById("dividido").addEventListener("click", function() {calculadora.ingresoOperacion("/");});
		document.getElementById("por").addEventListener("click", function() {calculadora.ingresoOperacion("*");});
		document.getElementById("menos").addEventListener("click", function() {calculadora.ingresoOperacion("-");});
		document.getElementById("mas").addEventListener("click", function() {calculadora.ingresoOperacion("+");});
	},

	linpiarPantalla: function(){

	    this.ValorEnPantalla = "0";
		this.operacion = "";
		this.primerValor = 0;
		this.segundoValor = 0;
		this.resultado = 0;
		this.Operación = "";
		this.auxTeclaIgual = false;
		this.ultimoValor = 0;
		this.actalizaPantalla();
	},

	cambiarSigno: function(){
		if (this.ValorEnPantalla !="0") {
			var aux;
			if (this.ValorEnPantalla.charAt(0)=="-") {
				aux = this.ValorEnPantalla.slice(1);
			}	else {
				aux = "-" + this.ValorEnPantalla;
			}
		this.ValorEnPantalla = "";
		this.ValorEnPantalla = aux;
		this.actalizaPantalla();
		}
	},

	ingresoDecimal: function(){
		if (this.ValorEnPantalla.indexOf(".")== -1) {
			if (this.ValorEnPantalla == ""){
				this.ValorEnPantalla = this.ValorEnPantalla + "0.";
			} else {
				this.ValorEnPantalla = this.ValorEnPantalla + ".";
			}
			this.actalizaPantalla();
		}
	},

	ingresoNumero: function(valor){
		if (this.ValorEnPantalla.length < 8) {

			if (this.ValorEnPantalla=="0") {
				this.ValorEnPantalla = "";
				this.ValorEnPantalla = this.ValorEnPantalla + valor;
			} else {
				this.ValorEnPantalla = this.ValorEnPantalla + valor;
			}
		this.actalizaPantalla();
		}
	},

	ingresoOperacion: function(oper){
		this.primerValor = parseFloat(this.ValorEnPantalla);
		this.ValorEnPantalla = "";
		this.operacion = oper;
		this.auxTeclaIgual = false;
		this.actalizaPantalla();
	},

	verResultado: function(){

		if(!this.auxTeclaIgual){
			this.segundoValor = parseFloat(this.ValorEnPantalla);
			this.ultimoValor = this.segundoValor;
			this.Operaciones(this.primerValor, this.segundoValor, this.operacion);

		} else {
			this.Operaciones(this.primerValor, this.ultimoValor, this.operacion);
		}

		this.primerValor = this.resultado;
		this.ValorEnPantalla = "";

		if (this.resultado.toString().length < 9){
			this.ValorEnPantalla = this.resultado.toString();
		} else {
			this.ValorEnPantalla = this.resultado.toString().slice(0,8) + "...";
		}

		this.auxTeclaIgual = true;
		this.actalizaPantalla();

	},

	Operaciones: function(primerValor, segundoValor, operacion){
		switch(operacion){
			case "+":
				this.resultado = eval(primerValor + segundoValor);
			break;
			case "-":
				this.resultado = eval(primerValor - segundoValor);
			break;
			case "*":
				this.resultado = eval(primerValor * segundoValor);
			break;
			case "/":
				this.resultado = eval(primerValor / segundoValor);
			break;
			case "raiz":
				this.resultado = eval(Math.sqrt(primerValor));
		}
	},

	actalizaPantalla: function(){
		this.visor.innerHTML = this.ValorEnPantalla;
	}

};

calculadora.init();
