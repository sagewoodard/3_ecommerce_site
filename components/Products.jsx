'use client'

import { useState } from "react";
import Portal from "./Portal";
import { useProducts } from "@/context/ProductContext";

export default function Products({ planner, stickers }) {
  const [portalImage, setPortalImage] = useState(null);
  const { handleIncrementProduct, cart } = useProducts();

  if (!planner && (!stickers || stickers.length === 0)) {
    return null; // Prevent rendering if data is missing
  }

  return (
    <>
      {portalImage && (
        <Portal handleClosePortal={() => setPortalImage(null)}>
          <div className="portal-content">
            <img
              className="img-display"
              src={`med_res/${portalImage}.jpeg`}
              alt={`${portalImage}-high-res`}
            />
          </div>
        </Portal>
      )}

      <div className="section-container">
        <div className="section-header">
          <h2>Shop The Selection</h2>
          <p>Organize & Accessorize</p>
        </div>

        {planner && (
          <div className="planner-container">
            <div>
              <button
                onClick={() => setPortalImage('planner')}
                className="img-button"
              >
                <img src="low_res/planner.jpeg" alt="planner-low-res" />
              </button>
            </div>
            <div className="planner-info">
              <p className="text-large planner-header">
                Medieval Dragon Month Planner
              </p>
              <h3>
                <span>$</span>{planner.default_price?.unit_amount ? (planner.default_price.unit_amount / 100).toFixed(2) : "N/A"}
              </h3>
              <p>
                Step into a realm of fantasy and organization with our{" "}
                <strong>Medieval Dragon Month Planner</strong>! This planner is
                perfect for planning your days with medieval flair.
              </p>
              <ul>
                <li>
                  <strong>Epic Dragon Artwork:</strong> Stunning hand-drawn
                  dragon motifs.
                </li>
                <li>
                  <strong>Fully Printable:</strong> Designed at high
                  resolution for any paper size.
                </li>
              </ul>
              <div className="purchase-btns">
                <button
                  onClick={() => handleIncrementProduct(planner.default_price?.id, 1, planner)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {stickers && stickers.length > 0 && (
        <div className="section-container">
          <div className="section-header">
            <h2>Collect Your Favorite Tech</h2>
            <p>Choose from our custom-designed tech logo stickers!</p>
          </div>
          <div className="sticker-container">
            {stickers.map((sticker, index) => {
              const stickerImgUrl = sticker.name
                .replaceAll(' Sticker.png', '')
                .replaceAll(' ', '_');
              return (
                <div key={index} className="sticker-card">
                  <button
                    onClick={() => setPortalImage(stickerImgUrl)}
                    className="img-button"
                  >
                    <img
                      src={`low_res/${stickerImgUrl}.jpeg`}
                      alt={`${stickerImgUrl}-low-res`}
                    />
                  </button>
                  <div className="sticker-info">
                    <p className="text-medium">{sticker.name}</p>
                    <p>{sticker.description}</p>
                    <h4>
                      <span>$</span>
                      {sticker.prices?.[0]?.unit_amount
                        ? (sticker.prices[0].unit_amount / 100).toFixed(2)
                        : "N/A"}
                    </h4>
                    <button
                      onClick={() => handleIncrementProduct(sticker.default_price?.id, 1, sticker)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}