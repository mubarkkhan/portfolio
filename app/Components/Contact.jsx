'use client'

import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setScrollInto } from "../Toolkit/project_slice"
import { handlePostAPI } from "../Utilities/Utils"
import PopupModal from "./Common/Popup"

export default function Contact() {
    const sliceData = useSelector((state) => state.proSlice.value)
    const contact = useRef(null)
    const [loading, setLoading] = useState(false)
    const [popup, setPopup] = useState({
        open: false,
        title: "",
        message: "",
        type: "info",
        confirm: false,
      });
    const dispatch = useDispatch();
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !sliceData?.isScrolling) {
                    dispatch(setScrollInto("contact")); // Update state when visible
                }
            },
            { threshold: 0.6 } // 60% of the section is visible
        );

        if (contact.current) {
            observer.observe(contact.current);
        }

        return () => {
            if (contact.current) {
                observer.unobserve(contact.current);
            }
        };
    }, [sliceData?.isScrolling]);
    useEffect(() => {
        if (sliceData?.scrollInto === "contact" && contact.current) {
            contact.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [sliceData])
    const [sendData, setSendData] = useState({
        name: "",
        email: "",
        message: "",
        subject: ""
    })
    const handleSendEmail = async (e) => {
        e.preventDefault();
        if (!sendData?.name || !sendData?.email || !sendData?.message || !sendData?.subject) {
            setPopup({...popup, open : true, title : "Ohh!", message : 'Please fill all required info', type : "info", confirm:false})
            return
        }
        else {
            setLoading(true)
            try {
                const res = await handlePostAPI('user/sendemail', sendData, {})
                if (res.data.status === true) {
                    setLoading(false)
                    setPopup({...popup, open : true, title : "Success!", message : `${res.data.message}`, type : "success", confirm:false})
                }
            }
            catch (e) {
                console.log(e, 'error')
                setLoading(false);
            }
        }
    }
    const handleConfirm = () => {
        alert("Action Confirmed!");
        setPopup({ ...popup, open: false });
      };
    return (
        <>
        <section ref={contact} className="py-20 bg-white dark:bg-gray-900 text-center px-6">
            <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6">Let's Work Together!</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-10">Connect with me via email or social media, or send a message directly.</p>
            
            <div className="flex justify-center space-x-6 mb-8">
                <a href="https://www.linkedin.com/in/mubark-khan-55a366281/" target="_blank" className="text-blue-600 dark:text-blue-400 text-xl font-medium hover:underline">LinkedIn</a>
                <a href="https://github.com/mubarkkhan" target="_blank" className="text-blue-600 dark:text-blue-400 text-xl font-medium hover:underline">GitHub</a>
            </div>
            
            <div className="max-w-lg mx-auto bg-gray-100 dark:bg-gray-800 p-8 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105">
                <form className="flex flex-col space-y-6">
                    <input 
                        type="text" 
                        placeholder="Your Name" 
                        value={sendData?.name}
                        onChange={(e)=>{setSendData({...sendData, name : e.target.value})}}
                        className="w-full p-4 text-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input 
                        type="email" 
                        placeholder="Your Email" 
                        value={sendData?.email}
                        onChange={(e)=>{setSendData({...sendData, email : e.target.value})}}
                        className="w-full p-4 text-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input 
                        type="text" 
                        placeholder="Your Subject" 
                        value={sendData?.subject}
                        onChange={(e)=>{setSendData({...sendData, subject : e.target.value})}}
                        className="w-full p-4 text-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <textarea 
                        placeholder="Your Message" 
                        rows="5" 
                        defaultValue={sendData?.message}
                        onChange={(e)=>{setSendData({...sendData, message : e.target.value})}}
                        className="w-full p-4 text-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    ></textarea>
                    <button 
                        onClick={handleSendEmail}
                        type="submit" 
                        className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-500 transition transform hover:scale-105"
                    >
                        {loading === true ? (<div class="flex items-center justify-center space-x-2">
  <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:0s]"></div>
  <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
  <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
</div>
) : 'Send Message'}
                    </button>
                    <p className="text-green-600 dark:text-green-400 text-lg hidden" id="success-message">Message sent successfully!</p>
                </form>
            </div>
            </section>
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