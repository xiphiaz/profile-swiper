namespace common.directives.profileSwiper {

    interface TestScope extends IProfileSwiperScope {
        profiles: common.models.User[];
        ProfileSwiperController: ProfileSwiperController;
    }

    describe('Profile Swiper directive', () => {

        let $compile:ng.ICompileService,
            $rootScope:ng.IRootScopeService,
            directiveScope:TestScope,
            compiledElement:ng.IAugmentedJQuery,
            directiveController:ProfileSwiperController,
            $q:ng.IQService,
            profilesMock = common.models.UserMock.collection(10, {
                approved: null,
            })
        ;

        beforeEach(()=> {

            module('app');

            inject((_$compile_, _$rootScope_, _$q_) => {
                $compile = _$compile_;
                $rootScope = _$rootScope_;
                $q = _$q_;
            });

            //only initialise the directive once to speed up the testing
            if (!directiveController) {

                directiveScope = <TestScope>$rootScope.$new();

                directiveScope.profiles = profilesMock;

                compiledElement = $compile(`
                    <profile-swiper
                        profiles="profiles">
                    </profile-swiper>
                `)(directiveScope);

                $rootScope.$digest();

                directiveController = (<TestScope>compiledElement.isolateScope()).ProfileSwiperController;

            }

        });

        it('should initialise the directive', () => {

            expect($(compiledElement).hasClass('profile-swiper')).to.be.true;
            expect(directiveController.profiles).to.have.length.greaterThan(0);

            let reviewedProfiles = _.filter(directiveController.profiles, (profile:common.models.User) => _.isBoolean(profile.approved));

            console.log(_.pluck(directiveController.profiles, 'approved'));

            expect(reviewedProfiles).to.be.empty;
        });

        it('should be able to approve a profile', () => {

            let profileToApprove = _.first(directiveController.profiles);

            directiveController.approve(profileToApprove);

            directiveScope.$apply();

            let approvedProfiles = _.filter(directiveController.profiles, {approved:true});

            expect(approvedProfiles).to.have.length(1);
            expect(approvedProfiles[0]).to.deep.equal(profileToApprove);

        });

        it('should be able to reject a profile', () => {

            let profileToApprove = _.last(directiveController.profiles);

            directiveController.reject(profileToApprove);

            directiveScope.$apply();

            let rejectedProfiles = _.filter(directiveController.profiles, {approved:false});

            expect(rejectedProfiles).to.have.length(1);
            expect(rejectedProfiles[0]).to.deep.equal(profileToApprove);

        });


    });

}