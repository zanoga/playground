define(function (require) {
	var $ = require('jquery'),
		output = {},
		console = window.console;


	// Extend
	'error info warn'.split(' ').forEach(function (name) {
		output[name] = function () {
			return console[name].apply(console, arguments);
		};
	});


	output.clear = function () {
		this.el.innerHTML = '';
	};


	output.log = function () {
		var text = $.map(arguments, function (val) {
			return val && val.nodeType
				? ('&lt;' + val.nodeName.toLowerCase() + '/&gt;')
				: (val === void 0
					? "undefined"
					: JSON.stringify(val)
				)
			;
		}).join(' ');

		this.el.appendChild(document.createTextNode(text));
		this.el.appendChild(document.createElement('br'));

		console.log.apply(console, arguments);
	};


	output.htmlBlock = function (el) {
		this.el.appendChild(el);
	};


	// Export
	return output;
});
