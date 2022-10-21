import { Profile } from "@/types/user";
import { Inject, Service } from "typedi";

@Service()
export default class userService {
    constructor(@Inject("logger") private logger) { }

    public async CreateNewUser(
        email: string,
        userId: string,
        provider: string,
        presignupEmail?: string
    ) {
        return { id: "id", exists: false };
    }

    public async UpdateProfile(userID: string, request: Profile): Promise<void> {
        try {
            return;
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

    public async GetLogin(uid: string) {
        const data = {
            id: "account.id",
            language: "account.settings.language.toLowerCase()",
            email: "account.email",
            name: "account.profile.name",
            finishedOnboarding: true,
        };
        return data;
    }
    catch(e) {
        this.logger.error(e);
        throw e;
    }
}
