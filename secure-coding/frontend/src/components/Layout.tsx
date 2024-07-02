import { ReactNode } from "react";
import styled from "styled-components";

interface AuxProps {
  children: ReactNode;
}

const Body = styled.div`
  padding: 20px;
`;

function Layout({ children }: AuxProps) {
  return (
    <>
      <Body>
        <main>{children}</main>
      </Body>
    </>
  );
}

export default Layout;
