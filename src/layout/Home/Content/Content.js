import React, { useEffect, useState } from "react";

import classNames from "classnames/bind";
import styles from "./content.module.scss";
import { useAppContext } from "~/component/context/AppContext";
import icon from "~/assets/icon";
import Login from "./Login/Login";
import Search from "./Search/Search";
import Account from "./Account/Account";
import Songs from "~/component/Songs/Songs";
import axios from "axios";
import Upload from "./Upload/Upload";
import { allSong } from "~/db/songs";

const cx = classNames.bind(styles);

function Content() {
  const {
    themeMode,
    setThemeMode,
    search,
    setSearch,
    again,
    setAgain,
    treding,
    setTreding,
    recommend,
    setRecommend,
    refreshData,
    setRefreshData,
    user,
  } = useAppContext();

  const [searchValue, setSearchValue] = useState("");
  const handleTheme = () => {
    setThemeMode(!themeMode);
  };
  //render again
  useEffect(() => {
    if (user != null) {
      const fetchData = async () => {
        try {
          const resAgain = await axios.get(
            `https://be-song.vercel.app/v1/songs/listened/${user._id}`
          );
          setAgain(
            resAgain.data.listenAgain.map((song) => ({
              ...song,
              source: "again",
            }))
          );
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setRefreshData(false);
        }
      };

      fetchData();
    }
  }, [refreshData, user, user?._id, setRefreshData, setAgain]);

  //render trending
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resTreding = await axios.get(
          "https://be-song.vercel.app/v1/songs/trending"
        );
        setTreding(
          resTreding.data.map((song) => ({
            ...song,
            source: "trending",
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setRefreshData(false);
      }
    };
    fetchData();
  }, [refreshData, setRefreshData, setTreding]);

  //render recommend
  useEffect(() => {
    const fetchData = async () => {
      if (user != null) {
        try {
          const resRecommend = await axios.get(
            `https://be-song.vercel.app/v1/songs/recommend/${user._id}`
          );
          setRecommend(
            resRecommend.data.map((song) => ({
              ...song,
              source: "recommend",
            }))
          );
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setRefreshData(false);
        }
      }
    };
    fetchData();
  }, [refreshData, setRefreshData, setRecommend, user?._id]);
  return (
    <div className={cx("content")}>
      <div className={cx("header")}>
        <div onClick={() => setSearch(false)} className={cx("back")}>
          <img src={icon.back} alt="" />
        </div>
        {search && (
          <div className={cx("search-input")}>
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Bạn muốn nghe gì?"
              type="text"
            />
          </div>
        )}
        <div className={cx("wrap")}>
          <div className={cx("action")}>
            <div onClick={handleTheme} className={cx("theme")}>
              <img src={themeMode ? icon.light : icon.dark} alt="" />
            </div>
            <div className={cx("upload")}>
              <Upload />
            </div>
          </div>
          {user ? (
            <div className={cx("account")}>
              <Account />
            </div>
          ) : (
            <div className={cx("login")}>
              <Login />
            </div>
          )}
        </div>
      </div>
      {search ? (
        <Search searchValue={searchValue} />
      ) : (
        <div className={cx("main")}>
          {again && again.length > 0 && (
            <div className={cx("again")}>
              <h2>Nghe lại</h2>
              <Songs songs={again} />
            </div>
          )}
          <div className={cx("treding")}>
            <h2>Thịnh hành</h2>
            <Songs songs={treding} />
          </div>
          {recommend && recommend.length > 0 && (
            <div className={cx("recommend")}>
              <h2>Có thể bạn sẽ thích</h2>
              <Songs songs={recommend} />
            </div>
          )}
          {!user && (
            <div className={cx("allSong")}>
              <h2>Tất cả bài hát</h2>
              <Songs songs={allSong} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Content;
