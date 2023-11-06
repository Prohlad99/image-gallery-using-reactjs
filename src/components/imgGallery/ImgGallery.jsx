import { useEffect, useRef, useState } from "react";
import { BsImage } from "react-icons/bs";
import {
  SortableContainer,
  SortableElement,
  arrayMove,
} from "react-sortable-hoc";
import imageItems from "../../utilities/images";
import "./style.css";

const ImgGallery = () => {
  const [images, setImages] = useState([]);
  const [removeItems, setRemoveItems] = useState([]);

  // add remove items
  const handleCheckboxChange = (value) => {
    if (removeItems.includes(value)) {
      setRemoveItems(removeItems.filter((item) => item !== value));
    } else {
      setRemoveItems([...removeItems, value]);
    }
  };

  //handle remove items
  const handleDelete = () => {
    const filteredItems = images.filter((item) => !removeItems.includes(item));
    setImages(filteredItems);
    setRemoveItems([]);
  };

  // set images initial loading
  useEffect(() => {
    setImages(imageItems);
  }, []);

  // handle upload new image
  const fileInputRef = useRef(null);
  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  const handleAddImage = (e) => {
    const file = e.target.files[0];
    const newImg = URL.createObjectURL(file);
    setImages([...imageItems, newImg]);
  };
  //end handle upload new image

  // sort items after drag and drop
  const onSortEnd = ({ oldIndex, newIndex }) => {
    setImages(arrayMove(images, oldIndex, newIndex));
  };
  // item which I will sort using drag and drop
  const SortableItem = SortableElement(({ item, val }) =>
    val === 0 ? (
      <div className="border-2 full relative w-full rounded-md hover:bg-slate-400 hover:cursor-pointer bigImg">
        <img className="hover:transform absolute img" src={item} alt="" />
        <input
          className={`m-4 absolute checkbox  ${
            removeItems.includes(item) ? "checked" : null
          }`}
          type="checkbox"
          name="images"
          value={item}
          checked={removeItems.includes(item)}
          onChange={() => handleCheckboxChange(item)}
        />
      </div>
    ) : (
      <div className="border-2 h-full relative w-full rounded-md hover:bg-slate-400 hover:cursor-pointer">
        <img
          className="w-full  hover:transform absolute img"
          src={item}
          alt=""
        />
        <input
          className={`m-4 absolute checkbox ${
            removeItems.includes(item) ? "checked" : null
          }`}
          type="checkbox"
          name="images"
          value={item}
          checked={removeItems.includes(item)}
          onChange={() => handleCheckboxChange(item)}
        />
      </div>
    )
  );

  // item container where I will sort using drag and drop
  const SortableList = SortableContainer(({ items }) => (
    <div className="container imgContainer">
      {items.map((item, index) => (
        <SortableItem key={index} index={index} val={index} item={item} />
      ))}
      {/* upload image  */}
      <div
        onClick={handleImageClick}
        className="bg-[#F6F6F6] flex text-center justify-center items-center border-2 border-[#D7DADC] p-4 w-[150px] h-[150px] rounded-md border-dotted cursor-pointer"
      >
        <div>
          <span className="w-full flex justify-center mb-3 text-xl">
            <BsImage />
          </span>
          <span>Add Images</span>
        </div>
        <input
          className="hidden border-2"
          onChange={(e) => handleAddImage(e)}
          ref={fileInputRef}
          type="file"
        />
      </div>
      {/* end upload image  */}
    </div>
  ));

  return (
    <div>
      {/* container */}
      <div className="border-[1px] border-[#8D9095] bg-[#FDFDFD] md:mx-16 mx-2 mt-4 mb-8 rounded-md">
        {/* heading */}
        <div className="border-b-[1.5px] p-4">
          {removeItems?.length > 0 ? (
            <div>
              {removeItems?.length < 2 ? (
                <div className="flex justify-between">
                  <div className="flex gap-2 text-xl font-semibold items-center">
                    <input type="checkbox" checked />
                    <h2>{removeItems.length} File Selected</h2>
                  </div>
                  <button
                    onClick={handleDelete}
                    className="text-xl font-semibold text-red-500"
                  >
                    Delete File
                  </button>
                </div>
              ) : (
                <div className="flex justify-between">
                  <div className="flex gap-2 text-xl font-semibold items-center">
                    <input type="checkbox" checked />
                    <h2>{removeItems.length} Files Selected</h2>
                  </div>
                  <button
                    onClick={handleDelete}
                    className="text-xl font-semibold text-red-500"
                  >
                    Delete Files
                  </button>
                </div>
              )}
            </div>
          ) : (
            <h1 className="font-bold">Gallery</h1>
          )}
        </div>
        {/* end heading */}

        {/* image container */}
        <div className="p-4 ">
          <div className="justify-items-center  ">
            <SortableList
              items={images}
              onSortEnd={onSortEnd}
              axis="xy"
              helperClass="sortableList"
            />
          </div>
        </div>
        {/* end image container */}
      </div>
    </div>
  );
};

export default ImgGallery;
