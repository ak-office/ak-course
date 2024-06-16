// Define function to set the page title
function setPageTitle(channelData) {
  document.title = channelData.name;
}

// Fetch channels data and set the page title
fetchChannels(function(channels) {
  // Get channel ID from the URL
  var channelId = getParameterByName('id');
  // Find the channel data in the JSON
  var channelData = channels.find(channel => channel.id === channelId);

  if (channelData) {
    // Set the page title with the channel data
    setPageTitle(channelData);
  } else {
    console.error('Channel not found for ID:', channelId);
  }
});

// Function to get URL parameters
function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}


// Function to fetch JSON data
function fetchChannels(callback) {
  // Replace 'video.json' with the path to your JSON file
  fetch('video-2.json')
    .then(response => response.json())
    .then(data => callback(data))
    .catch(error => console.error('Error fetching JSON:', error));
}

// Define player setup function
function setupPlayer(channelData) {
  // Set up JWPlayer
  var playerSetup = {
    file: channelData.link, // Using link as file URL
    // Add your Extra jw Player codes here 

    "controls": true,
    "displaytitle": true,
    "displaydescription": true,
    "autostart": false,
    "mute": false,
    "image": "/assets/img/play-cover.jpg",
    "title": channelData.name,
    "description": channelData.description,

    skin: {
      name: "netflix"
    },
  };

  if (channelData.link.endsWith('.mpd')) {
    // Set up DRM for DASH with KeyId & key if available
    playerSetup.type = 'dash';

    // Check if Clear Key is available
    if (channelData.keyId && channelData.key) {
      playerSetup.drm = {
        clearkey: {
          keyId: channelData.keyId,
          key: channelData.key
        }
      };
    }
  } else if (channelData.link.endsWith('.m3u8')) {
    // Set up DRM for HLS with keys if available
    playerSetup.type = 'hls';

    // Check if Clear Key is available
    if (channelData.keyId && channelData.key) {
      playerSetup.drm = {
        clearkey: {
          keyId: channelData.keyId,
          key: channelData.key
        }
      };
    }
  } else {
    // Default to HLS without keys
    playerSetup.type = 'mp4';
  }

  jwplayer("jwplayerDiv").setup(playerSetup);
}

// Fetch channels data and set up the player
fetchChannels(function(channels) {
  // Get channel ID from the URL
  var channelId = getParameterByName('id');
  // Find the channel data in the JSON
  var channelData = channels.find(channel => channel.id === channelId);

  if (channelData) {
    // Set up the player with the channel data
    setupPlayer(channelData);
  } else {
    console.error('Channel not found for ID:', channelId);
  }


})

  .on('ready', function() {
    // Set poster image for video element to avoid black background for audio-only programs.
    var video = document.getElementById(this.id).getElementsByTagName('video')[0];
    if (video) video.setAttribute('poster', this.getConfig().image);

  });

