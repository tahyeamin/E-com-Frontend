'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/axios';
import toast from 'react-hot-toast';
import { Loader2, UserCog, Mail, Shield, Calendar } from 'lucide-react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/users');
      setUsers(data);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: number, newRole: string) => {
    try {
      // API call to update role using integer ID and Enum string
      await api.patch(`/users/${userId}/role`, { role: newRole });
      toast.success(`Access updated to ${newRole}`);
      fetchUsers();
    } catch (err: any) {
      toast.error("Role update failed");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-blue-600 mb-2" size={40} />
        <p className="text-gray-500 font-black text-sm uppercase tracking-widest">Loading Users...</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200 text-white">
            <UserCog size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-gray-900">User Management</h1>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Administrator Access Control</p>
          </div>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm">
          <span className="text-[10px] font-black text-gray-400 uppercase">Records: </span>
          <span className="text-lg font-black text-blue-600">{users.length}</span>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-200">
              <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Account Info</th>
              <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Designation</th>
              <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Registration</th>
              <th className="p-5 text-[10px] font-black uppercase tracking-widest text-gray-500">Permissions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((u: any) => (
              <tr key={u.id} className="hover:bg-blue-50/30 transition-colors group">
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-black text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      {u.name ? u.name[0].toUpperCase() : 'U'}
                    </div>
                    <div>
                      <p className="text-sm font-black text-gray-900 uppercase tracking-tight">{u.name || 'N/A'}</p>
                      <div className="flex items-center gap-1 text-gray-400">
                        <Mail size={12} />
                        <span className="text-[11px] font-medium">{u.email}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-5">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter
                    ${u.role === 'ADMIN' ? 'bg-blue-600 text-white' : 
                      u.role === 'MANAGER' ? 'bg-green-600 text-white' : 
                      'bg-gray-800 text-gray-100'}`}
                  >
                    <Shield size={10} />
                    {u.role}
                  </span>
                </td>
                <td className="p-5">
                  <div className="flex items-center gap-1 text-gray-500 text-[11px] font-bold">
                    <Calendar size={12} />
                    {new Date(u.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="p-5">
                  <select 
                    defaultValue={u.role}
                    onChange={(e) => handleRoleChange(u.id, e.target.value)}
                    className="w-full max-w-[130px] bg-gray-50 border border-gray-200 text-gray-900 text-[11px] font-black rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                  >
                    <option value="CUSTOMER">CUSTOMER</option>
                    <option value="MANAGER">MANAGER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}