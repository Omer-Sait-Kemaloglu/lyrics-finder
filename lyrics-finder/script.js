async function getLyrics() {
  const artist = document.getElementById("artist").value.trim();
  const song = document.getElementById("song").value.trim();
  const display = document.getElementById("lyricsDisplay");

  if (!artist || !song) {
    display.innerText = "Please enter both artist and song name.";
    return;
  }

  display.innerText = "Fetching lyrics...";

  try {
    const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${song}`);
    const data = await res.json();

    if (data.lyrics) {
      display.innerText = data.lyrics;
    } else {
      display.innerText = "Lyrics not found.";
    }
  } catch (error) {
    display.innerText = "Error fetching lyrics.";
  }
}
