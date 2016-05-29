//var channelId = 'UClOf1XXinvZsy4wKPAkro2A';
var channelId ;
// After the API loads, call a function to get the uploads playlist ID.
function handleAPILoaded() {
  requestPlaylist();
}

// Call the Data API to retrieve the playlist ID that uniquely identifies the
// list of videos uploaded to the currently authenticated user's channel.
function requestPlaylist() {
  var request = gapi.client.youtube.playlists.list({
    channelId : channelId,
    part: 'contentDetails',
    maxResults: 50
  });
  request.execute(function(response) {
    console.log(response);
    var playlistArr = response.result.items;
    for(var i = 0 ; i < playlistArr.length ; i++){
        var item = playlistArr[i];
        var playlistId = item.id;
        requestVideoPlaylist(playlistId);
    }
    
  });
}


// Retrieve the list of videos in the specified playlist.
function requestVideoPlaylist(playlistId) {

  var requestOptions = {
    playlistId: playlistId,
    part: 'snippet',
    maxResults: 50
  };
  var request = gapi.client.youtube.playlistItems.list(requestOptions);
  request.execute(function(response) {
    var playlistItems = response.result.items;
    if (playlistItems) {
      var url = '/video/addVideosFromPlaylist' ;
        var playlistVideoArr = [];
        var urlBase = 'https://www.youtube.com/watch?'
      $.each(playlistItems, function(index, item) {  
         var videoModel = {};
          videoModel.videoId = item.snippet.resourceId.videoId;
          videoModel.title = item.snippet.title;
          videoModel.publishedTime = item.snippet.publishedAt;
          videoModel.playlistId = item.snippet.playlistId;
          videoModel.channelId = item.snippet.channelId;
          videoModel.source = 'youtube';
          videoModel.watchTime=0;
          videoModel.likeTime=0;
          videoModel.dislikeTime=0;
          videoModel.url='https://www.youtube.com/embed/'+videoModel.videoId;
          videoModel.urlFull = urlBase + 'v=' + videoModel.videoId +'&list=' + videoModel.playlistId;
        playlistVideoArr.push(videoModel);
        displaySaveResult(videoModel);
      });
        var serverData = {data : playlistVideoArr};
        Ajax.post(url,serverData);
    } else {
      $('#video-container').html('Sorry you have no uploaded videos');
    }
  });
}

//save result to mongodb, also display title and video id
function displaySaveResult(videoModel) {
  var title = videoModel.title;
  var videoId = videoModel.videoId;
  $('#video-container').append('<p>' + title + ' - ' + videoId + '</p>');
}




$(function(){
    
    $('#submitPlaylistForm').click(function(){
       channelId = $('#playlistForm').find('input[name="channel"]').val();
        if(channelId){
           googleApiClientReady() ;
        }
        
    });
});
