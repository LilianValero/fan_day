var postsApp = angular.module('postsApp', ['PostsModel', 'hmTouchevents']);

// Index: http://localhost/views/events/index.html
postsApp.controller('IndexCtrl', function($scope, PostsRestangular) {

  // Fetch all objects from the local JSON (see app/models/events.js)
  $scope.posts = PostsRestangular.all('posts').getList();

  // -- Native navigation
  steroids.view.navigationBar.show("TOT 0 - 1 ARS posts");
});

postsApp.filter('preview', function () {
    return function (text, length, end) {
        if (isNaN(length))
            length = 10;

        if (end === undefined)
            end = "...";

        if (text.length <= length || text.length - end.length <= length) {
            return text;
        }
        else {
            return String(text).substring(0, length-end.length) + end;
        }

    };
});
