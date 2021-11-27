import TwitterLinkModal from "./TwitterLinkModal"

import { useState } from "react"

export default function SocialMediaButton(props) {

  const COLORS = {
    "Twitter": "bg-blue-500",
    "Github": "bg-gray-900"
  }

  const HOVER_COLORS = {
    "Twitter": "hover:bg-blue-400",
    "Github": "hover:bg-gray-700"
  }
  
  const ICONS = {
    "Twitter": <svg className="mr-3 -ml-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" fill="rgba(255,255,255,1)"/></svg>,
    "Github": <svg className="mr-3 -ml-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z" fill="rgba(255,255,255,1)"/></svg>
  }

  const AUTH_LINKS = {
    "Twitter": `https://twitter.com/intent/tweet?text=I'm%20verifying%20myself%20for%20%40mazurylabs%20%F0%9F%8C%8A%0a%0a${props.eth_address}`,
    "Github": `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`
  }

  const TARGETS = {
    "Twitter": "_blank",
    "Github": "_self",
  }

  const ON_CLICK_FUNCTIONS = {
    "Twitter": () => setOpenTwitterModal(true),
    "Github": () => void(0),
  }

  const color = COLORS[props.name]
  const colorHover = HOVER_COLORS[props.name]
  const icon = ICONS[props.name]
  const auth_link = AUTH_LINKS[props.name]
  const socialName = props.name
  const target = TARGETS[props.name]
  const onClickFunction = ON_CLICK_FUNCTIONS[props.name]

  const [openTwtitterModal, setOpenTwitterModal] = useState(false)

  return (
    <>
    {props.username
    ?
      <div
        className={`inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white ${color} focus:outline-none`}
      >
        {icon}
        {props.username}
      </div>
    :
      <a
        href={auth_link}
        target={target}
        onClick={onClickFunction}
        className={`inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white ${color} ${colorHover} focus:outline-none`}
      >
        {icon}
        {socialName}
      </a>
    }
    <TwitterLinkModal
      open={openTwtitterModal}
      setOpen={setOpenTwitterModal}
    />
    </>
  )
}
