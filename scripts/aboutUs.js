const url ="https://api.quotable.io/quotes/random";
const quoteOfTheDay = document.querySelector("#quote");
quoteOfTheDay.innerHTML = "";

const quoteAuthor = document.querySelector("#quoteAuthor");
quoteAuthor.innerHTML = "";

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  

async function getQuoteOfTheDay(){
    try{
        const response = await fetch(url, requestOptions);
        const quote = await response.json();
        console.log('data ' + quote[0].author);
        populateQuote(quote);
    }catch(error){
        console.log('error in getQuoteOfTheDay');
    }
  }

  function populateQuote(quote){
    quoteOfTheDay.innerHTML = quote[0].content;
    quoteAuthor.innerHTML = quote[0].author;
  }
  getQuoteOfTheDay();