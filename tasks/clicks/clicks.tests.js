({
	"test": function () {
		var sandbox = isolate(function () {
			var btn = document.querySelector('button');
			simulateEvent(btn, 'click');
			simulateEvent(btn, 'click');
			simulateEvent(btn, 'click');
			simulateEvent(btn, 'click');
		});

		return ['Click me (3)', sandbox.$('button').text()];
	}
})
