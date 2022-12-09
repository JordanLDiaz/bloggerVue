import { AppState } from "../AppState.js";
import { Account } from "../models/Account.js";
import { logger } from "../utils/Logger.js";
import { api } from "./AxiosService.js";

class ProfileService {
  async getProfileById(id) {
    // NOTE this takes us to a specific person's profile... no api/profile exists w/o id appended to it. 
    const res = await api.get('/api/profiles/' + id)
    logger.log('[GET PROFILE BY ID]', res.data)
    AppState.activeProfile = new Account(res.data)
  }
}

export const profileService = new ProfileService();