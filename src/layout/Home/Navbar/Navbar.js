import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./navbar.module.scss";
import icon from "~/assets/icon";
import { useAppContext } from "~/component/context/AppContext";

const cx = classNames.bind(styles);

function Navbar() {
  const { search, setSearch } = useAppContext();
  const [openLibrary, setOpenLibrary] = useState(false);
  const [addLibrary, setAddLibrary] = useState([]);
  const [dataLibrary, setDataLibrary] = useState([
    { title: "Yêu thích", data: [{}] },
  ]);

  const handleaddLibrary = () => {
    const trimmedLibrary = addLibrary.trim();

    if (trimmedLibrary !== "") {
      const newLibraryItem = {
        title: trimmedLibrary,
        data: [{}],
      };

      setDataLibrary((prevDataLibrary) => [...prevDataLibrary, newLibraryItem]);

      setAddLibrary("");
    } else {
      setAddLibrary("");
    }
  };

  const handleDeleteLibrary = (libraryItem) => {
    const updatedDataLibrary = dataLibrary.filter(
      (item) => item !== libraryItem
    );

    setDataLibrary(updatedDataLibrary);
  };

  return (
    <div className={cx("navbar")}>
      <div className={cx("control")}>
        <div onClick={() => setSearch(false)} className={cx("home")}>
          <img src={icon.home} alt="" />
          <h2>Trang chủ</h2>
        </div>
        <div onClick={() => setSearch(!search)} className={cx("search")}>
          <img src={icon.search} alt="" />
          <h2>Tìm kiếm</h2>
        </div>
      </div>
      <div className={cx("list")}>
        <div className={cx("header")}>
          <div className={cx("wrap")}>
            <div className={cx("title")}>
              <img src={icon.library} alt="" />
              <h2>Thư viện</h2>
            </div>
            <img
              width={30}
              onClick={() => setOpenLibrary(!openLibrary)}
              src={icon.add}
              alt=""
            />
          </div>
          <div className={cx("input-add")}>
            {openLibrary && (
              <>
                <input
                  placeholder="Bạn muốn để tên là gì?"
                  value={addLibrary}
                  type="text"
                  onChange={(e) => setAddLibrary(e.target.value)}
                />
                <button onClick={handleaddLibrary}>
                  <p>Tạo</p>
                </button>
              </>
            )}
          </div>
        </div>
        <div className={cx("list-library")}>
          {dataLibrary.map((item, i) => (
            <div key={i} className={cx("library")}>
              <h3>{item.title}</h3>
              {i !== 0 && (
                <img
                  onClick={() => handleDeleteLibrary(item)}
                  src={icon.delete}
                  alt=""
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
