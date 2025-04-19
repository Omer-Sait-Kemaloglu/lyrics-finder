// Form gönderildiğinde çalışacak
document.getElementById("lyrics-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const artistInput = document.getElementById("artist");
  const songInput = document.getElementById("song");
  const resultDiv = document.getElementById("result");

  const artist = artistInput.value.trim();
  const song = songInput.value.trim();

  // Giriş kontrolleri
  if (!artist || !song) {
    resultDiv.innerHTML = `<p class="error">Lütfen sanatçı ve şarkı adını giriniz.</p>`;
    return;
  }

  resultDiv.innerHTML = `<p>🎵 Şarkı sözleri yükleniyor...</p>`;

  try {
    // API isteği
    const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`);
    const data = await response.json();

    // Şarkı sözleri başarıyla geldiyse
    if (data.lyrics) {
      resultDiv.innerHTML = `<pre>${data.lyrics}</pre>`;
    } else {
      resultDiv.innerHTML = `<p class="error">Şarkı sözleri bulunamadı. 😢</p>`;
    }
  } catch (error) {
    console.error("Hata:", error);
    resultDiv.innerHTML = `<p class="error">Bir hata oluştu. Lütfen tekrar deneyin.</p>`;
  }
});
