import { useState } from "react";
import { motion } from "framer-motion";
import { StarIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";
import Button from "../../ui/Button";

// Mock reviews data
const mockReviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    date: "2024-01-15",
    title: "Excellent quality!",
    comment:
      "This product exceeded my expectations. The quality is outstanding and it arrived quickly. Highly recommend!",
    verified: true,
    helpful: 12,
  },
  {
    id: 2,
    name: "Mike Chen",
    rating: 4,
    date: "2024-01-10",
    title: "Good value for money",
    comment:
      "Great product overall. The only minor issue is that it runs a bit small, so I would recommend ordering one size up.",
    verified: true,
    helpful: 8,
  },
  {
    id: 3,
    name: "Emma Wilson",
    rating: 5,
    date: "2024-01-05",
    title: "Love it!",
    comment:
      "Perfect fit and great quality. The color is exactly as shown in the pictures. Will definitely buy again.",
    verified: false,
    helpful: 15,
  },
];

const ratingDistribution = [
  { stars: 5, count: 85, percentage: 68 },
  { stars: 4, count: 25, percentage: 20 },
  { stars: 3, count: 10, percentage: 8 },
  { stars: 2, count: 3, percentage: 2 },
  { stars: 1, count: 2, percentage: 2 },
];

function StarRating({ rating, size = "sm" }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) =>
        i < rating ? (
          <StarSolidIcon
            key={i}
            className={`${sizeClasses[size]} text-yellow-400`}
          />
        ) : (
          <StarIcon key={i} className={`${sizeClasses[size]} text-gray-300`} />
        ),
      )}
    </div>
  );
}

function ReviewItem({ review }) {
  const [isHelpful, setIsHelpful] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-gray-200 pb-6 last:border-b-0"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <UserCircleIcon className="h-10 w-10 text-gray-400" />
        </div>

        <div className="flex-grow space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-gray-800">{review.name}</h4>
                {review.verified && (
                  <span className="rounded bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                    Verified Purchase
                  </span>
                )}
              </div>
              <div className="mt-1 flex items-center gap-2">
                <StarRating rating={review.rating} />
                <span className="text-sm text-gray-500">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h5 className="mb-2 font-medium text-gray-800">{review.title}</h5>
            <p className="leading-relaxed text-gray-700">{review.comment}</p>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <button
              onClick={() => setIsHelpful(!isHelpful)}
              className={`flex items-center gap-1 transition-colors ${
                isHelpful
                  ? "text-[var(--primary)]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <span>👍</span>
              <span>Helpful ({review.helpful + (isHelpful ? 1 : 0)})</span>
            </button>
            <button className="text-gray-500 transition-colors hover:text-gray-700">
              Report
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProductReviews({
  productId,
  averageRating = 4.5,
  totalReviews = 125,
}) {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  const displayedReviews = showAllReviews
    ? mockReviews
    : mockReviews.slice(0, 2);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">
        Customer Reviews
      </h2>

      {/* Rating Summary */}
      <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Overall Rating */}
        <div className="text-center md:text-left">
          <div className="mb-2 flex items-center justify-center gap-2 md:justify-start">
            <span className="text-4xl font-bold text-gray-800">
              {averageRating}
            </span>
            <div>
              <StarRating rating={Math.floor(averageRating)} size="lg" />
              <p className="mt-1 text-sm text-gray-500">
                Based on {totalReviews} reviews
              </p>
            </div>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {ratingDistribution.map((item) => (
            <div key={item.stars} className="flex items-center gap-3 text-sm">
              <span className="w-8 text-gray-600">{item.stars}★</span>
              <div className="h-2 flex-grow rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-yellow-400 transition-all duration-500"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <span className="w-8 text-right text-gray-600">{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">
          Reviews ({mockReviews.length})
        </h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[var(--primary)] focus:ring-[var(--primary)]"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highest">Highest Rating</option>
          <option value="lowest">Lowest Rating</option>
          <option value="helpful">Most Helpful</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="mb-6 space-y-6">
        {displayedReviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>

      {/* Show More Button */}
      {!showAllReviews && mockReviews.length > 2 && (
        <div className="text-center">
          <Button variant="secondary" onClick={() => setShowAllReviews(true)}>
            Show All {mockReviews.length} Reviews
          </Button>
        </div>
      )}

      {/* Write Review Button */}
      <div className="mt-8 border-t border-gray-200 pt-6">
        <div className="text-center">
          <h4 className="mb-2 font-semibold text-gray-800">
            Share your experience
          </h4>
          <p className="mb-4 text-gray-600">
            Help other customers by writing a review
          </p>
          <Button>Write a Review</Button>
        </div>
      </div>
    </div>
  );
}

export default ProductReviews;
