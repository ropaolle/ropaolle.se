<?php /**
 * Template Name: Test page
 * 
 * The basic page template can be extended with these tamplates in the page configuration.
 *
 * @package Ropaolle
 */

add_action( 'beans_content_prepend_markup', 'beans_child_view_add_description' );

function beans_child_view_add_description() {

        ?><p>Added description: ro-page-test.php</p><?php

}

// Load Beans document.
beans_load_document();
