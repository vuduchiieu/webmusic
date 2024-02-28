import axios from "axios";

const fetchData = async () => {
  try {
    //All songs
    const resAllSong = await axios.get("https://be-song.vercel.app/v1/songs/");
    const allSong = resAllSong.data.allSong
      .sort((a, b) => a.title.localeCompare(b.title))
      .map((song) => ({ ...song, source: "allSong" }));

    return { allSong };
  } catch (err) {
    console.error(err);
    return { allSong: [] };
  }
};

const { allSong } = await fetchData();

export { allSong };
