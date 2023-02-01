// By default img 2,3,4 should be disabled at start
document.getElementById("img-2").disabled = true;
document.getElementById("img-3").disabled = true;
document.getElementById("img-4").disabled = true;

// array to store input info like name, user name, and email
let formInfoArray = [];

// array to store the score of dice onclick function
let diceScore = [];

// global variables to keep record of attempts for image 3 on click function and dice click for dice image
let attempt = 2;
let RemainingDiceClick = 3;
let totalScore = 0;

// Image 1 Function : Open form
function openFormFunction() {
    document.getElementById('form').classList.remove('hidden');
}

// Form submit Function : Take inputs from user and submit the form with storing the info in global array
function submitFormInfo() {
    const name = document.getElementById("name").value;
    const userName = document.getElementById("userName").value;
    const email = document.getElementById("email").value;
    if (name && userName && email) {
        const formData = {
            Name: name,
            UserName: userName,
            Email: email,
        };
        formInfoArray.push(formData);
        document.getElementById("img-2").disabled = false;
        document.getElementById("img-1").disabled = true;
        document.getElementById("form").style.display = "none";
        alert("Form submitted successfully!");
    } else {
        alert("Please fill in all required fields.");
    }
}

// Image 2 Function : Display form info 
function displayFormInfoFunction() {
    const formData = formInfoArray[0];
    const infoText = `Name: ${formData.Name}, User Name: ${formData.UserName}, Email: ${formData.Email}`;
    document.getElementById("info").innerText = infoText;
    document.getElementById("displayInfo").style.display = "block";
    document.getElementById("img-2").disabled = true;
    document.getElementById("img-3").disabled = false;
}


// Image 3 Function : Display dice image with attempt no
function displayDiceWthScore() {
    document.getElementById("displayInfo").classList.add("hidden");
    attempt -= 1;
    document.getElementById("attemptsLeft").innerText = attempt;
    document.getElementById("diceWthScore").classList.remove("hidden");
    document.getElementById("img-3").setAttribute("disabled", "true");
}

// DiceClick function: this function keeps track of total score. If TS > 10 after 3 dice clicks it should enabled 4th image else alert to click on 3rd image

function diceClick() {
    remainingDiceClick--;
    document.getElementById('diceClicks').innerText = remainingDiceClick;
    let randomNumber = Math.floor(Math.random() * 6) + 1;
    totalScore += randomNumber;
    document.getElementById('score').innerText = totalScore;
  
    if (remainingDiceClick === 0) {
      document.getElementById("dice-Image").disabled = true;
  
      if (totalScore > 10) {
        alert(`Congratulations! Your total score is greater than 10. Click on the next image to get your coupon code.`);
        document.getElementById('diceWthScore').classList.add('hidden');
        document.getElementById("img-4").disabled = false;
      } else {
        if (attemptsLeft !== 0) {
          alert(`Too bad! Your total score is ${totalScore}, which is less than 10. Please try again!`);
          document.getElementById("img-3").disabled = false;
          remainingDiceClick = 3;
          totalScore = 0;
          document.getElementById("dice-Image").disabled = false;
          document.getElementById('diceWthScore').classList.add('hidden');
        } else {
          alert(`Bad luck! Your total score is not greater than 10 and you have used all your attempts. Please start over!`);
          document.getElementById('diceWthScore').classList.add('hidden');
          document.getElementById('tryAgainImage').classList.remove('hidden');
        }
      }
    }
  }
  

// Image 4 Function : Generate 12 digit coupon code when clicked on image 4 and alert it.

function generateCouponCode() {
    document.querySelector("#img-4").setAttribute("disabled", true);
    const couponLength = 12;
    let coupon = "";
    for (let i = 0; i < couponLength; i++) {
        coupon += Math.floor(Math.random() * 10);
    }
    document.querySelector("#congratsImage").classList.remove("hidden");
    alert(`Congratulations! You have successfully received a coupon code: ${coupon}`);
}
