const id = "2ac7e9d0250e43039d633b6ad4162172";
const secret = "6fea43cd69ce45d09d5c29ef66f55ed5";

const api_key = "7637822e4c2aad625bd05b86a1a28c56";

let token;
const num_max_result = 9;


function onTResp(response) {
    return response.json();
}

function onJRest(json) {
    //console.log(json);
    token = json.access_token;
}


function getCredential(event) {
    fetch ("https://accounts.spotify.com/api/token",
    {
        method: "post",
        body : "grant_type=client_credentials",
        headers : {
            'Content-type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Basic ' + btoa(id + ':' + secret)
        }
    }
    ).then(onTResp).then(onJRest);
}

function onJson2(json) {
    list = json.albums.items;
    jax = list.length;
    if (jax === 0) return;
    if (jax > num_max_result) jax = num_max_result;
    for (let y =0; y< jax; y++) {
        addAlbum(list[y].artists[0].name, list[y].images[1].url, list[y].name)
    }
}

function lookFor2(val) {
    q = encodeURIComponent(val);
    const url = "https://api.spotify.com/v1/search?type=album&q="+q;
    fetch(url, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }).then(onTResp).then(onJson2);
}


function addAlbum(name, img2, author) {

    let show = document.querySelector(".int2").parentElement;
    show.classList.remove("hidden");
    show.id = "flex";
    let hider = document.querySelector("#alert1");
    hider.classList.add("hidden");
    let div = document.createElement('div');
    let base = document.querySelector(".bd");
    div.className = "square" ;
    base.appendChild(div);

    //TITLE
    let title = document.createElement("p");
    title.textContent = name;
    title.id = 'text_h'
    div.appendChild(title);

    //LINK
    let link = document.createElement("a");
    link.href = '#';
    div.appendChild(link);

    //IMG
    let img = document.createElement("img");
    img.src = img2;
    img.className = 'img1';
    link.appendChild(img);


    let br = document.createElement("br");
    div.appendChild(br);

    //DESC
    let desc = document.createElement("p");
    desc.textContent = author;
    desc.classList.add("hidden");
    desc.id="text1";
    desc.addEventListener("click", removeText);
    div.appendChild(desc);
    

    let desc2 = document.createElement("p");
    desc2.textContent = "Clicca qui per il titolo della canzone";
    desc2.id = "desc";
    desc2.addEventListener("click", getText);
    div.appendChild(desc2);

    let but = document.createElement("a");
    but.href ="#";
    but.textContent ="Acquista!";
    but.id = "but5";
    div.appendChild(but);
}




getCredential();


///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
//LIBRI
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////



function addElem(name, img2, author) {

    let show = document.querySelector(".int").parentElement;
    show.classList.remove("hidden");
    show.id = "flex";
    let hider = document.querySelector("#alert1");
    hider.classList.add("hidden");
    let div = document.createElement('div');
    let base = document.querySelector(".bd2");
    div.className = "square" ;
    base.appendChild(div);

    //TITLE
    let title = document.createElement("p");
    title.textContent = name;
    title.id = 'text_h'
    div.appendChild(title);

    //LINK
    let link = document.createElement("a");
    link.href = '#';
    div.appendChild(link);

    //IMG
    let img = document.createElement("img");
    img.src = img2;
    img.className = 'img1';
    link.appendChild(img);


    let br = document.createElement("br");
    div.appendChild(br);

    //DESC
    let desc = document.createElement("p");
    desc.textContent = author;
    desc.classList.add("hidden");
    desc.id="text1";
    desc.addEventListener("click", removeText);
    div.appendChild(desc);
    

    let desc2 = document.createElement("p");
    desc2.textContent = "Clicca qui per il titolo della canzone";
    desc2.id = "desc";
    desc2.addEventListener("click", getText);
    div.appendChild(desc2);

    let but = document.createElement("a");
    but.href ="#";
    but.textContent ="Acquista!";
    but.id = "but5";
    div.appendChild(but);
}


function onJson(resp) {
    console.log(resp);
    const start = resp.results.albummatches.album;
    console.log(start);
    let author;
    let name;
    let img;

    let num = start.length;
    if (num === 0) return;
    if (num > num_max_result)  num = num_max_result;
    for (let i=0; i<num_max_result; i++) {
        const x = start[i];
        const title = x.name;
        const author = x.artist;
        const img2 = x.image[2]["#text"];
        console.log(x, title, author, img2);
        addElem(author, img2, title);
    }
    return;
}


function clearHome() {
    const j = document.querySelector(".bd");
    const k = j.querySelectorAll(".square");
    if (k.length !== 0)  {
        for (let h = 0; h < k.length; h++) {
            k[h].parentNode.removeChild(k[h]);
        }
        
    }
}

function clearHome2() {
    const j = document.querySelector(".bd2");
    const k = j.querySelectorAll(".square");
    if (k.length !== 0)  {
        for (let h = 0; h < k.length; h++) {
            k[h].parentNode.removeChild(k[h]);
        }
        
    }
}


function onResp(resp) {
    return resp.json();
}


function lookFor(val) {
    const url = "http://ws.audioscrobbler.com/2.0/?method=album.search&album="+val+"&api_key="+api_key+"&format=json" ;
    fetch(url).then(onResp).then(onJson);
}


function searchFor(event) {
    clearHome();
    clearHome2();
    event.preventDefault();
    const value1 = document.querySelector(".input-box").value;
    lookFor(value1);
    lookFor2(value1);
}

function getText(event) {
    event.currentTarget.classList.add("hidden");
    event.currentTarget.parentNode.querySelector("#text1").classList.remove("hidden");
}

function removeText(event) {
    event.currentTarget.classList.add("hidden");
    event.currentTarget.parentNode.querySelector("#desc").classList.remove("hidden");
}



const fz = document.querySelector(".flex-1");
fz.addEventListener("submit", searchFor);

