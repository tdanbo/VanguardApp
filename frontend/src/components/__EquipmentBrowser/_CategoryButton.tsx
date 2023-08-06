interface ButtonProps {
  category: string;
}

function CategoryButton({ category }: ButtonProps) {
  return (
    <button className="m-1 rounded bg-blue-500 p-1 font-bold text-white hover:bg-blue-700">
      {category}
    </button>
  );
}

export default CategoryButton;
