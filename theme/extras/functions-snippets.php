<?php 

// Add custom menu
function register_my_menus() {
	register_nav_menus(
	  	array(		
			'extra-menu' => __( 'Extra Menu' ),
			'admin-menu' => __( 'Admin Menu' )
	  	)
	);
  }

add_action( 'init', 'register_my_menus' );

// Display the footer widget area in the front end.
add_action( 'beans_header_before_markup', 'example_footer_widget_area2' );

function example_footer_widget_area2() {

	?>
	<div class="tm-mega-footer uk-block">
		olle3
	</div>
	<?php

}