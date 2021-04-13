import styled from '@emotion/styled';
import { Button } from '@material-ui/core';

type StyledButtonProps = {
    test?: boolean;
};

const StyledButton = styled(Button)`
&& {
  padding: 50px;
  font-size: 24px;
  border-radius: 4px;
  font-weight: ${(props: StyledButtonProps) => (props.test ? '300' : '800')};  
    &:hover {
    color: white;
  }
`;

export default StyledButton;