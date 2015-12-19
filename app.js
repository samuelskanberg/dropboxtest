$(document).ready(function(){
  console.log("Fooosa");

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
        client.signOut(null, function() {
          console.log("Totally loged out");
          $('#login_page').show();
          $('#logged_in_page').hide();
        });

        return false;
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
    var client = new Dropbox.Client({ key: "xatg1pwrwutb0xc" });

    client.authenticate(function(error, client) {
      if (error) {
        console.log("Error with first authenticate");
        console.log(error);
        return false;
      }

      console.log("First authenticate successfull");

      //console.log("Logged in");

      //$('#logout').click(function() {
      //  console.log("Trying to log out");
      //  client.signOut(null, function() {
      //    console.log("Totally loged out");
      //    $('#login_page').show();
      //    $('#logged_in_page').hide();
      //  });

      //  return false;
      //});

      //var credentials = client.credentials();
      //console.log(credentials);
      //$('#credentials').text("User id: "+credentials.uid);

      //// Show it
      //$('#login_page').hide();
      //$('#logged_in_page').show();

      //return false;
    });
  });
});
