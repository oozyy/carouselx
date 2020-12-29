<?php
/**
 * Plugin Name:     Carousel X
 * Description:     Carousel of posts block
 * Version:         0.1.0
 *
 * @package         carouselx
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function carouselx_esnext_example_block_init() {
	$dir = __DIR__;

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "carouselx/esnext-example" block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'carouselx-esnext-example-block-editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);
	wp_set_script_translations( 'carouselx-esnext-example-block-editor', 'esnext-example' );

	$editor_css = 'build/index.css';
	wp_register_style(
		'carouselx-esnext-example-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'build/style-index.css';
	wp_register_style(
		'carouselx-esnext-example-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	register_block_type( 'carouselx/esnext-example', array(
		'editor_script' => 'carouselx-esnext-example-block-editor',
		'editor_style'  => 'carouselx-esnext-example-block-editor',
		'style'         => 'carouselx-esnext-example-block',
	) );
}
add_action( 'init', 'carouselx_esnext_example_block_init' );
