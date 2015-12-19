$(document).ready(function(){
  console.log("Fooosa");

  $('#login').click(function() {
    console.log("Clicked");

    var client = new Dropbox.Client({ key: "xatg1pwrwutb0xc" });


    client.authenticate(function(error, client) {
      if (error) {
        // Replace with a call to your own error-handling code.
        //
        // Don't forget to return from the callback, so you don't execute the code
        // that assumes everything went well.
        console.log("Super error");
        return showError(error);
      }

      console.log("Kind of worked")

      // Replace with a call to your own application code.
      //
      // The user authorized your app, and everything went well.
      // client is a Dropbox.Client instance that you can use to make API calls.
      //doSomethingCool(client);
    });

  });

});
