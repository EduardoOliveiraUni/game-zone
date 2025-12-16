"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./SearchInput.module.scss";

type Props = {
  value: string;
  onChange: (value: string) => void;

  onDebouncedChange?: (value: string) => void;

  placeholder?: string;
  debounceMs?: number;
};

export default function SearchInput({
  value,
  onChange,
  onDebouncedChange,
  placeholder = "Digite o nome de um jogo",
  debounceMs = 250,
}: Props) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const trimmed = useMemo(() => localValue, [localValue]);

  useEffect(() => {
    if (!onDebouncedChange) return;

    const t = window.setTimeout(() => {
      onDebouncedChange(trimmed);
    }, debounceMs);

    return () => window.clearTimeout(t);
  }, [trimmed, debounceMs, onDebouncedChange]);

  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder}
        value={localValue}
        onChange={(e) => {
          const v = e.target.value;
          setLocalValue(v);
          onChange(v);
        }}
      />
    </div>
  );
}