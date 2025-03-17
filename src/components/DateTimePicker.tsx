import React from 'react';
import { FormControl, Input } from '@chakra-ui/react';

interface DateTimePickerProps {
  value: string;
  onChange: (value: string) => void;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ value, onChange }) => {
  return (
    <FormControl>
      <Input
        type="datetime-local"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        size="sm"
      />
    </FormControl>
  );
};

export default DateTimePicker;
