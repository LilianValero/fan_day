var eventsApp = angular.module('eventsApp', ['EventsModel', 'hmTouchevents']);


// Index: http://localhost/views/events/index.html

eventsApp.controller('IndexCtrl', function ($scope, EventsRestangular) {

  // Helper function for opening new webviews
  $scope.open = function(id) {
    webView = new steroids.views.WebView("/views/events/show.html?id="+id);
    steroids.layers.push(webView);
  };

  // Fetch all objects from the local JSON (see app/models/events.js)
  $scope.eventss = EventsRestangular.all('events').getList();

  // -- Native navigation
  steroids.view.navigationBar.show("Events index");

});


// Show: http://localhost/views/events/show.html?id=<id>

eventsApp.controller('ShowCtrl', function ($scope, $filter, EventsRestangular) {

  // Fetch all objects from the local JSON (see app/models/events.js)
  EventsRestangular.all('events').getList().then( function(eventss) {
    // Then select the one based on the view's id query parameter
    $scope.events = $filter('filter')(eventss, {events_id: steroids.view.params['id']})[0];
  });

  // -- Native navigation
  steroids.view.navigationBar.show("Events: " + steroids.view.params.id );

});
