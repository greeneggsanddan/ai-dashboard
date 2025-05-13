import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { TimeRange } from '../lib/types';

interface RangeSelectProps {
  range: TimeRange;
  setRange: React.Dispatch<React.SetStateAction<TimeRange>>;
}

export default function RangeSelect({ range, setRange }: RangeSelectProps) {
  return (
    <Select
      value={range}
      onValueChange={(value) => setRange(value as TimeRange)}
    >
      <SelectTrigger className="w-full md:w-[128px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all-time">All time</SelectItem>
        <SelectItem value="year">This year</SelectItem>
        <SelectItem value="month">This month</SelectItem>
      </SelectContent>
    </Select>
  );
}
