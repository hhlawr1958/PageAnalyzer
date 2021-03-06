/*
	TO DO: Write a bookmarklet that analyzes the current page and determines the frequency of word usage
	Created By: Horace Lawrence
*/
(function() {
    "use strict";
    /*
	Make the bookmarklet self-updating.
  */
    var jsCode = document.createElement('script');
    jsCode.setAttribute('src', 'https://github.com/hhlawr1958/PageAnalyzer/PageAnalyzer_Bookmarklet.js');
    document.body.appendChild(jsCode);
    /* End of self-updating code*/

    /*
	Assumptions and Notes:
	(1) document.body.innerText does not work in Firefox. I didn't have time to check what works with other browsers apart from Chrome. 
	    Needed to do browser-checking to make this more robust.
	(2) Calling the function getWordsOnPage would return a Map with all the words and a count of the frequency of use.
	(3) Pass in an integer for the length of the words to ignore.
  */
    function getWordsOnPage(wordLenToIgnore = 0) {

        var words = new Map(),
            wordCount = 0,
            word = '',
            wordsOnPage = getPlainText().split(/\s/).filter(function(txt) {

                word = /\S/.test(txt);

                if (word && txt.length > wordLenToIgnore) {
                    if (words.has(txt)) {
                        wordCount = words.get(txt) + 1;
                        words.set(txt, wordCount);
                    } else {
                        words.set(txt, 1);
                    }
                }
            });
        return words;
    }

    function mapSort(mapObj, type = 'key', sortDir = 'asc') {

        var mapArr = mapToArray(mapObj),
            sortedMap = new Map();

        if (type === 'key' && sortDir === 'asc') {
            mapArr.sort((a, b) => {
                if (a.key < b.key) {
                    return -1;
                } else if (a.key > b.key) {
                    return 1;
                } else {
                    return 0;
                }
            });
        } else if (type === 'key' && sortDir === 'desc') {
            mapArr.sort((a, b) => {
                if (a.key > b.key) {
                    return -1;
                } else if (a.key < b.key) {
                    return 1;
                } else {
                    return 0;
                }
            });
        } else if (type === 'value' && sortDir === 'asc') {
            mapArr.sort((a, b) => {
                if (a.value < b.value) {
                    return -1;
                } else if (a.value > b.value) {
                    return 1;
                } else {
                    return 0;
                }
            });
        } else if (type === 'value' && sortDir === 'desc') {
            mapArr.sort((a, b) => {
                if (a.value > b.value) {
                    return -1;
                } else if (a.value < b.value) {
                    return 1;
                } else {
                    return 0;
                }
            });
        }

        for (var i = 0; i < mapArr.length; i++) {
            sortedMap.set(mapArr[i].key, mapArr[i].value);
        }

        return sortedMap;
    }

    function mapToArray(map) {
        var mapArray = [];

        for (let [key, val] of map.entries()) {
            mapArray.push({ key, value: val });
        }
        return mapArray;
    }

    function getPlainText() {
        var nodeList = document.querySelectorAll('body * :not(img) :not(script)'),
            docText = "",
            nodeElements;

        nodeList.forEach(function(node) {
            if (!isHidden(node)) {
                nodeElements = node.querySelectorAll('* :not(img) :not(script)');
                nodeElements.forEach(function(nodeEl) {
                    if (!isHidden(nodeEl)) {
                        /*
                          Exclude all html strings, only get the readable text value of the node element
                        */
                        docText += " " + nodeEl.innerHTML.replace(/<[^>]+>/g, ' ');
                    }
                });
            }
        });

        return docText;
    }

    function isHidden(el) {
        var style = window.getComputedStyle(el);
        return ((style.display === 'none') || (style.visibility === 'hidden'));
    }

    function isES6Supported() {
        try {
            Function("() => {};");
            return true;
        } catch (exception) {
            return false;
        }
    }
    /*
	Needed to implement sass-based framework for a cleaner presentation, but I didn't have enough time.
  */
    function createTagPresentation(wordLen) {

        var words = getWordsOnPage(wordLen);
        /* 
		Sort the words in descending order of occurrence.
	  */
        words = mapSort(words, 'value', 'desc');
        /*
		For each word, dynamically create the needed CSS to be outputted to the page.
	  */
    }
})();