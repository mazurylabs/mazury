export default function ScoresList(props) {
  return (
    <ul role="list" className="divide-y divide-gray-200">
      {props.scores.map((skill) => (
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