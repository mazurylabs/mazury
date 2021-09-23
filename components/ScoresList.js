const skills = [
  {
    name: 'Solidity',
    score: 65
  },
  {
    name: 'Rust',
    score: 70
  },
  {
    name: 'React',
    score: 50
  },
  {
    name: 'Design',
    score: 100
  },
  {
    name: 'Memes',
    score: 69
  },
]

export default function ScoresList() {
  return (
    <ul role="list" className="divide-y divide-gray-200">
      {skills.map((skill) => (
        <li key={skill.name} className="py-4">
          <div className="mx-3 flex flex-row justify-between">
            <p className="text-xl font-medium text-gray-900">{skill.name}</p>
            <p className="text-xl font-medium text-gray-900 text-right">{skill.score}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}