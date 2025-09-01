/// <reference types="vite/client" />

type Post = {
  id: string,
  body: string,
  title: string,
  author: string,
  community: string,
  likes: number,
  comments: number,
  liked: boolean,
  time: string,
  profilePhoto: string,
  communityProfilePhoto: string
}

type User = {
  name: string;
  username: string;
  email: string;
  id: string;
  role: 'admin' | 'user';
  communities: {
    name: string,
    id: string,
    profilePhoto: string,
    members: string[],
    description: string
  }[]
  profilePhoto: string
};


type RawPost = {
  id: string;
  title: string;
  content: string;
  author: RawUser;
  community: {
    id: string;
    name: string;
    profilePhoto: string;
  };
  likes: {
    username: string;
    name: string;
  }[];
  space?: string;
  comments: {
    id: string;
    content: string;
    author: string;      
    post: string;
    createdAt: string;
    updatedAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
};


type RawUser = {
  id: string;
  username: string;
  name: string;
  profilePhoto: string;
};

type RawShortSpace = {
  id: string;
  name: string;
};

 type RawCommunity = {
  id: string;
  name: string;
  description: string;
  owner: RawUser;
  admins: RawUser[];
  members: RawUser[];
  spaces: RawShortSpace[];
  createdAt: string;
  updatedAt: string;
  profilePhoto: string;
};


type RawShortPost = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  likes: {
    username: string;
    name: string;
  }[];
  comments: string[];
  author: RawUser;
};

type RawShortCommunity = {
  id: string;
  name: string;
  profilePhoto: string;
};

type RawSpace = {
  id: string;
  name: string;
  type: 'chat' | 'feed';
  description: string;
  community: RawShortCommunity;
  members: RawUser[];
  posts: RawShortPost[];
  messages: RawMessage[];
  createdAt: string;
  updatedAt: string;
};


type RawComment = {
  id: string;
  content: string;
  author: RawUser;
  post: string;
  likes: {
    username: string;
    name: string;
  }[];
  createdAt: string;
  updatedAt: string;
};

type RawMessage = {
  id: string;
  content: string;
  sender: RawUser;
  space: string;
  sentAt: string;
};

type CommunityInvite = {
  id: string;
  name: string;
  joinRequests: {
    id: string;
    name: string;
    email: string;
    username: string;
    profilePic?: string;
  }[];
};

type Row = {
  id: string,
  name: { name: string, src: string },
  description: string,
  members: number,
  subCommunities: number,
  status: string,
  actions: string
}

