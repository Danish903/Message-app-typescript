type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Activity = {
  id: Scalars["ID"];
  sender: User;
  post: Post;
  type: Scalars["String"];
  created_at: Scalars["DateTime"];
  updated_at: Scalars["DateTime"];
};

export type ChangePasswordInput = {
  password: Scalars["String"];
  token: Scalars["String"];
};

export type Comment = {
  id: Scalars["ID"];
  text: Scalars["String"];
  userId: Scalars["ID"];
  postId: Scalars["ID"];
  sender?: Maybe<User>;
  created_at: Scalars["DateTime"];
  updated_at: Scalars["DateTime"];
};

export type CommentResponse = {
  node?: Maybe<Comment>;
  mutation: Scalars["String"];
};

export type EditProfileInput = {
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  bio?: Maybe<Scalars["String"]>;
  profilePicture?: Maybe<Scalars["Upload"]>;
};

export type LoginResponse = {
  user?: Maybe<User>;
  token?: Maybe<Scalars["String"]>;
};

export type Mutation = {
  login?: Maybe<LoginResponse>;
  createPost?: Maybe<Post>;
  createComment: Scalars["Boolean"];
  likePost?: Maybe<Scalars["Boolean"]>;
  uploadPhoto: Scalars["String"];
  confirmUser?: Maybe<Scalars["Boolean"]>;
  changePassword?: Maybe<User>;
  forgotPassword?: Maybe<Scalars["Boolean"]>;
  logout: Scalars["Boolean"];
  createUser: User;
  editProfile: User;
  addProfilePicture: Scalars["Boolean"];
  register: User;
};

export type MutationLoginArgs = {
  password: Scalars["String"];
  email: Scalars["String"];
};

export type MutationCreatePostArgs = {
  data: PostInput;
};

export type MutationCreateCommentArgs = {
  text: Scalars["String"];
  postId: Scalars["String"];
};

export type MutationLikePostArgs = {
  postId: Scalars["String"];
};

export type MutationUploadPhotoArgs = {
  file: Scalars["Upload"];
};

export type MutationConfirmUserArgs = {
  token: Scalars["String"];
};

export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
};

export type MutationForgotPasswordArgs = {
  email: Scalars["String"];
};

export type MutationCreateUserArgs = {
  data: RegisterInput;
};

export type MutationEditProfileArgs = {
  data: EditProfileInput;
};

export type MutationAddProfilePictureArgs = {
  picture: Scalars["Upload"];
};

export type MutationRegisterArgs = {
  data: RegisterInput;
};

export type PasswordInput = {
  password: Scalars["String"];
};

export type Post = {
  id: Scalars["ID"];
  description: Scalars["String"];
  city?: Maybe<Scalars["String"]>;
  photoUrl?: Maybe<Scalars["String"]>;
  owner: User;
  likeCount: Scalars["Float"];
  likedUsers?: Maybe<Array<User>>;
  created_at: Scalars["DateTime"];
  updated_at: Scalars["DateTime"];
};

export type PostInput = {
  description: Scalars["String"];
  city: Scalars["String"];
  photoUrl?: Maybe<Scalars["String"]>;
  file?: Maybe<Scalars["Upload"]>;
};

export type PostLike = {
  created_at: Scalars["DateTime"];
  updated_at: Scalars["DateTime"];
};

export type Query = {
  activities: Array<Activity>;
  getComments: Array<Comment>;
  posts: Array<Post>;
  getUser?: Maybe<User>;
  me?: Maybe<User>;
  helloWorld: Scalars["String"];
};

export type QueryGetCommentsArgs = {
  postId: Scalars["String"];
};

export type QueryGetUserArgs = {
  userId: Scalars["String"];
};

export type RegisterInput = {
  password: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  email: Scalars["String"];
  bio: Scalars["String"];
};

export type Subscription = {
  newCommentNotification: CommentResponse;
};

export type SubscriptionNewCommentNotificationArgs = {
  postId: Scalars["ID"];
};

