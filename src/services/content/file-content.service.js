'use strict';

angular.module('edAssistApp').factory('fileContentService', ['Restangular', 'FileSaver', 'Blob', 'constants', function (Restangular, FileSaver, Blob, constants) {

	var fileContentService = {
		rawContent: Restangular.withConfig(function (config) {
			config.setDefaultHttpFields({cache: true});
			config.setFullResponse(true);
		}).service('content'),

		getUploadDocumentsURL : function () {
			return constants.urls.restBase + '/content' + '/file';
		},
		retrieveFileContent: function (fileId, documentName) {
			fileContentService.rawContent.one('file').one(fileId).withHttpConfig({ responseType: 'arraybuffer' }).get().then(function (response) {
				fileContentService.downloadDocument(response, documentName);
			});
		},
		downloadDocument: function (response, documentName) {
			var headers = response.headers();
			var data = new Blob([response.data], {type: headers['content-type']});
			var extension = headers['file-ext'];
			if (extension) {
				FileSaver.saveAs(data, documentName + extension);
			} else {
				FileSaver.saveAs(data, documentName);
			}
		}
	};
	return fileContentService;
}]);