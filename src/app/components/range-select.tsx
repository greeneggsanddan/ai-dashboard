import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export default function RangeSelect({ range, setRange }) {

  return (
    <Select value={range} onValueChange={setRange}>
      <SelectTrigger className="w-[128px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all-time">All time</SelectItem>
        <SelectItem value="year">This year</SelectItem>
        <SelectItem value="month">This month</SelectItem>
        <SelectItem value="week">This week</SelectItem>
      </SelectContent>
    </Select>
  )
}