export type User = {
  id: Scalars["ID"];
  firstName: Scalars["String"];
  photo?: Maybe<Scalars["String"]>;
  lastName: Scalars["String"];
  email: Scalars["String"];
  name: Scalars["String"];
  bio: Scalars["String"];
  favoritePosts: Array<Post>;
  created_at: Scalars["DateTime"];
  updated_at: Scalars["DateTime"];
};
export type AcitivityQueryQueryVariables = {};

export type AcitivityQueryQuery = { __typename?: "Query" } & {
  activities: Array<
    { __typename?: "Activity" } & Pick<
      Activity,
      "id" | "type" | "created_at"
    > & {
        post: { __typename?: "Post" } & Pick<Post, "id" | "photoUrl">;
        sender: { __typename?: "User" } & Pick<User, "id" | "name">;
      }
  >;
};

export type CreateCommentMutationVariables = {
  postId: Scalars["String"];
  text: Scalars["String"];
};

export type CreateCommentMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "createComment"
>;

export type CreatePostMutationVariables = {
  data: PostInput;
};

export type CreatePostMutation = { __typename?: "Mutation" } & {
  createPost: Maybe<
    { __typename?: "Post" } & Pick<
      Post,
      "description" | "photoUrl" | "created_at" | "updated_at"
    > & { owner: { __typename?: "User" } & Pick<User, "id" | "email" | "name"> }
  >;
};

export type LikePostMutationVariables = {
  postId: Scalars["String"];
};

export type LikePostMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "likePost"
>;

export type UploadPhotoMutationVariables = {
  file: Scalars["Upload"];
};

export type UploadPhotoMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "uploadPhoto"
>;

export type PostsQueryQueryVariables = {};

export type PostsQueryQuery = { __typename?: "Query" } & {
  posts: Array<
    { __typename?: "Post" } & Pick<
      Post,
      "id" | "description" | "photoUrl" | "city" | "created_at" | "updated_at"
    > & {
        owner: { __typename?: "User" } & Pick<
          User,
          "id" | "firstName" | "email" | "photo"
        >;
        likedUsers: Maybe<Array<{ __typename?: "User" } & Pick<User, "id">>>;
      }
  >;
};

export type EditProfileMutationVariables = {
  data: EditProfileInput;
};

export type EditProfileMutation = { __typename?: "Mutation" } & {
  editProfile: { __typename?: "User" } & Pick<
    User,
    "id" | "email" | "bio" | "name" | "firstName" | "lastName" | "photo"
  > & { favoritePosts: Array<{ __typename?: "Post" } & Pick<Post, "id">> };
};

export type LoginMutationVariables = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type LoginMutation = { __typename?: "Mutation" } & {
  login: Maybe<{ __typename?: "LoginResponse" } & Pick<LoginResponse, "token">>;
};

export type RegisterMutationMutationVariables = {
  data: RegisterInput;
};

export type RegisterMutationMutation = { __typename?: "Mutation" } & {
  register: { __typename?: "User" } & Pick<
    User,
    "id" | "name" | "bio" | "email"
  >;
};

export type MeQueryVariables = {};

export type MeQuery = { __typename?: "Query" } & {
  me: Maybe<
    { __typename?: "User" } & Pick<
      User,
      "id" | "email" | "bio" | "name" | "firstName" | "lastName" | "photo"
    > & { favoritePosts: Array<{ __typename?: "Post" } & Pick<Post, "id">> }
  >;
};

import gql from "graphql-tag";
import * as React from "react";
import * as ReactApollo from "react-apollo";

export const AcitivityQueryDocument = gql`
  query AcitivityQuery {
    activities {
      id
      type
      post {
        id
        photoUrl
      }
      sender {
        id
        name
      }
      created_at
    }
  }
`;

export class AcitivityQueryComponent extends React.Component<
  Partial<
    ReactApollo.QueryProps<AcitivityQueryQuery, AcitivityQueryQueryVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Query<AcitivityQueryQuery, AcitivityQueryQueryVariables>
        query={AcitivityQueryDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type AcitivityQueryProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<AcitivityQueryQuery, AcitivityQueryQueryVariables>
> &
  TChildProps;
export function withAcitivityQuery<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        AcitivityQueryQuery,
        AcitivityQueryQueryVariables,
        AcitivityQueryProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    AcitivityQueryQuery,
    AcitivityQueryQueryVariables,
    AcitivityQueryProps<TChildProps>
  >(AcitivityQueryDocument, operationOptions);
}
export const CreateCommentDocument = gql`
  mutation CreateComment($postId: String!, $text: String!) {
    createComment(postId: $postId, text: $text)
  }
`;

