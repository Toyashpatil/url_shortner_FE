import { AuroraText } from '../components/magicui/aurora-text'
import React, { useContext, useState, useEffect } from 'react'
import Sign from "../assets/svgs/sign.svg"
import Linki from "../assets/svgs/link.svg"
import Arrow from "../assets/svgs/arrow.svg"
import LinkTable from '../components/LinkTable'
import { Globe } from "../components/magicui/globe";
import { isMobile } from 'react-device-detect'
import authContext from '../context/authContext'
import { useNavigate, useNavigation } from 'react-router-dom'
import { FaSpinner } from 'react-icons/fa'
import LinkTableMobile from '../components/LinkTableMobile'




const Home = () => {
    const navigate = useNavigate()
    useEffect(() => {

        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
        GetUrls()
    }, [localStorage.getItem('token')])

    const { isLoggedIn, setIsLoggedIn, logout, GetUrls } = useContext(authContext)
    const [urlData, setUrlData] = useState({
        shortLink: '',
        originalLink: '',
        date: '12-12-12',
    })
    const { setTableData, createUrl } = useContext(authContext)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const handleSubmit = async () => {
        setIsSubmitting(true)
        try {
            if (urlData.originalLink === '') {
                alert("Please Enter Url")
                setIsSubmitting(false)
            } else {
                await createUrl(urlData.originalLink)
                setUrlData({
                    shortLink: '',
                    originalLink: '',
                    date: '12-12-12',
                })
            }
        } finally {
            setIsSubmitting(false)
        }
    }
    const handleInput = (e) => {
        const { name, value } = e.target
        console.log(name)
        setUrlData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })

    }
    return (
        <div className='p-2 space-y-10'>
            <div className=' w-full flex items-center justify-center'>
                <div className='  w-[100vw] mt-2 flex items-center justify-between '>
                    <div className=' flex items-center justify-center'>
                        <div className='  flex items-center justify-center text-4xl font-bold '>
                            <AuroraText className='flex items-center justify-center' >Linky</AuroraText></div>
                    </div>
                    {
                        isMobile ? <button onClick={logout} className='bg-blue-600 p-2 shadow-indigo-500/50 text-white rounded-full shadow-lg hover:shadow-blue-500/50 transition-shadow duration-300'>
                            <div>
                                Logout
                            </div>
                        </button> :
                            isLoggedIn ? (
                                <button onClick={logout} className='bg-blue-600 p-2 shadow-indigo-500/50 text-white rounded-full shadow-lg hover:shadow-blue-500/50 transition-shadow duration-300'>
                                    <div>
                                        Logout
                                    </div>
                                </button>) : (<div className='flex gap-2'>

                                    <button className='bg-[#181E29] p-1.5 border-[#353C4A] border-2 gap-2 flex items-center justify-center mr-4 ml-4 rounded-4xl'>
                                        <div className='flex items-center justify-center'>Login</div>
                                        <div className='flex items-center justify-center'><img className='h-[20px] w-[20px]' src={Sign}></img></div>
                                    </button>
                                    <button className='bg-blue-600 p-1.5 shadow-indigo-500/50 text-white rounded-full shadow-lg hover:shadow-blue-500/50 transition-shadow duration-300'>
                                        <div>
                                            Register
                                        </div>
                                    </button>



                                </div>)}




                </div>


            </div>
            <div className='w-full space-y-2'>
                <div className='text-3xl font-medium sm:text-4xl lg:text-6xl md:text-6xl flex text-center items-center justify-center'>
                    <AuroraText>Shorten Your Loooong Links :{`)`}</AuroraText>
                </div>
                <div className='w-full flex items-center justify-center'>
                    <div className='flex  lg:w-[30%] text-center items-center justify-center'>
                        Linkly is an efficient and easy-to-use URL shortening service that streamlines your online experience.
                    </div>
                </div>

            </div>
            <div className="w-full px-4 flex items-center justify-center">
                <div className="
      relative
      flex sm:flex-row items-center justify-center
      w-full sm:w-2/3 md:w-1/2 lg:w-2/5
      p-1
      bg-slate-900 rounded-full overflow-hidden
      
    ">

                    {/* left icon */}
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-20">
                        <img src={Linki} alt="link icon" className="h-5 w-5" />
                    </span>

                    {/* the input */}
                    <input
                        type="text"
                        name='originalLink'
                        value={urlData.originalLink}
                        onChange={handleInput}
                        placeholder="Enter link to make it short"
                        className="
        w-full sm:flex-1
        bg-transparent text-white placeholder-gray-400
        py-3 pl-12 pr-4
        focus:outline-none
      "
                    />

                    {/* the button */}
                    <button
                        onClick={handleSubmit}
                        className="
       
        bg-blue-600 hover:bg-blue-700
        text-white font-semibold
        py-4 px-6 rounded-full
        flex items-center justify-center

      "
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? <FaSpinner className="h-4 w-4 animate-spin" />
                            : <img src={Arrow} alt="shorten" />
                        }
                    </button>
                </div>
            </div>



            {/* <div className='w-full flex items-center justify-center '>
                <div className='flex w-[40%] relative bg-amber-400 items-center justify-between'>
                    <div className='absolute left-3  z-20'>
                        photo
                    </div>
                    <div className='bg-red-600 z-10 p-2 w-[75%]'>
                        <input className=' w-full ' placeholder='Enter text here'>

                        </input>
                    </div>
                    <div className=' w-[25%] z-10 p-2 bg-red-500'>
                        click
                    </div>
                </div>
            </div> */}
            {
                isMobile ? <div className='  w-full items-center justify-center'>
                    <div className='w-full flex items-center justify-center '>
                        <div className=' w-[90%] flex items-center justify-center'>
                            <LinkTableMobile/>
                        </div>
                    </div>
                </div> : <div className='  w-full items-center justify-center'>
                    <div className='w-full flex items-center justify-center '>
                        <div className=' w-[90%] flex items-center justify-center'>
                            <LinkTable />
                        </div>
                    </div>
                </div>
            }


        </div>
    )
}

export default Home