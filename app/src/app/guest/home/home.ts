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
                    profiles: (profileService:common.services.profile.ProfileService):ng.IPromise<common.models.User[]> => {
                        return profileService.getProfiles();
                    },
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

        static $inject = ['profiles'];

        constructor(public profiles:common.models.User[]) {
            console.log(profiles);
        }

    }

    angular.module(namespace, [])
        .config(HomeConfig)
        .controller(namespace + '.controller', HomeController);

}