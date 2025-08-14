"use client"
import React from "react"
import { Dispatch, SetStateAction, useEffect, useRef } from "react"

export const Menu = ({
    active,
    setActive,
    children,
    dispatch
}:{
    active: boolean,
    dispatch?: string,
    setActive?: Dispatch<SetStateAction<boolean>>,
    children: React.ReactNode,
}) => {
     //useRef
    const menuRef = useRef<HTMLDivElement>(null)
    //useEffect
    useEffect (() => {
            if (dispatch && active) {
                document.body.style.overflow = 'hidden'
            } else {
                document.body.style.overflow = 'auto'
            }
            const handlerClick = (e: MouseEvent) => {
                const target = e.target as Document
                if (!menuRef?.current?.contains(target)) {
                    if (setActive) {
                        setActive(false)
                    }
                    if (dispatch) {
                        const newValue = {} as {[key: string]: boolean}
                        newValue[`${dispatch}`] = false
                        document.body.style.overflow = 'auto'; 
                    }
                }
              }
              document.addEventListener("mousedown", handlerClick)
              return () => {
                document.removeEventListener("mousedown", handlerClick)
              }
    }, [active])
    return (
        <div className="w-fit h-fit" ref={menuRef}>
            {children}
        </div>
    )
}