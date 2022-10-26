export type TeamParamType = {
  tid: string;
};

export type TeamUserType = {
  uid: number;
  name: string;
  email: string;
};

export type TeamType = {
  tid: number;
  name: string;
  members: TeamUserType[];
};
