import axios from "axios";
import img from "~/assets/img";
import mp3 from "~/assets/mp3";

const fetchData = async () => {
  try {
    const res = await axios.get("https://be-song.vercel.app/v1/songs/upload");
    const treding = res.data.allSong;
    const allSong = res.data.allSong;
    console.log(treding);
    return { treding, allSong };
  } catch (err) {
    console.error(err);
    return { treding: [], allSong: [] };
  }
};
const again = [
  {
    _id: 0,
    title: "Cao ốc 20",
    author: "Bray x DatG",
    image: img.caooc20,
    song: mp3.caooc20,
  },
  {
    _id: 1,
    author: "Anh sẽ ổn thôi",
    name: "Anh Tú",
    image: img.anhseonthoi,
    song: mp3.anhseonthoi,
  },
  {
    _id: 2,
    author: "Luôn yêu đời remix",
    name: "Đen, Cheng & Low G",
    image: img.luonyeudoiremix,
    song: mp3.luonyeudoiremix,
  },
  {
    _id: 3,
    author: "Luôn yêu đời",
    name: "Đen, Cheng",
    image: img.luonyeudoi,
    song: mp3.luonyeudoi,
  },
  {
    _id: 4,
    author: "Anh chưa thương em đến vậy đâu",
    name: "Lady Mây",
    image: img.anhchuathuongemdenvaydau,
    song: mp3.anhchuathuongemdenvaydau,
  },
  {
    _id: 5,
    author: "An thần",
    name: "Low if Thắng",
    image: img.anthan,
    song: mp3.anthan,
  },
  {
    _id: 6,
    author: "Đau để trưởng thành",
    name: "OnlyC",
    image: img.daudetruongthanh,
    song: mp3.daudetruongthanh,
  },
  {
    _id: 7,
    author: "Diễn viên tồi",
    name: "Đen ft Thành Bùi, Cadillac",
    image: img.dienvientoi,
    song: mp3.dienvientoi,
  },
  {
    _id: 8,
    author: "Ex's Hate Me(Part 2)",
    name: "AMEE x B RAY",
    image: img.exhateme2,
    song: mp3.exhateme2,
  },
  {
    _id: 9,
    author: "Hết thương cạn nhớ",
    name: "Đức Phúc",
    image: img.hetthuongcannho,
    song: mp3.hetthuongcannho,
  },
  {
    _id: 10,
    author: "Không thích",
    name: "Low G",
    image: img.khongthich,
    song: mp3.khongthich,
  },
  {
    _id: 11,
    author: "Người đi bao",
    name: "tlinh if Low G",
    image: img.nguoidibao,
    song: mp3.nguoidibao,
  },
  {
    _id: 12,
    author: "Vỡ Tan",
    name: "Trịnh Thăng Bình x Hiền Hồ",
    image: img.votan,
    song: mp3.votan,
  },
  {
    _id: 13,
    author: "‘3107’ full album",
    name: "W/n ft (267,Nâu, Dươngg)",
    image: img.wn3107,
    song: mp3.wn3107,
  },
  {
    _id: 14,
    author: "Sau lời từ khướt",
    name: "Phan Mạnh Quỳnh",
    image: img.sauloitukhuot,
    song: mp3.sauloitukhuot,
  },
];

const { treding, allSong } = await fetchData();

const recommend = [];

export { again, treding, recommend, allSong };
