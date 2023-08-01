interface ButtonProps {
  category: string;
}

function CategoryButton({ category }: ButtonProps) {
  return (
    <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
      {category}
    </button>
  );
}

export default CategoryButton;
