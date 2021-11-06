import axios from "axios"
import { useContext, useState, useRef, useEffect } from "react"
import { UserDataContext } from "../context/userData"
import { web3Context } from "../context/web3Data"
import SocialMediaButton from "./SocialMediaButton"

export default function ChangeProfileForm() {

  const { userData } = useContext(UserDataContext)
  const { signer } = useContext(web3Context)

  const [username, setUsername] = useState("")
  const [bio, setBio] = useState("")
  const [avatar, setAvatar] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState("")
  const fileUploadRef = useRef(null)

  useEffect(() => {
    if(avatar){
      setAvatarPreview(URL.createObjectURL(avatar))
    }
  }, [avatar])

  const getSignedMessage = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/message?address=${userData.eth_address}`)
    const signedMessage = await signer.signMessage(response.data)
    return signedMessage
  }

  const changeProfileData = async () => {
    const formData = new FormData()
    if(avatar) {
      formData.append("avatar", avatar, avatar.name)
    }
    if(username) {
      formData.append("username", username)
    }
    if(bio) {
      formData.append("bio", bio)
    }

    const auth_key = await getSignedMessage()

    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/profiles/${userData.eth_address}/`,
      formData,
      {
        headers: {
          'ETH-AUTH': auth_key
        }
      }
      ).then(window.location.reload())
  }

  return (
    <div className="space-y-8 divide-y divide-gray-200 max-w-xl mx-auto px-4 py-4">
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  app.mazurylabs.com/people/
                </span>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="off"
                  defaultValue={userData.ens_name}
                  spellCheck={false}
                  onChange={(e) => setUsername(e.target.value)}
                  className="flex-1 focus:ring-gray-500 focus:border-gray-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                />
              </div>
            </div>
            <div className="sm:col-span-6">
              <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                Bio
              </label>
              <div className="mt-1">
                <textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Write something about yourself!"
                  className="resize-none shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  defaultValue={userData.bio}
                />
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
                Profile picture
              </label>
              <div className="mt-1 flex items-center">
                <img className="h-12 w-12 rounded-full ml-3" src={avatarPreview ? avatarPreview : userData.avatar} alt="" />
                <input
                  type="file"
                  onChange={(e) => setAvatar(e.target.files[0])}
                  className="hidden"
                  ref={fileUploadRef}
                >
                </input>
                <button
                  className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                  type="button"
                  onClick={() => fileUploadRef.current.click()}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Integrations</h3>
            <p className="mt-1 text-sm text-gray-500">Connect your web2 accounts to bootstrap your scores</p>
            <div className="flex flex-row space-x-4 mt-4">
              <SocialMediaButton
                name="Twitter"
                username={userData.twitter}
              />
              <SocialMediaButton
                name="Github"
                username={userData.github}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
            onClick={changeProfileData}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
