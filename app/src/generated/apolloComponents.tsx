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

export type ChangePasswordInput = {
  password: Scalars["String"];
  token: Scalars["String"];
};

export type Mutation = {
  createPost: Post;
  uploadPhoto: Scalars["String"];
  confirmUser?: Maybe<Scalars["Boolean"]>;
  changePassword?: Maybe<User>;
  forgotPassword?: Maybe<Scalars["Boolean"]>;
  logout: Scalars["Boolean"];
  createUser: User;
  login?: Maybe<User>;
  addProfilePicture: Scalars["Boolean"];
  register: User;
};

export type MutationCreatePostArgs = {
  data: PostInput;
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

export type MutationLoginArgs = {
  password: Scalars["String"];
  email: Scalars["String"];
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
  photoUrl?: Maybe<Scalars["String"]>;
  owner: User;
  created_at: Scalars["DateTime"];
  updated_at: Scalars["DateTime"];
};

export type PostInput = {
  description: Scalars["String"];
  photoUrl?: Maybe<Scalars["String"]>;
  file?: Maybe<Scalars["Upload"]>;
};

export type Query = {
  posts: Array<Post>;
  getUser?: Maybe<User>;
  me?: Maybe<User>;
  helloWorld: Scalars["String"];
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

export type User = {
  id: Scalars["ID"];
  firstName: Scalars["String"];
  photo?: Maybe<Scalars["String"]>;
  lastName: Scalars["String"];
  email: Scalars["String"];
  name: Scalars["String"];
  bio: Scalars["String"];
  created_at: Scalars["DateTime"];
  updated_at: Scalars["DateTime"];
};
export type CreatePostMutationVariables = {
  data: PostInput;
};

export type CreatePostMutation = { __typename?: "Mutation" } & {
  createPost: { __typename?: "Post" } & Pick<
    Post,
    "description" | "photoUrl" | "created_at" | "updated_at"
  > & { owner: { __typename?: "User" } & Pick<User, "id" | "email" | "name"> };
};

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
      "id" | "description" | "photoUrl" | "created_at" | "updated_at"
    > & {
        owner: { __typename?: "User" } & Pick<
          User,
          "id" | "firstName" | "email"
        >;
      }
  >;
};

export type LoginMutationVariables = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type LoginMutation = { __typename?: "Mutation" } & {
  login: Maybe<{ __typename?: "User" } & Pick<User, "id" | "name" | "email">>;
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
      "id" | "email" | "bio" | "name" | "photo"
    >
  >;
};

import gql from "graphql-tag";
import * as React from "react";
import * as ReactApollo from "react-apollo";

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
      created_at
      updated_at
      owner {
        id
        firstName
        email
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
export const LoginDocument = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      name
      email
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
      photo
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
