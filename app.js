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
function createLayout(api) {
    let section = document.createElement('section');
    section.setAttribute('id', api.name);
    section.classList.add('hidden');
    section.classList.add('details');
    let heading = document.createElement('h2');
    heading.textContent = api.name;
    section.appendChild(heading);
    let inputs = [];
    for (let i = 0; i < api.fields.length; i++) {
        let input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('placeholder', api.fields[i]);
        section.appendChild(input);
        inputs.push(input);
    }
    let submit = document.createElement('button');
    submit.textContent = 'And Another One';
    submit.addEventListener('click', function (){
        let submission = {};
        for (let i = 0; i < api.fields.length; i++) {
            submission[api.fields[i]] = inputs[i].value;
            sendit(api, submission);
        }
    })
    section.appendChild(submit);
let list = document.createElement('ul');
section.appendChild(list);
document.querySelector('main').appendChild(section);
};

window.addEventListener('load', function (){
    for (let i = 0; i < apis.length; i++){
        let item = document.createElement('li');
        item.textContent = apis[i].name;
        item.setAttribute('id', 'nav-' + apis[i].name);
        item.classList.add('nav-link');
        item.addEventListener('click', function (){
            let all = document.querySelectorAll('.details');
            for (let i = 0; i < all.length; i++) {
                all[i].classList.add('hidden');
            }
            document.querySelector('#' + apis[i].name).classList.remove('hidden');
            document.querySelector('#apis-list').appendChild(item);
        });
    }
    for (let i = 0; i < apis.length; i++) {
        createLayout(apis[i]);
    }
    for (let i = 0; i < apis.length; i++) {
        getLatest(apis[i]);
    }
    setInterval(function (){
        console.log('woo');
        for (let i = 0; i < apis.length; i++){
            getLatest(apis[i]);
        }

    2000} );
});