'use client'

'use client'

import { useState, useRef, useEffect } from "react";

export default function ImageBanner() {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, []);

  return (
    <div className="banner-images">
      <img
        className="low-res-img"
        src="low_res/banner.jpeg"
        alt="banner-low-res"
      />
      <img
        ref={imgRef}
        className="high-res-img"
        src="med_res/banner.png"
        alt="banner-high-res"
        style={{ opacity: isLoaded ? 1 : 0 }}
        onLoad={() => setIsLoaded(true)}
      />
      <div className="cta-btns-container">
        <div>
          <div>
            <h3>Welcome to</h3>
            <h1>SageAinsley's E-Commerce Site</h1>
          </div>
          <div>
            <button>Shop Stickers</button>
            <button>Shop Planner</button>
          </div>
        </div>
      </div>
    </div>
  );
}