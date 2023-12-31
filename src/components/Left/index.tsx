import React, { useState } from 'react';
import { styled } from 'styled-components';
import { theme } from '../../styles/theme';
import ColorLogo from '../../assets/Logo_color.png';

interface ToggleButtonProps {
  $toggled: boolean;
}
// LeftProps 타입 추가 및 setToggle 상태 업데이트
interface LeftProps {
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}
function Left({ setToggle }: LeftProps) {
  const [toggled, setToggled] = useState(false);

  // Middle 컴포넌트의 화면 전환 함수 (토글 버튼의 동작을 제어)
  const handleToggle = () => {
    // Left 컴포넌트 내의 toggled 상태를 업데이트하는 함수
    setToggled((prevToggled) => !prevToggled);
    // App 컴포넌트로부터 전달받은 setToggle 함수를 호출하여 상태를 업데이트하는 함수
    setToggle((prevToggle) => !prevToggle);
  };

  return (
    <LeftContainer>
      <Logo>
        <ColoredLogo src={ColorLogo} alt="" />
        <Text>
          Wallet
          <br />
          Keeper
        </Text>
      </Logo>
      <ToggleButton $toggled={toggled} onClick={handleToggle}>
        <ToggleButtonText $toggled={toggled}>
          {toggled ? 'chart' : 'calendar'}
        </ToggleButtonText>
      </ToggleButton>
    </LeftContainer>
  );
}

const LeftContainer = styled.div`
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h4`
  position: relative;
  top: 8%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const ColoredLogo = styled.img`
  width: 50%;
  margin-bottom: 10px;
`;

const Text = styled.div`
  font-family: 'poppins';
  font-weight: 800;
  font-size: 1.5rem;
  color: ${theme.colors.blue.main};
`;

const ToggleButton = styled.button<ToggleButtonProps>`
  position: relative;
  bottom: 8%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 132px;
  background-color: ${theme.colors.blue.main};
  border-radius: 40px;
  border: none;
  outline: none;
  cursor: pointer;
  position: relative;
  transition: background-color 0.3s ease;
  &:before {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    width: 50px;
    height: 50px;
    background-color: ${theme.colors.black.black100};
    border-radius: 50%;
    transition: transform 0.3s ease;
    transform: translateY(${({ $toggled }) => ($toggled ? '72px' : '0')});
    box-shadow: 3px 3px 5px ${theme.colors.blue.pressed};
  }
`;
const ToggleButtonText = styled.span<ToggleButtonProps>`
  font-family: 'poppins';
  font-size: 0.8rem;
  font-weight: 700;
  color: ${theme.colors.black.black50};
  writing-mode: vertical-lr;
  transition: transform 0.3s ease;
  transform: translateY(${({ $toggled }) => ($toggled ? '-23px' : '25px')});
`;

export default Left;
