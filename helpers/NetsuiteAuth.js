import crypto from 'crypto';

var NETSUITE_ACCOUNT_ID = '/**/'
var BASE_URL = 'https:///**/.restlets.api.netsuite.com/app/site/hosting/restlet.nl'
var HTTP_METHOD = 'GET'
var SCRIPT_ID = '/**/'
var OAUTH_VERSION = '1.0';
var SCRIPT_DEPLOYMENT_ID = '1'
var TOKEN_ID = "/**/"
var TOKEN_SECRET = "/**/"
var CONSUMER_KEY = "/**/"
var CONSUMER_SECRET = "/**/"
var SIGNATURE_METHOD = "HMAC-SHA1";
var text = "";
var length = 32;
var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
for (var i = 0; i < length; i++) {
	text += possible.charAt(Math.floor(Math.random() * possible.length));
}
var OAUTH_NONCE = text;
var TIME_STAMP = Math.round(+new Date() / 1000);

var data = '';
data = data + 'deploy=' + SCRIPT_DEPLOYMENT_ID + '&';
data = data + 'oauth_consumer_key=' + CONSUMER_KEY + '&';
data = data + 'oauth_nonce=' + OAUTH_NONCE + '&';
data = data + 'oauth_signature_method=' + SIGNATURE_METHOD + '&';
data = data + 'oauth_timestamp=' + TIME_STAMP + '&';
data = data + 'oauth_token=' + TOKEN_ID + '&';
data = data + 'oauth_version=' + OAUTH_VERSION + '&';
data = data + 'script=' + SCRIPT_ID;
var encodedData = encodeURIComponent(data);
var completeData = HTTP_METHOD + '&' + encodeURIComponent(BASE_URL) + '&' + encodedData;
var base64EncodedData = crypto.createHmac('sha1', CONSUMER_SECRET + '&' + TOKEN_SECRET).update(completeData).digest('base64')
var oauth_signature = encodeURIComponent(base64EncodedData);
var OAuth = 'OAuth oauth_signature="' + oauth_signature + '",';
OAuth = OAuth + 'oauth_version="1.0",';
OAuth = OAuth + 'oauth_nonce="' + OAUTH_NONCE + '",';
OAuth = OAuth + 'oauth_signature_method="HMAC-SHA1",';
OAuth = OAuth + 'oauth_consumer_key="' + CONSUMER_KEY + '",';
OAuth = OAuth + 'oauth_token="' + TOKEN_ID + '",';
OAuth = OAuth + 'oauth_timestamp="' + TIME_STAMP + '",';
OAuth = OAuth + 'realm="' + NETSUITE_ACCOUNT_ID + '"';

/**
 *
 * @param request GET|POST
 * @param url RESTLET
 * @param data JSON STRING
 */
const oauth = (request, url, data) => {

	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	myHeaders.append("Authorization", OAuth);
	var requestOptions = {
		method: request,
		headers: myHeaders,
		redirect: 'follow'
	};
	fetch("https://cors-minmyatoo.herokuapp.com/https:///**/.restlets.api.netsuite.com/app/site/hosting/restlet.nl?script=/**/&deploy=1", requestOptions)
		.then(response => {
			return response.json()
		})
		.then(result => {
			console.log(JSON.stringify(result))
			return result;
		})
		.catch(error => console.log('error', error));


	/*Fetch*/


}
export default oauth

