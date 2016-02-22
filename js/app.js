define(function (require) {
	'use strict';

	var $ = require('jquery');
	var ace = require('ace/ace');
	var output = require('output');
	var testSuite = require('testSuite');
	// var tasks = require('tasks');
	var Sandbox = require('sandbox');
	var debounce = require('debounce');
	var email = require('email');
	var fb = require('fb');

	/**
	 * @class App
	 * @param {Object}  opts
	 */
	function App(opts) {
		output.el = $(opts.idOutput)[0];
		testSuite.el = $(opts.idSuite)[0];

		this.key = 'app';
		this.editor = this.initEditor(opts.idEditor);
		this.output = output;
		this.sandbox = new Sandbox();

		this.restore();

		// tasks.onselect(function (code, html, tests) {
		// 	this.tests = tests;
		// 	this.setCode(localStorage.getItem(this.getKey()) || code, html);
		// }.bind(this));

		email.onclick = function () {
			email.set(null, this.getCode())
				.then((codeRef) => {
					let hash = codeRef.split('/').pop();
					this.setHash(hash);
					this.save();
				});
		}.bind(this);
	}


	App.prototype = /** @lends App.prototype */ {
		initEditor: function (id) {
			var editor = ace.edit(id.substr(1));

			// editor.setTheme('ace/theme/xcode');
			editor.setTheme("ace/theme/monokai");
			editor.getSession().setMode('ace/mode/javascript');

			editor.on('change', debounce(function () {
				console.clear();

				this.save();
				this.exec(this.getCode());
				this.runTests();
			}.bind(this), 500));

			return editor;
		},

		setHash: function (hash) {
			location.hash = hash;
		},

		runTests: function () {
			this.tests && this.sandbox.eval('testSuite.run(' + this.tests + ')');
		},

		exec: function (code) {
			this.output.clear();
			this.sandbox.set(code, this.html);
		},

		setCode: function (code, html) {
			this.html = html;

			this.editor.setValue(code);
			this.editor.clearSelection();
			this.editor.moveCursorTo(0, 0);
			this.editor.focus();
		},

		getCode: function () {
			return this.editor.getValue();
		},

		getKey: function () {
			return (location.hash.length ? location.hash.slice(1) : null) || this.key;
		},

		restore: function () {
			fb.get(this.getKey()).then((data) => {
				this.setCode(data.code || '');
			}, () => {
				this.setCode(localStorage.getItem(this.getKey()) || '');
			});
		},

		save: function () {
			localStorage.setItem(this.getKey(), this.getCode());
		}
	};


	return App;
});
