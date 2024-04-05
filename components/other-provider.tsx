"use client"
import { useTheme } from 'next-themes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react'

export default function OtherProvider() {
  const { theme } = useTheme()

  const isDark = (theme === 'dark' || theme === 'system') ? true : false

  return (
    <>
      <ToastContainer
        position='top-center'
        theme={isDark ? 'dark' : 'light'}
      />
    </>
  )
}
