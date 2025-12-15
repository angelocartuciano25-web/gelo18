// Sample Monkeytype-style long paragraphs
const paragraphs = [
 
  "The spacecraft drifted silently above the blue curve of Earth. Control panels glowed softly as the crew monitored their instruments. A sense of awe settled over them as they watched storms swirl across the oceans below. The vast emptiness of space reminded them how small their home truly was. Every star outside the window seemed to shimmer with possibility. Far from home, they worked together with calm precision. Their mission required focus, discipline, and absolute trust in one another.",

  "Communication with Earth came through in steady, reassuring bursts. Even in the silence of the void, they felt connected to the world they protected. The journey reminded them that exploration was not just discovery, but responsibility.In that instant, the world outside felt very far away.He walked along the shoreline where waves kissed his feet. The ocean breeze carried hints of salt and distant memories. Seagulls circled overhead, calling out to the open sea. Footprints trailed behind him, soon erased by the tide. He felt a quiet freedom in the rhythm of the water.",

  "In a world driven by noise, speed, and constant pressure, Daniel found comfort in silence. He would often sit by the old wooden desk near the window, watching raindrops slide down the glass.The library smelled of paper, dust, and quiet secrets. Rows of books towered above Mia as she wandered between the shelves, searching for something she couldn't quite name.As the train rushed through the night.",

  "Leo stared at his reflection in the window. He could barely recognize himself after months of travel, challenges, and unexpected detours.Early in the morning, the city was almost unrecognizable. The streets were empty, the storefront lights were still dim, and a soft mist wrapped itself around every corner.si camille kay babaye nga maba. Ang babae kay napaka bobo na tao ay joke lang pala hahahahahaha. So ima lady say hey hey hey daddy, hey hey hey daddy"
];

let selectedText = "";
let timeLeft;
let timerInterval;

const sentenceDisplay = document.getElementById("sentenceDisplay");
const typingArea = document.getElementById("typingArea");
const timerText = document.getElementById("timer");
const wpmText = document.getElementById("wpm");
const accuracyText = document.getElementById("accuracy");
const startBtn = document.getElementById("startBtn");
const timeSelect = document.getElementById("timeSelect");

// START TEST
startBtn.addEventListener("click", () => {
  resetTest();

  timeLeft = parseInt(timeSelect.value);
  timerText.textContent = `Time Left: ${timeLeft}s`;

  selectedText = paragraphs[Math.floor(Math.random() * paragraphs.length)];
  displayText(selectedText);

  typingArea.disabled = false;
  typingArea.value = "";
  typingArea.focus();

  timerInterval = setInterval(updateTimer, 1000);
});

// DISPLAY THE SENTENCE LETTER-BY-LETTER
function displayText(text) {
  sentenceDisplay.innerHTML = "";
  text.split("").forEach(char => {
    const span = document.createElement("span");
    // Preserve spaces
    span.innerHTML = char === " " ? "&nbsp;" : char;
    sentenceDisplay.appendChild(span);
  });
}

// LIVE CHECKING
typingArea.addEventListener("input", () => {
  const input = typingArea.value.split("");
  const spans = sentenceDisplay.querySelectorAll("span");

  spans.forEach((charSpan, idx) => {
    if (input[idx] == null) {
      charSpan.classList.remove("correct", "wrong");
    } else if (input[idx] === charSpan.textContent) {
      charSpan.classList.add("correct");
      charSpan.classList.remove("wrong");
    } else {
      charSpan.classList.add("wrong");
      charSpan.classList.remove("correct");
    }
  });
});

// TIMER
function updateTimer() {
  timeLeft--;
  timerText.textContent = `Time Left: ${timeLeft}s`;

  if (timeLeft <= 0) finishTest();
}

// FINISH TEST
function finishTest() {
  clearInterval(timerInterval);
  typingArea.disabled = true;

  const typed = typingArea.value.trim();
  const words = typed.split(" ").filter(w => w !== "").length;
  const minutes = parseInt(timeSelect.value) / 60;
  wpmText.textContent = Math.round(words / minutes);

  const correctChars = countCorrectCharacters(typed, selectedText);
  accuracyText.textContent = Math.round((correctChars / selectedText.length) * 100) + "%";
}

// RESET
function resetTest() {
  clearInterval(timerInterval);
  wpmText.textContent = "0";
  accuracyText.textContent = "0%";
  sentenceDisplay.innerHTML = "";
}

// COUNT CORRECT CHARACTERS
function countCorrectCharacters(input, original) {
  let correct = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === original[i]) correct++;
  }
  return correct;
}


