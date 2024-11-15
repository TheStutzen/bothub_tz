import { AccessControl } from 'accesscontrol'
import grants from './ac-grants'

export class AccessControlService {
  private ac: AccessControl = new AccessControl()
  private grants: any = null

  async onModuleInit() {
    this.reloadGrants()
  }

  reloadGrants() {
    this.grants = grants
    this.ac.setGrants(this.grants)
  }

  // .any(): This method is used when you want to grant access to any resource records, regardless of who owns them.
  readAny(method: string, key: string): any {
    return this.ac.can(key).readAny(method)
  }

  createAny(method: string, key: string): any {
    return this.ac.can(key).createAny(method)
  }

  updateAny(method: string, key: string): any {
    return this.ac.can(key).updateAny(method)
  }

  deleteAny(method: string, key: string): any {
    return this.ac.can(key).deleteAny(method)
  }

  // .own(): This method is used when access should be limited to only records that are owned by the user.
  readOwn(method: string, key: string): any {
    return this.ac.can(key).readOwn(method)
  }

  createOwn(method: string, key: string): any {
    return this.ac.can(key).createOwn(method)
  }

  updateOwn(method: string, key: string): any {
    return this.ac.can(key).updateOwn(method)
  }

  deleteOwn(method: string, key: string): any {
    return this.ac.can(key).deleteOwn(method)
  }
}
