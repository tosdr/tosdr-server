Server that can save comments and serve the files from tosdr.org. To use,
you need to set up the server, and configure the tosdr.org files.

### Configuring the tosdr.org files
Checkout the code from the [https://github.com/Vinnl/tosdr.org.git Vinnl/tosdr.org repo],
Then, open the file `js/comment.js` and modify the location of the server's
Persona assertion service -- by default, this is `http://localhost:8000/persona`.

### Configuring the server
Checkout the code, then run `npm install`. Then open the file `package.json`.
First of all, specify where you have checked out the tosdr.org files in the
`tosdr-files` variable, relative to the tosdr-server repository. By default,
the files repository is expected to be at the same level as the server's.

Then, configure where the server will be run, so Persona can verify that the
request came from the designated source. By default, this is `http://localhost:8000`.
Set the verifyPath and logoutPath corresponding to the assertion service URL
configured for the tosdr.org files, appended with /verify and /logout,
respectively.

Now run `npm install` to install, then `node ./app/server.js` to start the
server. Browse to `http://localhost:8000/comments.html` to submit a comment.
They will appear in the data/comments folder in the server directory.
