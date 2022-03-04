import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { useQuery } from "react-query";
import { getMeters } from "../../../api/api";

// @ts-ignore
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export interface Meter {
    pointOfDelivery: string;
    createdAt: string;
    energy: string;
}

export default function MetersDropdown({
    onMeterSelected = (value: Meter | undefined) => {
    }
}) {

    const { isLoading, data } = useQuery('meters', () => getMeters());
    const list = data?.data || [];
    const [selected, setSelected] = useState<Meter | undefined>(list[0]);

    useEffect(() => {
        onMeterSelected(selected);
    }, [selected]);

    if (isLoading)
        return <div className='bg-gray-200 h-9 rounded w-full animate-pulse'></div>

    return (
        <Listbox value={selected} onChange={(value: Meter) => {
            setSelected(value);
            onMeterSelected && onMeterSelected(value);
        }}>
            {({ open }) => (
                <>
                    <Listbox.Label className="block text-sm font-medium text-gray-700">Type de consommation</Listbox.Label>
                    <div className="mt-1 relative">
                        <Listbox.Button
                            className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm">
                            <span className="block truncate">{selected?.energy ?? "Sélectionnez le type de consommation"}</span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options
                                static
                                className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                            >
                                {list?.map((type: any) => (
                                    <Listbox.Option
                                        key={type?.pointOfDelivery}
                                        className={({ active }) =>
                                            classNames(
                                                active ? 'text-white bg-green-600' : 'text-gray-900',
                                                'cursor-default select-none relative py-2 pl-3 pr-9'
                                            )
                                        }
                                        value={type}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                    {type?.energy}
                                                </span>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active ? 'text-white' : 'text-green-600',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                        )}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    )
}
