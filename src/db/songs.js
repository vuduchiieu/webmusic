import axios from "axios";

const fetchData = async () => {
  try {
    const res = await axios.get("https://be-song.vercel.app/v1/songs/");
    const allSong = res.data.allSong;
    const again = res.data.allSong;
    const treding = res.data.allSong;
    const recommend = res.data.allSong;
    return { allSong, again, treding, recommend };
  } catch (err) {
    console.error(err);
    return { allSong: [], again: [], treding: [], recommend: [] };
  }
};
// const again = [
//   {
//     _id: 0,
//     title: "Cao ốc 20",
//     author: "Bray x DatG",
//     image: [
//       {
//         url: img.caooc20,
//         _id: "65d63256569e8888888469db",
//       },
//       {
//         publicId: "Deaican",
//         _id: "65d63256569e8888888469dc",
//       },
//     ],
//     song: mp3.caooc20,
//   },
//   {
//     _id: 1,
//     title: "Anh sẽ ổn thôi",
//     author: "Anh Tú",
//     image: img.anhseonthoi,
//     song: mp3.anhseonthoi,
//   },
//   {
//     _id: 2,
//     title: "Luôn yêu đời remix",
//     author: "Đen, Cheng & Low G",
//     image: img.luonyeudoiremix,
//     song: mp3.luonyeudoiremix,
//   },
//   {
//     _id: 3,
//     title: "Luôn yêu đời",
//     author: "Đen, Cheng",
//     image: img.luonyeudoi,
//     song: mp3.luonyeudoi,
//   },
//   {
//     _id: 4,
//     title: "Anh chưa thương em đến vậy đâu",
//     author: "Lady Mây",
//     image: img.anhchuathuongemdenvaydau,
//     song: mp3.anhchuathuongemdenvaydau,
//   },
//   {
//     _id: 5,
//     title: "An thần",
//     author: "Low if Thắng",
//     image: img.anthan,
//     song: mp3.anthan,
//   },
//   {
//     _id: 6,
//     title: "Đau để trưởng thành",
//     author: "OnlyC",
//     image: img.daudetruongthanh,
//     song: mp3.daudetruongthanh,
//   },
//   {
//     _id: 7,
//     title: "Diễn viên tồi",
//     author: "Đen ft Thành Bùi, Cadillac",
//     image: img.dienvientoi,
//     song: mp3.dienvientoi,
//   },
//   {
//     _id: 8,
//     title: "Ex's Hate Me(Part 2)",
//     author: "AMEE x B RAY",
//     image: img.exhateme2,
//     song: mp3.exhateme2,
//   },
//   {
//     _id: 9,
//     title: "Hết thương cạn nhớ",
//     author: "Đức Phúc",
//     image: img.hetthuongcannho,
//     song: mp3.hetthuongcannho,
//   },
//   {
//     _id: 10,
//     title: "Không thích",
//     author: "Low G",
//     image: img.khongthich,
//     song: mp3.khongthich,
//   },
//   {
//     _id: 11,
//     title: "Người đi bao",
//     author: "tlinh if Low G",
//     image: img.nguoidibao,
//     song: mp3.nguoidibao,
//   },
//   {
//     _id: 12,
//     title: "Vỡ Tan",
//     author: "Trịnh Thăng Bình x Hiền Hồ",
//     image: img.votan,
//     song: mp3.votan,
//   },
//   {
//     _id: 13,
//     title: "‘3107’ full album",
//     author: "W/n ft (267,Nâu, Dươngg)",
//     image: img.wn3107,
//     song: mp3.wn3107,
//   },
//   {
//     _id: 14,
//     title: "Sau lời từ khướt",
//     author: "Phan Mạnh Quỳnh",
//     image: img.sauloitukhuot,
//     song: mp3.sauloitukhuot,
//   },
// ];

const { allSong, again, treding, recommend } = await fetchData();

export { allSong, again, treding, recommend };
