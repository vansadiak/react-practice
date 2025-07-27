import { useState, useRef } from "react";


export type TSingleSelectFilter<T> = {
    filterKey: string,
    filterValue: {
        key: string
        value: boolean
    }[]
    filterType: 'SINGLE_SELECT'
}

export type TTextFilter<T> = {
    filterKey: string,
    filterValue: string
    filterType: 'TEXT_SEARCH'
}



type TFilterTypes<T> = { isOpen: boolean } & (TSingleSelectFilter<T> | TTextFilter<T>)

export type TFilter<T> = TFilterTypes<T>[]

type TSingleSelectFilterProps<T> = {
    filter: TSingleSelectFilter<T>,
    setFilterModel: React.Dispatch<React.SetStateAction<TFilter<T>>>,
    onClose: () => void
}

type TTextSearchFilterProps<T> = {
    filter: TTextFilter<T>,
    setFilterModel: React.Dispatch<React.SetStateAction<TFilter<T>>>,
    onClose: () => void
}

type TFilterModalProps<T> = {
    filter: TFilterTypes<T>,
    onClose: () => void,
    setFilterModel: React.Dispatch<React.SetStateAction<TFilter<T>>>,
    buttonRef: React.RefObject<HTMLButtonElement>
}


const SingleSelectFilter = <T,>({ filter, setFilterModel, onClose }: TSingleSelectFilterProps<T>) => {
    const handleToggle = (key: TSingleSelectFilter<T>['filterValue'][number]['key']) => {
        const updatedFilter = filter.filterValue.map(item =>
            item.key === key ? { ...item, value: !item.value } : item
        );
        setFilterModel(prevModel => prevModel.map(f => {
            if (f.filterKey === filter.filterKey && f.filterType === 'SINGLE_SELECT') {
                return { ...f, filterValue: updatedFilter }
            }
            return f
        }))
    };

    return (
        <div >
            {filter.filterValue.map((value) => (
                <label key={value.key} className="flex items-center gap-2 mb-1">
                    <input
                        type="checkbox"
                        checked={value.value}
                        onChange={() => handleToggle(value.key)}
                    />
                    {value.key}
                </label>
            ))}
        </div>
    );
};

const TextSearchFilter = <T,>({ filter, setFilterModel, onClose }: TTextSearchFilterProps<T>) => {
    return (


        <input
            type="text"
            value={filter.filterValue}
            onChange={(e) => setFilterModel(prevModel => prevModel.map(f => {
                if (f.filterKey === filter.filterKey && f.filterType === 'TEXT_SEARCH') {
                    return { ...f, filterValue: e.target.value }
                }
                return f
            }))}
            className="w-full p-2 border rounded"
            placeholder="Search todos..."
        />

    );
};

const FilterModal = <T,>({ filter, onClose, setFilterModel, buttonRef }: TFilterModalProps<T>) => {
    if (!filter.isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 shadow-md" onClick={onClose}>
            <div
                className="absolute  p-4 rounded min-w-[300px] shadow-lg bg-gray-50"
                style={{
                    top: buttonRef.current ? `${buttonRef.current.getBoundingClientRect().bottom + 5}px` : '50%',
                    left: buttonRef.current ? `${buttonRef.current.getBoundingClientRect().left}px` : '50%',
                    transform: buttonRef.current ? 'none' : 'translate(-50%, -50%)'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold">{filter.filterKey}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
                </div>
                {filter.filterType === 'SINGLE_SELECT' && (
                    <SingleSelectFilter filter={filter} setFilterModel={setFilterModel} onClose={onClose} />
                )}
                {filter.filterType === 'TEXT_SEARCH' && (
                    <TextSearchFilter filter={filter} setFilterModel={setFilterModel} onClose={onClose} />
                )}
            </div>
        </div>
    );
};

export const Filter = <T,>({ filterModel, setFilterModel }: { filterModel: TFilter<T>, setFilterModel: React.Dispatch<React.SetStateAction<TFilter<T>>> }) => {
    const [openModal, setOpenModal] = useState<string | null>(null);
    const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

    const handleFilterClick = (filterKey: string) => {
        setOpenModal(filterKey);
        setFilterModel(filterModel.map(f =>
            f.filterKey === filterKey ? { ...f, isOpen: true } : f
        ));
    };

    const clearFilters = () => {
        setFilterModel((prevModel) => prevModel.map(f => {
            if (f.filterType === 'SINGLE_SELECT') {
                return { ...f, filterValue: f.filterValue.map(item => ({ ...item, value: false })) }
            }
            if (f.filterType === 'TEXT_SEARCH') {
                return { ...f, filterValue: '' }
            }
            return f
        }));
    }

    const handleCloseModal = () => {
        setOpenModal(null);
        setFilterModel(filterModel.map(f => ({ ...f, isOpen: false })));
    };

    return (
        <div className="flex gap-2">
            {filterModel.map((filter) => (
                <button
                    key={filter.filterKey}
                    ref={(el) => buttonRefs.current[filter.filterKey] = el}
                    onClick={() => handleFilterClick(filter.filterKey)}
                    className="px-3 py-1 border rounded text-sm"
                >
                    {filter.filterKey}
                </button>
            ))}
            {openModal && (
                <FilterModal
                    filter={filterModel.find(f => f.filterKey === openModal)!}
                    isOpen={true}
                    onClose={handleCloseModal}
                    setFilterModel={setFilterModel}
                    buttonRef={{ current: buttonRefs.current[openModal] }}
                />
            )}
            <button onClick={clearFilters} className="px-3 py-1 border rounded text-sm">Reset</button>
        </div>
    );
};



export const defaultTodoFilterModel: TFilter<string> = [
    {
        filterKey: 'status',
        filterValue: [
            {
                key: 'completed',
                value: false,
            },
            {
                key: 'incomplete',
                value: false,
            }
        ],
        isOpen: false,
        filterType: 'SINGLE_SELECT',
    },
    {
        filterKey: 'search',
        filterValue: '',
        isOpen: false,
        filterType: 'TEXT_SEARCH',
    }
]