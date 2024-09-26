const inputPowerEl = document.getElementById("inputPower");
const inputMinutesEl = document.getElementById("inputMinutes");
const inputSecondsEl = document.getElementById("inputSeconds");
const outputPowerEl = document.getElementById("outputPower");
const outputTimeEl = document.getElementById("outputTime");
const errorMessageEl = document.getElementById("errorMessage");

updateOutput();

[inputPowerEl, inputMinutesEl, inputSecondsEl, outputPowerEl].forEach((el) => {
  el.addEventListener("input", updateOutput);
});

function updateOutput() {
  const inputPower = parseInt(inputPowerEl.value);
  let inputMinutes = parseInt(inputMinutesEl.value) || 0;
  let inputSeconds = parseInt(inputSecondsEl.value) || 0;
  const outputPower = parseInt(outputPowerEl.value);

  errorMessageEl.style.display = "none";

  if (inputSeconds >= 60) {
    inputMinutes += Math.floor(inputSeconds / 60);
    inputSeconds %= 60;
    inputMinutesEl.value = inputMinutes;
  }

  inputSecondsEl.value = inputSeconds.toString().padStart(2, "0");

  const totalInputSeconds = inputMinutes * 60 + inputSeconds;

  if (totalInputSeconds > 0 && outputPower) {
    const outputSeconds = (inputPower * totalInputSeconds) / outputPower;
    const outputMinutes = Math.floor(outputSeconds / 60);
    const remainingSeconds = Math.round(outputSeconds % 60);
    outputTimeEl.textContent = `${outputMinutes}分${remainingSeconds.toString().padStart(2, "0")}秒`;
    outputTimeEl.style.display = "block";
    document.querySelector(".arrow:last-of-type").style.marginBottom = "20px";
  } else {
    outputTimeEl.style.display = "none";
    document.querySelector(".arrow:last-of-type").style.marginBottom = "0";
  }
}
