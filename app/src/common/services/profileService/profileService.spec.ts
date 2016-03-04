namespace common.services.profile {

    describe('Profile Service', () => {

        let profileService:ProfileService,
            $rootScope:ng.IRootScopeService,
            $q:ng.IQService
            ;

        beforeEach(()=> {

            module('app');

            inject((_$q_, _profileService_, _$rootScope_) => {

                if (!profileService) { //dont rebind, so each test gets the singleton
                    $q = _$q_;
                    profileService = _profileService_;
                    $rootScope = _$rootScope_;
                }
            });

        });

        afterEach(() => {
        });

        describe('Initialisation', () => {

            it('should be an injectable service', () => {

                expect(profileService).to.be.an('object');
            });

            //@todo remove this assertion when backend is hooked up
            it('should have a set of profiles mocked', () => {

                expect((<any>profileService).allProfiles).to.be.instanceOf(Array);
                expect((<any>profileService).allProfiles).to.have.length.greaterThan(0);
            });

        });

        describe('Profile retrieval', () => {


            it('should retrieve a list of profiles', () => {

                let profilesPromise = profileService.getProfiles();

                expect(profilesPromise).eventually.to.be.fulfilled;
                expect(profilesPromise).eventually.to.deep.equal((<any>profileService).allProfiles);

                $rootScope.$apply(); //flush the promise

            });

        });

        describe('Profile saving', () => {

            it('should be able to request the saving of profiles', () => {

                let profilesMock = common.models.UserMock.collection();

                let savePromise = profileService.saveProfiles(profilesMock);

                expect(savePromise).eventually.to.be.fulfilled;
                expect(savePromise).eventually.to.be.true;

                $rootScope.$apply(); //flush the promise

                expect(profileService.getProfiles()).eventually.to.deep.equal(profilesMock);

            });

        });


    });

}