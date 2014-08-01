({
	"xxx.delay(50)": function () {
		return new Promise(function (resolve, reject) {
			setTimeout(reject, 100);
			(function () {
				resolve([true, true]);
			}).delay(50);
		});
	}
})
