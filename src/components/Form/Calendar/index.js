import React, { useEffect, useState } from "react";  
import PropTypes from 'prop-types';

import {   

} from './styled' 

import dayjs from 'dayjs';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';

import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import { ThemedComponent } from "ui/theme";
 
export const Calendar = ({ defaultValue, value, onChange, orientation, datetime }) => {   
 
    return ( 
        <>   
            <ThemedComponent>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {
                        !datetime ? 
                        <DateCalendar defaultValue={defaultValue} value={value} onChange={onChange} orientation={orientation} />
                            :
                        <StaticDateTimePicker defaultValue={defaultValue} value={value} onChange={onChange} orientation={orientation} />
                    }
                </LocalizationProvider>
            </ThemedComponent>
 
        </>
    );
} 

Calendar.propTypes = {  
    defaultValue: PropTypes.object,
    value: PropTypes.object,
    datetime: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    orientation: PropTypes.oneOf(['landscape', 'portrait']),

};

Calendar.defaultProps = {
    defaultValue: null,
    value: null,
    datetime: false,
    onChange: undefined,
    orientation: "portrait"
};

export default Calendar;