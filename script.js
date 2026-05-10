const carousel = document.getElementById("carousel");
const track = document.getElementById("carouselTrack");
const slides = document.querySelectorAll(".carousel-slide");

let currentIndex = 0;
let startX = 0;
let endX = 0;

function updateCarousel() {
  track.style.transform = `translateX(-${currentIndex * 85}%)`;
}

carousel.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

carousel.addEventListener("touchmove", (e) => {
  endX = e.touches[0].clientX;
});

carousel.addEventListener("touchend", () => {
  const diff = startX - endX;
  if (diff > 50 && currentIndex < slides.length - 1) currentIndex++;
  if (diff < -50 && currentIndex > 0) currentIndex--;
  updateCarousel();
  startX = 0;
  endX = 0;
});


const form = document.getElementById("form");
const cta = document.getElementById("cta");
const emailContainer = document.getElementById("email-container");
const emailInput = document.getElementById("email-input");
const sizeContainer = document.getElementById("size-selected");
const sizeSelected = document.getElementById("size-selected-size");
const sizes = document.getElementById("sizes");
const bottonSizes = document.querySelectorAll("#sizes .bottons");
const testi = document.getElementById("testi");
const exit = document.getElementById("exit");
const messaggioConferma = document.getElementById("messaggio-conferma");

const pageName = window.location.pathname.split("/").pop().replace(".html", "");
const tee = pageName.charAt(0).toUpperCase() + pageName.slice(1);

let formUnlocked = false;
let inputFocused = false;
let currentSize = "M";


emailInput.addEventListener("focus", () => {
  inputFocused = true;
});

// Unico listener blur: gestisce sia il flag che il reflow
emailInput.addEventListener("blur", () => {
  setTimeout(() => {
    inputFocused = false;
    window.scrollTo(0, 0);
    document.documentElement.style.height = "100%";
    document.body.style.height = "100%";
    document.body.offsetHeight;
  }, 300);
});


async function submitta(e) {
  e.preventDefault();

  if (!emailInput.checkValidity() || emailInput.value.trim() === "") {
    emailInput.classList.add("error");
    setTimeout(() => emailInput.classList.remove("error"), 400);
    return;
  }

  const formData = new FormData(form);
  formData.set("taglia", currentSize);
  formData.set("tee", tee);

  try {
    const response = await fetch("https://formspree.io/f/mrbqnvlo", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" }
    });

    if (response.ok) {
      form.style.display = "none";
      messaggioConferma.style.display = "block";
      messaggioConferma.innerHTML =
        "Thank you for preordering the " + tee + " tee in size " + currentSize +
        ".<br>You'll receive a purchase link at <span style='border-bottom: 1px solid black;'>" +
        emailInput.value + "</span><br>when it's ready.";

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

function showOptions(e) {
  e.preventDefault();

  if (emailContainer.style.bottom !== "80px") {
    exit.style.display = "block";
    emailContainer.style.bottom = "80px";
    sizeContainer.style.bottom = "80px";
    testi.style.bottom = "160px";
    carousel.style.top = "39%";
    return;
  }

  if (!emailInput.checkValidity() || emailInput.value.trim() === "") {
    emailInput.classList.add("error");
    setTimeout(() => emailInput.classList.remove("error"), 400);
    return;
  }

  submitta(e);
}

cta.addEventListener("click", showOptions);


function showSizes() {
  sizes.style.right = "8px";
}

sizeContainer.addEventListener("click", showSizes);


bottonSizes.forEach((button) => {
  button.addEventListener("click", () => {
    const size = button.dataset.size;
    bottonSizes.forEach(b => b.style.border = "none");
    button.style.border = "1px dotted black";
    currentSize = size;
    sizeSelected.innerHTML = size;
    sizes.style.right = "-100%";
  });
});


function unShowOptions() {
  sizes.style.right = "-100%";
  emailContainer.style.bottom = "-100%";
  sizeContainer.style.bottom = "-100%";
  testi.style.bottom = "96px";
  exit.style.display = "none";
  carousel.style.top = "46%";
  formUnlocked = false;
}

// Unico listener exit
exit.addEventListener("click", (e) => {
  if (
    e.target.closest("#email-container") ||
    e.target.closest("#sizes") ||
    e.target.closest("#size-selected")
  ) return;

  if (inputFocused) {
    inputFocused = false;
    return;
  }

  unShowOptions();
});