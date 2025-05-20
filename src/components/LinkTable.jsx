import authContext from '../context/authContext';
import { useRef, useState, useEffect, useContext } from 'react';
import React from 'react';
import { FiCopy, FiLink, FiCheck } from 'react-icons/fi'; // Importing icons for copy and link
import { noScrollbarsClassName } from 'react-remove-scroll-bar'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "../components/ui/drawer"
import { Button } from './ui/button';
import QRCode from 'react-qr-code'
const LinkTable = () => {
    // Sample data similar to the image
    const [atBottom, setAtBottom] = useState(false);


    const handleScroll = (e) => {
        const el = e.target;
        const reachedEnd = el.scrollHeight - el.scrollTop - el.clientHeight < 2;
        setAtBottom(reachedEnd);
    };
    const { tableData } = useContext(authContext)

    useEffect(() => {
        if (tableData.length <= 5) {
            setAtBottom(true)
        }
    }, [tableData])
    const [isCopied, setIsCopied] = useState(false)
    const handleCopy = (text, index) => {
        navigator.clipboard.writeText(text).then(() => {
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 1500)
        })
    }

    return (
        <div className="w-full flex justify-center mb-2">
            {/* relative wrapper lets the overlay pin to the bottom */}
            <div className="relative w-full space-y-1 text-white rounded-lg">

                {/* ── header ── */}
                <div className="flex p-2 uppercase bg-[#181E29] rounded-tl-2xl rounded-tr-2xl text-md">
                    <div className="w-[25%]">Short Link</div>
                    <div className="w-[45%]">Original Link</div>
                    <div className="w-[10%]">QR Code</div>
                    <div className="w-[20%]">Date</div>
                </div>

                {/* ── scroll box ── */}
                <div
                    onScroll={handleScroll}
                    className="max-h-[250px] overflow-y-scroll scrollbar-translucent space-y-1"
                >
                    {tableData?.length > 0 ? (
                        tableData.map((row, i) => (
                            <div key={i} className="flex p-2 justify-between bg-gray-800/30 backdrop_glass">
                                {/* Short */}
                                <div className="w-[25%] flex items-center space-x-3">
                                    <span className=" text-sm">{`${row.base_url}/${row.code}`}</span>
                                    <div className='hover:bg-neutral-700 rounded-full '>
                                        <FiCopy
                                            className="w-7 pointer-cursor h-7 bg- bg-op p-1.5 text-gray-400 hover:text-white cursor-pointer"
                                            onClick={() => handleCopy(row.base_url+"/"+row.code, i)}
                                        />
                                    </div>
                                </div>

                                {/* Original */}
                                <div className="w-[35%] flex items-center space-x-3">
                                    <FiLink className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                                    <span className="truncate text-sm">{row.long_url}</span>
                                </div>

                                {/* QR */}
                                <div className="w-[20%] flex items-center justify-center">
                                    <Drawer>
                                        <DrawerTrigger asChild>
                                            <span className="text-xs text-gray-400 ml-12 cursor-pointer bg-neutral-700 rounded-md px-2 py-1">
                                                QR
                                            </span>
                                        </DrawerTrigger>

                                        <DrawerContent className="p-4 bg-[#181E29]">
                                            <div className="mx-auto w-full max-w-sm flex flex-col items-center justify-center">
                                                <DrawerHeader>
                                                    <DrawerTitle><h1 className='text-white' >QR Code</h1></DrawerTitle>
                                                    <DrawerDescription>Scan to open your link</DrawerDescription>
                                                </DrawerHeader>

                                                <div className="mt-4 bg-white p-6 rounded-lg shadow-md">
                                                    {/* row.base_url (or whichever field holds your short URL) */}
                                                    <QRCode value={row.base_url+"/"+row.code} size={180} />
                                                </div>

                                                <DrawerFooter className="mt-4">
                                                    <DrawerClose asChild>
                                                        <Button variant="outline" className=" text-black hover:bg-black hover:text-white cursor-pointer w-full">
                                                            Close
                                                        </Button>
                                                    </DrawerClose>
                                                </DrawerFooter>
                                            </div>
                                        </DrawerContent>
                                    </Drawer>
                                </div>


                                {/* Date */}
                                <div className="w-[20%] flex items-center space-x-3">
                                    <span className="text-sm">{new Date(row.created_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-400 py-4">No links found</div>
                    )}
                </div>

                {/* ── constant bottom blur ── */}
                {!atBottom && (
                    <div
                        className="
              pointer-events-none absolute bottom-0 left-0 w-full h-10
              bg-gradient-to-t from-[#0F131C] via-[#0F131C]/75 to-transparent
              backdrop-blur-md
            "
                    />
                )}
            </div>
            {isCopied && (
                <div
                    className={`
      fixed bottom-6 inset-x-0 flex justify-center z-50 pointer-events-none
      transition-all duration-300 ease-out
      ${isCopied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
    `}
                >
                    <div
                        className="
        bg-gray-800 bg-opacity-90 text-white
        px-6 py-3 rounded-lg shadow-lg
        flex items-center space-x-2
      "
                    >
                        <FiCheck className="w-5 h-5 text-green-400" />
                        <span className="font-medium">Link copied to clipboard</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LinkTable;