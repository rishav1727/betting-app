import AdminLayout from "../layout/AdminLayout"

export default function Users() {
  return (
    <AdminLayout>

      <h1 className="text-3xl font-bold mb-6">👥 Users</h1>

      <div className="bg-gray-800 rounded-xl p-6">

        <table className="w-full">

          <thead>
            <tr className="text-left border-b border-gray-700">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Balance</th>
            </tr>
          </thead>

          <tbody>

            <tr className="border-b border-gray-700">
              <td className="p-2">Ravi Kumar</td>
              <td className="p-2">ravi@gmail.com</td>
              <td className="p-2 text-green-400">₹5,000</td>
            </tr>

            <tr>
              <td className="p-2">Aman Singh</td>
              <td className="p-2">aman@gmail.com</td>
              <td className="p-2 text-green-400">₹2,300</td>
            </tr>

          </tbody>

        </table>

      </div>

    </AdminLayout>
  )
}