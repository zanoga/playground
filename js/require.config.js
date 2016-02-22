requirejs.config({
    waitSeconds: 10,
    urlArgs: 'bust=' + (new Date).getTime(),

    deps: ['ace/theme/monokai', 'ace/mode/javascript'],

    shims: {
        'hljs': { exports: 'hljs' }
    },

    paths: {
        'ace': 'bower_components/ace/lib/ace',
        'jquery': 'bower_components/jquery/dist/jquery',
        'hljs': 'bower_components/highlight.js/src/highlight',
        'firebase': 'bower_components/firebase/firebase'
    }
});
