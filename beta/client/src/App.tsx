import ChatPage from "./pages/chat.page"
import { Routes, Route } from "react-router-dom"
import Layout from "./components/ui/layout"

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/c/:conversationId" element={<ChatPage />} />
        <Route path="/c" element={<ChatPage />} />
      </Route>
    </Routes>
  )
}

export default App
