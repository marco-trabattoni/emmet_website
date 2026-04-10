function scrollEmailIntoView() {
    setTimeout(() => {
        window.scrollTo({
            top: 300,
            behavior: "smooth"
        });
    }, 600);
}

const form = document.getElementById("form");
const testi = document.getElementById("testi");
const cta = document.getElementById("cta");

const firstStep = document.getElementById("first-step");
const secondStepBox = document.getElementById("second-step");

const emailInput = document.getElementById("email-input");
const nextButton = document.getElementById("next");

const sizeButtons = document.querySelectorAll(".bottons");
const sizeInput = document.getElementById("taglia-input");
const submitButton = document.getElementById("button");

const messaggioConferma = document.getElementById("messaggio-conferma");

let emailValida = false;
let currentStep = 1;

/* stato iniziale */
submitButton.disabled = true;
submitButton.style.opacity = "0.3";
submitButton.style.pointerEvents = "none";

function aggiornaStatoNext() {

        const tagliaSelezionata = sizeInput.value.trim() !== "";
    console.log(tagliaSelezionata);

    if (tagliaSelezionata) {
        nextButton.style.opacity = "1";
        nextButton.style.pointerEvents = "auto";
    } else {
        nextButton.style.opacity = "0.3";
        nextButton.style.pointerEvents = "none";
    }


}

function aggiornaStatoSubmit() {

    emailValida = emailInput.value.trim() !== "" && emailInput.checkValidity();

    if (emailValida && currentStep === 2) {
        submitButton.disabled = false;
        submitButton.style.opacity = "1";
        submitButton.style.pointerEvents = "auto";
    } else {
        submitButton.disabled = true;
        submitButton.style.opacity = "0.3";
        submitButton.style.pointerEvents = "none";
    }

}

function cambiaStile() {
    form.style.pointerEvents = "auto";
    form.style.opacity = "1";

    testi.style.opacity = "0";
    testi.style.pointerEvents = "none";

    aggiornaStatoNext();
}




cta.addEventListener("click", cambiaStile);

emailInput.addEventListener("input", aggiornaStatoSubmit);
emailInput.addEventListener("blur", aggiornaStatoSubmit);

emailInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();

        requestAnimationFrame(() => {
            emailInput.blur();
            aggiornaStatoSubmit();
        });
    }
});

sizeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        sizeButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        sizeInput.value = btn.getAttribute("data-size");
        aggiornaStatoNext();
    });
});



function goBack() {
currentStep = 1;

    nextButton.style.opacity = "1";
    nextButton.style.pointerEvents = "auto";

    firstStep.style.opacity = "1";
    emailInput.style.pointerEvents = "none";

    secondStepBox.style.opacity = "0";
    secondStepBox.style.pointerEvents = "none";

    form.classList.remove("up");

    setTimeout(() => {
        firstStep.onclick = null;
    }, 100);
}

function secondStep() {
    /*
    if (!emailInput.checkValidity() || emailInput.value.trim() === "") {
        emailInput.reportValidity();
        return;
    }*/

    currentStep = 2;

    nextButton.style.opacity = "0";
    nextButton.style.pointerEvents = "none";

    firstStep.style.opacity = "0.5";
    
    emailInput.style.pointerEvents = "auto";
    secondStepBox.style.opacity = "1";
    secondStepBox.style.pointerEvents = "auto";

    form.classList.add("up");

    setTimeout(() => {
        firstStep.onclick = goBack;
    }, 100);
}

function esci() {
currentStep = 1;

    form.style.pointerEvents = "none";
    form.style.opacity = "0";

    testi.style.opacity = "1";
    testi.style.pointerEvents = "auto";

    nextButton.style.pointerEvents = "none";
    nextButton.style.opacity = "0.3";

    emailInput.style.pointerEvents = "auto";
    firstStep.style.opacity = "1";

    secondStepBox.style.opacity = "0";
    secondStepBox.style.pointerEvents = "none";

    form.classList.remove("up");

    setTimeout(() => {
        firstStep.onclick = null;
    }, 100);
}


let tee = "Andy";


form.addEventListener("submit", submitta);

async function submitta(e) {
    e.preventDefault();

    if (!emailInput.checkValidity() || emailInput.value.trim() === "") {
        emailInput.reportValidity();
        return;
    }

    /*
    if (!sizeInput.value.trim()) {
        alert("Per favore, seleziona una taglia.");
        return;
    }
    */

    const formData = new FormData(form);
    formData.set("tee", tee);

    try {
        const response = await fetch("https://formspree.io/f/mrbqnvlo", {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json"
            }
        });

        if (response.ok) {
            form.style.display = "none";
            messaggioConferma.style.display = "block";
            messaggioConferma.innerHTML = "Thank you for preordering the " + tee + " tee. You’ll receive an email with a purchase link 24 hours before the drop.";

            let metaThemeColor = document.querySelector('meta[name="theme-color"]');

            if (!metaThemeColor) {
                metaThemeColor = document.createElement("meta");
                metaThemeColor.setAttribute("name", "theme-color");
                document.head.appendChild(metaThemeColor);
            }

            metaThemeColor.setAttribute("content", "yellow");
        } else {
            alert("Si è verificato un errore. Riprova.");
        }
    } catch (error) {
        alert("Si è verificato un errore. Riprova.");
    }
}
    


    const carousel = document.getElementById("carousel");
    const track = document.getElementById("carouselTrack");
    const dots = document.querySelectorAll(".dot");

    let currentIndex = 0;
    let startX = 0;
    let endX = 0;

    function updateCarousel() {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
      });
    }

    carousel.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    carousel.addEventListener("touchmove", (e) => {
      endX = e.touches[0].clientX;
    });

    carousel.addEventListener("touchend", () => {
      const diff = startX - endX;

      if (diff > 50 && currentIndex < 1) {
        currentIndex++;
        document.getElementById("tee-number").innerHTML = "1 of 10";
        tee = "Penny";
        console.log(tee);
      } else if (diff < -50 && currentIndex > 0) {
        currentIndex--;
        document.getElementById("tee-number").innerHTML = "2 of 10";
        tee = "Andy";
        console.log(tee);
      }

      updateCarousel();
      startX = 0;
      endX = 0;
    });




function scriviValore(valore) {
  document.getElementById("tee-number").textContent = valore + " of 10";
}

if (window.innerWidth > 768) {
  let tee = "";

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.id === "tee-one") {
          scriviValore(1);
          tee = "Penny";
          console.log(tee);
        }

        if (entry.target.id === "tee-two") {
          scriviValore(2);
          tee = "Andy";
          console.log(tee);
        }
      }
    });
  }, {
    threshold: 0.6
  });

  observer.observe(document.getElementById("tee-one"));
  observer.observe(document.getElementById("tee-two"));
}