export class CreateCommentComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      CreateCommentMutation,
      CreateCommentMutationVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        CreateCommentMutation,
        CreateCommentMutationVariables
      >
        mutation={CreateCommentDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreateCommentProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<CreateCommentMutation, CreateCommentMutationVariables>
> &
  TChildProps;
export type CreateCommentMutationFn = ReactApollo.MutationFn<
  CreateCommentMutation,
  CreateCommentMutationVariables
>;
export function withCreateComment<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreateCommentMutation,
        CreateCommentMutationVariables,
        CreateCommentProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    CreateCommentMutation,
    CreateCommentMutationVariables,
    CreateCommentProps<TChildProps>
  >(CreateCommentDocument, operationOptions);
}
export const CreatePostDocument = gql`
  mutation CreatePost($data: PostInput!) {
    createPost(data: $data) {
      description
      photoUrl
      created_at
      updated_at
      owner {
        id
        email
        name
      }
    }
  }
`;

export class CreatePostComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<CreatePostMutation, CreatePostMutationVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<CreatePostMutation, CreatePostMutationVariables>
        mutation={CreatePostDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type CreatePostProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<CreatePostMutation, CreatePostMutationVariables>
> &
  TChildProps;
export type CreatePostMutationFn = ReactApollo.MutationFn<
  CreatePostMutation,
  CreatePostMutationVariables
>;
export function withCreatePost<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        CreatePostMutation,
        CreatePostMutationVariables,
        CreatePostProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    CreatePostMutation,
    CreatePostMutationVariables,
    CreatePostProps<TChildProps>
  >(CreatePostDocument, operationOptions);
}
export const LikePostDocument = gql`
  mutation LikePost($postId: String!) {
    likePost(postId: $postId)
  }
`;

export class LikePostComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<LikePostMutation, LikePostMutationVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<LikePostMutation, LikePostMutationVariables>
        mutation={LikePostDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type LikePostProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<LikePostMutation, LikePostMutationVariables>
> &
  TChildProps;
export type LikePostMutationFn = ReactApollo.MutationFn<
  LikePostMutation,
  LikePostMutationVariables
>;
export function withLikePost<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        LikePostMutation,
        LikePostMutationVariables,
        LikePostProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    LikePostMutation,
    LikePostMutationVariables,
    LikePostProps<TChildProps>
  >(LikePostDocument, operationOptions);
}
export const UploadPhotoDocument = gql`
  mutation UploadPhoto($file: Upload!) {
    uploadPhoto(file: $file)
  }
`;

export class UploadPhotoComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<UploadPhotoMutation, UploadPhotoMutationVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<UploadPhotoMutation, UploadPhotoMutationVariables>
        mutation={UploadPhotoDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type UploadPhotoProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<UploadPhotoMutation, UploadPhotoMutationVariables>
> &
  TChildProps;
export type UploadPhotoMutationFn = ReactApollo.MutationFn<
  UploadPhotoMutation,
  UploadPhotoMutationVariables
>;
export function withUploadPhoto<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        UploadPhotoMutation,
        UploadPhotoMutationVariables,
        UploadPhotoProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    UploadPhotoMutation,
    UploadPhotoMutationVariables,
    UploadPhotoProps<TChildProps>
  >(UploadPhotoDocument, operationOptions);
}
export const PostsQueryDocument = gql`
  query PostsQuery {
    posts {
      id
      description
      photoUrl
      city
      created_at
      updated_at
      owner {
        id
        firstName
        email
        photo
      }
      likedUsers {
        id
      }
    }
  }
`;

