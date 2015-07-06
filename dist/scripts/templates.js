angular.module('mainApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/home.html',
    "<h3>Welcome to the home pages!!!</h3>"
  );


  $templateCache.put('templates/messages.html',
    "<h3>Welcome to the message sections !!!</h3>"
  );


  $templateCache.put('templates/profiles.html',
    "<h3>Welcome to the profile page!!!</h3>"
  );

}]);
