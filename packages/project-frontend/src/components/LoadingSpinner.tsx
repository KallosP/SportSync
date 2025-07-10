export default function loadingSpinner() {
	return (
		<div className="flex justify-center items-center h-full w-full">
			<div className="animate-spin rounded-full h-8 w-8 border-t-4 border-button-background dark:border-dark-button-background"></div>
		</div>
	)
}
