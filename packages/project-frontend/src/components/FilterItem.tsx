type FilterItemProps = {
	id: string,
	name: string,
	filters: string[],
	setFilters: React.Dispatch<React.SetStateAction<string[]>>
}

export default function FilterItem({id, name, filters, setFilters}: FilterItemProps) {
	const isChecked = filters.includes(id);

	const handleChange = () => {
		setFilters((prevFilters) =>
			isChecked ? prevFilters.filter((f) => f !== id) : [...prevFilters, id]
		);
	};
	return (
		<label className="c-cb flex items-center gap-2 cursor-pointer">
			<input
				id={id}
				type="checkbox"
				checked={isChecked}
				onChange={handleChange}
				className="peer hidden"
			/>
			<div className="w-4 h-4 transition-all duration-200 rounded border border-checkbox-border bg-checkbox-background dark:bg-dark-checkbox-background peer-checked:bg-blue-500 peer-checked:border-blue-500" />
			<span className="text-md text-normal-text dark:text-dark-normal-text">
				{name}
			</span>
		</label>
	)
}
