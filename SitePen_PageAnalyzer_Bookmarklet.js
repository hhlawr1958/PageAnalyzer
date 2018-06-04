/*
	TO DO: Write a bookmarklet that analyzes the current page and determines the frequency of word usage
	Created By: Horace Lawrence
*/
(function(){
  /*
	Make the bookmarklet self-updating.
  */
  var jsCode = document.createElement('script'); 
      jsCode.setAttribute('src', 'http://path/to/external/SitePen_PageAnalyzer_Bookmarklet.js');                  
      document.body.appendChild(jsCode);
  // End of self-updating code
  //
  
})();
