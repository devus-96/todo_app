"use client"
import React, { useEffect, useRef, useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FieldErrors } from "react-hook-form"
import { Todo } from "@/types"
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AxiosError } from "axios"
import clsx from "clsx"



export function GlobalError ({
    appError,
    setError
}:{
    setError: React.Dispatch<React.SetStateAction<string[]>>,
    appError: string[],
}) {
    const [index, setIndex] = useState(0)

    return (
        <div className={clsx('absolute top-0 w-full z-[1000] h-[60px] bg-red-100/90 border-red-800 border-2 text-white flex items-center', {
            'hidden': appError.length === 0,
        })}>
             <Alert variant="destructive">
                <AlertDescription>
                    <div className="flex justify-between items-center w-full px-12">
                        <div className="flex">
                            <div className="flex items-center gap-1">
                                <div onClick={() => {
                                    if (index === 0) {
                                        setIndex(appError.length -1)
                                    } else {
                                        setIndex((prev) => prev-1)
                                    }
                                }} className="h-10 w-10 flex cursor-pointer items-center justify-center border text-red-800">
                                    <ChevronLeft />
                                </div>
                                <div onClick={() =>{
                                    if (index === appError.length -1) {
                                        setIndex(0)
                                    } else {
                                        setIndex((prev) => prev+1)
                                    }
                                }} className="h-10 w-10 flex cursor-pointer items-center justify-center border text-red-800">
                                    <ChevronRight />
                                </div>
                            </div>
                        </div>
                        <div className="text-lg !text-red-800">{appError[index]}</div>
                        <div className="flex items-center">
                            {appError.length > 1 &&
                                <div className=" flex  flex-col items-center justify-center text-red-800">
                                    <p>num err: {appError.length}</p>
                                    <p>curr err: {index+1}</p>
                                </div>
                            }
                            <div className="h-10 w-10 ml-8 cursor-pointer flex items-center justify-center border text-red-800">
                                <X onClick={() => {
                                   setError([])
                                }}/>
                            </div>
                        </div>
                    </div>
                </AlertDescription>
            </Alert>
        </div>
    )
}