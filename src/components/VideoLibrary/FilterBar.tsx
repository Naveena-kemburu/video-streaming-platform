interface FilterBarProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function FilterBar({ categories, selectedCategory, onCategoryChange }: FilterBarProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Video categories">
      <button
        onClick={() => onCategoryChange('All')}
        className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors focus-visible ${
          selectedCategory === 'All'
            ? 'bg-primary-500 text-white'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
        }`}
        role="tab"
        aria-selected={selectedCategory === 'All'}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors focus-visible ${
            selectedCategory === category
              ? 'bg-primary-500 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          role="tab"
          aria-selected={selectedCategory === category}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
