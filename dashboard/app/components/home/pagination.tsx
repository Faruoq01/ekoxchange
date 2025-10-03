const Pagination = ({
  total,
  perPage,
  currentPage,
}: {
  total: number;
  perPage: number;
  currentPage: number;
}) => {
  const totalPages = Math.ceil(total / perPage);

  return (
    <div className="flex justify-between items-center mt-6 text-sm text-text-light dark:text-text-dark">
      <p>
        Showing {(currentPage - 1) * perPage + 1} to{" "}
        {Math.min(currentPage * perPage, total)} of {total} results
      </p>
      <div className="flex items-center gap-2">
        <button className="px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
          &lt;
        </button>
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            className={`px-3 py-1 rounded-md ${
              currentPage === idx + 1
                ? "bg-primary text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            {idx + 1}
          </button>
        ))}
        <button className="px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
