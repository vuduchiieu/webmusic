import axios from "axios";

const fetchData = async () => {
  try {
    //All songs
    const resAllSong = await axios.get("https://be-song.vercel.app/v1/songs/");
    let allSong = resAllSong.data.allSong;
    allSong.sort((a, b) => a.title.localeCompare(b.title));
    allSong = allSong.map((song) => ({ ...song, source: "allSong" }));
    // Songs treding
    const resTreding = await axios.get("https://be-song.vercel.app/v1/songs/");
    const treding = resTreding.data.allSong.map((song) => ({
      ...song,
      source: "trending",
    }));
    // Songs recommend
    const resRecommend = await axios.get(
      "https://be-song.vercel.app/v1/songs/"
    );
    const recommend = resRecommend.data.allSong.map((song) => ({
      ...song,
      source: "recommend",
    }));

    return { allSong, treding, recommend };
  } catch (err) {
    console.error(err);
    return { allSong: [], treding: [], recommend: [] };
  }
};

const { allSong, treding, recommend } = await fetchData();

export { allSong, treding, recommend };
