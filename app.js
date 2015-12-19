$(document).ready(function(){
  console.log("Fooosa");

  var client = new Dropbox.Client({ key: "xatg1pwrwutb0xc" });

  var hash = window.location.hash.substring(1);
  var arguments = hash.split("&");
  var argumentDictionary = {};

  arguments.forEach(function(element, index, array) {
    var keyValueArray = element.split("=");
    argumentDictionary[keyValueArray[0]] = keyValueArray[1];
  });

  console.log("dict");
  console.log(argumentDictionary);

  if (argumentDictionary["access_token"]) {
    console.log("Came back from a redirect!");
    window.location.hash = "";

    var client = new Dropbox.Client({
      key: "xatg1pwrwutb0xc",
      token: argumentDictionary["access_token"],
      uid: argumentDictionary["uid"]
    });

    client.authenticate(function(error, client) {
      if (error) {
        console.log("Error with second authenticate");
        console.log(error);
        return false;
      }

      console.log("Logged in");

      $('#logout').click(function() {
        console.log("Trying to log out");
        client.signOut(null, function(error) {
          if (error) {
            console.log("Logout failed:");
            console.log(error);
            return ;
          }
          client.reset();
          console.log("Totally loged out");
          $('#login_page').show();
          $('#logged_in_page').hide();
        });

        return false;
      });

      $('#list_files').click(function() {
        console.log("Readdir");
        client.readdir("/", {removed: false}, function(error, list, filestat, filestats) {
          if (error) {
            console.log("Error reading dir");
            console.log(error);
            return ;
          }
          $('#file_list').empty();
          list.forEach(function(item) {
            $('#file_list').append("<li>"+item+"</li>");
          });
        });
      });

      $("#create_file").click(function() {
        var filename = $('#filename').val();
        console.log("Creating file: "+filename);
        if (filename.length == 0) {
          console.log("Filename can't be empty");
          return ;
        }

        client.stat(filename, {deleted: false}, function(error, filestat, filestats) {
          // Should produce an error since we don't want it to be found
          if (!error) {
            console.log("File exists")
            return;
          }
          client.writeFile(filename, "test", {noOverwrite: true}, function(error, stat) {
            if (error) {
              console.log("Error occured when creating file");
              console.log(error);
              return ;
            }
            console.log("File successfully created");
          });
        });
      });

      var credentials = client.credentials();
      console.log(credentials);
      $('#credentials').text("User id: "+credentials.uid);

      // Show it
      $('#login_page').hide();
      $('#logged_in_page').show();

      return false;
    });


  } else {
    console.log("No access token found in query params");
  }

  $('#login').click(function() {

    client.authenticate(function(error, client) {
      if (error) {
        console.log("Error with first authenticate");
        console.log(error);
        return false;
      }

      console.log("First authenticate successfull");

      if (client.isAuthenticated()) {
        console.log("This client is logged in");
        var uid = client.dropboxUid();
        console.log("uid: "+uid);
      } else {
        console.log("Not authenticated");
      }
    });
  });

});
