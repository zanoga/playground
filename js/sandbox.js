define(function (require) {
	var $ = require('jquery');
	var output = require('output');
	var testSuite = require('testSuite');
	var simulateEvent = require('simulateEvent');


	var Sandbox = function (silent) {
		this.silent = silent;
	};


	Sandbox.prototype = {
		reset: function (parent) {
			if (this.el && this.el.parentNode) {
				this.el.parentNode.removeChild(this.el);
			}

			var sandbox = (this.el = document.createElement('iframe'));
			(parent || document.body).appendChild(sandbox);

			this.window = sandbox.contentWindow;
			this.document = this.window.document;

			this.$ = this.window.$ = function (selector) {
				return $(selector, this.document);
			};

			this.window.simulateEvent = simulateEvent;
			this.window.console = $.extend({}, output, this.silent ? { log: $.noop } : {});
			this.window.testSuite = testSuite;
			this.window.isolate = this.isolate.bind(this);
		},

		isolate: function (callback) {
			var sandbox = new Sandbox(true);
			sandbox.set(this.code, this.html);
			sandbox.eval(callback.toString()+'()');
			return sandbox;
		},

		set: function (code, html) {
			this.reset(!this.silent && html && output.el);

			this.code = code;
			this.html = html;


			try {
				var document = this.document;

				document.open();

				html && document.write(html);
				document.write('<script>' + code + '</script>');

				document.close();
			} catch (err) {}
		},

		eval: function (code) {
			try {
				this.window.__result = null;
				this.window.eval('window.__result = (' + code + ')');
			} catch (err) {
				console.log('eval:', code, err);
			}
		},

		getResult: function () {
			return this.window.__result;
		}
	};


	return Sandbox;
});
