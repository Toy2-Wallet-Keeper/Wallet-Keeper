import { styled } from 'styled-components';
import { formatDateKrISO } from '../../lib/CommonFunc';
import { theme } from '../../styles/theme';

interface ICalendarProps {
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  date: Date;
}

function Calendar({ selectedDate, setSelectedDate, date }: ICalendarProps) {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // 날짜 선택시 해당 날짜 데이터를 state에 저장
  const handleClick = (year: number, month: number, day: number) => {
    const clickedDate = new Date(year, month, day);
    const formattedDate = formatDateKrISO(clickedDate);
    setSelectedDate(formattedDate);
  };

  // 해당 달의 일 수 구하기
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // 달력 생성
  const generateCalendar = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = getDaysInMonth(year, month);
    const calendar = [];

    // 첫 번째 주 시작 전에 전 달 날짜 채우기
    for (let i = firstDay - 1; i >= 0; i--) {
      calendar.push(
        <PrevDay key={`prev-${i}`}>
          {getDaysInMonth(year, month - 1) - i}
        </PrevDay>
      );
    }

    // 달력에 날짜 추가
    for (let day = 1; day <= daysInMonth; day++) {
      calendar.push(
        <CalendarDay
          onClick={() => {
            handleClick(year, month, day);
          }}
          key={`day-${day}`}
          $isSelected={
            new Date(selectedDate).toLocaleDateString() ===
            new Date(year, month, day).toLocaleDateString()
          }
          $isSunday={new Date(year, month, day).getDay() === 0}
          $isSaturday={new Date(year, month, day).getDay() === 6}
        >
          <div>{day}</div>
        </CalendarDay>
      );
    }

    // 마지막 주 다음에 다음 달 날짜 채우기
    for (let i = 1; i <= 6 - new Date(year, month, daysInMonth).getDay(); i++) {
      calendar.push(<NextDay key={`next-${i}`}>{i}</NextDay>);
    }

    return calendar;
  };

  return (
    <CalendarContainer>
      <CalendarHeader>
        {daysOfWeek.map((day, index) => (
          <CalendarDayHeader key={day} $index={index}>
            {day}
          </CalendarDayHeader>
        ))}
      </CalendarHeader>
      <CalendarBody>{generateCalendar()}</CalendarBody>
    </CalendarContainer>
  );
}

const CalendarContainer = styled.div`
  gap: 10px;
  height: 300px;
  display: grid;
  margin: 8% auto 0;
  font-family: 'poppins';
  justify-content: center;
  grid-template-rows: auto 1fr;
`;

const PrevDay = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.black.black30};
`;

const NextDay = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.black.black30};
`;

const CalendarBody = styled.div`
  gap: 5px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const CalendarHeader = styled.div`
  gap: 5px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const CalendarDayHeader = styled.div<{ $index: number }>`
  padding: 5px;
  display: flex;
  font-weight: 700;
  align-items: center;
  justify-content: center;
  color: ${({ $index, theme }) =>
    $index === 6
      ? theme.colors.blue.main
      : $index === 0
      ? theme.colors.red
      : theme.colors.black};
`;

const CalendarDay = styled.div<{
  $isSunday?: boolean;
  $isSelected?: boolean;
  $isSaturday?: boolean;
}>`
  height: 100%;
  padding: 5px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  color: ${({ $isSaturday, $isSunday, theme }) =>
    $isSaturday
      ? theme.colors.blue.main
      : $isSunday
      ? theme.colors.red
      : theme.colors.black};

  div {
    width: 40px;
    height: 40px;
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    background-color: ${({ $isSelected }) =>
      $isSelected ? '#4464FF' : 'transparent'};
    color: ${({ $isSelected, theme }) => $isSelected && theme.colors.white};
    box-shadow: 3px 3px 10px
      ${({ $isSelected }) => ($isSelected ? '#4464FF' : 'transparent')};
    &:hover {
      transition: all 0.3s;
      box-shadow: 5px 5px 15px
        ${({ $isSelected }) => ($isSelected ? '#4464FF' : 'transparent')};
    }
  }
`;
export default Calendar;
