'use strict';

angular.module('edAssistApp').config(['$provide', function($provide) {
    $provide.decorator('taOptions', ['$delegate', function(taOptions) {
        // $delegate is the taOptions we are decorating
        taOptions.forceTextAngularSanitize = true; // set false to allow the textAngular-sanitize provider to be replaced
        taOptions.keyMappings = []; // allow customizable keyMappings for specialized key boards or languages
        taOptions.toolbar = [
            ['h1', 'h2', 'h3', 'p', 'pre', 'quote'],
            ['bold', 'italics', 'underline', 'ul', 'ol'],
            ['justifyLeft','justifyCenter','justifyRight', 'justifyFull'],
            ['html', 'insertImage', 'insertLink']
        ];
        taOptions.classes = {
            focussed: 'focussed',
            toolbar: 'btn-toolbar',
            toolbarGroup: 'btn-group',
            toolbarButton: 'btn btn-default',
            toolbarButtonActive: 'active',
            disabled: 'disabled',
            textEditor: 'form-control',
            htmlEditor: 'form-control'
        };
        return taOptions;
    }]);
 }]);