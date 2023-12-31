import { styled } from 'styled-components';
import Calendar from './Calendar';
import Chart from './Chart';
import Stats from './Stats';
import MiddleLayout from '../common/MiddleLayout';
import { useState } from 'react';

//toggle prop을 toggled로 변경
interface IMiddleProps {
  change: boolean;
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  toggle: boolean;
}

function Middle({
  change,
  selectedDate,
  setSelectedDate,
  toggle
}: IMiddleProps) {
  const [date, setDate] = useState(new Date());
  return (
    <MidContainer>
      <TopArea>
        <Stats date={date} change={change} />
      </TopArea>
      <BottomArea>
        <MiddleLayout date={date} setDate={setDate}>
          {toggle ? (
            <Chart date={date} setDate={setDate} />
          ) : (
            <Calendar
              date={date}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          )}
        </MiddleLayout>
      </BottomArea>
    </MidContainer>
  );
}

const MidContainer = styled.section`
  height: 100%;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items:center;
`;
const TopArea = styled.div`
  height: 20%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BottomArea = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Middle;
