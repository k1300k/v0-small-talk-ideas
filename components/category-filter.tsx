"use client"

interface Category {
  id: string
  label: string
  icon: string
}

interface CategoryFilterProps {
  categories: Category[]
  selectedCategory: string
  onSelectCategory: (categoryId: string) => void
}

export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
            selectedCategory === category.id
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
              : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
          }`}
        >
          <span className="text-lg">{category.icon}</span>
          {category.label}
        </button>
      ))}
    </div>
  )
}
