<?php
/**
 * The template for displaying the Portfolio archive page.
 *
 * @package Ropaolle
 */

// Force layout.
add_filter( 'beans_layout', 'example_force_layout' );

function example_force_layout() {

    return 'c_sp';

}

// Load Beans document.
beans_load_document();