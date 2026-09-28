import React from "react";
import "./Skeleton.css";

const Skeleton = ({ 
  variant = "text", 
  width, 
  height, 
  className = "", 
  count = 1,
  animation = "pulse" 
}) => {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  return (
    <div className={`skeleton-wrapper ${className}`}>
      {skeletons.map((index) => (
        <div
          key={index}
          className={`skeleton skeleton-${variant} skeleton-${animation}`}
          style={{
            width: width || "100%",
            height: height || "auto",
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

// Product Card Skeleton
export const ProductCardSkeleton = () => (
  <div className="product-card-skeleton">
    <Skeleton variant="rectangular" height="200" className="skeleton-image" />
    <div className="skeleton-content">
      <Skeleton variant="text" width="60%" height="20" className="skeleton-category" />
      <Skeleton variant="text" width="90%" height="24" className="skeleton-title" />
      <Skeleton variant="text" width="70%" height="16" className="skeleton-desc" />
      <div className="skeleton-meta">
        <Skeleton variant="text" width="30%" height="24" className="skeleton-price" />
        <Skeleton variant="text" width="20%" height="16" className="skeleton-weight" />
      </div>
    </div>
    <Skeleton variant="rectangular" height="40" className="skeleton-button" />
  </div>
);

// Table Row Skeleton
export const TableRowSkeleton = ({ columns = 4 }) => (
  <div className="table-row-skeleton">
    {Array.from({ length: columns }).map((_, i) => (
      <Skeleton key={i} variant="text" height="16" className="skeleton-cell" />
    ))}
  </div>
);

// Card Skeleton
export const CardSkeleton = ({ height = "200px" }) => (
  <div className="card-skeleton">
    <Skeleton variant="rectangular" height={height} className="skeleton-card" />
  </div>
);

// Avatar Skeleton
export const AvatarSkeleton = ({ size = 40 }) => (
  <Skeleton 
    variant="circular" 
    width={size} 
    height={size} 
    className="skeleton-avatar" 
  />
);

export default Skeleton;
