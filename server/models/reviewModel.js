import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      trim: true,
      minlength: [2, "Position must be at least 2 characters"],
      maxlength: [200, "Position cannot exceed 200 characters"],
    },
    review: {
      type: String,
      required: [true, "Review text is required"],
      trim: true,
      minlength: [10, "Review must be at least 10 characters"],
      maxlength: [2000, "Review cannot exceed 2000 characters"],
    },
    rating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
      default: 5,
    },
    isApproved: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    helpfulCount: {
      type: Number,
      default: 0,
    },
    reportCount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "flagged"],
      default: "approved",
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.index({ createdAt: -1 });
reviewSchema.index({ status: 1, isApproved: 1 });
reviewSchema.index({ name: "text", review: "text" });

reviewSchema.pre("save", function (next) {
  this.name = this.name.trim().replace(/\s+/g, " ");
  this.position = this.position.trim().replace(/\s+/g, " ");
  this.review = this.review.trim().replace(/\s+/g, " ");
  next();
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
