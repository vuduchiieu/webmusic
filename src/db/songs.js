import axios from "axios";

const fetchData = async () => {
  try {
    //All songs
    const resAllSong = await axios.get("https://be-song.vercel.app/v1/songs/");
    const allSong = resAllSong.data.allSong;
    allSong.sort((a, b) => a.title.localeCompare(b.title));
    // Songs again
    const resAgain = await axios.get("https://be-song.vercel.app/v1/songs/");
    const again = resAgain.data.allSong;
    // Songs treding
    const resTrading = await axios.get("https://be-song.vercel.app/v1/songs/");
    const treding = resTrading.data.allSong;
    // Songs recommend
    const resRecommend = await axios.get(
      "https://be-song.vercel.app/v1/songs/"
    );
    const recommend = resRecommend.data.allSong;

    return { allSong, again, treding, recommend };
  } catch (err) {
    console.error(err);
    return { allSong: [], again: [], treding: [], recommend: [] };
  }
};

const { allSong, again, treding, recommend } = await fetchData();

export { allSong, again, treding, recommend };
