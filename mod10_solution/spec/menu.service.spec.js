describe('MenuService', function () {
    var menuService;
    var $httpBackend;
    var ApiPath

    beforeEach(function () {
        module('common');

        inject(function ($injector) {
            menuService = $injector.get("MenuService");
            $httpBackend = $injector.get("$httpBackend");
            ApiPath = $injector.get("ApiPath");
        });
    });


    it('should return true if menu item exists', function () {
        const categoryShortName = 'A';
        const menuNumber = 4;
        const shortName = categoryShortName + menuNumber;

        $httpBackend.expectGET(ApiPath + '/menu_items/' + categoryShortName + '/menu_items/' + (menuNumber - 1) + '.json')
            .respond(200, {});

        menuService.fetchMenuItem(shortName).then(function (result) {
            expect(result).toEqual(jasmine.any(Object));
        });

        $httpBackend.flush();
    });

    it('should return false if menu item does not exist', function () {
        const categoryShortName = 'A';
        const menuNumber = 99;
        const shortName = categoryShortName + menuNumber;

        $httpBackend.expectGET(ApiPath + '/menu_items/' + categoryShortName + '/menu_items/' + (menuNumber - 1) + '.json')
            .respond(200, null);

        menuService.fetchMenuItem(shortName).then(function (result) {
            expect(result).toBe(null);
        });

        $httpBackend.flush();
    });
});