export class PostsQueryComponent extends React.Component<
  Partial<ReactApollo.QueryProps<PostsQueryQuery, PostsQueryQueryVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<PostsQueryQuery, PostsQueryQueryVariables>
        query={PostsQueryDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type PostsQueryProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<PostsQueryQuery, PostsQueryQueryVariables>
> &
  TChildProps;
export function withPostsQuery<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        PostsQueryQuery,
        PostsQueryQueryVariables,
        PostsQueryProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    PostsQueryQuery,
    PostsQueryQueryVariables,
    PostsQueryProps<TChildProps>
  >(PostsQueryDocument, operationOptions);
}
export const EditProfileDocument = gql`
  mutation EditProfile($data: EditProfileInput!) {
    editProfile(data: $data) {
      id
      email
      bio
      name
      firstName
      lastName
      photo
      favoritePosts {
        id
      }
    }
  }
`;

export class EditProfileComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<EditProfileMutation, EditProfileMutationVariables>
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<EditProfileMutation, EditProfileMutationVariables>
        mutation={EditProfileDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type EditProfileProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<EditProfileMutation, EditProfileMutationVariables>
> &
  TChildProps;
export type EditProfileMutationFn = ReactApollo.MutationFn<
  EditProfileMutation,
  EditProfileMutationVariables
>;
export function withEditProfile<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        EditProfileMutation,
        EditProfileMutationVariables,
        EditProfileProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    EditProfileMutation,
    EditProfileMutationVariables,
    EditProfileProps<TChildProps>
  >(EditProfileDocument, operationOptions);
}
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export class LoginComponent extends React.Component<
  Partial<ReactApollo.MutationProps<LoginMutation, LoginMutationVariables>>
> {
  render() {
    return (
      <ReactApollo.Mutation<LoginMutation, LoginMutationVariables>
        mutation={LoginDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type LoginProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<LoginMutation, LoginMutationVariables>
> &
  TChildProps;
export type LoginMutationFn = ReactApollo.MutationFn<
  LoginMutation,
  LoginMutationVariables
>;
export function withLogin<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        LoginMutation,
        LoginMutationVariables,
        LoginProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    LoginMutation,
    LoginMutationVariables,
    LoginProps<TChildProps>
  >(LoginDocument, operationOptions);
}
export const RegisterMutationDocument = gql`
  mutation RegisterMutation($data: RegisterInput!) {
    register(data: $data) {
      id
      name
      bio
      email
    }
  }
`;

export class RegisterMutationComponent extends React.Component<
  Partial<
    ReactApollo.MutationProps<
      RegisterMutationMutation,
      RegisterMutationMutationVariables
    >
  >
> {
  render() {
    return (
      <ReactApollo.Mutation<
        RegisterMutationMutation,
        RegisterMutationMutationVariables
      >
        mutation={RegisterMutationDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type RegisterMutationProps<TChildProps = {}> = Partial<
  ReactApollo.MutateProps<
    RegisterMutationMutation,
    RegisterMutationMutationVariables
  >
> &
  TChildProps;
export type RegisterMutationMutationFn = ReactApollo.MutationFn<
  RegisterMutationMutation,
  RegisterMutationMutationVariables
>;
export function withRegisterMutation<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        RegisterMutationMutation,
        RegisterMutationMutationVariables,
        RegisterMutationProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withMutation<
    TProps,
    RegisterMutationMutation,
    RegisterMutationMutationVariables,
    RegisterMutationProps<TChildProps>
  >(RegisterMutationDocument, operationOptions);
}
export const MeDocument = gql`
  query ME {
    me {
      id
      email
      bio
      name
      firstName
      lastName
      photo
      favoritePosts {
        id
      }
    }
  }
`;

export class MeComponent extends React.Component<
  Partial<ReactApollo.QueryProps<MeQuery, MeQueryVariables>>
> {
  render() {
    return (
      <ReactApollo.Query<MeQuery, MeQueryVariables>
        query={MeDocument}
        {...(this as any)["props"] as any}
      />
    );
  }
}
export type MeProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<MeQuery, MeQueryVariables>
> &
  TChildProps;
export function withMe<TProps, TChildProps = {}>(
  operationOptions:
    | ReactApollo.OperationOption<
        TProps,
        MeQuery,
        MeQueryVariables,
        MeProps<TChildProps>
      >
    | undefined
) {
  return ReactApollo.withQuery<
    TProps,
    MeQuery,
    MeQueryVariables,
    MeProps<TChildProps>
  >(MeDocument, operationOptions);
}
