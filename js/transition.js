var blockForms = document.querySelectorAll(".block-form");

Transition = function(el, min, max) {
	this.flag = false;
	this.el = el;
	this.value = max;
	this.min = min;
	this.max = max;
	this.step = 0.05;
	this.callback = function() {};

	this.update = function() {
		if (this.flag) {
			if (this.value > this.min) {
				this.value -= this.step;
			}
			else {
				this.callback();
				this.flag = false;
			}
		}
		else {
			if (this.value < this.max) {
				this.value += this.step;
			}
		}
	}
}

transitionDiv = new Transition(document.getElementById("transition"), 0.0, 1.0);

ChangeView = function(button, view) {
	var obj = this;

	this.button = document.getElementById(button);
	this.view = document.getElementById(view);

	this.button.addEventListener("click",function() {
		transitionDiv.flag = true;
		transitionDiv.callback = function() {
			for (i = 0; i < blockForms.length; i++) {
				blockForms[i].style.display = "none";
			}
			obj.view.style.display = "block";
		}
	});
}

buscaDividida = new ChangeView("busca-dividida-submit","cadastre-se");
buscaDividida = new ChangeView("cadastre-se-submit","sem-contratos");
buscaDividida = new ChangeView("sem-contratos-submit","sms");
buscaDividida = new ChangeView("sms-submit","sucesso");
buscaDividida = new ChangeView("sucesso-submit","visualizar-propostas");
buscaDividida = new ChangeView("visualizar-propostas-submit","busca-dividida");

update = function() {

	transitionDiv.update();
	transitionDiv.el.style.opacity = transitionDiv.value;

	setTimeout(function() {
		update();
	}, 1000 / 60);
}

update();