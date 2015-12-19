$(document).ready(function(){
  console.log("Fooosa");

  $('#login').click(function() {
    var client = new Dropbox.Client({ key: "xatg1pwrwutb0xc" });

    client.authenticate(function(error, client) {
      if (error) {
        console.log("Super error");
        console.log(error);
        return ;
      }

      console.log("Logged in");

      $('#logout').click(function() {
        console.log("Trying to log out");
        client.signOut(null, function() {
          console.log("Totally loged out");
          $('#login_page').show();
          $('#logged_in_page').hide();
        });
      });

      var credentials = client.credentials();
      console.log(credentials);
      $('#credentials').text("User id: "+credentials.uid);

      // Show it
      $('#login_page').hide();
      $('#logged_in_page').show();
    });
  });
});
