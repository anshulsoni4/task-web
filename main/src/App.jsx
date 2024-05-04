import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchImages();
  }, [page]);

  const fetchImages = () => {
    fetch(`https://picsum.photos/v2/list?page=${page}&limit=4`)
      .then((response) => response.json())
      .then((data) => {
        setImages((prevImages) => [...prevImages, ...data]);
      })
      .catch((error) => console.error("Error fetching images:", error));
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="image-gallery bg-white dark:bg-gray-900">
      <Navbar />
      <div className="grid m-12 p-20" key={page}>
        {images.map((image) => (
          <div key={image.id} className="image-item m-4">
            <img className="rounded-lg" src={image.download_url} alt={image.author} />
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center m-auto p-1">
      <button
        className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={handleLoadMore}
      >
        Load More
      </button>
      </div>
    </div>
  );
};

export default ImageGallery;
