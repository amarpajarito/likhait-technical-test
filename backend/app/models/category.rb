class Category < ApplicationRecord
  has_many :expenses, dependent: :destroy

  # Match the DB constraints so failures return clean errors, not exceptions
  validates :name, presence: true, uniqueness: true
end
