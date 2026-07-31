const form = document.querySelector("#generator");
const raw = document.querySelector("#raw");
const output = document.querySelector("#output");
const status = document.querySelector("#status");
const generate = document.querySelector("#generate");
const copy = document.querySelector("#copy");
const count = document.querySelector("#raw-count");

raw.addEventListener("input", () => {
  count.textContent = `${raw.value.length} / 12000`;
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  setBusy(true);
  setStatus("Generuję profesjonalny prompt…");

  const values = Object.fromEntries(new FormData(form).entries());

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error ?? "Nieznany błąd.");
    }

    output.textContent = data.prompt;
    copy.disabled = false;
    setStatus(
      `Gotowe · ${data.meta.type} · ${data.meta.target} · ${data.meta.model}`
    );
  } catch (error) {
    setStatus(error.message, true);
  } finally {
    setBusy(false);
  }
});

copy.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(output.textContent);
    const original = copy.textContent;
    copy.textContent = "Skopiowano";
    window.setTimeout(() => {
      copy.textContent = original;
    }, 1400);
  } catch {
    setStatus("Nie udało się skopiować. Zaznacz tekst ręcznie.", true);
  }
});

function setBusy(value) {
  generate.disabled = value;
  generate.textContent = value ? "Przetwarzam…" : "Generuj prompt PRO";
}

function setStatus(message, isError = false) {
  status.textContent = message;
  status.classList.toggle("error", isError);
}
