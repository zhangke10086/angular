import {Role} from './Role';

export class User {
  id: string;
  code: string;
  description: string;
  password: string;
  state: number;
  type: string;
  name: string;
  email: string;
  roleList: Role;
  province: string;
  city: string;
  birthday: Date;
  note: string;
  token: string;
  area: string;
}
