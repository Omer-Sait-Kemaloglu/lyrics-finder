document.getElementById("lyrics-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const artist = document.getElementById("artist").value.trim();
  const song = document.getElementById("song").value.trim();
  const resultDiv = document.getElementById("result");

  if (!artist || !song) {
    resultDiv.innerText = "Lütfen sanatçı ve şarkı adı giriniz.";
    return;
  }

  resultDiv.innerHTML = "Yükleniyor... 🎶";

  try {
    const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`);
    const data = await res.json();

    if (data.lyrics) {
      resultDiv.innerText = data.lyrics;
    } else {
      resultDiv.innerText = "Şarkı sözleri bulunamadı 😢";
    }
  } catch (error) {
    resultDiv.innerText = "Bir hata oluştu. Lütfen tekrar deneyin.";
    console.error(error);
  }
});
