<?php
/**
 * The template for displaying the Portfolio archive page.
 *
 * @package Ropaolle
 */

add_action( 'beans_content_prepend_markup', 'beans_child_view_add_description' );

function beans_child_view_add_description() {

        ?><p>Added description to the Jetpack Portfolio page</p><?php

}

// Force layout.
add_filter( 'beans_layout', 'example_force_layout' );

function example_force_layout() {

    return 'sp_c';

}

// Load Beans document.
beans_load_document();
