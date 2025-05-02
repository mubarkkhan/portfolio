'use client'
import PopupModal from "@/app/Components/Common/Popup";
import { handlePostAPI } from "@/app/Utilities/Utils";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogin() {
    const router = useRouter();
    const [sendData, setSendData] = useState({
        username: "",
        password: ""
    })
    const [popup, setPopup] = useState({
        open: false,
        title: "",
        message: "",
        type: "info",
        confirm: false,
    });
    function isValidEmail(username) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(username);
      }      
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!sendData?.username || !sendData?.password) {
            setPopup({ ...popup, open: true, title: "Ohh!", message: 'Both field are required', type: "info", confirm: false })
            return;
        }
        if (isValidEmail(sendData.username) === false) {
            setPopup({ ...popup, open: true, title: "Ohh!", message: 'Please fill valid email', type: "info", confirm: false })
            return;
        }
        try {
            const res = await handlePostAPI('admin/adminLogin', sendData, {})
            console.log(res)
            if (res.data.status === true) {
                const token = res?.data?.token
                Cookies.set('admMKey', token, {sameSite:"strict",expires:1,secure:true})
                setPopup({ ...popup, open: true, title: "Success!", message: `${res.data.message}`, type: "success", confirm: false });
                router.push('/Admin/Dashboard')
            }
            else if (res.data.status === false) {
                setPopup({ ...popup, open: true, title: "error!", message: `${res.data.message}`, type: "error", confirm: false });
            }
        }
        catch (e) {
            console.log("Login Error:", e);
            setPopup({...popup, open : true, title : "Ohh!", message : 'Api error', type : "info", confirm:false})
            return
        }
    }
    const handleConfirm = () => {
        alert("Action Confirmed!");
      setPopup({ ...popup, open: false });
      
      };
    return (
        <>
         <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
          <div className="text-center mb-6">
            {/* Optional Logo */}
            <div className="text-3xl font-bold text-blue-600">Admin Panel</div>
            <p className="text-gray-600 mt-1">Please login to continue</p>
          </div>
  
          <form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email Address
              </label>
                        <input
                            value={sendData?.username}
                            onChange={(e)=>{setSendData({...sendData, username : e.target.value})}}
                type="email"
                id="email"
                placeholder="admin@example.com"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
  
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password
              </label>
                        <input
                            value={sendData?.password}
                            onChange={(e)=>{setSendData({...sendData, password : e.target.value})}}
                type="password"
                id="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
  
                    <button
                        onClick={handleLogin}
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              🔐 Login
            </button>
          </form>
        </div>
            </div>
            <PopupModal
            isOpen={popup?.open}
            title={popup?.title}
            message={popup?.message}
            type={popup?.type}
            isConfirm={popup?.confirm}
            onClose={() => setPopup({ ...popup, open: false })}
            onConfirm={handleConfirm}
            />
        </>
    );
  }
  