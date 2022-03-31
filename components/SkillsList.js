import axios from "axios";
import { ethers } from "ethers";
import { skills } from "../utils/const"
import { useState, useEffect, useContext } from 'react';
import { UserDataContext } from "../context/userData"
import { web3Context } from "../context/web3Data"

const EAS_CONTRACT = "0xBf49E19254DF70328C6696135958C94CD6cd0430"
const COMPETENCE_SCHEMA_UUID = "0xee610047e16d27b734e6f37c41a2cc06984381dec683f744791d236aeddf0769"
const EAS_ABI = [{"inputs":[{"internalType":"contract IASRegistry","name":"registry","type":"address"},{"internalType":"contract IEIP712Verifier","name":"verifier","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":true,"internalType":"address","name":"attester","type":"address"},{"indexed":false,"internalType":"bytes32","name":"uuid","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"schema","type":"bytes32"}],"name":"Attested","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"recipient","type":"address"},{"indexed":true,"internalType":"address","name":"attester","type":"address"},{"indexed":false,"internalType":"bytes32","name":"uuid","type":"bytes32"},{"indexed":true,"internalType":"bytes32","name":"schema","type":"bytes32"}],"name":"Revoked","type":"event"},{"inputs":[],"name":"VERSION","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint256","name":"expirationTime","type":"uint256"},{"internalType":"bytes32","name":"refUUID","type":"bytes32"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"attest","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint256","name":"expirationTime","type":"uint256"},{"internalType":"bytes32","name":"refUUID","type":"bytes32"},{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"attestByDelegation","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getASRegistry","outputs":[{"internalType":"contract IASRegistry","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"uuid","type":"bytes32"}],"name":"getAttestation","outputs":[{"components":[{"internalType":"bytes32","name":"uuid","type":"bytes32"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"uint256","name":"time","type":"uint256"},{"internalType":"uint256","name":"expirationTime","type":"uint256"},{"internalType":"uint256","name":"revocationTime","type":"uint256"},{"internalType":"bytes32","name":"refUUID","type":"bytes32"},{"internalType":"bytes","name":"data","type":"bytes"}],"internalType":"struct Attestation","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getAttestationsCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getEIP712Verifier","outputs":[{"internalType":"contract IEIP712Verifier","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"length","type":"uint256"},{"internalType":"bool","name":"reverseOrder","type":"bool"}],"name":"getReceivedAttestationUUIDs","outputs":[{"internalType":"bytes32[]","name":"","type":"bytes32[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"bytes32","name":"schema","type":"bytes32"}],"name":"getReceivedAttestationUUIDsCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"uuid","type":"bytes32"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"length","type":"uint256"},{"internalType":"bool","name":"reverseOrder","type":"bool"}],"name":"getRelatedAttestationUUIDs","outputs":[{"internalType":"bytes32[]","name":"","type":"bytes32[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"uuid","type":"bytes32"}],"name":"getRelatedAttestationUUIDsCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"length","type":"uint256"},{"internalType":"bool","name":"reverseOrder","type":"bool"}],"name":"getSchemaAttestationUUIDs","outputs":[{"internalType":"bytes32[]","name":"","type":"bytes32[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"schema","type":"bytes32"}],"name":"getSchemaAttestationUUIDsCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"attester","type":"address"},{"internalType":"bytes32","name":"schema","type":"bytes32"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"length","type":"uint256"},{"internalType":"bool","name":"reverseOrder","type":"bool"}],"name":"getSentAttestationUUIDs","outputs":[{"internalType":"bytes32[]","name":"","type":"bytes32[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"bytes32","name":"schema","type":"bytes32"}],"name":"getSentAttestationUUIDsCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"uuid","type":"bytes32"}],"name":"isAttestationValid","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"uuid","type":"bytes32"}],"name":"revoke","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"uuid","type":"bytes32"},{"internalType":"address","name":"attester","type":"address"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"revokeByDelegation","outputs":[],"stateMutability":"nonpayable","type":"function"}]

