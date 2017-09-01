'use strict';

angular.module('edAssistApp').directive('applicationComments', ['$rootScope', '$stateParams', 'applicationService', 'storageService', 'utilService', function ($rootScope, $stateParams, applicationService, storageService, utilService) {
	return {
		restrict: 'EA',
		bindToController: true,
		scope: {
			hideAddNewComment: '=',
			comments: '='
		},
		templateUrl: 'src/directives/application/templates/application-comments.html',
		controllerAs: 'appCommentsCtrl',
		controller: function ($scope, $element, $attrs) {
			var vm = this;
			var userDetails = storageService.get('user.userDetails');
			vm.appCommentsStatus = 'loading';
			vm.applicationId = $stateParams.applicationId;
			vm.openCommentBox = false;
			vm.isMyComment = function (comment) {
				return comment.createdBy && _.get(comment, 'createdBy.firstName').toLowerCase() === storageService.get('user.userDetails.firstName').toLowerCase() && _.get(comment, 'createdBy.lastName').toLowerCase() === storageService.get('user.userDetails.lastName').toLowerCase();
			};

			var initialize = function () {
				var commentsToReview = [];
				
				_.forEach(vm.comments, function (comment) {
					var myComment = vm.isMyComment(comment);
					if (!comment.reviewed) {
						if (myComment) {
							vm.hasOwnUnreviewedComments = true;
						} else {
							commentsToReview.push(comment);
						}
					}
				});

				if (commentsToReview.length && !vm.hideAddNewComment) {
					applicationService.reviewAppComments(vm.applicationId, commentsToReview);
				}

				vm.appCommentsStatus = 'success';
			};

			var isEligibleForComment = function () {
				// web service call to get eligibility
				return true;
			};

			vm.toggleCommentBox = function () {
				if (vm.hasOwnUnreviewedComments) {
					vm.displayCommentsModal = 'show';
				} else {
					vm.openCommentBox = false;
					if (isEligibleForComment()) {
						vm.openCommentBox = true;
					}
				}
			};
			
			var clearCommentBox = function () {
				vm.newComment = '';
			};

			vm.cancelComment = function () {
				clearCommentBox();
				vm.openCommentBox = false;
			};

			var createCommentDto = function (_comment) {
				return {
					applicationId : vm.applicationId,
					comment: _comment,
					createdBy: {
						firstName: userDetails.firstName,
						lastName : userDetails.lastName
					},
					dateCreated : new Date(),
					edAssistComment : utilService.isSupervisor() ? true : false
				};
			};

			vm.updateComment = function (comment) {
				if (!comment.applicationCommentId) {
					return;
				}
				applicationService.updateApplicationComment(comment).then(function (response) {
					vm.status = 'success';
				}, function (errorResponse) {
					vm.status = 'error';
				});
			};

			vm.submitComment = function () {
				var commentDto = createCommentDto(vm.newComment);
				applicationService.saveApplicationComments(commentDto).then(function (response) {
					vm.status = 'success';
					vm.comments.push(response.plain());
					clearCommentBox();
					vm.openCommentBox = false;
					vm.hasOwnUnreviewedComments = true;
				}, function (errorResponse) {
					vm.status = 'error';
				});
			};

			var removeCommentFromView = function (applicationCommentId) {
				_.remove(vm.comments, function (comment) {
					return comment.applicationCommentId === applicationCommentId;
				});
			};

			vm.deleteComment = function (comment) {
				applicationService.deleteApplicationComments(vm.applicationId, comment.applicationCommentId).then(function (response) {
					vm.status = 'success';
					vm.hasOwnUnreviewedComments = false;
					removeCommentFromView(comment.applicationCommentId);
				}, function (errorResponse) {
					vm.status = 'error';
				});
			};

			initialize();
		}
	};
}]);