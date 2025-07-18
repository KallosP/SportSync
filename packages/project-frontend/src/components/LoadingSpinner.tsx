export default function loadingSpinner({onButton}: {onButton: boolean}) {
	const spinnerColor = onButton ? "white" : "blue-600";  

	return (
		<div className="flex justify-center items-center h-full w-full">
			<div className={`animate-spin rounded-full h-8 w-8 border-t-4 border-${spinnerColor} dark:border-${spinnerColor}`}></div>
		</div>
	)
}
