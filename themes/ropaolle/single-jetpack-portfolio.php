<?php
/**
 * The template for displaying single Portfolio pages.
 *
 * @package Ropaolle
 */

// beans_post_after_markup

/* 
add_action( 'beans_content_prepend_markup', 'beans_child_view_add_description' );

function beans_child_view_add_description() {

    ?><p>beans_content_prepend_markup</p><?php

}

add_action( 'beans_content_after_markup', 'beans_child_view_add_description1' );

function beans_child_view_add_description1() {

    ?><p>beans_content_after_markup</p><?php

}

add_action( 'beans_header_after_markup', 'beans_child_view_add_description2' );

function beans_child_view_add_description2() {

    ?><p>beans_header_after_markup</p><?php

}

add_action( 'beans_header_prepend_markup', 'beans_child_view_add_description3' );

function beans_child_view_add_description3() {

    ?><p>beans_header_prepend_markup</p><?php

}

add_action( 'beans_body_prepend_markup', 'beans_child_view_add_description4' );

function beans_child_view_add_description4() {

    ?><p>beans_body_prepend_markup</p><?php

}

add_action( 'beans_body_after_markup', 'beans_child_view_add_description5' );

function beans_child_view_add_description5() {

    ?><p>beans_body_after_markup</p><?php

}
*/


add_action( 'beans_post_prepend_markup', 'beans_child_view_add_description3' );

function beans_child_view_add_description3() {

    $github_repostory = beans_get_post_meta( 'field_portfolio_github_repostory', '' );

    
    
    if ( $logo = get_theme_mod( 'beans_logo_image', false ) ) {
				beans_selfclose_markup_e( 'beans_logo_image', 'img', array(
					'class' => 'tm-logo',
					'src'   => str_replace( 'http://', 'https://', $logo ), // Automatically escaped.
					'alt'   => get_bloginfo( 'name' ), // Automatically escaped.
				) );				
			}
    
    ?>
    <p>beans_post_prepend_markup: <?php echo $github_repostory; ?></p>
    
    <?php

}

// Force layout.
add_filter( 'beans_layout', 'example_force_layout' );

function example_force_layout() {

    return 'sp_c';

}

// Load Beans document.
beans_load_document();
