import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './index.css'
const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchImages();
  }, [page]);

  const fetchImages = () => {
    fetch(`https://picsum.photos/v2/list?page=${page}&limit=10`)
      .then(response => response.json())
      .then(data => {
        setImages(prevImages => [...prevImages, ...data]);
      })
      .catch(error => console.error('Error fetching images:', error));
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="image-gallery">
      <h1>Image Gallery</h1>
      <div className="grid">
        {images.map(image => (
          <div key={image.id} className="image-item">
            <img src={image.download_url} alt={image.author} />
          </div>
        ))}
      </div>
      <button onClick={handleLoadMore}>Load More</button>
    </div>
  );
};

export default ImageGallery;
