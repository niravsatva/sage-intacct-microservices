import { ValidationError } from 'express-validator';

export function getStringValidationMessage(data: ValidationError[]) {
    return data.map((e) => {
        return e.msg
    }).join(' \n ');
}

export function isNullOrUndefined(value: any) {
    return null === value || undefined === value;
}

export function isBlank(value: any) {
    return null === value || undefined === value || value.toString().trim().length === 0;
}

export function hasText(value: any) {
    return !isBlank(value);
}

export function getSkipRecordCount(pageNo: number, pageSize: number) {
    return (Math.max(1, Number(pageNo)) - 1) * Math.min(100, Number(pageSize));
}