namespace common.filters {

    export const namespace = 'common.filters';

    angular.module(namespace, [
        namespace + '.capitalize',
        namespace + '.momentFilters',
    ]);

}