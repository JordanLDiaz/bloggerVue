import { AppState } from "../AppState.js";
import { Blog } from "../models/Blog.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class BlogsService {
  async getBlogs() {
    const res = await api.get('/api/blogs')
    logger.log('[Got da blogs]', res.data)
    AppState.blogs = res.data.map(b => new Blog(b))
  }

  async getBlogsByProfileId(id) {
    // NOTE params need to be creatorId not id
    const res = await api.get('/api/blogs', { params: { creatorId: id } })
    logger.log('[GETTING BLOGS BY PROFILE ID]', res.data)
    AppState.blogs = res.data.map(b => new Blog(b))
  }
}
export const blogsService = new BlogsService();