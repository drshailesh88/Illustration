import { FC } from 'react';

export interface IconPickerOptions {
  container?: HTMLElement;
  onSelect?: (icon: unknown) => void;
}

// The component can be used both as a class and as a React component
declare const IconPicker: FC<Record<string, never>>;

export function createIconPicker(options?: IconPickerOptions): Promise<unknown>;

export { IconPicker };
export default IconPicker;
