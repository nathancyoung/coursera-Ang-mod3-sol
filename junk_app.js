(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService',MenuSearchService);

//.directive('foundItems','FoundItemsDirective');

NarrowItDownController.$inject['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
     // MenuSearchService.getMatchedMenuItems(narrowIt.searchTerm);
     console.log(narrowIt.searchTerm)
};

//function FoundItemsDirective() {
//  var ddo = {
//
//  };
//  return ddo;

// };


function MenuSearchService() {
  var service = this;

  //service.getMatchedMenuItems = function(searchTerm) {

  	// console.log(searchTerm);

    // $http({
    //   method: "GET",
    //   url: "https://davids-restaurant.herokuapp.com/menu_items.json"
     //     }).then(function (result) {
     //           console.log(result);
     //        }, function(error) {
      //       	console.log(eror)
       //      }
       //      );
  };


};





})();