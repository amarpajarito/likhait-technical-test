class Expense < ApplicationRecord
  belongs_to :category

  # Reject future dates; expenses can only be logged for today or earlier
  validates :date, comparison: { less_than_or_equal_to: -> { Date.current }, message: "cannot be in the future" }
end
