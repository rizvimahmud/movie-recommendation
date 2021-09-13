function AddForm() {
  return (
    <div className="py-6">
      <div className="w-full">
        <form className="flex justify-between items-center space-x-3 w-full h-12 bg-gray-50 px-4 py-3 rounded-md border border-gray-200">
          <input
            type="text"
            placeholder="Movie name..."
            className="flex-1 appearance-none border-0 ring-0 outline-none group bg-gray-50 text-gray-900"
          />
          <button className="px-6 xs:px-4  py-[6px] bg-gray-700 rounded-md text-white hover:bg-gray-900 active:bg-gray-500">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddForm;
