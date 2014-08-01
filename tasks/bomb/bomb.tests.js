({
	"Big bada boom": function () {
		return new Promise(function (resolve) {
			var XBomb = function () {
				Bomb.apply(this, arguments);
			};

			XBomb.prototype = Object.create(Bomb.prototype);

			XBomb.prototype.blowUp = function () {
				resolve("OK" === this.message);
			};

			new XBomb("OK", .0001);
		});
	}
})
