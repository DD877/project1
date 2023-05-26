sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'whitelistui/test/integration/FirstJourney',
		'whitelistui/test/integration/pages/whitelistsList',
		'whitelistui/test/integration/pages/whitelistsObjectPage'
    ],
    function(JourneyRunner, opaJourney, whitelistsList, whitelistsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('whitelistui') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThewhitelistsList: whitelistsList,
					onThewhitelistsObjectPage: whitelistsObjectPage
                }
            },
            opaJourney.run
        );
    }
);