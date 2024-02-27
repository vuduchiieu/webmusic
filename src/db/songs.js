import axios from "axios";

const fetchData = async () => {
  try {
    //All songs
    const resAllSong = await axios.get(
      "https://be-song-dbac8dd7b6a3.herokuapp.com/v1/songs/"
    );
    const allSong = resAllSong.data.allSong;
    allSong.sort((a, b) => a.title.localeCompare(b.title));
    // Songs treding
    const resTrading = await axios.get(
      "https://be-song-dbac8dd7b6a3.herokuapp.com/v1/songs/"
    );
    const treding = resTrading.data.allSong;
    // Songs recommend
    const resRecommend = await axios.get(
      "https://be-song-dbac8dd7b6a3.herokuapp.com/v1/songs/"
    );
    const recommend = resRecommend.data.allSong;

    return { allSong, treding, recommend };
  } catch (err) {
    console.error(err);
    return { allSong: [], treding: [], recommend: [] };
  }
};

const { allSong, treding, recommend } = await fetchData();

export { allSong, treding, recommend };
