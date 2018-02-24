<?php 

// Path to theme
$theme_path = get_stylesheet_directory_uri() . '/';
$images_path = get_stylesheet_directory_uri() . '/assets/images/';

// Add custom menu
add_action( 'init', 'register_my_menus' );

function register_my_menus() {
	register_nav_menus(
	  	array(		
			'extra-menu' => __( 'Extra Menu' ),
			'admin-menu' => __( 'Admin Menu' )
	  	)
	);
  }

// Display the footer widget area in the front end.
add_action( 'beans_header_before_markup', 'example_footer_widget_area2' );

function example_footer_widget_area2() {

	?>
	<div class="tm-mega-footer uk-block">
		olle3
	</div>
	<?php

}

// Show type
beans_add_smart_action( 'beans_post_header', 'beans_post_show_type' );

function beans_post_show_type() {
	$pt = get_post_type();
	if ( ! is_singular() ) {
		echo '<p>Not single:' . get_post_type() . '</p>';
	} else {
		echo '<p>Single:' . get_post_type() . '</p>';
	}
}
