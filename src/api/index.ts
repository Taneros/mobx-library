import axios from "axios"
import type { Book } from "./types"

const API = "https://openlibrary.org/search.json"

const searchBook = async (q: string): Promise<Book[] | null> => {
  try {
    const { data } = await axios({ url: API, params: { q } })

    return data.docs.map(({ key, title, author_name, cover_i }: any) => ({
      key,
      title,
      author: author_name?.json(", "),
      cover: cover_i,
    }))
  } catch (error) {
    console.error("error getting books")
    return null
  }
}

export default searchBook
