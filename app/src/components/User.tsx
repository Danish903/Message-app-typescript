import * as React from "react";
import { MeComponent, MeQueryVariables } from "../generated/apolloComponents";

interface Props {
   children: (data: MeQueryVariables) => JSX.Element | null;
}

const User: React.FC<Props> = props => {
   return <MeComponent>{data => props.children(data)}</MeComponent>;
};

export default User;
