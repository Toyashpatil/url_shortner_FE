import React, { useContext, useState } from 'react'
import authContext from '../context/authContext'
import ReactDOM from 'react-dom'
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '../components/ui/accordion'
import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerFooter,
    DrawerClose,
} from '../components/ui/drawer'
import { Button } from '../components/ui/button'
import { FiCopy, FiLink, FiCheck } from 'react-icons/fi'
import QRCode from 'react-qr-code'

import {
    SwipeableList,
    SwipeableListItem,
    TrailingActions,
    SwipeAction
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'

function fallbackCopy(text) {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.setAttribute('readonly', '')
    textarea.style.position = 'fixed'
    textarea.style.top = '-1000px'
    document.body.appendChild(textarea)
    textarea.select()
    try {
        document.execCommand('copy')
    } catch (err) {
        console.error('Fallback copy failed', err)
    }
    document.body.removeChild(textarea)
}

// 2) Toast component via portal
function CopyToast({ show, onDone }) {
    React.useEffect(() => {
        if (show) {
            const id = setTimeout(onDone, 1500)
            return () => clearTimeout(id)
        }
    }, [show, onDone])

    if (!show) return null
    return ReactDOM.createPortal(
        <div className="fixed inset-x-0 bottom-4 flex justify-center z-[9999] pointer-events-none">
            <div className="bg-gray-800 bg-opacity-90 text-white px-4 py-2 rounded-lg shadow flex items-center space-x-2 animate-pulse text-sm">
                Copied!
            </div>
        </div>,
        document.body
    )
}


const LinkTableMobile = () => {
    const { tableData } = useContext(authContext)
    const [isCopied, setIsCopied] = useState(false)

    const handleCopy = text => {
        const triggerToast = () => setIsCopied(true)

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard
                .writeText(text)
                .then(triggerToast)
                .catch(() => {
                    fallbackCopy(text)
                    triggerToast()
                })
        } else {
            fallbackCopy(text)
            triggerToast()
        }
    }

    return (
        <div className="w-full flex items-center justify-center ml-0 ">
            {tableData?.length > 0 ? (
                <Accordion type="single" collapsible className="space-y-4">
                    {tableData.map((row, i) => {
                        const shortUrl = `${row.base_url}/${row.code}`
                        const formattedDate = new Date(row.created_at).toLocaleDateString()

                        return (
                            <AccordionItem
                                key={i}
                                value={`item-${i}`}
                                className=" "
                            >

                                <AccordionTrigger className="flex justify-between items-center">
                                    <span className="truncate">{shortUrl}</span>

                                    <FiCopy
                                        className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer"
                                        onClick={e => {
                                            e.stopPropagation()    // prevent accordion toggle
                                            handleCopy(shortUrl)
                                        }}
                                    />
                                </AccordionTrigger>

                                {/* Expanded content */}
                                <AccordionContent className="p-2 space-y-3 bg-[#181E29] rounded-b-lg">

                                    <div className="flex items-center space-x-2">
                                        <FiLink className="w-5 h-5 text-gray-400" />
                                        <a
                                            href={row.long_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {row.long_url}
                                        </a>
                                    </div>


                                    <div className='flex items-center justify-center'>
                                        <Drawer>
                                            <DrawerTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="w-[50%] flex items center justify-center py-1 text-black"
                                                >
                                                    Show QR
                                                </Button>
                                            </DrawerTrigger>

                                            <DrawerContent className="bg-[#181E29] p-4">
                                                <DrawerHeader>
                                                    <DrawerTitle className="text-white">
                                                        QR Code
                                                    </DrawerTitle>
                                                    <DrawerDescription className="text-gray-300">
                                                        Scan to open your link
                                                    </DrawerDescription>
                                                </DrawerHeader>

                                                <div className="flex justify-center my-4">
                                                    <QRCode value={shortUrl} size={180} />
                                                </div>

                                                <DrawerFooter>
                                                    <DrawerClose asChild>
                                                        <Button variant="outline" className="text-black hover:text-white hover:bg-black">Close</Button>
                                                    </DrawerClose>
                                                </DrawerFooter>
                                            </DrawerContent>
                                        </Drawer>
                                    </div>


                                    <div className="text-right text-xs text-gray-400">
                                        {formattedDate}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        )
                    })}
                </Accordion>
            ) : (
                <div className="text-center text-gray-400 py-4">
                    No links found
                </div>
            )}

            {/* Global “Copied!” toast */}
            <CopyToast show={isCopied} onDone={() => setIsCopied(false)} />
        </div>
    )
}

export default LinkTableMobile
