import { makeAutoObservable } from "mobx"
import searchBook from "../api"
import { Book } from "../api/types"
import { FlowReturn } from "./types"

export class Books {
  books: Book[] | null = []
  status: "init" | "loading" | "success" | "error" = "init"

  constructor() {
    makeAutoObservable(this)
  }

  *fetchBooks(q: string): FlowReturn<typeof searchBook> {
    try {
      this.status = "loading"

      const result = yield searchBook(q)
      this.books = result
      this.status = "success"
    } catch (error) {
      this.status = "error"
      console.error(error)
    }
  }
}