export default function SkillsList(props) {

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [transactionState, setTransactionState] = useState("default")
  const [referralContent, setReferralContent] = useState("")

  const { userData } = useContext(UserDataContext)
  const { provider, signer } = useContext(web3Context)

  function toggleSkill(e){
    const skillId = e.id
    
    if(selectedSkills.includes(skillId)){
      const removeIndex = selectedSkills.indexOf(skillId)
      selectedSkills.splice(removeIndex, 1)
    } else {
      selectedSkills.push(skillId)
    }
    e.classList.toggle("bg-green-400");
    e.classList.toggle("hover:bg-green-500");
    e.classList.toggle("text-gray-100");
    e.classList.toggle("border-white");

    console.log(selectedSkills)
  }

  async function saveReferralToEAS() {
    const AbiCoder = ethers.utils.AbiCoder;
    const abiCoder = new AbiCoder();
    const types = [ ...Array(skills.length).keys() ].map( i => "bool");

    const encoded_data = abiCoder.encode(
      types,
      selectedSkills
    )

    // Doesn't work, migrate web3modal integration to ethers
    if (typeof window.ethereum !== 'undefined') { // this doesn't work with web3
      const contract = new ethers.Contract(EAS_CONTRACT, EAS_ABI, props.signer)
      const transaction = await contract.attest(
        props.referralAddress,
        COMPETENCE_SCHEMA_UUID,
        ethers.constants.MaxUint256,
        "0x0000000000000000000000000000000000000000000000000000000000000000",
        encoded_data
      )
      setTransactionState("pending")
      await transaction.wait()
      setTransactionState("done")
    }
  }

  const getSignedMessage = async () => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/message?address=${userData.eth_address}`)
    const signedMessage = await provider.send("personal_sign", [response.data, userData.eth_address]);
    return signedMessage
  }

  const saveReferral = async () => {

    const requestData = {
      "skills": selectedSkills,
      "content": referralContent,
      "receiver": props.referralAddress
    }

    const auth_key = await getSignedMessage()

    setTransactionState("pending")
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/referrals/`,
      requestData, 
      {
        headers: {
          'ETH-AUTH': auth_key
        }
      }
    )
    setTransactionState("done")
  }

  return (
    <div className="flex flex-col items-center">
      <fieldset className="w-full md:px-5 mb-4">
        <legend className="text-2xl font-medium text-gray-900">Refer them for</legend>
        <div className="mt-4 grid grid-cols-1 gap-y-3 lg:grid-cols-2 lg:gap-y-3 lg:gap-x-4">
          {skills.map((skill) => (
            <button
              key={skill.id}
              id={skill.easName}
              onClick={(e) => toggleSkill(e.target)}
              className="px-4 py-3 text-sm font-medium text-gray-700 text-left border border-gray-300 hover:border-green-500 rounded-lg focus:outline-none transition duration-100"
            >
              {skill.humanName}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="w-full md:px-5">
        <label className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <div className="mt-1 w-full mb-6">
          <textarea
            rows={4}
            className="shadow-sm w-full sm:text-sm border-gray-300 rounded-md focus:border-gray-600 focus:outline-none resize-none focus:ring-1 focus:ring-gray-600"
            onChange={(e) => setReferralContent(e.target.value)}
            placeholder="Something nice :)"
          />
        </div>
      </div>
      {!(userData && Object.keys(userData).length === 0)
      ?
      <div>
      {transactionState == "default" &&
        <button
          type="button"
          onClick={saveReferral}
          className="inline-flex w-40 justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-800 hover:bg-green-400 focus:outline-none transition duration-200"
        >
          Save the referral
        </button>
      }
      {transactionState == "pending" &&
        <div
          className="inline-flex w-50 justify-center items-center px-4 py-2 text-base font-medium rounded-md shadow-sm text-white bg-yellow-500 focus:outline-none transition duration-200"
        >
          <p>Transaction pending...</p>
        </div>
      }
      {transactionState == "done" &&
        <div
          className="inline-flex w-40 justify-center items-center px-4 py-2 text-base font-medium rounded-md text-white bg-green-500 focus:outline-none transition duration-200"
        >
          Done!
        </div>
      }
      </div>
      :
      <div
          className="inline-flex justify-center items-center px-4 py-2 text-base font-medium rounded-md text-white bg-red-500 focus:outline-none transition duration-200"
        >
          Connect your wallet to proceed
        </div>
    }
    </div>
  )
}