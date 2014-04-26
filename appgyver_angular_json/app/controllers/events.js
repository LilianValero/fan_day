var eventsApp = angular.module('eventsApp', ['EventsModel', 'hmTouchevents']);


// Index: http://localhost/views/events/index.html

eventsApp.controller('IndexCtrl', function ($scope, EventsRestangular) {

  // Helper function for opening new webviews
  $scope.open = function(id) {
    webView = new steroids.views.WebView("/views/events/show.html?id="+id);
    steroids.layers.push(webView);
  };

  // Fetch all objects from the local JSON (see app/models/events.js)
  $scope.events = EventsRestangular.all('events').getList();

  // -- Native navigation
  steroids.view.navigationBar.show("TOT 0 - 1 ARS");

});


// Show: http://localhost/views/events/show.html?id=<id>

eventsApp.controller('ShowCtrl', function ($scope, $filter, EventsRestangular) {

  // Fetch all objects from the local JSON (see app/models/events.js)
  EventsRestangular.all('events').getList().then(function(events) {
    // Then select the one based on the view's id query parameter
    $scope.event = $filter('filter')(events, {event_id: steroids.view.params['id']})[0];
  });

  // -- Native navigation
  steroids.view.navigationBar.show("Event: " + steroids.view.params.id );

});
