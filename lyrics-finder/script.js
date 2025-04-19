const artistSelect = document.getElementById("artist");
const songSelect = document.getElementById("song");
const resultDiv = document.getElementById("result");

const songList = {
  adele: ["Hello", "Someone Like You", "Rolling in the Deep"],
  eminem: ["Lose Yourself", "Not Afraid", "The Real Slim Shady"],
  coldplay: ["Yellow", "Fix You", "Paradise"],
  queen: ["Bohemian Rhapsody", "Don't Stop Me Now", "We Will Rock You"]
};

// Sanatçı seçilince şarkı listesini güncelle
artistSelect.addEventListener("change", () => {
  const artist = artistSelect.value;
  songSelect.innerHTML = "<option value=''>-- Şarkı Seçiniz --</option>";

  if (songList[artist]) {
    songList[artist].forEach(song => {
      const option = document.createElement("option");
      option.value = song;
      option.textContent = song;
      songSelect.appendChild(option);
    });
  }
});

// Form gönderilince sözleri getir
document.getElementById("lyrics-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const artist = artistSelect.value;
  const song = songSelect.value;

  if (!artist || !song) {
    resultDiv.innerHTML = `<p>Lütfen sanatçı ve şarkı seçin.</p>`;
    return;
  }

  resultDiv.innerHTML = `<p>Yükleniyor...</p>`;

  try {
    const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`);
    const data = await res.json();

    if (data.lyrics) {
      resultDiv.innerHTML = `<h2>${artist} - ${song}</h2><pre>${data.lyrics}</pre>`;
    } else {
      resultDiv.innerHTML = `<p>Şarkı sözleri bulunamadı.</p>`;
    }
  } catch (error) {
    console.error(error);
    resultDiv.innerHTML = `<p>Bir hata oluştu.</p>`;
  }
});
