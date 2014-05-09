var postsApp = angular.module('postsApp', ['PostsModel', 'ngRoute', 'ngTouch']);

// Index: http://localhost/views/events/index.html
postsApp.controller('IndexCtrl', function($scope, PostsRestangular) {

  // Fetch all objects from the local JSON (see app/models/posts.js)
  PostsRestangular.all('posts').getList().then(function(posts) {
    $scope.posts = posts;
  });

  // -- Native navigation
  steroids.view.navigationBar.show("TOT 0 - 1 ARS posts");
});

postsApp.filter('preview', ['$sce', function($sce) {
  return function(content, maxLength) {
    if (isNaN(maxLength))
      maxLength = 10;
    var end = "...";

    var modifiedContent = (content.length <= maxLength) ? content : String(content).substring(0, maxLength - end.length) + end;
    return $sce.trustAsHtml(modifiedContent);
  };
}]);
