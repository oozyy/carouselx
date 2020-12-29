import { useState } from '@wordpress/element';
import { Popover, Button } from '@wordpress/components';
import { __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {

	/**
	 * Was not ready for a gutenberg project, and I didn't get far.
	 * I was able to get somewhere (it's terrible) with adding a list of posts 
	 * within the editor but reading API docs in
	 * 3 hours was impossible. 
	 */

	let { posts } = attributes;
	if (!posts) posts = [];

	// The index of the post item that's being edited.
	const [editIndex, setEditIndex] = useState(null);

	// Delete item object.
	const deleteItem = (index) => {
		setAttributes({
			posts: posts.filter((_, i) => i !== index)
		});
	};

	// Set the link from LinkControl.
	const setLink = (index, url, title, opensInNewTab) => {
		setAttributes({
			posts: posts.map((post, i) => {
				return i !== index ? post : { ...post, url, title, opensInNewTab };
			})
		});
	};

	// Add Item to post and popup to search for post.
	const addItem = () => {
		setAttributes({
			posts: posts.concat({
				url: "#",
				title: "(Select a Post)",
				opensInNewTab: false
			})
		});
		// Open the popup when a new post submitted.
		setEditIndex(posts.length);
	};


	return (
		<div {...useBlockProps()}>
			<ul>
				{posts.map(({ title, url, opensInNewTab }, i) => (
					<li key={i}>
						<span>{title}</span>
						<div class="cx-controls">
							<a onClick={() => setEditIndex(i)}>[edit link]</a>
							<a onClick={() => deleteItem(i)}>[delete]</a>
						</div>
						{editIndex === i && (
							<Popover
								position="bottom left"
								onFocusOutside={() => setEditIndex(null)}
							>
								{/*

								Was testing LinkControl to see if it could be a simple way of searching for posts, 
								but it's quite limiting and not what's needed here....
							
							*/}
								<LinkControl
									value={(url, title, opensInNewTab)}
									onChange={({ url, title, opensInNewTab }) =>
										setLink(i, url, title, opensInNewTab)
									}
								/>
							</Popover>
						)}
					</li>
				))}
			</ul>

			<Button onClick={addItem}>Add Item</Button>
		</div >
	);
}

