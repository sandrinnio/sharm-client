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
  comments: Comment[];
  destination: string;
  title: string;
  userId: string;
  image: {
    asset: {
      url: string;
    };
  };
  save?: Save[];
  postedBy: User;
}

export interface Save {
  _key: string;
  postedBy: User;
  userId: string;
}

export interface Comment {
  _key: string;
  postedBy: User;
  comment: string;
}
