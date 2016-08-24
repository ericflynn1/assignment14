let apis = [
    {name: 'games', url: 'http://charlotte-games-rater.herokuapp.com/games', fields: ['name', 'rating', 'price'] },
    {name: 'coffeeshops', url: 'http://charlotte-coffee-shops.herokuapp.com/coffee-shops', fields: ['name', 'rating', 'price']},
    {name: 'cars', url: 'https://stormy-retreat-24546.herokuapp.com/cars', fields: ['color', 'model', 'year']}
];

function getLatest(api) {
    let request = new XMLHttpRequest();
    request.open('GET', api.url);
    request.addEventListener('load', function(){
        let response = JSON.parse(request.responseText);
        document.querySelector('#nav-' + api.name).textContent = api.name + '(' + response.length + ')';
        let list = document.querySelector('#' + api.name + 'ul');
        list.innerHTML = '';
        for (let i = 0; i < response.length; i++) {
            if (response[i] !== null) {
                let item = document.createElement('li');
                item.textContent = response[i][api.fields[0]];

                list.appendChild(item);
            }
        }
    });
    request.send();
}

function sendit(api, item) {
    let request = new XMLHttpRequest ();
    request.open('POST', api.url);
    request.send(JSON.stringify(item));
}

