var myHeaders = new Headers();
myHeaders.append("Authorization", "Basic cmVhZC03MDljOGU0NWQ1ZTZhNThhZWM3Y2Q0MTQ3NTFmNTYwOTpXUnJvSWxmVlN3UnU4STc4ZGJ4Z2hZY1BaZGxOazZwaURUY2pMWGRF");
var patternsUrl = "https://api.ravelry.com/patterns/search.json?q=free, scarf";

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

async function fetchPatterns() {
    const patternsDiv = document.querySelector("#patterns");
    patternsDiv.innerHTML = "";

    try {
      const response = await fetch(patternsUrl, requestOptions);
      const data = await response.json();
      let counter = 0;
      const patternDiv = document.querySelector('#patterns');
      for (const pattern of data.patterns) {
        const patternText = await getUrl(pattern.id);
        console.log('pattern' + patternText);
        if (patternText.toString().trim().length == 0 || pattern.name.length > 30)
            continue;
        if (counter == 50)
            return;
        counter++;
        const patternCol = document.createElement('div');
            patternCol.classList.add('col-sm-4')
        const patternCard = document.createElement('div');
            patternCard.classList.add('card', 'text-white', 'bg-primary', 'mb-3');
            patternCard.style.width = '18rem';
        const patternCardBody = document.createElement('div');
            patternCardBody.classList.add('card-body');
        const cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.textContent = pattern.name;
        patternCardBody.appendChild(cardTitle);
       
        const cardImage = document.createElement('img');
            cardImage.src =  pattern.first_photo.square_url;
            cardImage.classList = ("card-img-top")

            
        patternCardBody.appendChild(cardImage);
        const cardText = document.createElement('p');
            cardText.classList.add('card-text');
            cardText.textContent = `by: ${pattern.pattern_author.name}`;
        patternCardBody.appendChild(cardText);
        
        const patternUrl = document.createElement('a');
        
            patternUrl.setAttribute("href", patternText);
            patternUrl.textContent = `Go to pattern`;
            patternUrl.classList.add('btn');
        patternCardBody.appendChild(patternUrl);

        patternCard.appendChild(patternCardBody);
        patternCol.appendChild(patternCard);

        patternDiv.appendChild(patternCol);
      }
    } catch (error) {
      console.error('There was an error!', error);
    }
  }

  async function getUrl(patternId){
    try{
        const patternResponse = await fetch(`https://api.ravelry.com/patterns/${patternId}.json`, requestOptions);
        const patternUrl = await patternResponse.json();
        console.log('data ' + patternUrl.pattern.url);
        return patternUrl.pattern.url;
    }catch(error){
        console.log('error in patternId');
    }
  }
  
  fetchPatterns();

