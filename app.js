(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;

  var promise = MenuSearchService.getMatchedMenuItems(menu.searchItem);

  menu.doIt = function () {
//    console.log(menu.searchItem);
    promise.then(function (response) {
      var url_response = response.data.menu_items;
      var ender = response.data.menu_items.length;
      console.log('length', ender);
      menu.foundItems = [];

      for (var i=0.0; i< ender; i++) {
         if (url_response[i].description.toLowerCase().indexOf(menu.searchItem.toLowerCase())>=0) {
              menu.foundItems.push(url_response[i]);
         };
      };
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });

  };


}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchItem) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });
    console.log("This is really great",searchItem);
    return response;
  };



}

})();
