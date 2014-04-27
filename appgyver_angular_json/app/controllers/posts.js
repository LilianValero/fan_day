var postsApp = angular.module('postsApp', ['PostsModel', 'hmTouchevents']);

// Index: http://localhost/views/events/index.html
postsApp.controller('IndexCtrl', function($scope, PostsRestangular) {

  // Fetch all objects from the local JSON (see app/models/events.js)
  $scope.posts = PostsRestangular.all('posts').getList();

  // -- Native navigation
  steroids.view.navigationBar.show("TOT 0 - 1 ARS posts");
});
