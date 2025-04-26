const form = document.querySelector(".form-wrapper");
const heroName = document.getElementById("heroName");
const heroineName = document.getElementById("heroineName");
const submitBtn = document.getElementById("sbmtBtn");
const result = document.getElementById("lvScoreResult");
const inputs = document.querySelectorAll(".input-group");
const errMsg = document.querySelectorAll(".err");
const percentCount = document.getElementById("percentCount");
const scoreDescription = document.getElementById("description");
const refresh = document.querySelector(".refresh");
let hasSubmitted = false;

form.addEventListener('submit', (e) => {
    e.preventDefault();
    formSubmitted();
})

function validateInputs() {
    let heroNameValue = heroName.value.trim();
    let heroineNameValue = heroineName.value.trim();
    let isValid = true;

    if (heroNameValue === '' && heroineNameValue === '') {
        alert("We are request to fill all input fields!")
    }
    // Validate hero name
    if (heroNameValue === "") {
        isValid = false;
        setError(heroName, "Can't be empty");
    } else {
        setSuccess(heroName);
    }

    // Validate heroine name
    if (heroineNameValue === "") {
        isValid = false;
        setError(heroineName, "Can't be empty");
    } else {
        setSuccess(heroineName);
    }
    return isValid;
}

// set error function
function setError(ele, msg) {
    const inputGroup = ele.parentElement;
    const errorElement = inputGroup.querySelector(".err");

    errorElement.innerText = msg;
    inputGroup.classList.add("itsError");
    inputGroup.classList.remove("itsSuccess");
}

// set success function
function setSuccess(ele, msg) {
    const inputGroup = ele.parentElement;
    const errorElement = inputGroup.querySelector(".err");

    errorElement.innerText = "";
    inputGroup.classList.remove("itsError");
    inputGroup.classList.add("itsSuccess");
}

// calculating score
function calcScore() {
    const randomValue = Math.floor(Math.random() * 100);
    let currentScore = 0;

    const counter = setInterval(() => {
        const blast = document.querySelector(".blast-effect");
        if (currentScore <= randomValue) {
            currentScore++;
            percentCount.textContent = `${currentScore}%`
        } else {
            clearInterval(counter);
            setTimeout(() => {
                if (!blast.classList.contains("active")) {
                    blast.classList.add("active");
                    blast.stop();
                    blast.play();
                }
            }, 300)
        }
    }, 10);

    setTimeout(() => {
        function messages() {
            if (randomValue >= 80) {
                scoreDescription.textContent = results.value80;
            } else if (randomValue >= 60) {
                scoreDescription.textContent = results.value60;
            } else if (randomValue >= 40) {
                scoreDescription.textContent = results.value40;
            } else if (randomValue < 40) {
                scoreDescription.textContent = results.value20;
            }
        }
        messages();
    }, 1000);
}


const results = {
    value80: "You are both made for each other and your love is like Romeo and Juliet. You will get marry soon. Best of luck!",
    value60: "You are both made for each other and you will get marry soon. Best of luck!",
    value40: "You are both need to understand more each other. Best of luck!",
    value20: "OOPS! I'm sorry. You might need to work a little more on your connection.",
}

// stop submitting more than one time
function formSubmitted() {
    if (hasSubmitted) return;

    if (validateInputs()) {
        calcScore()
        hasSubmitted = true;
    }
}

// refresh page
refresh.addEventListener('click', () => {
    location.reload();
})