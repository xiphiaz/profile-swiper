namespace common.directives.profileSwiper {

    export const namespace = 'common.directives.profileSwiper';

    export interface IProfileSwiperScope extends ng.IScope{
        profiles:common.models.User[];
    }

    export class ProfileSwiperController {

        public profiles:common.models.User[];

        static $inject = ['profileService'];

        constructor(private profileService:common.services.profile.ProfileService) {
        }

        public approve(profile:common.models.User):void {
            profile.approved = true;
        }

        public reject(profile:common.models.User):void {
            profile.approved = false;
        }

    }

    class ProfileSwiperDirective implements ng.IDirective {

        public restrict = 'E';
        public require = ['profileSwiper'];
        public templateUrl = 'templates/common/directives/profileSwiper/profileSwiper.tpl.html';
        public replace = true;
        public scope = {
            profiles: '=',
        };

        public controllerAs = 'ProfileSwiperController';
        public controller = ProfileSwiperController;
        public bindToController = true;

        constructor() {
        }

        public link = ($scope:IProfileSwiperScope, $element:ng.IAugmentedJQuery, $attrs:ng.IAttributes, $controllers:[ProfileSwiperController]) => {

            let directiveController = $controllers[0];

        };

        static factory():ng.IDirectiveFactory {
            const directive = () => new ProfileSwiperDirective();
            return directive;
        }
    }

    angular.module(namespace, [])
        .directive('profileSwiper', ProfileSwiperDirective.factory())
    ;

}