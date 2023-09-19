import { API_METHODS } from './appServices.type';
import { ServicesEndPoints } from './appServicesEndPoints';
import { UserListDataMapper } from './commercial/adapters/response';
import { UserListDTO } from './commercial/dtos';
import { UserListRequestParams } from './models/request';
import { UserList } from './models/response';
import serviceAdapter from './serviceAdapter';

export class AppServices {
  constructor() {}

  getUserList = async (request: UserListRequestParams): Promise<UserList[]> => {
    return new Promise((resolve, reject) => {
      serviceAdapter<UserListDTO, undefined>(
        API_METHODS.GET,
        `${ServicesEndPoints.USER_LIST}?page=${request.page}&results=10&seed=abc`
      )
        .then(res => {
          resolve(new UserListDataMapper().map(res));
        })
        .catch(error => {
          reject(error);
        });
    });
  };
}

export const appServices = new AppServices();
