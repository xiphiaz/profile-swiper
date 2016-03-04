namespace common.services.profile {

    export const namespace = 'common.services.profile';

    export class ProfileService {

        private allProfiles:common.models.User[];

        static $inject:string[] = ['$q'];
        constructor(private $q:ng.IQService) {
            this.allProfiles = common.models.UserMock.collection(15, {
                approved: null,
            });
        }

        /**
         * Retrieve all profile models
         * @returns {IPromise<common.models.User[]>}
         */
        public getProfiles():ng.IPromise<common.models.User[]>{
            return this.$q.when(this.allProfiles); //@todo hook up to backend
        }

        /**
         * Save profile models
         * @param profiles
         * @returns {IPromise<boolean>}
         */
        public saveProfiles(profiles:common.models.User[]):ng.IPromise<boolean> {

            return this.$q.when(profiles) //@todo save profiles to backend
                .then((savedProfiles) => {
                    this.allProfiles = savedProfiles;
                    return true;
                });
        }


    }

    angular.module(namespace, [])
        .service('profileService', ProfileService);

}



