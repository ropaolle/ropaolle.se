<?php
/**
 * The template for displaying single Portfolio pages.
 *
 * @package Ropaolle
 */

add_action( 'beans_post_content_prepend_markup', 'beans_add_portfolio_badges' );

function beans_add_portfolio_badges() {

    do_action( 'beans_add_portfolio_badges' );

}

// Force layout.
add_filter( 'beans_layout', 'example_force_layout' );

function example_force_layout() {

    return 'sp_c';

}

// Load Beans document.
beans_load_document();
