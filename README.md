 
Single-page web application using the popular Reactjs library. 
Accesses remote web services directly from a browser.
Allow the user to search, add-to and display documents in a documents collection.
Three main tabs: 
 
Search Tab: 

An input widget where the user can type in the search terms into this input widget.
When the input widget looses focus, the application uses the underlying web services to search the document collection for the search terms.
An error message is displayed if there are no matching results.
If there are matching results, then up to 5 results will be displayed with the following format:
Document name element followed by the text of the lines from the document which contain the search terms. 
Clicking on a document name will switch the app over to the Content Tab displaying the contents of the document corresponding to the clicked-on document name.

Add Tab:

This tab displays a file selection widget. When the user selects a file from their local computer, the contents of that file will be uploaded to the document collection with the name of the newly added document set to the basename of the local file with any .txt extension removed.
A successful upload will result in the app switching over to the Content Tab displaying the contents of the uploaded document.

Content Tab:

This tab displays the name and contents of a document.
