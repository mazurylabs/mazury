import { skills } from "../utils/const"
import { useState, useEffect } from 'react';

export default function SkillsList(props) {

  const [selectedSkills, setSelectedSkills] = useState(skills.map((skill) => (false)));

  function toggleSkill(e){
    const skillId = e.id
    
    selectedSkills[skillId] = !selectedSkills[skillId]
    e.classList.toggle("bg-green-400");
    e.classList.toggle("hover:bg-green-500");
    e.classList.toggle("text-gray-100");
    e.classList.toggle("border-white");
    e.classList.toggle("hover:border-white");
  }

  function saveReferral() {
    console.log("Referral for " + props.address + "data: " + selectedSkills)
  }

  return (
    <div className="flex flex-col items-center">
      <fieldset className="w-full md:px-5 mb-4">
        <legend className="text-2xl font-medium text-gray-900">Refer them for</legend>
        <div className="mt-4 grid grid-cols-1 gap-y-3 lg:grid-cols-2 lg:gap-y-3 lg:gap-x-4">
          {skills.map((skill) => (
            <button
              key={skill.id}
              id={skill.id}
              onClick={(e) => toggleSkill(e.target)}
              className="px-4 py-3 text-sm font-medium text-gray-700 text-left border border-gray-300 hover:border-gray-400 rounded-lg focus:outline-none transition duration-100"
            >
              {skill.humanName}
            </button>
          ))}
        </div>
      </fieldset>
      <button
        type="button"
        onClick={saveReferral}
        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-800 hover:bg-green-400 focus:outline-none transition duration-200"
      >
        Save the referral
      </button>
    </div>
  )
}