namespace app.guest.home {

    export const namespace = 'app.guest.home';

    class HomeConfig {

        static $inject = ['stateHelperServiceProvider'];

        constructor(private stateHelperServiceProvider) {

            let state:global.IState = {
                url: '',
                views: {
                    "main@app.guest": {
                        controller: namespace + '.controller',
                        templateUrl: 'templates/app/guest/home/home.tpl.html'
                    }
                },
                resolve: /*@ngInject*/{

                },
                data: {
                    title: "Home",
                    role: 'public',
                    icon: 'home',
                    navigation: true
                }
            };

            stateHelperServiceProvider.addState(namespace, state);

        }

    }

    class HomeController {

        static $inject = [];

        constructor() {

        }

    }

    angular.module(namespace, [])
        .config(HomeConfig)
        .controller(namespace + '.controller', HomeController);

}