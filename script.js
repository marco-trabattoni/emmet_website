function scrollEmailIntoView() {
    const input = document.getElementById('email-input');
    setTimeout(() => {
        window.scrollTo({
            top: 300,
            behavior: 'smooth'
        });
    }, 600); // attesa per evitare conflitto con apertura tastiera
}


const buttons = document.querySelectorAll('.bottons');
const tagliaInput = document.getElementById('taglia-input');
const button = document.getElementById('button');

buttons.forEach(btn => {
    btn.addEventListener('click', () => {

        buttons.forEach(b => b.classList.remove('active'));

        btn.classList.add('active');
        button.style.opacity = "1";
        button.style.pointerEvents = "auto";

        tagliaInput.value = btn.getAttribute('data-size');
    });
});


let inseritoMail = false;

const emailInput = document.getElementById('email-input');
const targetDiv = document.getElementById('next');

emailInput.addEventListener('blur', () => {

    if (emailInput.value.trim() !== '') {
        targetDiv.style.opacity = '1'; // mostra il div
        targetDiv.style.pointerEvents = 'auto';
        inseritoMail = true;
    } else {
        targetDiv.style.opacity = '0.3'; // nasconde il div
        targetDiv.style.pointerEvents = 'auto';
        inseritoMail = false;
    }
});


document.getElementById('form').addEventListener('submit', function (e) {
    if (!tagliaInput.value) {
        alert('Per favore, seleziona una taglia.');
        e.preventDefault();
    }
});


const form = document.getElementById("form");
const testi = document.getElementById("testi");

function cambiaStile() {

    form.style.pointerEvents = "auto";
    form.style.opacity = "1";

    testi.style.opacity = "0";
    testi.style.pointerEvents = "none";

    input.style.pointerEvents = "auto";
    uno.style.opacity = "1";

    if (inseritoMail == true) {
        next.style.opacity = "1";
        next.style.pointerEvents = "auto";
    } else {
        next.style.opacity = "0.3";
        next.style.pointerEvents = "none";
    }
}

document.getElementById("cta").addEventListener("click", cambiaStile);


const uno = document.getElementById("first-step");
const input = document.getElementById("email-input");
const due = document.getElementById("second-step");
const next = document.getElementById("next");


function goBack() {

    next.style.opacity = "1";
    next.style.pointerEvents = "auto";
    uno.style.opacity = "1";
    input.style.pointerEvents = "auto";

    due.style.opacity = "0";
    due.style.pointerEvents = "none";

    form.classList.remove("up");

    setTimeout(() => {
        uno.onclick = null;
    }, 100);


}



function secondStep() {

    next.style.opacity = "0";
    next.style.pointerEvents = "none";

    uno.style.opacity = "0.5";
    input.style.pointerEvents = "none";

    due.style.opacity = "1";
    due.style.pointerEvents = "auto";

    form.classList.add("up");

    setTimeout(() => {
        uno.onclick = goBack;
    }, 100);

}




function esci() {

    form.style.pointerEvents = "none";
    form.style.opacity = "0";

    testi.style.opacity = "1";
    testi.style.pointerEvents = "auto";

    next.style.pointerEvents = "none";

    input.style.pointerEvents = "auto";

    due.style.opacity = "0";
    due.style.pointerEvents = "none";

    form.classList.remove("up");

    setTimeout(() => {
        uno.onclick = null;
    }, 100);
}


const messaggio = document.getElementById('messaggio-conferma');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Impedisce il reindirizzamento

    const formData = new FormData(form);

    const response = await fetch("https://formspree.io/f/mrbqnvlo", {
        method: "POST",
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    });

    if (response.ok) {
        form.style.display = 'none';
        messaggio.style.display = 'block';
        let metaThemeColor = document.querySelector("meta[name=theme-color]");

        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.setAttribute('name', 'theme-color');
            document.head.appendChild(metaThemeColor);
        }

        metaThemeColor.setAttribute("content", "yellow");
    } else {
        alert("Si è verificato un errore. Riprova.");
    }
});

