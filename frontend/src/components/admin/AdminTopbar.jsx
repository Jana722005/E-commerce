function AdminTopbar() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <div className="bg-white shadow-md p-6 flex items-center justify-between">

      <div>

        <h1 className="text-3xl font-bold text-gray-800">
          Musalamma Grocery Admin
        </h1>

        <p className="text-gray-500 mt-1">
          Manage products and orders
        </p>

      </div>

      <div className="bg-green-100 text-green-700 px-5 py-3 rounded-xl font-semibold">
        {user?.name || "Admin"}
      </div>
    </div>
  );
}

export default AdminTopbar;