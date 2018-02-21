<?php
/**
 * The template for displaying single Portfolio pages.
 *
 * @package Ropaolle
 */

// Force layout.
add_filter( 'beans_layout', 'example_force_layout' );

function example_force_layout() {

    return 'sp_c';

}

// Load Beans document.
beans_load_document();
