function quoteUrl() {
    return "https://andruxnet-random-famous-quotes.p.mashape.com";
}

function quoteApiKey() {
    return "CdbBmWOrBfmshc7t9INffynYmXwNp1JFGbpjsny0dUKurJRhrP";
}

function Quote(quote, author, category) {
    this.quote = quote;
    this.author = author;
    this.category = category;
}

function getQuote(onQuoteReceived) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", quoteUrl());
    xhr.setRequestHeader("X-Mashape-Key", quoteApiKey());
    xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                var quote = JSON.parse(this.responseText);
                console.log(quote);
                onQuoteReceived(quote);
            } else {
                console.log("failed to get quote, status = " + this.status);
            }
        }
    };
    xhr.send();
}
