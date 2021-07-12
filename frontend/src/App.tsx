import Login from "./components/Login"
import Dashboard from "./components/Dashboard"

const code = new URLSearchParams(window.location.search).get("code")

export default function App() {
  return code ? <Dashboard code={code} /> : <Login />
}