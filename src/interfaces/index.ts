export interface User {
  _id: string;
  image: string;
  userName: string;
}

export interface UserInfo {
  email: string;
  familyName: string;
  givenName: string;
  googleId: string;
  imageUrl: string;
  name: string;
}

export interface PinData {
  _id: string;
  about: string;
  category: string;
  destination: string;
  title: string;
  userId: string;
  image: string;
  postedBy: User;
}
