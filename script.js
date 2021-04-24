

///////////////////////////////////////////////////////////////////////////
//PAGE LOADING
///////////////////////////////////////////////////////////////////////////

document.body.onload = addElement;

let fav = [];

function addElement() {

    for (let x in CONTENT) {
        //DIV
        let div = document.createElement('div');
        let base = document.querySelector(".bd");
        div.className = "square" ;
        base.appendChild(div);

        //TITLE
        let title = document.createElement("p");
        title.textContent = CONTENT[x].title;
        title.id = 'text_h'
        div.appendChild(title);

        //LINK
        let link = document.createElement("a");
        link.href = '#';
        div.appendChild(link);

        //IMG
        let img = document.createElement("img");
        img.src = CONTENT[x].img;
        img.className = 'img1';
        link.appendChild(img);


        let br = document.createElement("br");
        div.appendChild(br);

        //DESC
        let desc = document.createElement("p");
        desc.textContent = CONTENT[x].testo;
        desc.classList.add("hidden");
        desc.id="text1";
        desc.addEventListener("click", removeText);
        div.appendChild(desc);
        

        let desc2 = document.createElement("p");
        desc2.textContent = "Clicca qui per maggiori info";
        desc2.id = "desc";
        desc2.addEventListener("click", getText);
        div.appendChild(desc2);



        //FAV BUTTON
        let but = document.createElement("img");
        but.id = "img4";
        but.className = 'props';
        but.src = 'img/heart.png';
        but.dataset.indexNumber = x;
        but.addEventListener("click", addFavourite);
        div.appendChild(but);

    }
}


function getText(event) {
    event.currentTarget.classList.add("hidden");
    event.currentTarget.parentNode.querySelector("#text1").classList.remove("hidden");
}

function removeText(event) {
    event.currentTarget.classList.add("hidden");
    event.currentTarget.parentNode.querySelector("#desc").classList.remove("hidden");
}




function loadFavourite(num) {

    const arrival = document.querySelector("#box");

    //DIV
    let div = document.createElement("div");
    div.id = "box2";
    arrival.appendChild(div);

    //IMG

    let img = document.createElement("img");
    img.src = CONTENT[num].img;
    img.className = "img5";
    div.appendChild(img);


    //TESTO

    let texts = document.createElement("p");
    texts.textContent = CONTENT[num].title;
    texts.id = "text2";
    div.appendChild(texts);
   

    //ICS

    let img2 = document.createElement("img");
    img2.src = "img/trash.png";
    img2.id = "img6";
    img2.dataset.indexNumber = num;
    div.appendChild(img2);
    img2.addEventListener("click", delFavourite);
    return;
}


function isAlso(num) {
    for (let yeld of fav) {
        if (num === yeld) {
            return true;
        }
    }
    return false;
}


function addFavourite(event) {
    const num = event.currentTarget.dataset.indexNumber;
    if (isAlso(num) === false) {
        fav.push(num);
        loadFavourite(num)
        return;
    }
}

function delFavourite(event) {
    const num = event.currentTarget.dataset.indexNumber; 
    updateFavourite(num);
}


function updateFavourite(num) {
    const tagh = document.querySelectorAll("#box2");
    for (let b of tagh) {
        if (b.querySelector("#img6").dataset.indexNumber === num) {
            b.parentNode.removeChild(b);
            fav.pop(num);
            if (fav.length === 0) {
                closeFav();
            }
        }
    }
}

function hidElement(str) {

    const r31 = document.querySelectorAll("#img4");
    for (let r32 of r31) {
        if (r32.dataset.indexNumber === str) {
            const t = r32.parentNode;
            t.classList.add("hidden");
        }
    }
    
}

function retElement() {
    const r31 = document.querySelectorAll("#img4")
    for (let r33 of r31) {
        const t = r33.parentNode;
        if (t.classList.contains("hidden"))
            t.classList.remove("hidden");
    }
}

function retElement2(str) {
    const r31 = document.querySelectorAll("#img4");
    for (let r34 of r31) {
        const t = r34.parentNode;
        if (t.classList.contains("hidden") && t.querySelector("#text_h").textContent.toLowerCase().indexOf(str) > -1 )
            t.classList.remove("hidden");
    }
}

function updateElement(str) {
    console.log ("Ricevuto : "+ str);
    if (str.length === 0) {
        retElement();
    } else {
        for (let i in CONTENT) {
            if (CONTENT[i].title.toLowerCase().indexOf(str.toLowerCase()) < 0) 
                hidElement(i);
            else
                retElement2(str.toLowerCase())
        }
    }
}


function checkInput(event) {
    event.preventDefault();
    const input = document.querySelector(".input-box");
    updateElement(input.value);
}


function openFav(event) {
    const l1 = document.querySelector("#box");
    if (fav.length === 0) {
        return;
    } else {
        if (l1.classList.contains("flex1")) {
            l1.classList.remove("flex1");
            l1.classList.add("hidden");
        } else {
            l1.classList.add("flex1");
            l1.classList.remove("hidden");
        }
    }
    
}

function closeFav(event) {
    
    const l1 = document.querySelector("#box");
    l1.classList.add("hidden");
    l1.classList.remove("flex1");
}


const fx = document.querySelector("#open_fav");
fx.addEventListener("click", openFav);

const fy = document.querySelector("#x");
fy.addEventListener("click", closeFav);

const fz = document.querySelector(".input-box");
fz.addEventListener("keyup", checkInput);




//////////////////////////////////////////////////////////////////////////////////





