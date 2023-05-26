sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'mailserviceui/test/integration/FirstJourney',
		'mailserviceui/test/integration/pages/mailrequestsList',
		'mailserviceui/test/integration/pages/mailrequestsObjectPage'
    ],
    function(JourneyRunner, opaJourney, mailrequestsList, mailrequestsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('mailserviceui') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThemailrequestsList: mailrequestsList,
					onThemailrequestsObjectPage: mailrequestsObjectPage
                }
            },
            opaJourney.run
        );
    }
);