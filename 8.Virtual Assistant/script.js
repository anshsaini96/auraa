let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");
let feedbackBtn = document.querySelector("#feedbackBtn"); // Make sure this is defined

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "hi-GB";
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir");
    } else if (hours >= 12 && hours < 16) {
        speak("Good afternoon Sir");
    } else {
        speak("Good Evening Sir");
    }
}

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
    recognition.start();
    voice.style.display = "block";
    btn.style.display = "none";
});

function takeCommand(message) {
    voice.style.display = "none";
    btn.style.display = "flex";
    if (message.includes("hello") || message.includes("hey")) {
        speak("hello, what can I help you?");
    } else if (message.includes("who are you")) {
        speak("I am a virtual assistant, created by Ansh");
    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://youtube.com/", "_blank");
    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://google.com/", "_blank");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://facebook.com/", "_blank");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://instagram.com/", "_blank");
    } else if (message.includes("what's your age")) {
        speak("Younger than you..");
    } else if (message.includes("open calculator")) {
        speak("Opening calculator..");
        window.open("calculator://");
    } else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp..");
        window.open("whatsapp://");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(time);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak(date);
    } else {
        let finalText = "This is what I found on the internet regarding " + message.replace("Auraa", "") || message.replace("Auraa", "");
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message.replace("Auraa", "")}`, "_blank");
    }
}

// Feedback Button event listener
feedbackBtn.addEventListener('click', () => {
    const feedback = prompt("Please provide your feedback:");
    if (feedback) {
        speak("Thank you for your feedback!");
    }
});

function takeCommand(message) {
    voice.style.display = "none";
    btn.style.display = "flex";
    
    // Handle alarm setting via voice command
    if (message.includes("set an alarm")) {
        const timeMatch = message.match(/(\d+)\s*(minute|hour)/);
        if (timeMatch) {
            let timeInMinutes = parseInt(timeMatch[1]);
            // Add the alarm setting logic here for minutes
            let alarmTime = new Date(new Date().getTime() + timeInMinutes * 60000); // Time in milliseconds
            let formattedTime = alarmTime.toLocaleTimeString();
            speak(`Setting alarm for ${formattedTime}`);
            setTimeout(() => {
                speak("Time's up! Your alarm is going off.");
            }, timeInMinutes * 60000);
        } else {
            speak("Please specify the time for the alarm.");
        }
    }
    // other voice command cases...
}
