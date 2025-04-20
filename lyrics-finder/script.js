const artistSelect = document.getElementById("artist-select");
const songSelect = document.getElementById("song-select");
const artistInput = document.getElementById("artist-input");
const songInput = document.getElementById("song-input");
const resultDiv = document.getElementById("result");

const songList = {
  adele: ["Hello", "Someone Like You", "Rolling in the Deep"],
  eminem: ["Lose Yourself", "Not Afraid", "The Real Slim Shady"],
  coldplay: ["Yellow", "Fix You", "Paradise"],
  queen: ["Bohemian Rhapsody", "Don't Stop Me Now", "We Will Rock You"]
};

// Sanatçı seçildiğinde şarkı listesini güncelle
artistSelect.addEventListener("change", () => {
  const selectedArtist = artistSelect.value;
  songSelect.innerHTML = "<option value=''>-- Şarkı Seçiniz --</option>";

  if (songList[selectedArtist]) {
    songList[selectedArtist].forEach(song => {
      const option = document.createElement("option");
      option.value = song;
      option.textContent = song;
      songSelect.appendChild(option);
    });
  }

  // Otomatik seçim varsa girişleri temizle
  artistInput.value = "";
  songInput.value = "";
});

// Şarkı seçilirse elle girişler temizlensin
songSelect.addEventListener("change", () => {
  artistInput.value = "";
  songInput.value = "";
});

// Form gönderilince şarkı sözünü getir
document.getElementById("lyrics-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  let artist = artistInput.value.trim();
  let song = songInput.value.trim();

  // Eğer giriş yapılmamışsa select değerlerini kullan
  if (!artist && !song) {
    artist = artistSelect.value;
    song = songSelect.value;
  }

  if (!artist || !song) {
    resultDiv.innerHTML = `<p>Lütfen sanatçı ve şarkı adı seçin ya da yazın.</p>`;
    return;
  }

  resultDiv.innerHTML = `<p>Yükleniyor...</p>`;

  try {
    const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`);
    const data = await res.json();

    if (data.lyrics) {
      resultDiv.innerHTML = `<h2>${artist} - ${song}</h2><pre>${data.lyrics}</pre>`;
    } else {
      resultDiv.innerHTML = `<p>Şarkı sözleri bulunamadı. 😔</p>`;
    }
  } catch (error) {
    console.error(error);
    resultDiv.innerHTML = `<p>Bir hata oluştu. Lütfen tekrar deneyin.</p>`;
  }
});
