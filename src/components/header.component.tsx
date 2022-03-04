import { Link } from "react-router-dom";
const navigation = [
  { name: 'Home', href: '/' },
]

export default function HeaderComponent() {

  return (

    <div className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <img
              className="h-10 w-auto"
              src="https://ekwateur.fr/static/logo-ekWateur.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>

  )
}
