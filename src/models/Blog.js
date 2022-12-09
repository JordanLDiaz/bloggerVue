export class Blog {
  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.body = data.body
    this.imgUrl = data.imgUrl
    this.tags = data.tags
    this.published = data.published
    this.creator = data.creator
    this.creatorId = data.creatorId
    this.createdAt = data.createdAt
  }
}