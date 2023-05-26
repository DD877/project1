const cdsapi = require("@sapmentors/cds-scp-api");
const cfenv = require('cfenv');
// const rp = require('request-promise');
const xsenv = require('@sap/xsenv');
const axios = require('axios');
xsenv.loadEnv();
// const destination = xsenv.getServices({ destination: { tag: 'destination' } }).dest;

module.exports = async function (data) {
    xsenv.loadEnv();
    console.log("Preparing mail content");
    const mailcontent = {
        message: {
            subject: data.subject,
            body: {
                contentType: data.type,
                content: data.body
            },
            toRecipients: [
                {
                    emailAddress: {
                        address: data.recipient
                    }
                }
            ],
            from: {
                emailAddress: {
                    address: data.sender
                }
            }
        },
        saveToSentItems: 'false'
    };
    console.log("Adding attachments");
    if (data.attachments) {
        var objlist = [];
        const attachmententries = data.attachments.entries();

        for (let i of attachmententries) {
            objlist.push({'@odata.type': "#microsoft.graph.fileAttachment", name: i[1].name, contentType: i[1].contentType, contentBytes: i[1].contentBytes});
        }
        Object.assign(mailcontent.message, {attachments: objlist});
    }
    // const destination = xsenv.getServices({ destination: { tag: 'destination' } }).destination;
    // const credentials = {
    //     url: destination.url,
    //     uri: destination.uri,
    //     clientid: destination.clientid,
    //     clientsecret: destination.clientsecret
    // };
    const credentials = {
        url: "https://d5bbcca0trial.authentication.us10.hana.ondemand.com",
        uri: "https://destination-configuration.cfapps.us10.hana.ondemand.com",
        clientid: "sb-clonef5d3b64eb97f49d9a878629874c37de9!b119747|destination-xsappname!b62",
        clientsecret: "195ec5bd-2634-4c87-abc6-123f57d8bdf0$A3FcPEyiSPsZ_17s25E5BuUfJ3rnb_srA60CKQ_OIPs="
    };
    var token = `${
        credentials.clientid
    }:${
        credentials.clientsecret
    }`;
    var encodedToken = Buffer.from(token).toString('base64');
    var config = {
            method: 'get',
            url: credentials.url + '/oauth/token?grant_type=client_credentials',
            headers: {
                'Authorization': 'Basic ' + encodedToken
            }
        }
        axios(config).then(function (response) {
            var auth_data = response.data
            const session_url1 = credentials.uri + '/destination-configuration/v1/destinations/Microsoft_Graph_Mail_API';
            var config1 = {
                method: 'get',
                url: session_url1,
                headers: {
                    'Authorization': auth_data.token_type + ' ' + auth_data.access_token
                }
            }
            axios(config1).then(function (response) {
                const session_url2 = response.data.destinationConfiguration.URL + `/v1.0/users/${
                    data.sender
                }/sendmail`;
                var config2 = {
                    method: 'get',
                    url: session_url2,
                    headers: {
                        'Authorization': response.data.authTokens[0].type + ' ' + response.data.authTokens[0].value
                    },
                    data: mailcontent
                }
                axios(config2).then(function (response) {
                    console.log("Preparing to send mail");
                    return response.data
                }).catch(function (error) {
                    console.log(error);
                })
            }).catch(function (error) {
                console.log(error);
            })
        }).catch(function (error) {
            console.log(error);
        })
        // async function getDestinations() {
        //     const baseUrl = 'https://api.cf.us10-001.hana.ondemand.com';
        //     // Replace with your BTP endpoint URL
        //     // Set up the Axios instance
        //     const instance = axios.create({
        //         baseURL: baseUrl,
        //         headers: {
        //             'Authorization': 'Bearer <ACCESS_TOKEN>',
        //             // Replace with your access token
        //             'Content-Type': 'application/json'
        //         }
        //     });

        //     try { // Make the API call
        //         const response = await instance.get('/destination-configuration/v1/destinations');
        //         // Handle the response
        //         console.log('Destinations:', response.data.destinations);
        //     } catch (error) {
        //         console.error('Error retrieving destinations:', error);
        //     }
        // }
        // // Call the function
        // getDestinations();
        // // -----------------------------
        // const axios = require('axios');
        // async function callMicrosoftGraphAPI() {
        //     const accessToken = '<ACCESS_TOKEN>'; // Replace with your valid access token for Microsoft Graph API
        //     try { // Make the API call
        //         const response = await axios.get('https://graph.microsoft.com/v1.0/<API_ENDPOINT>', {
        //             headers: {
        //                 'Authorization': `Bearer ${accessToken}`,
        //                 'Content-Type': 'application/json'
        //             }
        //         });
        //         // Handle the response
        //         console.log('Response:', response.data);
        //     } catch (error) {
        //         console.error('Error calling Microsoft Graph API:', error.response.data.error);
        //     }
        // }
        // Call the function
        // callMicrosoftGraphAPI();
        // -----------------------------


        // console.log("Preparing mail content");
        // const mailcontent = {
        //     message: {
        //         subject: data.subject,
        //         body: {
        //             contentType: data.type,
        //             content: data.body
        //         },
        //         toRecipients: [
        //             {
        //                 emailAddress: {
        //                     address: data.recipient
        //                 }
        //             }
        //         ],
        //         from: {
        //             emailAddress: {
        //                 address: data.sender
        //             }
        //         }
        //     },
        //     saveToSentItems: 'false'
        // };
        // const readFunction = async (req) => {
        //     let destination = "Microsoft_Graph_Mail_API";
        //     const url = `/v1.0/users/${data.sender}/sendmail`;
        //     const service = await cdsapi.connect.to(destination);
        //     const graphUser = await service.run({
        //       url: url,
        //               method: "post",
        //           headers: {
        //               'content-type': 'application/json'
        //           },
        //           data: mailcontent,
        //     })

        //     let mail = graphUser.value.map(graph_user => {
        //     //   var user = {}

        //     //   return user
        //     })
        //     return mail
        // }


        // Add attachment

        // console.log("Adding attachments");
        // if (data.attachments) {
        //     var objlist = [];
        //     const attachmententries = data.attachments.entries();

        //     for (let i of attachmententries) {
        //         objlist.push({
        //             '@odata.type': "#microsoft.graph.fileAttachment",
        //             name: i[1].name,
        //             contentType: i[1].contentType,
        //             contentBytes: i[1].contentBytes
        //         });
        //     }
        //     Object.assign(mailcontent.message, { attachments: objlist });
        // }

        // console.log("Preparing to send mail");

        // req.on('sendmail', 'mailrequests', readFunction)

        //    console.log("Preparing to send mail");
        // const service = await cdsapi.connect.to("Microsoft_Graph_Mail_API");
        // let destination = "Microsoft_Graph_Mail_API";
        // const url = `/v1.0/users/${data.sender}/sendmail`;
        // const service = await cdsapi.connect.to(Microsoft_Graph_Mail_API);
        // return await axios.run({
        //     url: url,
        //     method: "post",
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     data: mailcontent,
        // })


    }
