/**
 * Created by Ankit on 10/31/2016.
 */
(function () {
    angular
        .module("sortableDirectives", [])
        .directive("sortable", sortable);

    function sortable($http) {
        console.log("hello from sortable");
        var container = $(".sortable");
        container.sortable({
            axis: 'y'
            });
        // now we need to overwrite the widgets in the server with the new order of the widgets which
        // is represented by container.


    }
})();