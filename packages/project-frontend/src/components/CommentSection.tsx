import { useState } from 'react'
import LoadingSpinner from './LoadingSpinner'
import BACKEND_URL from '../constants'

interface CommentSectionProps {
	addAuthHeader: (token: string) => Record<string, string>
	currUserId: string
	token: string
	gameId: string
	comments: string[]
	setComments: (comments: string[]) => void
}

export default function CommentSection({comments, setComments, addAuthHeader, currUserId, token, gameId }: CommentSectionProps) {
	const [comment, setComment] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	async function handlePostComment() {
		// Ignore empty comments
		if (comment.trim() === '') return

		try{
			setIsLoading(true)
			const response = await fetch (`${BACKEND_URL}/api/comment`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					...addAuthHeader(token)
				},
				body: JSON.stringify({
					content: comment,
					userId: currUserId,
					gameId: gameId
				})
			})

			if (response.ok) {
				const data = await response.json()
				// Add new comment at the top
				setComments([ ...comments, data.content])
			}
		}
		catch (e){
			console.log("Error posting comment:", e)
			alert("Something went wrong posting comment...")
		} finally {
			setIsLoading(false)
		}
		// Clear input field
		setComment('')
	}

	return (
		<div className="flex flex-col w-full mx-auto mt-4 py-4 xs:px-8 sm:px-16 rounded-lg ">
			<h3 className="text-2xl dark:text-dark-normal-text text-normal-text">Add Comment</h3>
			{/* Comment Input */}
			<div className="flex gap-2 items-center mt-2">
				<input
					type="text"
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					placeholder="Write a comment..."
					className="flex-1 text-lg dark:text-lg placeholder:text-lg dark:text-dark-normal-text text-normal-text placeholder:text-hint-text dark:placeholder:text-dark-hint-text  px-3 py-4 rounded-lg bg-elevated-background dark:bg-dark-elevated-background rounded-lg focus:outline-none focus:ring-2 focus:ring-input-border-ring dark:focus:ring-dark-input-border-ring dark:border-dark-input-border"
				/>
				<button
					onClick={handlePostComment}
					className="text-button-text h-10 dark:text-dark-button-text cursor-pointer transition-all duration-300 bg-button-background dark:bg-dark-button-background hover:bg-button-hover dark:hover:bg-dark-button-hover focus:bg-button-focus dark:focus:bg-dark-button-focus font-medium rounded-lg text-sm px-4 py-2 ">
					Post
				</button>
			</div>

			<h3 className="mt-8 text-2xl dark:text-dark-normal-text text-normal-text">Posted Comments</h3>
			{/* Comment List */}
			{isLoading ? (
				<LoadingSpinner />
			) : (
				<ul className="mt-2 space-y-2">
					
					{// .slice.reverse is used to reverse the order of comments (most recent first)
					comments.slice().reverse().map((c, index) => (
						<li
							key={index}
							className="p-4 rounded-lg h-auto text-wrap break-words bg-elevated-background dark:bg-dark-elevated-background">
							<p className="dark:text-dark-normal-text text-normal-text text-lg">{c}</p>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
