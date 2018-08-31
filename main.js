// Client ID and API key from the Developer Console
const CLIENT_ID = '464167849771-lgr03mpfpu72b1calpgupvblr48eq7km.apps.googleusercontent.com';

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];

// Authorization scopes required by the API. If using multiple scopes,
// separated them with spaces.
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

const authorizeButton = document.getElementById('authorize-button');
const signoutButton = document.getElementById('signout-button');
const content=document.getElementById('content');
const channelForm=document.getElementById('channel-form');
const channelInput=document.getElementById('channel-input');
const videoContainer=document.getElementById('video-container');
const defaultChannel='GoogleDevelopers';
// const channelData=document.getElementById('channel-data');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    discoveryDocs: DISCOVERY_DOCS,
    clientId: CLIENT_ID,
    scope: SCOPES
  }).then(function () {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    content.style.display='block';
    videoContainer.style.display='block';
    getChannel(defaultChannel);
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
    videoContainer.style.display='none';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append text to a pre element in the body, adding the given message
 * to a text node in that element. Used to display info from API response.
 *
 * @param {string} message Text to be placed in pre element.
 */
// function appendPre(message) {
//   var pre = document.getElementById('content');
//   var textContent = document.createTextNode(message + '\n');
//   pre.appendChild(textContent);
// }

/**
 * Print files.
 */
function getChannel(defaultChannel) {
  gapi.client.youtube.channels.list({
    'part': 'snippet,contentDetails,statistics',
    'forUsername': defaultChannel
  }).then(response=> {
      console.log(response);
      const channel=response.result.item[0];
      console.log(channel);
    // var channel = response.result.items[0];
    // appendPre('This channel\'s ID is ' + channel.id + '. ' +
    //           'Its title is \'' + channel.snippet.title + ', ' +
    //           'and it has ' + channel.statistics.viewCount + ' views.');
  }).catch(err=>{
      alert(err);
  });
}
