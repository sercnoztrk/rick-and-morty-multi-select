import React from "react";
import AsyncSelect from "react-select/async";
import { components, MultiValueGenericProps, MultiValueRemoveProps, ClassNamesConfig, GroupBase} from "react-select";

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]


const getData = async (): Promise<Data> => {
    const res = await fetch("https://rickandmortyapi.com/api/character/?name=rick")
    if (!res.ok) {
        throw new Error("Failed to fetch data")
    }
    return res.json()
}

const promiseOptions = async (inputValue: string): Promise<Array<Option>> => {
    try {
        const data: Data = await getData();
        let options: Option[] = [];
        data.results.map((item: Character) => {
            options.push({value: item.id, label: item.name, episodeCount: item.episode.length, img: item.image})
        })
        return options;
    }
    catch (error: any) {
        throw new Error(error.message)
    }
}

const classNameProps: ClassNamesConfig<Option, true, GroupBase<Option>> = {
    container: (state: any) => "min-w-96",
    option: (state: any) => state.isFocused ? '' : '',
    multiValueRemove: (state: any) => "items-center flex rounded-r-lg px-1 box-border bg-[#E3E8EF]"
}

const formatOptionLabel = (data: Option) => (
    <div className="max-w-sm mx-auto bg-white shadow-lg flex items-center space-x-4">
        <div className="shrink-0">
            <img className="h-12 w-12" src={data.img} alt="Character Image"/>
        </div>
        <div>
            <div className="text-xl font-medium text-black">{data.label}</div>
            <p className="text-slate-500">{data.episodeCount} Episodes</p>
        </div>
    </div>
)

// Background: 227, 232, 239
const MultiValueLabel = (props: MultiValueGenericProps<Option>) => {
    return (
        <div className="bg-[#E3E8EF]">
            <components.MultiValueLabel {...props}>
                <div>{props.data.label}</div>
            </components.MultiValueLabel>
        </div>
    )
}

// Background: 151, 162, 182
const MultiValueRemove = (props: MultiValueRemoveProps<Option>) => {
    return (
        <div role="button" className="items-center flex rounded-r-lg px-1 box-border bg-[#E3E8EF]" aria-label="Remove [object Object]">
            <svg height="14" width="14" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="inline-block fill-current leading-none stroke-current stroke-0 bg-[#97A2B6]">
                <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229
                    0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697
                    0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
            </svg>
        </div>
    )
}

const ReactSelect = () => (
    <AsyncSelect classNames={classNameProps} components={{ MultiValueLabel: MultiValueLabel/*, MultiValueRemove: MultiValueRemove */}} isMulti cacheOptions defaultOptions loadOptions={promiseOptions} formatOptionLabel={formatOptionLabel}/>
)

export default ReactSelect