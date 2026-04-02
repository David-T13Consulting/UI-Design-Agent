import { useCallback, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { TextInput } from '../../primitives/TextInput';
import { Select } from '../../primitives/Select';
import { Badge } from '../../primitives/Badge';
import styles from './FilterBar.module.css';

export interface FilterDefinition {
  /** Unique key used in the activeFilters record */
  key: string;
  /** Display label for the filter */
  label: string;
  /** Available options for the filter */
  options: { value: string; label: string }[];
}

export interface FilterBarProps {
  /** Array of filter definitions to render as Select dropdowns */
  filters: FilterDefinition[];
  /** Placeholder text for the search input */
  searchPlaceholder?: string;
  /** Called when any filter Select changes */
  onFilterChange: (filters: Record<string, string>) => void;
  /** Called when the search input changes */
  onSearchChange: (query: string) => void;
  /** Currently active filter values keyed by filter key */
  activeFilters: Record<string, string>;
}

export function FilterBar({
  filters,
  searchPlaceholder = 'Search...',
  onFilterChange,
  onSearchChange,
  activeFilters,
}: FilterBarProps) {
  const activeCount = useMemo(() => {
    return Object.values(activeFilters).filter((v) => v !== '').length;
  }, [activeFilters]);

  const handleFilterChange = useCallback(
    (key: string, value: string) => {
      onFilterChange({ ...activeFilters, [key]: value });
    },
    [activeFilters, onFilterChange],
  );

  const handleClearAll = useCallback(() => {
    const cleared: Record<string, string> = {};
    for (const filter of filters) {
      cleared[filter.key] = '';
    }
    onFilterChange(cleared);
  }, [filters, onFilterChange]);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onSearchChange(event.target.value);
    },
    [onSearchChange],
  );

  return (
    <div className={styles.root} role="search" aria-label="Filter results">
      <div className={styles.searchWrapper}>
        <TextInput
          type="search"
          placeholder={searchPlaceholder}
          prefix={<Search size={16} aria-hidden="true" />}
          onChange={handleSearchChange}
          aria-label={searchPlaceholder}
        />
      </div>

      {filters.map((filter) => (
        <div key={filter.key} className={styles.filterWrapper}>
          <Select
            options={filter.options}
            placeholder={filter.label}
            value={activeFilters[filter.key] ?? ''}
            onChange={(e) => handleFilterChange(filter.key, e.target.value)}
            aria-label={filter.label}
          />
        </div>
      ))}

      {activeCount > 0 && (
        <div className={styles.activeIndicator}>
          <Badge
            label={`${activeCount} active`}
            variant="info"
            size="sm"
          />
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleClearAll}
            aria-label="Clear all filters"
          >
            <X size={14} aria-hidden="true" />
            <span>Clear all</span>
          </button>
        </div>
      )}
    </div>
  );
}
