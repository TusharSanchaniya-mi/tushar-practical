import { Extra, UserList } from '@src/services/models/response';
import { getRandomColor } from '@src/utils';

import { Result, UserListDTO } from '../../dtos/index';

export class UserListDataMapper {
  constructor() {}

  map(dto: UserListDTO): UserList[] {
    return dto.results.map((item: Result) => {
      let genderExtraColor = getRandomColor();
      let genderBGColor = genderExtraColor + '45';

      const genderExtra: Extra | null = item?.gender
        ? {
            bodyColor: genderBGColor,
            tag: item.gender,
            textColor: genderExtraColor,
          }
        : null;

      let phoneTextColor = getRandomColor();
      let phoneBackgroundColor = phoneTextColor + '45';

      const phoneExtra: Extra | null = item?.phone
        ? {
            bodyColor: phoneBackgroundColor,
            tag: item.phone,
            textColor: phoneTextColor,
          }
        : null;

      let extras: Extra[] = [genderExtra, phoneExtra].filter(
        ele => ele !== null
      ) as Extra[];

      return {
        email: item.email,
        extras: extras,
        id: `${item.id.name}-${item.id.value}`.replace(/\s+/g, ''),
        location: item.location.city + ', ' + item.location.country,
        name: item.name.first + ' ' + item.name.last,
        profileUrlLarge: item.picture.large,
      };
    });
  }
}
