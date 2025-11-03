"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const INPUT_BORDER = '#989898';
const INPUT_BG = '#FBFAF9';
const INPUT_TEXT_COLOR = '#111827';

interface DateTimePickerProps {
    label: string;
    date: Date | undefined;
    onDateChange: (date: Date | undefined) => void;
    time: string;
    onTimeChange: (time: string) => void;
    disabled?: boolean;
    id?: string;
}

export function DateTimePicker({
    label,
    date,
    onDateChange,
    time,
    onTimeChange,
    disabled = false,
    id = 'datetime-picker'
}: DateTimePickerProps) {
    const [open, setOpen] = React.useState(false);

    return (
        <div className="flex flex-col gap-3">
            <Label 
                htmlFor={`${id}-date`}
                className="text-sm text-gray-700"
                style={{ fontWeight: 400, fontSize: '13px' }}
            >
                {label}
            </Label>
            
            <div className="flex gap-3">
                {/* Date Picker */}
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id={`${id}-date`}
                            disabled={disabled}
                            className="flex-1 justify-between font-normal rounded-xl px-3 py-2"
                            style={{
                                backgroundColor: INPUT_BG,
                                border: `1px solid ${INPUT_BORDER}`,
                                color: INPUT_TEXT_COLOR,
                                fontWeight: 400,
                                fontSize: '13px',
                                borderRadius: 10,
                                height: 'auto',
                            }}
                        >
                            {date ? date.toLocaleDateString('en-GB') : "dd/mm/yyyy"}
                            <ChevronDownIcon className="h-4 w-4 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={date}
                            captionLayout="dropdown"
                            onSelect={(selectedDate) => {
                                onDateChange(selectedDate);
                                setOpen(false);
                            }}
                            fromYear={2020}
                            toYear={2030}
                        />
                    </PopoverContent>
                </Popover>

                {/* Time Input */}
                <Input
                    type="time"
                    id={`${id}-time`}
                    value={time}
                    onChange={(e) => onTimeChange(e.target.value)}
                    disabled={disabled}
                    className="w-32 rounded-xl px-3 py-2"
                    style={{
                        backgroundColor: INPUT_BG,
                        border: `1px solid ${INPUT_BORDER}`,
                        color: INPUT_TEXT_COLOR,
                        fontWeight: 400,
                        fontSize: '13px',
                        borderRadius: 10,
                    }}
                />
            </div>
        </div>
    );
}