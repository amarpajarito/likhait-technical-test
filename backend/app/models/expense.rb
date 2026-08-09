class Expense < ApplicationRecord
  belongs_to :category

  # Reject future dates; expenses can only be logged for today or earlier
  validates :date, comparison: { less_than_or_equal_to: -> { Date.current }, message: "cannot be in the future" }

  # Reject blank descriptions and non-positive and out-of-range amounts (optional on the maximum amount)
  validates :description, presence: true
  validates :amount, presence: true, numericality: { greater_than: 0, less_than_or_equal_to: 100_000_000 }
end
