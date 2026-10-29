import { useEffect } from 'react'

// Sets the browser tab title, e.g. "Browse items · Second Life".
export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · Second Life` : 'Second Life'
  }, [title])
}
