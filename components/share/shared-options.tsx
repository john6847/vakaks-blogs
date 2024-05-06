"use client"
import React from 'react'
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
} from 'next-share'

type Props = {
  url: string
  title: string
  description: string
  category?: string[]
}
export default function SharedOptions({ url, title, description, category }: Props) {

  const tags = category?.join(' #') + ' #vakaks #blogs'
  return (
    <div className='flex gap-2 items-center justify-center sm:-mt-[4.2rem] -mt-10 bg-accent w-fit mx-auto sm:px-6 p-2 rounded-full'>
      {/* <EmailShareButton url={url} subject={title} body={description}>
        <EmailIcon size={30} round />
      </EmailShareButton> */}

      <FacebookShareButton url={url} quote={description} hashtag={tags}>
        <FacebookIcon size={30} round />
      </FacebookShareButton>

      <LinkedinShareButton url={url}>
        <LinkedinIcon size={30} round />
      </LinkedinShareButton>

      <WhatsappShareButton
        url={url}
        title={`*${title}*\n\n${description}\n\n${tags}`}
        separator="\n"
      >
        <WhatsappIcon size={30} round />
      </WhatsappShareButton>

      <TwitterShareButton
        url={url}
        title={title} hashtags={tags.split(' ')}>
        <TwitterIcon size={30} round />
      </TwitterShareButton>

      <TelegramShareButton url={url} title={title}>
        <TelegramIcon size={30} round />
      </TelegramShareButton>

    </div>
  )
}
