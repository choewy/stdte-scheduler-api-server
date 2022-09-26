export class AppUserTeam {
  id: number = 0;
  name: string = '';
}

export class AppUserRole {
  id: number = 0;
  name: string = '';
  policy = {
    default: false,
    master: false,
    admin: false,
    manager: false,
    member: false,
  };
}

export class AppUser {
  username: string = '';
  email: string | null = null;
  nickname: string = '';
  status: boolean = false;
  roles: AppUserRole[] = [];
  teams: AppUserTeam[] = [];
}

export class AppState {
  user = new AppUser();
}
