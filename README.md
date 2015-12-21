# Dropbox test

This is a simple app that will authenticate via dropbox and then list and create
files. All with javascript using
[dropbox.js](https://github.com/dropbox/dropbox-js).

Visit the page on the [github
page](https://samuelskanberg.github.io/dropboxtest/) or deploy it locally and
visit the page on [localhost](http://localhost/demos/dropboxtest/).  (Must be
deployed exactly as http://localhost/demos/dropboxtest/ since that is the url
specified in the Dropbox app.

## Configure

1. Create an app key for dropbox
2. Enter that key in app.js when calling new
`Dropbox.Client({ key: "xatg1pwrwutb0xc" })`
