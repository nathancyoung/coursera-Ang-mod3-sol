(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems',FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
    items: '=',
    onRemove: '&'
    },
    controller: NarrowItDownController,
    controllerAs: 'narrowIt',
  }
 return ddo;
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;

  //menu.Items = [{shortName: 'blah',description:"bleh"}];
  
  menu.doIt = function () {
//    console.log(menu.searchItem);
    var promise = MenuSearchService.getMatchedMenuItems(menu.searchItem);
    promise.then(function (response) {
      menu.found = JSON.parse(JSON.stringify(response));
      //console.log(menu.Items);
      return promise;
    }); // .then( function(response) {console.log(response.length)});
 };

menu.removeItem = function( itemIndex, arr) {
  arr.splice(itemIndex,1);
};

};


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchItem) {
    var promise = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    })
    .then( 
      function (response) {
      var url_response = response.data.menu_items;
      var ender = response.data.menu_items.length;
      var found = [];
      //console.log('inside service');
      //console.log(url_response);
      searchItem = searchItem || "";

      for (var i=0.0; i< ender; i++) {
         if (url_response[i].description.toLowerCase().indexOf(searchItem.toLowerCase())>=0) {
                found.push(url_response[i]);
         };
      };
     return found;
      });
    return promise;

    console.log("This is really great");

  };
};
})();
