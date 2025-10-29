
import Calendar from './';

import dayjs from 'dayjs';

export default { 
  title: 'Web/Components/Calendar',
  component: Calendar, 
}; 

const Template = (args) => <Calendar {...args}  />; 

export const Default = Template.bind({}); 

Default.args = { 
    defaultValue: dayjs(),
    value: null, 
    datetime: false,
    orientation: "",
    label: 'Calendar',
    onChange: undefined
}; 
 