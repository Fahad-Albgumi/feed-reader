/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.*/

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has url', function () {
            allFeeds.forEach(function(entry) {
                expect(entry.url).toBeDefined();
                expect(entry.url.length).toBeGreaterThan(0);
            });
        });

        /* this is a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('has name', function () {
            allFeeds.forEach(function(entry) {
                expect(entry.name).toBeDefined();
                expect(entry.name.length).toBeGreaterThan(0);
            });
        });
    });


    // another test suite for menu testing

    describe('The menu', function(){

    
        /* This test ensures the menu element is
         * hidden by default.*/
        it('menu hidden', function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
         /* This is a test that ensures the menu changes
          * visibility when the menu icon is clicked. */
         it('is menu visible when clicked and hidden when clicked again', function(){
            $('a.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('a.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    describe('Initial Entries', function(){

        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.*/
        beforeEach(function(finish){
            loadFeed(0, finish);
        });

        it("is present", function(){
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function(){
        var oldFeed;
        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.*/
        beforeEach(function(done) {
            loadFeed(0, function(){
                oldFeed = $('.feed').html();
                loadFeed(1, done);
            });
        });

        it('is diff from old', function () {
            expect($('.feed').html()).not.toBe(oldFeed);
        });

    });
}());
